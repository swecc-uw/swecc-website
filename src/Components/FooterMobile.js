import React, { useEffect } from "react";
import SWECClogo2 from "../Data/img/SWECClogo2.jpg";

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
              href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-linkedin"></span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/swecc-uw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-github"></span>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-instagram"></span>
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/invite/Pbk4sCEWDY"
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
