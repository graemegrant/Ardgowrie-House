/**
 * check-contrast.mjs
 * Guards the WCAG AA contrast of the brand token pairs that are actually
 * used as text/UI-element colour against a background colour elsewhere in
 * the codebase (see lib/tokens.ts, tailwind.config.ts, AGENTS.md §3).
 *
 * Re-skinning a client build means editing the seven hex values in
 * lib/tokens.ts — nothing else. This script re-checks those pairs against
 * whatever values are currently set, so a re-skin that picks a pretty but
 * too-light/too-dark accent fails CI instead of shipping a silent AA
 * regression (this is exactly how `gold` on `parchment` drifted to 3.15:1
 * — see the history of this file / lib/tokens.ts).
 *
 * Run: node scripts/check-contrast.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(__dirname, '..', 'lib', 'tokens.ts');
const src = readFileSync(tokensPath, 'utf8');

function readToken(name) {
  const match = src.match(new RegExp(`\\b${name}:\\s*'(#[0-9a-fA-F]{6})'`));
  if (!match) throw new Error(`check-contrast: couldn't find token "${name}" in lib/tokens.ts`);
  return match[1];
}

function relativeLuminance(hex) {
  const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA, hexB) {
  const lA = relativeLuminance(hexA);
  const lB = relativeLuminance(hexB);
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = {
  forest: readToken('forest'),
  forestdeep: readToken('forestdeep'),
  gold: readToken('gold'),
  goldbright: readToken('goldbright'),
  parchment: readToken('parchment'),
  warmgrey: readToken('warmgrey'),
  ink: readToken('ink'),
};

// [text/element token, background token, minimum ratio, where it's used]
const PAIRS = [
  ['gold', 'parchment', 4.5, 'text-gold / border-gold on light sections (SectionLabel, RoomCard, OfferCard, etc.)'],
  ['gold', 'warmgrey', 4.5, 'text-gold on bg-warmgrey sections (TeamCard, weddings settings, etc.)'],
  ['goldbright', 'forest', 4.5, 'text-goldbright / border-goldbright on bg-forest (Navbar, Footer, dark CTAs)'],
  ['ink', 'parchment', 4.5, 'body copy on the default light background'],
  ['ink', 'warmgrey', 4.5, 'body copy on alt/card bands'],
  ['parchment', 'forest', 4.5, 'body copy on dark sections (Footer, Navbar, dark CTAs)'],
];

let failed = false;
for (const [fg, bg, min, usage] of PAIRS) {
  const ratio = contrastRatio(tokens[fg], tokens[bg]);
  const pass = ratio >= min;
  if (!pass) failed = true;
  const line = `${pass ? 'PASS' : 'FAIL'}  ${fg} (${tokens[fg]}) on ${bg} (${tokens[bg]}): ${ratio.toFixed(2)}:1 (need ${min}:1) — ${usage}`;
  console.log(line);
}

if (failed) {
  console.error('\ncheck-contrast: one or more token pairs fail WCAG AA. Darken/lighten the offending token in lib/tokens.ts.');
  process.exit(1);
}
console.log('\ncheck-contrast: all token pairs pass WCAG AA.');
