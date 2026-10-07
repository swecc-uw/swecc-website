import React, { useState } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Band, Container, Heading, typeStyles } from "../components";
import {
  colors,
  fontSizes,
  layout,
  media,
  radii,
} from "../components/tokens.stylex";
import ProfileCard from "./profileCard";
import { officersByYear, rosterYears } from "../Data/officers";

const yearOptions = rosterYears(new Date());

const Officers = () => {
  const SHOW_OFFICER_APPLICATION = false;
  const APPLICATION_YEAR = "2025-2026";
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearOptions[0],
  );
  const teamMembers =
    selectedYear === undefined ? [] : officersByYear[selectedYear];

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div {...stylex.props(styles.page)}>
      <Band tone="black">
        <Container style={styles.heroInner}>
          <Heading level={1} style={[typeStyles.display, styles.heroTitle]}>
            Our Officers
          </Heading>
        </Container>
      </Band>

      <Container as="section" style={styles.body}>
        {SHOW_OFFICER_APPLICATION && (
          <div {...stylex.props(styles.applicationLink)}>
            <Link to="/OfficerApplication">
              <button {...stylex.props(styles.applyButton)}>
                Apply to be an Officer for {APPLICATION_YEAR}!
              </button>
            </Link>
          </div>
        )}

        <div {...stylex.props(styles.layout)}>
          <nav aria-label="Officer years" {...stylex.props(styles.years)}>
            <Heading level={2} style={[typeStyles.display, styles.columnTitle]}>
              Year
            </Heading>
            <ul {...stylex.props(styles.yearList)}>
              {yearOptions.map((year) => (
                <li key={year}>
                  <button
                    type="button"
                    onClick={() => handleYearChange(year)}
                    aria-pressed={selectedYear === year}
                    {...stylex.props(
                      styles.yearButton,
                      selectedYear === year && styles.yearButtonSelected,
                    )}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div {...stylex.props(styles.roster)}>
            <Heading level={2} style={[typeStyles.display, styles.columnTitle]}>
              {selectedYear} Officers
            </Heading>
            <ProfileCard info={teamMembers} />
          </div>
        </div>
      </Container>
    </div>
  );
};

const styles = stylex.create({
  page: {
    backgroundColor: colors.surface,
    color: colors.text,
    overflowX: "hidden",
    minHeight: "100vh",
  },
  heroInner: {
    padding: `${layout.bandPaddingY} ${layout.gutter}`,
    textAlign: "center",
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(2.5rem, 4vw + 1rem, 5rem)",
  },
  body: {
    padding: `${layout.bandPaddingY} ${layout.gutter} calc(${layout.bandPaddingY} * 1.4)`,
  },
  layout: {
    display: "flex",
    flexDirection: { default: null, [media.max768]: "column" },
    alignItems: { default: "flex-start", [media.max768]: "center" },
    gap: "clamp(1.5rem, 4vw, 3.5rem)",
  },
  years: {
    flex: "0 0 auto",
    minWidth: { default: "6.5rem", [media.max768]: 0 },
    width: { default: null, [media.max768]: "100%" },
    textAlign: { default: "right", [media.max768]: "center" },
  },
  columnTitle: {
    margin: "0 0 1rem",
    fontSize: fontSizes.bandTitle,
  },
  yearList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: { default: null, [media.max768]: "flex" },
    flexWrap: { default: null, [media.max768]: "wrap" },
    justifyContent: { default: null, [media.max768]: "center" },
    gap: { default: null, [media.max768]: "0.5rem 1.25rem" },
  },
  yearButton: {
    fontWeight: 700,
    fontSize: fontSizes.bandBody,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "currentcolor",
    padding: "0.15em 0",
    color: { default: colors.textSubtle, ":hover": colors.accent },
    cursor: "pointer",
    letterSpacing: "0.02em",
    lineHeight: 1.6,
    transition: "color 0.2s ease",
  },
  yearButtonSelected: {
    color: colors.accent,
  },
  roster: {
    flex: "1 1 auto",
    minWidth: 0,
    textAlign: "center",
  },
  applicationLink: {
    textAlign: "center",
    marginBottom: layout.bandPaddingY,
  },
  applyButton: {
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    fontSize: "clamp(0.875rem, 0.6vw + 0.7rem, 1rem)",
    fontWeight: 700,
    padding: "0.75rem 1.5rem",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "currentcolor",
    borderRadius: radii.sm,
    cursor: "pointer",
    opacity: { default: null, ":hover": 0.85 },
  },
});

export default Officers;
