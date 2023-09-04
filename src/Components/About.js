import React from "react";
import "../CSS/About.css";
import teamMembers from "../Data/teamMembers.json";
import ProfileCard from "./profileCard";

const About = () => {
  const Card = ({ member }) => {
    return (
      <div className="card">
        <div className="picture">
          <img src={require(`../Data/img/${member.imgSrc}`)} alt={member.altText} loading="lazy" />
        </div>
        <div className="team-info">
          <p className="team-members-subtitle">{member.name}</p>
          <p className="team-title">
            <strong>{member.position}</strong>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="about-section">
        <div className="about-message-section">
          <div className="about-title">About Us</div>
          <div className="about-text">Learn the ways that SWECC can help you get started in Software Engineering!</div>
        </div>
        <div className="team-members-section">
          <h1 className="team-members-title">Board Members</h1>
          <p className="team-members-subtitle">2023-2024</p>
          <div>
            <ProfileCard info={teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
