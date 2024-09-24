import React from "react";
import { NavLink } from "react-router-dom";
import { PiMoonBold } from "react-icons/pi";
import { ImSun } from "react-icons/im";

const NavBar = ({ children }) => (
  <nav className="navbar">
    <ul className="navbar-nav">{children}</ul>
  </nav>
);

const NavItem = ({ closeExpand, route, tooltip, icon, LogoName }) => (
  <li className={`nav-item ${LogoName ? LogoName : ""}`} onClick={closeExpand}>
    <NavLink to={route}>
      <div
        className={`icon-button ${tooltip ? "tooltip" : ""}`}
        data-tooltip={tooltip}
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
}) => (
  <li
    className={`nav-toggle ${LogoName ? LogoName : ""}`}
    onClick={closeExpand}
  >
    <NavLink to={route}>
      <div
        onClick={toggleMode}
        className={`toggle-button ${tooltip ? "tooltip" : ""} ${isDarkMode ? "light-mode" : "dark-mode"}`}
        data-tooltip={tooltip}
      >
        {icon}
      </div>
    </NavLink>
  </li>
);

const NavExpandItem = ({ togglExpand, icon, expand, children }) => (
  <li className="nav-item nav-expand">
    <div className="icon-button" onClick={togglExpand}>
      {icon}
    </div>
    {expand && children}
  </li>
);

export { NavBar, NavToggle, NavItem, NavExpandItem };
