/**
 * The company data the title block (and, in phase 3, the legal notice)
 * shows. It arrives from the client (PROGRESS.md, item A); until then a
 * value is `null` and the title block says it arrives before launch.
 * Bottom layer: imports nothing from `src/`.
 */

export interface Company {
  /** The registered name, e.g. "Codraft d.o.o.". */
  legalName: string | null;
  oib: string | null;
  /** The court registration number (MBS), for a company. */
  mbs: string | null;
  /** The registered office (sjedište). */
  seat: string | null;
  email: string | null;
  phone: string | null;
}

export const COMPANY: Company = {
  legalName: null,
  oib: null,
  mbs: null,
  seat: null,
  email: null,
  phone: null,
};
