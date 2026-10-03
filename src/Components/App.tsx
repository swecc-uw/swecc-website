import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import { Route, Routes, useLocation } from "react-router";
import Home from "./Home";
import Events from "./Events";
import Navbar from "./Navbar";
import Intro from "./Intro";
import ExternalRedirect from "./Redirect";
import { links } from "./Utils";
import Officers from "./Officers";
import OfficerApplication from "./OfficerApplication";

export const PAGE_TITLES: Record<string, string> = {
  "/Officers": "Officers | SWECC",
  "/Events": "Events | SWECC",
  "/OfficerApplication": "Officer Applications | SWECC",
};

export const REDIRECTS: Record<string, string> = {
  "/discord": links.social.discord,
  "/linkedin": links.social.linkedin,
  "/instagram": links.social.instagram,
  "/mailing-list": links.resources.mailingList,
  "/officer-application": links.resources.officerApp,
  "/Join-Now": links.social.discord,
};

function App() {
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
          {Object.entries(REDIRECTS).map(([path, to]) => (
            <Route
              key={path}
              path={path}
              element={<ExternalRedirect to={to} />}
            />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
