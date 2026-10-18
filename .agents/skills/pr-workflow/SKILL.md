---
name: pr-workflow
description: Branch, commit, open a pull request, and shepherd CI to green using git and the gh CLI. Use whenever agent work needs to be delivered to a repo.
---

# pr-workflow

## Steps

1. Start from an up-to-date default branch: `git switch main && git pull --ff-only`.
2. Create a branch: `git switch -c agent/<short-task-name>`.
3. Make small, logical commits with Conventional Commit messages (`feat:`, `fix:`, `docs:`, `chore:`).
4. Run the project checks locally before pushing.
5. Push: `git push -u origin HEAD`. Never push to `main`. Never force-push without approval.
6. Open the PR: `gh pr create --fill`, then fill in what changed, why, and how it was tested.
7. Watch CI: `gh pr checks --watch`. If it fails, read the logs (`gh run view --log-failed`), fix, push again.
8. When green, report the PR link, check status, and anything the reviewer must look at. Do not merge unless told to.

## Rules

- One concern per PR. Split unrelated work.
- Do not edit workflow files to make a failing check pass. Fix the cause.
- If the same check fails twice, stop and report what you tried.
