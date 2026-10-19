/**
 * The data the specimen shows (Specimen.astro). Plain TypeScript, so .ts
 * files can share specimen data: a .ts file can't see the types of an
 * imported .astro file.
 */

export interface Swatch {
  name: string;
  hex: string;
  use: string;
}

export interface TextPair {
  label: string;
  fg: string;
  bg: string;
  /** Large text only (24 px, or 18.66 px bold): AA needs 3:1. */
  large?: boolean;
}
