import React from "react";
import "../CSS/About.css";
import Footer from "./Footer.js";
import teamMembers from "../Data/teamMembers.json";

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
    <>
      <div className="about">
        <div className="about-section">
          <div className="about-message-section">
            <div className="about-title">About</div>
            <div className="about-text">Learn the ways that SWECC can help you get started in Software Engineering!</div>
          </div>
          <div className="goal-message-section">
            <div className="goal-title">Our Goal</div>
            <div className="goal-text">
              SWECC was formed to provide <strong>support, advice, </strong>
              and <strong>opportunities</strong> for people ready to start a career in Software engineering but who don't know where to begin. We
              bring in panels of people currently in the field to answer questions, help prepare for interviews, work to give people a head start in
              their software engineering career!
            </div>
          </div>
          <div className="team-members-section">
            <h1 className="team-members-title">Board Members</h1>
            <p className="team-members-subtitle">2023-2024</p>
            <div className="picture-container">
              {teamMembers.map((member) => (
                <Card key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
