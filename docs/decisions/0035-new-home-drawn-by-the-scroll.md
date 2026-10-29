# 0035. The new Home drawn by the scroll

- **Status:** Accepted; supersedes the step-by-step build of [0033](0033-new-home-by-the-clients-rules.md) for the new Home, and lifts the "Ruled out" list of `docs/motion.md` (pinned scroll scenes, scroll-driven depth) for this page only
- **Date:** 2026-10-29
- **Deciders:** client (Codraft team), Claude

## Context

The new Home had been built one instruction at a time (ADR 0033): the frame, the palette, the header, and an empty hero. On 2026-10-29 the client asked for a complete redesign of the page as a professional, animated, scroll-based page, told Claude to set aside the rules written in the documentation, and gave approval to build it in one go (M25 in `docs/phases/3-pages.md`). The project's motion concept rules out pinned scroll stories and parallax for the site (`docs/motion.md`, "Ruled out"), and the step-by-step rules (`docs/new-home-rules.md`) say the hero is empty and each zone waits for a decision.

## Decision

The new Home at `/lab/nova-pocetna` is one drawing sheet that the scroll drafts: the scroll is the pen. Its structure, in `src/views/new-home/`:

- **The pen:** a drafting line on the sheet's left frame grows with the page scroll and its grip travels down the screen (`scroll(root)` timeline).
- **The hero** keeps the headline, the lead, the one button to the services and the drafting link. Beside them a technical drawing of a website (`SiteDrawing.astro`: a browser frame, headline bars, a hatched image, a button, three cards, margin guides, dimensions in pixels, a title block) drafts itself once on load, in about 3.3 s. On wide screens it drifts up and fades as the hero leaves.
- **"Što radimo":** the three stages one under the other; from 64rem a stage's head sticks while its services scroll past. Every row's rule is drawn from the left and its icon stroke by stroke as the row arrives (view timelines).
- **The free audit:** one panel, with the three steps as grips joined by a line the scroll draws.
- **"Tehničko crtanje":** the page's one pinned scene. The current Home's house plan (`PlanDrawing.astro`, unchanged) keeps its timelapse, but `plan-scrub.ts` pauses every animation of it and seeks them to the scroll progress of a tall track (300vh from 64rem, 220vh below), so the visitor's own scrolling drafts the plan, raises it into 3D and sets the roof.
- **"Kako radimo",** the team and the closing call to action follow, each entered by the same drafting grammar; the closing zone is entered by a full-width drafting line ending in a grip.

The motion is CSS scroll-driven animations (`animation-timeline`), with the one script above for the plan. The animations exist only inside `@supports` and `prefers-reduced-motion: no-preference`, so a browser without them, reduced motion and no JavaScript all get the finished page; the hero's headline never waits.

The header, the sheet frame, the Midnight palette and the wordmark's colours (ADR 0033, 0034) stay as the client set them. The copy is the Home's, from the locale files, with three new lines for the site drawing's title block and accessible name (`newHome.drawing.*`, `docs/content.md`).

## Consequences

- `docs/new-home-rules.md` rules 1–3 and 5 still hold (the folder, the frame, the palette, the header); rule 4 (an empty hero) and the one-instruction-at-a-time way of building are superseded for this page. New rules from the client's review are still added there.
- `docs/motion.md`'s ban on pinned scroll scenes and scroll-driven depth does not apply to the new Home. If the page goes live at `/`, the motion document gets a section for it.
- The plan's "Iscrtaj ponovno" button is hidden on this page: replaying is the scroll's job. The reduced-motion switch between the 3D view and the plan stays.
- Browsers without scroll-driven animations (older Firefox, Safari before 26) see a static page with every drawing complete.
