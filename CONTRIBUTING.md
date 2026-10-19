# Contributing

How the Codraft team and Claude Code work on this repository.

## Phases

The site is built in gated phases (0–8). The roadmap is in [docs/phases/README.md](docs/phases/README.md) and the live status in [PROGRESS.md](PROGRESS.md). The rules for Claude are in [.claude/rules/codraft-workflow.md](.claude/rules/codraft-workflow.md).

A phase ends with these steps, in order:
1. The exit checks pass.
2. `PROGRESS.md`, the phase document and any ADRs are updated.
3. The phase branch is pushed and a PR to `main` is opened, with the phase report as its description.
4. The client reviews the PR.
5. On the client's word, the PR is merged and the next phase starts on a new branch.

## Branches

| Branch | Purpose |
|---|---|
| `main` | Approved work only. Protected by a GitHub ruleset: a PR is required, and force pushes and deletion are blocked. Only the initial phase 0 commits were pushed directly. |
| `phase/<n>-<name>` | One branch per phase, e.g. `phase/1-architecture` |
| `feat/…`, `fix/…`, `docs/…`, `chore/…` | Small changes outside a phase, mostly in phase 8 |

Create branches from an up-to-date `main`.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/), in English, in the imperative:

```
type(scope): short summary

Optional body: what and why, wrapped at ~72 characters.
```

| Type | Use |
|---|---|
| `feat` | New user-facing feature or page |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Tests only |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance |

Suggested scopes: a page (`home`, `services`, `drafting`, `about`, `audit`, `contact`, `legal`), a feature (`audit-form`, `consent`, `chatbot`, `i18n`), or an area (`content`, `design`, `seo`, `a11y`, `adr`, `github`).

One logical change per commit. Commits made with Claude Code carry a `Co-Authored-By` trailer.

## Pull requests

- **Use the PR template.** For a phase PR, the description is the phase report.
- **Merging:**
  - Phase PRs: merge commit, so phase boundaries stay visible in history.
  - Small PRs: squash.
- **CI** (`.github/workflows/ci.yml`) runs on every PR and on pushes to `main`:
  - `verify` on Node 24 and Node 26: lint, format check, typecheck, unit tests, build, JavaScript budget, copy guardrails
  - `e2e` on Node 24: the Playwright tests on the production build

  CI must be green before a merge.
- **Dependabot** opens PRs for npm and GitHub Actions every Monday, with minor and patch updates grouped. TypeScript stays below 6.1 (ADR 0008). Merge them by squash once CI is green.

## Definition of done

A change is done when:
- [ ] It does what the phase document or issue asked.
- [ ] `npm run verify` passes: lint, format check, typecheck, unit tests, build, JavaScript budget and copy guardrails.
- [ ] `npm run test:e2e` passes after `npm run build`, and CI is green on the PR.
- [ ] UI changes are checked at 375, 768 and 1440 px, with no console errors.
- [ ] Keyboard and screen-reader basics work: focus visible, labels present, reduced motion respected.
- [ ] Site copy matches [docs/content.md](docs/content.md); new copy was added there first.
- [ ] The docs are updated: the phase log, `PROGRESS.md`, an ADR for any decision, research notes for any new facts.

## Documentation rules

- `docs/` is the project's memory. If it matters, it is written down there before the phase ends.
- **Decisions** become ADRs in [docs/decisions/](docs/decisions/README.md).
- **Research facts** go to `docs/research/YYYY-MM-DD-topic.md`, with sources.
- **Language:** docs and code in English; `PROGRESS.md` in Croatian.

## Site copy

- The client's English copy is the source of truth. It changes only through approved suggestions ([docs/content.md](docs/content.md)).
- Croatian copy is drafted, then approved block by block.
- Follow the wording guardrails in [docs/compliance.md](docs/compliance.md#copy-guardrails).

## Secrets

Never commit secrets or `.env` files. Declare every variable in the `env.schema` of `astro.config.ts` and document it in `.env.example`. Repository secrets (for CI or deploys) are added only with the client's OK.

## Claude Code settings

`.claude/settings.json` is shared by everyone who runs Claude Code in this repository:
- **Hooks:** edits to `.env` files (except `.env.example`) are blocked, and after every edit Prettier and ESLint run on the changed file and report their findings.
- **Permissions:** the project scripts and common `git` and `gh` commands run without a prompt. Force pushes, branch deletion, `git switch` that discards changes, and `gh pr merge` always ask.

Personal overrides go in `.claude/settings.local.json`, which is gitignored.
