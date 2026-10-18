# Compliance (Croatia and EU)

> **Not legal advice.** This file collects the legal and regulatory requirements found while planning (2026-10-18), each with its source and a confidence rating. Claude drafts the legal pages from it. **A lawyer should review the legal texts before launch** (phase 7 input).

## Requirements

| # | Topic | Rule | Source | Confidence | Phase |
|---|---|---|---|---|---|
| C1 | **Company data on the website** | Companies must show the same data on their website as on business letters. Applies to the impresum and footer. | ZTD Art. 21(4)–(5): "Isto vrijedi i za sadržaj internetske stranice društva" | High | 3, 6 |
| C2 | **Service-provider information** | Name, seat, contact (including email), registry data, OIB/VAT ID. Prices must state whether VAT and delivery costs are included. | ZET Art. 6(1)–(2) | High | 3, 6 |
| C3 | **Cookies** | Prior consent for non-essential cookies and similar storage. Exceptions: transmission of a communication, and a service the user explicitly requested. Supervised by AZOP. | ZEK Art. 43(4) | High | 4 |
| C4 | **GDPR** | Privacy notice: controller, purposes, legal bases, processors, retention, data subject rights, the right to complain to AZOP. | GDPR; Croatian implementing act NN 42/18 | High | 3–4 |
| C5 | **Enquiry forms** | The legal basis is steps before a contract (GDPR Art. 6(1)(b)), so no consent checkbox is needed. A link to the privacy notice is enough. | GDPR Art. 6(1)(b) | Medium-high | 4 |
| C6 | **Chatbot transparency** | Tell users at the first interaction that they are talking to an AI. Check whether Art. 50(2) (machine-readable marking of generated content) applies to chatbots Codraft builds for clients. | EU AI Act Art. 50(1). It has applied since 2 Aug 2026; the Digital Omnibus did not postpone it. | Medium-high (secondary sources) | 4 |
| C7 | **Accessibility (European Accessibility Act)** | The Croatian law has applied since 28 Jun 2025 to e-commerce services for consumers. Micro-enterprises providing services are exempt (Art. 4(2)). Codraft's own site is very likely out of scope; we publish a voluntary, honest statement. Clients' web shops are in scope unless the client is a micro-enterprise, which makes this an accurate selling point. | NN 89/2025 | High | 5–6 |
| C8 | **Fake reviews** | Banned: fake reviews, and claiming reviews are genuine without checking them. Copy must say "prikupljanje i odgovaranje na recenzije", i.e. genuine reviews only. | UCPD Annex I points 23b–23c, added by Directive 2019/2161 | High | 3, 8 |
| C9 | **Regulated design work (projektiranje)** | "Poslove projektiranja u svojstvu odgovorne osobe (projektanta)… može obavljati ovlašteni arhitekt ili ovlašteni inženjer". Art. 3(2) defines projektiranje broadly; Art. 83 fines legal persons that do projektiranje without an authorised architect or engineer. | ZPDPUG Arts. 3, 17, 83 | High on Art. 17; medium on exactly where drafting support ends | 3, 6 |
| C10 | **Web fonts** | Loading Google Fonts from Google's servers was found to breach GDPR (IP transfer). First-instance ruling, persuasive rather than binding; self-hosting removes the issue. | LG München I, 3 O 17493/20 (20 Jan 2022) | High on the facts | 2 |
| C11 | **Language** | The Croatian Language Act mainly binds public bodies. A Croatian-first site satisfies it anyway. | NN 14/24 | Low relevance | — |
| C12 | **E-invoicing / fiscalisation** (only if suggestion S16 is approved) | The new Fiscalisation Act introduces B2B eRačun for VAT payers from 1 Jan 2026. | Zakon o fiskalizaciji, NN 89/25 | Medium (secondary sources) | 3 |
| C13 | **Google Business Profile eligibility** | Requires a physical location customers can visit, or a business that travels to its customers. Virtual offices don't qualify; service-area businesses hide their address. A fully remote studio would not be eligible. | Google Business Profile guidelines | High | 7 |
| C14 | **.hr domain** | One free .hr domain per legal person or craft registered in Croatia, if it contains the registered name or an abbreviation of it. Other .hr domains are paid, through authorised registrars, and open to EU legal persons and EU nationals with a Croatian OIB. | Pravilnik NN 83/2023, Arts. 11, 12, 15, 16 | Medium-high | 7 |

