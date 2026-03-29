const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { matchesAnyPattern, resolveProfileOperatingMode } = require('./session-protocol-utils');

const EXIT = {
  SUCCESS: 0,
  CRITICAL_FAILURE: 1,
  POLICY_VIOLATION: 2
};

const SUPPORTED_FLAGS = new Set(['--json', '--dry-run', '--airtable']);

function parseArgs(argv) {
  const args = {
    json: false,
    dryRun: false,
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
      code: error.status || 1,
      message: error.message
    };
  }
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
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

function parseClaudeState(claudeContent) {
  const lastSession = { date: null, summary: 'No session recorded' };
  let blockingIssues = [];
  let nonBlockingIssues = [];
  let nextPriorities = [];

  const lastSessionMatch = claudeContent.match(/\*\*Last session:\*\*\s*(\d{4}-\d{2}-\d{2})\s*[—–-]\s*(.+?)(?:\n|$)/i);
  if (lastSessionMatch) {
    lastSession.date = lastSessionMatch[1];
    lastSession.summary = lastSessionMatch[2].trim();
  }

  const issuesMatch = claudeContent.match(/\*\*Known issues:\*\*\s*\n((?:[-•]\s*.+\n?)+)/i);
  if (issuesMatch) {
    const knownIssues = issuesMatch[1]
      .split('\n')
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean);

    for (const issue of knownIssues) {
      if (/^\[(blocking|blocker)\]/i.test(issue) || /^blocking\s*:/i.test(issue)) {
        blockingIssues.push(issue.replace(/^\[(blocking|blocker)\]\s*/i, '').replace(/^blocking\s*:\s*/i, '').trim());
      } else if (/^\[(non-blocking|nonblocking|info)\]/i.test(issue) || /^(non-blocking|nonblocking|info)\s*:/i.test(issue)) {
        nonBlockingIssues.push(issue.replace(/^\[(non-blocking|nonblocking|info)\]\s*/i, '').replace(/^(non-blocking|nonblocking|info)\s*:\s*/i, '').trim());
      } else {
        nonBlockingIssues.push(issue);
      }
    }
  }

  const prioritiesMatch = claudeContent.match(/## Next[^\n]*\n\n?((?:\d+\.\s*\*\*[^*]+\*\*[^\n]*(?:\n\s+→[^\n]*)*\n?)+)/i);
  if (prioritiesMatch) {
    nextPriorities = prioritiesMatch[1]
      .split(/\n(?=\d+\.)/)
      .map(item => {
        const titleMatch = item.match(/\*\*([^*]+)\*\*/);
        return titleMatch ? titleMatch[1].trim() : null;
      })
      .filter(Boolean);
  }

  return { lastSession, blockingIssues, nonBlockingIssues, nextPriorities };
}

const { args, unknown } = parseArgs(process.argv.slice(2));

if (unknown.length > 0) {
  console.error(`Unknown flag(s): ${unknown.join(', ')}`);
  process.exit(EXIT.CRITICAL_FAILURE);
}

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
const strictMode = Boolean(profile.strictMode);
operations.push({ step: 'operating_mode', status: 'ok', detail: activeMode });
const currentBranchResult = run('git rev-parse --abbrev-ref HEAD');
if (!currentBranchResult.ok) {
  console.error('Unable to detect current git branch.');
  process.exit(EXIT.CRITICAL_FAILURE);
}

const currentBranch = currentBranchResult.stdout;
if (!matchesAnyPattern(currentBranch, profile.git.allowedBranchPatterns)) {
  const policyError = `Branch '${currentBranch}' is not allowed by session protocol policy.`;
  console.error(policyError);
  process.exit(EXIT.POLICY_VIOLATION);
}
operations.push({ step: 'branch_policy', status: 'ok', detail: currentBranch });

const claudePath = path.join('CLAUDE.md');
const sessionRulePath = path.join('.claude', 'rules', 'session.md');
let claudeContent = '';
let claudeState = {
  lastSession: { date: null, summary: 'No session recorded' },
  blockingIssues: [],
  nonBlockingIssues: [],
  nextPriorities: []
};

if (fs.existsSync(claudePath)) {
  claudeContent = fs.readFileSync(claudePath, 'utf8');
  claudeState = parseClaudeState(claudeContent);

  const requiredSections = profile.sessionStart?.requiredClaudeSections || [];
  for (const section of requiredSections) {
    if (!claudeContent.includes(section)) {
      warnings.push(`Missing expected CLAUDE.md section: ${section}`);
    }
  }

  if (claudeState.lastSession.date) {
    const staleDays = profile.sessionStart?.staleDaysThreshold || 7;
    const lastDate = new Date(claudeState.lastSession.date);
    const daysSince = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > staleDays) {
      warnings.push(`CLAUDE.md stale: last session ${Math.floor(daysSince)} days ago.`);
    }
  }
} else {
  errors.push('CLAUDE.md missing — cannot determine project state.');
}

