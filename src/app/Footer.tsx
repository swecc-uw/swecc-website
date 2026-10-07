import React, { useState } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import SWECCWordmark from "../Data/img/Logo/SWECCWordmarkWhite.webp";
import { Container, Heading, Text } from "../components";
import { colors, fonts, layout, media } from "../components/tokens.stylex";
import { communityLinks, externalLinkProps, siteLinks } from "./Utils";

function Footer() {
  const [year] = useState(() => new Date().getFullYear());
  return (
    <footer {...stylex.props(styles.footer)}>
      <Container style={styles.inner}>
        <div {...stylex.props(styles.grid)}>
          <div>
            <img
              src={SWECCWordmark}
              alt="SWECC"
              {...stylex.props(styles.logo)}
            />
            <Text style={styles.about}>
              Software Engineering Career Club at the University of Washington.
            </Text>
          </div>

          <nav aria-label="Footer" {...stylex.props(styles.nav)}>
            <div>
              <Heading level={2} style={styles.heading}>
                Site
              </Heading>
              <ul {...stylex.props(styles.list)}>
                {siteLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} {...stylex.props(styles.link)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Heading level={2} style={styles.heading}>
                Community
              </Heading>
              <ul {...stylex.props(styles.list)}>
                {communityLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...externalLinkProps(href)}
                      {...stylex.props(styles.link)}
                    >
                      <Icon aria-hidden="true" {...stylex.props(styles.icon)} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div {...stylex.props(styles.bottom)}>
          <Text style={styles.prompt}>
            swecc@uw:~<span {...stylex.props(styles.sigil)}>$</span>
            <span aria-hidden="true" {...stylex.props(styles.cursor)} />
          </Text>
          <Text style={styles.legal}>
            <span suppressHydrationWarning>© {year} UW SWECC</span>
            <a
              href="https://webimpactuw.org/"
              {...externalLinkProps("https://webimpactuw.org/")}
              {...stylex.props(styles.link, styles.legalLink)}
            >
              Built with Web Impact
            </a>
          </Text>
        </div>
      </Container>
    </footer>
  );
}

const blink = stylex.keyframes({
  "50%": { opacity: 0 },
});

const styles = stylex.create({
  footer: {
    backgroundColor: colors.background,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.border,
    fontFamily: fonts.sans,
  },
  inner: {
    padding: `3.5rem ${layout.gutter} 2rem`,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 2fr) 2fr",
      [media.max720]: "minmax(0, 1fr)",
    },
    gap: "2.5rem",
  },
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2.5rem",
  },
  logo: {
    display: "block",
    margin: 0,
    height: "1.75rem",
    width: "auto",
  },
  about: {
    maxWidth: "22rem",
    margin: "1rem 0 0",
    fontSize: "0.9375rem",
    color: colors.textSubtle,
  },
  heading: {
    margin: "0 0 1rem",
    fontFamily: fonts.sans,
    fontSize: "0.8125rem",
    fontWeight: 600,
    lineHeight: 1.5,
    color: colors.text,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    minHeight: "1.75rem",
    fontSize: "0.9375rem",
    color: { default: colors.textSubtle, ":hover": colors.text },
    textDecoration: "none",
    opacity: { default: null, ":hover": 1 },
    transition: "color 150ms",
  },
  legalLink: {
    fontSize: "inherit",
  },
  icon: {
    width: "1rem",
    height: "1rem",
    flex: "none",
  },
  bottom: {
    display: "flex",
    flexDirection: { default: null, [media.max720]: "column" },
    alignItems: { default: "center", [media.max720]: "flex-start" },
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "3rem",
    paddingTop: "1.5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.border,
  },
  prompt: {
    display: "flex",
    alignItems: "center",
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    color: colors.textSubtle,
  },
  sigil: {
    marginRight: "0.5ch",
    fontFamily: "inherit",
    color: colors.primary,
  },
  cursor: {
    width: "0.6em",
    height: "1.15em",
    backgroundColor: colors.primary,
    animationName: { default: blink, [media.reducedMotion]: "none" },
    animationDuration: "1.1s",
    animationTimingFunction: "steps(1)",
    animationIterationCount: "infinite",
  },
  legal: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    margin: 0,
    fontSize: "0.875rem",
    color: colors.textSubtle,
  },
});

export default Footer;
