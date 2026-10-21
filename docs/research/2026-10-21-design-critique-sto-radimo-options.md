# Design critique of the "Što radimo" options (2026-10-21)

The independent critique ([ADR 0024](../decisions/0024-independent-design-critique.md), [design-critique.md](../design-critique.md)) of the three new layouts for "Što radimo" that the client asked for in review #101: options 12 „Terminski plan“, 13 „Krug“ and 14 „Kartice“ on `/lab/sto-radimo-2`. The critics compared them with the three options the client kept in #100 (the central axis as on Home, option 3 „Tri stupca“ and option 4 „Središnja os s okvirima“).

## Source and run

- **Capture:** `npm run design:capture -- --widths 375,768,1024,1440,1920 --motion 1440 lab/sto-radimo-2`, taken at 609756b with the options uncommitted. The same code was committed as eb2506b. The capture folder, `.playwright-mcp/design-review/2026-10-21-batch29/`, is ignored by git.
- **Critics:** four `design-critic` agents in parallel, one per lens: art direction, craft, communication and motion. Each brief held only facts: the pages, the capture, the parts to focus on, the batch and the code files.
- **Verification:** every finding below was checked against the screenshots and the code before it was acted on. Where the lenses found the same thing, the findings are merged here.

## The critics' verdicts, as given

- **Art direction:** "Ready after fixes", for option 12. Options 13 and 14 "need rework before they could serve Home". The critic's ranking for Home: 3, 12, the axis now, 4, 13, 14. Option 12 is "the one new idea that belongs to Codraft" and could stand first once its bars and its phone tracks are fixed.
- **Craft:** "Ready after fixes". Nothing blocks. Option 12 is the most resolved. Option 13 needs its drawing at a fixed scale. Option 14 is weakest on phones and tablets.
- **Communication:** "Ready after fixes". The critic's ranking: 3, 12, 13, 4, the axis now, 14. Option 14 "fails the section's job as built".
- **Motion:** "Ready after fixes". All three use the site's motion vocabulary correctly. Options 12 and 13 lose what makes Home's axis work: one leading line, with cause and effect in one place.

## Verified findings and what was done

### Option 12 „Terminski plan“

1. **The bars claimed too much** (art direction, communication, craft). Four identical Izrada bars read as four parallel tasks of equal length that every project runs, while the services are offers to choose from. Stage 03's analytics ran on as ongoing, though its line says it is set up once.
   - **Done:** one bar per stage, on the stage's head row, starting at its bubble.
   - Under each bar, the stage's period: its column across its services, hatched at low strength, like option 9's ground.
   - Each service has a grip on its stage's grid line.
   - The milestone and the stage 03 arrow stay.
2. **On phones, nine small tracks read as sliders or progress bars** (art direction, communication).
   - **Done:** one small schedule per stage, under its tagline. Stage 01's ends in the milestone.
3. **The line and grips were heavier than the system** (craft, art direction). The bars were 6 px with 13 px grips; the system's process line is `--rail` (2 px) and its grips `--grip-size` (9 px).
   - **Done:** the system's line and grip.
4. **The motion had no single pen** (motion). Rows drew in parallel, and within a row the eye was pulled right, then left.
   - **Done:** rows start no sooner than the row above has had its turn, and a waiting row plays at double speed, as in `draw.ts`.
   - A service's icon draws first, beside the text being read, then its grip snaps in.
   - The milestone snaps in once the planning bar has reached its end.
5. **The tagline broke inside "na koji"** (craft).
   - **Done:** balanced taglines in the new options. The kept options are unchanged.
6. **A 4 px edge between the stage title and the service titles on phones** (craft).
   - **Done:** the service titles now start on the stage title's edge.
7. **Open: the bubbles sit far from their stage titles from 1024 px** (communication, art direction). The bubbles mark the grid lines in the schedule. Kept as built; the schedule now starts at the middle of the sheet, on the sheet's own column line.

### Option 13 „Krug“

1. **The drawing scaled with the screen** (craft). Its bubbles, numbers, grips and lines took sizes the system doesn't have: 9 px numbers on phones, 56 px bubbles at 1440.
   - **Done:** it is drawn at 1:1 on wide screens.
