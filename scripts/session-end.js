// scripts/session-end.js
// Session‑End automation (without Slack posting)
// -------------------------------------------------
// This script performs the mandatory Session‑End steps:
// 1. Generate a session log file under .claude/sessions/
// 2. Ensure CLAUDE.md contains a refreshed "## Next Session Priorities" block
// 3. (Placeholder) update Airtable deliverables – currently logs IDs
// 4. git add -A, commit, and push
// 5. Run the quality gate (npm run build)
// 6. Echo reminders to manually update ROADMAP.md, README.md, CHANGELOG.md, AI-RULES.md
// -------------------------------------------------

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    console.error(`Command failed: ${command}\n`, e.stdout?.toString() || e.message);
    process.exit(1);
  }
}

function timestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

// 1. Create session log
const ts = timestamp();
const logDir = path.join('.claude', 'sessions');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logPath = path.join(logDir, `session-${ts}.md`);
const gitHash = run('git rev-parse HEAD');
const logContent = `# Session Log – ${new Date().toISOString()}

- **Git commit:** ${gitHash}
- **Build result:** (will be filled after build)
- **Airtable updates:** (placeholder – replace with real MCP calls)
- **Decisions / Findings:**
  - _Add your bullet points here_
- **Next Session Priorities:**
  1. _Priority 1_
  2. _Priority 2_
  3. _Priority 3_
`;
fs.writeFileSync(logPath, logContent);
console.log(`✅ Session log created at ${logPath}`);

// 2. Ensure CLAUDE.md has Next Session Priorities block
const claudePath = path.join('CLAUDE.md');
let claudeContent = fs.readFileSync(claudePath, 'utf8');
if (!/## Next Session Priorities/.test(claudeContent)) {
  const block = `\n## Next Session Priorities\n\n1. _Priority 1_\n2. _Priority 2_\n3. _Priority 3_\n`;
  fs.appendFileSync(claudePath, block);
  console.log('✅ Added Next Session Priorities block to CLAUDE.md');
} else {
  console.log('ℹ️ CLAUDE.md already contains Next Session Priorities');
}

// 3. Placeholder Airtable update
console.log('🔧 Airtable update placeholder – replace with real MCP call if needed');

// 4. Git commit & push
run('git add -A');
run(`git commit -m "docs(session): ${new Date().toISOString().split("T")[0]} session wrap – automated"`);
run('git push');
console.log('✅ Changes committed and pushed');

// 5. Run quality gate (npm run build)
let buildSuccess = true;
try {
  run('npm run build');
  console.log('✅ Build succeeded');
} catch (e) {
  buildSuccess = false;
  console.error('❌ Build failed – fix issues before proceeding');
}

// Update build result in session log
let logUpdate = fs.readFileSync(logPath, 'utf8');
logUpdate = logUpdate.replace('(will be filled after build)', buildSuccess ? '✅ succeeded' : '❌ failed');
fs.writeFileSync(logPath, logUpdate);

// 6. Reminders for docs
console.log('\n📝 Remember to manually update the following docs if applicable:');
console.log('- ROADMAP.md (strategic priorities)');
console.log('- README.md (project overview / usage)');
console.log('- CHANGELOG.md (record this session’s changes)');
console.log('- AI-RULES.md (if any workflow/policy changed)');

// Optional auto‑append a note to each doc (non‑critical, just a log entry)
function appendDoc(file) {
  try {
    const fullPath = path.join(file);
    fs.appendFileSync(fullPath, `\n<!-- Session ${ts} logged -->\n`);
    console.log(`✅ Appended session note to ${file}`);
  } catch (e) {
    console.warn(`⚠️ Could not append to ${file}: ${e.message}`);
  }
}
['ROADMAP.md','README.md','CHANGELOG.md','AI-RULES.md'].forEach(appendDoc);


process.exit(buildSuccess ? 0 : 1);
