import "../CSS/Home.css";
import React, { useRef } from "react";
import Button from "./Button";
import TerminalWindow from "./TerminalWindow";
import ClusterShell from "./ClusterShell";
import InitiativeCard from "./InitiativeCard";
import HomeAbout from "./HomeAbout";
import { links, stagger, useRevealOnce } from "./Utils";
import { FaDiscord } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";

type Program = {
  title: string;
  accent: "sage" | "lavender";
  file: string;
  blurb: string;
  cta: { label: string; href: string };
};

const programs: Program[] = [
  {
    title: "SWECC Labs",
    accent: "sage",
    file: "labs.md",
    blurb:
      "Build software with other students through hands-on, open source projects. Gain practical engineering experience and grow as a problem-solver.",
    cta: { label: "Join Labs", href: links.programs.labs },
  },
  {
    title: "Mock Interviews",
    accent: "lavender",
    file: "interviews.md",
    blurb:
      "Practice technical and non-technical interviews with peers. Build confidence explaining your approach and prepare for the next step in your software career.",
    cta: { label: "Book a slot", href: links.programs.interviews },
  },
  {
    title: "Mentorship Program",
    accent: "sage",
    file: "mentorship.md",
    blurb:
      "Learn from upperclassmen and alumni who have been in your shoes. Get guidance as you grow as an engineer and explore careers in software.",
    cta: { label: "Join the Discord", href: links.social.discord },
  },
  {
    title: "Cohort Program",
    accent: "lavender",
    file: "cohort.md",
    blurb:
      "Find a supportive group of ambitious peers to navigate interview prep and job applications together. Stay accountable and build connections along the way.",
    cta: { label: "Join a cohort", href: links.programs.cohort },
  },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const initiativesRef = useRevealOnce<HTMLElement>();

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
        ref={initiativesRef}
        data-reveal="pending"
        className="home-initiatives home-band home-band--black"
        id="initiatives"
        tabIndex={-1}
        aria-labelledby="initiatives-title"
      >
        <div className="home-band__inner home-initiatives__inner">
          <header className="home-initiatives__header">
            <p className="about__eyebrow reveal" style={stagger(0)}>
              <span aria-hidden>~/</span>programs
            </p>
            <h2
              id="initiatives-title"
              className="about__title reveal"
              style={stagger(1)}
            >
              Build your future in <em>software.</em>
            </h2>
          </header>
          <ul className="home-initiatives__grid">
            {programs.map((program, i) => (
              <InitiativeCard
                key={program.title}
                {...program}
                className="reveal"
                style={stagger(2 + i)}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
