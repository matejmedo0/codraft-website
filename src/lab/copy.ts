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
  items: ServiceItem[];
}

export interface ServicesCopy {
  title: string;
  intro: string;
  plan: PlanStage;
  stages: ServiceStage[];
}

export interface DraftingCopy {
  title: string;
  tagline: string;
  audience: string;
  items: ServiceItem[];
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
        },
        {
          anchor: "web-aplikacije",
          title: "Web aplikacije i interni alati", // build.apps.*
          body: "Portali, nadzorne ploče i administracijski alati po mjeri koji zamjenjuju tablice i ručna zaobilazna rješenja.",
        },
        {
          anchor: "integracije",
          title: "Integracije i online rezervacije", // build.integrations.*
          body: "Vaša web stranica povezana s kalendarima, plaćanjima i CRM-om, da svaki upit stigne do prave osobe.",
        },
        {
          anchor: "ai-asistenti",
          title: "AI asistenti i automatizacija", // build.ai.*
          body: "Chatbotovi koji klijentima odgovaraju danonoćno, na temelju vašeg vlastitog sadržaja, i automatizacije koje s vas skidaju ponavljajuće zadatke.",
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
        },
        {
          anchor: "seo",
          title: "SEO i lokalna vidljivost", // run.seo.*
          body: "Kontinuirani rad na vašem položaju u tražilicama, Profilu tvrtke na Googleu i recenzijama, uključujući vidljivost u AI tražilicama.",
        },
        {
          anchor: "analitika",
          title: "Analitika i usklađenost", // run.analytics.*
          body: "Analitika, privola za kolačiće i pristupačnost postavljene kako treba, da možete mjeriti rezultate i ispuniti zahtjeve EU-a.",
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
  items: [
    {
      anchor: "2d-crtezi",
      title: "2D CAD crteži", // drafting.cad.*
      body: "Točni 2D crteži u AutoCAD-u, izrađeni prema vašim standardima slojeva i zaglavlja, na temelju skica, skenova ili označenih nacrta.",
    },
    {
      anchor: "dokumentacija",
      title: "Tehnička dokumentacija", // drafting.docs.*
      body: "Jasne specifikacije i kompleti crteža, ujednačenog formata i spremni za predaju.",
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
export const PLAN_ITEMS: TextItem[] = [
  {
    title: "Besplatna analiza",
    body: "Pregled vaše postojeće web stranice i vidljivosti na Googleu.",
  },
  {
    title: "Fiksni opseg, rok i cijena",
    body: "Dobivate ih prije početka bilo kakvog rada.",
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
