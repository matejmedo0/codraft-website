/**
 * The service icons of "Što radimo" (the client's review, batches 4, 5 and
 * 13), transcribed from the client's sources in Assets/codraft-icons/svg/:
 * a 48 × 48 grid, strokes listed in drawing order. Each icon is its navy
 * ink, then its blue accent, a short drafting line and the grip square at
 * its end (docs/brand.md, "Imagery"). Generated once from the sources; if
 * they change, transcribe them again.
 */

export type ServiceIconId =
  | "besplatna-analiza"
  | "fiksni-opseg"
  | "web-stranice"
  | "web-aplikacije"
  | "integracije"
  | "ai-asistenti"
  | "hosting"
  | "seo"
  | "analitika";

export interface IconShape {
  tag: "path" | "line" | "rect" | "circle" | "polyline";
  attrs: Record<string, string>;
}

export interface ServiceIcon {
  /** The navy strokes, in drawing order. */
  ink: IconShape[];
  /** The blue drafting line. */
  line: IconShape;
  /** The grip square at the line's end. */
  grip: IconShape;
}

export const SERVICE_ICONS: Record<ServiceIconId, ServiceIcon> = {
  "besplatna-analiza": {
    ink: [
      { tag: "path", attrs: { d: "M37 17V5.5H3.5V33H18.5" } },
      { tag: "circle", attrs: { cx: "30", cy: "27.5", r: "9.5" } },
      { tag: "line", attrs: { x1: "37", y1: "34.5", x2: "44.5", y2: "42" } },
      { tag: "line", attrs: { x1: "3.5", y1: "12", x2: "37", y2: "12" } },
      { tag: "line", attrs: { x1: "7.5", y1: "17", x2: "19", y2: "17" } },
      { tag: "line", attrs: { x1: "7.5", y1: "21.5", x2: "14", y2: "21.5" } },
    ],
    line: {
      tag: "line",
      attrs: { x1: "25.5", y1: "27.5", x2: "30.5", y2: "27.5" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "30.5", y: "25.5", width: "4", height: "4" },
    },
  },
  "fiksni-opseg": {
    ink: [
      { tag: "path", attrs: { d: "M12.5 3H29.5L35.5 9V35.5H12.5Z" } },
      { tag: "path", attrs: { d: "M29.5 3V9H35.5" } },
      { tag: "line", attrs: { x1: "16.5", y1: "21", x2: "31.5", y2: "21" } },
      { tag: "line", attrs: { x1: "16.5", y1: "25", x2: "31.5", y2: "25" } },
      { tag: "line", attrs: { x1: "16.5", y1: "29", x2: "25", y2: "29" } },
      { tag: "line", attrs: { x1: "12.5", y1: "39", x2: "12.5", y2: "45" } },
      { tag: "line", attrs: { x1: "35.5", y1: "39", x2: "35.5", y2: "45" } },
      {
        tag: "line",
        attrs: { x1: "12.5", y1: "42.5", x2: "35.5", y2: "42.5" },
      },
      { tag: "polyline", attrs: { points: "17.5 40.5 14 42.5 17.5 44.5" } },
      { tag: "polyline", attrs: { points: "30.5 40.5 34 42.5 30.5 44.5" } },
    ],
    line: {
      tag: "line",
      attrs: { x1: "16.5", y1: "15.5", x2: "21.5", y2: "15.5" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "21.5", y: "13.5", width: "4", height: "4" },
    },
  },
  "web-stranice": {
    ink: [
      { tag: "path", attrs: { d: "M39.5 15.5V4.5H4V32H28.5" } },
      {
        tag: "rect",
        attrs: { x: "31.5", y: "18.5", width: "12", height: "25" },
      },
      { tag: "line", attrs: { x1: "4", y1: "11", x2: "39.5", y2: "11" } },
      { tag: "line", attrs: { x1: "8", y1: "21.5", x2: "23", y2: "21.5" } },
      { tag: "line", attrs: { x1: "8", y1: "25.5", x2: "18.5", y2: "25.5" } },
      { tag: "line", attrs: { x1: "35.5", y1: "40", x2: "39.5", y2: "40" } },
    ],
    line: { tag: "line", attrs: { x1: "8", y1: "16", x2: "13", y2: "16" } },
    grip: { tag: "rect", attrs: { x: "13", y: "14", width: "4", height: "4" } },
  },
  "web-aplikacije": {
    ink: [
      { tag: "rect", attrs: { x: "3", y: "6", width: "42", height: "35.5" } },
      { tag: "line", attrs: { x1: "3", y1: "12.5", x2: "45", y2: "12.5" } },
      {
        tag: "line",
        attrs: { x1: "12.5", y1: "12.5", x2: "12.5", y2: "41.5" },
      },
      {
        tag: "rect",
        attrs: { x: "15.5", y: "15.5", width: "12.5", height: "10" },
      },
      {
        tag: "rect",
        attrs: { x: "31.5", y: "15.5", width: "10.5", height: "10" },
      },
      {
        tag: "rect",
        attrs: { x: "15.5", y: "28.5", width: "26.5", height: "10" },
      },
      { tag: "line", attrs: { x1: "6", y1: "17.5", x2: "9.5", y2: "17.5" } },
      { tag: "line", attrs: { x1: "6", y1: "21.5", x2: "9.5", y2: "21.5" } },
      { tag: "line", attrs: { x1: "6", y1: "25.5", x2: "9.5", y2: "25.5" } },
      { tag: "line", attrs: { x1: "19", y1: "22.5", x2: "19", y2: "20" } },
      { tag: "line", attrs: { x1: "22", y1: "22.5", x2: "22", y2: "18.5" } },
      { tag: "line", attrs: { x1: "25", y1: "22.5", x2: "25", y2: "19.5" } },
      {
        tag: "line",
        attrs: { x1: "30.5", y1: "33.5", x2: "37.5", y2: "33.5" },
      },
    ],
    line: {
      tag: "line",
      attrs: { x1: "20", y1: "33.5", x2: "25", y2: "33.5" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "25", y: "31.5", width: "4", height: "4" },
    },
  },
  integracije: {
    ink: [
      { tag: "rect", attrs: { x: "3", y: "19", width: "10", height: "10" } },
      { tag: "rect", attrs: { x: "35", y: "4", width: "10", height: "10" } },
      { tag: "rect", attrs: { x: "35", y: "34", width: "10", height: "10" } },
      { tag: "path", attrs: { d: "M35 9H22V39H35" } },
      { tag: "line", attrs: { x1: "13", y1: "24", x2: "22", y2: "24" } },
      { tag: "line", attrs: { x1: "3", y1: "22", x2: "13", y2: "22" } },
      { tag: "line", attrs: { x1: "6", y1: "16.5", x2: "6", y2: "18.5" } },
      { tag: "line", attrs: { x1: "10", y1: "16.5", x2: "10", y2: "18.5" } },
    ],
    line: { tag: "line", attrs: { x1: "23.5", y1: "24", x2: "28", y2: "24" } },
    grip: { tag: "rect", attrs: { x: "28", y: "22", width: "4", height: "4" } },
  },
  "ai-asistenti": {
    ink: [
      { tag: "path", attrs: { d: "M3 6H45V33.5H17.5L10.5 40.5V33.5H3Z" } },
      { tag: "circle", attrs: { cx: "11", cy: "24", r: "2" } },
      { tag: "circle", attrs: { cx: "19", cy: "16", r: "2" } },
      { tag: "circle", attrs: { cx: "27", cy: "24", r: "2" } },
      {
        tag: "line",
        attrs: { x1: "12.5", y1: "22.5", x2: "17.5", y2: "17.5" },
      },
      {
        tag: "line",
        attrs: { x1: "20.5", y1: "17.5", x2: "25.5", y2: "22.5" },
      },
      { tag: "line", attrs: { x1: "13.5", y1: "24", x2: "24.5", y2: "24" } },
    ],
    line: {
      tag: "line",
      attrs: { x1: "30.5", y1: "24", x2: "35.5", y2: "24" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "35.5", y: "22", width: "4", height: "4" },
    },
  },
  hosting: {
    ink: [
      { tag: "rect", attrs: { x: "3.5", y: "6", width: "23", height: "10" } },
      { tag: "rect", attrs: { x: "3.5", y: "19", width: "23", height: "10" } },
      { tag: "rect", attrs: { x: "3.5", y: "32", width: "23", height: "10" } },
      { tag: "path", attrs: { d: "M44 21.5A6.5 6.5 0 1 1 38 17.5" } },
      { tag: "polyline", attrs: { points: "36.5 14.5 39.5 17.5 36.5 20.5" } },
      { tag: "circle", attrs: { cx: "8", cy: "11", r: "1.5" } },
      { tag: "circle", attrs: { cx: "8", cy: "24", r: "1.5" } },
      { tag: "circle", attrs: { cx: "8", cy: "37", r: "1.5" } },
      { tag: "line", attrs: { x1: "13", y1: "11", x2: "22", y2: "11" } },
      { tag: "line", attrs: { x1: "13", y1: "37", x2: "22", y2: "37" } },
    ],
    line: { tag: "line", attrs: { x1: "13", y1: "24", x2: "18", y2: "24" } },
    grip: { tag: "rect", attrs: { x: "18", y: "22", width: "4", height: "4" } },
  },
  seo: {
    ink: [
      {
        tag: "path",
        attrs: { d: "M24 22L29.5 13.5A6.5 6.5 0 1 0 18.5 13.5Z" },
      },
      {
        tag: "polyline",
        attrs: { points: "5 38.5 12.5 33 20 36 28 28 33.5 31 35 29.5" },
      },
      { tag: "line", attrs: { x1: "3", y1: "44", x2: "45", y2: "44" } },
      { tag: "circle", attrs: { cx: "24", cy: "10", r: "2.5" } },
    ],
    line: {
      tag: "line",
      attrs: { x1: "35", y1: "29.5", x2: "38", y2: "26.5" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "38", y: "22.5", width: "4", height: "4" },
    },
  },
  analitika: {
    ink: [
      { tag: "rect", attrs: { x: "5", y: "5", width: "38", height: "38" } },
      { tag: "rect", attrs: { x: "9.5", y: "29.5", width: "4", height: "8" } },
      {
        tag: "rect",
        attrs: { x: "16.5", y: "23", width: "4", height: "14.5" },
      },
      {
        tag: "rect",
        attrs: { x: "23.5", y: "16.5", width: "4", height: "21" },
      },
      { tag: "polyline", attrs: { points: "10.5 12.5 13 15 17.5 10.5" } },
    ],
    line: {
      tag: "line",
      attrs: { x1: "29", y1: "16.5", x2: "33.5", y2: "16.5" },
    },
    grip: {
      tag: "rect",
      attrs: { x: "33.5", y: "14.5", width: "4", height: "4" },
    },
  },
};
