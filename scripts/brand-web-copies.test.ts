import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  stripPngMetadata,
  stripSvgMetadata,
  WEB_COPIES,
  webCopyOf,
} from "./brand-web-copies.mjs";

const ROOT = new URL("../", import.meta.url);

function chunk(type: string, data: number[]): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  // The CRC isn't checked by the stripper, so any four bytes do.
  return Buffer.concat([
    length,
    Buffer.from(type, "latin1"),
    Buffer.from(data),
    Buffer.alloc(4),
  ]);
}

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe("stripSvgMetadata", () => {
  it("removes the metadata block and the c2pa namespace, nothing else", () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" xmlns:c2pa="http://c2pa.org/manifest"><metadata><c2pa:manifest>AAAA</c2pa:manifest></metadata>\n<g class="cd-ink"><path d="M0 0H1"/></g></svg>';

    expect(stripSvgMetadata(svg)).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">\n<g class="cd-ink"><path d="M0 0H1"/></g></svg>',
    );
  });
});

describe("stripPngMetadata", () => {
  it("keeps the image chunks and drops the C2PA and text chunks", () => {
    const ihdr = chunk("IHDR", [1, 2, 3]);
    const idat = chunk("IDAT", [4, 5]);
    const iend = chunk("IEND", []);
    const png = Buffer.concat([
      SIGNATURE,
      ihdr,
      chunk("caBX", [9, 9, 9, 9]),
      chunk("tEXt", [7]),
      idat,
      iend,
    ]);

    expect(stripPngMetadata(png)).toEqual(
      Buffer.concat([SIGNATURE, ihdr, idat, iend]),
    );
  });

  it("rejects a file that isn't a PNG", () => {
    expect(() => stripPngMetadata(Buffer.from("GIF89a"))).toThrow();
  });
});

describe("the web copies in the repository", () => {
  it.each(WEB_COPIES)(
    "$copy is the master $master without metadata",
    async ({ master, copy }) => {
      const masterBytes = await readFile(
        new URL(`Assets/codraft-brand/${master}`, ROOT),
      );
      const copyBytes = await readFile(new URL(copy, ROOT));

      expect(copyBytes.equals(webCopyOf(master, masterBytes))).toBe(true);
      expect(copyBytes.includes("c2pa")).toBe(false);
      expect(copyBytes.includes("caBX")).toBe(false);
    },
  );
});
