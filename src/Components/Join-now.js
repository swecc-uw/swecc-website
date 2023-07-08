
import '../CSS/App.css';
import '../CSS/Join-now.css';
import React, { useState } from 'react';
import completionBar0 from '../Data/img/join-now-img0.png';
import completionBar1 from '../Data/img/join-now-img1.png';
import completionBar2 from '../Data/img/join-now-img2.png';
import completionBar3 from '../Data/img/join-now-img3.png';
import career from '../Data/img/career.png';
import community from '../Data/img/community.png';
import networking from '../Data/img/networking.png';

const messages = [
  <a className="link-boxes" href="https://discord.com/invite/Pbk4sCEWDY"> Join the discord </a>,
  <a className="link-boxes" href="http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"> Join the Mailing List </a>,
  <p>
    <a className="separate-insta-linkedin link-boxes" href="https://instagram.com/swecc.uw?igshid=YmMyMTA2M2Y=" > Instagram </a>
    <a className="separate-insta-linkedin link-boxes" href="https://www.linkedin.com/company/software-engineering-career-club-at-uw/" >LinkedIn </a>
  </p>,
  <p className="thanks-box thanks-message">
    <strong>Thanks for Joining! </strong>
    <br />
    We're looking forward to seeing
    <br />
    you at our next meeting :)</p>
]

const images = [<img src={completionBar0} className="completion-bar" alt="Unfilled completion bar" />,
<img src={completionBar1} className="completion-bar" alt="Partly filled completion bar" />,
<img src={completionBar2} className="completion-bar" alt="Mostly filled completion bar" />,
<img src={completionBar3} className="completion-bar" alt="Filled completion bar" />]

export default function JoinNow() {
  const [count, setCount] = useState(0);

  function increment() {
    if (count < 3) {
      setCount(count + 1)
    }
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div className="entire">
      <div className="background-image">
        <div className="js-white-box">
          <div className="content-flex">
            <p className="join-message"> <strong>Join  SWECC </strong></p>
            <p className="center-images"> {images[count]} </p>
            <p>{messages[count]}</p>
          </div>
          <div className="button-flex">
            <button className="click-button-styling" onClick={decrement}>
              back
            </button>
            <button className="click-button-styling" onClick={increment}>
              next
            </button>
          </div>
        </div>
      </div> {/* This is the end of the join now box*/}
      <div className="join">
        <div className="join-section">
          <div className="info-message-section">
            <div className="info-table">
              <table>
                <tbody>
                  <tr>
                    <td align='center'>
                      <img className="example-images" src={networking} alt="Networking" width="60%" />
                    </td>
                    <td align='center'>
                      <img className="example-images" src={community} alt="Community" width="60%" />
                    </td>
                    <td align="center">
                      <img className="example-images" src={career} alt="Career" width="60%" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="info-title">networking</div>
                    </td>
                    <td>
                      <div className="info-title">community</div>
                    </td>
                    <td>
                      <div className="info-title">career</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="info-text">make connections in a network of future and current software engineers  </div>
                    </td>
                    <td>
                      <div className="info-text">Join a vibrant community of future software engineers</div>
                    </td>
                    <td>
                      <div className="info-text">Gain access to career talks, and more opportunities</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

