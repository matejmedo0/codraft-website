# 0019. The drafting offer adds 3D models

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The drafting offer, „Tehničko crtanje“ for architecture and construction ([ADR 0018](0018-drafting-for-architecture-and-construction.md)), had two services in the client's copy: 2D CAD drawings and technical documentation. Reviewing Home's drafting zone, the client asked: "Ubaciti i 3D mogućnost ne samo 2D crteže", that is, to offer 3D as well, not only 2D drawings.

## Decision

1. **The drafting offer has three services:** 2D CAD drawings, **3D models**, and technical documentation, in that order.
2. **The Croatian draft** (`drafting.3d.*` in [content.md](../content.md)): "3D modeli: Trodimenzionalni modeli zgrada i detalja, izrađeni prema vašim nacrtima i skicama, za provjeru i prezentaciju." On Home it has one line: "Modeli zgrada i detalja prema vašim nacrtima i skicama."
3. **The guardrail stands:** the models are built from the client's drawings and sketches; drafting is not *projektiranje* ([compliance.md](../compliance.md)).

## Consequences

- The drafting page lists three services and Home's drafting zone shows three; the structured data has three `Service` entries there (phase 3).
- The English blocks are written when the English is aligned, at the end of the review.
- Phase 3 needs from the client: the 3D software and the file formats delivered (with the 2D ones, PROGRESS.md item D), and a 3D view among the samples made for the site (G10).
