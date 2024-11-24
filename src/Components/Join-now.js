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

const discordRedirect = "https://discord.gg/Z8ZDcdRqrs";
const linkedinRedirect = "https://www.linkedin.com/company/swecc-uw/";
const mailingList =
  "http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist";
const instagramRedirect = "https://www.instagram.com/swecc.uw/";

const actions = [
  <div className="action-item">
    <a
      className="link-boxes"
      href={discordRedirect}
      target="_blank"
      rel="noopener noreferrer"
    >
      Join the discord
    </a>
  </div>,
  <div className="action-item">
    <a
      className="link-boxes"
      href={mailingList}
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
        href={instagramRedirect}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        className="separate-insta-linkedin link-boxes"
        href={linkedinRedirect}
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

  const getStepperItemClass = (currentStep, stepIndex) => {
    return `stepper-item ${
      currentStep > stepIndex
        ? "completed"
        : currentStep === stepIndex
          ? "active"
          : ""
    }`;
  };

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
      <div className="join join-section info-message-section info-table">
        <table>
          <tbody className="community-benefits">
            <tr>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? networkingDarkmode : networking}
                  alt="Networking"
                />
                <div className="info-title">networking</div>
                <div className="info-text">
                  make connections in a network of future and current software
                  engineers
                </div>
              </td>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? communityDarkmode : community}
                  alt="Community"
                />
                <div className="info-title">community</div>
                <div className="info-text">
                  Join a vibrant community of future software engineers
                </div>
              </td>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? careerDarkmode : career}
                  alt="Career"
                />
                <div className="info-title">career</div>
                <div className="info-text">
                  Gain access to career talks, and more opportunities
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
