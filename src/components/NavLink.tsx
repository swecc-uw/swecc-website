import React from "react";
import { NavLink as RouterNavLink, type NavLinkProps } from "react-router";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

type Props = Omit<NavLinkProps, "className" | "style"> & {
  style?: StyleXStyles;
  /** Added on top of `style` while the link matches the current route. */
  activeStyle?: StyleXStyles;
};

/** A router `NavLink` styled with StyleX, including while active. */
export function NavLink({ style, activeStyle, ...props }: Props) {
  // `stylex.props` returns a class name and, for dynamic styles, inline
  // custom properties; React Router takes them through separate callbacks.
  const sx = (isActive: boolean) =>
    stylex.props(style, isActive && activeStyle);
  return (
    <RouterNavLink
      {...props}
      className={({ isActive }) => sx(isActive).className}
      style={({ isActive }) => sx(isActive).style}
    />
  );
}
