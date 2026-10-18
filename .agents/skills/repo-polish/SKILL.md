---
name: repo-polish
description: Bring one repository to top-tier open-source standard end to end. Use when asked to polish, standardize, or professionalize a repo. Runs the full checklist and delegates to the narrower skills.
---

# repo-polish

Work on one repository at a time, on a branch named `agent/polish`. Never push to `main`.

## Steps

1. **Understand it.** Read the code and existing docs. Write down what it does and how it runs. Create or update `AGENTS.md`.
2. **Run it.** Start it locally with Docker Compose. If it cannot run, document why and stop to ask.
3. **Dockerize.** Follow the `dockerize` skill: Dockerfile, compose file, `.env.example`, `.dockerignore`.
4. **Demo data.** Add a demo mode that needs no real data, so screenshots are safe.
5. **Screenshots.** Follow `screenshot-capture`. Save to `docs/screenshots/`.
6. **README.** Follow `readme-writer`. Every command in it must have been run.
7. **Community files.** LICENSE, SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue and PR templates, CODEOWNERS, dependabot config. Copy missing ones from the template; do not overwrite existing ones.
8. **CI.** Add the caller workflows from the template (`ci`, `docker`, `screenshots`, `release`).
9. **Metadata.** Repo description, homepage, 8 to 15 topics, social preview image.
10. **Scrub.** Run `security-scrub`. Fix every finding.
11. **PR.** Follow `pr-workflow`. Wait for CI green. Report the PR link.

## Done means

Image builds, container is healthy, README quick start works from a clean clone, screenshots are real and scrubbed, CI is green. Paste the real command output as evidence.
