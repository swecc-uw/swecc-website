import React from "react";
import Button from "./Button";
import "../CSS/InitiativeCard.css";

function InitiativeCard({
  title,
  accent = "sage",
  children,
  actionLabel,
  actionTo,
  actionHref,
  onActionClick,
  className = "",
}) {
  return (
    <article
      className={`initiative-card initiative-card--${accent} ${className}`.trim()}
    >
      <div className="initiative-card__back" aria-hidden="true" />
      <div className="initiative-card__front">
        {title && <h3 className="initiative-card__title mono">{title}</h3>}
        <div className="initiative-card__body">{children}</div>
        {actionLabel && (
          <div className="initiative-card__action">
            <Button
              size="sm"
              variant="primary"
              to={actionTo}
              href={actionHref}
              onClick={onActionClick}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export default InitiativeCard;
