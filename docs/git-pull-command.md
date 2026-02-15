# Git Pull Command Explanation

Simple VPS pull process (copy/paste)
Run this in the VPS repo (~/projects/accelerator-x-website):

```bash
cd ~/projects/accelerator-x-website
git checkout main
git fetch origin --prune
git pull --ff-only origin main
git status -sb
```

That’s the standard sync routine each time you want latest from GitHub.

