// Worst App Idea Ever Pitched — entry program (program/v1, Node 22, no deps).
// Writes exactly one sentence to <MAKEFUN_OUTPUT_DIR>/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ChairCheck is a subscription app that sends a push notification every morning confirming your chair is still a chair, so homeowners can start the day certain their furniture has not secretly become a table overnight.";

function validate(sentence: string): void {
  const trimmed = sentence.trim();
  if (trimmed.length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  // File content is the sentence plus one trailing newline; the gate is 1-240 chars total.
  const content = sentence + "\n";
  if (content.length > 240) {
    throw new Error(`Entry file would be ${content.length} chars, over the 240-char gate.`);
  }
  if (sentence.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
  // Exactly one sentence: exactly one sentence-ending mark, at the very end.
  const terminators = (sentence.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !sentence.endsWith(".")) {
    throw new Error("Entry must be exactly one sentence ending with a period.");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
