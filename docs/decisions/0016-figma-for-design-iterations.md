# 0016. Figma for quick design iterations

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

[ADR 0005](0005-design-review-with-coded-prototypes.md) made coded prototypes the review method and left Figma optional, on the client's request: a mirror of the chosen system, not its source. Figma is connected through MCP.

Asked at the end of phase 2 whether the design system should also live in Figma, the client said yes, for a different reason than the one ADR 0005 named: "Možemo implementirati figmu za brze i jeftine prototipe i dorade onog što mi se ne sviđa, koristimo je". In other words, Figma is for quick, cheap prototypes and for reworking what the client doesn't like.

## Decision

- **The coded design system is mirrored in Figma as a library:** the tokens as variables, the base components as components, and a page that shows them. It is built from the code with `figma:figma-generate-library`, always with `figma:figma-use` before any `use_figma` call.
- **The client sketches changes in Figma.** Quick prototypes and refinements happen there, where trying a change costs minutes instead of a build.
- **Code stays the source of truth** (ADR 0005). A change agreed in Figma reaches the site only through the code: tokens and components first, then a check on the build (contrast, reduced motion, CSP). The library is then brought back in line with the code.
- **The file lives in the client's own Figma account.** Nothing is bought for it; the plan's limits apply, for example on variable modes.

## Consequences

- Design changes get a cheaper first step, and the client can iterate without a build.
- The library can drift from the code. Every change in code that touches tokens or components updates the library too, as part of the same piece of work.
- Motion, the CSP, reduced motion and Croatian text lengths can only be judged in the coded version, so the final review of a change stays in the browser.
