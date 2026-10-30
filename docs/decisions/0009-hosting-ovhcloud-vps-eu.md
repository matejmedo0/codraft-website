# 0009. Hosting: an OVHcloud VPS in the EU

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

[ADR 0007](0007-launch-scope-and-constraints.md) set the budget as close to €0 a month as possible, with a small paid EU host acceptable and EU hosting preferred. On 2026-10-19 the client set a ceiling of **€10 a month**.

The research of 2026-10-19 (research/2026-10-19-hosting.md) found:
- **Hetzner:** its cheap cloud line (CX23, CAX11) can't be ordered; new servers have been restricted since 2026-06-26.
- **OVHcloud VPS-1** is the closest EU match:
  - 2 vCores, 4 GB RAM, 40 GB NVMe
  - unlimited traffic at 500 Mbps
  - IPv4 and a daily backup included
  - €4.49 a month without commitment, or €3.81 with 12 months paid upfront (excl. VAT)
- **Cloudflare Workers Free** (€0) was the main alternative. It falls short because:
  - it is a US provider
  - no booking tool offers both a Croatian interface and EU data on it
  - its own email sending needs Workers Paid
- **Hostinger Cloud Startup** was checked at the client's request:
  - $7.99 a month only on a 48-month prepay
  - renews at $25.99 a month excl. VAT
  - no full server access

The options and their costs are in phases/1-architecture-options.md.

## Decision

The client chose Option 1 on 2026-10-19.

**Server**
- The site runs on an **OVHcloud VPS-1 in an EU data centre** (Germany or Italy, chosen when ordering).
- The commitment term is decided when the server is ordered: no commitment until launch, then possibly 12 months upfront.
- The server is ordered with the client's OK when a phase first needs it. That is the phase 6 audit at the latest, or phase 2 if private previews of the design prototypes are wanted.

**Software on the server**
- Caddy in front: automatic HTTPS, static files, security headers, and a preview subdomain behind basic auth.
- The Astro Node server runs under systemd on localhost.
- No Docker and no deployment panel.

**Deploys**
- GitHub Actions deploys over SSH: rsync into release directories, then a symlink switch. Rollback switches the symlink back.
- Production deploys happen only after a merge to `main`.

**Backups and monitoring**
- OVH's daily backup of the server.
- Nightly encrypted restic backups to an EU region of another provider. The default is Backblaze B2 EU, free under 10 GB. The Hetzner Storage Box is the choice if every backup provider must be an EU company.
- Free uptime monitoring and backup-job heartbeats (UptimeRobot, Healthchecks.io).

**Fallbacks**
- Hetzner CX23, if an order goes through.
- Netcup VPS Lite.

## Consequences

- **Cost:** €4.49 a month excl. VAT, or €5.61 incl. 25 % VAT. That is within the €10 ceiling, with room for mailboxes and the phase 4 chatbot.
- **Data:** site data stays in the EU with an EU provider.
- **Upkeep:** Codraft runs the server, at about 2–3 hours a month for updates, backups and monitoring. A provisioning script and a runbook (`docs/operations.md`) are written when the server is first set up.
- **A single server:** the static pages are still served if Node stops, and a restore is tested every quarter.
- **Portability:** moving to another VPS takes hours; moving to Cloudflare takes 1–2 days.
- **Ask first:** opening the OVH account, ordering the server and adding the deploy key to the repository secrets are "ask first" items, done together with the client.
