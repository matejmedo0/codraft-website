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
  { page: "drafting", label: "CAD crtanje" },
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

export const HERO = {
  // Prototype draft for gap G1, derived from services.intro.
  title: "Planiramo, izrađujemo i održavamo web stranice, softver i AI alate.",
  // Derived from services.intro.
  lead: "Codraft je mali studio za tvrtke kojima su važni rezultati, a ne žargon.",
  // Glossary: "Book a free audit".
  primary: "Rezervirajte besplatnu analizu",
  // docs/information-architecture.md, Home hero.
  secondary: "Pogledajte usluge",
  // drafting.title and drafting.audience.
  draftingLink: "CAD crtanje za arhitekte, inženjerske urede i proizvođače",
} as const;

export const SERVICES: ServicesCopy = {
  title: "Što radimo", // services.title
  // services.intro
  intro:
    "Codraft je mali studio koji planira, izrađuje i održava web stranice, softver i AI alate za tvrtke kojima su važni rezultati, a ne žargon.",
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
  title: "CAD crtanje", // drafting.title
  tagline: "Precizni crteži, isporučeni u roku.", // drafting.tagline
  // drafting.audience
  audience:
    "Za arhitekte, inženjerske urede i proizvođače kojima treba dodatni kapacitet za crtanje.",
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
