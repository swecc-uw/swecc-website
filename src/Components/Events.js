import { InstagramEmbed } from "react-social-media-embed";
import "../CSS/App.css";
import "../CSS/Events.css";
import pseudoCurrImage from "../Data/img/pseudo-current-event.jpg";
import pseudoPastImage from "../Data/img/pseudo-past-event.jpg";

function Events() {
  const upcomingEvents = [
    {
      title: "More events coming soon!",
      timeAndPlace: "TBD",
      description: "We are currently planning more events for the quarter. Check back soon for more information!",
      image: pseudoCurrImage,
    },
  ];

  const pastEvents = [
    {
      title: "We're updating our website!",
      description: "Currently we are updating our website. Check back soon for more information!",
      image: pseudoPastImage,
    },
  ];

  const upcomingEventsList = upcomingEvents.map((event, index) => (
    <div key={index} className="upcoming-event">
      <img src={event.image} className="upcoming-event-image" alt="upcoming event" />
      <div className="upcoming-event-info">
        <h3>{event.title}</h3>
        <p>{event.timeAndPlace}</p>
        <p>{event.description}</p>
        <button type="button" className="rsvp-btn">
          RSVP
        </button>
      </div>
    </div>
  ));

  const pastEventsList = pastEvents.map((event, index) => (
    <div key={index} className="past-event">
      <img src={event.image} className="past-event-image" alt="past event" />
      <div className="past-event-info">
        <h3 className="past-event-title">{event.title}</h3>
        <p className="past-event-description">{event.description}</p>
      </div>
    </div>
  ));

  const posts = (
    <div className="posts">
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CsDKoflLlNM/?igshid=MzRlODBiNWFlZA==" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CrPXP4Oqobe/?igshid=MzRlODBiNWFlZA==" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/Cq8-ZsxqlTM/?igshid=MzRlODBiNWFlZA==" />
    </div>
  );

  return (
    <div className="event-page">
      <div className="calendar-section">
        <h1 className="event-headers">Upcoming Events</h1>
        <div align="center">
          <iframe
            title="calendar"
            className="calendar"
            src="https://calendar.google.com/calendar/embed?src=swecc%40uw.edu&ctz=America%2FLos_Angeles"
          ></iframe>
        </div>
      </div>

      <div className="upcoming-events-section">
        <div className="upcoming-events">{upcomingEventsList}</div>
      </div>

      <div className="past-events-section">
        <h2 className="event-headers">Past Events at SWECC</h2>
        {/* <div className="past-events">{pastEventsList}</div> */}
        {posts}
      </div>
    </div>
  );
}

export default Events;
