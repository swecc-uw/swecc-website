import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as CaretIcon } from "../icons/caret.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import {
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaChevronRight,
  FaGithub,
} from "react-icons/fa";
import {
  FcShare,
  FcCalendar,
  FcConferenceCall,
  FcHome,
} from "react-icons/fc";
import { NavBar, NavExpandItem, NavItem } from "./Utils/NavItems";
import SWECCLogoWhite from "../Data/img/Logo/SWECCLogoWhite.png";
import { links } from "./Utils";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark-mode");
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [expand, setExpand] = useState(false);

  const togglExpand = () => {
    setExpand(!expand);
  };

  const closeExpand = () => {
    setExpand(false);
  };

  const [animate, setAnimate] = useState(false);

  const handleLogoClick = () => {
    // maintain previous functionality
    closeExpand();
    // animation part
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500)
  }

  return (
    <NavBar>
      <li className={`nav-Logo-Item ${animate ? 'pulse' : ''}`} onClick={handleLogoClick}>
        <NavLink to="/">
          <img className="swecc-logo" src={SWECCLogoWhite} alt="SWECC Logo" />
        </NavLink>
      </li>

      {!isMobile && (
        <>
          <NavItem
            route="/"
            closeExpand={closeExpand}
            tooltip="Home"
            label="HOME"
          />
          <NavItem
            route="/Officers"
            closeExpand={closeExpand}
            tooltip="Officers"
            label="OFFICERS"
          />
          <NavItem
            route="/Events"
            closeExpand={closeExpand}
            tooltip="Events"
            label="EVENTS"
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
          <DropdownItem leftIcon={<FaDiscord />} url={links.social.discord}>
            Discord
          </DropdownItem>
          <DropdownItem leftIcon={<FaInstagram />} url={links.social.instagram}>
            Instagram
          </DropdownItem>
          <DropdownItem leftIcon={<FaLinkedin />} url={links.social.linkedin}>
            LinkedIn
          </DropdownItem>
          <DropdownItem leftIcon={<FaGithub />} url={links.social.github}>
            Github
          </DropdownItem>
          <DropdownItem
            leftIcon={<BellIcon />}
            url={links.resources.mailingList}
          >
            Newsletter
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar;
