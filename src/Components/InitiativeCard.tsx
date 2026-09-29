import React, { type CSSProperties } from "react";
import { FiArrowRight } from "react-icons/fi";
import Button from "./Button";
import { externalLinkProps } from "./Utils";
import "../CSS/InitiativeCard.css";

type InitiativeCardProps = {
  title: string;
  accent: "sage" | "lavender";
  file: string;
  blurb: string;
  cta: { label: string; href: string };
  className?: string;
  style?: CSSProperties;
};

function InitiativeCard({
  title,
  accent,
  file,
  blurb,
  cta,
  className = "",
  style,
}: InitiativeCardProps) {
  const command = `cat ${file}`;

  return (
    <li
      className={`initiative-card initiative-card--${accent} ${className}`.trim()}
      style={style}
    >
      <div className="initiative-card__panel">
        <h3 className="initiative-card__title">{title}</h3>
        <p
          className="initiative-card__prompt"
          style={{ "--n": command.length } as CSSProperties}
        >
          <span className="initiative-card__host" aria-hidden>
            ~$
          </span>{" "}
          <span className="initiative-card__type">{command}</span>
          <span className="initiative-card__caret" aria-hidden />
        </p>
        <p className="initiative-card__output">
          <span className="initiative-card__glyph" aria-hidden>
            &gt;
          </span>
          <span>{blurb}</span>
        </p>
        <div className="initiative-card__action">
          <Button
            variant="primary"
            size="lg"
            href={cta.href}
            {...externalLinkProps(cta.href)}
          >
            {cta.label}
            <FiArrowRight aria-hidden />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default InitiativeCard;
