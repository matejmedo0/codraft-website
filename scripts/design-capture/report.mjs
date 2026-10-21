/**
 * Turns a capture's measurements into findings and writes its index.md:
 * what each file shows, and what the numbers say. The critic reads the
 * index first, then the screenshots (.claude/agents/design-critic.md).
 */

/** How many entries of each finding the index lists. */
const LIST_LIMIT = 15;

/**
 * A block of text as measure.mjs reports it (the fields used here).
 *
 * @typedef {object} TextBlock
 * @property {string} zone The part of the sheet it is in.
 * @property {string} tag
 * @property {number} fontSize In px.
 * @property {boolean} large Large text in WCAG's sense.
 * @property {number} contrast Against the colour behind it.
 * @property {boolean} onPattern Whether a background image lies behind it.
 * @property {number | null} charsPerLine The measure, for three lines or more.
 * @property {number} lineCount
 * @property {string[]} lines The words on each line, as rendered.
 */

/**
 * A control as measure.mjs reports it.
 *
 * @typedef {object} Target
 * @property {string} zone
 * @property {string} name
 * @property {number} width In px.
 * @property {number} height In px.
 * @property {boolean} inline A link inside a sentence.
 */

/**
 * What the measurements flag for a critic to look at. These are leads, not
 * verdicts: a short measure can be right in a narrow column, and a small
 * control passes WCAG 2.5.8 when it has enough space around it.
 *
 * @param {{ textBlocks: TextBlock[], targets: Target[] }} metrics
 * @returns {Record<string, (TextBlock | Target)[]>}
 */
export function findingsOf(metrics) {
  const blocks = metrics.textBlocks;
  return {
    "Measure over 80 characters (body text)": blocks.filter(
      (b) => b.charsPerLine !== null && b.charsPerLine > 80 && !b.large,
    ),
    "Measure under 35 characters (paragraphs)": blocks.filter(
      (b) => b.charsPerLine !== null && b.charsPerLine < 35 && b.tag === "p",
    ),
    "One word alone on the last line": blocks.filter(
      (b) => b.lineCount >= 2 && b.lines.at(-1)?.split(" ").length === 1,
    ),
    "One-letter word at the end of a line": blocks.filter((b) =>
      b.lines.slice(0, -1).some((line) => /(?:^|\s)\p{L}$/u.test(line)),
    ),
    "Contrast under AA (approximate on a pattern)": blocks.filter(
      (b) => b.contrast < (b.large ? 3 : 4.5),
    ),
    "Controls under 24 × 24 px, not inline (pass if spaced, WCAG 2.5.8)":
      metrics.targets.filter(
        (t) => !t.inline && (t.width < 24 || t.height < 24),
      ),
  };
}

/**
 * One line for the index: a text block with its lines, or a control.
 *
 * @param {TextBlock | Target} entry
 * @returns {string}
 */
export function describeEntry(entry) {
  if ("lines" in entry) {
    const lines =
      entry.lines.length > 3
        ? [...entry.lines.slice(0, 2), "…", entry.lines.at(-1) ?? ""]
        : entry.lines;
    const measure =
      entry.charsPerLine === null
        ? ""
        : ` | ${String(entry.charsPerLine)} ch/line`;
    const pattern = entry.onPattern ? " (on a pattern)" : "";
    return `${entry.zone} | ${entry.tag} ${String(entry.fontSize)} px${measure} | contrast ${String(entry.contrast)}${pattern} | lines: ${lines.map((line) => `"${line}"`).join(" / ")}`;
  }
  return `${entry.zone} | "${entry.name}" | ${String(entry.width)} × ${String(entry.height)} px`;
}

/**
 * The capture's index.md.
 *
 * @param {object} capture
 * @param {string} capture.base The site's address.
 * @param {string} capture.commit The commit, and whether the tree was dirty.
 * @param {string[]} capture.pages
 * @param {{ width: number, height: number }[]} capture.viewports
 * @param {number[]} capture.motionWidths
 * @param {{ report: any }[]} capture.summaries One per page and width.
 * @param {{ page: string, width: number, kind: string, file: string, note: string }[]} capture.files
 * @returns {string}
 */
