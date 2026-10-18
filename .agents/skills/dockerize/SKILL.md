---
name: dockerize
description: Containerize a project with a production-quality Dockerfile and docker-compose.yml. Use when a repo needs Docker support, a smaller or safer image, or a one-command start.
---

# dockerize

## Dockerfile

- Multi-stage build. Final stage has only what runtime needs.
- Pinned base image tag (digest once verified). No `latest`.
- Non-root `USER`. Own files with `--chown`.
- `HEALTHCHECK` that hits a real endpoint or command.
- Order layers for cache: dependency manifests first, source later.
- `.dockerignore` excludes `.git`, docs, tests, `.env*`, `node_modules`.
- Passes `hadolint` with no warnings.

## docker-compose.yml

- One command start: `docker compose up -d --build`.
- Ports bound to `127.0.0.1` only. Never `0.0.0.0`.
- Configuration through `${VAR:-default}` and a documented `.env.example`. No secrets in the file.
- Hardening when the app allows it: `read_only: true`, `cap_drop: [ALL]`, `no-new-privileges`.
- Named volumes for persistent data, documented in the README.

## Verify

```bash
docker build .
docker compose config -q
docker compose up -d --build
docker compose ps        # healthy
docker compose down -v
```

Image name for publishing: `ghcr.io/<owner-lowercase>/<repo-lowercase>`.
