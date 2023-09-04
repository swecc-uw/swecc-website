import React from "react";
import "../CSS/Footer.css";
import discordLogo from "../Data/img/discord-logo.jpg";
import instaLogo from "../Data/img/insta-logo.jpg";
import LinkedInLogo from "../Data/img/LinkedInLogo.jpg";
import SWECClogo2 from "../Data/img/SWECClogo2.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-contents-container">
        <div className="row">
          <span className="links-section">
            <a href="mailto:swecc@uw.edu" className="contact-text" target="_blank" rel="noopener noreferrer">
              CONTACT
            </a>
            <a href="https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={instaLogo} alt="instalogo" />
            </a>
            <a href="https://discord.com/invite/Pbk4sCEWDY" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={discordLogo} alt="discord" />
            </a>
            <a href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/" target="_blank" rel="noopener noreferrer">
              <img className="contact-images" src={LinkedInLogo} alt="mail" />
            </a>
            <a
              href="http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"
              className="join-newsletter"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our newsletter
            </a>
          </span>

          <span className="copyright-section">
            <img className="footer-logo" src={SWECClogo2} alt="SWECC logo" />

            <span className="copyright-message"> Copyright © UW SWECC 2023</span>
            <span className="collaboration-message">Collaboration with Dubvelopers</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
