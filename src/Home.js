import "./Home.css";
import backgroundImg from "./BackgroundImg.jpg";
import SWECCmap from './SWECC-MAP.jpg'
import UWlogo from './UW_logo.png'
import Footer from './Footer.js'
import { InstagramEmbed } from 'react-social-media-embed';


const homepage = () => {
  return (
    <div id="homepage">
      <div id="clubTitleSection">
        <img id="uwLogo" src= {UWlogo}/>
        <h1 id="clubName">Software Engineering Career Club</h1>
      </div>
      <div id="whatWeDoSection">
        <h2 id="summaryTitle">What we do</h2>
        <p id="summary">
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
      <div id="meetingsSection">
      <div id="meetingsInfoSection">
          <h2 id="sweccMeetings">SWECC Meetings</h2>
          <p id="meetingInfo">
            Held in the EAC, these meeting feature topics in a vast number of areas,
            including professional development, resume building, and mentor circles
          </p>
          <h3 id="meetingTime">Meeting Times/Location</h3>
          <p id="meetingTimes">
            Every week on Thursday, from 4:30-5:30pm
            <br />
            Location: Loew Hall Room 215
          </p>
        </div>
        <img
          id="map" src = {SWECCmap} />
        <p id="mapLabel">Location: Loew Hall Room 215</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2%'}}>
      {/* <InstagramEmbed url="https://www.instagram.com/p/CsDKoflLlNM/?igshid=MzRlODBiNWFlZA==" width={328} />
      <InstagramEmbed url="https://www.instagram.com/p/CrPXP4Oqobe/?igshid=MzRlODBiNWFlZA==" width={328} />
      <InstagramEmbed url="https://www.instagram.com/p/Cq8-ZsxqlTM/?igshid=MzRlODBiNWFlZA==" width={328} /> */}
     
      </div>

      

      <Footer/>
      </div>
  );
};

export default homepage;


