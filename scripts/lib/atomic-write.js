const fs = require('fs');
const path = require('path');

// Atomic file write for build scripts (#79). Build scripts write directly into
// committed output files (index.html, etc.) with no staging — a crash mid-write
// (disk full, process killed) can leave a truncated/corrupted file that the next
// build or commit could capture as-is. Writing to a temp file in the SAME
// directory first (so the final rename stays on one filesystem, which is what
// makes the rename atomic) means a failed write never touches the real target;
// the rename itself is a single atomic filesystem operation, so there's no
// window where the target is half-written.
function writeFileAtomic(filePath, content) {
  if (!content) {
    throw new Error(`writeFileAtomic: refusing to write empty content to ${filePath}`);
  }

  const dir = path.dirname(filePath);
  const tmpPath = path.join(dir, `.${path.basename(filePath)}.tmp-${process.pid}-${Date.now()}`);

  try {
    fs.writeFileSync(tmpPath, content);
    fs.renameSync(tmpPath, filePath);
  } catch (error) {
    try { fs.unlinkSync(tmpPath); } catch { /* tmp file never got written, or already gone */ }
    throw error;
  }
}

module.exports = { writeFileAtomic };
