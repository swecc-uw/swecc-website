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
          <a
            className="social-link portfolio"
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s portfolio`}
          >
            <AiOutlineLink aria-hidden="true" />
          </a>
        )}
        {member.github && (
          <a
            className="social-link github"
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s GitHub profile`}
          >
            <FaGithub aria-hidden="true" />
          </a>
        )}
        {member.linkedin && (
          <a
            className="social-link linkedin"
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <FaLinkedin aria-hidden="true" />
          </a>
        )}
        {member.email && (
          <a
            className="social-link email"
            href={`mailto:${member.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Email ${member.name}`}
          >
            <MdOutlineEmail aria-hidden="true" />
          </a>
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
