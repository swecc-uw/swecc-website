import "../CSS/Events.css";
import { InstagramEmbed } from "react-social-media-embed";

function Events() {
  const upcomingEvents = [
    {
      title: "SWECC x NeetCode",
      timeAndPlace: "Oct 18, 2023 | 5:30pm - 6:30pm | Gowen Hall 201 | University of Washington",
      description: "🚀 Come meet YouTuber, ex-Google and ex-Amazon software engineer NEETCODE and his fellow software engineer from Tesla! Ask questions about software engineering careers, being a software YouTuber, and more!",
      image: require("../Data/img/event-2.png"),
      publish: true,
      end: true,
      rsvp: "https://forms.gle/a5BGaJE9dR7diPPL8",
    },
    {
      title: "Google @ UW : SWECC Tech Career Panel 2023",
      timeAndPlace: "Oct 4, 2023 | 6pm - 7:30pm | Gowen Hall 201 | University of Washington",
      description: "Come join us for a moderated career panel and hear stories about work and life at Google. Better understand how to prepare for interviews and listen to advice from folks in the tech industry. Be sure to bring your questions for the Q&A session!",
      image: require("../Data/img/event-1.png"),
      publish: true,
      end: true,
      rsvp: "https://rsvp.withgoogle.com/events/fall-2023-co-general-event-form_d87513_afeb36_6ef465/forms/registration",
    },
  ];

  const upcomingEventsList = upcomingEvents.map((event, index) => (
    <div key={index} className="upcoming-event">
      <img src={event.image} className="upcoming-event-image" alt="upcoming event" />
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

  const postId = ["Cy4WTIJvVvB", "CyzVzMTJlhQ", "CyRondZPVVS", "CyMWg-BywYm", "CyCms3mLOLb", "Cxum20yOlkQ", "CxrxWcQLpSb", "CsDKoflLlNM"];

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
