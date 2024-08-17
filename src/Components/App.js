import React from "react";
import Footer from "./Footer.js";
import FooterHotfix from "./FooterMobile.js";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import Events from "./Events.js";
import About from "./About.js";
import JoinNow from "./Join-now.js";
import Navbar from "./Navbar.js";
import ExternalRedirect from "./Redirect.js";


function App() {
  const link = document.querySelector("link[rel~='icon']");
  link.href = require("../icons/logo-23.png");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/discord" element={<ExternalRedirect to="https://discord.gg/Z8ZDcdRqrs" />} />
        <Route path="/linkedin" element={<ExternalRedirect to="https://www.linkedin.com/company/swecc-uw/" />} />
        <Route path="/instagram" element={<ExternalRedirect to="https://www.instagram.com/swecc.uw/" />} />
        <Route path="/mailing-list" element={<ExternalRedirect to="http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist" />} />
        <Route path="/Join-Now" element={<JoinNow />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <FooterHotfix />
    </div>
  );
}

export default App;
