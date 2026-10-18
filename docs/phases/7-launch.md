# Phase 7: Launch (Objava)

- **Status:** Not started
- **Branch:** `phase/7-launch`

## Goal

Put the site live on the real domain, securely, and make it discoverable.

## Inputs

| Input | Status |
|---|---|
| **Domain bought** (recommended: codraft.hr) | Client |
| **Mailbox hosting** for @codraft.hr | Client approves the provider chosen in phase 1 |
| **Lawyer review** of the legal texts | Client |
| **Google Business Profile eligibility** (physical location or visits to clients; see C13) | Client confirms |

## Steps

**Every step that touches the internet asks the client first.**

1. **`deployment-patterns`: hosting config**
   - security headers: CSP (hashes or nonces; adapt the origins), HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, frame protection
   - redirects: canonical host and trailing slashes
   - `sitemap.xml` (with alternate-language links) and `robots.txt` on the real domain
2. **DNS** for the site and email. **SPF, DKIM and DMARC** for the domain, so form emails get delivered.
3. **Search engines.** Submit the sitemaps to Google Search Console and to Bing Webmaster Tools; several AI assistants use Bing's index.
4. **Consistent business data.** Name, address and phone are the same everywhere: site, structured data, profiles.
5. **Google Business Profile, only if eligible.**
6. **Uptime monitoring and backups**, especially on a VPS.
7. **Re-check production** with Playwright at 375, 768 and 1440 px, with no console errors.

## Deliverables

- The production site live on the domain
- Monitoring and backups in place
- Search Console and Bing set up

## Exit criteria

- [ ] The production site is live and re-checked with Playwright.

## Log

_Not started._