if (fs.existsSync(claudePath) && fs.existsSync(sessionRulePath)) {
  const sessionRules = fs.readFileSync(sessionRulePath, 'utf8');
  const consistencyChecks = [
    'npm run session-start',
    'npm run session-end:dry-run',
    'npm run session-end:write'
  ];

  for (const command of consistencyChecks) {
    const inClaude = claudeContent.includes(command);
    const inRules = sessionRules.includes(command);
    if (inClaude !== inRules) {
      warnings.push(`Protocol doc drift detected for command: ${command}`);
    }
  }
}

const gitState = { clean: true, uncommitted: [], unpushed: 0, lastCommits: [] };

const gitStatus = run('git status --short');
if (gitStatus.ok && gitStatus.stdout) {
  gitState.uncommitted = gitStatus.stdout.split('\n').filter(Boolean);
  gitState.clean = gitState.uncommitted.length === 0;
}

const unpushed = run(`git log ${profile.git.defaultPushRemote}/main..HEAD --oneline`);
if (unpushed.ok && unpushed.stdout) {
  gitState.unpushed = unpushed.stdout.split('\n').filter(Boolean).length;
  if (gitState.unpushed > 0) gitState.clean = false;
}

const lastCommits = run('git log --oneline -3');
if (lastCommits.ok && lastCommits.stdout) {
  gitState.lastCommits = lastCommits.stdout.split('\n').filter(Boolean);
}

if (!gitState.clean) {
  warnings.push(`Working tree not clean (${gitState.uncommitted.length} uncommitted, ${gitState.unpushed} unpushed).`);
}

const airtableEnabled = args.airtable || Boolean(profile.airtable?.enabledByDefault);
const airtableStatus = airtableEnabled
  ? 'Requested, but integration hook is not enabled in script yet.'
  : 'Skipped (optional, enable with --airtable).';

if (airtableEnabled) {
  warnings.push('Airtable check requested but currently runs as a placeholder.');
}

const today = formatDate(new Date());
const suggestedFocus = claudeState.nextPriorities[0] || 'No priorities defined in CLAUDE.md';
const nextPriorities = claudeState.nextPriorities.length > 0
  ? claudeState.nextPriorities
  : ['Define priorities in CLAUDE.md'];

if (claudeState.blockingIssues.length > 0) {
  warnings.push(...claudeState.blockingIssues);
}

const allErrors = errors.slice();
if (strictMode && warnings.length > 0) {
  allErrors.push(...warnings.map(w => `[strict] ${w}`));
}

const status = allErrors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'ok';

const output = {
  status,
  mode: args.dryRun ? 'dry-run' : 'read-only',
  date: today,
  branch: currentBranch,
  operations,
  lastSession: claudeState.lastSession.date
    ? `${claudeState.lastSession.date} — ${claudeState.lastSession.summary}`
    : claudeState.lastSession.summary,
  suggestedFocus,
  nextPriorities,
  knownIssues: {
    blocking: claudeState.blockingIssues,
    nonBlocking: claudeState.nonBlockingIssues
  },
  git: gitState,
  airtable: airtableStatus,
  warnings,
  errors: allErrors,
  nextActions: [
    'Confirm focus with user before task execution.',
    'Resolve branch policy or repository state warnings if they block intended workflow.'
  ]
};

if (args.json) {
  console.log(JSON.stringify(output, null, 2));
} else {
  console.log(`\n## Session Brief — ${today}\n`);
  console.log(`**Branch:** ${currentBranch}`);
  console.log(`**Last session:** ${output.lastSession}`);
  console.log(`**Git state:** ${gitState.clean ? '✅ Clean' : `⚠️ ${gitState.uncommitted.length} uncommitted, ${gitState.unpushed} unpushed`}`);
  console.log(`**Airtable:** ${airtableStatus}`);
  console.log(`**Suggested focus:** ${suggestedFocus}`);

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log(`- ${w}`));
  }

  if (allErrors.length > 0) {
    console.log('\nErrors:');
    allErrors.forEach(e => console.log(`- ${e}`));
  }

  console.log('\n---\nReady to proceed. Confirm focus or redirect.');
}

if (allErrors.length > 0) {
  process.exit(EXIT.CRITICAL_FAILURE);
}

process.exit(EXIT.SUCCESS);
