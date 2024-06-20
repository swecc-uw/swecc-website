import "../CSS/Home.css";
import SWECCmap from "../Data/img/location.png";
import UWlogo from "../Data/img/UW_logo.png";
import { InstagramEmbed } from "react-social-media-embed";
import { Posts } from "./Posts.js";

function HomePage() {
  const meetingInfo = (
    <div className="meetingsSection">
      <div className="meetingsInfoSection">
        <h2 className="sweccMeetings">SWECC Meetings</h2>
        <p className="meetingInfo">
          Held in the EAC, these meeting feature topics in a vast number of
          areas, including professional development, resume building, and mentor
          circles
        </p>
        <h3 className="meetingTime">Meeting Times/Location (Winter 2024)</h3>
        <p className="meetingDetails">
          Every week on Wednesday, from 5:30-6:30pm
          <br />
          Location: Loew 216
        </p>
      </div>
      <div className="map-and-label">
        <img className="map" src={SWECCmap} alt="map" />
        <p className="mapLabel">Location: Loew 216</p>
      </div>
    </div>
  );

  const posts = (
    <div className="posts">
      <InstagramEmbed
        className="instaPost slide-up"
        url="https://www.instagram.com/p/C2-o7roPbfN"
      />
      <InstagramEmbed
        className="instaPost slide-up"
        url="https://www.instagram.com/p/C23PyAWPYdW"
      />
      <InstagramEmbed
        className="instaPost slide-up"
        url="https://www.instagram.com/p/CyRondZPVVS"
      />
      <InstagramEmbed
        className="instaPost slide-up"
        url="https://www.instagram.com/p/Cxum20yOlkQ"
      />
      <InstagramEmbed
        className="instaPost slide-up"
        url="https://www.instagram.com/p/CxrxWcQLpSb"
      />
    </div>
  );

  return (
    <div>
      <div className="clubTitleSection">
        <img className="uw-logo" src={UWlogo} alt="UW logo" />
        <h1 className="clubName">Software Engineering Career Club</h1>
      </div>
      <div className="whatWeDoSection">
        <h2 className="summaryTitle">Who we are</h2>
        <p className="summary">
          The Software Engineering Career Club (SWECC) is a student-led
          organization at the University of Washington in Seattle. Our mission
          is to support and empower individuals interested in pursuing a
          successful career in software engineering. We offer a wide range of
          activities and resources, including networking events, LeetCode
          challenges, mentorship programs, and interview preparation, to help
          our members thrive in the field. Join SWECC to jumpstart your software
          engineering career with confidence and connections!
        </p>
      </div>
      {meetingInfo}
      <Posts></Posts>
    </div>
  );
}

export default HomePage;
