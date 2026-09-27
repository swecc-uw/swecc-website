import "../CSS/Events.css";
import Calendar from "./Calendar";

function Events() {
  return (
    <div className="event-page">
      <div className="event-page-intro">
          <h1 className="event-headers mono">Upcoming Events</h1>
      </div>

      <div className="upcoming-events-section">
        <Calendar />
      </div>
    </div>
  );
}

export default Events;
