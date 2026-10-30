# 0017. One free-audit button per page

- **Status:** Accepted (2026-10-19; the client reviewed `/lab/pocetna`: "Sviđa mi se")
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The free audit is how web clients start working with Codraft ([ADR 0007](0007-launch-scope-and-constraints.md): a form, then a time slot). [information-architecture.md](../information-architecture.md) already says that every page has one primary call to action, yet the round 2 prototype of the chosen direction asked for the audit five times on Home:
1. the header button "Besplatna analiza"
2. the hero's primary button
3. a link under stage 01 in "Što radimo"
4. the button in the free audit zone
5. the button in the closing call to action

Reviewing the design system, the client said: "Previše se nameće gumb rezervirajte besplatnu analizu kroz 5 6 mjesta dobiva se dojam kao da se forsira, što bi mene prvog odbilo od ovakve stranice makar bila kvalitetna napraviti to manje nametljivo i definitivno na manje mjesta uz zadržavanje profesionalizma i ozbiljnosti same stranice." (The button pushes itself in five or six places, it feels forced and would put the client off; make it less pushy and use it in fewer places, while the site stays professional and serious.)

## Decision

1. **The free-audit button appears at most once on a page, in the section that explains the audit.** On Home that is the free audit zone with its three steps. On Usluge it is `#planiranje`. The audit page itself has the form. The wording stays the glossary's "Rezervirajte besplatnu analizu".
2. **The header has no button:** Usluge · CAD crtanje · O nama · Kontakt, then the language. The header serves every visitor, the drafting clients too, so it offers no sales action.
3. **The hero orients and doesn't sell.** Its primary button is "Pogledajte usluge", with the link to CAD crtanje below it.
4. **The closing call to action invites a conversation.** The navy zone at the end of a page ([ADR 0015](0015-design-direction-model-i-list.md)) keeps its heading and has one button, "Pošaljite upit" (to Kontakt). It never repeats the audit.
5. Other calls to action keep their place, such as "Zatražite ponudu" in the CAD section.

## Consequences

- [information-architecture.md](../information-architecture.md) follows: the header, the hero and closing call to action on Home, the closing call to action on Usluge and O nama. O nama's primary call to action becomes "Pošaljite upit".
- The production header loses its button and the `header.cta` string; its E2E test checks that the header doesn't link to the audit page.
- The Figma library follows: the component Zaglavlje and the example page Početna (ADR 0016).
- Lab D and E keep their five calls to action as the round 2 record. `/lab/pocetna` shows the rule.
- Fewer ways into the audit. After launch, the analytics ([ADR 0011](0011-analytics-goatcounter-after-consent.md)) show whether visitors still find it; if not, this is revisited with a new ADR.
