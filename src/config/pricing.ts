/**
 * Codraft's guide prices: starting prices in euros, without VAT, and typical
 * timelines in weeks. The client asked for prices about 10% below the
 * Croatian market's median (ADR 0032).
 * The exact price is always in the written offer (`plan.body`).
 * Bottom layer: imports nothing from `src/`.
 */

/** A typical timeline in weeks, from the shortest to the longest. */
export type Weeks = readonly [min: number, max: number];

export interface GuidePrice {
  /** The starting price in euros, without VAT. */
  from: number;
  /** A monthly fee rather than a one-off price. */
  monthly?: boolean;
  /** The price of one drawing sheet, as the drafting market prices it. */
  perSheet?: boolean;
  weeks?: Weeks;
}

export const PRICES = {
  website: { from: 890, weeks: [3, 4] },
  shop: { from: 1390, weeks: [4, 6] },
  apps: { from: 2690, weeks: [4, 8] },
  integrations: { from: 190, weeks: [1, 2] },
  ai: { from: 690, weeks: [1, 3] },
  aiMonthly: { from: 45, monthly: true },
  hosting: { from: 35, monthly: true },
  seo: { from: 260, monthly: true },
  analytics: { from: 290, weeks: [1, 2] },
  drafting2d: { from: 65, perSheet: true, weeks: [1, 1] },
  drafting3d: { from: 80, weeks: [1, 2] },
  draftingDocs: { from: 490, weeks: [1, 2] },
} as const satisfies Record<string, GuidePrice>;

export type PriceId = keyof typeof PRICES;

/**
 * Whether the prices on the site include VAT. The company's VAT status is
 * part of the company data the client sends; until
 * then the site states its prices without VAT. It drives the JSON-LD only:
 * when it changes, change the copy that says so too (`services.terms`,
 * `services.faq.vat.a`; ADR 0032).
 */
export const PRICES_INCLUDE_VAT = false;
