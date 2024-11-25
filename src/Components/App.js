import React from "react";
import Footer from "./Footer.js";
import FooterHotfix from "./FooterMobile.js";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import Events from "./Events.js";
import JoinNow from "./Join-now.js";
import Navbar from "./Navbar.js";
import ExternalRedirect from "./Redirect.js";
import { links } from "./Utils";
import Officers from "./Officers";
import Sponsor from "./Sponsor";

function App() {
  const link = document.querySelector("link[rel~='icon']");
  link.href = require("../Data/img/Logo/SWECCLogoBackground.png");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Officers" element={<Officers />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route
          path="/discord"
          element={<ExternalRedirect to={links.social.discord} />}
        />
        <Route
          path="/linkedin"
          element={<ExternalRedirect to={links.social.linkedin} />}
        />
        <Route
          path="/instagram"
          element={<ExternalRedirect to={links.social.instagram} />}
        />
        <Route
          path="/mailing-list"
          element={<ExternalRedirect to={links.resources.mailingList} />}
        />
        <Route path="/Join-Now" element={<JoinNow />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <FooterHotfix />
    </div>
  );
}

export default App;
