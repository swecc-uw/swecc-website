import assert from "node:assert/strict";
import test from "node:test";
import {
  eventsOnDay,
  formatEventTime,
  parseIcsEvents,
} from "../src/Components/Utils/googleCalendar.ts";

function calendar(...properties) {
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

function starts(ics, rangeEnd) {
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
  assert.deepEqual(
    events.map((event) => event.start.toISOString()),
    ["2026-10-29T00:30:00.000Z", "2026-11-05T01:30:00.000Z"],
  );
  assert.deepEqual(
    events.map((event) => formatEventTime(event)),
    ["5:30 PM", "5:30 PM"],
  );
  assert.deepEqual(
    events.map((event) => event.end.toISOString()),
    ["2026-10-29T01:30:00.000Z", "2026-11-05T02:30:00.000Z"],
  );
});

test("weekly meetings keep their local time when daylight saving begins", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20260304T173000",
        "DTEND;TZID=America/Los_Angeles:20260304T183000",
        "RRULE:FREQ=WEEKLY",
      ),
      "2026-03-12T01:00:00Z",
    ),
    ["2026-03-05T01:30:00.000Z", "2026-03-12T00:30:00.000Z"],
  );
});

test("COUNT includes the first meeting and limits expansion", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261028T173000",
        "DTEND;TZID=America/Los_Angeles:20261028T183000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-10-29T00:30:00.000Z", "2026-11-05T01:30:00.000Z"],
  );
});

test("excluded meetings do not extend COUNT", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261028T173000",
        "DTEND;TZID=America/Los_Angeles:20261028T183000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
        "EXDATE;TZID=America/Los_Angeles:20261104T173000",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-10-29T00:30:00.000Z"],
  );
});

test("UTC meetings keep their UTC time across daylight saving", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART:20261029T003000Z",
        "DTEND:20261029T013000Z",
        "RRULE:FREQ=WEEKLY;UNTIL=20261105T003000Z",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-10-29T00:30:00.000Z", "2026-11-05T00:30:00.000Z"],
  );
});

test("meetings use their source timezone instead of the site timezone", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=Europe/London:20261021T173000",
        "DTEND;TZID=Europe/London:20261021T183000",
        "RRULE:FREQ=WEEKLY;UNTIL=20261028T173000Z",
      ),
      "2026-10-29T00:00:00Z",
    ),
    ["2026-10-21T16:30:00.000Z", "2026-10-28T17:30:00.000Z"],
  );
});

test("floating meetings use Los Angeles time", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART:20261028T173000",
        "DTEND:20261028T183000",
        "RRULE:FREQ=WEEKLY;UNTIL=20261105T013000Z",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-10-29T00:30:00.000Z", "2026-11-05T01:30:00.000Z"],
  );
});

test("all-day weekly events stay on their calendar dates", () => {
  const events = parseIcsEvents(
    calendar(
      "DTSTART;VALUE=DATE:20261028",
      "DTEND;VALUE=DATE:20261029",
      "RRULE:FREQ=WEEKLY;COUNT=2",
    ),
    { rangeEnd: new Date("2026-11-20T00:00:00Z") },
  );
  assert.deepEqual(
    events.map((event) => event.start.toISOString()),
    ["2026-10-28T19:00:00.000Z", "2026-11-04T20:00:00.000Z"],
  );
  assert.equal(eventsOnDay(events, new Date("2026-11-04T20:00:00Z")).length, 1);
  assert.equal(eventsOnDay(events, new Date("2026-11-05T20:00:00Z")).length, 0);
});

test("one-off events retain their dates and descriptions", () => {
  const events = parseIcsEvents(
    calendar(
      "DTSTART:20261029T003000Z",
      "DTEND:20261029T013000Z",
      "DESCRIPTION:Bring a laptop.",
    ),
  );
  assert.deepEqual(
    events.map((event) => ({
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      description: event.description,
    })),
    [
      {
        start: "2026-10-29T00:30:00.000Z",
        end: "2026-10-29T01:30:00.000Z",
        description: "Bring a laptop.",
      },
    ],
  );
});

test("spring transition mornings use the offset at the event time", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20260301T033000",
        "DTEND;TZID=America/Los_Angeles:20260301T043000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-03-20T00:00:00Z",
    ),
    ["2026-03-01T11:30:00.000Z", "2026-03-08T10:30:00.000Z"],
  );
});

test("fall transition mornings use the offset at the event time", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261025T023000",
        "DTEND;TZID=America/Los_Angeles:20261025T033000",
        "RRULE:FREQ=WEEKLY;COUNT=2",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-10-25T09:30:00.000Z", "2026-11-01T10:30:00.000Z"],
  );
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
  assert.deepEqual(
    events.map((event) => ({
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    })),
    [
      { start: "2026-03-07T20:00:00.000Z", end: "2026-03-09T19:00:00.000Z" },
      { start: "2026-03-14T19:00:00.000Z", end: "2026-03-16T19:00:00.000Z" },
    ],
  );
});

test("spring clock gaps retain the existing forward resolution", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20260308T023000",
        "DTEND;TZID=America/Los_Angeles:20260308T043000",
      ),
      "2026-03-20T00:00:00Z",
    ),
    ["2026-03-08T10:30:00.000Z"],
  );
});

test("repeated fall clock times retain their first occurrence", () => {
  assert.deepEqual(
    starts(
      calendar(
        "DTSTART;TZID=America/Los_Angeles:20261101T013000",
        "DTEND;TZID=America/Los_Angeles:20261101T023000",
      ),
      "2026-11-20T00:00:00Z",
    ),
    ["2026-11-01T08:30:00.000Z"],
  );
});
