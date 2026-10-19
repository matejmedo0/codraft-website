import motionCss from "../../styles/motion.css?raw";
import tokensCss from "../../styles/tokens.css?raw";

/**
 * Data for the style page (/lab/style): what each token is for, in Croatian
 * for the client. The values themselves are read from tokens.css and
 * motion.css at build time, so the page always shows the real tokens.
 */

/** The value of a custom property, as written in tokens.css or motion.css. */
export function tokenValue(name: string): string {
  for (const css of [tokensCss, motionCss]) {
    const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(css);
    if (match?.[1]) return match[1].replace(/\s+/g, " ").trim();
  }
  throw new Error(`--${name} is not a design token`);
}

export interface PaletteEntry {
  /** The name after `--color-`. */
  token: string;
  name: string;
  use: string;
}

export const PALETTE: PaletteEntry[] = [
  { token: "paper", name: "Papir", use: "Podloga lista" },
  {
    token: "navy",
    name: "Tamnoplava",
    use: "Tinta: tekst, crte, okvir lista, primarni gumb. Kao površina samo u završnom pozivu.",
  },
  {
    token: "blue",
    name: "Plava",
    use: "Samo grafika: crte, gripovi, kote, fokus. Nikad za tekst.",
  },
  {
    token: "paper-sunk",
    name: "Udubljeni papir",
    use: "Ploče, sekundarni gumb pod mišem, onemogućeni gumb",
  },
  {
    token: "navy-raised",
    name: "Podignuta tamnoplava",
    use: "Ploče i sekundarni gumb pod mišem na tamnoplavoj",
  },
  {
    token: "navy-hover",
    name: "Tamnoplava pod mišem",
    use: "Primarni gumb pod mišem",
  },
  {
    token: "paper-hover",
    name: "Papir pod mišem",
    use: "Primarni gumb na tamnoplavoj pod mišem",
  },
  {
    token: "blue-on-paper",
    name: "Plava za tekst na papiru",
    use: "Poveznice i vrijednosti kota",
  },
  {
    token: "blue-on-navy",
    name: "Plava za tekst na tamnoplavoj",
    use: "Poveznice na tamnoplavoj",
  },
  {
    token: "grey-on-paper",
    name: "Siva na papiru",
    use: "Sporedni tekst i oznake",
  },
  {
    token: "grey-on-navy",
    name: "Siva na tamnoplavoj",
    use: "Sporedni tekst na tamnoplavoj",
  },
];

export interface TextPair {
  label: string;
  fg: string;
  bg: string;
  /** Large text and graphics only: 3:1 instead of 4.5:1. */
  large?: true;
}

/** The text pairs the components use (the same as tokens.test.ts). */
export const TEXT_PAIRS: TextPair[] = [
  { label: "Tamnoplava na papiru", fg: "navy", bg: "paper" },
  { label: "Siva na papiru", fg: "grey-on-paper", bg: "paper" },
  { label: "Plava za tekst na papiru", fg: "blue-on-paper", bg: "paper" },
  { label: "Tamnoplava na udubljenom papiru", fg: "navy", bg: "paper-sunk" },
  { label: "Siva na udubljenom papiru", fg: "grey-on-paper", bg: "paper-sunk" },
  { label: "Papir na primarnom gumbu", fg: "paper", bg: "navy" },
  {
    label: "Papir na primarnom gumbu pod mišem",
    fg: "paper",
    bg: "navy-hover",
  },
  { label: "Siva na tamnoplavoj", fg: "grey-on-navy", bg: "navy" },
  { label: "Plava za tekst na tamnoplavoj", fg: "blue-on-navy", bg: "navy" },
  { label: "Papir na podignutoj tamnoplavoj", fg: "paper", bg: "navy-raised" },
  {
    label: "Tamnoplava na gumbu pod mišem (tamnoplava površina)",
    fg: "navy",
    bg: "paper-hover",
  },
  { label: "Plava na papiru", fg: "blue", bg: "paper", large: true },
  { label: "Plava na tamnoplavoj", fg: "blue", bg: "navy", large: true },
];

export interface TypeStep {
  token: string;
  name: string;
  /** The element or class that uses it. */
  use: string;
  sample: string;
}

