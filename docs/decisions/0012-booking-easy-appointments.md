# 0012. Booking: self-hosted Easy!Appointments

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

Step 2 of the free audit flow books a time slot ([ADR 0007](0007-launch-scope-and-constraints.md)). The requirements:
- prefilled with the name and email from step 1
- loaded only on an explicit click
- shown in Croatian on a Croatian-default site

EU data is preferred.

The research of 2026-10-19 ([research/2026-10-19-hosting.md](../research/2026-10-19-hosting.md#7-booking)) changed the picture:
- **Cal.com:** its EU service (cal.eu) closes on 2026-11-01. Cal.com processes data in the US, and its booking page can't be shown in Croatian.
- **Calendly, Zoho Bookings and meetergo** have no Croatian interface.
- **Microsoft Bookings** can't prefill name and email.
- **NeetoCal** is Croatian and free, but US-hosted and branded.
- **Easy!Appointments** (open source, GPL-3.0) is the only option found with a Croatian interface (about 97 % translated), prefill through URL parameters, and data on our own EU server.

## Decision

The client confirmed on 2026-10-19:

- **Booking runs on self-hosted Easy!Appointments:**
  - on the same VPS ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md))
  - on our own subdomain (e.g. `termin.codraft.hr`)
  - with PHP 8.2+ and MariaDB
  - with its admin area behind basic auth
- **Loading:** the audit page loads the booking view only when the visitor clicks, with name and email prefilled.
- **Fallback:** NeetoCal, if Easy!Appointments can't meet a phase 4 requirement.

## Consequences

- **Data:** booking data stays on our EU server. The booking subdomain is first-party, so no third-party request is made.
- **Upkeep:** about 1–1.5 hours a month for PHP, MariaDB, the app itself and its backups.
- **To verify in phase 4:**
  - calendar sync with the team's calendars
  - email notifications through an authenticated SMTP or API relay
  - the Croatian strings
- **Install timing:** Easy!Appointments is installed when the server is set up, and wired into the audit flow in phase 4.
- **CSP:** `frame-src` allows only the booking subdomain.
- **Privacy notice:** describes the booking data and its retention.
