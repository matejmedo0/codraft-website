# Phase 5: Quality and tests (Kvaliteta)

- **Status:** Not started
- **Branch:** `phase/5-quality`

## Goal

Prove the site works for every visitor and stays fast: end-to-end journeys, unit tests for logic, accessibility and performance passes.

## Inputs

All pages and integrations from phases 3–4.

## Steps

**1. `/test` procedure**
- `e2e-runner` with `e2e-testing` for the journeys:
  - navigation and the mobile menu
  - the audit form (both steps)
  - the contact form
  - language switch
  - the cookie banner
- `tdd-guide` with `react-testing` for the form logic and utilities: validation, the route map, slug helpers.

**2. Project-specific checks**
- hreflang is reciprocal on every route.
- The language switch lands on the equivalent page in the other language.
- With reduced motion emulated, nothing transforms.
- Grips and focus states work with the keyboard alone.
- No network requests before consent.
- Long Croatian labels fit at 375 px.
- Đ and đ (and č ć š ž) render correctly in every font weight used.
- The lead is kept when the email API fails.

**3. Accessibility.** `a11y-architect` on:
- the menu
- the forms
- the cookie banner
- the layer viewer
- the chatbot

**4. Performance.** `performance-optimizer` with `react-performance` on images, fonts and the bundle. Targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1, and the JavaScript budget from phase 1.

**5. CI.** Add the Playwright suite to CI if it is fast enough; otherwise run it on the phase PR. Lighthouse CI follows in phase 6.

## Deliverables

- E2E and unit test suites
- Accessibility and performance fixes
- CI updates

## Exit criteria

- [ ] All tests pass.
- [ ] No open CRITICAL or HIGH findings.

## Log

_Not started._