## Copy guardrails

These apply to every page in both languages. Phase 6 checks them with grep.

1. **Drafting is support, not design of record.**
   - Never present *projektiranje, projektiramo, projektant, projektna dokumentacija* or *snimka postojećeg stanja* as Codraft deliverables (C9).
   - Say "crtamo prema vašim skicama, oznakama i standardima" or "crtačka podrška vašem timu".
   - State that responsibility, stamp and signature remain with the client's authorised architect or engineer.
   - Don't call team members "inženjer" unless they hold that title.
   - Before launch, check with HKA, HKIG or a lawyer (about 15 minutes).
2. **No invented proof:** no fake testimonials, invented client counts, client logos without permission, or "trusted by" bars (C8; [ADR 0004](decisions/0004-verifiable-proof-only.md)).
3. **Prices.** If shown, say whether VAT is included (C2). Show final prices to consumers. HR format: `1.200,00 €`.
4. **"Help you meet", not "meet".** Technical setup supports compliance; it is not legal compliance by itself (suggestion S6).
5. **AI is labelled as AI** in the chatbot and anywhere AI-generated content appears (C6).

## Checks by phase

- **Phase 3:**
  - The impresum contains every C1/C2 field.
  - Legal drafts are based on the actual company data.
- **Phase 4:**
  - Consent banner: "Prihvati sve" and "Odbij sve" equally prominent, plus "Postavke".
  - No pre-ticked boxes; consent can be withdrawn from the footer.
  - No analytics or booking requests before consent or a click (C3).
  - Chatbot AI disclosure at the first message (C6).
- **Phase 6:**
  - The impresum matches ZTD Art. 21 and ZET Art. 6.
  - The processors in the privacy policy match the actual network calls.
  - The cookie policy matches the actual cookies.
  - A grep finds no "projektiranje" or "projektant".
  - The accessibility statement is dated and reflects the audit.
- **Phase 7:** a lawyer reviews the legal texts; GBP eligibility is confirmed (C13).

## Sources

| Ref | Source |
|---|---|
| C1 | Companies act (ZTD), Art. 21: https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima |
| C2 | E-commerce act (ZET), Art. 6: https://www.zakon.hr/z/199/Zakon-o-elektroni%C4%8Dkoj-trgovini |
| C3 | Electronic communications act (ZEK), Art. 43(4): https://www.zakon.hr/z/182/Zakon-o-elektroni%C4%8Dkim-komunikacijama |
| C6 | AI Act after the Digital Omnibus (secondary): https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/ and https://www.legalithm.com/en/blog/eu-ai-act-what-applies-2-august-2026 |
| C7 | Accessibility law NN 89/2025: https://narodne-novine.nn.hr/clanci/sluzbeni/2025_06_89_1231.html |
| C8 | Directive 2019/2161 (UCPD amendments): https://eur-lex.europa.eu/eli/dir/2019/2161/oj |
| C9 | ZPDPUG, Arts. 3, 17, 83 (HKA consolidated PDF): https://www.arhitekti-hka.hr/files/file/pdf/Zakon%20o%20poslovima%20i%20djelatnostima%20prostornog%20uredenja%20i%20gradnje%202020.pdf |
| C10 | Munich Google Fonts ruling: https://www.activemind.legal/guides/ruling-google-fonts/ |
| C11 | Croatian Language Act NN 14/24: https://narodne-novine.nn.hr/clanci/sluzbeni/2024_02_14_252.html |
| C12 | Fiscalisation act (secondary): https://www.rrif.hr/objavljen_je_novi_zakon_o_fiskalizaciji-2439-vijest/ |
| C13 | Google Business Profile eligibility: https://support.google.com/business/answer/3038177 and the Croatian term: https://support.google.com/business/answer/7667250?hl=hr |
| C14 | .hr domain regulation NN 83/2023: https://www.zakon.hr/c/podzakonski-propis/57565/nn-83-2023-%2821.7.2023.%29%2C-pravilnik-o-ustrojstvu-i-upravljanju-vrsnom-nacionalnom-internetskom-domenom |
| FAQ rich results | Google, Aug 2023: https://developers.google.com/search/blog/2023/08/howto-faq-changes |
