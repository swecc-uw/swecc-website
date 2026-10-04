import "../CSS/HomeAbout.css";
import React, { useRef, useState } from "react";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import Button from "./Button";
import { links, stagger, useRevealOnce } from "./Utils";
import workshopImg from "../Data/img/backgroundImg/1.webp";
import generalMeetingImg from "../Data/img/backgroundImg/2.webp";
import pairingImg from "../Data/img/backgroundImg/3.webp";
import mentorImg from "../Data/img/backgroundImg/7.webp";

const { currentQuarter, meetingDay, meetingTime, meetingLocation } =
  links.config;

const pillars = [
  "Hands-on projects",
  "Mentorship",
  "Workshops",
  "Peer network",
];

const mosaic = [
  { src: workshopImg, alt: "SWECC members in a discussion-style club meeting" },
  {
    src: pairingImg,
    alt: "SWECC members gathered around a laptop at a workshop",
  },
  { src: mentorImg, alt: "Two SWECC members comparing code on their laptops" },
];

const topics = [
  "Professional development",
  "Resume building",
  "Mentor circles",
];

type MeetingFact = {
  label: string;
  value: string;
  detail?: string;
  href?: string;
};

const meetingFacts: MeetingFact[] = [
  {
    label: "When",
    value: `${meetingDay}s`,
    detail: meetingTime.replace("-", " – ").replace(/(\d)([AP]M)/g, "$1 $2"),
  },
  {
    label: "Where",
    value: meetingLocation,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${meetingLocation}, University of Washington, Seattle`,
    )}`,
  },
];

function HomeAbout() {
  const aboutRef = useRevealOnce<HTMLElement>();
  const meetingsRef = useRevealOnce<HTMLElement>();
  const photosRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);

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
              Exceptional builders. <em>Confident problem-solvers.</em>
            </h2>
            <p className="about__lede reveal" style={stagger(2)}>
              SWECC is a student-led community dedicated to helping aspiring
              software engineers build the skills, experience, and connections
              needed to succeed in tech. Through hands-on projects, mentorship,
              workshops, and a supportive network of ambitious peers, we create
              opportunities for students to grow as engineers and launch
              meaningful careers in software.
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
          <section
            className="about__gallery"
            aria-label="SWECC community photos"
          >
            <div
              className="about__mosaic"
              id="about-photos"
              ref={photosRef}
              onScroll={(event) => {
                const track = event.currentTarget;
                setActivePhoto(
                  Math.round(track.scrollLeft / track.clientWidth),
                );
              }}
            >
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
            <div className="about__carousel-controls">
              <span>Swipe to explore</span>
              <div className="about__carousel-dots">
                {mosaic.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    aria-label={`Show photo ${i + 1} of ${mosaic.length}`}
                    aria-controls="about-photos"
                    aria-pressed={activePhoto === i}
                    onClick={() => {
                      const track = photosRef.current;
                      if (track)
                        track.scrollTo({ left: i * track.clientWidth });
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
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
              Build your skills and connect with other aspiring software
              engineers at SWECC meetings. We cover a wide range of topics,
              including professional development, resume building, and mentor
              circles. Come learn from others and find support for your next
              step in tech.
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
                      {fact.detail && (
                        <span className="meetings__fact-detail">
                          {fact.detail}
                        </span>
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
