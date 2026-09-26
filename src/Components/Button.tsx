import React, { type MouseEventHandler, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "../CSS/Button.css";

type ButtonTarget =
  | { to: string; href?: never; target?: never; rel?: never }
  | { href: string; to?: never; target?: string; rel?: string }
  | { to?: never; href?: never; target?: never; rel?: never };

export type ButtonProps = ButtonTarget & {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  href,
  ...props
}: ButtonProps) {
  const classes = [
    "swecc-button",
    `swecc-button--${variant}`,
    `swecc-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
