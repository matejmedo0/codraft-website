# butter.video as a model for Home (2026-10-29)

The client asked for a review of butter.video and for Codraft's Home built on it, "with all the content that matters for our site and what Codraft does". The result is a lab study, `/lab/pocetna-butter` (`src/lab/butter/`), apart from Home and the new Home. Earlier the same day the client asked for a review of grail-app.com; its notes are at the end.

## butter.video, as seen on 2026-10-29

Source: https://www.butter.video/ (viewed in Chrome at 1536 px). Confidence: high for layout and copy, medium for the libraries (read from loaded file names).

- **Look:** a light grey ground (#FAFAFA) and grey cards (#EDEDED), black product screens with large rounded corners (about 40 px), a tight grotesk at large sizes (DieGrotesk) and small monospaced labels (ABCDiatype).
- **Header:** two floating pills; the left one holds the logo and the links, the right one Login and a black "Try for free". On scroll the links fold into a "⋮" menu.
- **Zones, in order:**
  1. Hero: a 3D keychain (three.js) above a large centred headline, one line and one button.
  2. A strip of client logos.
  3. One large centred statement with small icons set in its words.
  4. A timeline screen with a ruler and clips; the statement's icons fly into it.
  5. Three stories: sticky text on one side, a tall black product screen on the other, sides alternating.
  6. Four feature cards with a heading and a "View All Features →" button.
  7. "Create in 3 ways": large words (Remix, Describe, Code), one active and the others grey, beside a screen.
  8. A template gallery that scrolls sideways.
  9. A highlight block, then two cards side by side with round arrow buttons.
  10. Footer: link columns with small labels, the wordmark across the full width, one line at the foot; the page above ends in rounded corners.
- **Weight:** 49 videos, a WebGL canvas and many trackers (Meta, Google, Bing, X, Clarity and others).

## How the study maps it to Codraft

All copy comes from the approved locale strings (`src/locales/hr.json`); prices and timelines from `src/config/pricing.ts`; the team from `src/config/team.ts`. No new copy, no new dependency, no client-side JavaScript of its own (the floor plan keeps its own scripts).

| Butter | The study |
|---|---|
| Pill header with "Try for free" | Wordmark and links; EN and Kontakt as the navy pill; no audit button (ADR 0017) |
| 3D keychain | A drafting line selected in CAD, its three grips snapping in (the wordmark's accent) |
| Client logos | The services' names, moving with the scroll only; no logos (ADR 0004) |
| Statement with icons | `services.intro` with the service icons |
| Timeline screen | "Tijek suradnje": four steps on a ruler, a playhead tied to the scroll |
| Three stories | The three stages, each with a navy "properties panel" of its services, prices and timelines |
| Feature cards | "Kako radimo": the three principles, with the team and two FAQ answers as scenes |
| "Create in 3 ways" | Tehničko crtanje: the floor plan that rises into a house, and the three drafting services as an exclusive accordion |
| Template gallery | The seven FAQ cards, scrolling sideways; no invented work (ADR 0004) |
| Highlight block | The free audit, with the page's one audit button and its three booking steps |
| Two cards | Team (photos pending) and the closing question with "Pošaljite upit" |
| Footer | Link columns, the wordmark across the width, the pending company data |

**Departures from the design system:** the cards, panels and buttons are rounded (ADR 0015 keeps the site square), and navy is used for many panels, not once a page. Both are the look the client asked for; both sit in one place (`src/lab/butter/butter.css`).

**Motion:** CSS only. Content rises in, the strip moves and the playhead runs only where the browser ties animation to scrolling (`animation-timeline: view()`). Elsewhere, and with reduced motion, everything shows its final state. Nothing moves on its own (WCAG 2.2.2).

**Not taken:** the 3D object, the video tiles, the icons flying between zones, the header folding on scroll, and the trackers.

**Checked:** at 375 and 1440 px, no sideways scroll at 375 px; the phone menu opens; no console errors in dev or in the lab build under its CSP; `astro check`, ESLint and the copy guardrails pass.

## grail-app.com, reviewed the same day

Source: https://grail-app.com/ (viewed in Chrome at 1536 px). Confidence: high for layout, medium for the libraries.

- A single long story in eight "chapters", each zone labelled ("About Problem" on the left, "Chapter 01" on the right), with the background changing colour per zone.
- Very large serif headlines, letters rising from a mask, words filling in as the page scrolls, zones that pin and are covered by the next one as a tilted card, and a floating "Join Waitlist" pill that travels left to right as a scroll progress bar.
- About 1 MB of JavaScript, uncompressed: three.js (551 KB) for a 3D totem, matter.js (82 KB) for falling shapes, and Lenis for smooth scrolling.
- Suggested to the client in chat: the zone labels as title-block fields, a large headline rising from the frame's line, and the wordmark's grip as a scroll progress mark. The client has not chosen any of them yet.
