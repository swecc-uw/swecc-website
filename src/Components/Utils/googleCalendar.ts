export const GOOGLE_CALENDAR_ID = "swecc@uw.edu";
export const GOOGLE_CALENDAR_ICS_PATH =
  "/calendar/ical/swecc%40uw.edu/public/basic.ics";
export const GOOGLE_CALENDAR_ICS_URL = `https://calendar.google.com${GOOGLE_CALENDAR_ICS_PATH}`;
export const GOOGLE_CALENDAR_OPEN_URL = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(GOOGLE_CALENDAR_ID)}`;

const TZ = "America/Los_Angeles";

export type CalendarEvent = {
  uid: string;
  title: string;
  location: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  rrule: string;
  exdates: Date[];
};

type IcsDate = { date: Date; allDay: boolean; timeZone: string };

type ParsedEvent = { event: CalendarEvent; timeZone: string };

function unfoldIcs(text: string) {
  return text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}

function unescapeIcs(value: string) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function stripHtml(html: string) {
  return unescapeIcs(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseIcsUtc(stamp: string) {
  const m = stamp.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (!m) return new Date(NaN);
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
}

function wallClockDate(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return new Date(
    Date.UTC(
      +parts.year,
      +parts.month - 1,
      +parts.day,
      parts.hour === "24" ? 0 : +parts.hour,
      +parts.minute,
      +parts.second,
    ),
  );
}

function zonedLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string,
) {
  return wallClockToUtc(
    new Date(Date.UTC(year, month - 1, day, hour, minute, second)),
    timeZone,
  );
}

function wallClockToUtc(wallClock: Date, timeZone: string) {
  const requested = wallClock.getTime();
  const offset = wallClockDate(wallClock, timeZone).getTime() - requested;
  const candidate = new Date(requested - offset);
  const difference = wallClockDate(candidate, timeZone).getTime() - requested;
  if (difference === 0) return candidate;
  const corrected = new Date(candidate.getTime() - difference);
  return wallClockDate(corrected, timeZone).getTime() === requested
    ? corrected
    : candidate;
}

function parseIcsDate(property: string): IcsDate {
  const [meta, raw] = property.split(/:(.+)/);
  const params = meta;
  const value = (raw || "").trim();

  if (!value) return { date: new Date(NaN), allDay: false, timeZone: TZ };

  if (params.includes("VALUE=DATE") || /^\d{8}$/.test(value)) {
    return {
      date: zonedLocalToUtc(
        +value.slice(0, 4),
        +value.slice(4, 6),
        +value.slice(6, 8),
        12,
        0,
        0,
        TZ,
      ),
      allDay: true,
      timeZone: TZ,
    };
  }

  if (value.endsWith("Z")) {
    return { date: parseIcsUtc(value), allDay: false, timeZone: "UTC" };
  }

  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
  if (!m) return { date: new Date(NaN), allDay: false, timeZone: TZ };

  const tzMatch = params.match(/TZID=([^;:]+)/);
  const timeZone = tzMatch ? tzMatch[1] : TZ;
  return {
    date: zonedLocalToUtc(+m[1], +m[2], +m[3], +m[4], +m[5], +m[6], timeZone),
    allDay: false,
    timeZone,
  };
}

function getLines(block: string, key: string) {
  const lines = block.split(/\r?\n/);
  const prefix = `${key}:`;
  const prefixParam = `${key};`;
  return lines.filter(
    (line) => line.startsWith(prefix) || line.startsWith(prefixParam),
  );
}

function getLine(block: string, key: string) {
  return getLines(block, key)[0] || "";
}

function parseExdates(block: string) {
  const dates: Date[] = [];
  getLines(block, "EXDATE").forEach((line) => {
    const sep = line.indexOf(":");
    if (sep === -1) return;
    const meta = line.slice(0, sep);
    line
      .slice(sep + 1)
      .split(",")
      .forEach((value) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        const parsed = parseIcsDate(`${meta}:${trimmed}`);
        if (!Number.isNaN(parsed.date.getTime())) {
          dates.push(parsed.date);
        }
      });
  });
  return dates;
}

function recurrenceRangeEnd(from = new Date()) {
  const end = new Date(from.getTime());
  end.setFullYear(end.getFullYear() + 1);
  return end;
}

function parseVEvent(block: string): ParsedEvent {
  const startLine = getLine(block, "DTSTART");
  const endLine = getLine(block, "DTEND");
  const start = parseIcsDate(startLine);
  const end: IcsDate = endLine ? parseIcsDate(endLine) : { ...start };
  if (start.allDay && end.date <= start.date) {
    const next = wallClockDate(start.date, start.timeZone);
    next.setUTCDate(next.getUTCDate() + 1);
    end.date = wallClockToUtc(next, start.timeZone);
  }

  const summary = unescapeIcs(
    getLine(block, "SUMMARY").split(/:(.+)/)[1] || "",
  ).trim();
  const location = unescapeIcs(
    getLine(block, "LOCATION").split(/:(.+)/)[1] || "",
  ).trim();
  const description = stripHtml(
    getLine(block, "DESCRIPTION").split(/:(.+)/)[1] || "",
  );
  const uid = (getLine(block, "UID").split(/:(.+)/)[1] || "").trim();
  const rrule = (getLine(block, "RRULE").split(/:(.+)/)[1] || "").trim();
  const exdates = parseExdates(block);

  return {
    event: {
      uid,
      title: summary || "(No title)",
      location,
      description,
      start: start.date,
      end: end.date,
      allDay: start.allDay,
      rrule,
      exdates,
    },
    timeZone: start.timeZone,
  };
}

function expandWeekly(
  { event, timeZone }: ParsedEvent,
  rangeEnd: Date,
): CalendarEvent[] {
  if (!event.rrule || !event.rrule.includes("FREQ=WEEKLY")) {
    return [event];
  }

  let until = rangeEnd;
  const untilMatch = event.rrule.match(/UNTIL=(\d{8}T\d{6}Z|\d{8})/);
  if (untilMatch) {
    const ruleUntil = untilMatch[1].includes("T")
      ? parseIcsUtc(untilMatch[1])
      : zonedLocalToUtc(
          +untilMatch[1].slice(0, 4),
          +untilMatch[1].slice(4, 6),
          +untilMatch[1].slice(6, 8),
          23,
          59,
          59,
          TZ,
        );
    if (ruleUntil < until) until = ruleUntil;
  }

  const countMatch = event.rrule.match(/(?:^|;)COUNT=(\d+)(?:;|$)/);
  const count = countMatch ? +countMatch[1] : Infinity;
  const duration = event.end.getTime() - event.start.getTime();
  const instances: CalendarEvent[] = [];
  const cursor = wallClockDate(event.start, timeZone);
  const endCursor = event.allDay ? wallClockDate(event.end, timeZone) : null;
  let start = event.start;
  while (start.getTime() <= until.getTime() && instances.length < count) {
    instances.push({
      ...event,
      start: new Date(start),
      end: endCursor
        ? wallClockToUtc(endCursor, timeZone)
        : new Date(start.getTime() + duration),
      rrule: "",
    });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
    if (endCursor) endCursor.setUTCDate(endCursor.getUTCDate() + 7);
    start = wallClockToUtc(cursor, timeZone);
  }
  return instances;
}

export function dateKey(date: Date, timeZone = TZ) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

export function laParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return {
    year: +parts.year,
    month: +parts.month,
    day: +parts.day,
  };
}

export function laNoon(year: number, month: number, day: number) {
  return zonedLocalToUtc(year, month, day, 12, 0, 0, TZ);
}

export function parseIcsEvents(
  icsText: string,
  options: { rangeEnd?: Date } = {},
): CalendarEvent[] {
  const rangeEnd = options.rangeEnd || recurrenceRangeEnd();
  const unfolded = unfoldIcs(icsText);
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1);
  const parsed = blocks
    .map((block) => parseVEvent(block.split("END:VEVENT")[0]))
    .filter(({ event }) => !Number.isNaN(event.start.getTime()));

  const exceptions = new Set<string>();
  const recurring: ParsedEvent[] = [];
  const singles: CalendarEvent[] = [];

  parsed.forEach((parsedEvent) => {
    const { event } = parsedEvent;
    (event.exdates || []).forEach((date) => {
      exceptions.add(`${event.uid}|${dateKey(date)}`);
    });
    if (event.rrule) {
      recurring.push(parsedEvent);
    } else {
      singles.push(event);
      exceptions.add(`${event.uid}|${dateKey(event.start)}`);
    }
  });

  const expanded = recurring
    .flatMap((event) => expandWeekly(event, rangeEnd))
    .filter((event) => !exceptions.has(`${event.uid}|${dateKey(event.start)}`));

  return [...expanded, ...singles].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
}

export async function loadGoogleCalendarEvents() {
  const urls: string[] = [];
  if (import.meta.env.DEV) {
    urls.push("/api/google-calendar.ics");
  }
  urls.push("/calendar.ics");

  let lastError: unknown;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      if (text.includes("BEGIN:VCALENDAR")) {
        return parseIcsEvents(text);
      }
      lastError = new Error(`Unexpected calendar response from ${url}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Could not load Google Calendar");
}

export function eventsOnDay(events: CalendarEvent[], day: Date) {
  const key = dateKey(day);
  return events.filter((event) => {
    if (event.allDay) {
      return key >= dateKey(event.start) && key < dateKey(event.end);
    }
    return dateKey(event.start) === key;
  });
}

export function formatEventTime(event: CalendarEvent, timeZone = TZ) {
  if (event.allDay) return "All day";
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(event.start);
}

export function formatEventRange(event: CalendarEvent, timeZone = TZ) {
  if (event.allDay) return "All day";
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });
  return `${fmt.format(event.start)} – ${fmt.format(event.end)}`;
}