export function indexMarkdown(capture) {
  const lines = [
    "# Design capture",
    "",
    `- **Site:** ${capture.base} (${capture.commit})`,
    `- **Taken:** ${new Date().toISOString()}`,
    `- **Pages:** ${capture.pages.join(", ")}`,
    `- **Viewports:** ${capture.viewports.map((v) => `${String(v.width)} × ${String(v.height)}`).join(", ")}; motion at ${capture.motionWidths.length > 0 ? capture.motionWidths.join(", ") : "none"}`,
    "",
    "**How it was taken**",
    "- Screens, whole pages, parts and states: reduced motion, so every part shows its final state. The lab's bar and the dev toolbar are removed.",
    "- Motion: no reduced motion. `entrance-*` holds every animation at one moment; `scroll-*` is real time, so its times are approximate.",
    "- `metrics.json`, one per width: the words on every line of every text block, type, colour, contrast against the colour behind, line length, control sizes, the parts of the sheet, axe and console errors.",
    "- Limits: text inside SVG is not measured; contrast ignores pseudo-element backgrounds and ancestors' opacity, and is approximate on a pattern such as graph paper; a sticky header shows on every screen.",
    "",
  ];

  for (const page of capture.pages) {
    const reports = capture.summaries
      .map((summary) => summary.report)
      .filter((report) => report.page === page);
    lines.push(`## ${page}`, "");
    lines.push(
      "| Width | Page height | Overflow | axe | Console errors |",
      "|---|---|---|---|---|",
    );
    for (const report of reports) {
      const axe =
        report.axe.length > 0
          ? report.axe
              .map((v) => `${String(v.id)} (${String(v.impact)})`)
              .join(", ")
          : "none";
      lines.push(
        `| ${String(report.width)} | ${String(report.documentHeight)} px | ${String(report.overflowX)} px | ${axe} | ${String(report.consoleErrors.length)} |`,
      );
    }
    lines.push("");

    for (const report of reports) {
      lines.push(`### ${String(report.width)} px: measurements`, "");
      const sizes = new Map();
      for (const block of report.textBlocks) {
        const key = `${String(block.fontSize)}/${String(block.lineHeight ?? "normal")}`;
        sizes.set(key, (sizes.get(key) ?? 0) + 1);
      }
      const sizeList = [...sizes]
        .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
        .map(([key, count]) => `${key}: ${String(count)}`)
        .join(", ");
      lines.push(
        `- **Type in use** (px size/line height: blocks): ${sizeList}`,
      );
      lines.push(
        `- **Parts:** ${report.zones.map((z) => `${String(z.label)} (${String(z.height)} px)`).join("; ")}`,
      );
      for (const [title, entries] of Object.entries(findingsOf(report))) {
        lines.push(
          `- **${title}:** ${entries.length > 0 ? String(entries.length) : "none"}`,
        );
        for (const entry of entries.slice(0, LIST_LIMIT)) {
          lines.push(`  - ${describeEntry(entry)}`);
        }
        if (entries.length > LIST_LIMIT) {
          lines.push(
            `  - … ${String(entries.length - LIST_LIMIT)} more in metrics.json`,
          );
        }
      }
      lines.push("");
    }

    lines.push(`### ${page}: files`, "");
    const ofPage = capture.files.filter((file) => file.page === page);
    for (const width of new Set(ofPage.map((file) => file.width))) {
      lines.push(`**${String(width)} px**`, "");
      for (const file of ofPage.filter((f) => f.width === width)) {
        lines.push(`- \`${file.file}\` (${file.kind}): ${file.note}`);
      }
      lines.push("");
    }
  }
  return `${lines.join("\n")}\n`;
}
