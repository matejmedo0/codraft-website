import { type GuidePrice, type Weeks } from "../../config/pricing.ts";
import type { Locale } from "../../config/site.ts";
import { t } from "../i18n/ui.ts";

/** Keeps a number and its unit on one line. */
const NBSP = String.fromCharCode(0xa0);

const NUMBER_LOCALES = { hr: "hr-HR", en: "en-GB" } as const satisfies Record<
  Locale,
  string
>;

/**
 * An amount in euros, whole: HR "1.290 €", EN "€1,290" (docs/content.md §1,
 * typography). The space before the Croatian sign doesn't break.
 */
export function formatEuro(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALES[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * A guide price as the page shows it: HR "od 990 €", "od 29 € mjesečno",
 * "od 65 € po listu"; EN "from €990", "from €29 a month", "from €65 per
 * sheet".
 */
export function formatGuidePrice(price: GuidePrice, locale: Locale): string {
  const parts = [t(locale, "services.from"), formatEuro(price.from, locale)];
  if (price.monthly === true) parts.push(t(locale, "services.perMonth"));
  if (price.perSheet === true) parts.push(t(locale, "services.perSheet"));
  return parts.join(" ");
}

/**
 * A timeline in weeks, with an en dash and the word that agrees with the
 * last number: HR "1–2 tjedna", "3–5 tjedana"; EN "3–5 weeks".
 */
export function formatWeeks([min, max]: Weeks, locale: Locale): string {
  const form = new Intl.PluralRules(NUMBER_LOCALES[locale]).select(max);
  const word =
    form === "one"
      ? t(locale, "services.weeks.one")
      : form === "few"
        ? t(locale, "services.weeks.few")
        : t(locale, "services.weeks.other");
  const range = min === max ? String(max) : `${String(min)}–${String(max)}`;
  return `${range}${NBSP}${word}`;
}
