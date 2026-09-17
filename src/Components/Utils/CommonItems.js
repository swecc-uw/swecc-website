import React from "react";
import "../../CSS/CommonItems.css";

const TextLeftImageRight = ({ summaryTitle, summary, image }) => (
  <div className="articleSection">
    <div className="articleSection-text-info">
      <h2 className="summaryTitle type-display mono">{summaryTitle}</h2>
      <p className="summary type-body">{summary}</p>
    </div>
    <div className="articleSection-photo-info">
      <img src={image} alt="articleSection-photo" />
    </div>
  </div>
);

const TextRightImageLeft = ({ summaryTitle, summary, image }) => (
  <div className="articleSection">
    <div className="articleSection-photo-info">
      <img src={image} alt="articleSection-photo" />
    </div>
    <div className="articleSection-text-info">
      <h2 className="summaryTitle type-display mono">{summaryTitle}</h2>
      <p className="summary type-body">{summary}</p>
    </div>
  </div>
);

const ColFlexDoubleTextRightImageLeft = ({
  title1,
  title2,
  content1,
  content2,
  image,
}) => (
  <div className="articleSection">
    <div className="articleSection-photo-info">
      <img src={image} alt="articleSection-photo" />
    </div>
    <div className="articleSection-text-info">
      <h2 className="summaryTitle type-display mono">{title1}</h2>
      <p className="summary type-body">{content1}</p>
      <h2 className="summaryTitle type-display mono">{title2}</h2>
      <p className="summary type-body">{content2}</p>
    </div>
  </div>
);

export {
  TextLeftImageRight,
  TextRightImageLeft,
  ColFlexDoubleTextRightImageLeft,
};