2. **The circle carried only three numbers, and two sets of numbers were on screen** (art direction, communication).
   - **Done:** each stage's name is written beside its bubble, inside the circle, and the list beside it drops its bubbles.
3. **The grips were unevenly spaced (40°, 24°, 30°) and read as random ticks** (art direction).
   - **Done:** the bubbles and the grips are spaced evenly, like the holes of a bolt circle, so each stage's arc is as long as its number of services.
4. **On phones the circle was an emblem, not a diagram** (all four critics).
   - **Done:** phones have no circle; the stages stand one after another.
5. **The arc ran 3–4 services ahead of the reader, and each service's moment happened in two places at once** (motion).
   - **Done:** the arc follows what is read at the middle of the screen, where the circle stands.
   - The icons draw on their own, at 85 % of the screen's height, as in the other options.
   - Arriving mid-section, the arc starts where the reading is.

### Option 14 „Kartice“

1. **It hides 7 of the 9 services and every link to /usluge until a tab is chosen** (all four critics). This is the nature of tabs, so it goes to the client (question 3).
2. **The tabs read as a progress stepper** (communication, motion, art direction). Unchosen tabs were grey, and on phones the bubbles stood above small labels.
   - **Done:** an unchosen stage's name is in ink and underlined like every link. The chosen one is underlined by the process line, whose grip stands at the tab's corner.
   - The tabs follow the panels' grid, in the heading width, with balanced wrapping.
   - **Phones:** below 48rem there are no tabs.
3. **On phones the stage names were smaller than the service titles** (craft, communication).
   - **Done:** phones show the stages one after another, each with its title.
4. **The chosen tab doubled its grip, and its focus grips missed the outline** (motion).
   - **Done:** the line's grip replaces the tab's lower corner grips, and the outline is the standard one.
5. **At 1024 the four Izrada services were squeezed into 204 px columns** (craft).
   - **Done:** two services to a row below 1280 px.
6. **Motion timing** (motion).
   - **Done:** the first stage's icons draw when its services come into view, not the tab row.
   - The tab's line draws in `--motion-base`, and its grip snaps in as the line ends.
   - The line of the tab left behind fades with `motion-release`.

## Questions for the client

1. **ADRs 0015, 0022 and 0023.** Choosing 12, 13 or 14 replaces the process line that joins 01 → 02 → 03 and follows the screen. Choosing one of them needs a new ADR. Option 13 keeps the "follows the reading" idea.
2. **Option 13's circle is sticky** while its arc follows the reading. The page scrolls as always, but motion.md rules out "pinned scroll sequences". If the client wants it, the exception goes into an ADR. The circle also says the work loops back to planning, which the copy doesn't say outright. Is that true for Codraft?
3. **Option 14 shows one stage at a time.** It is the shortest option, at about 720 px at 1440. The cost is that 7 of the 9 services are behind tabs, and the default stage holds nothing Codraft builds. The critics advise against it on Home.
4. **Options 3 and 14 echo the free audit's steps**, the next zone on Home: three on a line with grips.
5. **Larger type.** Options 4, 12, 13 and 14 use the larger service type from #90; the axis now and option 3 don't. Whichever is chosen, the size should become one token (known item C19).
6. **The kept option 4's frames** look like whole clickable cards, though only the titles link (communication).

## Strengths the critics named

- **Option 12's milestone and open-ended arrow** state true things from the copy; no dates (ADR 0004).
- **Options 12 and 13 put all text on one left edge.** On phones the new options give the service lines 269 px instead of 209 px, which helps known item #5.
- **Option 13's centre lines** are correct drafting.
- **Option 14's tabs** follow the WAI-ARIA pattern; without JavaScript every stage shows.
- **In all three options** the text never waits, and reduced motion and no JavaScript show the final state.
- **The comparison is fair:** the same copy and icons, and axe clean at every width.

## Not checked

- 1707 px (not in the capture).
- Motion at widths other than 1440.
- Safari and Firefox, and real phones.
- The options in place on Home.
