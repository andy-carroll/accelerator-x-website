const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  matchesAnyPattern,
  resolveProfileOperatingMode,
  ensureNextSessionBlock,
  upsertSessionProtocolBlock
} = require('./session-protocol-utils');

const EXIT = {
  SUCCESS: 0,
  CRITICAL_FAILURE: 1,
  POLICY_VIOLATION: 2,
  QUALITY_GATE_FAILURE: 3
};

const SUPPORTED_FLAGS = new Set(['--json', '--dry-run', '--confirm-write', '--yes', '--airtable']);
const BUILD_ARTIFACT_PREFIXES = ['insights/', 'assets/css/'];
const BUILD_ARTIFACT_FILES = new Set(['index.html', 'sitemap.xml']);

function parseArgs(argv) {
  const args = {
    json: false,
    dryRun: false,
    confirmWrite: false,
    yes: false,
    airtable: false
  };

  const unknown = [];
  for (const flag of argv) {
    if (!SUPPORTED_FLAGS.has(flag)) {
      unknown.push(flag);
      continue;
    }

    if (flag === '--json') args.json = true;
    if (flag === '--dry-run') args.dryRun = true;
    if (flag === '--confirm-write') args.confirmWrite = true;
    if (flag === '--yes') args.yes = true;
    if (flag === '--airtable') args.airtable = true;
  }

  return { args, unknown };
}

function run(command) {
  try {
    const stdout = execSync(command, { stdio: 'pipe' }).toString().trim();
    return { ok: true, stdout, code: 0 };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString()?.trim() || '',
      stderr: error.stderr?.toString()?.trim() || '',
      code: error.status || 1,
      message: error.message
    };
  }
}

function shellQuote(input) {
  return `'${String(input).replace(/'/g, `'\\''`)}'`;
}

function timestamp() {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function upsertClaudeLastSession(content, date, summary) {
  const line = `**Last session:** ${date} — ${summary}`;
  if (/\*\*Last session:\*\*/i.test(content)) {
    return content.replace(/\*\*Last session:\*\*.*(?:\n|$)/i, `${line}\n`);
  }

  if (/## Current State/i.test(content)) {
    return content.replace(/## Current State\n+/i, `## Current State\n\n${line}\n\n`);
  }

  return `${content}${content.endsWith('\n') ? '' : '\n'}\n## Current State\n\n${line}\n`;
}

function loadProfile(profilePath) {
  if (!fs.existsSync(profilePath)) {
    return { error: `Missing protocol profile at ${profilePath}` };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    const resolved = resolveProfileOperatingMode(parsed);

    if (resolved.error) {
      return { error: resolved.error };
    }

    const profile = resolved.profile;
    if (!profile.version || !profile.git || !Array.isArray(profile.git.allowedBranchPatterns)) {
      return { error: 'Invalid protocol profile: missing required git policy fields.' };
    }
    return { profile, activeMode: resolved.activeMode };
  } catch (error) {
    return { error: `Failed to parse protocol profile: ${error.message}` };
  }
}

function askForConfirmation(message) {
  process.stdout.write(`${message} [y/N]: `);
  const buffer = Buffer.alloc(1024);
  const bytes = fs.readSync(process.stdin.fd, buffer, 0, buffer.length);
  const answer = buffer.toString('utf8', 0, bytes).trim().toLowerCase();
  return answer === 'y' || answer === 'yes';
}

