import React from 'react';
import '../CSS/About.css';
import Footer from './Footer.js';

const About = () => {
    const Card = ({ imgSrc, altText, position, name }) => {
        return (
          <div className="card">
            <div className="picture">
              <img src={imgSrc} alt={altText} />
            </div>
            <p className="team-members-subtitle">{name}</p>
            <p className="team-title">
              <strong>{position}</strong>
            </p>
          </div>
        );
      };
      const teamMembers = [
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Shiina", position: "President", name: "Shiina" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Deeksha", position: "President", name: "Deeksha" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Daniel", position: "Opportunities Manager", name: "Daniel" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "David Pham", position: "Mentorship Manager", name: "David Pham" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Aditya Khowal", position: "External Head", name: "Aditya Khowal" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Leah", position: "External Outreach", name: "Leah" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Eric Xiao", position: "External Outreach", name: "Eric Xiao" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Aditya Akhileshwaran", position: "External Outreach", name: "Aditya Akhileshwaran" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Hawa", position: "Advisor", name: "Hawa" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Ruhee", position: "Marketing Manager", name: "Ruhee" },
        { imgSrc: require("../Data/img/pipachu.png"), altText: "Trang Tran", position: "Social Media Manager", name: "Trang Tran" }
      ];
      
      
    return (
        <>
        <div className="about">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
            </style>
            <div className="about-section">
                <div className="about-message-section">
                    <div className="about-title">About</div>
                    <div className="about-text">
                        Learn the ways that SWECC can help you get started in Software Engineering!
                    </div>
                </div>
                <div className="goal-message-section">
                    <div className="goal-title">Our Goal</div>
                    <div className="goal-text">
                        SWECC was formed to provide <strong>support, advice, </strong>
                        and <strong>opportunities</strong> for people ready
                        to start a career in Software engineering but who don't know where
                        to begin. We bring in panels of people currently in the field
                        to answer questions, help prepare for interviews,
                        work to give people a head start in their software engineering career!
                        {/* (This is just a quick sample paragraph pls don't judge the writing)(Add a bit
                        more info here blah blah blah) */}
                    </div>
                </div>
                <div className="team-members-section">
      <h1 className="team-members-title">Board Members</h1>
      <p className="team-members-subtitle">2023-2024</p>
      <div className="picture-container">
        {teamMembers.map((member) => (
          <Card
            key={member.position}
            imgSrc={member.imgSrc}
            name={member.name}
            altText={member.altText}
            position={member.position}
          />
        ))}
      </div>

                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default About