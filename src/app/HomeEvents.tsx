import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { FaDiscord } from "react-icons/fa";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import {
  Accent,
  Band,
  Button,
  ButtonIcon,
  Container,
  DisplayTitle,
  Eyebrow,
  Heading,
  Text,
  reveal,
  useReveal,
} from "@swecc/ui";
import { colors, easings, fonts, layout, media } from "@swecc/ui/tokens.stylex";
import {
  type CalendarEvent,
  addToCalendarUrl,
  dateKey,
  eventSummary,
  formatEventRange,
  formatEventTime,
  isNewEvent,
  upcomingEvents,
} from "./Utils/googleCalendar";
import { useCalendarEvents } from "./Utils/useCalendarEvents";
import { links, useMounted } from "./Utils";

const TZ = "America/Los_Angeles";
const DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...options }).format(
    date,
  );
}

/** "Today", "Tomorrow", or "In 5 days", counted in Seattle calendar days. */
function relativeDay(event: CalendarEvent, now: Date) {
  const days = Math.round(
    (Date.parse(dateKey(event.start)) - Date.parse(dateKey(now))) / DAY_MS,
  );
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

/** The next few events, loaded once per page and only on the client. */
function useUpcoming(limit: number) {
  // Which events are upcoming depends on the clock, so they only load
  // client-side; the prerendered page shows the loading state.
  const mounted = useMounted();
  const [now] = useState(() => new Date());
  const { status, events } = useCalendarEvents();
  const upcoming = useMemo(
    () => upcomingEvents(events, now, limit),
    [events, now, limit],
  );
  return {
    now,
    status: mounted ? status : ("loading" as const),
    upcoming,
  };
}

function PulseDot() {
  return <span aria-hidden {...stylex.props(styles.dot)} />;
}

/** A one-line "next up" link for the hero, so events show on page load. */
export function NextEventBanner() {
  const { now, status, upcoming } = useUpcoming(1);
  const next = upcoming[0];

  // The slot keeps its height while loading so the hero doesn't jump.
  return (
    <div {...stylex.props(styles.bannerSlot)}>
      {status === "ready" && next && (
        <a href="#events" {...stylex.props(styles.banner)}>
          <span {...stylex.props(styles.bannerLabel)}>
            <PulseDot />
            {relativeDay(next, now) === "Today" ? "Today" : "Next up"}
          </span>
          <span {...stylex.props(styles.bannerText)}>
            <span {...stylex.props(styles.bannerTitle)}>{next.title}</span>
            <span {...stylex.props(styles.bannerWhen)}>
              {formatDate(next.start, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              · {formatEventTime(next)}
            </span>
          </span>
          <FiArrowRight aria-hidden {...stylex.props(styles.bannerArrow)} />
        </a>
      )}
    </div>
  );
}

/** The next event as a ticket: details on the left, a date stub on the right. */
function FeaturedEvent({ event, now }: { event: CalendarEvent; now: Date }) {
  const summary = eventSummary(event);
  const fresh = isNewEvent(event, now);
  return (
    <article
      aria-labelledby="next-event-title"
      {...stylex.props(styles.pass, reveal.item, reveal.order(3))}
    >
      <div {...stylex.props(styles.ticket)}>
        <div {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.kickerRow)}>
            <span {...stylex.props(styles.kicker)}>Next up</span>
            <span {...stylex.props(styles.statusTag)}>
              {fresh && <PulseDot />}
              {fresh ? "New" : relativeDay(event, now)}
            </span>
          </div>
          <Heading level={3} id="next-event-title" style={styles.featuredTitle}>
            {event.title}
          </Heading>
          {summary && <Text style={styles.summary}>{summary}</Text>}
          <p {...stylex.props(styles.meta)}>
            {formatEventRange(event)}
            {event.location && (
              <>
                <span aria-hidden {...stylex.props(styles.metaDivider)} />
                {event.location}
              </>
            )}
          </p>
          <div {...stylex.props(styles.actions)}>
            <Button
              variant="primary"
              size="lg"
              href={addToCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon icon={FiCalendar} />
              Add to calendar
            </Button>
            <Button variant="ghost" size="lg" to="/Events">
              Details
              <ButtonIcon icon={FiArrowRight} />
            </Button>
          </div>
        </div>
        <div {...stylex.props(styles.stub)}>
          <span {...stylex.props(styles.stubMonth)}>
            {formatDate(event.start, { month: "short" })}
          </span>
          <span {...stylex.props(styles.stubDay)}>
            {formatDate(event.start, { day: "numeric" })}
          </span>
          <span {...stylex.props(styles.stubWeekday)}>
            {formatDate(event.start, { weekday: "long" })}
          </span>
        </div>
      </div>
    </article>
  );
}

function LaterEvent({
  event,
  revealOrder,
}: {
  event: CalendarEvent;
  revealOrder: number;
}) {
  return (
    <li
      {...stylex.props(
        styles.later,
        reveal.item,
        reveal.order(revealOrder),
        stylex.defaultMarker(),
      )}
    >
      <div aria-hidden {...stylex.props(styles.laterDate)}>
        <span {...stylex.props(styles.laterMonth)}>
          {formatDate(event.start, { month: "short" })}
        </span>
        <span {...stylex.props(styles.laterDay)}>
          {formatDate(event.start, { day: "numeric" })}
        </span>
      </div>
      <div {...stylex.props(styles.laterBody)}>
        <Link to="/Events" {...stylex.props(styles.laterLink)}>
          {event.title}
        </Link>
        <span {...stylex.props(styles.laterMeta)}>
          {formatDate(event.start, { weekday: "short" })} ·{" "}
          {formatEventTime(event)}
          {event.location && ` · ${event.location}`}
        </span>
      </div>
      <FiArrowRight aria-hidden {...stylex.props(styles.laterArrow)} />
    </li>
  );
}

function StayInTheLoop({ title }: { title: string }) {
  return (
    <div {...stylex.props(styles.loop, reveal.item, reveal.order(4))}>
      <Text style={styles.loopTitle}>{title}</Text>
      <Text style={styles.loopText}>
        New events are announced in the Discord first. Subscribe to the SWECC
        calendar to see them as soon as they&apos;re posted.
      </Text>
      <div {...stylex.props(styles.actions)}>
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
          href={links.resources.calendarSubscribe}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonIcon icon={FiCalendar} />
          Subscribe
        </Button>
      </div>
    </div>
  );
}

function HomeEvents() {
  const scope = useReveal<HTMLElement>();
  const { now, status, upcoming } = useUpcoming(4);
  const [next, ...later] = upcoming;

  return (
    <Band
      tone="grey"
      reveal={scope}
      id="events"
      tabIndex={-1}
      aria-labelledby="events-title"
      style={styles.band}
    >
      <Container style={styles.inner}>
        <header {...stylex.props(styles.header)}>
          <div>
            <Eyebrow path="events" style={[reveal.item, reveal.order(0)]} />
            <DisplayTitle
              id="events-title"
              style={[styles.title, reveal.item, reveal.order(1)]}
            >
              What&apos;s <Accent>coming up.</Accent>
            </DisplayTitle>
          </div>
          <Button
            variant="ghost"
            size="lg"
            to="/Events"
            style={[styles.allEvents, reveal.item, reveal.order(2)]}
          >
            Full calendar
            <ButtonIcon icon={FiArrowRight} />
          </Button>
        </header>

        <div aria-live="polite" aria-busy={status === "loading"}>
          {status === "loading" ? (
            <Text style={styles.status}>Loading events…</Text>
          ) : next ? (
            <div {...stylex.props(styles.layout)}>
              <FeaturedEvent event={next} now={now} />
              {later.length > 0 ? (
                <div>
                  <Text
                    style={[styles.laterHeading, reveal.item, reveal.order(4)]}
                  >
                    Later on
                  </Text>
                  <ul {...stylex.props(styles.laterList)}>
                    {later.map((event, i) => (
                      <LaterEvent
                        key={`${event.uid}-${event.start.toISOString()}`}
                        event={event}
                        revealOrder={5 + i}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <StayInTheLoop title="Never miss one." />
              )}
            </div>
          ) : (
            <StayInTheLoop
              title={
                status === "error"
                  ? "We couldn't load the calendar."
                  : "Nothing on the calendar yet."
              }
            />
          )}
        </div>
      </Container>
    </Band>
  );
}

const pulse = stylex.keyframes({
  from: { transform: "scale(1)", opacity: 0.6 },
  to: { transform: "scale(3)", opacity: 0 },
});

const fadeIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(0.5rem)" },
  to: { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  dot: {
    position: "relative",
    flex: "none",
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
  bannerSlot: {
    minHeight: "2.75rem",
    marginBottom: "1.5rem",
  },
  banner: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "0.375rem 1rem 0.375rem 0.375rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "rgb(250 250 250 / 0.14)",
      ":hover": colors.primary,
    },
    borderRadius: "999px",
    backgroundColor: colors.surface,
    color: colors.text,
    textDecoration: "none",
    animationName: { default: null, [media.motionOK]: fadeIn },
    animationDuration: "500ms",
    animationTimingFunction: easings.out,
    transition: "border-color 160ms ease",
  },
  bannerLabel: {
    flex: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.375rem 0.75rem",
    borderRadius: "999px",
    backgroundColor: colors.background,
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.accent,
  },
  bannerText: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: "0.6rem",
    minWidth: 0,
  },
  bannerTitle: {
    fontFamily: fonts.hero,
    fontWeight: 700,
    fontSize: "0.9375rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },
  bannerWhen: {
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    color: colors.textMuted,
    whiteSpace: "nowrap",
  },
  bannerArrow: {
    flex: "none",
    color: colors.primary,
    transform: {
      default: null,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover")]: "translateX(3px)",
      },
    },
    transition: {
      default: null,
      [media.motionOK]: `transform 200ms ${easings.out}`,
    },
  },
  band: {
    scrollMarginTop: "5rem",
    outline: { default: null, ":focus": "none" },
  },
  inner: {
    padding: `${layout.bandPaddingY} ${layout.gutter} calc(${layout.bandPaddingY} * 0.5)`,
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "0.5rem 2rem",
    marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
  },
  title: {
    marginBottom: 0,
  },
  allEvents: {
    marginInline: "-0.75rem",
  },
  status: {
    margin: 0,
    color: colors.textSubtle,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 7fr) minmax(0, 5fr)",
      [media.max900]: "minmax(0, 1fr)",
    },
    alignItems: "start",
    gap: "clamp(2rem, 4vw, 4rem)",
  },
  pass: {
    filter: "drop-shadow(0 24px 40px rgb(0 0 0 / 0.45))",
  },
  // The notches are true cutouts at the ends of the perforation, so the band
  // shows through them. On wide screens the stub sits on the right; on
  // phones it moves to the top.
  ticket: {
    "--stub": "10rem",
    "--strip": "4.5rem",
    "--notch": "0.75rem",
    "--notch-a": {
      default: "calc(100% - var(--stub)) 0",
      [media.max600]: "0 var(--strip)",
    },
    "--notch-b": {
      default: "calc(100% - var(--stub)) 100%",
      [media.max600]: "100% var(--strip)",
    },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) var(--stub)",
      [media.max600]: "minmax(0, 1fr)",
    },
    gridTemplateAreas: {
      default: '"main stub"',
      [media.max600]: '"stub" "main"',
    },
    borderRadius: "1.5rem",
    backgroundColor: colors.background,
    boxShadow: "inset 0 0 0 1px rgb(250 250 250 / 0.08)",
    mask: "radial-gradient(circle at var(--notch-a), transparent var(--notch), black calc(var(--notch) + 0.5px)), radial-gradient(circle at var(--notch-b), transparent var(--notch), black calc(var(--notch) + 0.5px))",
    maskComposite: "intersect",
  },
  main: {
    gridArea: "main",
    display: "flex",
    flexDirection: "column",
    padding: {
      default: "2rem 2.25rem",
      [media.max600]: "1.5rem 1.25rem 1.5rem",
    },
  },
  kickerRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  kicker: {
    color: colors.accent,
  },
  statusTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    paddingLeft: "0.75rem",
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: colors.hairline,
    color: colors.textMuted,
  },
  featuredTitle: {
    margin: 0,
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: "clamp(1.75rem, 1.2rem + 1.6vw, 2.75rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.text,
    textWrap: "balance",
  },
  summary: {
    margin: "0.875rem 0 0",
    maxWidth: "34rem",
    color: colors.textMuted,
    lineHeight: 1.6,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    overflowWrap: "anywhere",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.25rem 0.75rem",
    margin: "1.25rem 0 1.75rem",
    fontFamily: fonts.hero,
    fontWeight: 700,
    fontSize: "1.0625rem",
    color: colors.text,
  },
  metaDivider: {
    width: "0.3125rem",
    height: "0.3125rem",
    borderRadius: "50%",
    backgroundColor: colors.primary,
  },
  stub: {
    gridArea: "stub",
    display: "flex",
    flexDirection: { default: "column", [media.max600]: "row" },
    alignItems: { default: "center", [media.max600]: "baseline" },
    justifyContent: "center",
    gap: { default: "0.25rem", [media.max600]: "0.625rem" },
    boxSizing: "border-box",
    height: { default: null, [media.max600]: "var(--strip)" },
    padding: { default: "1.5rem 1rem", [media.max600]: "0 1.25rem" },
    borderLeftWidth: { default: "1.5px", [media.max600]: 0 },
    borderLeftStyle: "dashed",
    borderLeftColor: "rgb(250 250 250 / 0.16)",
    borderBottomWidth: { default: 0, [media.max600]: "1.5px" },
    borderBottomStyle: "dashed",
    borderBottomColor: "rgb(250 250 250 / 0.16)",
  },
  stubMonth: {
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.accent,
  },
  stubDay: {
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: { default: "4.5rem", [media.max600]: "2.25rem" },
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: colors.primary,
  },
  stubWeekday: {
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    color: colors.textMuted,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.75rem",
    marginTop: "auto",
  },
  laterHeading: {
    margin: "0 0 0.5rem",
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  laterList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  later: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    gap: "1.25rem",
    padding: "1.25rem 0",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.hairline,
    outline: {
      default: null,
      [stylex.when.ancestor(":has(a:focus-visible)")]:
        `2px solid ${colors.text}`,
    },
    outlineOffset: {
      default: null,
      [stylex.when.ancestor(":has(a:focus-visible)")]: "4px",
    },
  },
  laterDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "3.5rem",
    height: "3.75rem",
    borderRadius: "0.75rem",
    backgroundColor: {
      default: colors.background,
      [stylex.when.ancestor(":hover")]: colors.primary,
    },
    color: {
      default: colors.text,
      [stylex.when.ancestor(":hover")]: colors.textOnPrimary,
    },
    transition: {
      default: null,
      [media.motionOK]: `background-color 200ms ${easings.out}, color 200ms ${easings.out}`,
    },
  },
  laterMonth: {
    fontFamily: fonts.mono,
    fontSize: "0.6875rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  laterDay: {
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: "1.5rem",
    lineHeight: 1,
  },
  laterBody: {
    display: "grid",
    gap: "0.3rem",
    minWidth: 0,
  },
  laterLink: {
    fontFamily: fonts.hero,
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
    color: colors.text,
    textDecoration: "none",
    outline: { default: null, ":focus-visible": "none" },
    // Stretch the link over the whole row.
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
    },
  },
  laterMeta: {
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    color: colors.textMuted,
    overflowWrap: "anywhere",
  },
  laterArrow: {
    color: colors.primary,
    transform: {
      default: null,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover")]: "translateX(3px)",
      },
    },
    transition: {
      default: null,
      [media.motionOK]: `transform 200ms ${easings.out}`,
    },
  },
  loop: {
    padding: { default: "2rem", [media.max600]: "1.5rem" },
    borderWidth: "1.5px",
    borderStyle: "dashed",
    borderColor: "rgb(250 250 250 / 0.16)",
    borderRadius: "1.5rem",
  },
  loopTitle: {
    margin: "0 0 0.5rem",
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: "clamp(1.375rem, 1.1rem + 0.7vw, 1.75rem)",
    letterSpacing: "-0.02em",
    color: colors.text,
  },
  loopText: {
    margin: "0 0 1.5rem",
    maxWidth: "34rem",
    color: colors.textMuted,
    lineHeight: 1.6,
  },
});

export default HomeEvents;
