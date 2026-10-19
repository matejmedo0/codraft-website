import type { PageId } from "../features/i18n/route-map.ts";

/**
 * Croatian copy for the design-lab prototypes (phase 2). Every line is the HR
 * draft of a block in docs/content.md (IDs in the comments) or is derived from
 * one without new claims; docs/content.md lists the derived lines under
 * "Prototype copy". All three directions use the same copy, so the client
 * compares design, not wording.
 */

export interface NavItem {
  page: PageId;
  label: string;
}

export interface ServiceItem {
  /** The anchor on /usluge (docs/content.md §1). */
  anchor: string;
  title: string;
  body: string;
}

/** A service in a stage, with its one line for Home (review batch 4). */
export interface StageService extends ServiceItem {
  /** Shortened from the body for Home; /usluge keeps the full sentence. */
  short: string;
}

export interface Stage {
  number: string;
  /** The anchor on /usluge (docs/content.md §1). */
  anchor: string;
  title: string;
  tagline: string;
}

export interface PlanStage extends Stage {
  body: string;
  cta: string;
}

export interface ServiceStage extends Stage {
  items: StageService[];
}

export interface ServicesCopy {
  title: string;
  intro: string;
  plan: PlanStage;
  stages: ServiceStage[];
}

/** A drafting service; Home may give it a shorter title (review batch 8). */
export interface DraftingService extends StageService {
  shortTitle?: string;
}

export interface DraftingCopy {
  title: string;
  tagline: string;
  audience: string;
  /** Home's drafting zone, under the section's name (review batch 8). */
  home: { heading: string; lead: string };
  /** Each with its one line for Home (review batches 6 and 8). */
  items: DraftingService[];
  cta: string;
}

export interface CompanyField {
  label: string;
  value: string;
}

export interface FooterCopy {
  legal: NavItem[];
  company: CompanyField[];
  placeholderNote: string;
}

export const NAV: NavItem[] = [
  { page: "services", label: "Usluge" },
  { page: "drafting", label: "Tehničko crtanje" },
  { page: "about", label: "O nama" },
  { page: "contact", label: "Kontakt" },
];

export const HEADER = {
  cta: "Besplatna analiza",
  menu: "Izbornik",
  home: "Codraft, početna stranica",
  otherLanguage: "EN",
  otherLanguageName: "English",
  skipLink: "Preskoči na sadržaj",
} as const;

/**
 * The H1 in two lines, as the client asked (review batch 2): what we do,
 * then what we make. A wide hero column sets them apart; a narrow one wraps
 * them as one sentence.
 */
const HERO_TITLE_LINES = [
  "Planiramo, izrađujemo i održavamo",
  "web stranice, softver i AI alate.",
] as const;

export const HERO = {
  // Prototype draft for gap G1, derived from services.intro.
  title: HERO_TITLE_LINES.join(" "),
  titleLines: HERO_TITLE_LINES,
  // plan.body and run.tagline; replaces "rezultati, a ne žargon" (review
  // batch 2).
  lead: "Za tvrtke koje žele znati na čemu su: opseg posla, rok i cijenu dobivate prije početka rada, a nakon objave ostajemo uz vas.",
  // Glossary: "Book a free audit".
  primary: "Rezervirajte besplatnu analizu",
  // docs/information-architecture.md, Home hero.
  secondary: "Pogledajte usluge",
  // drafting.title and drafting.audience (ADR 0018).
  draftingLink: "Tehničko crtanje za arhitekturu i građevinarstvo",
} as const;

