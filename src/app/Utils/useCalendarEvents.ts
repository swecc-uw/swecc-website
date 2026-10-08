import { useEffect, useState } from "react";
import { type CalendarEvent, loadGoogleCalendarEvents } from "./googleCalendar";

type CalendarState =
  | { status: "loading"; events: CalendarEvent[] }
  | { status: "ready"; events: CalendarEvent[] }
  | { status: "error"; events: CalendarEvent[] };

// Shared so every component on a page reads one fetch of the calendar.
let request: Promise<CalendarEvent[]> | null = null;

function loadOnce() {
  request ??= loadGoogleCalendarEvents().catch((error: unknown) => {
    request = null;
    throw error;
  });
  return request;
}

/** Loads the SWECC calendar once per page, client-side. */
export function useCalendarEvents(): CalendarState {
  const [state, setState] = useState<CalendarState>({
    status: "loading",
    events: [],
  });

  useEffect(() => {
    let cancelled = false;
    loadOnce()
      .then((events) => {
        if (!cancelled) setState({ status: "ready", events });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", events: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
