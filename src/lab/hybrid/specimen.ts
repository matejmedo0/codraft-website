import type { Swatch, TextPair } from "../components/specimen-types.ts";

/**
 * The specimen data shared by the hybrids D and E: both use paper and navy
 * surfaces with the accessible text tokens from docs/brand.md.
 */

export const HYBRID_SWATCHES: Swatch[] = [
  { name: "Papir", hex: "#F6F5F1", use: "Podloga lista" },
  {
    name: "Tamnoplava",
    hex: "#0F1B2D",
    use: "Tekst, linije, gumbi; tamnoplava površina",
  },
  {
    name: "Plava",
    hex: "#2F6BFF",
    use: "Samo grafika: crta, gripovi, kote, fokus",
  },
  {
    name: "Plava za tekst (papir)",
    hex: "#2457D6",
    use: "Poveznice na papiru",
  },
  {
    name: "Plava za tekst (tamna)",
    hex: "#77A0FF",
    use: "Poveznice na tamnoplavoj",
  },
  { name: "Siva (papir)", hex: "#5E6878", use: "Sporedni tekst na papiru" },
  {
    name: "Siva (tamna)",
    hex: "#A7B0BD",
    use: "Sporedni tekst na tamnoplavoj",
  },
  {
    name: "Udubljeni papir",
    hex: "#EDEBE5",
    use: "Prijelaz preko sekundarnog gumba, okviri za fotografije",
  },
];

export const HYBRID_PAIRS: TextPair[] = [
  { label: "Tamnoplava na papiru", fg: "#0F1B2D", bg: "#F6F5F1" },
  { label: "Siva na papiru", fg: "#5E6878", bg: "#F6F5F1" },
  { label: "Plava za tekst na papiru", fg: "#2457D6", bg: "#F6F5F1" },
  { label: "Papir na tamnoplavoj", fg: "#F6F5F1", bg: "#0F1B2D" },
  { label: "Siva na tamnoplavoj", fg: "#A7B0BD", bg: "#0F1B2D" },
  { label: "Plava za tekst na tamnoplavoj", fg: "#77A0FF", bg: "#0F1B2D" },
  { label: "Papir na gumbu, prijelaz", fg: "#F6F5F1", bg: "#27364F" },
  { label: "Tamnoplava na gumbu, prijelaz", fg: "#0F1B2D", bg: "#DDE3EC" },
  { label: "Tamnoplava na udubljenom papiru", fg: "#0F1B2D", bg: "#EDEBE5" },
  { label: "Siva na udubljenom papiru", fg: "#5E6878", bg: "#EDEBE5" },
  {
    label: "Brand plava na papiru",
    fg: "#2F6BFF",
    bg: "#F6F5F1",
    large: true,
  },
  {
    label: "Brand plava na tamnoplavoj",
    fg: "#2F6BFF",
    bg: "#0F1B2D",
    large: true,
  },
];
