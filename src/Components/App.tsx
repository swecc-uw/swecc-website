import React from "react";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Events from "./Events";
import Navbar from "./Navbar";
import ExternalRedirect from "./Redirect";
import { links } from "./Utils";
import favicon from "../icons/logo-23.png";
import Officers from "./Officers";
import OfficerApplication from "./OfficerApplication";

function App() {
  const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (link) link.href = favicon;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Officers" element={<Officers />} />
        <Route path="/OfficerApplication" element={<OfficerApplication/>}/>
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
        <Route 
          path="/officer-application" 
          element={<ExternalRedirect to={links.resources.officerApp} />}
        />
        <Route
          path="/Join-Now"
          element={<ExternalRedirect to={links.social.discord} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
