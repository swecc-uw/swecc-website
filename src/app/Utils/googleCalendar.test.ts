import { expect, test } from "vitest";
import {
  addToCalendarUrl,
  eventSummary,
  eventsOnDay,
  formatEventTime,
  isNewEvent,
  parseIcsEvents,
  upcomingEvents,
} from "./googleCalendar";

function calendar(...properties: string[]) {
  return [
    "BEGIN:VCALENDAR",
    "BEGIN:VEVENT",
    "UID:weekly-meeting",
    "SUMMARY:Weekly meeting",
    ...properties,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function starts(ics: string, rangeEnd: string) {
  return parseIcsEvents(ics, { rangeEnd: new Date(rangeEnd) }).map((event) =>
    event.start.toISOString(),
  );
}

test("weekly meetings keep their local time when daylight saving ends", () => {
  const events = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261028T173000",
      "DTEND;TZID=America/Los_Angeles:20261028T183000",
      "RRULE:FREQ=WEEKLY;UNTIL=20261105T013000Z",
    ),
    { rangeEnd: new Date("2026-11-20T00:00:00Z") },
  );
  expect(events.map((event) => event.start.toISOString())).toEqual([
    "2026-10-29T00:30:00.000Z",
    "2026-11-05T01:30:00.000Z",
  ]);
  expect(events.map((event) => formatEventTime(event))).toEqual([
    "5:30 PM",
    "5:30 PM",
  ]);
  expect(events.map((event) => event.end.toISOString())).toEqual([
    "2026-10-29T01:30:00.000Z",
    "2026-11-05T02:30:00.000Z",
  ]);
});

test("COUNT includes the first meeting and limits expansion", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261028T173000",
        "DTEND;TZID=America/Los_Angeles:20261028T183000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-10-29T00:30:00.000Z", "2026-11-05T01:30:00.000Z"]);
});

test("excluded meetings do not extend COUNT", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261028T173000",
        "DTEND;TZID=America/Los_Angeles:20261028T183000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
        "EXDATE;TZID=America/Los_Angeles:20261104T173000",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-10-29T00:30:00.000Z"]);
});

test("UTC meetings keep their UTC time across daylight saving", () => {
  expect(
    starts(
      calendar(
        "DTSTART:20261029T003000Z",
        "DTEND:20261029T013000Z",
        "RRULE:FREQ=WEEKLY;UNTIL=20261105T003000Z",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-10-29T00:30:00.000Z", "2026-11-05T00:30:00.000Z"]);
});

test("meetings use their source timezone instead of the site timezone", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=Europe/London:20261021T173000",
        "DTEND;TZID=Europe/London:20261021T183000",
        "RRULE:FREQ=WEEKLY;UNTIL=20261028T173000Z",
      ),
      "2026-10-29T00:00:00Z",
    ),
  ).toEqual(["2026-10-21T16:30:00.000Z", "2026-10-28T17:30:00.000Z"]);
});

test("floating meetings use Los Angeles time", () => {
  expect(
    starts(
      calendar(
        "DTSTART:20261028T173000",
        "DTEND:20261028T183000",
        "RRULE:FREQ=WEEKLY;UNTIL=20261105T013000Z",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-10-29T00:30:00.000Z", "2026-11-05T01:30:00.000Z"]);
});

test("one-off events retain their dates", () => {
  const events = parseIcsEvents(
    calendar("DTSTART:20261029T003000Z", "DTEND:20261029T013000Z"),
  );
  expect(
    events.map((event) => ({
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    })),
  ).toEqual([
    {
      start: "2026-10-29T00:30:00.000Z",
      end: "2026-10-29T01:30:00.000Z",
    },
  ]);
});

test("spring transition mornings use the offset at the event time", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20260301T033000",
        "DTEND;TZID=America/Los_Angeles:20260301T043000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-03-20T00:00:00Z",
    ),
  ).toEqual(["2026-03-01T11:30:00.000Z", "2026-03-08T10:30:00.000Z"]);
});

test("fall transition mornings use the offset at the event time", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261025T023000",
        "DTEND;TZID=America/Los_Angeles:20261025T033000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-10-25T09:30:00.000Z", "2026-11-01T10:30:00.000Z"]);
});

