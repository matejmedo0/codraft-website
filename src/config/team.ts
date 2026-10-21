/**
 * The team, as Home's team strip shows it (two people, ADR 0015) and, later,
 * the About page (G15). The names come from the client (phase 3, M2) and
 * are not translated; each role is a UI string, `team.<id>.role`. The
 * photos and the written consent to publish them arrive later (PROGRESS.md,
 * item C); until then the strip draws a placeholder frame for each.
 * Bottom layer: imports nothing from `src/`.
 */

export type TeamMemberId = "matejMedved" | "tinManjerovic";

export interface TeamMember {
  id: TeamMemberId;
  name: string;
}

/** In the client's order: Matej first, then Tin. */
export const TEAM: readonly TeamMember[] = [
  { id: "matejMedved", name: "Matej Medved" },
  { id: "tinManjerovic", name: "Tin Manjerović" },
];
