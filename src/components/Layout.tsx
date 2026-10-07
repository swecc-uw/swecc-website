import React, { type ComponentPropsWithRef } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { revealMarker } from "./markers.stylex";
import type { RevealScope } from "./Reveal";
import { colors, layout } from "./tokens.stylex";

type BandProps = Omit<
  ComponentPropsWithRef<"section">,
  "className" | "style"
> & {
  tone: "black" | "grey";
  /** Reveals `reveal.item` children when the band scrolls into view. */
  reveal?: RevealScope;
  style?: StyleXStyles;
};

/** A full-bleed page section with a background tone. */
export function Band({ tone, reveal, style, ...props }: BandProps) {
  return (
    <section
      {...props}
      {...reveal}
      {...stylex.props(tones[tone], reveal && revealMarker, style)}
    />
  );
}

type ContainerProps = Omit<
  ComponentPropsWithRef<"div">,
  "className" | "style"
> & {
  as?: "div" | "section" | "header";
  /** Adds the responsive page gutter as horizontal padding. */
  gutter?: boolean;
  style?: StyleXStyles;
};

/** Centers content at the site's maximum width. */
export function Container({
  as: Tag = "div",
  gutter = false,
  style,
  ...props
}: ContainerProps) {
  return (
    <Tag
      {...props}
      {...stylex.props(styles.container, gutter && styles.gutter, style)}
    />
  );
}

const tones = stylex.create({
  black: { backgroundColor: colors.background },
  grey: { backgroundColor: colors.surface },
});

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    maxWidth: layout.contentMax,
    margin: "0 auto",
  },
  gutter: {
    paddingInline: layout.gutter,
  },
});
