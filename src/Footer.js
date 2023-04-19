import React from 'react';
import './Footer.css'
import discordLogo from './discord-logo.jpg';
import instaLogo from './insta-logo.jpg';
import mailLogo from './mail-logo.jpg';
import SWECClogo2 from './SWECClogo2.jpg';

const Footer = () =>  {
    return (
      <footer>
        <div class = "contact-copyright-box">
              <div class = "contact">
                <a id = "contact-text">CONTACT</a>
                <img class = "contact-images" src = {instaLogo} alt = "instalogo" />
                <img class = "contact-images" src = {discordLogo} alt = "discord" />
                <img class = "contact-images" src = {mailLogo} alt = "mail" />
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
            <p> <a class = "email-enter"> Enter your email</a><a id = "subscribe-btn">Subscribe</a></p>
          </div>
        </div>
      </footer>
    );
  }

  export default Footer
