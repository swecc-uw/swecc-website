import "../CSS/Events.css";
import { links } from "../Components/Utils/Utils";

function Events() {
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
            src={links.resources.calendar}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Events;