export const SERVICES: ServicesCopy = {
  title: "Što radimo", // services.title
  // services.intro
  intro:
    "Codraft je studio koji planira, izrađuje i održava web stranice, softver i AI alate za tvrtke koje žele razumjeti što dobivaju.",
  plan: {
    number: "01",
    anchor: "planiranje",
    title: "Planiranje", // plan.heading
    tagline: "Prvo jasnoća.", // plan.tagline
    // plan.body
    body: "Počinjemo besplatnom analizom vaše postojeće web stranice i vidljivosti na Googleu. Zatim, prije početka bilo kakvog rada, dobivate fiksni opseg posla, rok i cijenu.",
    cta: "→ Rezervirajte besplatnu analizu", // plan.cta
  },
  stages: [
    {
      number: "02",
      anchor: "izrada",
      title: "Izrada", // build.heading
      tagline:
        "Web stranice i softver prilagođeni načinu na koji stvarno radite.", // build.tagline
      items: [
        {
          anchor: "web-stranice",
          title: "Web stranice i web trgovine", // build.websites.*
          body: "Brze stranice i web trgovine, osmišljene najprije za mobitel, koje posjetitelje pretvaraju u pozive, rezervacije i narudžbe.",
          short: "Brze, prilagođene mobitelu i usmjerene na upite i narudžbe.",
        },
        {
          anchor: "web-aplikacije",
          title: "Web aplikacije i interni alati", // build.apps.*
          body: "Portali, nadzorne ploče i administracijski alati po mjeri koji zamjenjuju tablice i ručna zaobilazna rješenja.",
          short: "Alati po mjeri umjesto tablica i ručnog rada.",
        },
        {
          anchor: "integracije",
          title: "Integracije i online rezervacije", // build.integrations.*
          body: "Vaša web stranica povezana s kalendarima, plaćanjima i CRM-om, da svaki upit stigne do prave osobe.",
          short: "Kalendari, plaćanja i CRM povezani s vašom stranicom.",
        },
        {
          anchor: "ai-asistenti",
          title: "AI asistenti i automatizacija", // build.ai.*
          body: "Chatbotovi koji klijentima odgovaraju danonoćno, na temelju vašeg vlastitog sadržaja, i automatizacije koje s vas skidaju ponavljajuće zadatke.",
          short: "Chatbot koji odgovara danonoćno, na temelju vašeg sadržaja.",
        },
      ],
    },
    {
      number: "03",
      anchor: "odrzavanje-i-rast",
      title: "Održavanje i rast", // run.heading
      tagline: "Ne nestajemo nakon objave.", // run.tagline
      items: [
        {
          anchor: "hosting",
          title: "Hosting i održavanje", // run.hosting.*
          body: "Hosting o kojem brinemo mi, redovita ažuriranja, sigurnosne kopije i zakrpe, sve za fiksnu mjesečnu naknadu.",
          short: "Ažuriranja i sigurnosne kopije za fiksnu mjesečnu naknadu.",
        },
        {
          anchor: "seo",
          title: "SEO i lokalna vidljivost", // run.seo.*
          body: "Kontinuirani rad na vašem položaju u tražilicama, Profilu tvrtke na Googleu i recenzijama, uključujući vidljivost u AI tražilicama.",
          short: "Rad na vašem položaju na Googleu i u AI tražilicama.",
        },
        {
          anchor: "analitika",
          title: "Analitika i usklađenost", // run.analytics.*
          body: "Analitika, privola za kolačiće i pristupačnost postavljene kako treba, da možete mjeriti rezultate i ispuniti zahtjeve EU-a.",
          short: "Analitika, kolačići i pristupačnost postavljeni kako treba.",
        },
      ],
    },
  ],
};

