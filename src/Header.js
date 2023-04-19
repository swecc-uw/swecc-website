import React from 'react';
import SWECClogo from './SWECClogo.jpg';
import './Header.css'

const Header = () =>  {
    return (
      <nav class = "full-nav">
        <div class = "header-logo">
            <img id = "nav-logo" src = {SWECClogo} alt = "SWECC Logo"/>
        </div>
        <div class = "nav-bar">
          <a href="#" class = "header-pages"> HOME   </a>
          <a href="#" class = "header-pages"> EVENTS   </a>
          <a href="#" class = "header-pages"> ABOUT   </a>
          <a href="#" id = "join-now-btn" class = "header-pages"> JOIN NOW </a>
        </div>
      </nav>
    )
}

export default Header;
