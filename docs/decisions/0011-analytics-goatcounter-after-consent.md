# 0011. Analytics: self-hosted GoatCounter after consent, plus Search Console and Bing

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The site needs basic visitor statistics without third-party requests before consent ([compliance.md](../compliance.md), C3). In Croatia, even cookieless analytics needs consent:
- ZEK čl. 43. st. 4.
- AZOP's guidance
- EDPB Guidelines 2/2023

(See research/2026-10-19-hosting.md.) So "cookieless" buys data minimisation, not a site without a consent banner.

The site runs on our own EU VPS ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md)), with a budget ceiling of €10 a month. Options considered:

| Option | Why not chosen |
|---|---|
| Umami | Needs PostgreSQL |
| Plausible CE | Needs ClickHouse and at least 2 GB RAM |
| Plausible Cloud | €9 a month |
| Cloudflare Web Analytics | US company, no data-location statement |
| Statistics from server logs only | Would avoid the banner, but gives less insight |

## Decision

The client confirmed on 2026-10-19:

- **GoatCounter, self-hosted on the VPS:**
  - a single Go binary with SQLite
  - served from our own domain
  - its script loads only after the visitor accepts analytics in the consent manager
- **Google Search Console and Bing Webmaster Tools** for search data. Both are verified through DNS, so they add no script to the site.

## Consequences

- **No third party sees visitor data,** even after consent: the beacon goes to our own server.
- **One more small service on the VPS.** GoatCounter needs updates and is included in the backups.
- **Until the server exists, there is no analytics.** GoatCounter is installed with the server, and the consent manager and loader are built in phase 4.
- **Search Console and Bing** are set up in phase 7, on the real domain.
- **Legal pages:** the privacy and cookie notices describe GoatCounter and its retention. The consent banner offers "Prihvati sve" and "Odbij sve" with equal weight.
