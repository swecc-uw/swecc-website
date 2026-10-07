import * as stylex from "@stylexjs/stylex";

// Markers let a child style react to its ancestor's state through
// `stylex.when.ancestor(selector, marker)`. Each relationship gets its own
// marker so nested components never react to the wrong ancestor.

/** Put on a scroll-revealed section; `Reveal` styles key off its state. */
export const revealMarker = stylex.defineMarker();

/** Put on every `Button`; `ButtonIcon` animates when it is hovered. */
export const buttonMarker = stylex.defineMarker();

/** Put on `Photo` figures; the image zooms when its frame is hovered. */
export const photoMarker = stylex.defineMarker();
