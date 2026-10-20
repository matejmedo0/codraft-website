# Taste Skill (2026-10-20)

The client asked for a critical evaluation of the outside skill [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (also presented at https://www.tasteskill.dev/): what overlaps with the project's skills, agents and rules, what is useful for this project, and what is useful for web work in general. The conclusion led to [ADR 0027](../decisions/0027-taste-skill-ideas-in-the-setup.md): the skill is not installed; five checks go into the `design-critic` agent, scroll-driven motion and page transitions into the global `animate` skill, and a "page's argument" step into phase 3. The site's code does not change. The client's general notes on the skill, for later projects, are kept outside this repository.

## Source

- **Repository:** https://github.com/Leonxlnx/taste-skill, cloned at commit `63aba5f` (2026-10-20, release 2.1.3 of 2026-10-19). MIT licence, © 2026 Leonxlnx.
- **What it is:** one skill, `design-taste-frontend` ("tasteskill v2"), installed with `npx skills add` or as a Claude Code plugin. About 3 MB:
  - `SKILL.md` (39 KB) and 11 references (about 280 KB): copy, type, colour, layout, imagery, motion, scroll scenes, critique, the tells of generated pages, the study, app screens
  - 9 Node scripts with no dependencies (about 330 KB): `draw.mjs` deals an art direction from the library; `assets.mjs` searches open image and video collections; `lint.mjs` scans source; `inspect.mjs` renders the page in headless Chrome over the DevTools protocol and measures it; `scenes.mjs` photographs scroll scenes; `lib/` holds the DevTools client, the in-page measurements and the rules
  - a JSON library (about 1.7 MB): 20 directions, 58 hero and 185 section compositions, 44 type systems, 56 palettes, 19 photo sets (Unsplash via Lorem Picsum), 202 studied sites, 18 motions, app styles
  - neutral CSS and JS for pages, app screens, charts and the scroll-scene stage; evals; a frontmatter test
- **Read in full:** `SKILL.md`, the README and CHANGELOG, all 11 references, every script (`draw`, `assets`, `lint`, `inspect`, `scenes`, `lib/cdp`, `lib/probe`, `lib/rules`, `lib/app-draw`), `base.css`, `base.js`, the scene stage, the frontmatter test, `evals.json`, the plugin manifests and `install.sh`.
- **Read in part:** the JSON library (structure, the 20 directions, and every entry about architecture, drafting, navy or paper, through a script of our own); `charts.js` and `app.css` (headers, and a scan for network calls and `innerHTML`).
- **tasteskill.dev:** the same skill with an older description (it still calls v2 experimental and lists skills that have moved to other repositories), plus a promotion of TasteCode, a separate desktop app in another repository, not evaluated.
- **Confidence: high** for what the skill says and does, read from the source. Outside checks are marked below.

## How it works

1. Inventory what only this client has (name, street, numbers, constraints, materials).
2. `draw.mjs` deals three of 20 directions at random within the brief; the agent picks one; the script deals hero, sections, type, palette, photos and a motion. Recent draws are remembered in `~/.taste-skill/history.json`.
3. One sentence ties the client's material to the direction's device, checked against the nearest competitor; plus "one live thing" the visitor can do.
4. Copy first, then build; at least four real pictures, found in open collections with `assets.mjs` when the client has none.
5. `lint.mjs` and `inspect.mjs` fail the page on the house rules.
6. The agent scores its own screenshots on an Awwwards-weighted rubric and fixes the top three problems, up to three rounds. A build takes 30–45 minutes and a few hundred thousand tokens, by the README.

## Quality

**Strong:**
- **The idea comes from the subject.** The inventory, the competitor test ("if the sentence still works with the competitor's name, the idea belongs to the category") and the warning that removing ornaments leaves an empty page unless substance replaces them.
- **Honest about proof.** `copy.md` §5 forbids invented customers, quotes, logos and numbers and says what to use instead: the thing itself, how it works, the facts of the brief. This is ADR 0004 in practice.
- **The frame of a page,** measured in the browser (`lib/probe.mjs`, `layout()`): equal outer margins, sections huddled on one side, blank stretches, untitled sections, text against the screen edge, the number of left edges, the title readable 1.2 s after load, text hidden under reduced motion, text covered while scrolling.
- **Motion data that was measured, not judged:** the curves, durations and staggers that actually ran on 99 Awwwards Sites of the Day, the cost of preloaders, the trigger points of reveals.
- **`assets.mjs`:** keyless search of Openverse, Wikimedia Commons, the Art Institute of Chicago, the Met, the Internet Archive's Prelinger films and NASA; only licences that allow commercial use by default; share-alike, US-only public domain and personality-rights notes; a size cap for video; every download recorded with its credit.
- **`app-screens.md`:** the most careful part: numbers that add up, one hue on the data, honest zeros and empty states, the phone fold. For dashboards, not for this site.

**Weak:**
- **The house rules ban this project's direction:** hairline rules and grids, crop marks and selection handles, 01/02/03 numbering, monospace, gradients (the graph paper is drawn with them), small tracked capitals; they require at least four photographs and at least eight moving elements per page, and headlines of two lines at most.
- **By the author's own account, several bans are taste, not data.** `research.md` §6: monospace labels (44 % of top sites against 24 % of weak ones), index numbering (38 % against 21 %) and thin rules (61 % against 52 %) are *more* common on the strongest sites; they are banned "by the owner's choice".
- **Weak evidence that it helps.** In five rounds of blind tests (`research.md` §11) the skill's average never beat the no-skill baseline: 6.6 against 7.7, 7.1 against 8.0, 7.5 against 7.5, 6.9 against 7.9, and 7.7 against 7.8 in the last round (where it won two briefs of three). One model juror per brief; the last round reused the previous briefs. The 247-site study was also scored by model readers from screenshots.
- **The trigger is too broad for a project with a direction:** any build, redesign or review of a public web page, in any stack, Astro included. In phase 3 it would load on every page and push against ADR 0015.
- **Errors and gaps in the source:**
  - `SKILL.md` and `scenes.md` point to `library/scenes.json` and `assets/scenes/demo/`, which do not exist (the scene library is deferred to 2.2; the script tolerates its absence).
  - The scene stage loads GSAP and Lenis from jsDelivr without Subresource Integrity.
  - `charts.js` writes labels into `innerHTML` without escaping, and sets inline `style` attributes, which a hash-based CSP blocks.
  - The colour rule ("cream": hue 22–62°, saturation ≥ 16 %, lightness ≥ 88 %) also catches this project's final brand ground `#F6F5F1` (about 48°, 22 %, 96 %), which it would flag as a generated-page palette.
- **Executables and side effects:** no telemetry or analytics (every network call checked: only the open collections in `assets.mjs`, the page being inspected, and the CDN in the scene stage). It launches the installed Chrome with a throwaway profile in the temp folder, deletes leftover `ad-chrome-*` folders there older than three minutes, writes `.taste-skill/` in the project and `~/.taste-skill/history.json`.

## Checked against this project

| What | Result | Confidence |
|---|---|---|
| `lint.mjs` over `src/` (read-only, run from the scratchpad, 2026-10-20) | 40 FAIL and 12 WARN: 20 thin rules, 16 gradients, 3 × 01/02/03, 1 shadow; 11 outlined boxes, 1 em-dash count. 35 of the 40 FAILs are in the lab prototypes (`src/lab/`). In production code: the graph paper (`.graph-paper` in `src/styles/utilities.css`, four `linear-gradient` grids) and one "shadow" (`Footer.astro:140`), which is the title block's cell lines drawn with `box-shadow`, a false positive. | High |
| `inspect.mjs` on `/lab/pocetna` | **Not run.** The permission system blocked it as outside code launching a browser; it waits for the client's word. | — |
| `overflow: hidden` makes a scroll container, so a `view()` scroll timeline inside it doesn't move; `overflow: clip` doesn't | Confirmed: [MDN, overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) ("`overflow: clip` doesn't create a scroll container, so clipped elements are skipped when the user agent goes up the DOM tree looking for the nearest ancestor scroll container") and [MDN, view()](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view) ("inside its nearest scroll container"). | High |
| Support for scroll-driven animations | Chrome and Edge since 115 (2023), Safari since 26 (2025); Firefox stable still behind a flag in mid-2026, by secondary sources ([buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026), [drweb](https://www.drweb.de/css-scroll-animationen-ohne-javascript/)); MDN marks it "not Baseline". | Medium |
| Support for cross-document view transitions | Chrome 126+ and Safari 18.2+; Firefox not supported ([Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions)). | Medium |

**The skill's own library supports the direction it would ban.** Among its studied sites:
- **Heron AI** (7.7): "an AI agent that checks architects' models … shown as a drafting sheet: elevations and floor plans on warm paper", with drawings that "build in stages (structure, then detail, then dimensions)", close to the home page's floor plan.
- **Illoca** (8.2): "software for architects sold as a drafting table … on graph paper".
- **The New Industrials** (8.3): "a long-read essay laid out inside a visible drafting grid".
- **Neutomni** (7.6): a small web studio whose "process is one drawing that crosses all the step blocks", like the process line of "Što radimo".

Its own principle, "the page is an artefact from the subject's world", describes Codraft's drawing sheet and title block. The conflict is with its house style, not with its method.

## Overlap

| Part of the skill | In this project already | Verdict |
|---|---|---|
| Directions dealt from a library | Direction chosen (ADR 0015) | Skip |
| House rules, lint, inspector caps | Conflict with ADR 0015 | Skip |
| Critique rubric (14 passes, weighted score, caps) | `design-critic`: blind first look, eleven criteria, re-check (ADR 0024, 0025) | Take five checks (below); skip the numeric score and the caps |
| Headline readable on the first frame; nothing hidden under reduced motion | `docs/motion.md` rules 4 and 6; critic criterion 7 | Skip |
| Motion recipes | `animate`, `animation-performance`, `docs/motion.md` | Take what is missing: scroll-driven CSS, page transitions, measured values |
| Hover gating, `100svh`, 16 px fields | `mobile-native`, `web-standards.md` | Skip |
| Copy tells (English stock phrases) | `npm run check:guardrails`; the client owns the copy | Skip |
| Imagery from open archives | ADR 0004; brand imagery rules | Skip here; general note |
| App screens | No dashboard in scope | Skip here; general note |
| Scroll scenes (GSAP, Lenis) | CSP and a 15 KB budget | Skip |

## Decided (ADR 0027)

- **Not installed.**
- **`design-critic`** (`.claude/agents/design-critic.md`) gains five checks:
  1. **the frame**, computed from `metrics.json` and confirmed in the screenshots: equal outer margins, the header on the content's margins, no text within 16 px of the screen's edge, two or three left edges, no blank stretch over half a screen, no half left empty; every large empty area is a rest that something closes or a hole
  2. **the idea reaches the last zone and every page, and sameness of layouts**, with the client's deliberate repetitions as questions
  3. **the costume test** for the drafting language: every device carries something real; anything that carries nothing is a question for the client
  4. **three levels of detail** in drawings
  5. **Croatian typesetting details** (a number and its unit, dates) and **the character budget** of a heading that is too long, as a copy question
- **`animate`** (global) gains scroll-driven CSS animation and cross-document view transitions in its tool ladder and recipes, the values measured on award sites for marketing pages, limits that keep moving text readable, and three "never ship" rows. Its scroll-reveal recipe now keeps the hidden state under a `js` class and `no-preference`, as `docs/motion.md` does. A copy of the earlier version is in `~/.claude/backups/2026-10-20-taste-skill/`; the MIT notice is in `LICENSE-taste-skill`.
- **Phase 3** (`docs/phases/3-pages.md`) starts each page with its argument: one claim and its verifiable proof per zone.
- **Nothing in the site's code changes.**

## For later

- **The browser bar's colour (`theme-color`, open item 9).** `colour.md` §5: "The page's meta theme colour and the navigation follow the first field." That is the skill's rule, not a measurement; it argues for the paper `#F6F5F1` of the header. The client decides after trying both on a phone.
- **`inspect.mjs` on `/lab/pocetna`,** on the client's word: a one-off measurement, output to the scratchpad, with its temporary Chrome profile in the scratchpad too. Its frame checks would cross-check the critic's new criterion 4 checks; most of its FAILs would be the client's direction.
- **The capture could measure the frame itself** (margins, blank runs, left edges, as `probe.mjs` `layout()` does), instead of the critic computing it. That is a change to `scripts/design-capture/`, so it waits for the client's word.
