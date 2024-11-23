import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as MessengerIcon } from "../icons/messenger.svg";
import { ReactComponent as CaretIcon } from "../icons/caret.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import {
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaChevronRight,
  FaGithub,
  FaHeart,
} from "react-icons/fa";
import {
  FcShare,
  FcCalendar,
  FcApproval,
  FcCheckmark,
  FcConferenceCall,
  FcHome,
  FcViewDetails,
} from "react-icons/fc";
import { ImIcoMoon, ImSun } from "react-icons/im";
import { PiMoonBold } from "react-icons/pi";

import { NavBar, NavExpandItem, NavItem, NavToggle } from "./Utils/NavItems";
import SWECCLogoWhite from "../Data/img/Logo/SWECCLogoWhite.png";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false,
  );

  const toggleMode = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const [expand, setExpand] = useState(false);

  const togglExpand = () => {
    setExpand(!expand);
  };

  const closeExpand = () => {
    setExpand(false);
  };

  return (
    <NavBar className={`${darkMode ? "dark-mode" : ""}`}>
      <li className={`nav-Logo-Item`} onClick={closeExpand}>
        <NavLink to={"/"}>
          <img className="swecc-logo" src={SWECCLogoWhite} alt="SWECC Logo" />
        </NavLink>
      </li>

      {!isMobile && (
        <>
          <NavItem
            icon={<FcHome />}
            route={"/"}
            closeExpand={closeExpand}
            tooltip="Home"
            label="Home"
          />
          {/*<NavItem*/}
          {/*  icon={<FcViewDetails />}*/}
          {/*  route={"/About"}*/}
          {/*  closeExpand={closeExpand}*/}
          {/*  tooltip="About"*/}
          {/*  label="About"*/}
          {/*/>*/}
          <NavItem
            icon={<FcConferenceCall />}
            route={"/Officers"}
            expand={expand}
            closeExpand={closeExpand}
            tooltip="Officers"
            label="Officers"
          />
          <NavItem
            icon={<FaHeart />}
            route={"/Sponsor"}
            expand={expand}
            closeExpand={closeExpand}
            tooltip="Sponsor"
            label="Sponsors"
          />
          <NavItem
            icon={<FcCalendar />}
            route={"/Events"}
            closeExpand={closeExpand}
            tooltip="Events"
            label="Events"
          />
          <NavItem
            icon={<FcCheckmark />}
            route={"/Join-Now"}
            expand={expand}
            closeExpand={closeExpand}
            tooltip="Join"
            label="Join"
          />
          <NavToggle
            icon={darkMode ? <ImSun /> : <PiMoonBold />}
            expand={expand}
            closeExpand={closeExpand}
            tooltip={darkMode ? "ON" : "OFF"}
            label="ToggleMode"
            toggleMode={toggleMode}
            isDarkMode={darkMode}
          />
        </>
      )}

      {isMobile && (
        <NavExpandItem
          icon={<CaretIcon />}
          expand={expand}
          togglExpand={togglExpand}
          tooltip="More"
        >
          <DropdownMenu closeExpand={closeExpand} />
        </NavExpandItem>
      )}
    </NavBar>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function getHeight(elem) {
    const height = elem.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={200}
        classNames="menu-primary"
        onEnter={getHeight}
      >
        <div className="menu">
          <NavLink to="/" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<FcHome />}>Home</DropdownItem>
          </NavLink>
          <NavLink to="/Officers" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<FcConferenceCall />}>
              Officers
            </DropdownItem>
          </NavLink>
          <NavLink to="/Events" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<FcCalendar />}>Events</DropdownItem>
          </NavLink>
          <NavLink to="/Join-Now" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<FcApproval />}>Join Now</DropdownItem>
          </NavLink>
          <DropdownItem
            leftIcon={<FcShare />}
            rightIcon={<FaChevronRight style={{ padding: 10 }} />}
            goToMenu="socials"
          >
            Social Media
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "socials"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={getHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main"></DropdownItem>
          <DropdownItem
            leftIcon={<FaDiscord />}
            url={"https://discord.gg/Pbk4sCEWDY"}
          >
            Discord
          </DropdownItem>
          <DropdownItem
            leftIcon={<FaInstagram />}
            url={"https://www.instagram.com/swecc.uw/"}
          >
            Instagram
          </DropdownItem>
          <DropdownItem
            leftIcon={<FaLinkedin />}
            url={
              "https://www.linkedin.com/company/software-engineering-career-club-at-uw/"
            }
          >
            LinkedIn
          </DropdownItem>
          <DropdownItem
            leftIcon={<FaGithub />}
            url={"https://github.com/swecc-uw"}
          >
            Github
          </DropdownItem>
          <DropdownItem
            leftIcon={<MessengerIcon />}
            url={"mailto:swecc@uw.edu"}
          >
            Email
          </DropdownItem>
          <DropdownItem
            leftIcon={<BellIcon />}
            url={
              "http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"
            }
          >
            Newsletter
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar;
