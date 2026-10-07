import React, { useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import {
  Accent,
  Band,
  Button,
  ButtonIcon,
  Container,
  DisplayTitle,
  Eyebrow,
  Lede,
  Photo,
  Pill,
  reveal,
  useReveal,
} from "../components";
import {
  colors,
  easings,
  fonts,
  layout,
  media,
} from "../components/tokens.stylex";
import { links } from "./Utils";
import workshopImg from "../Data/img/backgroundImg/1.webp";
import generalMeetingImg from "../Data/img/backgroundImg/2.webp";
import pairingImg from "../Data/img/backgroundImg/3.webp";
import mentorImg from "../Data/img/backgroundImg/7.webp";

const { currentQuarter, meetingDay, meetingTime, meetingLocation } =
  links.config;

const pillars = [
  "Hands-on projects",
  "Mentorship",
  "Workshops",
  "Peer network",
];

const mosaic = [
  { src: workshopImg, alt: "SWECC members in a discussion-style club meeting" },
  {
    src: pairingImg,
    alt: "SWECC members gathered around a laptop at a workshop",
  },
  { src: mentorImg, alt: "Two SWECC members comparing code on their laptops" },
];

const topics = [
  "Professional development",
  "Resume building",
  "Mentor circles",
];

type MeetingFact = {
  label: string;
  value: string;
  detail?: string;
  href?: string;
};

const meetingFacts: MeetingFact[] = [
  {
    label: "When",
    value: `${meetingDay}s`,
    detail: meetingTime.replace("-", " – ").replace(/(\d)([AP]M)/g, "$1 $2"),
  },
  {
    label: "Where",
    value: meetingLocation,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${meetingLocation}, University of Washington, Seattle`,
    )}`,
  },
];

function HomeAbout() {
  const about = useReveal<HTMLElement>();
  const meetings = useReveal<HTMLElement>();
  const photosRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <>
      <Band tone="grey" reveal={about} aria-labelledby="about-title">
        <Container style={styles.aboutInner}>
          <div>
            <Eyebrow path="who-we-are" style={[reveal.item, reveal.order(0)]} />
            <DisplayTitle
              id="about-title"
              style={[reveal.item, reveal.order(1)]}
            >
              Exceptional builders. <Accent>Confident problem-solvers.</Accent>
            </DisplayTitle>
            <Lede style={[reveal.item, reveal.order(2)]}>
              SWECC is a student-led community dedicated to helping aspiring
              software engineers build the skills, experience, and connections
              needed to succeed in tech. Through hands-on projects, mentorship,
              workshops, and a supportive network of ambitious peers, we create
              opportunities for students to grow as engineers and launch
              meaningful careers in software.
            </Lede>
            <ol {...stylex.props(styles.pillars, reveal.item, reveal.order(3))}>
              {pillars.map((pillar, i) => (
                <li key={pillar} {...stylex.props(styles.pillar)}>
                  <span aria-hidden {...stylex.props(styles.pillarIndex)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pillar}
                </li>
              ))}
            </ol>
          </div>
          <section
            aria-label="SWECC community photos"
            {...stylex.props(styles.gallery)}
          >
            <div
              id="about-photos"
              ref={photosRef}
              onScroll={(event) => {
                const track = event.currentTarget;
                setActivePhoto(
                  Math.round(track.scrollLeft / track.clientWidth),
                );
              }}
              {...stylex.props(styles.mosaic)}
            >
              {mosaic.map((photo, i) => (
                <Photo
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  revealOrder={i + 1}
                  style={[styles.mosaicPhoto, i === 0 && styles.leadPhoto]}
                  imageStyle={i === 0 && styles.leadPhotoImage}
                />
              ))}
            </div>
            <div {...stylex.props(styles.carouselControls)}>
              <span>Swipe to explore</span>
              <div {...stylex.props(styles.carouselDots)}>
                {mosaic.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    aria-label={`Show photo ${i + 1} of ${mosaic.length}`}
                    aria-controls="about-photos"
                    aria-pressed={activePhoto === i}
                    onClick={() => {
                      const track = photosRef.current;
                      if (track)
                        track.scrollTo({ left: i * track.clientWidth });
                    }}
                    {...stylex.props(
                      styles.carouselDot,
                      activePhoto === i && styles.carouselDotActive,
                    )}
                  />
                ))}
              </div>
            </div>
          </section>
        </Container>
      </Band>

      <Band tone="grey" reveal={meetings} aria-labelledby="meetings-title">
        <Container style={styles.meetingsInner}>
          <header {...stylex.props(styles.meetingsHeader)}>
            <Eyebrow path="meetings" style={[reveal.item, reveal.order(0)]} />
            <DisplayTitle
              id="meetings-title"
              style={[reveal.item, reveal.order(1)]}
            >
              See you on <Accent>{meetingDay}s.</Accent>
            </DisplayTitle>
            <Lede style={[reveal.item, reveal.order(2)]}>
              Build your skills and connect with other aspiring software
              engineers at SWECC meetings. We cover a wide range of topics,
              including professional development, resume building, and mentor
              circles. Come learn from others and find support for your next
              step in tech.
            </Lede>
            <ul
              aria-label="Meeting topics"
              {...stylex.props(styles.topics, reveal.item, reveal.order(3))}
            >
              {topics.map((topic) => (
                <Pill as="li" key={topic}>
                  {topic}
                </Pill>
              ))}
            </ul>
          </header>

          <Photo
            src={generalMeetingImg}
            alt="A packed SWECC general meeting in a lecture hall"
            revealOrder={1}
            style={styles.meetingsPhoto}
          />

          <aside
            aria-label="Meeting details"
            {...stylex.props(styles.pass, reveal.item, reveal.order(3))}
          >
            <div {...stylex.props(styles.ticket)}>
              <div {...stylex.props(styles.passHead)}>
                <span {...stylex.props(styles.passKicker)}>
                  General meeting
                </span>
                <span {...stylex.props(styles.passLive)}>
                  <span aria-hidden {...stylex.props(styles.passDot)} />
                  {currentQuarter.replace(/[()]/g, "")}
                </span>
              </div>
              <dl {...stylex.props(styles.facts)}>
                {meetingFacts.map((fact, i) => (
                  <div
                    key={fact.label}
                    {...stylex.props(styles.fact, i > 0 && styles.factDivider)}
                  >
                    <dt {...stylex.props(styles.factLabel)}>{fact.label}</dt>
                    <dd {...stylex.props(styles.factValue)}>
                      {fact.href ? (
                        <a
                          href={fact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...stylex.props(
                            styles.factLink,
                            stylex.defaultMarker(),
                          )}
                        >
                          {fact.value}
                          <FiArrowUpRight
                            aria-hidden
                            {...stylex.props(styles.factLinkIcon)}
                          />
                        </a>
                      ) : (
                        fact.value
                      )}
                      {fact.detail && (
                        <span {...stylex.props(styles.factDetail)}>
                          {fact.detail}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <Button
                variant="primary"
                size="lg"
                href={links.resources.calendarSubscribe}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.passCta}
              >
                <ButtonIcon icon={FiCalendar} />
                Add to calendar
              </Button>
            </div>
          </aside>
        </Container>
      </Band>
    </>
  );
}

const pulse = stylex.keyframes({
  from: { transform: "scale(1)", opacity: 0.6 },
  to: { transform: "scale(3)", opacity: 0 },
});

const styles = stylex.create({
  aboutInner: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 5fr) minmax(0, 6fr)",
      [media.max1100]: "minmax(0, 1fr)",
    },
    alignItems: "center",
    gap: "clamp(2.5rem, 6vw, 6rem)",
    padding: `${layout.bandPaddingY} ${layout.gutter} calc(${layout.bandPaddingY} * 0.75)`,
  },
  pillars: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [media.max600]: "repeat(2, minmax(0, 1fr))",
    },
    rowGap: { default: null, [media.max600]: "1.25rem" },
    margin: "clamp(2rem, 4vw, 3rem) 0 0",
    padding: 0,
    listStyle: "none",
  },
  pillar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    padding: "1rem 1rem 0 0",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.hairline,
    fontFamily: fonts.hero,
    fontWeight: 700,
    fontSize: "1.0625rem",
    letterSpacing: "-0.01em",
    color: colors.text,
  },
  pillarIndex: {
    fontFamily: fonts.mono,
    fontWeight: 400,
    fontSize: "0.75rem",
    color: colors.primary,
  },
  gallery: {
    minWidth: 0,
  },
  mosaic: {
    display: { default: "grid", [media.max760]: "flex" },
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
    gridTemplateRows: "repeat(2, minmax(0, 1fr))",
    gap: { default: "clamp(0.75rem, 1.2vw, 1.25rem)", [media.max760]: 0 },
    aspectRatio: {
      default: 1.1,
      [media.max1100]: "16 / 11",
      [media.max760]: "auto",
    },
    overflowX: { default: null, [media.max760]: "auto" },
    scrollSnapType: { default: null, [media.max760]: "x mandatory" },
    overscrollBehaviorX: { default: null, [media.max760]: "contain" },
    scrollbarWidth: { default: null, [media.max760]: "none" },
    scrollBehavior: {
      default: null,
      [media.max760]: { default: null, [media.motionOK]: "smooth" },
    },
    "::-webkit-scrollbar": {
      display: { default: null, [media.max760]: "none" },
    },
  },
  mosaicPhoto: {
    flex: { default: null, [media.max760]: "0 0 100%" },
    aspectRatio: { default: null, [media.max760]: "4 / 3" },
    scrollSnapAlign: { default: null, [media.max760]: "start" },
    scrollSnapStop: { default: null, [media.max760]: "always" },
  },
  leadPhoto: {
    gridRow: "1 / 3",
  },
  leadPhotoImage: {
    objectPosition: "30% 50%",
  },
  carouselControls: {
    display: { default: "none", [media.max760]: "flex" },
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.5rem",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    color: colors.textMuted,
  },
  carouselDots: {
    display: "flex",
  },
  carouselDot: {
    display: "grid",
    placeItems: "center",
    width: "44px",
    height: "44px",
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "currentcolor",
    borderRadius: "50%",
    backgroundColor: "transparent",
    cursor: "pointer",
    outline: { default: null, ":focus-visible": `2px solid ${colors.accent}` },
    outlineOffset: { default: null, ":focus-visible": "-4px" },
    "::after": {
      content: '""',
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      backgroundColor: colors.textMuted,
    },
  },
  carouselDotActive: {
    "::after": {
      content: '""',
      width: "20px",
      height: "7px",
      borderRadius: "4px",
      backgroundColor: colors.primary,
    },
  },
  meetingsInner: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gridTemplateRows: "auto auto",
    columnGap: "clamp(1rem, 2vw, 2rem)",
    padding: `calc(${layout.bandPaddingY} * 0.75) ${layout.gutter} ${layout.bandPaddingY}`,
  },
  meetingsHeader: {
    gridColumn: {
      default: "1 / 8",
      [media.max1100]: "1 / 7",
      [media.max760]: "1 / -1",
    },
    gridRow: "1",
    paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
  },
  topics: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    margin: "1.75rem 0 0",
    padding: 0,
    listStyle: "none",
  },
  meetingsPhoto: {
    gridColumn: "1 / -1",
    gridRow: "2",
    aspectRatio: {
      default: "21 / 9",
      [media.max1100]: "16 / 9",
      [media.max600]: "4 / 3",
    },
  },
  pass: {
    gridColumn: {
      default: "9 / 13",
      [media.max1100]: "7 / 13",
      [media.max760]: "1 / -1",
    },
    gridRow: { default: "1 / 3", [media.max760]: "3" },
    alignSelf: "start",
    justifySelf: {
      default: null,
      [media.max760]: "end",
      [media.max600]: "stretch",
    },
    width: {
      default: null,
      [media.max760]: "min(100%, 26rem)",
      [media.max600]: "auto",
    },
    position: "relative",
    zIndex: 1,
    margin: {
      default: "2.5rem 0 0",
      [media.max1100]: 0,
      [media.max760]: "1.5rem 0 0",
      [media.max600]: "1.25rem 0 0",
    },
    filter: "drop-shadow(0 24px 40px rgb(0 0 0 / 0.45))",
  },
  // Ticket notches are true cutouts, so the photo shows through them.
  ticket: {
    "--notch": "0.75rem",
    "--notch-y": { default: "4.25rem", [media.max600]: "4rem" },
    padding: {
      default: "1.5rem 1.75rem 1.75rem",
      [media.max600]: "1.25rem 1.25rem 1.5rem",
    },
    borderRadius: "1.5rem",
    backgroundColor: colors.background,
    boxShadow: "inset 0 0 0 1px rgb(250 250 250 / 0.08)",
    mask: "radial-gradient(circle at 0 var(--notch-y), transparent var(--notch), black calc(var(--notch) + 0.5px)), radial-gradient(circle at 100% var(--notch-y), transparent var(--notch), black calc(var(--notch) + 0.5px))",
    maskComposite: "intersect",
  },
  passHead: {
    boxSizing: "border-box",
    height: "2.75rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: "1.5px",
    borderBottomStyle: "dashed",
    borderBottomColor: "rgb(250 250 250 / 0.16)",
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    lineHeight: 1.2,
    letterSpacing: "0.04em",
  },
  passKicker: {
    textTransform: "uppercase",
    color: colors.accent,
  },
  passLive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.textMuted,
  },
  passDot: {
    position: "relative",
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    "::after": {
      content: { default: null, [media.motionOK]: '""' },
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundColor: colors.primary,
      animationName: pulse,
      animationDuration: "2.4s",
      animationTimingFunction: easings.out,
      animationIterationCount: "infinite",
    },
  },
  facts: {
    margin: "0.5rem 0 1.5rem",
  },
  fact: {
    display: "grid",
    gap: "0.3rem",
    padding: "1rem 0",
  },
  factDivider: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.hairline,
  },
  factLabel: {
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  factValue: {
    margin: 0,
    fontFamily: fonts.hero,
    fontWeight: 700,
    fontSize: "clamp(1.25rem, 1rem + 0.6vw, 1.5rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    color: colors.text,
  },
  factDetail: {
    display: "block",
    marginTop: "0.2rem",
    fontWeight: 600,
    fontSize: "0.8em",
    whiteSpace: "nowrap",
    color: colors.textMuted,
  },
  factLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    font: "inherit",
    color: "inherit",
    textDecoration: "underline",
    textDecorationColor: { default: "transparent", ":hover": colors.primary },
    textDecorationThickness: "2px",
    textUnderlineOffset: "0.25em",
    opacity: { default: null, ":hover": 1 },
    transition: "text-decoration-color 160ms ease",
  },
  factLinkIcon: {
    flex: "none",
    color: colors.primary,
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: "translate(2px, -2px)",
    },
    transition: `transform 160ms ${easings.out}`,
  },
  passCta: {
    width: "100%",
  },
});

export default HomeAbout;
