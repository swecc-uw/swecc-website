import "../CSS/HomeAbout.css";
import React, { useEffect, useRef, type CSSProperties } from "react";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import Button from "./Button";
import { links } from "./Utils";
import workshopImg from "../Data/img/backgroundImg/1.webp";
import generalMeetingImg from "../Data/img/backgroundImg/2.webp";
import pairingImg from "../Data/img/backgroundImg/3.webp";
import mentorImg from "../Data/img/backgroundImg/7.webp";

const { currentQuarter, meetingDay, meetingTime, meetingLocation } =
  links.config;

const pillars = ["Projects", "Mentorship", "Workshops", "Community"];

const mosaic = [
  { src: workshopImg, alt: "SWECC members in a discussion-style club meeting" },
  { src: pairingImg, alt: "A mentor helping two students debug on a laptop" },
  { src: mentorImg, alt: "Students pair programming with an industry mentor" },
];

const topics = [
  "Professional development",
  "Resume building",
  "Mentor circles",
];

type MeetingFact = { label: string; value: string; href?: string };

const meetingFacts: MeetingFact[] = [
  {
    label: "When",
    value: `${meetingDay}s, ${meetingTime
      .replace("-", " – ")
      .replace(/(\d)([AP]M)/g, "$1 $2")}`,
  },
  {
    label: "Where",
    value: meetingLocation,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${meetingLocation}, University of Washington, Seattle`,
    )}`,
  },
];

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function HomeAbout() {
  const aboutRef = useRevealOnce<HTMLElement>();
  const meetingsRef = useRevealOnce<HTMLElement>();

  return (
    <>
      <section
        ref={aboutRef}
        data-reveal="pending"
        className="about home-band home-band--grey"
        aria-labelledby="about-title"
      >
        <div className="home-band__inner about__inner">
          <div className="about__copy">
            <p className="about__eyebrow reveal" style={stagger(0)}>
              <span aria-hidden>~/</span>who-we-are
            </p>
            <h2
              id="about-title"
              className="about__title reveal"
              style={stagger(1)}
            >
              We help students become <em>exceptional builders.</em>
            </h2>
            <p className="about__lede reveal" style={stagger(2)}>
              SWECC is a student-led community at UW for aspiring software
              engineers. Through hands-on projects, mentorship, workshops, and a
              network of ambitious peers, we help you build the skills,
              experience, and connections to launch a career in tech.
            </p>
            <ol className="about__pillars reveal" style={stagger(3)}>
              {pillars.map((pillar, i) => (
                <li key={pillar}>
                  <span className="about__pillar-index" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pillar}
                </li>
              ))}
            </ol>
          </div>
          <div className="about__mosaic">
            {mosaic.map((photo, i) => (
              <figure
                key={photo.src}
                className={`about__photo about__photo--${i} reveal-photo`}
                style={stagger(i + 1)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={meetingsRef}
        data-reveal="pending"
        className="meetings home-band home-band--grey"
        aria-labelledby="meetings-title"
      >
        <div className="home-band__inner meetings__inner">
          <header className="meetings__header">
            <p className="about__eyebrow reveal" style={stagger(0)}>
              <span aria-hidden>~/</span>meetings
            </p>
            <h2
              id="meetings-title"
              className="about__title reveal"
              style={stagger(1)}
            >
              See you on <em>{meetingDay}s.</em>
            </h2>
            <p className="about__lede reveal" style={stagger(2)}>
              General meetings are the heart of SWECC. Drop in to learn
              something new and meet people on the same path as you.
            </p>
            <ul
              className="meetings__topics reveal"
              style={stagger(3)}
              aria-label="Meeting topics"
            >
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </header>

          <figure className="meetings__photo reveal-photo" style={stagger(1)}>
            <img
              src={generalMeetingImg}
              alt="A packed SWECC general meeting in a lecture hall"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <aside
            className="meetings__pass reveal"
            style={stagger(3)}
            aria-label="Meeting details"
          >
            <div className="meetings__ticket">
              <div className="meetings__pass-head">
                <span className="meetings__pass-kicker">General meeting</span>
                <span className="meetings__pass-live">
                  <span className="meetings__pass-dot" aria-hidden />
                  {currentQuarter.replace(/[()]/g, "")}
                </span>
              </div>
              <dl className="meetings__facts">
                {meetingFacts.map((fact) => (
                  <div key={fact.label} className="meetings__fact">
                    <dt>{fact.label}</dt>
                    <dd>
                      {fact.href ? (
                        <a
                          href={fact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {fact.value}
                          <FiArrowUpRight aria-hidden />
                        </a>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <Button
                variant="primary"
                size="lg"
                href={links.resources.calendarSubscribe}
                target="_blank"
                rel="noopener noreferrer"
                className="meetings__cta"
              >
                <FiCalendar aria-hidden />
                Add to calendar
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default HomeAbout;
