/**
 * Codraft's guide prices: starting prices in euros, without VAT, and typical
 * timelines in weeks. The client asked for prices about 10% below the
 * Croatian market (phase 3, M6); the sources and the assumptions are in
 * docs/research/2026-10-22-pricing.md. The exact price is always in the
 * written offer (`plan.body`).
 * Bottom layer: imports nothing from `src/`.
 */

/** A typical timeline in weeks, from the shortest to the longest. */
export type Weeks = readonly [min: number, max: number];

export interface GuidePrice {
  /** The starting price in euros, without VAT. */
  from: number;
  /** A monthly fee rather than a one-off price. */
  monthly?: boolean;
  weeks?: Weeks;
}

export const PRICES = {
  website: { from: 990, weeks: [3, 5] },
  shop: { from: 1990, weeks: [5, 8] },
  apps: { from: 2900, weeks: [6, 10] },
  integrations: { from: 390, weeks: [1, 3] },
  ai: { from: 790, weeks: [2, 4] },
  aiMonthly: { from: 39, monthly: true },
  hosting: { from: 29, monthly: true },
  seo: { from: 190, monthly: true },
  analytics: { from: 290, weeks: [1, 2] },
} as const satisfies Record<string, GuidePrice>;

export type PriceId = keyof typeof PRICES;

/**
 * Whether the prices on the site include VAT. The company's VAT status is
 * part of the company data the client sends (PROGRESS.md, item A); until
 * then the site states its prices without VAT.
 */
export const PRICES_INCLUDE_VAT = false;
