import "../CSS/Events.css";
import Calendar from "./Calendar";

function Events() {
  return (
    <div className="event-page">
      <div className="event-page-intro">
        <h1 className="event-headers mono">Upcoming Events</h1>
        <p className="event-page-description">
          Grow your skills through workshops and SWECC meetings on professional
          development, resume building, mentor circles, and more. Meet peers who
          share your goals and take your next step toward a career in software.
        </p>
      </div>

      <div className="upcoming-events-section">
        <Calendar />
      </div>
    </div>
  );
}

export default Events;
