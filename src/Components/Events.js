import '../CSS/App.css';
import '../CSS/Events.css';
import pseudoCurrImage from '../Data/img/pseudo-current-event.jpg'
import pseudoPastImage from '../Data/img/pseudo-past-event.jpg'

function Events() {

  const upcomingEvents = [
    {
      title: 'SWECC Study session',
      timeAndPlace: 'November 10th| 4:30| Loew 213',
      description: 'Upcoming Event Description (Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.)',
      image: pseudoCurrImage
    },
    {
      title: 'Upcoming Event Title',
      timeAndPlace: 'November 10th| 4:30| Loew 213',
      description: 'Upcoming Event Description (Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.)',
      image: pseudoCurrImage
    }
  ]

  const pastEvents = [
    {
      title: 'Past Event Title',
      description: 'Past Event Description (Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.)',
      image: pseudoPastImage
    },
    {
      title: 'Past Event Title',
      description: 'Past Event Description (Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.)',
      image: pseudoPastImage
    },
    {
      title: 'Past Event Title',
      description: 'Past Event Description (Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.)',
      image: pseudoPastImage
    }
  ]

  const upcomingEventsList = upcomingEvents.map((event) =>
    <div className='upcoming-event'>
      <img src={event.image} className='upcoming-event-image' alt='upcoming event' />
      <div className="upcoming-event-info">
        <h3>{event.title}</h3>
        <p>{event.timeAndPlace}</p>
        <p>{event.description}</p>
        <button type="button" className="rsvp-btn">RSVP</button>
      </div>
    </div>
  );

  const pastEventsList = pastEvents.map((event) =>
    <div className='past-event'>
      <img src={event.image} className='past-event-image' alt='past event' />
      <div className='past-event-info'>
        <h3 class="past-event-title">{event.title}</h3>
        <p className='past-event-description'>{event.description}</p>
      </div>
    </div>
  );

  return (
    <div className='event-page'>
      <div className='calendar-section'>
        <h1 className='event-headers'>Upcoming Events</h1>
        <div align="center">
          <iframe title='calendar' className="calendar" src="https://calendar.google.com/calendar/embed?src=swecc%40gmail.com&ctz=America%2FLos_Angeles" />
        </div>
      </div>

      <div className='upcoming-events-section'>
        <div className='upcoming-events'>
          {upcomingEventsList}
        </div>
      </div>

      <div className='past-events-section'>
        <h2 className='event-headers'>Event History</h2>
        <div className='past-events'>
          {pastEventsList}
        </div>
      </div>

    </div>
  );
}

export default Events;