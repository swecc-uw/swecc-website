import "../CSS/Events.css";
import { InstagramEmbed } from "react-social-media-embed";
import events from "../Data/events.json";

function Events() {
  const calendarLink =
    "https://calendar.google.com/calendar/embed?src=swecc%40uw.edu&ctz=America%2FLos_Angeles";
  return (
    <div className="event-page">
      <div className="event-page-intro">
        <h1 className="event-headers">Upcoming Events</h1>
      </div>

      <div className="upcoming-events-section">
        <div align="center">
          <iframe
            title="calendar"
            className="calendar"
            src={calendarLink}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Events;
