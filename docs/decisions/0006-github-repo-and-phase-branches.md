# 0006. Private GitHub repository, one branch and PR per phase

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

The client asked for a GitHub repository that follows industry standards and authorised Claude to create it. The project already works in gated phases: each phase ends with exit checks and a report, and the next phase starts only on the client's word. The repository will hold company data, legal drafts and plans before launch.

## Decision

**Repository**
- Private, at `matejmedo0/codraft-website`, with `main` as the default branch.
- It can be transferred to a GitHub organisation later without breaking links; GitHub redirects old URLs.

**Branches**
- One branch per phase, e.g. `phase/1-architecture`, created from `main`.
- Phase 0 is the exception: its commits went straight to `main`, because the repository was created in that phase.

**Commits**
- [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary` in English, e.g. `feat(home): add hero`, `docs(adr): record hosting decision`.

**Phase gate**
- At the end of a phase: commit, push the branch, open a PR to `main`. The PR description is the phase report.
- On the client's word ("idemo dalje"), Claude merges the PR and creates the next phase branch.
- Phase PRs use a **merge commit**, so phase boundaries stay visible in history. Small follow-up PRs may be squash-merged.

**Repository settings**
- Merge commits and squash merging are enabled; rebase merging is disabled.
- Branches are deleted automatically after merge.
- The wiki is disabled, because the docs live in the repo.
- Dependabot alerts and security updates are enabled.

**Branch protection**
- `main` requires a PR and blocks force pushes and deletion, where the GitHub plan allows it for private repositories.
- Otherwise the rule is followed by convention ([CONTRIBUTING.md](../../CONTRIBUTING.md)).

**CI and Dependabot**
- GitHub Actions run install, lint, typecheck, test and build on every PR, from phase 1, once code exists.
- Dependabot also updates npm and GitHub Actions dependencies from phase 1.

**Authority** (recorded in `.claude/rules/codraft-workflow.md`)
- Claude may create branches, commit, push to `origin` and open PRs without asking.
- Merging to `main` happens only on the client's word.
- Changing visibility or settings, adding collaborators and managing secrets always need the client's OK.

## Consequences

- Each phase is reviewable as one PR, with the report attached.
- The GitHub history mirrors the phase plan in `docs/phases/`.
- `main` always holds approved work only.
- On a free personal account, branch protection on a private repository may be unavailable. Discipline then comes from the workflow rules; upgrading or moving to an organisation enables enforcement later.
