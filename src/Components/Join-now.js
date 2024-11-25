import "../CSS/App.css";
import "../CSS/Join-now.css";
import React, { useEffect, useState } from "react";
import career from "../Data/img/career.svg";
import careerDarkmode from "../Data/img/career-darkmode.svg";
import community from "../Data/img/community.svg";
import communityDarkmode from "../Data/img/community-darkmode.svg";
import networking from "../Data/img/networking.svg";
import networkingDarkmode from "../Data/img/networking-darkmode.svg";
import Stepper from "./Stepper";
import { links } from "./Utils";

const actions = [
  <div className="action-item">
    <a
      className="link-boxes"
      href={links.social.discord}
      target="_blank"
      rel="noopener noreferrer"
    >
      Join the discord
    </a>
  </div>,
  <div className="action-item">
    <a
      className="link-boxes"
      href={links.resources.mailingList}
      target="_blank"
      rel="noopener noreferrer"
    >
      Subscribe to the mailing list
    </a>
  </div>,
  <div className="action-item">
    <p>
      <a
        className="separate-insta-linkedin link-boxes"
        href={links.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        className="separate-insta-linkedin link-boxes"
        href={links.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </p>
  </div>,
  <div className="action-item">
    <div className="thanks-box">
      <p className="thanks-message">
        <strong>Thanks for Joining! </strong>
        We're looking forward to seeing you at our next meeting :)
      </p>
    </div>
  </div>,
];

export default function JoinNow() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false,
  );

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "darkMode") {
        setDarkMode(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function increment() {
    if (count < 3) {
      setCount(count + 1);
    }
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  const StepperItem = ({ step, index, currentStep }) => {
    return (
      <div
        className={`stepper-item ${currentStep > index ? "completed" : currentStep === index ? "active" : ""}`}
      >
        <div className="step-counter">{index + 1}</div>
        <div className="step-name">{step}</div>
      </div>
    );
  };

  return (
    <div className="entire">
      <div className="background-image">
        <div className="js-white-box">
          <div className="content-flex-small">
            <p className="join-message">
              <strong>Join SWECC </strong>
              <Stepper className="stepper" />
            </p>
          </div>
          <div className="content-flex">
            <p className="join-message">
              <strong>Join SWECC </strong>
            </p>
            <p className="join-message"></p>
            <div className="stepper-wrapper">
              <StepperItem
                step="Join our discord"
                index={0}
                currentStep={count}
              />
              <StepperItem
                step="Join our mailing list"
                index={1}
                currentStep={count}
              />
              <StepperItem
                step="Attend an event"
                index={2}
                currentStep={count}
              />
            </div>
            <p>{actions[count]}</p>
          </div>
          <div className="button-container">
            {count > 0 && (
              <button className="click-button back-button" onClick={decrement}>
                Back
              </button>
            )}
            {count < 3 && (
              <button className="click-button next-button" onClick={increment}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
