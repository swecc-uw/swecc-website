import "../CSS/Home.css";
import React, { useRef } from "react";
import Button from "./Button";
import TerminalWindow from "./TerminalWindow";
import ClusterShell from "./ClusterShell";
import InitiativeCard from "./InitiativeCard";
import whoWeAreImg from "../Data/img/backgroundImg/1.jpg";
import meetingsImg from "../Data/img/backgroundImg/4.jpg";
import { links } from "./Utils";
import { FaDiscord } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
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
            <Button
              variant="primary"
              size="lg"
              href={links.social.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord aria-hidden />
              Join the Discord
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollTo("initiatives")}
            >
              Explore programs
              <FiArrowDown aria-hidden className="swecc-button__nudge" />
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
            command="cat labs.md"
            action={{ label: "Join Labs", href: links.programs.labs }}
          >
            A program for fostering an open source community for career
            development.
          </InitiativeCard>
          <InitiativeCard
            title="MOCK INTERVIEWS"
            accent="mentorship"
            command="cat interviews.md"
            action={{ label: "Book a slot", href: links.programs.interviews }}
          >
            Prepare for technical and non-technical interviews through
            scheduled mock interviews.
          </InitiativeCard>
          <InitiativeCard
            title="MENTORSHIP PROGRAM"
            accent="sage"
            command="cat mentorship.md"
            action={{ label: "Join the Discord", href: links.social.discord }}
          >
            Connect with upperclassmen and alumni and get a chance to learn
            from their experiences.
          </InitiativeCard>
          <InitiativeCard
            title="COHORT PROGRAM"
            accent="mentorship"
            command="cat cohort.md"
            action={{ label: "Join a cohort", href: links.programs.cohort }}
          >
            A smaller community to help keep you accountable for interview
            prep and job applications.
          </InitiativeCard>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
