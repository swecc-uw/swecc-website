import React, { useEffect, useMemo, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button, Heading, Text } from "../components";
import {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  media,
  radii,
} from "../components/tokens.stylex";
import {
  type CalendarEvent,
  GOOGLE_CALENDAR_OPEN_URL,
  dateKey,
  eventsOnDay,
  formatEventRange,
  formatEventTime,
  laNoon,
  laParts,
  loadGoogleCalendarEvents,
} from "./Utils/googleCalendar";
import { useMounted } from "./Utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(date: Date) {
  const { year, month } = laParts(date);
  return laNoon(year, month, 1);
}

function addMonths(date: Date, count: number) {
  const { year, month } = laParts(date);
  return laNoon(year, month + count, 1);
}

function dayLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

function isSameDay(a: Date, b: Date) {
  return dateKey(a) === dateKey(b);
}

function monthCells(visibleMonth: Date) {
  const { year, month } = laParts(visibleMonth);
  const first = laNoon(year, month, 1);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
  }).format(first);
  const offset = WEEKDAYS.indexOf(weekday);
  return Array.from({ length: 42 }, (_, index) =>
    laNoon(year, month, 1 - offset + index),
  );
}

type EventCardProps = {
  event: CalendarEvent;
  open: boolean;
  onToggle: () => void;
};

function EventCard({ event, open, onToggle }: EventCardProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={event.description ? open : undefined}
        {...stylex.props(styles.eventCard, open && styles.eventCardOpen)}
      >
        <span {...stylex.props(styles.eventTime)}>
          {formatEventRange(event)}
        </span>
        <span {...stylex.props(styles.eventTitle)}>{event.title}</span>
        {event.location && (
          <span {...stylex.props(styles.eventLocation)}>{event.location}</span>
        )}
        {open && event.description && (
          <Text style={styles.eventDescription}>{event.description}</Text>
        )}
      </button>
    </li>
  );
}