test("all-day recurrences retain their exclusive end date across daylight saving", () => {
  const events = parseIcsEvents(
    calendar(
      "DTSTART;VALUE=DATE:20260307",
      "DTEND;VALUE=DATE:20260309",
      "RRULE:FREQ=WEEKLY;COUNT=2",
    ),
    { rangeEnd: new Date("2026-03-20T00:00:00Z") },
  );
  expect(events.map((event) => event.start.toISOString())).toEqual([
    "2026-03-07T20:00:00.000Z",
    "2026-03-14T19:00:00.000Z",
  ]);
  expect(eventsOnDay(events, new Date("2026-03-14T19:00:00Z")).length).toBe(1);
  expect(eventsOnDay(events, new Date("2026-03-15T19:00:00Z")).length).toBe(1);
  expect(eventsOnDay(events, new Date("2026-03-16T19:00:00Z")).length).toBe(0);
});

test("spring clock gaps retain the existing forward resolution", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20260308T023000",
        "DTEND;TZID=America/Los_Angeles:20260308T043000",
      ),
      "2026-03-20T00:00:00Z",
    ),
  ).toEqual(["2026-03-08T10:30:00.000Z"]);
});

test("repeated fall clock times retain their first occurrence", () => {
  expect(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261101T013000",
        "DTEND;TZID=America/Los_Angeles:20261101T023000",
      ),
      "2026-11-20T00:00:00Z",
    ),
  ).toEqual(["2026-11-01T08:30:00.000Z"]);
});

test("upcoming events skip past events and show each series once", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "BEGIN:VEVENT",
    "UID:weekly-meeting",
    "SUMMARY:Weekly meeting",
    "DTSTART;TZID=America/Los_Angeles:20261007T173000",
    "DTEND;TZID=America/Los_Angeles:20261007T183000",
    "RRULE:FREQ=WEEKLY",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:resume-workshop",
    "SUMMARY:Resume workshop",
    "DTSTART;TZID=America/Los_Angeles:20261016T180000",
    "DTEND;TZID=America/Los_Angeles:20261016T190000",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:kickoff",
    "SUMMARY:Kickoff",
    "DTSTART;TZID=America/Los_Angeles:20261001T180000",
    "DTEND;TZID=America/Los_Angeles:20261001T190000",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const events = parseIcsEvents(ics, {
    rangeEnd: new Date("2026-12-01T00:00:00Z"),
  });
  const upcoming = upcomingEvents(events, new Date("2026-10-08T12:00:00Z"));
  expect(
    upcoming.map((event) => [event.title, event.start.toISOString()]),
  ).toEqual([
    ["Weekly meeting", "2026-10-15T00:30:00.000Z"],
    ["Resume workshop", "2026-10-17T01:00:00.000Z"],
  ]);
  expect(
    upcomingEvents(events, new Date("2026-10-08T12:00:00Z"), 1),
  ).toHaveLength(1);
});

test("events added in the last two weeks are new", () => {
  const [event] = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261016T180000",
      "DTEND;TZID=America/Los_Angeles:20261016T190000",
      "CREATED:20261001T120000Z",
    ),
  );
  expect(event.created?.toISOString()).toBe("2026-10-01T12:00:00.000Z");
  expect(isNewEvent(event, new Date("2026-10-08T12:00:00Z"))).toBe(true);
  expect(isNewEvent(event, new Date("2026-10-20T12:00:00Z"))).toBe(false);

  const [undated] = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261016T180000",
      "DTEND;TZID=America/Los_Angeles:20261016T190000",
    ),
  );
  expect(undated.created).toBeNull();
  expect(isNewEvent(undated, new Date("2026-10-08T12:00:00Z"))).toBe(false);
});

test("add-to-calendar links carry the event's UTC times and place", () => {
  const [event] = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261016T180000",
      "DTEND;TZID=America/Los_Angeles:20261016T190000",
      "LOCATION:CSE2 G10",
    ),
  );
  const url = new URL(addToCalendarUrl(event));
  expect(url.searchParams.get("text")).toBe("Weekly meeting");
  expect(url.searchParams.get("dates")).toBe(
    "20261017T010000Z/20261017T020000Z",
  );
  expect(url.searchParams.get("location")).toBe("CSE2 G10");
});

test("event summaries keep the first paragraph and drop bare links", () => {
  const [event] = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261016T180000",
      "DESCRIPTION:Bring your resume and get feedback from mentors.\\n\\nZoom: https://example.com/j/1",
    ),
  );
  expect(eventSummary(event)).toBe(
    "Bring your resume and get feedback from mentors.",
  );
  const [linkOnly] = parseIcsEvents(
    calendar(
      "DTSTART;TZID=America/Los_Angeles:20261016T180000",
      "DESCRIPTION:Zoom link: https://example.com/j/1",
    ),
  );
  expect(eventSummary(linkOnly)).toBe("");
});
