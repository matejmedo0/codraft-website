# 0002. Croatian is the default language, English secondary

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

The client's target market is Croatia: local businesses for web, software and AI services. The engineering drafting offer also reaches foreign architecture and engineering firms. The client's service copy exists only in English. The client chose two languages, Croatian and English.

## Decision

**Locales**
- `hr` is the default locale, served at the root with no prefix.
- `en` is served under `/en`.

**Slugs**
- Each locale has its own localised slugs, lowercase ASCII (e.g. `/usluge` ↔ `/en/services`).
- The full list is in [information-architecture.md](../information-architecture.md).

**One route map**
- A single map (page id → `{ hr, en }`) generates the navigation, the language switcher (same page, other language), hreflang, `sitemap.xml` and canonical URLs.

**hreflang**
- Reciprocal `hr` ↔ `en` on every page.
- `x-default` points to English, because visitors whose language is neither Croatian nor English are better served in English.

**Redirects and errors**
- No automatic redirects based on `Accept-Language` or IP address.
- The 404 page is localised.

**Copy**
- English stays the client's source copy in [content.md](../content.md).
- Croatian is drafted by Claude and approved by the client, block by block.

## Consequences

- Croatian copy must exist and be approved before each page is built (phase 3). It runs longer than English, so layouts are designed and tested with Croatian text (phase 2 prototypes use real Croatian copy).
- `i18n-sync` keeps the JSON locale files in sync.
- Phase 5 tests check that hreflang is reciprocal and that the language switch lands on the equivalent page.
- Adding a third language later (e.g. German for drafting) is a new locale in the same route map. It is not a restructure.
