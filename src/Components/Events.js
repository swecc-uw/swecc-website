import "../CSS/Events.css";
import { InstagramEmbed } from "react-social-media-embed";
import eventImg from "../Data/img/event-1.png";

function Events() {
  const upcomingEvents = [
    {
      title: "SWECC Tech Career Panel",
      timeAndPlace: "Oct 4, 2023 | 6pm to 7:30pm | Gowen Hall 201 | University of Washington",
      description: "Come join us for a moderated career panel and hear stories about work and life at Google. Better understand how to prepare for interviews and listen to advice from folks in the tech industry. Be sure to bring your questions for the Q&A session!",
      image: eventImg,
    },
  ];

  const upcomingEventsList = upcomingEvents.map((event, index) => (
    <div key={index} className="upcoming-event">
      <img src={event.image} className="upcoming-event-image" alt="upcoming event" />
      <div className="upcoming-event-info">
        <h3>{event.title}</h3>
        <p>{event.timeAndPlace}</p>
        <p>{event.description}</p>
        <a href="https://rsvp.withgoogle.com/events/fall-2023-co-general-event-form_d87513_afeb36_6ef465/forms/registration" target="_blank" rel="noopener noreferrer">
          <button type="button" className="rsvp-btn">
            RSVP
          </button>
        </a>
      </div>
    </div>
  ));

  const posts = (
    <div className="posts">
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CxrxWcQLpSb" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CsDKoflLlNM" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CrPXP4Oqobe" />
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
