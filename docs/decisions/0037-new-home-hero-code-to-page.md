# 0037. The new Home's hero: centred text and code that builds a page

- **Status:** Accepted; supersedes the hero's site drawing in [0035](0035-new-home-drawn-by-the-scroll.md)
- **Date:** 2026-10-30
- **Deciders:** client (Codraft team), Claude

## Context

ADR 0035 put a technical drawing of a website beside the new Home's headline, drafting itself on load. The client asked (M29 in `docs/phases/3-pages.md`) to replace it with an animation of code being written and turning into a web page or application, to centre the text, and to animate all of it.

## Decision

- **The text is centred** and comes in on load: the headline's two lines rise out of their baselines, then the lead and the actions (the button to the services, the drafting link beside it) fade up.
- **Under it, code that builds a page** (`src/views/new-home/hero/`): an editor types fifteen lines of HTML, each at its own length, and the browser beside it shows the page those lines make, each part appearing as its line is finished, with a brief accent outline as if just selected. A drafting line with its grip joins the two, and the finished page is selected with the four grips. It plays once per load, in about 6.5 s; reduced motion and no JavaScript show it complete.
- The stage is decorative and hidden from assistive technology; the sample page is a placeholder, not client work (ADR 0004).

## Consequences

- `SiteDrawing.astro` and the strings `newHome.drawing.*` are removed.
- The editor uses the system's monospace, since it shows code; the rest of the page stays in Archivo.
