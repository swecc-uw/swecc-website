import "../CSS/Events.css";
import { InstagramEmbed } from "react-social-media-embed";
import events from "../Data/events.json";

function Events() {
  const upcomingEventsList = events.map((event, index) => (
    <div key={index} className="upcoming-event">
      <img src={require(`../Data/img/${event.image}`)} className="upcoming-event-image" alt={event.title} />
      <div className="upcoming-event-info">
        <h3>{event.title}</h3>
        <p>{event.timeAndPlace}</p>
        <p>{event.description}</p>
        {event.publish && !event.end ? (
          <a href={event.rsvp} target="_blank" rel="noopener noreferrer">
            <button type="button" className="rsvp-btn">
              RSVP
            </button>
          </a>
        ) : (
          <p className="event-status">{event.publish ? (event.end ? "This event has ended." : "") : "RSVP releasing soon✨"}</p>
        )}
      </div>
    </div>
  ));

  const postId = ["CzVNKp6r9hn", "CzVLbJWLwsI", "Cy4WTIJvVvB", "CyzVzMTJlhQ", "CyRondZPVVS", "CyCms3mLOLb", "Cxum20yOlkQ", "CxrxWcQLpSb"];

  const posts = (
    <div className="posts">
      {postId.map((id, index) => (
        <InstagramEmbed key={index} className="instaPost slide-up" url={`https://www.instagram.com/p/${id}`} />
      ))}
    </div>
  );

  return (
    <div className="event-page">
      <div className="calendar-section">
        <h1 className="event-headers">Upcoming Events</h1>
        <div align="center">
          <iframe title="calendar" className="calendar" src="https://calendar.google.com/calendar/embed?src=swecc%40uw.edu&ctz=America%2FLos_Angeles"></iframe>
        </div>
      </div>

      <div className="upcoming-events-section">
        <div className="upcoming-events">{upcomingEventsList}</div>
      </div>

      <div className="past-events-section">
        <h2 className="event-headers">Past Events at SWECC</h2>
        {posts}
      </div>
    </div>
  );
}

export default Events;
