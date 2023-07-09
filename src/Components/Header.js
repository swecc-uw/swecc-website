import React from 'react';
import SWECClogo from '../Data/img/SWECClogo.jpg';
import '../CSS/Header.css'
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <nav className="full-nav">
      <div className="header-logo">
        <NavLink to="/">
          <img className="nav-logo" src={SWECClogo} alt="SWECC Logo" />
        </NavLink>
      </div>
      <div className="nav-bar">
        <ul>
          <NavLink to="/" className="nav-link">HOME</NavLink>
          <NavLink to="/Events" className="nav-link">EVENTS</NavLink>
          <NavLink to="/About" className="nav-link">ABOUT</NavLink>
          <NavLink to="/Join-Now" className="join-now-btn nav-link">JOIN NOW</NavLink>
        </ul>
      </div>
    </nav>

  )
}

export default Header;
