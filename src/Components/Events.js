import '../CSS/App.css';
import '../CSS/Events.css';
import pseudoCurrImage from '../Data/img/pseudo-current-event.jpg'
import pseudoPastImage from '../Data/img/pseudo-past-event.jpg'

const Events = () => {
  return (
    <div class="events-section">
      <div className='calendar-section'>
        <h2 className='event-headers'>Upcoming Events</h2>
        <div align="center">
          <iframe title='calendar' className="calendar" src="https://calendar.google.com/calendar/embed?src=ryannguyen10023%40gmail.com&ctz=America%2FLos_Angeles" />
        </div>
      </div>

      <div className='upcoming-events-section'>
        <div className='upcoming-event-images'>
          <img className='upcoming-image' src={pseudoCurrImage} alt='upcoming event' />
          <img className='upcoming-image' src={pseudoCurrImage} alt='upcoming event' />
        </div>

        <div className='upcoming-event-group'>
          <div className='upcoming-event-info'>
            <h3 className='curr-event-title'> SWECC Study session</h3>
            <p className='curr-event-description'>  November 10th| 4:30| Loew 213</p>
            <p className='curr-event-description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            {/* TODO: add link to rsvp */}
            <button type="button" className="rsvp-btn">RSVP</button>
          </div>
          <div className='upcoming-event-info'>
            <h3 className='curr-event-title'>SWECC Study session</h3>
            <p className='curr-event-description'>November 10th| 4:30| Loew 213</p>
            <p className='curr-event-description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            {/* TODO: add link to rsvp */}
            <button type="button" className="rsvp-btn">RSVP</button>
          </div>
        </div>
      </div>

      <div className='past-events-section'>
        <h2 className='event-headers'>Event History</h2>
        <div className='past-events'>
          <div className='past-event'>
            <img src={pseudoPastImage} className='past-event-image' alt='past event' />
            <div className='past-event-image'>
              <h4 class="past-event-title"> Past Event Title</h4>
              <p className='past-event-description'>
                Past Event Description
              </p>
            </div>
          </div>
          <div className='past-event'>
            <img src={pseudoPastImage} className='past-event-image' alt='past event' />
            <div className='past-event-image'>
              <h4 class="past-event-title"> Past Event Title</h4>
              <p className='past-event-description'>
                Past Event Description
              </p>
            </div>
          </div>

          <div className='past-event'>
            <img src={pseudoPastImage} className='past-event-image' alt='past event' />
            <div className='past-event-image'>
              <h4 class="past-event-title"> Past Event Title</h4>
              <p className='past-event-description'>
                Past Event Description
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Events;