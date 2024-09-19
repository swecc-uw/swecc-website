import "../CSS/Home.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import SWECCmap from "../Data/img/location.png";
import {
  ColFlexDoubleTextRightImageLeft,
  TextLeftImageRight,
} from "../Utils/CommonItems";
import { InstagramEmbed } from "react-social-media-embed";

import img1 from "../Data/img/backgroundImg/1.jpg";
import img2 from "../Data/img/backgroundImg/2.jpg";
import img3 from "../Data/img/backgroundImg/3.jpg";
import img4 from "../Data/img/backgroundImg/4.jpg";
import img5 from "../Data/img/backgroundImg/5.jpg";
import img6 from "../Data/img/backgroundImg/6.jpg";
import img7 from "../Data/img/backgroundImg/7.jpg";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function HomePage() {
  const scrollContainerRef = useRef(null);
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

        <div className="buttons-container">
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
          <a
            href="/src/Components/Officers"
            className="club-introduction-container-button"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      console.log("scroll");
      console.log(direction);
      console.log(-container.offsetWidth);
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const posts = (
    <div className="posts-carousel">
      <div className="posts" ref={scrollContainerRef}>
        <InstagramEmbed
          className="instaPost slide-up"
          url="https://www.instagram.com/p/C7uRAftvEKV/?utm_source=ig_web_copy_link"
        />
        <InstagramEmbed
          className="instaPost slide-up"
          url="https://www.instagram.com/p/C23PyAWPYdW"
        />
        <InstagramEmbed
          className="instaPost slide-up"
          url="https://www.instagram.com/p/CyRondZPVVS"
        />
        <InstagramEmbed
          className="instaPost slide-up"
          url="https://www.instagram.com/p/Cxum20yOlkQ"
        />
        <InstagramEmbed
          className="instaPost slide-up"
          url="https://www.instagram.com/p/CxrxWcQLpSb"
        />
      </div>
    </div>
  );

  return (
    <div>
      <Carousel />

      <div className="mainPage-body">
        <TextLeftImageRight
          summary="The Software Engineering Career Club (SWECC) is a student-led
        organization at the University of Washington in Seattle. Our mission
        is to support and empower individuals interested in pursuing a
        successful career in software engineering. We offer a wide range of
        activities and resources, including networking events, LeetCode
        challenges, mentorship programs, and interview preparation, to help
        our members thrive in the field. Join SWECC to jumpstart your
        software engineering career with confidence and connections!"
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
        <div className="buttons-container">
          <button
            className="posts-carousel--left"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>

          <button
            className="posts-carousel--right"
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </button>
        </div>
        <h2>Why Join Us</h2>
        <p>
          We are a club with over 1000 members from CS-related departments.{" "}
          <br />
          We invite industry-professionals to share their experiences and we
          host <br />
          prize-awarding coding events to encourage student to build projects
          and meet <br />
          new peers
        </p>
        <a
          href="https://discord.gg/HjeGCW4M"
          className="club-introduction-container-button"
        >
          Join Us
        </a>
        {posts}
      </div>
    </div>
  );
}

export default HomePage;
