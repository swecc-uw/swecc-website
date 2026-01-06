import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ children }) => (
  <nav className="navbar">
    <ul className="navbar-nav">{children}</ul>
  </nav>
);

const NavItem = ({ closeExpand, route, tooltip, icon, LogoName, label }) => (
  <li className={`nav-item ${LogoName ? LogoName : ""}`} onClick={closeExpand}>
    <NavLink to={route} aria-label={label || tooltip}>
      <div
        className={`icon-button ${tooltip ? "tooltip" : ""}`}
        data-tooltip={tooltip}
        aria-hidden="true"
      >
        {icon}
      </div>
    </NavLink>
  </li>
);

const NavToggle = ({
  closeExpand,
  tooltip,
  icon,
  toggleMode,
  LogoName,
  route,
  isDarkMode,
  label,
}) => (
  <li
    className={`nav-toggle ${LogoName ? LogoName : ""}`}
    onClick={closeExpand}
  >
    <button
      onClick={toggleMode}
      className={`toggle-button ${tooltip ? "tooltip" : ""} ${isDarkMode ? "light-mode" : "dark-mode"}`}
      data-tooltip={tooltip}
      aria-label={isDarkMode ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isDarkMode}
    >
      {icon}
    </button>
  </li>
);

const NavExpandItem = ({ togglExpand, icon, expand, children, tooltip }) => (
  <li className="nav-item nav-expand">
    <button
      className="icon-button"
      onClick={togglExpand}
      aria-label={tooltip || "Toggle menu"}
      aria-expanded={expand}
    >
      {icon}
    </button>
    {expand && children}
  </li>
);

export { NavBar, NavToggle, NavItem, NavExpandItem };
