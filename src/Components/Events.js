import "../CSS/Events.css";
import { InstagramEmbed } from "react-social-media-embed";
import events from "../Data/events.json";

function Events() {
  const upcomingEventsList = events.map((event, index) => (
    <div key={index} className="upcoming-event">
      <img
        src={require(`../Data/img/${event.image}`)}
        className="upcoming-event-image"
        alt={event.title}
      />
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
          <p className="event-status">
            {event.publish
              ? event.end
                ? "This event has ended."
                : ""
              : "RSVP releasing soon✨"}
          </p>
        )}
      </div>
    </div>
  ));

  const postId = [
    "C2-o7roPbfN",
    "C23PyAWPYdW",
    "C2boAR4LeRy",
    "CzVNKp6r9hn",
    "CzVLbJWLwsI",
    "Cy4WTIJvVvB",
    "CyzVzMTJlhQ",
    "CyRondZPVVS",
    "CyCms3mLOLb",
    "Cxum20yOlkQ",
    "CxrxWcQLpSb",
  ];

  const posts = (
    <div className="posts">
      {postId.map((id, index) => (
        <InstagramEmbed
          key={index}
          className="instaPost slide-up"
          url={`https://www.instagram.com/p/${id}`}
        />
      ))}
    </div>
  );

  return (
    <div className="event-page">
      <div className="event-page-intro">
        <h1 className="event-headers">Upcoming Events</h1>
      </div>

      <div className="upcoming-events-section">
        <div align="center">
          {/*TODO: switch to updated member calendar*/}
          <iframe
            title="calendar"
            className="calendar"
            src="https://calendar.google.com/calendar/embed?src=swecc%40uw.edu&ctz=America%2FLos_Angeles"
          ></iframe>
        </div>
        {/*<div className="upcoming-events">{upcomingEventsList}</div>*/}
      </div>
    </div>
  );
}

export default Events;
