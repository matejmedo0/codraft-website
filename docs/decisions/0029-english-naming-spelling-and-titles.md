# 0029. English: "Architectural Drafting", British spelling, "Croatia" in titles

- **Status:** Accepted
- **Date:** 2026-10-22
- **Deciders:** client (Codraft team), Claude

## Context

Phase 3 builds every page in Croatian and English. Three questions about the English were open (`PROGRESS.md`, open question 3; [content.md §3](../content.md#3-suggestions-for-the-english-copy)):

- **The drafting service's name.** "Tehničko crtanje" covers architecture and construction only ([ADR 0018](0018-drafting-for-architecture-and-construction.md)), but the English kept the client's original "Engineering Drafting" (`/en/engineering-drafting`), which suggests engineering. S19 proposed "Technical Drawing"; S20 (2026-10-22) proposed "Architectural Drafting", the term architects and builders search for in English.
- **Spelling.** The client's English mixes conventions ("inquiry"), while the brand package writes "colour" (S3).
- **"Croatia" in English page titles** (S15), not in body copy.

Claude recommended S20, British spelling and S15. The client's answer (phase 3, M2): „Engleski po preporuci Croatia , i sve po preporuci onda“.

## Decision

1. **The English name is "Architectural Drafting"**, with the slug `/en/architectural-drafting` (S20, accepted; S19 rejected). The audience line is "For architecture practices and construction companies that need extra drafting capacity." The Croatian stays „Tehničko crtanje“ at `/tehnicko-crtanje`.
2. **The English is British:** "enquiry", "colour", "centimetre", and so on (S3, accepted).
3. **English page titles and meta descriptions name Croatia** where it fits the page, never the body copy (S15, accepted).

Slugs are still provisional until launch (ADR 0002), so changing this one needs no redirect.

## Consequences

- The route map, the English navigation label, the glossary, CLAUDE.md and the sitemap tables change with the slug.
- The English copy of each page is drafted in British English and read by the client with every other text at the end of phase 3.
- The keyword map's target for the English drafting page becomes "architectural drafting services" and "CAD drafting services".
