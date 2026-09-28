import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Events from "./Events";
import Navbar from "./Navbar";
import Intro from "./Intro";
import ExternalRedirect from "./Redirect";
import { links } from "./Utils";
import favicon from "../icons/logo-23.png";
import Officers from "./Officers";
import OfficerApplication from "./OfficerApplication";

const PAGE_TITLES: Record<string, string> = {
  "/Officers": "Officers | SWECC",
  "/Events": "Events | SWECC",
  "/OfficerApplication": "Officer Applications | SWECC",
};

function App() {
  const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (link) link.href = favicon;

  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? "SWECC";
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro />
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1}>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
