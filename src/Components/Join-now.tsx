import "../CSS/App.css";
import "../CSS/Join-now.css";
import React from "react";
import career from "../Data/img/career.svg";
import careerDarkmode from "../Data/img/career-darkmode.svg";
import community from "../Data/img/community.svg";
import communityDarkmode from "../Data/img/community-darkmode.svg";
import networking from "../Data/img/networking.svg";
import networkingDarkmode from "../Data/img/networking-darkmode.svg";
import Button, { type ButtonProps } from "./Button";
import { links } from "./Utils";

const { meetingDay, meetingTime, meetingLocation } = links.config;

type JoinAction = {
  label: string;
  variant?: ButtonProps["variant"];
} & ({ to: string } | { href: string });

type JoinStep = { title: string; blurb: string; actions: JoinAction[] };

const joinSteps: JoinStep[] = [
  {
    title: "Join the Discord",
    blurb:
      "Where everything happens: announcements, interview prep, job postings, and people to study with.",
    actions: [{ label: "Join Discord", href: links.social.discord }],
  },
  {
    title: "Get on the mailing list",
    blurb: "A short email each week with upcoming events and opportunities.",
    actions: [{ label: "Subscribe", href: links.resources.mailingList }],
  },
  {
    title: "Come to a meeting",
    blurb: `General meetings are ${meetingDay}s, ${meetingTime}, in ${meetingLocation}. No sign-up needed.`,
    actions: [
      { label: "See events", to: "/Events" },
      { label: "Instagram", href: links.social.instagram, variant: "outline" },
    ],
  },
];

export default function JoinNow() {
  const darkMode = true;

  return (
    <div className="entire">
      <section className="join-timeline">
        <header className="join-timeline__header">
          <p className="join-timeline__kicker">three steps</p>
          <h1 className="join-timeline__title">Join SWECC</h1>
        </header>
        <ol className="join-timeline__steps">
          {joinSteps.map((step, index) => (
            <li className="join-step" key={step.title}>
              <span className="join-step__marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="join-step__body">
                <h2 className="join-step__title">{step.title}</h2>
                <p className="join-step__blurb">{step.blurb}</p>
                <div className="join-step__actions">
                  {step.actions.map((action) => (
                    <Button
                      key={action.label}
                      variant={action.variant || "primary"}
                      size="md"
                      {...("to" in action
                        ? { to: action.to }
                        : {
                            href: action.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="join join-section info-message-section info-table">
        <table>
          <tbody className="community-benefits">
            <tr>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? networkingDarkmode : networking}
                  alt="Networking"
                />
                <div className="info-title">networking</div>
                <div className="info-text">
                  make connections in a network of future and current software
                  engineers
                </div>
              </td>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? communityDarkmode : community}
                  alt="Community"
                />
                <div className="info-title">community</div>
                <div className="info-text">
                  Join a vibrant community of future software engineers
                </div>
              </td>
              <td>
                <img
                  className="example-images"
                  src={darkMode ? careerDarkmode : career}
                  alt="Career"
                />
                <div className="info-title">career</div>
                <div className="info-text">
                  Gain access to career talks, and more opportunities
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
