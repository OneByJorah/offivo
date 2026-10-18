---
name: readme-writer
description: Write or rewrite a repository README to a high standard with hero banner, badges, real screenshot, quick start, config table, and architecture diagram. Use for any README task.
---

# readme-writer

## Structure (in this order)

1. Hero banner (`docs/assets/banner.svg`) and one-line pitch
2. Badges: CI, release, license, GHCR image, stars
3. A real screenshot directly under the pitch
4. **Why this exists**: 3 to 4 sentences
5. **Features**: specific, each with its outcome
6. **Quick start**: copy-paste block that works in under two minutes
7. **Configuration**: table of environment variables with defaults
8. **Architecture**: a Mermaid diagram of the real components
9. **Roadmap**, **Contributing**, **Security**, **License**

## Voice

Calm, direct, specific. First person plural or neutral. No hype words ("blazing", "revolutionary"), no filler, no emoji spam.

## Rules

- Describe only what the code actually does. Read it first. Never invent features.
- Run every command in the README on a clean clone. Fix the README or the code if it fails.
- Check every link and image path.
- Replace every placeholder from the template (`VirtOffice`, `Project Name`, "One-line pitch").
- Design colors for banners and diagrams: background `#0a0a09`, accent `#FFB300`, font JetBrains Mono.
- Lint with `markdownlint-cli2`.
