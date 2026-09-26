import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";
import SWECCWordmark from "../Data/img/Logo/SWECCWordmarkWhite.png";
import {
  communityLinks,
  externalLinkProps,
  joinLink,
  siteLinks,
} from "./Utils";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <img
              className="site-footer__logo"
              src={SWECCWordmark}
              alt="SWECC"
            />
            <p className="site-footer__about">
              Software Engineering Career Club at the University of Washington.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            <div className="site-footer__col">
              <h2 className="site-footer__heading">Site</h2>
              <ul className="site-footer__list">
                {[...siteLinks, joinLink].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="site-footer__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="site-footer__col">
              <h2 className="site-footer__heading">Community</h2>
              <ul className="site-footer__list">
                {communityLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="site-footer__link"
                      {...externalLinkProps(href)}
                    >
                      <Icon className="site-footer__icon" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__prompt">
            swecc@uw:~<span className="site-footer__prompt-sigil">$</span>
            <span className="site-footer__cursor" aria-hidden="true" />
          </p>
          <p className="site-footer__legal">
            <span>© {new Date().getFullYear()} UW SWECC</span>
            <a
              href="https://webimpactuw.org/"
              className="site-footer__link"
              {...externalLinkProps("https://webimpactuw.org/")}
            >
              Built with Web Impact
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
