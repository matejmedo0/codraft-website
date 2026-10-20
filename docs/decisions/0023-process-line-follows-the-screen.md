# 0023. The process line follows the screen continuously

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude
- **Supersedes:** point 3 of [ADR 0022](0022-service-icons-on-home.md)

## Context

[ADR 0022](0022-service-icons-on-home.md) put the service icons on Home and made the process line of "Što radimo" follow the scroll row by row: when a row crossed 85 % of the screen, the line grew to it over 280 ms, and its icons drew 120 ms later. Watching it, the client found the line jerky (review batch 15): it waited, then jumped the whole way to the next row, across the stage heads. They want it to grow gradually with the screen, quickly but smoothly.

## Decision

1. **The line's tip follows the screen continuously:** as you scroll, it reaches down to 85 % of the screen's height, eased so that a fast scroll is caught up in about `--motion-follow` (280 ms). It only grows, and it never takes over the scroll.
2. **Each icon starts as the tip reaches it** and draws within 450 ms (the right icon of a row 40 ms after the left). The services below the line's end start when the screen's 85 % mark reaches them.
3. Unchanged from ADR 0022: the text never waits; services already above the screen are complete at once; without JavaScript or with reduced motion the line and the icons are complete.

## Consequences

- The motion is driven by a scroll handler, which an IntersectionObserver switches on only while the section is near the screen; each frame takes one measurement. [motion.md](../motion.md) describes it.
- The easing token `--ease-follow`, added for the row-by-row line, is removed; `--motion-follow` stays as the catch-up time.
