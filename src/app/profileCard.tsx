import React, { type ComponentType, type SVGAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { Text } from "@swecc/ui";
import { colors, fonts, media } from "@swecc/ui/tokens.stylex";
import type { Officer } from "../Data/officers";

const photos = import.meta.glob<string>("../Data/officers/*", {
  eager: true,
  import: "default",
});

type SocialLinkProps = {
  href: string;
  label: string;
  Icon: ComponentType<SVGAttributes<SVGElement> & { className?: string }>;
};

function SocialLink({ href, label, Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...stylex.props(styles.social)}
    >
      <Icon aria-hidden="true" {...stylex.props(styles.socialIcon)} />
    </a>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

function Card({ member }: { member: Officer }) {
  const photoSrc = member.imgSrc
    ? photos[`../Data/officers/${member.imgSrc}`]
    : undefined;
  const hasSocials = Boolean(
    member.portfolio || member.github || member.linkedin || member.email,
  );

  return (
    <div {...stylex.props(styles.card)}>
      {photoSrc ? (
        <img src={photoSrc} alt={member.name} {...stylex.props(styles.photo)} />
      ) : (
        <div
          aria-hidden="true"
          {...stylex.props(styles.photo, styles.photoPlaceholder)}
        >
          {initials(member.name)}
        </div>
      )}
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.role}>{member.position}</Text>
      {member.funFact && (
        <Text style={styles.fact}>
          <span {...stylex.props(styles.factLabel)}>Fun fact</span>
          {member.funFact}
        </Text>
      )}
      {hasSocials && (
        <div {...stylex.props(styles.socials)}>
          {member.portfolio && (
            <SocialLink
              href={member.portfolio}
              label={`${member.name}'s portfolio`}
              Icon={AiOutlineLink}
            />
          )}
          {member.github && (
            <SocialLink
              href={member.github}
              label={`${member.name}'s GitHub profile`}
              Icon={FaGithub}
            />
          )}
          {member.linkedin && (
            <SocialLink
              href={member.linkedin}
              label={`${member.name}'s LinkedIn profile`}
              Icon={FaLinkedin}
            />
          )}
          {member.email && (
            <SocialLink
              href={`mailto:${member.email}`}
              label={`Email ${member.name}`}
              Icon={MdOutlineEmail}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ProfileCard(props: { info: Officer[] }) {
  return (
    <div {...stylex.props(styles.grid)}>
      {props.info.map((member) => (
        <Card key={member.name} member={member} />
      ))}
    </div>
  );
}

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(auto-fill, minmax(13rem, 1fr))",
      [media.max768]: "repeat(2, minmax(0, 1fr))",
    },
    alignItems: "start",
    gap: "clamp(2rem, 4.5vw, 4rem) clamp(1.5rem, 3.5vw, 3rem)",
    columnGap: { default: null, [media.max768]: "1rem" },
    padding: "clamp(1rem, 3vw, 2.5rem) 0 0",
  },
  card: {
    boxSizing: "border-box",
    minWidth: 0,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  photo: {
    width: "min(100%, 15rem)",
    height: "auto",
    aspectRatio: 1,
    objectFit: "cover",
    borderRadius: "50%",
    borderWidth: "clamp(3px, 0.4vw, 6px)",
    borderStyle: "solid",
    borderColor: colors.text,
    boxSizing: "border-box",
    display: "block",
  },
  photoPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.placeholder,
    color: colors.text,
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: "clamp(1.75rem, 2vw, 2.25rem)",
    letterSpacing: "0.04em",
  },
  name: {
    margin: "1rem 0 0.2rem",
    fontFamily: fonts.sans,
    fontSize: "clamp(1.05rem, 0.7vw + 0.85rem, 1.3125rem)",
    fontWeight: 700,
    color: colors.text,
    letterSpacing: "0.02em",
    textAlign: "center",
  },
  role: {
    margin: 0,
    fontFamily: fonts.sans,
    fontSize: "clamp(0.9rem, 0.45vw + 0.75rem, 1.125rem)",
    fontWeight: 500,
    color: colors.primary,
    textAlign: "center",
  },
  fact: {
    margin: "0.7rem 0 0",
    fontFamily: fonts.sans,
    fontSize: "0.9rem",
    lineHeight: 1.45,
    fontWeight: 400,
    color: colors.textSoft,
    textAlign: "center",
  },
  factLabel: {
    display: "block",
    marginBottom: "0.2rem",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.primary,
  },
  socials: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.4rem",
    marginTop: "0.8rem",
  },
  social: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(2.25rem, 2.8vw, 2.875rem)",
    height: "clamp(2.25rem, 2.8vw, 2.875rem)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: colors.primary,
    borderRadius: "50%",
    color: { default: colors.text, ":hover": colors.textOnPrimary },
    backgroundColor: { default: "transparent", ":hover": colors.primary },
    textDecoration: "none",
    transition: {
      default: "background-color 0.2s ease, color 0.2s ease",
      // Matches the global `a:hover` transition so the dimming eases in.
      ":hover": "0.2s",
    },
  },
  socialIcon: {
    width: "1.05em",
    height: "1.05em",
  },
});

export default ProfileCard;
