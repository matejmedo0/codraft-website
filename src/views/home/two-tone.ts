/**
 * Splits a title before its last word, so the word can take the accent
 * (M36). A one-word title is all head and no accent.
 */
export function twoTone(title: string): [head: string, accent: string] {
  const at = title.trimEnd().lastIndexOf(" ");
  return at === -1
    ? [title, ""]
    : [title.slice(0, at + 1), title.slice(at + 1)];
}
