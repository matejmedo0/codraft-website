# 0003. Launch sitemap: one Services page with anchors

- **Status:** Accepted. Labels and slugs are provisional until the client approves the Croatian terminology; they become permanent at launch.
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

The site has two audiences: small and medium businesses (web, software, AI) and drafting clients (architects, engineering firms, manufacturers). The service copy is short, about 20 words per service. There are no public web projects yet. The market is Croatia, where local rankings depend mostly on the Google Business Profile, reviews, consistent business data and a strong home page.

## Decision

Launch with these pages, each in HR and EN:
1. Početna (Home)
2. Usluge (Services)
3. CAD crtanje (Engineering Drafting)
4. O nama (About)
5. Besplatna analiza (Free audit)
6. Kontakt (Contact)
7. Privatnost (Privacy)
8. Kolačići (Cookies)
9. Impresum (Legal notice)
10. Izjava o pristupačnosti (Accessibility statement)
11. a localised 404

URLs and section outlines are in [information-architecture.md](../information-architecture.md).

**Rules**
- **One Services page.** All 8 services live on `/usluge`, grouped by stage (Planiranje / Izrada / Održavanje i rast) with anchors. They do not get 8 pages at launch.
- **When a service gets its own page.** It moves to `/usluge/<slug>` once it has, in both languages:
  - a real case study or demo
  - about 400 words or more of specific content

  The first is the AI assistants page in phase 4, built around the chatbot demo.
- **Free audit and Contact stay separate pages.** They have different audiences and different forms. The drafting page embeds the contact form with the topic preset.
- **No "Radovi" (Work) page or nav item** until real case studies exist.
- **Accessibility statement.** It is voluntary, but Codraft sells accessibility work, so publishing an honest statement is useful proof.

## Consequences

- No thin pages. The site stays small enough for a careful build and for the client to approve the copy.
- Deep links still work through the anchors: nav, chatbot answers, ads, the Home overview.
- New service pages and the Work section can be added later without redirects. The Services block becomes a summary that links down.
