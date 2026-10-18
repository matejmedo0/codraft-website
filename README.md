# Codraft website

The website of **Codraft**, a small studio that plans, builds and looks after websites, software and AI tools for businesses. Engineering drafting (CAD) is a separate offering.

- **Languages:** Croatian (default, at `/`) and English (`/en`)
- **Market:** Croatia
- **Status:** phase 0 (Foundation) done; waiting for the go-ahead for phase 1 (Architecture). Live status: [PROGRESS.md](PROGRESS.md) (Croatian).

## Repository structure

```
.claude/rules/          How Claude Code works on this project (phases, gates, authority)
.github/                PR template, issue forms, CODEOWNERS (CI and Dependabot from phase 1)
Assets/codraft-brand/   Final brand package: read-only masters
docs/                   Project documentation and the plan by phase
CLAUDE.md               Entry point for Claude Code
CONTRIBUTING.md         How we work: phases, branches, commits, PRs, definition of done
PROGRESS.md             Live status (Croatian)
```

The application code arrives in phase 1, once the stack is chosen. The principles it will follow are in [docs/architecture.md](docs/architecture.md).

## Documentation

Start with [docs/README.md](docs/README.md). Key documents:

| Document | Contents |
|---|---|
| [docs/phases/](docs/phases/README.md) | Roadmap and one document per phase (0–8) |
| [docs/information-architecture.md](docs/information-architecture.md) | Sitemap, URLs, page outlines |
| [docs/content.md](docs/content.md) | Site copy (source of truth), HR drafts, suggestions, gaps |
| [docs/brand.md](docs/brand.md) | Brand marks, colours, contrast, typography |
| [docs/motion.md](docs/motion.md) | Motion concept |
| [docs/compliance.md](docs/compliance.md) | Croatian and EU requirements |
| [docs/decisions/](docs/decisions/README.md) | Architecture Decision Records |

## Getting started

There is no application code yet. Setup, scripts and commands are added in phase 1 (see [docs/phases/1-architecture.md](docs/phases/1-architecture.md)).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

Proprietary. © 2026 Codraft. All rights reserved. The brand marks in `Assets/` may not be used outside Codraft's own materials.
