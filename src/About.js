import React from 'react';
import './About.css';
const About = () => {
    return (
        <div class="about">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
            </style>
            <div class="about-section">
                <div class="about-message-section">
                    <h1 class="about-title">About</h1>
                    <p class="about-text">Learn the ways that SWECC can help you get started in Software Engineering!</p>
                </div>
                <div class="goal-message-section">
                    <h1 class="goal-title">Our Goal</h1>
                    <p class="goal-text">
                        SWECC was formed to provide <strong>support, advice,</strong>
                        and <strong>opportunities</strong> for people ready
                        to start a career in Software engineering but who don't know where
                        to begin. We bring in panels of people currently in the field
                        to answer questions, help prepare for interviews,
                        work to give people a head start in their software engineering career!
                        (This is just a quick sample paragraph pls don't judge the writing)(Add a bit
                        more info here blah blah blah)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About 