import React from "react";
import "../CSS/About.css";
import teamMembers from "../Data/teamMembers.json";
import pastOfficers from "../Data/pastOfficers.json";
import ProfileCard from "./profileCard";

const About = () => {
  return (
    <div>
      <div>
        <div className="about-message-section">
          <div className="about-title">SWECC Officers</div>
          <div className="about-text">Learn about the team behind SWECC.</div>
        </div>
        <div>
          <h1 className="team-members-title">Board Members</h1>
          <p className="team-members-subtitle">2024-2025</p>
          <ProfileCard info={teamMembers} />
        </div>
        <div>
          <h1 className="team-members-title">Past Board Members</h1>
          <ProfileCard info={pastOfficers} />
        </div>
      </div>
    </div>
  );
};

export default About;
