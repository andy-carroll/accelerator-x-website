// scripts/session-start.js
// Session‑Start automation
// -------------------------------------------------
// This script outputs a structured session brief for any AI tool.
// Run with: npm run session-start
// JSON output: npm run session-start -- --json
// -------------------------------------------------

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    return null;
  }
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Parse CLI args
const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');

// 1. Read CLAUDE.md (the cockpit)
const claudePath = path.join('CLAUDE.md');
let claudeContent = '';
let lastSession = { date: null, summary: 'No session recorded' };
let knownIssues = [];
let nextPriorities = [];

if (fs.existsSync(claudePath)) {
  claudeContent = fs.readFileSync(claudePath, 'utf8');

  // Extract last session — matches "**Last session:** YYYY-MM-DD — summary"
  const lastSessionMatch = claudeContent.match(/\*\*Last session:\*\*\s*(\d{4}-\d{2}-\d{2})\s*[—–-]\s*(.+?)(?:\n|$)/i);
  if (lastSessionMatch) {
    lastSession.date = lastSessionMatch[1];
    lastSession.summary = lastSessionMatch[2].trim();
  }

  // Extract known issues — matches bullet list under "**Known issues:**"
  const issuesMatch = claudeContent.match(/\*\*Known issues:\*\*\s*\n((?:[-•]\s*.+\n?)+)/i);
  if (issuesMatch) {
    knownIssues = issuesMatch[1]
      .split('\n')
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean);
  }

  // Extract next priorities — matches numbered list under "## Next", including continuation lines
  const prioritiesMatch = claudeContent.match(/## Next[^\n]*\n\n?((?:\d+\.\s*\*\*[^*]+\*\*[^\n]*(?:\n\s+→[^\n]*)*\n?)+)/i);
  if (prioritiesMatch) {
    nextPriorities = prioritiesMatch[1]
      .split(/\n(?=\d+\.)/)
      .map(item => {
        // Extract just the bold title
        const titleMatch = item.match(/\*\*([^*]+)\*\*/);
        return titleMatch ? titleMatch[1].trim() : null;
      })
      .filter(Boolean);
  }

  // Check if stale (>7 days since last session)
  if (lastSession.date) {
    const lastDate = new Date(lastSession.date);
    const daysSince = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > 7) {
      knownIssues.unshift(`⚠️ CLAUDE.md stale — last session ${Math.floor(daysSince)} days ago`);
    }
  }
} else {
  knownIssues.push('⚠️ CLAUDE.md missing — cannot determine project state');
}

// 2. Check git state
let gitState = { clean: true, uncommitted: [], unpushed: 0, lastCommits: [] };

const gitStatus = run('git status --short');
if (gitStatus) {
  gitState.uncommitted = gitStatus.split('\n').filter(Boolean);
  gitState.clean = gitState.uncommitted.length === 0;
}

const unpushedCount = run('git log origin/main..HEAD --oneline');
if (unpushedCount) {
  gitState.unpushed = unpushedCount.split('\n').filter(Boolean).length;
  if (gitState.unpushed > 0) gitState.clean = false;
}

const lastCommits = run('git log --oneline -3');
if (lastCommits) {
  gitState.lastCommits = lastCommits.split('\n').filter(Boolean);
}

// 3. Airtable check (placeholder — requires MCP, skip for now)
const airtableStatus = 'Not checked (requires MCP integration)';

// 4. Build output
const today = formatDate(new Date());

const brief = {
  date: today,
  lastSession: lastSession.date ? `${lastSession.date} — ${lastSession.summary}` : lastSession.summary,
  knownIssues: knownIssues.length > 0 ? knownIssues : ['None'],
  gitState: gitState.clean ? '✅ Clean' : `⚠️ ${gitState.uncommitted.length} uncommitted, ${gitState.unpushed} unpushed`,
  gitDetails: gitState,
  airtable: airtableStatus,
  suggestedFocus: nextPriorities[0] || 'No priorities defined in CLAUDE.md',
  nextPriorities: nextPriorities.length > 0 ? nextPriorities : ['Define priorities in CLAUDE.md']
};

// 5. Output
if (jsonOutput) {
  console.log(JSON.stringify(brief, null, 2));
} else {
  console.log(`
## Session Brief — ${today}

**Last session:** ${brief.lastSession}
**Known issues:** ${brief.knownIssues.join('; ')}
**Git state:** ${brief.gitState}
**Airtable:** ${brief.airtable}

**Suggested focus:** ${brief.suggestedFocus}

---
Ready to proceed. Confirm focus or redirect.
`);
}

// Exit with error code if issues detected (useful for CI)
process.exit(gitState.clean ? 0 : 1);
