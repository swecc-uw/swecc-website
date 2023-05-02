import React from 'react';
import './Footer.css'
import discordLogo from './discord-logo.jpg';
import instaLogo from './insta-logo.jpg';
import LinkedInLogo from './LinkedInLogo.jpg';
import SWECClogo2 from './SWECClogo2.jpg';
import { Link } from 'react-router-dom';

const Footer = () =>  {
    return (
      <footer>
        <div class = "contact-copyright-box">
              <div class = "contact">
                <a id = "contact-text">CONTACT</a>
                <a href = "https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y="><img class = "contact-images" src = {instaLogo} alt = "instalogo" /> </a>
                <a href = "https://discord.com/invite/Pbk4sCEWDY"><img class = "contact-images" src = {discordLogo} alt = "discord" /></a>
                <a href = "https://www.linkedin.com/company/software-engineering-career-club-at-uw/"><img class = "contact-images" src = {LinkedInLogo} alt = "mail" /></a>
              </div>
              <div class = "copyright">
                <img id = "footer-logo" src = {SWECClogo2} alt = "SWECC logo" />
                <div class = "copyright-text">
                  <p id = "copyright-message"> Copyright © UW SWECC 2023</p>
                  <p id = "collaboration-message">Collaboration with Dubvelopers</p>
                </div>
              </div>
        </div>
        <div className="email-hook">
          <div class = "email-message">
            <p id = "stay-in-touch">Let's stay in touch!</p>
            <p id = "join-newsletter">Join our newsletter</p>
          </div>
          <div class = "email-box">
            <p> <input placeholder = "Enter your email" class = "email-enter"></input><button type = "button" id = "subscribe-btn">Subscribe</button></p>
          </div>
        </div>
      </footer>
    );
  }

  export default Footer
