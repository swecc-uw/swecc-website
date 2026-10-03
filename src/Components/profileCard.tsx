import React from "react";
import "../CSS/profileCard.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import type { Officer } from "../Data/officers";

const photos = import.meta.glob<string>("../Data/officers/*", {
  eager: true,
  import: "default",
});

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

function ProfileCard(props: { info: Officer[] }) {
  const teamMembers = props.info;
  const Card = ({ member }: { member: Officer }) => {
    const photoSrc = member.imgSrc
      ? photos[`../Data/officers/${member.imgSrc}`]
      : undefined;
    const hasSocials = Boolean(
      member.portfolio || member.github || member.linkedin || member.email,
    );

    return (
      <div className="officer-card">
        {photoSrc ? (
          <img
            className="officer-card__photo"
            src={photoSrc}
            alt={member.name}
          />
        ) : (
          <div
            className="officer-card__photo officer-card__photo--placeholder"
            aria-hidden="true"
          >
            {initials(member.name)}
          </div>
        )}
        <p className="officer-card__name">{member.name}</p>
        <p className="officer-card__role">{member.position}</p>
        {member.funFact && (
          <p className="officer-card__fact">
            <span className="officer-card__fact-label">Fun fact</span>
            {member.funFact}
          </p>
        )}
        {hasSocials && (
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
        )}
      </div>
    );
  };

  return (
    <div className="officer-card-grid">
      {teamMembers.map((member) => (
        <Card key={member.name} member={member} />
      ))}
    </div>
  );
}

export default ProfileCard;
