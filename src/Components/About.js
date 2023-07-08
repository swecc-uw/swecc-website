import React from 'react';
import '../CSS/About.css';
import Footer from './Footer.js';

const About = () => {
    return (
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
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 1" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 2" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 3" />
                        </div>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 4" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 5" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 6" />
                        </div>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 7" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 8" />
                        </div>
                        <div className="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Position 9" />
                        </div>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                        <p className="team-title"><strong>Position:</strong></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About