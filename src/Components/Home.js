import "../CSS/Home.css";
import React, { useEffect, useRef, useState } from "react";
import SWECCmap from "../Data/img/location.png";
import {
  ColFlexDoubleTextRightImageLeft,
  TextLeftImageRight,
} from "./Utils/CommonItems";
import BeholdWidget from "@behold/react";
import img1 from "../Data/img/backgroundImg/1.jpg";
import img2 from "../Data/img/backgroundImg/2.jpg";
import img3 from "../Data/img/backgroundImg/3.jpg";
import img4 from "../Data/img/backgroundImg/4.jpg";
import img5 from "../Data/img/backgroundImg/5.jpg";
import img6 from "../Data/img/backgroundImg/6.jpg";
import img7 from "../Data/img/backgroundImg/7.jpg";
import { links } from "./Utils";

function HomePage() {
  function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const backGroundImgs = [img1, img2, img3, img4, img5, img6, img7];
    const darkMode = JSON.parse(localStorage.getItem("isToggled"));

    useEffect(() => {
      const intervalId = setInterval(nextImg, 6000);

      return () => clearInterval(intervalId);
    }, [backGroundImgs]);

    const nextImg = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === backGroundImgs.length - 1 ? 0 : prevIndex + 1,
      );
    };

    const prevImg = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? backGroundImgs.length - 1 : prevIndex - 1,
      );
    };

    const scrollToSection = (sectionName) => {
      const sections = document.getElementsByClassName(sectionName);
      if (sections.length > 0) {
        sections[0].scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <div className="clubTitleSection">
        {backGroundImgs.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Background ${index}`}
            className={`background-img ${index === currentIndex ? "" : "hide"}`}
          />
        ))}

        <div className="title-buttons-container">
          <button onClick={prevImg} className="prevImgButton">
            <span className="material-symbols-outlined">navigate_before</span>
          </button>

          <button onClick={nextImg} className="nextImgButton">
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>

        <div className="club-introduction-container">
          <h1>Software Engineering Career Club</h1>
          <p>at the University of Washington</p>
          <button
            className="club-introduction-container-button"
            onClick={() => scrollToSection("whyJoinUs")}
          >
            Learn More
          </button>
        </div>
      </div>
    );
  }

  function InstagramPostsWidget() {
    return <BeholdWidget feedId={links.config.beholdFeedId} />;
  }

  return (
    <div>
      <Carousel />

      <div className="mainPage-body">
        <TextLeftImageRight
          summary="The Software Engineering Career Club (SWECC) is a student-led
organization at the University of Washington in Seattle. Our mission
is to support and empower individuals interested in pursuing a
career in software engineering. We offer a wide range of
activities and resources, including networking events, resume reviews,
mentorship programs, interview preparation, and more. Join us to jumpstart your software engineering career!"
          summaryTitle="Who we are"
          image={img3}
        />
        <ColFlexDoubleTextRightImageLeft
          title1="SWECC Meetings"
          title2="Meeting Times/Location (Autumn 2024)"
          content1="SWECC Meeting feature topics in a vast number of
          areas, including professional development, resume building, and mentor
          circles"
          content2="Weekly on Wednesday, 5:30-6:30pm, Loew Hall 216"
          image={SWECCmap}
        />
      </div>

      <div className="whyJoinUs">
        <h2>Why Join?</h2>
        <p>
          Be part of a community of over 1000 people pursuing a career in
          software engineering. <br />
          Gain access to resources, including resume reviews, mock interviews,
          mentorship programs, and more. <br />
          Expand your network and connect with like-minded students and industry
          professionals <br />
        </p>
        <a
          href={links.social.discord}
          className="club-introduction-container-button"
        >
          Join Us
        </a>
        {InstagramPostsWidget()}
      </div>
    </div>
  );
}

export default HomePage;
