import "../CSS/Home.css";
import React, { useRef } from "react";
import Button from "./Button";
import TerminalWindow from "./TerminalWindow";
import ClusterShell from "./ClusterShell";
import InitiativeCard from "./InitiativeCard";
import HomeAbout from "./HomeAbout";
import { links } from "./Utils";
import { FaDiscord } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    section.focus({ preventScroll: true });
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

      <HomeAbout />

      <section
        className="home-initiatives home-band home-band--black"
        id="initiatives"
        tabIndex={-1}
        aria-labelledby="initiatives-title"
      >
        <h2
          id="initiatives-title"
          className="type-display mono home-initiatives__title"
        >
          Build your future in software
        </h2>
        <div className="home-initiatives__grid">
          <InitiativeCard
            title="SWECC LABS"
            accent="sage"
            command="cat labs.md"
            action={{ label: "Join Labs", href: links.programs.labs }}
          >
            Build software with other students through hands-on, open source
            projects. Gain practical engineering experience and grow as a
            problem-solver.
          </InitiativeCard>
          <InitiativeCard
            title="MOCK INTERVIEWS"
            accent="mentorship"
            command="cat interviews.md"
            action={{ label: "Book a slot", href: links.programs.interviews }}
          >
            Practice technical and non-technical interviews with peers. Build
            confidence explaining your approach and prepare for the next step
            in your software career.
          </InitiativeCard>
          <InitiativeCard
            title="MENTORSHIP PROGRAM"
            accent="sage"
            command="cat mentorship.md"
            action={{ label: "Join the Discord", href: links.social.discord }}
          >
            Learn from upperclassmen and alumni who have been in your shoes.
            Get guidance as you grow as an engineer and explore careers in
            software.
          </InitiativeCard>
          <InitiativeCard
            title="COHORT PROGRAM"
            accent="mentorship"
            command="cat cohort.md"
            action={{ label: "Join a cohort", href: links.programs.cohort }}
          >
            Find a supportive group of ambitious peers to navigate interview
            prep and job applications together. Stay accountable and build
            connections along the way.
          </InitiativeCard>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
