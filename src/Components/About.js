import React from 'react';
import '../CSS/About.css';
import Footer from './Footer.js';

const About = () => {
    return (
        <div class="about">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
            </style>
            <div class="about-section">
                <div class="about-message-section">
                    <div class="about-title">About</div>
                    <div class="about-text">Learn the ways that SWECC can help you get started in Software Engineering!</div>
                </div>
                <div class="goal-message-section">
                    <div class="goal-title">Our Goal</div>
                    <div class="goal-text">
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
                <div class="team-members-section">
                    <h1 class="team-members-title">Board Members</h1>
                    <p class="team-members-subtitle">2022-2023</p>
                    <div class="picture-container">
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 1"/>
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 2"/>
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 3"/>
                        </div>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 4"/>    
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 5"/>
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 6"/>
                        </div>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 7"/>
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 8"/>
                        </div>
                        <div class="picture">
                            <img src={require('../Data/img/pipachu.png')} alt="Image 9"/>
                        </div>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                        <p class="team-title"><strong>Position:</strong></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default About