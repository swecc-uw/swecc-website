import React, { useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { FaDiscord } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import {
  Accent,
  Band,
  Button,
  ButtonIcon,
  Container,
  DisplayTitle,
  Eyebrow,
  Heading,
  TerminalWindow,
  Text,
  reveal,
  typeStyles,
  useReveal,
} from "../components";
import { colors, fontSizes, layout, media } from "../components/tokens.stylex";
import ClusterShell from "./ClusterShell";
import InitiativeCard from "./InitiativeCard";
import HomeAbout from "./HomeAbout";
import { links } from "./Utils";

type Program = {
  title: string;
  accent: "sage" | "lavender";
  file: string;
  blurb: string;
  cta: { label: string; href: string };
};

const programs: Program[] = [
  {
    title: "SWECC Labs",
    accent: "sage",
    file: "labs.md",
    blurb:
      "Build software with other students through hands-on, open source projects. Gain practical engineering experience and grow as a problem-solver.",
    cta: { label: "Join Labs", href: links.programs.labs },
  },
  {
    title: "Mock Interviews",
    accent: "lavender",
    file: "interviews.md",
    blurb:
      "Practice technical and non-technical interviews with peers. Build confidence explaining your approach and prepare for the next step in your software career.",
    cta: { label: "Book a slot", href: links.programs.interviews },
  },
  {
    title: "Mentorship Program",
    accent: "sage",
    file: "mentorship.md",
    blurb:
      "Learn from upperclassmen and alumni who have been in your shoes. Get guidance as you grow as an engineer and explore careers in software.",
    cta: { label: "Join the Discord", href: links.social.discord },
  },
  {
    title: "Cohort Program",
    accent: "lavender",
    file: "cohort.md",
    blurb:
      "Find a supportive group of ambitious peers to navigate interview prep and job applications together. Stay accountable and build connections along the way.",
    cta: { label: "Join a cohort", href: links.programs.cohort },
  },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const initiatives = useReveal<HTMLElement>();

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    section.focus({ preventScroll: true });
  };

  return (
    <div {...stylex.props(styles.page)}>
      <Band tone="black" style={styles.hero}>
        <Container ref={heroRef} style={styles.heroInner}>
          <div {...stylex.props(styles.heroCopy)}>
            <Heading level={1} data-intro-part="title" style={styles.heroTitle}>
              <span {...stylex.props(typeStyles.hero, styles.heroLine)}>
                Software
              </span>
              <span {...stylex.props(typeStyles.hero, styles.heroLine)}>
                Engineering
              </span>
              <span
                {...stylex.props(
                  typeStyles.hero,
                  typeStyles.heroAccent,
                  styles.heroLine,
                )}
              >
                CAREER CLUB
              </span>
            </Heading>
            <Text data-intro-part="reveal" style={styles.kicker}>
              AT THE{" "}
              <em {...stylex.props(styles.kickerEm)}>
                UNIVERSITY OF WASHINGTON
              </em>
            </Text>
            <div data-intro-part="reveal" {...stylex.props(styles.actions)}>
              <Button
                variant="primary"
                size="lg"
                href={links.social.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonIcon icon={FaDiscord} />
                Join the Discord
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollTo("initiatives")}
              >
                Explore programs
                <ButtonIcon icon={FiArrowDown} nudge />
              </Button>
            </div>
          </div>
          <TerminalWindow
            data-intro-part="reveal"
            draggable
            boundsRef={heroRef}
            style={styles.terminal}
            bodyStyle={styles.terminalBody}
          >
            <ClusterShell />
          </TerminalWindow>
        </Container>
      </Band>

      <HomeAbout />

      <Band
        tone="black"
        reveal={initiatives}
        id="initiatives"
        tabIndex={-1}
        aria-labelledby="initiatives-title"
        style={styles.initiatives}
      >
        <Container style={styles.initiativesInner}>
          <header {...stylex.props(styles.initiativesHeader)}>
            <Eyebrow path="programs" style={[reveal.item, reveal.order(0)]} />
            <DisplayTitle
              id="initiatives-title"
              style={[reveal.item, reveal.order(1)]}
            >
              Build your future in <Accent>software.</Accent>
            </DisplayTitle>
          </header>
          <ul {...stylex.props(styles.initiativesGrid)}>
            {programs.map((program, i) => (
              <InitiativeCard
                key={program.title}
                {...program}
                revealOrder={2 + i}
              />
            ))}
          </ul>
        </Container>
      </Band>
    </div>
  );
}

const heroMinHeight = {
  default: "clamp(36rem, 90vh, 61.375rem)",
  [media.max1100]: 0,
};

const styles = stylex.create({
  page: {
    backgroundColor: colors.surface,
    color: colors.text,
    overflowX: "hidden",
  },
  hero: {
    position: "relative",
    minHeight: heroMinHeight,
    boxSizing: "border-box",
    overflow: "hidden",
  },
  heroInner: {
    position: "relative",
    minHeight: heroMinHeight,
    padding: `${layout.bandPaddingY} ${layout.gutter}`,
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) minmax(0, 1fr)",
      [media.max1100]: "minmax(0, 1fr)",
    },
    alignItems: { default: "center", [media.max1100]: "start" },
    gap: "clamp(1.5rem, 4vw, 3rem)",
  },
  heroCopy: {
    minWidth: 0,
    maxWidth: { default: "36rem", [media.max1100]: "none" },
    position: "relative",
    zIndex: 1,
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    margin: "0 0 1rem",
  },
  heroLine: {
    display: "block",
    fontSize: "clamp(2.25rem, 2.4vw + 1rem, 4.5rem)",
    lineHeight: 1.1,
    overflowWrap: "break-word",
  },
  kicker: {
    margin: "0 0 2.25rem",
    fontWeight: 700,
    fontSize: fontSizes.bandBody,
    letterSpacing: "0.04em",
    color: colors.text,
    fontStyle: "normal",
  },
  kickerEm: {
    color: colors.accent,
    fontStyle: "italic",
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.75rem",
  },
  terminal: {
    width: "100%",
    maxWidth: { default: "42rem", [media.max1100]: "none" },
    height: {
      default: "min(34rem, 64vh)",
      [media.max1100]: "min(28rem, 70vh)",
    },
    minWidth: 0,
    minHeight: 0,
    justifySelf: "stretch",
    position: "relative",
    zIndex: 1,
  },
  terminalBody: {
    whiteSpace: "normal",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    color: colors.text,
    // iOS zooms the page when a focused input is under 16px.
    fontSize: {
      default: "clamp(0.85rem, 0.55vw + 0.7rem, 1.0625rem)",
      [media.pointerCoarse]: "1rem",
    },
    lineHeight: 1.45,
    padding: "0.75rem 1rem 0.5rem",
  },
  initiatives: {
    scrollMarginTop: "7.5rem",
    outline: { default: null, ":focus": "none" },
  },
  initiativesInner: {
    padding: `${layout.bandPaddingY} ${layout.gutter} calc(${layout.bandPaddingY} * 1.4)`,
  },
  initiativesHeader: {
    textAlign: "center",
    marginBottom: "clamp(2rem, 4vw, 3.5rem)",
  },
  initiativesGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 17rem))",
      [media.max1100]: "repeat(2, minmax(0, 17rem))",
      [media.max600]: "minmax(0, 20rem)",
    },
    gridAutoRows: "1fr",
    justifyContent: "center",
    gap: "clamp(1rem, 2vw, 1.5rem)",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
});

export default HomePage;
