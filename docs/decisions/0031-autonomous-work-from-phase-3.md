# 0031. Claude works autonomously from the middle of phase 3

- **Status:** Accepted
- **Date:** 2026-10-22
- **Deciders:** client (Codraft team), Claude

## Context

Until the second session of phase 3, every page waited for the client's OK twice: on its argument and copy before the build, and on the build in a review (`docs/phases/3-pages.md`, M1–M5). Questions such as „kako da… / ili da…?“ waited for an explicit OK, and wider changes went to the client as options. On 2026-10-22 the client changed this (M6, M7, verbatim in the phase log):

- Work as autonomously as possible with the existing plan, rules, skills, hooks and agents; implement as much of the project as possible.
- Finish whole pages: design, responsive layout, navigation, interactions, forms, motion. Images become placeholders; Claude writes the texts. Motion and UX details are built now.
- Prices: research the market and set them about 10% lower, with the sources and assumptions documented.
- Take design, architecture, technical and minor business decisions alone, consistent with the project.
- Ask only for decisions that are truly irreversible or critical.
- Go through phase 3 and on through the next phases, up to launch if needed; leave no TODOs that can be solved now.
- Worktrees and the like need no question (M7).
- At the end, a short report: what was done, what was checked, what needs the client's decision.

## Decision

1. **Inside the project's rules, Claude decides and builds without waiting.** Each page still starts with its argument and copy in the docs (ADR 0027, `docs/content.md` first), but the build follows at once. The client reviews everything at the end, all pages together, as planned for the proofreading (#73).
2. **What stays fixed:** the accepted ADRs (unless a new ADR supersedes one, recorded as usual), the copy guardrails (no projektiranje wording, ADR 0018), no invented proof (ADR 0004: no invented clients, numbers, testimonials or company data), the English copy's suggestions recorded in `docs/content.md`, one audit button per page (ADR 0017), the client's messages logged verbatim.
3. **Facts only the client knows** (company data, contact data, photos, the team's bios, CAD samples, terms of business) are never invented. The site shows a placeholder that says what arrives ("Stiže prije objave"), and the open item goes into the final report.
4. **Claude still asks before:** anything that touches the internet beyond `origin` (deploys, DNS, accounts, API keys, paid services, publishing), deleting the client's work, and decisions that can't be undone, such as the final slugs at launch.
5. **Phase gates:** the client's word in M6 is the word for the next phases. Each phase still ends with its checks, documents and PR; Claude merges a phase's PR into `main` when its CI is green and starts the next phase from `main`. Launch (phase 7) needs the client, since it needs the domain, the server and accounts.
6. **Claude's own copy and choices are marked** in `docs/content.md` and in the phase documents, so the client can review them in one pass.

## Consequences

- Much faster progress; the client's review moves to the end, so more may change at once then.
- Claude's draft facts about how Codraft works (marked ⚠ / **confirm**) go on the site before the client confirms them; they must all be confirmed or cut before launch.
- Merging phases into `main` without a review per phase means `main` holds unreviewed work; nothing is deployed until phase 7, which waits for the client.
