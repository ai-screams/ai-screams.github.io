/// <reference types="node" />
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/projects";

/**
 * Pixel size from a WebP header: VP8X (lossy with alpha) or VP8L (lossless,
 * used for pixel art). Anything else throws so a new format gets handled
 * deliberately.
 */
function webpSize(file: string): { height: number; width: number } {
  const b = readFileSync(file);
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return { height: 1 + b.readUIntLE(27, 3), width: 1 + b.readUIntLE(24, 3) };
  }
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { height: 1 + ((bits >> 14) & 0x3fff), width: 1 + (bits & 0x3fff) };
  }
  throw new Error(`${file}: unsupported WebP chunk ${chunk}`);
}

describe("project visuals", () => {
  const images = PROJECTS.flatMap((p) =>
    p.visual?.type === "image" ? [{ id: p.id, ...p.visual }] : [],
  );

  // width/height reserve layout space before the image loads (no CLS), so
  // they must match the file. Fails when an image is swapped without
  // updating projects.ts.
  it.each(images)("$id declares the real pixel size", (visual) => {
    expect(visual.src).toMatch(/\.webp$/);
    expect(webpSize(`public${visual.src}`)).toEqual({
      height: visual.height,
      width: visual.width,
    });
  });
});