export const DRAFTING: DraftingCopy = {
  title: "Tehničko crtanje", // drafting.title (ADR 0018)
  tagline: "Precizni crteži, isporučeni u roku.", // drafting.tagline
  // drafting.audience
  audience:
    "Za arhitektonske urede i tvrtke u građevinarstvu kojima treba dodatni kapacitet za crtanje.",
  // The client's text for Home (review batch 8), verbatim.
  home: {
    heading: "Kad crteža ima više nego ruku.",
    lead: "Crtamo za arhitektonske urede i građevinske tvrtke, u vašim slojevima i s vašim zaglavljem.",
  },
  // The short lines are the client's (batch 8), except the third, which the
  // client left to Claude, worded from drafting.docs.body.
  items: [
    {
      anchor: "2d-crtezi",
      title: "2D CAD crteži", // drafting.cad.*
      shortTitle: "2D crteži",
      body: "Točni 2D crteži u AutoCAD-u, izrađeni prema vašim standardima slojeva i zaglavlja, na temelju skica, skenova ili označenih nacrta.",
      short: "Tlocrti, presjeci i detalji koje možete odmah koristiti.",
    },
    {
      anchor: "3d-modeli",
      title: "3D modeli", // drafting.3d.* (ADR 0019)
      body: "Trodimenzionalni modeli zgrada i detalja, izrađeni prema vašim nacrtima i skicama, za provjeru i prezentaciju.",
      short: "Zgrade i detalji iz vaših nacrta i skica.",
    },
    {
      anchor: "dokumentacija",
      title: "Tehnička dokumentacija", // drafting.docs.*
      body: "Jasne specifikacije i kompleti crteža, ujednačenog formata i spremni za predaju.",
      short: "Crteži i specifikacije složeni u komplet spreman za predaju.",
    },
  ],
  cta: "Zatražite ponudu", // Glossary: "Request a quote".
};

export const FOOTER: FooterCopy = {
  legal: [
    { page: "privacy", label: "Privatnost" },
    { page: "cookies", label: "Kolačići" },
    { page: "legalNotice", label: "Impresum" },
    { page: "accessibility", label: "Izjava o pristupačnosti" },
  ],
  // The company data arrives from the client (PROGRESS.md, item A); the
  // prototypes only show where it goes.
  company: [
    { label: "Naziv tvrtke", value: "Codraft" },
    { label: "OIB", value: "—" },
    { label: "MBS", value: "—" },
    { label: "Sjedište", value: "—" },
  ],
  placeholderNote: "Podaci o tvrtki stižu prije objave.",
};

/*
 * Round 2 (the hybrids D and E): the rest of the Home outline in
 * docs/information-architecture.md. docs/content.md lists every line under
 * "Prototype copy", "Added for round 2".
 */

export interface TextItem {
  title: string;
  body: string;
}

/** Stage 01's two items, split from plan.body, so the stages hold 2, 4, 3. */
/** A stage 01 item, with its one line for Home (review batch 4). */
export interface PlanItem extends TextItem {
  short: string;
}

export const PLAN_ITEMS: PlanItem[] = [
  {
    title: "Besplatna analiza",
    body: "Pregled vaše postojeće web stranice i vidljivosti na Googleu.",
    short: "Pregled vaše web stranice i vidljivosti na Googleu.",
  },
  {
    title: "Fiksni opseg, rok i cijena",
    body: "Dobivate ih prije početka bilo kakvog rada.",
    short: "Znate ih prije početka rada.",
  },
];

export interface AuditCopy {
  title: string;
  lead: string;
  /** The flow in ADR 0007: form → time slot → confirmation. */
  steps: TextItem[];
  placeholderNote: string;
  cta: string;
}

export const AUDIT: AuditCopy = {
  title: "Besplatna analiza", // Glossary: "Free audit".
  // plan.body, first sentence.
  lead: "Počinjemo besplatnom analizom vaše postojeće web stranice i vidljivosti na Googleu.",
  steps: [
    { title: "Forma", body: "Ispunite kratku formu." },
    { title: "Termin", body: "Odaberite termin u kalendaru." },
    { title: "Potvrda", body: "Dobivate potvrdu termina." },
  ],
  // Stands in for G4 until the client defines the audit's scope.
  placeholderNote: "Popis onoga što analiza provjerava stiže prije objave.",
  cta: "Rezervirajte besplatnu analizu",
};

export type CadLayerId =
  "konture" | "osi" | "presjek" | "kote" | "oznake" | "zaglavlje";

export interface CadLayer {
  id: CadLayerId;
  label: string;
}

