# Phase 2: design directions (2026-10-19)

> **Status: round 1, reviewed by the client on 2026-10-19.** Three directions are built as live prototypes in the design lab: `/lab/a`, `/lab/b`, `/lab/c`. Steps 1–2 of [2-design.md](2-design.md).
> - **The client takes none of the three as is.** They asked for hybrid options and more motion; see [Client review, round 1](#client-review-round-1-2026-10-19).
> - Round 2 built two hybrids from this review, D and E, described in [2-design-round-2.md](2-design-round-2.md#the-hybrids-as-built-2026-10-19).
> - The lab runs only in `npm run dev` and in `npm run build:lab`. Its pages are noindex and never part of a production build.
> - Screenshots at 375, 768 and 1440 px are in [screenshots/phase-2/](screenshots/phase-2/).
> - Nothing is decided until the client picks. Tokens, fonts, motion and the base components are built only after the choice.

## How to review

1. Run `npm run dev` and open http://localhost:4321/lab.
2. Each prototype is the home page's hero, the services section ("Što radimo"), the CAD section and the footer. A specimen follows: type, colours with contrast, button states, grips and a dimension.
3. Things to try:
   - Narrow the window to phone width, then open the menu ("Izbornik").
   - Press Tab: every link and button shows a blue outline with four grips at its corners.
   - Reload to replay the logo entrance. With "reduce motion" turned on in the operating system, the mark appears complete at once.

**The copy is identical in all three**, so the comparison is about design, not wording. It is the HR draft from [content.md](../content.md). The H1 is a prototype draft for gap G1, listed under "Prototype copy" there. Links to pages that don't exist yet lead to the 404 page.

## What all three share

- **Colour:** the brand colours and the accessible text tokens from [brand.md](../brand.md#colour).
  - Blue `#2F6BFF` appears only as graphics: the drafting line, grips, dimensions and the focus ring.
  - Links use `#2457D6` on light grounds and `#77A0FF` on navy.
  - Primary buttons are navy, or off-white on navy.
- **Motion:** the vocabulary from [motion.md](../motion.md).
  - The hero wordmark plays its entrance once per page load ([ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md)). If the mark starts below the fold, the entrance waits until it scrolls into view.
  - Grips appear on hover and keyboard focus, always with a real outline.
  - Buttons snap to 0.98 on press, and rules draw once as they come into view.
  - The springs from `motion-foundations` (snappy 300/30; snap 400/24 for the logo grip) run as CSS `linear()` curves. There is no animation library.
- **Weight:** each prototype page loads 0.7 KB of gzip JavaScript (the menu and the one-shot reveals), against a budget of 15 KB.
- **Fonts:** self-hosted variable WOFF2, subset to Croatian and English (Basic Latin, Latin-1, Latin Extended-A, typographic punctuation, €). Details: [research/2026-10-19-design-lab.md](../research/2026-10-19-design-lab.md).
- **Checked on the lab build** (`npm run build:lab`, with the real CSP):
  - no console errors at 375, 768 or 1440 px
  - no axe findings at any level
  - no horizontal overflow
  - reduced motion respected

## A "Nacrt" (drawing sheet)

The page is a drawing sheet.

| | |
|---|---|
| Idea | Paper ground and navy ink at drafting line weights. A frame runs around the page, with zone numbers 1–6 along the top and zone letters A–D in the margin, one per section. The footer is the drawing's **title block**: company name, OIB, MBS, registered office, contact, legal links, "List 1 od 6" and "Zadnja izmjena" (the build date). The legally required company data becomes the signature element. |
| Type | **Archivo** (variable width and weight), one family. Headings use the semi-condensed width, so they read like technical lettering; labels and the title block use the condensed width; body text is normal width. 71 KB. |
| Layout | Left-aligned 12-column grid. The hero puts the headline beside a drafting grid that holds the mark. The three stages are rows, each numbered in a grid bubble (the circle at the end of a drawing's grid line), with the services as hairline cards. The CAD section shows a part drawing: a plate with holes and a slot, section A–A, centre lines and dimensions. |
| Signature motion | The wordmark draws on the grid. Zone rules draw as they scroll in. |
| Strength | It belongs to both halves of the name, and the title block answers a legal requirement in the brand's own language. |
| Risk | It can feel cold. The team photos (phase 3) and the plain copy are what warm it. |

Screenshots: [375](screenshots/phase-2/a-nacrt-375.png) · [768](screenshots/phase-2/a-nacrt-768.png) · [1440](screenshots/phase-2/a-nacrt-1440.png) · full page [375](screenshots/phase-2/a-nacrt-375-full.jpg) · [768](screenshots/phase-2/a-nacrt-768-full.jpg) · [1440](screenshots/phase-2/a-nacrt-1440-full.jpg) · focus on a [button](screenshots/phase-2/a-nacrt-focus-button.png) and a [card](screenshots/phase-2/a-nacrt-focus-card.png)

## B "Noćni nacrt" (night drawing)

Navy is the model space where things are drawn, and off-white is the plotted sheet where they are read.

| | |
|---|---|
| Idea | A flat navy hero with a quiet blueprint grid and the reverse wordmark at full width; its drafting line is the largest moving thing on the site. The services sit on an off-white sheet laid on the navy desk. The CAD section shows the part drawing as a blueprint: off-white lines, blue dimensions. There are no glows, gradients or glass. |
| Type | **Schibsted Grotesk** (variable weight), one family. A heavy, tightly set headline gives a firmer, more premium voice. 53 KB. |
| Layout | The hero stacks the headline, the lead and the CTAs above the full-width mark. The services are three columns on the sheet (one per stage). Each service has no box: hovering or focusing one selects it, and its grips appear, as in CAD. |
| Signature motion | The large drafting line drawing across the navy hero. |
| Strength | The most striking first screen, and the brand's navy social images and app icon match it. |
| Risk | A dark hero with one bright accent is a common "dark SaaS" look. Long reading pages (privacy, the drafting page) would need to stay on paper. |

Screenshots: [375](screenshots/phase-2/b-nocni-nacrt-375.png) · [768](screenshots/phase-2/b-nocni-nacrt-768.png) · [1440](screenshots/phase-2/b-nocni-nacrt-1440.png) · full page [375](screenshots/phase-2/b-nocni-nacrt-375-full.jpg) · [768](screenshots/phase-2/b-nocni-nacrt-768-full.jpg) · [1440](screenshots/phase-2/b-nocni-nacrt-1440-full.jpg) · [menu open at 375](screenshots/phase-2/b-nocni-nacrt-375-menu.png)

## C "Studio" (warm editorial)

Warm and editorial, with room for the team.

| | |
|---|---|
| Idea | Large serif headlines, generous space, and places for the team's photographs. Until phase 3 these are honest placeholders, drawn as a frame with its diagonals and captioned with the planned shot; no stock or generated people. The wordmark "signs" the hero under the lead, and its line draws like a pen stroke. A blue drafting line with a grip opens each section once. |
| Type | **Literata** for headlines (variable optical size and weight) and **Hanken Grotesk** for reading and UI. 95 KB + 27 KB; Literata would be narrowed further if C is chosen. |
| Layout | Headline and lead on the left, a portrait photo on the right. The stages read as chapters, with the services set as large serif titles in two columns. The CAD section pairs its text with a landscape photo. |
| Signature motion | The signature on the hero, then one drafting line per section. |
| Strength | The most human; the right fit if the team's faces should lead. |
| Risk | Without real photographs it is the most generic of the three, and an off-white ground with a serif display is close to a common template look. |

Screenshots: [375](screenshots/phase-2/c-studio-375.png) · [768](screenshots/phase-2/c-studio-768.png) · [1440](screenshots/phase-2/c-studio-1440.png) · full page [375](screenshots/phase-2/c-studio-375-full.jpg) · [768](screenshots/phase-2/c-studio-768-full.jpg) · [1440](screenshots/phase-2/c-studio-1440-full.jpg)

## Side by side

| | A "Nacrt" | B "Noćni nacrt" | C "Studio" |
|---|---|---|---|
| Ground | Off-white paper | Navy, with paper sheets | Off-white paper |
| Fonts (WOFF2) | Archivo, 71 KB | Schibsted Grotesk, 53 KB | Literata + Hanken Grotesk, 122 KB |
| CAD presence | Throughout: frame, zones, title block, part drawing | Model space, blueprint drawing | Mostly in interactions |
| Logo entrance | On the drafting grid | Full width on navy | As a signature under the lead |
| Photos | Fit inside the sheet | Fit on paper sections | Central to the design |
| Main risk | Cold | Dark-SaaS look | Generic without photos |

## Recommendation

**Claude recommends A "Nacrt", with room for the team's photos from C.** This is the same recommendation as in the phase plan, now checked against the built prototypes.
- A is the only one that could not belong to another studio:
  - the frame, the zones and the title block come from drafting itself
  - the title block turns the legally required company data into a signature element
- It reads clearly for both audiences: business owners see a calm, orderly page; architects and engineers recognise their own conventions.
- It has the lightest type: one family, 71 KB.
- Elements can move between directions. For example, A could take B's blueprint as a single navy band for the CAD section.

**The client chooses.** Any mix is possible; say which elements to keep.

## Client review, round 1 (2026-10-19)

The client reviewed the three prototypes on localhost and in the screenshots. **None is to be taken as is.** The client wants hybrid options that mix elements of the three, a direction to follow from them, and more motion in a professional tone. Round 2 is briefed in [2-design-round-2.md](2-design-round-2.md).

### Sorted

| | Liked | Not liked |
|---|---|---|
| **A "Nacrt"** | The page as a drawing sheet: it shows precision and links straight to technical drafting. The CAD section: the drawing sits on graph paper ("milimetarski papir"), which suits it better than B's version. | The "Što radimo" section below the hero; its design needs more work; it is too small and not emphasised enough. The page feels short. It lacks C's integration of team photos. |
| **B "Noćni nacrt"** | Navy gives a premium look. The hero is solid. | Something is missing in the hero. The large wordmark right in front isn't liked (the client allows that this is a prototype). "Što radimo" is unbalanced: under 01 Planiranje there is empty space, while Izrada and Održavanje i rast have several services each. The CAD section is weaker than A's. |
| **C "Studio"** | The ideas: a large, emphasised headline, and team photos. "Što radimo" is fine, more visible and perhaps better than A's: not perfect, but a good idea. | The execution: the headline is too big and out of balance. The wordmark "signature" just above the CTA buttons isn't liked. The client is unsure whether team photos belong on the home page at all, since About and Contact are separate pages. The CAD section is weaker than A's. |

**New requests**
- **Hybrid options** that mix a few of the directions, or only some of their elements. The client will then follow one of them.
- **More motion**, for example animated transitions between sections, in a professional tone that underlines the studio's professionalism.
- **Animate the codraft logo and the CAD drawing.** The drawing would draw itself in steps when the visitor scrolls to its section; the client calls this a cool idea.

### The client's message, verbatim

Frozen record, character for character. Do not edit.

```text
Odlično problem je što svaki od ovih smjerova ima svoje prednosti i mane moram navesti , 

Krenimo sa A - Sam dizajn stranica kao list nacrta mi se čini fora , pokazuje preciznost i povezuje odmah tehničko crtanje ,  no ovaj dio ispod već odnosno ispod hero sekcije što radimo sekcija mi se i ne sviđa toliko mislim da se tu može poraditi još na samom dizajnu , stranica je dosta kratka , fali mi recimo dio C kao kod studija gdje se integrira fotografije tima , recimo nekako i njihova sekcija Što radimo nije savršena ali opet mi se više sviđa.

Smjer B - tamno plava boja daje nekako premium izgled to mi se sviđa , hero sekcija solidna no fali mi nešto , ne sviđa mi se veliki wordmark odmah ispred ali razumijem da je ovo samo prototip pa neću biti prestrog , što radimo sekcija nije najbolje implementirana dosta praznog prostora recimo ispod planiranje je prazan prostor dok izrada i održavanje i rast imaju više kategorija svojih pa je nesklad u popunjenosti , CAD crtanje sekcija mi je bolja kod A jer ima onaj tehnički papir ( milimetarski ) nisam siguran kako se zove točno koji ljepše paše uz crtež. 

Smjer C - Ima odlične elemente i zamisao koji su po meni loše implementirani , njegova hero sekcija sa našim nekim sloganom koji si smislio je zgodan da je tekst povećan i naglašen ali nekako prevelik i neskladan , zgodna zamisao je fotografije tima , no nisam siguran treba li to oupće ići na prvi page kada posjetitelj klikne na link naše stranice , jer imat ćemo više stranica kao što si i sam planirao about os , kontaksst itd...
Ne sviđa me se ni codraft wordmark odmah inzad rezervirajte besplatnu ponudu , Što radimo sekcija je ok zgodna vidljivija i bolja možda nego kod A je nekako presitna i nenaglašena dovoljno ali barem s dobrom idejom.
CAD crtanje sekcija mi se sviđda manje nego kod A .

Sve u svemu hoću reći da mi niti jedna nije najbolja slijepo za uzeti već da bih ja napravio hibridne opcije miksa par njih ili samo nekih i onda se po tome ravnao i znam da je ovo prototip ali fali mi animacija . To ćemo kasnije srediti ili animiranih prijelaza sekcija koji su opet u profesionalnom nekom tonu i naglašavaju našu profesionalnost.

Ili čak možda da animiramom tipa codraft logo i recimo crtež dolje CAD koji se recimo u koracima crta kako korsnik dođe na tu sekciju skrolom stranice. To mi djeluje kao fora ideja.

Pošto je context u ovoj sesiji pun , želim da pripremiš dokumentaciju za sljedeći chat gdje ćemo zajedno ovo što sam ti ja sada rekao prodiskutirati i analizirati te ćeš ti izaći sa novim dorađenim prototipima.

Za sad ništa ne radi osim pripreme dokumentacije da ne izgubimo kontekst u dokumentaciju namijenjenu za to i pripremimo se za novi chat i nastavak rada.
```

## After the choice

Steps 3–7 of [2-design.md](2-design.md):
1. an ADR for the chosen direction
2. tokens as CSS custom properties: colour, fluid type scale, spacing, radius, motion
3. the production font files: narrowed axes, a size-adjusted fallback, one preload
4. motion tokens in CSS, plus a TypeScript copy for future islands
5. brand assets in code: optimised SVG marks without C2PA, the favicon set and head snippet
6. base components: header with mobile menu, footer, button, section, card, grip focus, dimension annotation, language switcher, skip link
7. the style page

The prototypes of the directions not chosen stay in the lab as a record until the client decides otherwise.
