import React, { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors, fonts, radii } from "./tokens.stylex";

type PillProps = {
  as?: "span" | "li";
  children: ReactNode;
  style?: StyleXStyles;
};

/** A rounded mono-type tag. */
export function Pill({ as: Tag = "span", children, style }: PillProps) {
  return <Tag {...stylex.props(styles.pill, style)}>{children}</Tag>;
}

const styles = stylex.create({
  pill: {
    padding: "0.45rem 0.85rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(250 250 250 / 0.14)",
    borderRadius: radii.pill,
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    color: colors.text,
  },
});
