import React from 'react';
import '../CSS/Footer.css'
import discordLogo from '../Data/img/discord-logo.jpg';
import instaLogo from '../Data/img/insta-logo.jpg';
import LinkedInLogo from '../Data/img/LinkedInLogo.jpg';
import SWECClogo2 from '../Data/img/SWECClogo2.jpg';

const Footer = () => {
  return (
    <footer>
      <div className="contact-copyright-box">
        <div className="contact">
          <a href="mailto:swecc@uw.edu" className="contact-text">CONTACT</a>
          <a href="https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y="><img className="contact-images" src={instaLogo} alt="instalogo" /> </a>
          <a href="https://discord.com/invite/Pbk4sCEWDY"><img className="contact-images" src={discordLogo} alt="discord" /></a>
          <a href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/"><img className="contact-images" src={LinkedInLogo} alt="mail" /></a>
        </div>
        <div className="copyright">
          <img className="footer-logo" src={SWECClogo2} alt="SWECC logo" />
          <div className="copyright-text">
            <p className="copyright-message"> Copyright © UW SWECC 2023</p>
            <p className="collaboration-message">Collaboration with Dubvelopers</p>
          </div>
        </div>
      </div>
      <div className="email-hook">
        <div className="email-message">
          <p className="stay-in-touch">Let's stay in touch!</p>
          <p className="join-newsletter">Join our newsletter</p>
        </div>
        <div className="email-box">
          <p> <input placeholder="Enter your email" className="email-enter"></input><button type="button" className="subscribe-btn">Subscribe</button></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
