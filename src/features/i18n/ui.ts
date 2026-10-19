import type { Locale } from "../../config/site.ts";
import en from "../../locales/en.json";
import hr from "../../locales/hr.json";

/** A UI string key. Croatian is the reference; English must have every key. */
export type UiKey = keyof typeof hr;

const STRINGS = { hr, en } satisfies Record<Locale, Record<UiKey, string>>;

/** A UI string in a locale. */
export function t(locale: Locale, key: UiKey): string {
  return STRINGS[locale][key];
}
