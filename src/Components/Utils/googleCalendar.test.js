import { dateKey, parseIcsEvents } from "./googleCalendar";

const weekly = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;TZID=America/Los_Angeles:20240403T173000
DTEND;TZID=America/Los_Angeles:20240403T183000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20240606T065959Z;BYDAY=WE
EXDATE;TZID=America/Los_Angeles:20240605T173000
UID:meet@google.com
SUMMARY:SWECC General Meeting
END:VEVENT
END:VCALENDAR`;

test("skips EXDATE occurrences of a weekly event", () => {
  const keys = parseIcsEvents(weekly).map((event) => dateKey(event.start));
  expect(keys).toContain("2024-04-03");
  expect(keys).toContain("2024-05-29");
  expect(keys).not.toContain("2024-06-05");
});

test("open weekly recurrences expand through the current-date range, not DTSTART + 1 year", () => {
  const ics = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;TZID=America/Los_Angeles:20200108T173000
DTEND;TZID=America/Los_Angeles:20200108T183000
RRULE:FREQ=WEEKLY;BYDAY=WE
UID:open@google.com
SUMMARY:Ongoing meeting
END:VEVENT
END:VCALENDAR`;

  const rangeEnd = new Date("2026-09-17T12:00:00Z");
  const events = parseIcsEvents(ics, { rangeEnd });
  const years = new Set(events.map((event) => dateKey(event.start).slice(0, 4)));

  expect(years.has("2020")).toBe(true);
  expect(years.has("2026")).toBe(true);
  expect(events.every((event) => event.start.getTime() <= rangeEnd.getTime())).toBe(
    true,
  );
});
