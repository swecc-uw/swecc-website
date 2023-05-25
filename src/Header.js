import React from 'react';
import SWECClogo from './SWECClogo.jpg';
import './Header.css'
import { NavLink } from 'react-router-dom';


const Header = () =>  {
    return (
      <nav class = "full-nav">
        <div class = "header-logo">
            <NavLink to="/">
              <img id = "nav-logo" src = {SWECClogo} alt = "SWECC Logo"/>
            </NavLink>
        </div>
        <div class = "nav-bar">
          <a class = "header-pages"><NavLink to="/"> HOME </NavLink></a>
          <a class = "header-pages"><NavLink to="/Events" class = "header-pages"> EVENTS </NavLink> </a>
          <a class = "header-pages"> <NavLink to="/About" class = "header-pages"> ABOUT </NavLink>  </a>
          <a class = "header-pages"> <NavLink to="/Join-Now" id = "join-now-btn" class = "header-pages"> JOIN NOW </NavLink> </a>
        </div>
      </nav>
      
    )
}

export default Header;