export const TYPE_STEPS: TypeStep[] = [
  {
    token: "step-display",
    name: "Naslov stranice",
    use: "H1 i završni poziv; težina 680, širina 87,5 %",
    sample:
      "Planiramo, izrađujemo i održavamo web stranice, softver i AI alate.",
  },
  {
    token: "step-section",
    name: "Naslov odjeljka",
    use: "H2; težina 620, širina 87,5 %",
    sample: "Što radimo",
  },
  {
    token: "step-chapter",
    name: "Naslov poglavlja",
    use: "Stupnjevi u „Što radimo“; težina 640",
    sample: "Održavanje i rast",
  },
  {
    token: "step-title",
    name: "Naslov stavke",
    use: "H3 i stavke; težina 600, puna širina",
    sample: "Integracije i online rezervacije",
  },
  {
    token: "step-lead",
    name: "Uvod",
    use: "Uvodni odlomak ispod naslova",
    sample:
      "Codraft je mali studio za tvrtke kojima su važni rezultati, a ne žargon.",
  },
  {
    token: "step-body",
    name: "Tekst",
    use: "Odlomci i popisi; prored 1,55",
    sample:
      "Vaša web stranica povezana s kalendarima, plaćanjima i CRM-om, da svaki upit stigne do prave osobe.",
  },
  {
    token: "step-small",
    name: "Sitni tekst",
    use: "Uloge, napomene, gumb za ponavljanje",
    sample: "Fotografije, imena i uloge stižu u fazi 3.",
  },
  {
    token: "step-label",
    name: "Oznaka",
    use: "Zaglavlje nacrta, kote, slojevi; uska širina 75 %, tablične brojke",
    sample: "Đurđevac, Čakovec, Ćićarija, Šibenik, Žminj; 4× Ø10; 1.200,00 €",
  },
];

export interface MotionToken {
  token: string;
  use: string;
}

export const MOTION_TOKENS: MotionToken[] = [
  { token: "motion-instant", use: "Pritisak gumba (98 %)" },
  { token: "motion-fast", use: "Gripovi, male promjene stanja" },
  { token: "motion-base", use: "Prijelaz između stranica, oznaka kote" },
  { token: "motion-snap", use: "Grip koji „sjedne“ na kraj crte" },
  { token: "motion-slow", use: "Kota; otpuštanje odabira crte zone" },
  { token: "motion-draw", use: "Crtačka linija: znak, crta zone, koraci" },
  { token: "motion-entrance-delay", use: "Stanka prije ulaza znaka" },
  { token: "motion-hold", use: "Koliko dugo crta zone ostaje odabrana" },
  { token: "ease-standard", use: "Većina prijelaza" },
  { token: "ease-pen", use: "Potez pera: spor početak, dugo klizanje" },
];

export interface SpaceToken {
  step: number;
  use: string;
}

export const SPACE_TOKENS: SpaceToken[] = [
  { step: 1, use: "Između oznake i vrijednosti" },
  { step: 2, use: "Margina lista na mobitelu" },
  { step: 3, use: "Unutar gumba, između redaka zaglavlja" },
  { step: 4, use: "Rub zone na mobitelu" },
  { step: 5, use: "Margina lista od 768 px" },
  { step: 6, use: "Razmak stupaca; rub zone od 768 px" },
  { step: 7, use: "Između bloka teksta i crteža" },
  { step: 8, use: "Unutarnji razmak zone na mobitelu" },
  { step: 9, use: "Unutarnji razmak zone od 768 px" },
  { step: 10, use: "Unutarnji razmak zone od 1280 px" },
];

export const SHAPE_TOKENS: MotionToken[] = [
  { token: "radius", use: "Gumbi, polja, gumb izbornika, ploče" },
  { token: "rule", use: "Okvir lista, crte zona, zaglavlje nacrta" },
  { token: "rail", use: "Crta kroz korake, oznaka trenutne stranice" },
  { token: "grip-size", use: "Grip: šuplji kvadrat kao u ikoni C" },
  { token: "focus-width", use: "Crta fokusa" },
  { token: "focus-offset", use: "Razmak fokusa od elementa" },
  { token: "control-height", use: "Najmanja visina gumba" },
  { token: "control-height-compact", use: "Gumb u zaglavlju (44 px)" },
];
