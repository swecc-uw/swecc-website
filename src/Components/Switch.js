import React, { useState } from "react";
import "../CSS/Switch.css";

function Switch({ toggleMode }) {
  const [isToggled, setIsToggled] = useState(
    JSON.parse(localStorage.getItem("isToggled")) || false
  );

  const onToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    localStorage.setItem("isToggled", JSON.stringify(newToggleState));
    toggleMode();
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default Switch;
