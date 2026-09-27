/**
 * Brand palette — single source of truth for colour.
 *
 * Both `tailwind.config.ts` (className tokens) and server-side image
 * generation (the `opengraph-image` route files, which can't use Tailwind
 * classes) read from here. Re-skinning for a new client means editing
 * the seven values below and nowhere else. See AGENTS.md section 3.
 *
 * `gold` is darkened from the original #A67C3D (3.15:1 on parchment — an
 * AA failure) to clear 4.5:1 against both `parchment` and `warmgrey`; it
 * must only be used for text/borders on those light backgrounds. Anything
 * on a dark (`forest`) background, or a solid fill paired with `forest`
 * text (buttons, badges), must use `goldbright` instead — a single hue
 * can't satisfy both a "darker than light bg" and a "lighter than dark
 * bg" contrast requirement at once. `scripts/check-contrast.mjs` (run in
 * CI, see guardrails.yml) enforces the light-background pairs so this
 * can't silently regress.
 */
export const palette = {
  forest: '#2B2119', // peat — primary dark
  forestdeep: '#1B1510', // deepest peat — footers, gradients
  gold: '#785828', // aged brass, darkened for AA — text/borders on light backgrounds ONLY
  goldbright: '#E8C083', // bright brass — accents on dark backgrounds, and any solid fill paired with forest text
  parchment: '#EFEAE1', // stone — primary light
  warmgrey: '#E3DCCF', // deep stone — alt bands, cards
  ink: '#241D16', // text
} as const;

export type PaletteToken = keyof typeof palette;
