import React, { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "@swecc/ui";
import { colors, fonts } from "@swecc/ui/tokens.stylex";
import groupPhoto from "../Data/img/Officers/officerGroupPic.webp";
import { links } from "./Utils/Utils";

const timeline = [
  ["March 21st", "Applications Open"],
  ["April 4th", "Applications Close"],
  ["April 1st - April 14th", "Interviews"],
  ["April 17th", "Offers Extended"],
  ["April 24th", "Officer Mixer"],
] as const;

const roles = [
  ["Events", "Organizes club events and workshops"],
  [
    "External Outreach",
    "Manages relationships with guests, companies and other student organizations",
  ],
  ["Marketing", "Manages the club's social media and marketing efforts"],
  [
    "Mentorship Programs",
    "Manages the Student Mentorship or Professional Mentorship Program",
  ],
  [
    "Software Engineering",
    "Builds on top of and maintains the club's various software projects",
  ],
  [
    "Community and Diversity",
    "Help build and foster community and diversity within the club",
  ],
  ["Finance", "Manage club finances and spending"],
] as const;

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Heading level={2} style={styles.sectionTitle}>
      {children}
    </Heading>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

function OfficerApplication() {
  return (
    <div>
      <div
        {...stylex.props(
          styles.header,
          styles.headerImage(`url(${groupPhoto})`),
        )}
      >
        <Heading level={1} style={styles.title}>
          SWECC Leadership Applications 2025-2026
        </Heading>
      </div>
      <div {...stylex.props(styles.content)}>
        <SectionTitle>
          Applications for the 2025-2026 SWECC officer team are now open!
        </SectionTitle>
        <Paragraph>
          Are you passionate about software engineering and helping others
          succeed in their careers? Do you want to be part of a team that
          organizes events/workshops, builds software for students, and
          facilitates community within the University of Washington? Apply to be
          an officer for the Software Engineering Career Club!
        </Paragraph>
        <SectionTitle>TimeLine</SectionTitle>
        <table {...stylex.props(styles.table)}>
          <tbody>
            <tr>
              <th {...stylex.props(styles.cell, styles.headerCell)}>Date</th>
              <th {...stylex.props(styles.cell, styles.headerCell)}>Stage</th>
            </tr>
            {timeline.map(([date, stage]) => (
              <tr key={stage}>
                <td {...stylex.props(styles.cell)}>{date}</td>
                <td {...stylex.props(styles.cell)}>{stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <SectionTitle>Roles</SectionTitle>
        <ul {...stylex.props(styles.list)}>
          {roles.map(([role, description]) => (
            <li key={role} {...stylex.props(styles.listItem)}>
              <strong>{`${role}:`}</strong>
              {` ${description}`}
            </li>
          ))}
        </ul>
        <Paragraph>
          No experience required for any of the roles! We strongly encourage
          underclassmen to apply!
        </Paragraph>

        <SectionTitle>Application</SectionTitle>
        <a
          href={links.resources.officerApp}
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.applyLink)}
        >
          Apply here
        </a>
        <SectionTitle>Interview Process</SectionTitle>
        <Paragraph>
          Interviews will be 30-45 min and scheduled on a rolling basis (so
          apply early!). During the interview, you'll want to highlight what you
          specifically want to do in the role you're applying for. After offers
          are extended, you'll have until April 25th to accept or decline the
          offer. Potential start dates will be discussed during the interview.
        </Paragraph>
      </div>
    </div>
  );
}

const fadeIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const fadeInAnimation = {
  animationName: fadeIn,
  animationDuration: "0.5s",
  animationTimingFunction: "ease-out",
} as const;

const styles = stylex.create({
  header: {
    boxSizing: "border-box",
    width: "100%",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: fonts.sans,
    color: colors.text,
    lineHeight: 1.6,
    backgroundPosition: "center",
  },
  headerImage: (image: string) => ({ backgroundImage: image }),
  title: {
    margin: "50px auto 10px auto",
    maxWidth: "800px",
    fontSize: "clamp(1.75rem, 3vw + 1rem, 4rem)",
    color: colors.text,
    textShadow: "0 2px 16px rgb(31 29 32 / 0.8)",
    ...fadeInAnimation,
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: fonts.sans,
    color: colors.text,
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: "1.5rem",
    margin: "2rem 0 1rem",
    color: colors.primary,
    ...fadeInAnimation,
  },
  paragraph: {
    marginBottom: "1.5rem",
    ...fadeInAnimation,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.5rem",
    tableLayout: "fixed",
  },
  cell: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.border,
    padding: "0.75rem",
    textAlign: "left",
  },
  headerCell: {
    backgroundColor: colors.surfaceAccent,
    fontWeight: "bold",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    marginBottom: "1.5rem",
  },
  listItem: {
    marginBottom: "0.75rem",
  },
  applyLink: {
    display: "inline-block",
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    fontWeight: 700,
    padding: "0.75rem 1.5rem",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
    marginBottom: "1.5rem",
    filter: { default: null, ":hover": "brightness(1.07)" },
    opacity: { default: null, ":hover": 1 },
  },
});

export default OfficerApplication;
