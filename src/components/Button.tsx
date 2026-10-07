import React, {
  createContext,
  useContext,
  type ComponentType,
  type MouseEventHandler,
  type ReactNode,
  type SVGAttributes,
} from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { buttonMarker } from "./markers.stylex";
import { colors, fonts, media, radii } from "./tokens.stylex";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonTarget =
  | { to: string; href?: never; target?: never; rel?: never }
  | { href: string; to?: never; target?: string; rel?: string }
  | { to?: never; href?: never; target?: never; rel?: never };

export type ButtonProps = ButtonTarget & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleXStyles;
  onClick?: MouseEventHandler<HTMLElement>;
};

const ButtonContext = createContext<{
  variant: ButtonVariant;
  size: ButtonSize;
}>({ variant: "primary", size: "md" });

/** Renders a router `Link` for `to`, an `<a>` for `href`, else a `<button>`. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  style,
  to,
  href,
  ...props
}: ButtonProps) {
  const sx = stylex.props(
    styles.base,
    sizes[size],
    variants[variant],
    size === "lg" && variant === "primary" && styles.primaryLarge,
    size === "lg" && variant === "ghost" && styles.ghostLarge,
    buttonMarker,
    style,
  );
  const content = (
    <ButtonContext.Provider value={{ variant, size }}>
      {children}
    </ButtonContext.Provider>
  );

  if (to) {
    return (
      <Link to={to} {...props} {...sx}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...props} {...sx}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" {...props} {...sx}>
      {content}
    </button>
  );
}

type IconProps = SVGAttributes<SVGElement> & {
  className?: string;
  style?: React.CSSProperties;
};

type ButtonIconProps = {
  icon: ComponentType<IconProps>;
  /** Slides the icon down when a ghost button is hovered. */
  nudge?: boolean;
  style?: StyleXStyles;
};

/** An icon sized and animated for the `Button` it sits in. */
export function ButtonIcon({
  icon: Icon,
  nudge = false,
  style,
}: ButtonIconProps) {
  const { variant, size } = useContext(ButtonContext);
  return (
    <Icon
      aria-hidden
      {...stylex.props(
        size === "lg" && styles.largeIcon,
        nudge && styles.nudge,
        nudge && variant === "ghost" && styles.ghostNudge,
        style,
      )}
    />
  );
}

const styles = stylex.create({
  base: {
    fontFamily: fonts.sans,
    fontSize: "clamp(0.875rem, 0.6vw + 0.7rem, 1rem)",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0,
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxSizing: "border-box",
    padding: 0,
    opacity: { default: null, ":hover": 0.85 },
    transition: "opacity 0.2s ease, filter 0.2s ease",
  },
  primaryLarge: {
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 20px -12px rgba(126, 162, 102, 0.5)",
    filter: { default: null, ":hover": "brightness(1.07)" },
    transform: {
      default: null,
      ":hover": "translateY(-1px)",
      ":active": { default: "scale(0.98)", ":hover": "translateY(-1px)" },
    },
  },
  ghostLarge: {
    padding: "0 0.75rem",
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(250, 250, 250, 0.06)",
    },
  },
  largeIcon: {
    width: "1.2em",
    height: "1.2em",
    flex: "none",
  },
  nudge: {
    transition: {
      default: "transform 160ms ease",
      [media.reducedMotion]: "none",
    },
  },
  ghostNudge: {
    transform: {
      default: null,
      [stylex.when.ancestor(":hover", buttonMarker)]: "translateY(2px)",
    },
  },
});

const sizes = stylex.create({
  sm: {
    width: "8.75rem",
    height: "1.75rem",
    borderRadius: radii.sm,
    fontSize: "0.875rem",
  },
  md: {
    width: "clamp(10rem, 14vw, 12.5rem)",
    height: "clamp(2.5rem, 3.5vw, 3.125rem)",
    borderRadius: radii.sm,
  },
  lg: {
    gap: "0.6rem",
    height: "3.25rem",
    padding: "0 1.5rem",
    borderRadius: radii.md,
    fontFamily: fonts.hero,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "-0.005em",
    opacity: { default: null, ":hover": 1 },
    transform: { default: null, ":active": "scale(0.98)" },
    transition: {
      default:
        "transform 160ms ease, background-color 160ms ease, filter 160ms ease, box-shadow 160ms ease",
      [media.reducedMotion]: "none",
    },
  },
});

const variants = stylex.create({
  primary: {
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    borderColor: colors.primary,
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.primary,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.text,
  },
});
