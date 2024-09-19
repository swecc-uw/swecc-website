import React from "react";
import "../CSS/profileCard.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

function ProfileCard(props) {
  const teamMembers = props.info;
  const Card = ({ member }) => (
    <div className="card">
      <div
        className={`card-image-container ${member.position.includes("President") ? "founder-card" : ""}`}
      >
        <img
          src={require(`../Data/officers/${member.imgSrc}`)}
          alt={member.name}
        />
      </div>
      <p className="name">{member.name}</p>
      <p>{member.position}</p>
      <div className="socials">
        {member.portfolio && (
          <button className="portfolio">
            <a
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineLink />
            </a>
          </button>
        )}
        {member.github && (
          <button className="github">
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </button>
        )}
        {member.linkedin && (
          <button className="linkedin">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </button>
        )}
        {member.email && (
          <button className="email">
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineEmail />
            </a>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="card-container">
      {teamMembers.map((member) => (
        <Card key={member.name} member={member} />
      ))}
    </div>
  );
}

export default ProfileCard;
