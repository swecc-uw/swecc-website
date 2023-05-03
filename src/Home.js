import "./Home.css";
import backgroundImg from "./BackgroundImg.jpg";

function homepage() {
  return (
    <div id="homepage">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
      </style>
      <div id="clubTitleSection">
        <img
          id="uwLogo"
          src="https://s3-alpha-sig.figma.com/img/52b1/c8c0/6479893d9df58e791f33334295c4d07f?Expires=1684108800&Signature=Xqe0JWLOi8FrCqLzQQT~0JezE9fVycZbEcHz7HwclierlIFLGSCdMtPzzlTmkP620ju70rrfYudvbT7uD1H4U-cBC-DMtaNluVdAPsmJaSgG1ahEnfkkd03AwbugAP-vwsY8uRoPBdHRD3bwi~94tsMXCPbfEqNqZDGmBwJvyXsNqQ8oubjCHud36Bwt39ztKzuKIQtW7dcwjms8jU2m-yvfQjV9rZ7vabPkIpHsrIUz1uwH2eZiuYmnmPIu8rykrWiMZUzvHq9r9VqMH5et3w4JAko7mfYoxJhA-9SiVhV5FM6LXop17LYaFfkVswt8~jgIfVzbsd9tIiq5QK7Q7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad
          </p>
          <h3 id="meetingTime">Meeting Times/Location</h3>
          <p id="meetingTimes">
            Every week on Thursday, from 4:30-5:30pm
            <br />
            Location: Loew Hall Room 215
          </p>
        </div>
        <img
          id="map"
          src="https://s3-alpha-sig.figma.com/img/cf6c/1286/9dac4073f9cb7e44b5cf9b6625693dfe?Expires=1684108800&Signature=eRw0wrtpFciZDa6WtEZWFHPTzIdAgxA3lwpKtCsb-mIbrxPgAJwnZpebZ6unckT~YiUwtr3jsuP0WC53I65dTEWmhq612IjMq4CXrLQhYlnGiFviOJE0SXPfv54s8k0JEqOLq6bRfaIDZXoP7w~10F~UmysUtXE5ZCyxeT37tGVgheigDUOKjsMsN~XKtb0X-WISNa2kNlrnw1e24k1AAOTkziXV9PHG3GWQnNUsIuS1KeDGr-Sydj4sr-0yjaIIL3ftonJL6~8t1a-OhzUG2xbFHU2minze3uCukU2d9QujI2FkAQARNaV89VMkIoOZcViHr~dWMkdgny6kcg-xlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <p id="mapLabel">Location: Loew Hall Room 215</p>
      </div>
    </div>
  );
}

export default homepage;
