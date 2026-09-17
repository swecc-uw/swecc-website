import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../CSS/Button.css";

function Button({
  children,
  variant = "primary",
  size = "md",
  as,
  to,
  href,
  className = "",
  type = "button",
  ...props
}) {
  const classes = [
    "swecc-button",
    `swecc-button--${variant}`,
    `swecc-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    const Component = as === "NavLink" ? NavLink : Link;
    return (
      <Component to={to} className={classes} {...props}>
        {children}
      </Component>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Component = as || "button";
  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
