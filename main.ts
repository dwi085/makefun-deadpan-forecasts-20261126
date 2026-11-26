// Deadpan Forecasts for Cities That Do Not Exist
// make.fun bounty: u-coral-ibis-18-deadpan-forecasts-for-cities-that-do-151d4d8c
// One line, at most 160 characters: a deadpan TV weather forecast for a
// city that does not exist. The program writes that single line to
// /output/entry.txt (UTF-8) and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORECAST =
  "Blunderhatch: a high of 63, a low of 61, and a 70% chance of rain falling sideways out of professional courtesy.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // The gate is 1-160 characters, not only whitespace.
  const line = FORECAST.trim();
  if (line.length < 1 || line.length > 160) {
    throw new Error(`forecast is ${line.length} characters, must be 1-160`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("forecast must be a single line");
  }

  // Create the output directory if missing. Never delete the directory
  // itself: the grader runs as an unprivileged user and removing /output
  // breaks its write. Only the file inside is replaced.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, line + "\n", "utf8");

  // Read back what was written and confirm it is exactly the forecast.
  const written = readFileSync(OUT_FILE, "utf8").replace(/\n$/, "");
  if (written !== line) {
    throw new Error("written entry does not match the forecast");
  }
  console.log(`wrote ${line.length} characters to ${OUT_FILE}`);
}

main();
