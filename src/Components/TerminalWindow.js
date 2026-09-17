import React from "react";
import "../CSS/TerminalWindow.css";

function TerminalWindow({ children, className = "" }) {
  return (
    <div className={`terminal-window ${className}`.trim()}>
      <div className="terminal-window__chrome" aria-hidden="true">
        <span className="terminal-window__dot terminal-window__dot--close" />
        <span className="terminal-window__dot terminal-window__dot--minimize" />
        <span className="terminal-window__dot terminal-window__dot--maximize" />
      </div>
      <div className="terminal-window__body">{children}</div>
    </div>
  );
}

export default TerminalWindow;
