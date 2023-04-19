import logo from './logo.svg';
import './App.css';
import backgroundImg from './BackgroundImg.jpg';

function homepage() {
  return (
    <div id="homepage">
      <style>
@import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
      </style>
      <div id="clubTitleSection">
        <img id="uwLogo" src='https://s3-alpha-sig.figma.com/img/52b1/c8c0/6479893d9df58e791f33334295c4d07f?Expires=1682899200&Signature=Gs5uN3yRTV8VIUAutApgrX7cI3ZLWpitgxKLCz-UNCDP-A4AeUtGksD-FvJcLL9oOpQSoOH2hBpO-G~vLNRG1WcZP3sIQW5Uz5XGQhb4Qw31PNBzH~05t2fQN3Za9mgl7ci4lKRwGXeEGRabQ~YIYPS-mAUIUzeZNTyH5gGeOZjXEb6fEoKfQ9wEciCiXFVNtmqlWLUglE3ar7UuIAUfZV4ptZrpGaU-tIK7jeKQ7TLsURJhS-0xONVW8B9clRwo1YagdKJmUSNFVgxHy312igNww988BGhWqHk9KYU6Olld8CBX4XNzLEkvJM-UW7y~s0dyEODoWmLu4PyXW-pnuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'/>
        <h1 id="clubName">Software Engineering Career Club</h1>
      </div>
      <div id="whatWeDoSection">
        <h2 id="summaryTitle">What we do</h2>
        <p id="summary">Software Engineering Career Club (also known as SWECC) is a student-led organization at the University of Washington based in Seattle.  Our club's mission is to be a space for people that want to pursue SWE as a career. Within this space, our club hopes to help develop skills and provide resources that can improve students' odds of being successful in their future SWE career. We host events focusing on networking, LeetCode, mentor-mentee pairing, possible career paths, workshopping application material, mock interviews, and other activities that will add value to our members.</p>
      </div>
      <div id="meetingsSection">
        <div id="meetingsInfoSection">
          <h2 id="sweccMeetings">SWECC Meetings</h2>
          <p id="meetingInfo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</p>
          <h3 id="meetingTime">Meeting Times/Location</h3>
          <p id="meetingTimes">
            Every week on Thursday, from 4:30-5:30pm<br/>
            Location: Loew Hall Room 215
          </p>
        </div>
        <img id="map" src="https://s3-alpha-sig.figma.com/img/cf6c/1286/9dac4073f9cb7e44b5cf9b6625693dfe?Expires=1682294400&Signature=ZDjpzhAphkKbqQdKOVbJaduhjOhA-W2sOhQdcwC27S-jpDi7pZzt-8NvW94EkHW6DEOPhRAUUGk-UUhIv~qGrc2Kw4zenHp~hPgK5lGCMOb3m9QhXhSAmO3uubIsCnJ46mBnSNG31SU8r8c8NU~MyGPh9sgjZkZvEUYRh~vfUQGWLYAg25AbjPuPJhpgSE3dpUWYIKV9mBM02KUrlNmyHLMQLYQZ24EpfjOkFp3zT6V49YY~SF~wQ1hDZg49nxuL9l8-XaiQ8I32y3HfAILwDfRKX~3THTaxyQ83t1KXFk-RSnUHz869UMXqPHNRTYaXGNtjtblrbjOmwXVlb4Jxmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"/>
        <p id="mapLabel">Location: Loew Hall Room 215</p>
      </div>
    </div>
  );
}

export default homepage;
