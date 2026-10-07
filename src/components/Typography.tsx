import React, { type ComponentPropsWithoutRef } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors, fonts, fontSizes, lineHeights, media } from "./tokens.stylex";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

type HeadingProps = Omit<
  ComponentPropsWithoutRef<"h1">,
  "className" | "style"
> & {
  level: HeadingLevel;
  /** Visual size; defaults to the level so semantics and looks can differ. */
  size?: HeadingLevel;
  style?: StyleXStyles;
};

export function Heading({
  level,
  size = level,
  style,
  ...props
}: HeadingProps) {
  const Tag: HeadingTag = `h${level}`;
  return (
    <Tag
      {...props}
      {...stylex.props(styles.heading, headingSizes[`h${size}`], style)}
    />
  );
}

type TextProps = Omit<ComponentPropsWithoutRef<"p">, "className" | "style"> & {
  style?: StyleXStyles;
};

/** A paragraph with the body defaults. */
export function Text({ style, ...props }: TextProps) {
  return <p {...props} {...stylex.props(styles.text, style)} />;
}

/** Brand type treatments, composable onto any element via `stylex.props`. */
export const typeStyles = stylex.create({
  // Large Manrope display lines, as in the "Software Engineering" hero.
  hero: {
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: { default: "3.125rem", [media.max768]: "1.6875rem" },
    lineHeight: { default: "3.4375rem", [media.max768]: 1.15 },
    letterSpacing: "-0.03em",
    color: colors.text,
  },
  heroAccent: {
    color: colors.primary,
  },
  // Accent-colored headings used across page heroes.
  display: {
    fontFamily: fonts.sans,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: "0.01em",
  },
  mono: {
    fontFamily: fonts.mono,
  },
});

const styles = stylex.create({
  heading: {
    margin: "0 0 0.4em",
    fontWeight: 700,
    lineHeight: lineHeights.heading,
    color: colors.text,
  },
  text: {
    margin: "0 0 1em",
    fontSize: fontSizes.body,
    fontWeight: 400,
    lineHeight: lineHeights.body,
    color: colors.text,
  },
});

const headingSizes = stylex.create({
  h1: { fontSize: fontSizes.h1 },
  h2: { fontSize: fontSizes.h2 },
  h3: { fontSize: fontSizes.h3 },
  h4: { fontSize: fontSizes.h4 },
  h5: { fontSize: fontSizes.h5 },
  h6: { fontSize: fontSizes.h6 },
});
