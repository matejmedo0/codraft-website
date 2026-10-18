# Phase 2: Design (Dizajn)

- **Status:** Not started
- **Branch:** `phase/2-design`

## Goal

Find a distinctive, professional visual direction built from the brand, and turn it into a design system: tokens, motion and base components, all in code. The client chooses the direction.

## Inputs

| Input | Status | Where |
|---|---|---|
| Brand marks, colours, contrast findings | Final / verified | [brand.md](../brand.md) |
| Motion concept | Agreed | [motion.md](../motion.md) |
| Review method | Agreed: coded prototypes | [ADR 0005](../decisions/0005-design-review-with-coded-prototypes.md) |
| Croatian copy for the prototypes | HR draft of the existing copy (approval pending) | [content.md](../content.md) |
| **Logo entrance animation** | Client decision needed | [brand.md](../brand.md#decisions-pending-phase-2) |
| **C2PA metadata in web copies** | Client decision needed | Same |
| Working stack | From phase 1 | [architecture.md](../architecture.md) |

## Steps

**1. Directions.** Load `frontend-design:frontend-design` and build 2–3 directions from the logo: navy wordmark, blue CAD-handle accent, warm off-white ground. Starting candidates:

| Direction | Character | Risk |
|---|---|---|
| **A "Nacrt"** (drawing sheet) | Off-white paper ground, navy ink, hairline rules, a visible modular grid with margin ticks, monospace dimension labels. The footer is a drawing title block holding the legally required data (Naziv, OIB, MBS, Sjedište, "List 1/1", Zadnja izmjena). Strongest link to both halves of the name. | Can feel cold |
| **B "Noćni nacrt"** (navy-first) | Navy hero and key sections with blue lines; light sections for reading. Premium feel. | Dark-SaaS cliché |
| **C "Studio"** (warm editorial) | Large type and photography; the drafting line appears once per section; the CAD vocabulary lives mostly in interactions. The most human. | Generic minimal agency |

Claude's recommendation is A, borrowing C's photographic warmth. **The client chooses.**

**2. Build each direction as a live prototype** on a local, noindex route (e.g. `/_design/a`, `/b`, `/c`). Each prototype has:
- real Croatian copy, real fonts, real motion
- the hero
- one services section
- a card with grips
- button states
- one signature motion

Take Playwright screenshots at 375, 768 and 1440 px, and let the client click through on localhost.

**3. Tokens** as CSS custom properties:
- **Colour:** brand plus the accessible text tokens from [brand.md](../brand.md#colour), with blue for graphics only.
- **Type scale:** fluid.
- **Spacing, radius** (0–2 px, echoing the grips) and **motion** (from [motion.md](../motion.md)).
- **Fonts:** two families at most, self-hosted WOFF2 with latin-ext, preload one weight, a size-adjusted fallback.

**4. Motion.** Load `motion-foundations` for the tokens, spring presets, `prefers-reduced-motion` and SSR safety.

**5. Brand assets in code:**
- optimised SVG copies of the marks (masters untouched)
- the wordmark's accent split into three paths (c-arc, line, grip)
- a wordmark component that themes `.cd-ink` and `.cd-accent` with `currentColor`
- the `web/` favicon set copied to the public root, with the head snippet added

**6. Base components:**
- header with mobile menu
- footer (title-block style in direction A)
- button, section, card
- grip-focus utility
- dimension annotation
- language switcher (same page, other language)
- skip link

Load `frontend-a11y` for the menu, focus states and skip link.

**7. Style page** showing the tokens and components, with screenshots at three widths.

**8. Figma, only if the client asks:**
- `figma:figma-generate-library` to mirror the chosen system as a Figma library
- always `figma:figma-use` before any `use_figma` call

## Deliverables

- 2–3 prototype routes and screenshots
- ADR for the chosen direction
- Tokens, fonts and motion tokens
- Base components and the style page

## Exit criteria

- [ ] A style page exists with the tokens and base components; screenshots at 375, 768 and 1440 px.
- [ ] The client approves a direction (recorded as an ADR).
- [ ] Contrast meets AA for all text pairs. Blue is never used for body text, and there is no white text on brand blue.
- [ ] Reduced motion is respected; keyboard focus shows the grips plus a visible outline.

## Log

_Not started._
