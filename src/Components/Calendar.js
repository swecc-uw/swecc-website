import React, { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import {
  GOOGLE_CALENDAR_OPEN_URL,
  dateKey,
  eventsOnDay,
  formatEventRange,
  formatEventTime,
  laNoon,
  laParts,
  loadGoogleCalendarEvents,
} from "./Utils/googleCalendar";
import "../CSS/Calendar.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(date) {
  const { year, month } = laParts(date);
  return laNoon(year, month, 1);
}

function addMonths(date, count) {
  const { year, month } = laParts(date);
  return laNoon(year, month + count, 1);
}

function isSameDay(a, b) {
  return dateKey(a) === dateKey(b);
}

function monthCells(visibleMonth) {
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

function EventCard({ event, open, onToggle }) {
  return (
    <li>
      <button
        type="button"
        className={`calendar-event-card${open ? " calendar-event-card--open" : ""}`}
        onClick={onToggle}
      >
        <span className="calendar-event-time">{formatEventRange(event)}</span>
        <span className="calendar-event-title">{event.title}</span>
        {event.location && (
          <span className="calendar-event-location">{event.location}</span>
        )}
        {open && event.description && (
          <p className="calendar-event-description">{event.description}</p>
        )}
      </button>
    </li>
  );
}

function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
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
  const upcoming = useMemo(() => {
    const now = new Date();
    return events.filter((event) => event.end > now).slice(0, 8);
  }, [events]);

  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
  const selectedLabel = selectedDay.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });

  if (status === "loading") {
    return <div className="swecc-calendar--message">Loading calendar…</div>;
  }

  if (status === "error") {
    return (
      <div className="swecc-calendar--error">
        Could not load SWECC events.{" "}
        <a href={GOOGLE_CALENDAR_OPEN_URL} target="_blank" rel="noopener noreferrer">
          Open Google Calendar
        </a>
      </div>
    );
  }

  return (
    <div className="swecc-calendar">
      <section className="calendar-board" aria-label="Monthly calendar">
        <div className="calendar-toolbar">
          <h2 className="calendar-month-label mono">{monthLabel}</h2>
          <div className="calendar-toolbar-actions">
            <div className="calendar-nav-buttons">
              <button
                type="button"
                className="calendar-icon-btn"
                aria-label="Previous month"
                onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
              >
                ‹
              </button>
              <button
                type="button"
                className="calendar-icon-btn"
                aria-label="Next month"
                onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
              >
                ›
              </button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setVisibleMonth(startOfMonth(today));
                setSelectedDay(today);
              }}
            >
              Today
            </Button>
            <Button size="sm" variant="primary" href={GOOGLE_CALENDAR_OPEN_URL} target="_blank" rel="noopener noreferrer">
              Google Calendar
            </Button>
          </div>
        </div>

        <div className="calendar-weekdays" aria-hidden="true">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-grid" role="grid">
          {cells.map((day) => {
            const dayEvents = eventsOnDay(events, day);
            const extra = Math.max(0, dayEvents.length - 2);
            const inMonth = laParts(day).month === laParts(visibleMonth).month;
            const classes = [
              "calendar-day",
              inMonth ? "" : "calendar-day--muted",
              isSameDay(day, today) ? "calendar-day--today" : "",
              isSameDay(day, selectedDay) ? "calendar-day--selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={dateKey(day)}
                type="button"
                className={classes}
                onClick={() => setSelectedDay(day)}
              >
                <span className="calendar-day-number">{laParts(day).day}</span>
                {dayEvents.slice(0, 2).map((event) => (
                  <span
                    key={`${event.uid}-${event.start.toISOString()}`}
                    className="calendar-day-event"
                  >
                    {formatEventTime(event)} {event.title}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="calendar-day-more">+{extra} more</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <aside className="calendar-agenda">
        <h2 className="sans">{selectedLabel}</h2>
        {selectedEvents.length === 0 ? (
          <p className="calendar-empty">No events on this day.</p>
        ) : (
          <ul className="calendar-event-list">
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

        <div className="calendar-upcoming">
          <h3 className="sans">Upcoming</h3>
          {upcoming.length === 0 ? (
            <p className="calendar-empty">No upcoming events on the SWECC calendar.</p>
          ) : (
            <ul className="calendar-event-list">
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

export default Calendar;