function collectChangedPaths() {
  try {
    const stdout = execSync('git status --porcelain', { stdio: 'pipe' }).toString();
    return stdout
      .split('\n')
      .map(line => {
        const match = line.match(/^..\s(.+)$/);
        return match ? match[1].trim() : '';
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function isAllowedArtifact(filePath) {
  if (BUILD_ARTIFACT_FILES.has(filePath)) return true;
  return BUILD_ARTIFACT_PREFIXES.some(prefix => filePath.startsWith(prefix));
}

const { args, unknown } = parseArgs(process.argv.slice(2));
if (unknown.length > 0) {
  console.error(`Unknown flag(s): ${unknown.join(', ')}`);
  process.exit(EXIT.CRITICAL_FAILURE);
}

if (args.dryRun && args.confirmWrite) {
  console.error('Invalid flags: --dry-run and --confirm-write cannot be combined.');
  process.exit(EXIT.CRITICAL_FAILURE);
}

const mode = args.dryRun ? 'dry-run' : args.confirmWrite ? 'write' : 'plan';
const warnings = [];
const errors = [];
const operations = [];

const profilePath = path.join('.session-protocol.json');
const profileResult = loadProfile(profilePath);
if (profileResult.error) {
  console.error(profileResult.error);
  process.exit(EXIT.CRITICAL_FAILURE);
}
const profile = profileResult.profile;
const activeMode = profileResult.activeMode || 'default';
operations.push({ step: 'operating_mode', status: 'ok', detail: activeMode });

const branchResult = run('git rev-parse --abbrev-ref HEAD');
if (!branchResult.ok) {
  console.error('Unable to detect current git branch.');
  process.exit(EXIT.CRITICAL_FAILURE);
}
const branch = branchResult.stdout;

if (!matchesAnyPattern(branch, profile.git.allowedBranchPatterns)) {
  console.error(`Branch '${branch}' is not allowed by session protocol policy.`);
  process.exit(EXIT.POLICY_VIOLATION);
}
operations.push({ step: 'branch_policy', status: 'ok', detail: branch });

const ts = timestamp();
const today = formatDate(new Date());
const logDir = profile.artifacts?.sessionLogDir || '.claude/sessions';
const logPath = path.join(logDir, `session-${ts}.md`);
const writeModeEnabled = mode === 'write';

if (mode === 'plan') {
  warnings.push('Safe-by-default mode: no writes, no commit, no push. Use --confirm-write to execute.');
}

const currentHead = run('git rev-parse HEAD');
const headHash = currentHead.ok ? currentHead.stdout : 'unknown';

const plannedManagedFiles = new Set(profile.docs?.managedFiles || []);
const allowedChangedPathPatterns = profile.sessionEnd?.allowedChangedPathPatterns || [];
const sessionBlockMarkers = {
  startMarker: profile.docs?.sessionProtocolBlock?.startMarker,
  endMarker: profile.docs?.sessionProtocolBlock?.endMarker
};

if (mode !== 'dry-run') {
  if (writeModeEnabled && !args.yes) {
    const approved = askForConfirmation(`Session-end write mode will modify files on branch '${branch}'. Continue?`);
    if (!approved) {
      console.error('Write operation cancelled by user.');
      process.exit(EXIT.POLICY_VIOLATION);
    }
  }
} else {
  operations.push({ step: 'dry_run', status: 'ok', detail: 'No writes or git mutations will be executed.' });
}

let qualityGateFailed = false;
const requiredCommands = profile.quality?.requiredCommands || ['npm run build'];
const optionalCommands = profile.quality?.optionalCommands || [];

if (writeModeEnabled) {
  for (const command of requiredCommands) {
    const gate = run(command);
    operations.push({ step: 'quality_gate', command, status: gate.ok ? 'ok' : 'failed' });
    if (!gate.ok) {
      qualityGateFailed = true;
      errors.push(`Quality gate failed: ${command}`);
      if (gate.stdout) warnings.push(gate.stdout);
      if (gate.stderr) warnings.push(gate.stderr);
      break;
    }
  }

  if (!qualityGateFailed) {
    for (const command of optionalCommands) {
      const gate = run(command);
      operations.push({ step: 'quality_gate_optional', command, status: gate.ok ? 'ok' : 'warning' });
      if (!gate.ok) {
        warnings.push(`Optional quality gate failed: ${command}`);
        if (gate.stdout) warnings.push(gate.stdout);
        if (gate.stderr) warnings.push(gate.stderr);
      }
    }
  }
} else {
  operations.push({ step: 'quality_gate', status: 'skipped', detail: `Skipped in ${mode} mode.` });
}

if (writeModeEnabled && qualityGateFailed) {
  const output = {
    status: 'error',
    mode,
    branch,
    operations,
    warnings,
    errors,
    nextActions: ['Fix quality gate failures, then rerun session-end with --confirm-write.']
  };

  if (args.json) {
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.error('❌ Session-end aborted due to quality gate failure.');
    errors.forEach(item => console.error(`- ${item}`));
  }

  process.exit(EXIT.QUALITY_GATE_FAILURE);
}

if (writeModeEnabled) {
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const logContent = `# Session Log – ${new Date().toISOString()}\n\n- **Branch:** ${branch}\n- **Git commit:** ${headHash}\n- **Quality gates:** ✅ passed\n- **Airtable updates:** ${args.airtable ? 'requested (placeholder)' : 'skipped'}\n- **Decisions / Findings:**\n  - _Add your bullet points here_\n- **Next Session Priorities:**\n  1. _Priority 1_\n  2. _Priority 2_\n  3. _Priority 3_\n`;
  fs.writeFileSync(logPath, logContent);
  operations.push({ step: 'session_log', status: 'written', detail: logPath });

  const claudePath = 'CLAUDE.md';
  const claudeContent = fs.readFileSync(claudePath, 'utf8');
  const sessionSummary = 'session protocol wrap completed; quality gates passing; handoff ready';
  const withFreshLastSession = upsertClaudeLastSession(claudeContent, today, sessionSummary);
  const claudeUpdate = ensureNextSessionBlock(withFreshLastSession);
  if (claudeUpdate.changed || claudeUpdate.content !== claudeContent) {
    fs.writeFileSync(claudePath, claudeUpdate.content);
    operations.push({ step: 'claude_priorities', status: 'updated' });
  } else {
    operations.push({ step: 'claude_priorities', status: 'unchanged' });
  }

  const markerFiles = (profile.docs?.managedFiles || []).filter(file => file !== 'CLAUDE.md');
  for (const file of markerFiles) {
    if (!fs.existsSync(file)) {
      warnings.push(`Managed file missing: ${file}`);
      continue;
    }

    const content = fs.readFileSync(file, 'utf8');
    const blockUpdate = upsertSessionProtocolBlock(content, {
      sessionId: ts,
      date: new Date().toISOString(),
      mode
    }, sessionBlockMarkers);
    if (blockUpdate.changed) {
      fs.writeFileSync(file, blockUpdate.content);
      operations.push({ step: 'doc_marker', file, status: 'updated' });
    } else {
      operations.push({ step: 'doc_marker', file, status: 'unchanged' });
    }
  }

  if (args.airtable || profile.airtable?.enabledByDefault) {
    warnings.push('Airtable update is currently a placeholder and did not mutate external state.');
    operations.push({ step: 'airtable', status: 'warning', detail: 'placeholder only' });
  }

  const changedPaths = collectChangedPaths();
  const isAllowedByPattern = filePath => matchesAnyPattern(filePath, allowedChangedPathPatterns);
  const allowedPaths = changedPaths.filter(filePath => (
    plannedManagedFiles.has(filePath)
    || filePath === logPath
    || isAllowedArtifact(filePath)
    || isAllowedByPattern(filePath)
  ));
  const blockedPaths = changedPaths.filter(filePath => !(
    plannedManagedFiles.has(filePath)
    || filePath === logPath
    || isAllowedArtifact(filePath)
    || isAllowedByPattern(filePath)
  ));

  if (blockedPaths.length > 0) {
    errors.push(`Unexpected changed files outside protocol scope: ${blockedPaths.join(', ')}`);
    const output = {
      status: 'error',
      mode,
      branch,
      operations,
      warnings,
      errors,
      nextActions: ['Review changed files and update protocol profile scope if intended.']
    };
    if (args.json) {
      console.log(JSON.stringify(output, null, 2));
    } else {
      console.error('❌ Session-end aborted due to unexpected changed files.');
      errors.forEach(item => console.error(`- ${item}`));
    }
    process.exit(EXIT.POLICY_VIOLATION);
  }

  if (allowedPaths.length > 0) {
    const addResult = run(`git add ${allowedPaths.map(shellQuote).join(' ')}`);
    if (!addResult.ok) {
      errors.push('git add failed for allowed session-end paths.');
      if (addResult.stdout) warnings.push(addResult.stdout);
      if (addResult.stderr) warnings.push(addResult.stderr);
      const output = {
        status: 'error',
        mode,
        branch,
        operations,
        warnings,
        errors,
        nextActions: ['Resolve git add path errors, then rerun session-end write mode.']
      };
      if (args.json) {
        console.log(JSON.stringify(output, null, 2));
      } else {
        console.error('❌ Session-end aborted due to git add failure.');
        errors.forEach(item => console.error(`- ${item}`));
      }
      process.exit(EXIT.CRITICAL_FAILURE);
    }
  }

  const staged = run('git diff --cached --name-only');
  if (!staged.ok || !staged.stdout) {
    warnings.push('No staged changes detected; skipping commit and push.');
    operations.push({ step: 'git_commit', status: 'skipped', detail: 'no staged changes' });
  } else {
    const commitTemplate = profile.sessionEnd?.commitMessageTemplate || 'docs(session): {date} session wrap';
    const commitMessage = commitTemplate.replace('{date}', today);
    const commitResult = run(`git commit -m ${shellQuote(commitMessage)}`);
    if (!commitResult.ok) {
      errors.push('git commit failed.');
      if (commitResult.stdout) warnings.push(commitResult.stdout);
      if (commitResult.stderr) warnings.push(commitResult.stderr);
      process.exit(EXIT.CRITICAL_FAILURE);
    }
    operations.push({ step: 'git_commit', status: 'ok', detail: commitMessage });

    if (args.yes && profile.sessionEnd?.autoPushAllowed !== false) {
      const pushResult = run(`git push ${shellQuote(profile.git.defaultPushRemote || 'origin')} ${shellQuote(branch)}`);
      if (!pushResult.ok) {
        errors.push('git push failed.');
        if (pushResult.stdout) warnings.push(pushResult.stdout);
        if (pushResult.stderr) warnings.push(pushResult.stderr);
        process.exit(EXIT.CRITICAL_FAILURE);
      }
      operations.push({ step: 'git_push', status: 'ok', detail: `${profile.git.defaultPushRemote || 'origin'} ${branch}` });
    } else {
      operations.push({ step: 'git_push', status: 'skipped', detail: 'Push requires --yes and autoPushAllowed=true in profile.' });
      warnings.push('Push skipped by policy. Use --yes and set sessionEnd.autoPushAllowed=true to enable.');
    }
  }
}

if (mode === 'dry-run') {
  operations.push({ step: 'planned_outputs', status: 'ok', detail: `Would write session log to ${logPath}` });
  operations.push({ step: 'planned_outputs', status: 'ok', detail: 'Would update CLAUDE.md Next Session Priorities block if missing.' });
  operations.push({ step: 'planned_outputs', status: 'ok', detail: 'Would upsert single session protocol blocks in managed docs.' });
}

const status = errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'ok';
const output = {
  status,
  mode,
  branch,
  operations,
  warnings,
  errors,
  nextActions: [
    mode === 'plan'
      ? 'Rerun with --confirm-write to execute writes.'
      : 'Review warnings before closing session.',
    'If push is required, rerun with --confirm-write --yes and enable autoPushAllowed in profile.'
  ]
};

if (args.json) {
  console.log(JSON.stringify(output, null, 2));
} else {
  console.log(`\n## Session End — ${today}\n`);
  console.log(`Mode: ${mode}`);
  console.log(`Branch: ${branch}`);
  operations.forEach(op => {
    const descriptor = op.command ? `${op.step} (${op.command})` : op.step;
    console.log(`- ${descriptor}: ${op.status}${op.detail ? ` — ${op.detail}` : ''}`);
  });

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(item => console.log(`- ${item}`));
  }

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(item => console.log(`- ${item}`));
  }
}

if (errors.length > 0) {
  process.exit(EXIT.CRITICAL_FAILURE);
}

process.exit(EXIT.SUCCESS);
