import "../CSS/App.css";
import "../CSS/Join-now.css";
import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";

const actions = [
  <div className="action-item">
    <a
      className="link-boxes"
      href="https://discord.com/invite/Pbk4sCEWDY"
      target="_blank"
      rel="noopener noreferrer"
    >
      Join the discord
    </a>
  </div>,
  <div className="action-item">
    <a
      className="link-boxes"
      href="http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"
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
        href="https://instagram.com/swecc.uw"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        className="separate-insta-linkedin link-boxes"
        href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/"
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

  return (
    <div className="entire">
      <div className="background-image">
        <div className="js-white-box">
          <div className="content-flex">
            <p className="join-message">
              <strong>Join SWECC </strong>
            </p>
            <p className="join-message"></p>
            <div className="stepper-wrapper">
              <div
                className={`stepper-item ${count > 0 ? "completed" : count === 0 ? "active" : ""}`}
              >
                <div className="step-counter">1</div>
                <div className="step-name">Join our discord</div>
              </div>
              <div
                className={`stepper-item ${count > 1 ? "completed" : count === 1 ? "active" : ""}`}
              >
                <div className="step-counter">2</div>
                <div className="step-name">Join our mailing list</div>
              </div>
              <div
                className={`stepper-item ${count > 2 ? "completed" : count === 2 ? "active" : ""}`}
              >
                <div className="step-counter">3</div>
                <div className="step-name">Attend an event</div>
              </div>
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
