/** The design directions built as prototypes in phase 2. */

export type LabDirectionId = "a" | "b" | "c";

export interface LabDirection {
  id: LabDirectionId;
  letter: string;
  name: string;
  /** One line for the lab index, in Croatian (the client reads it). */
  summary: string;
}

export const LAB_DIRECTIONS: LabDirection[] = [
  {
    id: "a",
    letter: "A",
    name: "Nacrt",
    summary:
      "Stranica kao list nacrta: okvir sa zonama, tehničko pismo, a podnožje je zaglavlje s podacima o tvrtki.",
  },
  {
    id: "b",
    letter: "B",
    name: "Noćni nacrt",
    summary:
      "Tamnoplavi modelni prostor s velikim znakom i crtežom u liniji; sadržaj se čita na svijetlim listovima.",
  },
  {
    id: "c",
    letter: "C",
    name: "Studio",
    summary:
      "Topao, urednički raspored: veliki serifni naslovi, mjesto za fotografije tima i jedna crta po odjeljku.",
  },
];
