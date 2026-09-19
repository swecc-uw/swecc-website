import React from "react";
import "../CSS/profileCard.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

function ProfileCard(props) {
  const teamMembers = props.info;
  const Card = ({ member }) => (
    <div className="officer-card">
      <img
        className="officer-card__photo"
        src={require(`../Data/officers/${member.imgSrc}`)}
        alt={member.name}
      />
      <p className="officer-card__name">{member.name}</p>
      <p className="officer-card__role">{member.position}</p>
      <div className="officer-card__socials">
        {member.portfolio && (
          <a
            className="officer-card__social"
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
            className="officer-card__social"
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
            className="officer-card__social"
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
            className="officer-card__social"
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
    <div className="officer-card-grid">
      {teamMembers.map((member) => (
        <Card key={member.name} member={member} />
      ))}
    </div>
  );
}

export default ProfileCard;
