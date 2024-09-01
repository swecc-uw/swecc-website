import React, { useState, useEffect } from "react";
import stopImg from "../Data/img/toggle-switch-stop/stop1.jpg";
import "../CSS/Switch.css";

function Switch({ toggleMode }) {
  const [isToggled, setIsToggled] = useState(
    JSON.parse(localStorage.getItem("isToggled")) || false,
  );

  //warning img set up

  const [interactionCount, setInteractionCount] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const onToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    localStorage.setItem("isToggled", JSON.stringify(newToggleState));
    toggleMode();
    setInteractionCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (interactionCount >= 10) {
      setShowImage(true);
    }

    const timeoutId = setTimeout(() => {
      setInteractionCount(0);
      setShowImage(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [interactionCount]);

  return (
    <label className="toggle-switch">
      {showImage && (
        <div className="toggle-switch-stop-img-container">
          <img
            src={stopImg}
            alt="stopImg"
            className={`toggle-switch-stop-img ${showImage ? "show" : "hide"}`}
          />
        </div>
      )}

      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}

export default Switch;
