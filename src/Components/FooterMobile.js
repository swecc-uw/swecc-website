import React, { useEffect } from "react";
import SWECClogo2 from "../Data/img/SWECClogo2.jpg";
import { links } from "./Utils";

export default function Footer() {
  const [currentYr, setCurrentYr] = React.useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentYr(today.getFullYear());
  }, []);
  return (
    <footer className="hotfix">
      <div>
        <img className="footer-logo" src={SWECClogo2} alt="SWECC logo" />
        <h3>SWECC @ UW</h3>
        <ul className="links">
          <li>
            <a
              href="mailto:swecc@uw.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-envelope"></span>
            </a>
          </li>
          <li>
            <a
              href={links.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-linkedin"></span>
            </a>
          </li>
          <li>
            <a
              href={links.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-github"></span>
            </a>
          </li>
          <li>
            <a
              href={links.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-instagram"></span>
            </a>
          </li>
          <li>
            <a
              href={links.social.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fab fa-discord"></span>
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright">
        <p>
          Copyright&copy;UW SWECC {currentYr} |{" "}
          <a href="https://webimpactuw.org/">Collaboration with Web Impact</a>
        </p>
      </div>
    </footer>
  );
}
