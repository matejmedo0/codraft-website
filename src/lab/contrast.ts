/**
 * WCAG 2.x contrast ratio between two sRGB colours, for the specimen's
 * colour table. https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
 */

const HEX_COLOUR = /^#([0-9a-f]{6})$/i;

/** Linear-light value of one 8-bit sRGB channel. */
function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance of a `#rrggbb` colour. */
export function luminance(hex: string): number {
  const match = HEX_COLOUR.exec(hex);
  if (!match?.[1]) throw new Error(`Not a #rrggbb colour: ${hex}`);
  const value = Number.parseInt(match[1], 16);
  const r = channel((value >> 16) & 0xff);
  const g = channel((value >> 8) & 0xff);
  const b = channel(value & 0xff);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio, from 1 to 21. */
export function contrast(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** The ratio rounded down to two decimals, so 4.4988 never shows as 4.50. */
export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}
