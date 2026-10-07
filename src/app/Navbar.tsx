import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import * as stylex from "@stylexjs/stylex";
import SWECCWordmark from "../Data/img/Logo/SWECCWordmarkWhite.webp";
import { Container, NavLink } from "../components";
import {
  colors,
  fonts,
  layout,
  media,
  radii,
} from "../components/tokens.stylex";
import { communityLinks, externalLinkProps, links, siteLinks } from "./Utils";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const ToggleIcon = menuOpen ? FiX : FiMenu;

  return (
    <nav aria-label="Main" {...stylex.props(styles.nav)}>
      <Container gutter style={styles.inner}>
        <Link to="/" onClick={closeMenu} {...stylex.props(styles.brand)}>
          <img src={SWECCWordmark} alt="SWECC" {...stylex.props(styles.logo)} />
        </Link>

        <div {...stylex.props(styles.actions)}>
          <ul {...stylex.props(styles.links)}>
            {siteLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  style={styles.link}
                  activeStyle={styles.linkActive}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={links.social.discord}
            {...externalLinkProps(links.social.discord)}
            onClick={closeMenu}
            {...stylex.props(styles.cta)}
          >
            Join SWECC
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            {...stylex.props(styles.toggle)}
          >
            <ToggleIcon
              aria-hidden="true"
              {...stylex.props(styles.toggleIcon)}
            />
          </button>
        </div>
      </Container>

      <div
        id="site-nav-menu"
        hidden={!menuOpen}
        {...stylex.props(styles.menu, menuOpen && styles.menuOpen)}
      >
        <ul {...stylex.props(styles.menuLinks)}>
          {siteLinks.map(({ to, label }, i) => (
            <li key={to} {...stylex.props(i > 0 && styles.menuItemDivider)}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={closeMenu}
                style={styles.menuLink}
                activeStyle={styles.menuLinkActive}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul {...stylex.props(styles.social)}>
          {communityLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...externalLinkProps(href)}
                onClick={closeMenu}
                {...stylex.props(styles.socialLink)}
              >
                <Icon aria-hidden="true" {...stylex.props(styles.socialIcon)} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const menuIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(-0.5rem)" },
});

const styles = stylex.create({
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxSizing: "border-box",
    height: layout.navHeight,
    backgroundColor: "rgb(31 29 32 / 0.85)",
    backdropFilter: "blur(12px)",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
    fontFamily: fonts.sans,
  },
  inner: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    minHeight: "2.75rem",
    display: "flex",
    alignItems: "center",
    opacity: { default: null, ":hover": 1 },
  },
  logo: {
    display: "block",
    margin: 0,
    height: { default: "1.75rem", [media.max380]: "1.4rem" },
    width: "auto",
  },
  actions: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: {
      default: "2rem",
      [media.max720]: "0.75rem",
      [media.max380]: "0.5rem",
    },
  },
  links: {
    height: "100%",
    display: { default: "flex", [media.max720]: "none" },
    gap: "2rem",
  },
  link: {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: { default: colors.textSubtle, ":hover": colors.text },
    textDecoration: "none",
    opacity: { default: null, ":hover": 1 },
    transition: "color 150ms",
  },
  linkActive: {
    color: colors.text,
    "::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "-1px",
      height: "2px",
      backgroundColor: colors.primary,
    },
  },
  cta: {
    padding: { default: "0.5rem 1rem", [media.max720]: "0.375rem 0.75rem" },
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    fontSize: { default: "0.9375rem", [media.max720]: "0.875rem" },
    fontWeight: 600,
    lineHeight: 1.5,
    textDecoration: "none",
    whiteSpace: "nowrap",
    opacity: { default: null, ":hover": 1 },
    filter: { default: null, ":hover": "brightness(1.08)" },
    transition: "filter 150ms",
  },
  toggle: {
    display: { default: "none", [media.max720]: "flex" },
    width: "2.75rem",
    height: "2.75rem",
    marginRight: "-0.625rem",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "currentcolor",
    borderRadius: radii.sm,
    backgroundColor: "transparent",
    backgroundImage: "none",
    color: colors.text,
    cursor: "pointer",
  },
  toggleIcon: {
    width: "1.5rem",
    height: "1.5rem",
  },
  menu: {
    display: "none",
  },
  // The menu only exists below the desktop breakpoint.
  menuOpen: {
    display: { default: "none", [media.max720]: "block" },
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    padding: `0.5rem ${layout.gutter} 1rem`,
    backgroundColor: colors.background,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
    animationName: { default: menuIn, [media.reducedMotion]: "none" },
    animationDuration: "160ms",
    animationTimingFunction: "ease-out",
  },
  menuLinks: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
  },
  menuItemDivider: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
  menuLink: {
    position: "relative",
    display: "block",
    padding: "0.875rem 0",
    fontSize: "1.25rem",
    fontWeight: 500,
    color: { default: colors.textSubtle, ":hover": colors.text },
    textDecoration: "none",
    opacity: { default: null, ":hover": 1 },
  },
  menuLinkActive: {
    color: colors.text,
    paddingLeft: "0.875rem",
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "0.875rem",
      bottom: "0.875rem",
      width: "2px",
      backgroundColor: colors.primary,
    },
  },
  social: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0.5rem 0 0 -0.75rem",
  },
  socialLink: {
    width: "2.75rem",
    height: "2.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: { default: colors.textSubtle, ":hover": colors.text },
    opacity: { default: null, ":hover": 1 },
    transition: "color 150ms",
  },
  socialIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
});

export default Navbar;
