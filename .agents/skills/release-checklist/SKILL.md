---
name: release-checklist
description: Prepare and verify a release using release-please, semantic versions, and the published GHCR image. Use when a project is ready to cut a version. Never tag without approval.
---

# release-checklist

Releases are driven by release-please. Conventional commits on `main` produce a release PR. Merging that PR creates the tag, the GitHub release, and triggers the Docker publish. **Merging is the approval step, so ask the owner first.**

## Before asking for approval

- [ ] CI is green on `main`
- [ ] README quick start works from a clean clone
- [ ] Screenshots match the current UI
- [ ] `CHANGELOG.md` entries in the release PR read well
- [ ] No open security findings (`security-scrub` clean)

## After the owner merges the release PR

1. Confirm the tag and GitHub release exist: `gh release view`.
2. Confirm the Docker workflow succeeded: `gh run list --workflow docker.yml --limit 3`.
3. Pull and run the published image: `docker run --rm -p 127.0.0.1:8080:8080 ghcr.io/<owner>/<repo>:<version>` and check `/healthz`.
4. If the repo is public, make sure the GHCR package visibility is public.
5. Report the release URL and image tags.

## Never

Create tags or releases by hand, edit the manifest to force a version, or publish without the owner's approval.