function Calendar() {
  // The month grid depends on the clock, so it only exists client-side.
  const mounted = useMounted();
  const [today] = useState(() => new Date());
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [openEventId, setOpenEventId] = useState("");

  useEffect(() => {
    let cancelled = false;
    loadGoogleCalendarEvents()
      .then((loaded) => {
        if (cancelled) return;
        setEvents(loaded);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cells = useMemo(() => monthCells(visibleMonth), [visibleMonth]);
  const selectedEvents = useMemo(
    () => eventsOnDay(events, selectedDay),
    [events, selectedDay],
  );
  const upcoming = useMemo(
    () => events.filter((event) => event.end > today).slice(0, 8),
    [events, today],
  );

  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
  const selectedLabel = dayLabel(selectedDay);

  // Dates differ between the prerendered HTML and a later visit, so the
  // calendar only mounts client-side; hydration attaches to this shell.
  if (!mounted) {
    return (
      <div {...stylex.props(styles.calendar)}>
        <section aria-label="Monthly calendar" {...stylex.props(styles.panel)}>
          <Text style={styles.empty}>Loading events…</Text>
        </section>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div {...stylex.props(styles.error)}>
        Could not load SWECC events.{" "}
        <a
          href={GOOGLE_CALENDAR_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Google Calendar
        </a>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.calendar)}>
      <section aria-label="Monthly calendar" {...stylex.props(styles.panel)}>
        <div {...stylex.props(styles.toolbar)}>
          <Heading level={2} style={styles.monthLabel}>
            {monthLabel}
          </Heading>
          <div {...stylex.props(styles.toolbarActions)}>
            <div {...stylex.props(styles.navButtons)}>
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
                {...stylex.props(styles.iconButton)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
                {...stylex.props(styles.iconButton)}
              >
                ›
              </button>
            </div>
            <Button
              size="sm"
              variant="outline"
              style={styles.toolbarButton}
              onClick={() => {
                setVisibleMonth(startOfMonth(today));
                setSelectedDay(today);
              }}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant="primary"
              style={styles.toolbarButton}
              href={GOOGLE_CALENDAR_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Calendar
            </Button>
          </div>
        </div>

        <div aria-hidden="true" {...stylex.props(styles.week)}>
          {WEEKDAYS.map((day) => (
            <span key={day} {...stylex.props(styles.weekday)}>
              {day}
            </span>
          ))}
        </div>

        <div {...stylex.props(styles.week)}>
          {cells.map((day) => {
            const dayEvents = eventsOnDay(events, day);
            const extra = Math.max(0, dayEvents.length - 2);
            const inMonth = laParts(day).month === laParts(visibleMonth).month;
            const label = `${dayLabel(day)}, ${dayEvents.length === 1 ? "1 event" : `${dayEvents.length} events`}`;
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, selectedDay);

            return (
              <button
                key={dateKey(day)}
                type="button"
                onClick={() => setSelectedDay(day)}
                aria-label={label}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                {...stylex.props(
                  styles.day,
                  !inMonth && styles.dayMuted,
                  isSelected && styles.daySelected,
                )}
              >
                <span
                  {...stylex.props(
                    styles.dayNumber,
                    isToday && styles.dayNumberToday,
                  )}
                >
                  {laParts(day).day}
                </span>
                {dayEvents.slice(0, 2).map((event) => (
                  <span
                    key={`${event.uid}-${event.start.toISOString()}`}
                    {...stylex.props(styles.dayEvent)}
                  >
                    {formatEventTime(event)} {event.title}
                  </span>
                ))}
                {extra > 0 && (
                  <span {...stylex.props(styles.dayMore)}>+{extra} more</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <aside {...stylex.props(styles.panel)}>
        <div aria-live="polite">
          <Heading level={2} style={styles.agendaHeading}>
            {selectedLabel}
          </Heading>
          {status === "loading" ? (
            <Text style={styles.empty}>Loading events…</Text>
          ) : selectedEvents.length === 0 ? (
            <Text style={styles.empty}>No events on this day.</Text>
          ) : (
            <ul {...stylex.props(styles.eventList)}>
              {selectedEvents.map((event) => {
                const id = `${event.uid}-${event.start.toISOString()}`;
                return (
                  <EventCard
                    key={id}
                    event={event}
                    open={openEventId === id}
                    onToggle={() =>
                      setOpenEventId((current) => (current === id ? "" : id))
                    }
                  />
                );
              })}
            </ul>
          )}
        </div>

        <div>
          <Heading
            level={3}
            style={[styles.agendaHeading, styles.upcomingHeading]}
          >
            Upcoming
          </Heading>
          {status === "loading" ? null : upcoming.length === 0 ? (
            <Text style={styles.empty}>
              No upcoming events on the SWECC calendar.
            </Text>
          ) : (
            <ul {...stylex.props(styles.eventList)}>
              {upcoming.map((event) => {
                const id = `up-${event.uid}-${event.start.toISOString()}`;
                return (
                  <EventCard
                    key={id}
                    event={event}
                    open={openEventId === id}
                    onToggle={() =>
                      setOpenEventId((current) => (current === id ? "" : id))
                    }
                  />
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}

const styles = stylex.create({
  calendar: {
    width: "min(70rem, 100%)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1.6fr) minmax(17.5rem, 0.9fr)",
      [media.max900]: "1fr",
    },
    gap: "1.5rem",
    alignItems: "start",
    color: colors.text,
  },
  error: {
    width: "min(70rem, 100%)",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    color: colors.danger,
    fontFamily: fonts.sans,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: { default: "1.25rem", [media.max600]: "0.875rem" },
    boxSizing: "border-box",
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.125rem",
  },
  monthLabel: {
    margin: 0,
    fontFamily: fonts.mono,
    color: colors.primary,
    whiteSpace: { default: "nowrap", [media.max900]: "normal" },
    width: { default: null, [media.max900]: "100%" },
    flex: "1 1 auto",
  },
  toolbarActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    marginLeft: "auto",
  },
  navButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  iconButton: {
    width: { default: "2.25rem", [media.max600]: "2.75rem" },
    height: { default: "2.25rem", [media.max600]: "2.75rem" },
    borderRadius: radii.sm,
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: { default: colors.surfaceRaised, ":hover": colors.primary },
    backgroundColor: colors.surfaceRaised,
    color: { default: colors.text, ":hover": colors.primary },
    cursor: "pointer",
    fontSize: "1.125rem",
    lineHeight: 1,
  },
  toolbarButton: {
    width: "auto",
    height: { default: "2.25rem", [media.max600]: "2.75rem" },
    padding: "0 0.875rem",
  },
  week: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  },
  weekday: {
    fontFamily: fonts.sans,
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.textSubtle,
    textAlign: "center",
    padding: "0.5rem 0",
  },
  day: {
    minHeight: {
      default: "5.75rem",
      [media.max900]: "4.5rem",
      [media.max600]: "3.25rem",
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.surfaceRaised,
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(250, 250, 250, 0.04)",
    },
    color: "inherit",
    textAlign: "left",
    padding: { default: "0.375rem", [media.max600]: "0.25rem 2px" },
    cursor: "pointer",
    display: "flex",
    flexDirection: { default: "column", [media.max600]: "row" },
    flexWrap: { default: null, [media.max600]: "wrap" },
    alignContent: { default: null, [media.max600]: "flex-start" },
    justifyContent: { default: null, [media.max600]: "center" },
    gap: { default: "0.25rem", [media.max600]: "0.1875rem" },
  },
  dayMuted: {
    color: colors.textSubtle,
  },
  daySelected: {
    outline: `2px solid ${colors.primary}`,
    outlineOffset: "-2px",
    backgroundColor: {
      default: "rgba(126, 162, 102, 0.12)",
      ":hover": "rgba(250, 250, 250, 0.04)",
    },
  },
  dayNumber: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fonts.sans,
    fontSize: "0.8125rem",
    fontWeight: 700,
    marginInline: {
      default: null,
      [media.max600]: "calc((100% - 1.5rem) / 2)",
    },
  },
  dayNumberToday: {
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
  },
  dayEvent: {
    fontSize: { default: "0.75rem", [media.max600]: 0 },
    lineHeight: 1.2,
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    borderRadius: { default: radii.xs, [media.max600]: "50%" },
    padding: { default: "2px 0.3125rem", [media.max600]: 0 },
    width: { default: null, [media.max600]: "0.375rem" },
    height: { default: null, [media.max600]: "0.375rem" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dayMore: {
    display: { default: null, [media.max600]: "none" },
    fontSize: "0.75rem",
    color: colors.text,
    fontFamily: fonts.sans,
    fontWeight: 700,
  },
  agendaHeading: {
    fontFamily: fonts.sans,
    color: colors.primary,
    margin: "0 0 0.75rem",
  },
  upcomingHeading: {
    marginTop: "1.75rem",
  },
  empty: {
    color: colors.textSubtle,
    margin: 0,
  },
  eventList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
  },
  eventCard: {
    width: "100%",
    textAlign: "left",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: colors.border, ":hover": colors.primary },
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: radii.md,
    padding: "0.75rem",
    cursor: "pointer",
  },
  eventCardOpen: {
    borderColor: colors.primary,
  },
  eventTime: {
    display: "block",
    fontFamily: fonts.mono,
    fontSize: fontSizes.small,
    color: colors.primary,
    marginBottom: "0.25rem",
  },
  eventTitle: {
    display: "block",
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: fontSizes.h5,
  },
  eventLocation: {
    display: "block",
    fontSize: fontSizes.small,
    color: colors.textSubtle,
    marginTop: "0.25rem",
  },
  eventDescription: {
    margin: "0.625rem 0 0",
    fontSize: fontSizes.small,
    lineHeight: lineHeights.body,
    whiteSpace: "pre-wrap",
  },
});

export default Calendar;
