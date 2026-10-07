import React, { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { Heading, Text } from "./Typography";
import { colors, fonts, media } from "./tokens.stylex";

type StyleProp = { style?: StyleXStyles };

/** A terminal-style path above a section title, e.g. `~/programs`. */
export function Eyebrow({ path, style }: StyleProp & { path: string }) {
  return (
    <Text style={[styles.eyebrow, style]}>
      <span aria-hidden {...stylex.props(styles.eyebrowPrefix)}>
        ~/
      </span>
      {path}
    </Text>
  );
}

type DisplayTitleProps = StyleProp & { id?: string; children: ReactNode };

/** The large section title; wrap a phrase in `Accent` to color it. */
export function DisplayTitle({ id, children, style }: DisplayTitleProps) {
  return (
    <Heading level={2} id={id} style={[styles.title, style]}>
      {children}
    </Heading>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <em {...stylex.props(styles.accent)}>{children}</em>;
}

/** Introductory copy under a `DisplayTitle`. */
export function Lede({ children, style }: StyleProp & { children: ReactNode }) {
  return <Text style={[styles.lede, style]}>{children}</Text>;
}

const styles = stylex.create({
  eyebrow: {
    margin: "0 0 1.25rem",
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    letterSpacing: "0.02em",
    color: colors.accent,
  },
  eyebrowPrefix: {
    color: colors.textMuted,
  },
  title: {
    margin: "0 0 1.5rem",
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 4.25rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
    color: colors.text,
    textWrap: "balance",
  },
  accent: {
    fontStyle: "normal",
    color: colors.primary,
  },
  lede: {
    maxWidth: { default: "34rem", [media.max1100]: "40rem" },
    margin: 0,
    fontSize: "clamp(1.0625rem, 0.95rem + 0.35vw, 1.25rem)",
    lineHeight: 1.6,
    color: colors.textMuted,
    textWrap: "pretty",
  },
});
