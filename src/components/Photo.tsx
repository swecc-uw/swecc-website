import React from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { photoMarker, revealMarker } from "./markers.stylex";
import { colors, easings, media, radii } from "./tokens.stylex";

type PhotoProps = {
  src: string;
  alt: string;
  /** Position in its band's reveal sequence; see `reveal.order`. */
  revealOrder?: number;
  /** Styles for the frame, e.g. grid placement. */
  style?: StyleXStyles;
  imageStyle?: StyleXStyles;
};

/**
 * A rounded, lazily loaded photo that zooms on hover. Inside a reveal scope
 * it wipes up into view on its own; elsewhere it renders as-is.
 */
export function Photo({
  src,
  alt,
  revealOrder = 0,
  style,
  imageStyle,
}: PhotoProps) {
  return (
    <figure
      {...stylex.props(
        styles.frame,
        styles.revealDelay(revealOrder),
        photoMarker,
        style,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...stylex.props(styles.image, imageStyle)}
      />
    </figure>
  );
}

const styles = stylex.create({
  frame: {
    position: "relative",
    margin: 0,
    overflow: "hidden",
    borderRadius: radii.photo,
    backgroundColor: colors.background,
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: "inset 0 0 0 1px rgb(250 250 250 / 0.08)",
      pointerEvents: "none",
    },
    clipPath: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]:
          `inset(0 round ${radii.photo})`,
        [stylex.when.ancestor('[data-reveal="pending"]', revealMarker)]:
          `inset(100% 0 0 0 round ${radii.photo})`,
      },
    },
    transition: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor("[data-reveal]", revealMarker)]:
          `clip-path 1000ms ${easings.out}`,
      },
    },
  },
  // Photos wipe in more slowly than text, so their steps are spaced wider.
  revealDelay: (order: number) => ({
    transitionDelay: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor("[data-reveal]", revealMarker)]:
          `${order * 100}ms`,
      },
    },
  }),
  image: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: {
      default: null,
      [media.hoverFine]: `transform 700ms ${easings.out}`,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor("[data-reveal]", revealMarker)]:
          `transform 1000ms ${easings.out}`,
      },
    },
    transform: {
      default: null,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover", photoMarker)]: "scale(1.04)",
      },
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="pending"]', revealMarker)]:
          "scale(1.12)",
      },
    },
  },
});
