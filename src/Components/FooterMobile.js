import React, { useEffect } from "react";
import SWECClogo2 from "../Data/img/SWECClogo2.jpg";

export default function Footer() {
  const [currentYr, setCurrentYr] = React.useState("");
  const discordRedirect = "https://discord.gg/Z8ZDcdRqrs";
  const linkedinRedirect = "https://www.linkedin.com/company/swecc-uw/";
  const instagramRedirect = "https://www.instagram.com/swecc.uw/";
  const githubLink = "https://github.com/swecc-uw";

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
              href={linkedinRedirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-linkedin"></span>
            </a>
          </li>
          <li>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <span className="fa fa-github"></span>
            </a>
          </li>
          <li>
            <a
              href={instagramRedirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-instagram"></span>
            </a>
          </li>
          <li>
            <a href={discordRedirect} target="_blank" rel="noopener noreferrer">
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
