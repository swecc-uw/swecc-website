import React, { useEffect } from "react";
import "../CSS/Footer.css";
import discordLogo from "../Data/img/discord-logo.jpg";
import instaLogo from "../Data/img/insta-logo.jpg";
import LinkedInLogo from "../Data/img/LinkedInLogo.jpg";
import SWECClogo2 from "../Data/img/SWECClogo2.jpg";

const Footer = () => {
  const [currentYr, setCurrentYr] = React.useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentYr(today.getFullYear());
  }, []);

  return (
    <footer className="og-footer">
      <div className="footer-contents-container">
        <div className="row">
          <span className="links-section">
            <a href="mailto:swecc@uw.edu" className="contact-text" target="_blank" rel="noopener noreferrer">
              Contact
            </a>
            <a href="/instagram" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={instaLogo} alt="instalogo" />
            </a>
            <a href="/discord" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={discordLogo} alt="discord" />
            </a>
            <a href="/linkedin" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={LinkedInLogo} alt="mail" />
            </a>
            <a
              href="/mailing-list"
              className="join-newsletter"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our newsletter
            </a>
          </span>

          <span className="copyright-section">
            <img className="footer-logo" src={SWECClogo2} alt="SWECC logo" />

            <span className="copyright-message"> Copyright © UW SWECC {currentYr}</span>

            <span className="collaboration-message"><a className="collaboration-message-link" href="https://webimpactuw.org/">Collaboration with Web Impact</a></span>

          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
