
import React, { useState } from 'react';
import completionBar0 from './join-now-img0.png';
import completionBar1 from './join-now-img1.png';
import completionBar2 from './join-now-img2.png';
import completionBar3 from './join-now-img3.png';
import './Join-Now.css';

const messages = [
  <a class = "link-boxes" href = "https://discord.com/invite/Pbk4sCEWDY"> Join the discord </a>,
  <a class = "link-boxes" href = "http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"> Join the Mailing List </a>,
  <p> <a id = "separate-insta-linkedin" class = "link-boxes" href = "https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y=" > Instagram </a> 
  <a id = "separate-insta-linkedin" class = "link-boxes" href = "https://www.linkedin.com/company/software-engineering-career-club-at-uw/" >LinkedIn </a> </p>, 
  <p id = "thanks-box"><a id = "thanks-message"><strong>Thanks for Joining! </strong> <br/>
  We're looking forward to seeing <br/> you at our next meeting :) </a></p>]

const images = [<img src = {completionBar0} class = "completion-bar"alt = "Unfilled completion bar" />,
<img src = {completionBar1} class = "completion-bar" alt = "Partly filled completion bar" />, 
<img src = {completionBar2} class = "completion-bar" alt = "Mostly filled completion bar" />, 
<img src = {completionBar3} class = "completion-bar" alt = "Filled completion bar" />]

function JoinNow() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  function increment() {
    if(count < 3) {
      setCount(count + 1) 
    }
  }
  
  function decrement() {
    if(count > 0) {
      setCount(count - 1) 
    }
  }

  return (
    <div id = "background-image">
      <div id = "js-white-box">
        <div id = "content-flex">
        <p id = "join-message"> <strong>Join  SWECC </strong></p>
        <p id = "center-images"> {images[count]} </p>
        <p>{messages[count]}</p>
        </div>
        <div id = "button-flex">
          <button class = "click-button-styling" onClick={decrement}>
            back
          </button>
          <button class = "click-button-styling" onClick={increment}>
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinNow