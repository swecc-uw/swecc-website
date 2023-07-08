import '../CSS/App.css';
import '../CSS/Events.css';
import pseudoCurrImage from '../Data/img/pseudo-current-event.jpg'
import pseudoPastImage from '../Data/img/pseudo-past-event.jpg'

const Events = () => {
    return (
      <div class = "events-section">
        <div class='calendar-section'>
          {/* This is the beginning of calendar stuff */}
          <h2 class='event-headers'>Upcoming Events</h2>
          {/* Please put HTML calendar here :) */}
          <div align="center">
            <iframe class="calendar" src="https://calendar.google.com/calendar/embed?src=ryannguyen10023%40gmail.com&ctz=America%2FLos_Angeles"></iframe>
          </div>
        </div>
        <div class = 'upcoming-events-section'>
          {/* This is the start of upcoming events */}
          <div id='upcoming-event-images'>
            {/* Please put most recent sanity event image here, ie replace src with Sanity */}
            <img class='upcoming-image' src={pseudoCurrImage} />
            {/* Please put the next most recent sanity event image here, ie replace src with Sanity */}
            <img class='upcoming-image' src={pseudoCurrImage} />
          </div>
          <div id='upcoming-event-infos'>
            {/* need more sanity info to fill this out */}
            <div id='upcoming-event-info'>
              {/* Replace this with Sanity event title */}
              <h3 class='curr-event-title'> SWECC Study session</h3>
              {/* Replace this with Sanity event location info */}
                  <p class='curr-event-description'>  November 10th| 4:30| Loew 213</p>
                  <p class='curr-event-description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  {/* In the href put the sanity link for event */}
                  <a href = ""><button type = "button" id = "rsvp-btn"> RSVP 
                  </button> </a>
            </div>
            <div id='upcoming-event-info'>
                  {/* Replace this with Sanity event title */}
              <h3 class='curr-event-title'> SWECC Study session</h3>
              {/* Replace this with Sanity event location info */}
                  <p class='curr-event-description'>  November 10th| 4:30| Loew 213</p>
                  {/* Replace this with Sanity event description */}
                  <p class='curr-event-description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  {/* In the href put the sanity link for event */}
                  <a href = ""><button type = "button" id = "rsvp-btn"> RSVP 
                  </button> </a>
            </div>
          </div>
        </div>
        <div class='past-events-section'>
          {/* This is the start of the past events sanity section */}
          <h2 class='event-headers'>Event History</h2>
          <div class='past-events'>
            <div class='past-event'>
                {/* Replace this with info for the 1st sanity event */}
                {/* Replace pseudo image with sanity */}
                <img src={pseudoPastImage} class='past-event-image' />
                <div class='past-event-image'>
                  {/* Replace past event title with sanity */}
                  <h4 class ="past-event-title"> Past Event Title</h4>
                   {/* Replace past event description with sanity */}
                  <p class='past-event-description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
            </div>
            <div class='past-event'>
              {/* Replace this with info for the 2nd sanity event */}
              {/* Replace pseudo image with sanity */}
                <img src={pseudoPastImage} class='past-event-image' />
                <div class='past-event-image'>
                   {/* Replace past event title with sanity */}
                  <h4 class ="past-event-title"> Past Event Title</h4>
                  {/* Replace past event description with sanity */}
                  <p class='past-event-description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
            </div>
            <div class='past-event'>
              {/* Replace this with info for the 3rd Sanity event */}
              {/* Replace pseudo image with sanity */}
                <img src={pseudoPastImage} class='past-event-image' />
                <div class='past-event-image'>
                   {/* Replace past event title with sanity */}
                  <h4 class ="past-event-title"> Past Event Title</h4>
                   {/* Replace past event description with sanity */}
                  <p class='past-event-description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export default Events;