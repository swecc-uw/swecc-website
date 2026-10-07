import React from "react";
import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "../components";
import { colors, fonts, layout } from "../components/tokens.stylex";
import meetingImg from "../Data/img/backgroundImg/2.webp";
import Calendar from "./Calendar";

function Events() {
  return (
    <div {...stylex.props(styles.page)}>
      <div
        {...stylex.props(styles.intro, styles.introImage(`url(${meetingImg})`))}
      >
        <Heading level={1} style={styles.title}>
          Upcoming Events
        </Heading>
        <Text style={styles.description}>
          Grow your skills through workshops and SWECC meetings on professional
          development, resume building, mentor circles, and more. Meet peers who
          share your goals and take your next step toward a career in software.
        </Text>
      </div>

      <div {...stylex.props(styles.calendarSection)}>
        <Calendar />
      </div>
    </div>
  );
}

const styles = stylex.create({
  page: {
    backgroundColor: colors.background,
  },
  intro: {
    position: "relative",
    isolation: "isolate",
    minHeight: "clamp(11rem, 22vw, 26rem)",
    boxSizing: "border-box",
    padding: `2rem ${layout.gutter}`,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    "::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      backgroundImage:
        "linear-gradient(rgb(31 29 32 / 0.55), rgb(31 29 32 / 0.8))",
    },
  },
  introImage: (image: string) => ({ backgroundImage: image }),
  title: {
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: "clamp(2.25rem, 4vw + 1rem, 5rem)",
    color: colors.text,
    textAlign: "center",
    textShadow: "0 2px 16px rgb(31 29 32 / 0.6)",
  },
  calendarSection: {
    padding: `clamp(1.5rem, 4vw, 3.5rem) ${layout.gutter} clamp(3rem, 6vw, 5rem)`,
  },
  description: {
    maxWidth: "42rem",
    margin: 0,
    color: colors.text,
    fontSize: "clamp(1rem, 0.9rem + 0.3vw, 1.2rem)",
    lineHeight: 1.6,
    textAlign: "center",
  },
});

export default Events;
