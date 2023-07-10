import "../CSS/Home.css";
import SWECCmap from '../Data/img/SWECC-MAP.jpg'
import UWlogo from '../Data/img/UW_logo.png'
import Footer from './Footer.js'
import { InstagramEmbed } from 'react-social-media-embed';

function HomePage() {

  const meetingInfo = (
    <div className="meetingsSection">
      <div className="meetingsInfoSection">
        <h2 className="sweccMeetings">SWECC Meetings</h2>
        <p className="meetingInfo">
          Held in the EAC, these meeting feature topics in a vast number of areas,
          including professional development, resume building, and mentor circles
        </p>
        <h3 className="meetingTime">Meeting Times/Location</h3>
        <p className="meetingDetails">
          Every week on Thursday, from 5:30-6:30pm
          <br />
          Location: Loew Hall Room 213
        </p>
      </div>
      <div className="map-and-label">
        <img className="map" src={SWECCmap} alt="map" />
        <p className="mapLabel">Location: Loew Hall Room 213</p>
      </div>
    </div>
  )

  const posts = (
    <div className="posts">
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CsDKoflLlNM/?igshid=MzRlODBiNWFlZA==" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/CrPXP4Oqobe/?igshid=MzRlODBiNWFlZA==" />
      <InstagramEmbed className="instaPost slide-up" url="https://www.instagram.com/p/Cq8-ZsxqlTM/?igshid=MzRlODBiNWFlZA==" />
    </div>
  )

  return (
    <div className="homepage">
      <div className="clubTitleSection">
        <img className="uw-logo" src={UWlogo} alt="UW logo" />
        <h1 className="clubName">Software Engineering Career Club</h1>
      </div>
      <div className="whatWeDoSection">
        <h2 className="summaryTitle">What we do</h2>
        <p className="summary">
          Software Engineering Career Club (also known as SWECC) is a
          student-led organization at the University of Washington based in
          Seattle. Our club's mission is to be a space for people that want to
          pursue SWE as a career. Within this space, our club hopes to help
          develop skills and provide resources that can improve students' odds
          of being successful in their future SWE career. We host events
          focusing on networking, LeetCode, mentor-mentee pairing, possible
          career paths, workshopping application material, mock interviews, and
          other activities that will add value to our members.
        </p>
      </div>
      {meetingInfo}
      {posts}
      <Footer />
    </div>
  );
};

export default HomePage;


