import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../CSS/Navbar.css";
import SWECCWordmark from "../Data/img/Logo/SWECCWordmarkWhite.png";
import {
  communityLinks,
  externalLinkProps,
  joinLink,
  siteLinks,
} from "./Utils";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.classList.add("dark-mode");
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand" onClick={closeMenu}>
          <img className="site-nav__logo" src={SWECCWordmark} alt="SWECC" />
        </Link>

        <div className="site-nav__actions">
          <ul className="site-nav__links">
            {siteLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className="site-nav__link">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to={joinLink.to} className="site-nav__cta" onClick={closeMenu}>
            {joinLink.label}
          </Link>
          <button
            type="button"
            className="site-nav__toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div id="site-nav-menu" className="site-nav__menu" hidden={!menuOpen}>
        <ul className="site-nav__menu-links">
          {siteLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className="site-nav__menu-link"
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="site-nav__social">
          {communityLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className="site-nav__social-link"
                aria-label={label}
                {...externalLinkProps(href)}
                onClick={closeMenu}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
