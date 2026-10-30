# 0032. Guide prices on the site, about 10% below the market

- **Status:** Accepted
- **Date:** 2026-10-22
- **Deciders:** client (Codraft team), Claude

## Context

Gap G7 asked whether `/usluge` shows prices or typical timelines. On 2026-10-22 the client answered in M6 (3-pages.md): "Za cijene usluga istraži aktualne tržišne cijene usporedivih usluga i postavi okvirno 10 % niže cijene. Dokumentiraj izvore i pretpostavke." Four researchers and four fact-checkers collected and re-checked published Croatian prices the same day (pricing research). Croatian small businesses ask for the price first. A starting price filters enquiries and backs the page's promise that the scope, timeline and price are known before work starts.

## Decision

1. **The site shows guide prices:** a starting price ("od X €") and a typical timeline in weeks per Build service, a monthly fee ("od X € mjesečno") for Run & Grow, and a price per unit on the drafting page. The free audit is 0 €.
2. **The figures are about 10% below the Croatian market's median** for a comparable scope, rounded, without VAT:

   | Service | Price | Timeline |
   |---|---|---|
   | Web stranica | od 890 € | 3–4 tjedna |
   | Web trgovina | od 1.390 € | 4–6 tjedana |
   | Web aplikacije i interni alati | od 2.690 € | 4–8 tjedana |
   | Integracije i online rezervacije | od 190 € | 1–2 tjedna |
   | AI asistent, izrada · rad | od 690 € · od 45 € mjesečno | 1–3 tjedna |
   | Hosting i održavanje | od 35 € mjesečno | — |
   | SEO i lokalna vidljivost | od 260 € mjesečno | — |
   | Analitika i usklađenost (postavljanje) | od 290 € | 1–2 tjedna |
   | 2D crteži · 3D modeli · dokumentacija | od 65 € po listu · od 80 € · od 490 € | 1 · 1–2 · 1–2 tjedna |

3. **One source:** `src/config/pricing.ts` holds the figures; the pages, the JSON-LD offers and the FAQ read them from there.
4. **VAT:** the prices are stated without VAT, and each page that shows them says so ("bez PDV-a"), as the law requires the VAT status next to a price. When the client sends the company data (item A), `PRICES_INCLUDE_VAT` and the note follow the company's VAT status ("+ PDV" or "PDV se ne obračunava").
5. **The written offer fixes the real price**, as `plan.body` promises; the guide price is the smallest job the research describes for each service.

## Consequences

- The client reviews the figures at the end of phase 3. The research names the tier judgments (presentation site 790 or 890; store 1,390 or 2,290) and says the drafting figures rest on few public prices, so the client may raise them.
- The prices are re-checked once a year and before launch.
- Prices on the site are commitments a visitor can hold Codraft to; a change goes through `src/config/pricing.ts` and a note in the changelog of `docs/content.md`.
