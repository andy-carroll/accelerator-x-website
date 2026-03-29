#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

function run(command) {
  return execSync(command, { stdio: 'pipe' }).toString().trim();
}

function shQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function expandHome(inputPath) {
  if (!inputPath) return inputPath;
  if (inputPath === '~') return os.homedir();
  if (inputPath.startsWith('~/')) return path.join(os.homedir(), inputPath.slice(2));
  return inputPath;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseArgs(argv) {
  const args = { force: false, profilePath: '.agent-skills-profile.json' };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--force') {
      args.force = true;
    }
    if (token === '--profile') {
      args.profilePath = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function loadProfile(profilePath) {
  if (!fs.existsSync(profilePath)) {
    throw new Error(`Profile file not found: ${profilePath}`);
  }

  const raw = fs.readFileSync(profilePath, 'utf8');
  const profile = JSON.parse(raw);

  if (!profile.canonicalRepo || typeof profile.canonicalRepo !== 'string') {
    throw new Error('Profile must include canonicalRepo (git URL).');
  }

  return {
    canonicalRepo: profile.canonicalRepo,
    ref: profile.ref || 'main',
    skillsPath: profile.skillsPath || 'skills',
    installDir: expandHome(profile.installDir || '~/.claude/skills'),
    syncMode: profile.syncMode || 'symlink',
    namespace: profile.namespace || 'shared',
    namePrefix: profile.namePrefix || '',
  };
}

function repoSlug(repoUrl) {
  return repoUrl
    .replace(/^https?:\/\//, '')
    .replace(/^git@/, '')
    .replace(/[/:]/g, '-')
    .replace(/\.git$/, '');
}

function syncCanonicalRepo(profile) {
  const cacheRoot = path.join(os.homedir(), '.cache', 'agent-skills');
  const repoDir = path.join(cacheRoot, repoSlug(profile.canonicalRepo));
  ensureDir(cacheRoot);

  if (!fs.existsSync(path.join(repoDir, '.git'))) {
    run(`git clone --depth 1 --branch ${shQuote(profile.ref)} ${shQuote(profile.canonicalRepo)} ${shQuote(repoDir)}`);
  } else {
    run(`git -C ${shQuote(repoDir)} fetch origin ${shQuote(profile.ref)}`);
    run(`git -C ${shQuote(repoDir)} checkout ${shQuote(profile.ref)}`);
    run(`git -C ${shQuote(repoDir)} pull --ff-only origin ${shQuote(profile.ref)}`);
  }

  return repoDir;
}

function listSkillDirectories(sourceSkillsDir) {
  return fs
    .readdirSync(sourceSkillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name);
}

function readManagedManifest(installDir) {
  const manifestPath = path.join(installDir, '.managed-skills.json');
  if (!fs.existsSync(manifestPath)) {
    return { namespaces: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return { namespaces: {} };
  }
}

function writeManagedManifest(installDir, manifest) {
  fs.writeFileSync(path.join(installDir, '.managed-skills.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function linkOrCopySkill({ sourcePath, targetPath, syncMode }) {
  if (syncMode === 'copy') {
    fs.cpSync(sourcePath, targetPath, { recursive: true, force: true });
    return;
  }
  fs.symlinkSync(sourcePath, targetPath, 'dir');
}

function syncSkills(profile, sourceSkillsDir, force) {
  ensureDir(profile.installDir);

  const manifest = readManagedManifest(profile.installDir);
  const previous = new Set(manifest.namespaces[profile.namespace] || []);
  const skillDirs = listSkillDirectories(sourceSkillsDir);
  const currentManaged = [];
  const warnings = [];

  for (const skillName of skillDirs) {
    const targetName = `${profile.namePrefix}${skillName}`;
    const targetPath = path.join(profile.installDir, targetName);
    const sourcePath = path.join(sourceSkillsDir, skillName);

    const existing = fs.lstatSync(targetPath, { throwIfNoEntry: false });
    if (existing) {
      if (!force) {
        warnings.push(`Skipped existing skill: ${targetName} (use --force to replace)`);
        currentManaged.push(targetName);
        continue;
      }
      removePath(targetPath);
    }

    linkOrCopySkill({ sourcePath, targetPath, syncMode: profile.syncMode });
    currentManaged.push(targetName);
  }

  for (const oldTargetName of previous) {
    if (!currentManaged.includes(oldTargetName)) {
      removePath(path.join(profile.installDir, oldTargetName));
    }
  }

  manifest.namespaces[profile.namespace] = currentManaged;
  writeManagedManifest(profile.installDir, manifest);

  return { managed: currentManaged, warnings };
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const profilePath = path.resolve(process.cwd(), args.profilePath);
    const profile = loadProfile(profilePath);
    const repoDir = syncCanonicalRepo(profile);

    const sourceSkillsDir = path.join(repoDir, profile.skillsPath);
    if (!fs.existsSync(sourceSkillsDir)) {
      throw new Error(`skillsPath not found in canonical repo: ${sourceSkillsDir}`);
    }

    const result = syncSkills(profile, sourceSkillsDir, args.force);

    const output = {
      profile: profilePath,
      canonicalRepo: profile.canonicalRepo,
      ref: profile.ref,
      sourceSkillsDir,
      installDir: profile.installDir,
      syncMode: profile.syncMode,
      namespace: profile.namespace,
      managedSkills: result.managed,
      warnings: result.warnings,
    };

    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`skills-sync failed: ${error.message}\n`);
    process.exit(1);
  }
}

main();
