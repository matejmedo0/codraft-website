/* global document, window, getComputedStyle, NodeFilter */
/**
 * Functions that run inside the captured page (page.evaluate), so each one
 * is self-contained: nothing from this module's scope is available there.
 */

/**
 * Measures every block of visible text (the words on each of its lines,
 * type, colour and contrast against what is behind it), every control's
 * size, and the parts of the sheet (header, zones, title block).
 *
 * @param {string} notTheSite Selector of elements that are not part of the
 *   site, such as the lab's bar; they are left out.
 */
export function measurePage(notTheSite) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const pen = canvas.getContext("2d", { willReadFrequently: true });

  // Any CSS colour painted over another, read back as sRGB hex.
  const paint = (color, under) => {
    pen.clearRect(0, 0, 1, 1);
    pen.fillStyle = under;
    pen.fillRect(0, 0, 1, 1);
    pen.fillStyle = color;
    pen.fillRect(0, 0, 1, 1);
    const [r, g, b] = pen.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  };
  const isOpaque = (color) =>
    paint(color, "#ffffff") === paint(color, "#000000");
  const luminance = (hex) => {
    const channel = (at) => {
      const s = parseInt(hex.slice(at, at + 2), 16) / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
  };
  const contrast = (a, b) => {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return Math.round(((high + 0.05) / (low + 0.05)) * 100) / 100;
  };

  // The colour behind an element: its own and its ancestors' backgrounds,
  // down to the first opaque one. A background image on the way (graph
  // paper) makes the contrast approximate.
  const backgroundOf = (element) => {
    const layers = [];
    let pattern = false;
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== "none") pattern = true;
      const color = style.backgroundColor;
      if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
        layers.push(color);
        if (isOpaque(color)) break;
      }
    }
    let result = "#ffffff";
    for (const layer of layers.reverse()) result = paint(layer, result);
    return { color: result, pattern };
  };

  const skipped = (element) =>
    element.closest(`${notTheSite}, svg, script, style, noscript, template`);
  const visible = (element) =>
    element.checkVisibility({
      checkVisibilityCSS: true,
      visibilityProperty: true,
    });
  // Visually hidden (clipped to 1 px) or moved off the page, like the skip
  // link until it has focus.
  const hidden = (rect) =>
    rect.width <= 1 ||
    rect.height <= 1 ||
    rect.bottom + window.scrollY <= 0 ||
    rect.right <= 0 ||
    rect.left >= window.innerWidth;
  const blockOf = (node) => {
    for (
      let element = node.parentElement;
      element;
      element = element.parentElement
    ) {
      const display = getComputedStyle(element).display;
      if (display !== "inline" && display !== "contents") return element;
    }
    return document.body;
  };
  const clean = (text) => text.trim().replace(/\s+/g, " ");

  // The parts of the sheet: the header, each zone and the title block.
  const parts = [
    ...document.querySelectorAll("header, section.zone, footer"),
  ].filter(
    (element) =>
      !skipped(element) &&
      !element.parentElement?.closest("header, section.zone, footer"),
  );
  const labelOf = (part) => {
    if (!part) return "outside the sheet's parts";
    if (part.matches("footer")) return "Footer (title block)";
    if (part.matches("header")) return "Header";
    const id = part.getAttribute("aria-labelledby");
    const heading = id ? document.getElementById(id) : null;
    return clean(heading?.textContent ?? part.id ?? "Zone").slice(0, 60);
  };
  const partOf = (element) => parts.find((part) => part.contains(element));

  const zones = parts.map((part) => {
    const rect = part.getBoundingClientRect();
    const style = getComputedStyle(part);
    return {
      label: labelOf(part),
      top: Math.round(rect.top + window.scrollY),
      height: Math.round(rect.height),
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      surface: backgroundOf(part).color,
    };
  });

  // Text blocks: each text node belongs to its nearest non-inline ancestor.
  const blocks = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (
      !node.textContent.trim() ||
      !parent ||
      skipped(parent) ||
      !visible(parent)
    )
      continue;
    const block = blockOf(node);
    if (!blocks.has(block)) blocks.set(block, []);
    blocks.get(block).push(node);
  }

  const range = document.createRange();
  const textBlocks = [];
  for (const [block, nodes] of blocks) {
    const rect = block.getBoundingClientRect();
    if (hidden(rect)) continue;
    // Lines: each word goes with the top of its first box.
    const lines = [];
    let lastTop = null;
    for (const node of nodes) {
      const size = parseFloat(getComputedStyle(node.parentElement).fontSize);
      for (const match of node.textContent.matchAll(/\S+/g)) {
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const box = range.getClientRects()[0];
        if (!box) continue;
        if (lastTop === null || Math.abs(box.top - lastTop) > size * 0.5) {
          lines.push([]);
          lastTop = box.top;
        }
        lines.at(-1).push(match[0]);
      }
    }
    if (lines.length === 0) continue;
    const text = lines.map((words) => words.join(" "));
    const style = getComputedStyle(nodes[0].parentElement);
    const fontSize = parseFloat(style.fontSize);
    const weight = Number(style.fontWeight);
    const behind = backgroundOf(nodes[0].parentElement);
    const ink = paint(style.color, behind.color);
    const body = text.length >= 3 ? text.slice(0, -1) : [];
    textBlocks.push({
      zone: labelOf(partOf(block)),
      tag: block.tagName.toLowerCase(),
      class:
        typeof block.className === "string"
          ? block.className.split(/\s+/).slice(0, 2).join(" ")
          : "",
      text: text.join(" ").slice(0, 90),
      fontSize: Math.round(fontSize * 10) / 10,
      lineHeight:
        style.lineHeight === "normal"
          ? null
          : Math.round(parseFloat(style.lineHeight) * 10) / 10,
      weight,
      stretch: style.fontStretch,
      letterSpacing: style.letterSpacing,
      family: style.fontFamily.split(",")[0].replaceAll('"', ""),
      align: style.textAlign,
      color: ink,
      background: behind.color,
      onPattern: behind.pattern,
      contrast: contrast(ink, behind.color),
      large: fontSize >= 24 || (fontSize >= 18.66 && weight >= 700),
      left: Math.round(rect.left),
      top: Math.round(rect.top + window.scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      lineCount: text.length,
      // The measure: average characters per line, without the last line,
      // for blocks of three lines or more.
      charsPerLine:
        body.length > 0
          ? Math.round(
              body.reduce((sum, line) => sum + line.length, 0) / body.length,
            )
          : null,
      lines: text,
    });
  }

  // Controls and their size (WCAG 2.5.8: 24 × 24 px, or enough space).
  const targets = [];
  const selector =
    'a[href], button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';
  for (const element of document.querySelectorAll(selector)) {
    if (skipped(element) || !visible(element)) continue;
    const rect = element.getBoundingClientRect();
    if (hidden(rect)) continue;
    const ownText = clean(element.textContent ?? "");
    const blockText = clean(blockOf(element).textContent ?? "");
    targets.push({
      zone: labelOf(partOf(element)),
      name:
        clean(element.getAttribute("aria-label") ?? ownText).slice(0, 60) ||
        element.tagName.toLowerCase(),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      inline:
        getComputedStyle(element).display === "inline" &&
        blockText.length > ownText.length,
    });
  }

  return { zones, textBlocks, targets };
}

/**
 * Holds every animation on the page at `ms` from its start, so a frame of
 * the motion can be captured at an exact moment.
 *
 * @param {number} ms
 */
export function holdAt(ms) {
  for (const animation of document.getAnimations()) {
    animation.pause();
    animation.currentTime = ms;
  }
}
