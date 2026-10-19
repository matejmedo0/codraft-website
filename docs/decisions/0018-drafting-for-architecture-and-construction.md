# 0018. Drafting: „Tehničko crtanje“ for architecture and construction

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The drafting offer had a provisional Croatian name, „CAD crtanje“, with „Tehničko crtanje“ as the alternative in the glossary ([content.md §1](../content.md#1-glossary-hr--en)). Its slug was provisional too ([ADR 0003](0003-launch-sitemap.md)). The client's copy addressed "architects, engineering firms and manufacturers", and the prototypes' CAD illustration is a machined plate with holes and a slot.

Reviewing the design system, the client decided: "Umjesto CAD crtanje koristiti riječ Tehničko crtanje s naglaskom na arhitekturu i građevinarstvo (bez strojarstva i ostalih struka izvan navedene dvije)". In other words: use „Tehničko crtanje“ instead of „CAD crtanje“, for architecture and construction only, without mechanical engineering or any other field.

## Decision

1. **The Croatian name is „Tehničko crtanje“:** in the navigation, on the page, in Home's drafting zone and in the hero's link ("Tehničko crtanje za arhitekturu i građevinarstvo"). The page's slug is `/tehnicko-crtanje`.
2. **The offer serves architecture and construction only:** architecture practices and companies in construction. Mechanical engineering, manufacturing and other fields are out. The Croatian audience line is "Za arhitektonske urede i tvrtke u građevinarstvu kojima treba dodatni kapacitet za crtanje."
3. **"CAD" stays where it names the files:** "2D CAD crteži", drawn in AutoCAD.
4. **The guardrail stands:** drafting is not *projektiranje* ([compliance.md](../compliance.md)). Codraft draws from the client's sketches, markups and standards.

## Consequences

- The English name ("Engineering Drafting"), its slug `/en/engineering-drafting` and the audience line are the client's copy. They change only when the client approves suggestion S19; until then the English stays.
- The CAD illustration on Home reads as mechanical engineering. An architectural drawing, such as a floor plan with its grid axes, is proposed to the client as a later refinement. The CAD samples for the drafting page (G10) and its layer viewer show architecture or construction drawings.
- The contact form's topics become "Web i softver / Tehničko crtanje / Ostalo" (phase 4).
- SEO: the page targets "tehničko crtanje" and keeps "CAD crtanje" and "AutoCAD crtanje" as secondary terms, because clients search for them.
- [information-architecture.md](../information-architecture.md), `CLAUDE.md` and the phase 3 and 4 plans use the new name and slug.
