import "../CSS/Home.css";
import React, { useRef } from "react";
import Button from "./Button";
import TerminalWindow from "./TerminalWindow";
import ClusterShell from "./ClusterShell";
import InitiativeCard from "./InitiativeCard";
import whoWeAreImg from "../Data/img/backgroundImg/1.jpg";
import meetingsImg from "../Data/img/backgroundImg/4.jpg";
import { links } from "./Utils";

function HomePage() {
  const heroRef = useRef(null);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <section className="home-hero home-band home-band--black">
        <div className="home-band__inner home-hero__inner" ref={heroRef}>
        <div className="home-hero__copy">
          <h1 className="home-hero__title">
            <span className="type-hero-mono">Software</span>
            <span className="type-hero-mono">Engineering</span>
            <span className="type-hero-sans">CAREER CLUB</span>
          </h1>
          <p className="home-hero__kicker">
            AT THE <em>UNIVERSITY OF WASHINGTON</em>
          </p>
          <div className="home-hero__actions">
            <Button variant="primary" size="md" to="/Join-Now">
              Join Us
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => scrollTo("initiatives")}
            >
              Explore Programs +
            </Button>
          </div>
        </div>
        <TerminalWindow
          className="home-hero__terminal"
          draggable
          boundsRef={heroRef}
        >
          <ClusterShell />
        </TerminalWindow>
        </div>
      </section>

      <section className="home-about home-band home-band--grey">
        <div className="home-band__inner home-about__row">
          <div className="home-about__text">
            <h2 className="type-display mono">Who we are</h2>
            <p className="type-body">
              SWECC is a student-led community dedicated to helping aspiring
              software engineers build the skills, experience, and connections
              needed to succeed in tech. Through hands-on projects, mentorship,
              workshops, and a supportive network of ambitious peers, we create
              opportunities for students to grow as engineers and launch
              meaningful careers in software. Our mission is simple: help
              students become exceptional builders and confident problem-solvers.
            </p>
          </div>
          <img
            className="home-about__photo"
            src={whoWeAreImg}
            alt="SWECC members in a club meeting"
          />
        </div>
      </section>

      <section className="home-about home-band home-band--grey">
        <div className="home-band__inner home-about__row home-about__row--reverse">
          <img
            className="home-about__photo"
            src={meetingsImg}
            alt="SWECC general meeting in a lecture classroom"
          />
          <div className="home-about__text">
            <h2 className="type-display mono">Meetings</h2>
            <p className="type-body">
              SWECC Meetings feature topics in a vast number of areas, including
              professional development, resume building, and mentor circles
            </p>
            <h3 className="home-about__subhead mono">
              Meeting Times &amp; Location
            </h3>
            <p className="home-about__meta type-body">
              {links.config.currentQuarter.replace(/[()]/g, "")}: Weekly on{" "}
              {links.config.meetingDay}
              <br />
              Time: {links.config.meetingTime}
              <br />
              Location: {links.config.meetingLocation}
            </p>
          </div>
        </div>
      </section>

      <section className="home-initiatives home-band home-band--black" id="initiatives">
        <h2 className="type-display mono home-initiatives__title">
          Other Initiatives
        </h2>
        <div className="home-initiatives__grid">
          <InitiativeCard
            title="SWECC LABS"
            accent="sage"
            actionLabel="details"
            actionHref={links.social.discord}
          />
          <InitiativeCard
            title="MOCK INTERVIEWS"
            accent="mentorship"
            actionLabel="details"
            actionTo="/Events"
          />
          <InitiativeCard
            title="MENTORSHIP PROGRAM"
            accent="sage"
            actionLabel="details"
            actionTo="/Join-Now"
          />
          <InitiativeCard
            title="COHORT PROGRAM"
            accent="mentorship"
            actionLabel="details"
            actionTo="/Join-Now"
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