export interface CadCopy {
  layersLabel: string;
  /** In drawing order (docs/motion.md, "Layers"). */
  layers: CadLayer[];
  replay: string;
  drawingLabel: string;
  titleBlock: { part: string; units: string; studio: string; note: string };
}

export const CAD: CadCopy = {
  layersLabel: "Slojevi",
  layers: [
    { id: "konture", label: "Konture" },
    { id: "osi", label: "Osi" },
    { id: "presjek", label: "Presjek" },
    { id: "kote", label: "Kote" },
    { id: "oznake", label: "Oznake" },
    { id: "zaglavlje", label: "Zaglavlje" },
  ],
  replay: "Iscrtaj ponovno",
  drawingLabel:
    "Ilustracija: crtež ploče s četiri provrta i utorom, s presjekom A–A i kotama u milimetrima.",
  // The illustration says what it is (ADR 0004).
  titleBlock: {
    part: "Ploča s utorom",
    units: "mm",
    studio: "Codraft",
    note: "Ilustracija",
  },
};

/*
 * The floor plan on Home (review batch 5, ADR 0018): it replaces the
 * machined plate on /lab/pocetna; lab D and E keep the plate.
 */

export type PlanLayerId = "osi" | "zidovi" | "otvori" | "kote" | "zaglavlje";

export interface PlanCopy {
  layersLabel: string;
  /** In drawing order (docs/motion.md, "Layers"). */
  layers: { id: PlanLayerId; label: string }[];
  replay: string;
  drawingLabel: string;
  titleBlock: { title: string; units: string; studio: string; note: string };
}

export const PLAN: PlanCopy = {
  layersLabel: "Slojevi",
  layers: [
    { id: "osi", label: "Osi" },
    { id: "zidovi", label: "Zidovi" },
    { id: "otvori", label: "Otvori" },
    { id: "kote", label: "Kote" },
    { id: "zaglavlje", label: "Zaglavlje" },
  ],
  replay: "Iscrtaj ponovno",
  // Without the room names, at the client's request (review batch 6).
  drawingLabel:
    "Ilustracija: tlocrt manjeg stana s osima, zidovima, vratima i prozorima te kotama u centimetrima.",
  // The illustration says what it is (ADR 0004).
  titleBlock: {
    title: "Tlocrt stana",
    units: "Mjere u cm",
    studio: "Codraft",
    note: "Ilustracija",
  },
};

export const PRINCIPLES: { title: string; items: TextItem[] } = {
  title: "Kako radimo",
  items: [
    {
      title: "Cijena poznata unaprijed", // plan.body
      body: "Prije početka bilo kakvog rada dobivate fiksni opseg posla, rok i cijenu.",
    },
    {
      title: "Jasno objašnjeno", // services.intro
      body: "Objašnjavamo što radimo i zašto, jednostavnim jezikom i bez nepotrebnih tehničkih izraza.",
    },
    {
      title: "Ne nestajemo nakon objave", // run.tagline, run.hosting.body
      body: "Hosting, ažuriranja, sigurnosne kopije i zakrpe brinemo mi, za fiksnu mjesečnu naknadu.",
    },
  ],
};

export interface TeamCopy {
  title: string;
  /** Placeholders until the photos, names and roles arrive (G3). */
  members: { name: string; role: string }[];
  placeholderNote: string;
  more: string;
}

const MEMBER_PLACEHOLDER = { name: "Ime i prezime", role: "Uloga" };

export const TEAM: TeamCopy = {
  title: "Tim",
  members: [MEMBER_PLACEHOLDER, MEMBER_PLACEHOLDER, MEMBER_PLACEHOLDER],
  placeholderNote: "Fotografije, imena i uloge stižu u fazi 3.",
  more: "Više o nama",
};

export const CLOSING = {
  title: "Prvo jasnoća.", // plan.tagline
  primary: "Rezervirajte besplatnu analizu", // plan.cta
  // Glossary: alternative for "Request a quote"; the Contact page CTA.
  secondary: "Pošaljite upit",
} as const;
