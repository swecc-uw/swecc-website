import React, { type ReactNode } from "react";
import Button from "./Button";
import { externalLinkProps } from "./Utils";
import "../CSS/InitiativeCard.css";

type InitiativeCardProps = {
  title?: string;
  accent?: "sage" | "purple" | "mentorship" | "cohort";
  children?: ReactNode;
  action?: { label: string } & ({ to: string } | { href: string });
  className?: string;
};

function InitiativeCard({
  title,
  accent = "sage",
  children,
  action,
  className = "",
}: InitiativeCardProps) {
  return (
    <article
      className={`initiative-card initiative-card--${accent} ${className}`.trim()}
    >
      <div className="initiative-card__back" aria-hidden="true" />
      <div className="initiative-card__front">
        {title && <h3 className="initiative-card__title mono">{title}</h3>}
        <div className="initiative-card__body">{children}</div>
        {action && (
          <div className="initiative-card__action">
            <Button
              size="lg"
              variant="primary"
              {...("to" in action
                ? { to: action.to }
                : { href: action.href, ...externalLinkProps(action.href) })}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export default InitiativeCard;
