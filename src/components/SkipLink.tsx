import React from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, radii } from "./tokens.stylex";

/** Hidden until focused; jumps keyboard users past the navigation. */
export function SkipLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <a href={href} {...stylex.props(styles.link)}>
      {children}
    </a>
  );
}

const styles = stylex.create({
  link: {
    position: "fixed",
    top: "0.75rem",
    left: "0.75rem",
    zIndex: 1200,
    padding: "0.75rem 1rem",
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    fontWeight: 700,
    transform: { default: "translateY(-200%)", ":focus-visible": "none" },
  },
});
