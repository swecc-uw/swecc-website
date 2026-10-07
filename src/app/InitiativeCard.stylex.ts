import * as stylex from "@stylexjs/stylex";
import { colors } from "../components/tokens.stylex";

// The card's frame, prompt, and caret color; themed per card.
export const cardVars = stylex.defineVars({
  accent: colors.primary,
});
