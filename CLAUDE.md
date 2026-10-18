# Codraft

Website for Codraft, a small team studio that plans, builds and looks after websites, software and AI tools for businesses, with engineering drafting (CAD) as a separate offering.

## Where things are

- **Live status** (Croatian): `PROGRESS.md`. Current phase, next step, decisions, open questions, and what we need from the client.
- **How Claude works:** `.claude/rules/codraft-workflow.md`. Phases, gates, authority, and the skills and agents for each phase.
- **Documentation:** start at `docs/README.md`.
  - The plan by phase is in `docs/phases/`, one document per phase. Read the current phase's document at session start.
  - Decisions (ADRs) are in `docs/decisions/`; dated research notes with sources are in `docs/research/`.
- **Site copy, source of truth:** `docs/content.md`. EN verbatim, HR draft, glossary, suggestions, gaps.
- **Sitemap, URLs and page outlines:** `docs/information-architecture.md`.
- **Brand assets:** `Assets/codraft-brand/`.
  - This is the final package. The masters are read-only; the site uses optimised copies.
  - See the package README and `docs/brand.md`.

## Languages and market

- Croatian is the default language at `/`; English is under `/en`.
- Each language has localised ASCII slugs (ADR 0002).
- Market: Croatia.

## Site structure (launch)

| Page (HR) | HR | EN |
|---|---|---|
| Početna | `/` | `/en` |
| Usluge | `/usluge` | `/en/services` |
| CAD crtanje | `/cad-crtanje` | `/en/engineering-drafting` |
| O nama | `/o-nama` | `/en/about` |
| Besplatna analiza | `/besplatna-analiza` | `/en/free-audit` |
| Kontakt | `/kontakt` | `/en/contact` |

- **Usluge** has three anchored stages: 01 Planiranje, 02 Izrada, 03 Održavanje i rast.
- **Also at launch:** Privatnost, Kolačići, Impresum, Izjava o pristupačnosti, and a localised 404.
- **Phase 4:** AI asistenti (`/usluge/ai-asistenti`).
- **Later:** Radovi, Blog.
- The slugs become final once the client approves the Croatian terminology. Details: `docs/information-architecture.md`.

## Brand

The wordmark is a geometric sans in navy `#0F1B2D`, on an off-white `#F6F5F1` ground. The blue `#2F6BFF` accent has two parts:
- an arc on the "c"
- a drafting line that forms the "f"/"t" crossbars and ends in a CAD grip square

**Blue is for graphics and large text only.** It measures 4.12:1 on off-white, which fails AA for body text. Primary buttons are navy. See `docs/brand.md`.

## Copy guardrails

- **Drafting is not projektiranje.** Never describe Codraft's drafting as projektiranje, projektant or projektna dokumentacija; that work is regulated in Croatia. Say "crtamo prema vašim skicama i standardima" (`docs/compliance.md`).
- **No invented proof:** no invented clients, testimonials, logos or metrics (ADR 0004).
- **The English copy changes only through suggestions the client approves** (`docs/content.md`).

## Git

- Repository: `matejmedo0/codraft-website` on GitHub (private).
- One branch and PR per phase. Merge to `main` only on the client's word.
- Conventional Commits. See `CONTRIBUTING.md`.

## Stack and commands

Not chosen yet. Filled in during phase 1 (`/init`).
