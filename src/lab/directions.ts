/**
 * The design directions built as prototypes in phase 2: three in round 1,
 * then two hybrids in round 2 (docs/phases/2-design-round-2.md). Round 1
 * stays in the lab as the record of the client's first review.
 */

export type LabDirectionId = "a" | "b" | "c" | "d" | "e";

export interface LabDirection {
  id: LabDirectionId;
  letter: string;
  name: string;
  round: 1 | 2;
  /** One line for the lab index, in Croatian (the client reads it). */
  summary: string;
}

export const LAB_DIRECTIONS: LabDirection[] = [
  {
    id: "d",
    letter: "D",
    name: "Model i list",
    round: 2,
    summary:
      "Hibrid: list nacrta iz A s tamnoplavim herojem kao modelnim prostorom. „Što radimo“ u poglavljima, CAD crtež koji se gradi po slojevima i tamnoplavi završni poziv.",
  },
  {
    id: "e",
    letter: "E",
    name: "Nacrt s pojasom",
    round: 2,
    summary:
      "Hibrid: cijela stranica je svijetli list nacrta, a tamnoplavi pojas nosi besplatnu analizu i njezina tri koraka. „Što radimo“ u tri uravnotežena stupca.",
  },
  {
    id: "a",
    letter: "A",
    name: "Nacrt",
    round: 1,
    summary:
      "Stranica kao list nacrta: okvir sa zonama, tehničko pismo, a podnožje je zaglavlje s podacima o tvrtki.",
  },
  {
    id: "b",
    letter: "B",
    name: "Noćni nacrt",
    round: 1,
    summary:
      "Tamnoplavi modelni prostor s velikim znakom i crtežom u liniji; sadržaj se čita na svijetlim listovima.",
  },
  {
    id: "c",
    letter: "C",
    name: "Studio",
    round: 1,
    summary:
      "Topao, urednički raspored: veliki serifni naslovi, mjesto za fotografije tima i jedna crta po odjeljku.",
  },
];
