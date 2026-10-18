---
name: security-scrub
description: Find and remove secrets, real hostnames, IPs, credentials, and private data from a repo before publishing. Use before any public release, screenshot commit, or README update.
---

# security-scrub

## Checks

1. `gitleaks detect --redact --no-banner` over the full history. Any finding means the secret is compromised: report it, never print it, and ask the owner to rotate it.
2. Search tracked files for: private IP ranges (`10.`, `172.16-31.`, `192.168.`), tailnet IPs (`100.64-127.`), internal domains, emails, usernames, tokens, API keys, `.env` files, SSH keys.
3. Check docs, screenshots, logs, and issue templates, not just code.
4. Confirm `.gitignore` covers `.env*` (except `.env.example`) and key files.
5. Confirm compose files bind to `127.0.0.1` and contain no credentials.
6. Run `trivy image` on the built image and review HIGH and CRITICAL results.

## Rules

- Never print a secret value in output, logs, or reports. Redact.
- Removing a secret from the latest commit does not remove it from history. Say so and ask before rewriting history. Never force-push without approval.
- Replace real examples with clearly fake ones (`example.com`, `192.0.2.x`, `user@example.com`).

## Report

List findings by file and line with severity, no secret values, and the fix applied or needed.
