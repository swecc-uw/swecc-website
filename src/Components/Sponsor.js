import "../CSS/Sponsor.css";
import "../CSS/Officers.css";
import React, { useState } from "react";
import deloitteLogo from "../Data/img/Sponsors/Deloitte.png";

function Sponsor() {
  const [ContentSelected, setContentSelected] = useState("sponsor");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, company, message } = contactData;
    window.location.href = `mailto:sweccmailinglist@u.washington.edu?subject=
    New Contact from ${name}&body=Name: ${name} from ${company} %0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    setTimeout(() => {
      if (document.hasFocus()) {
        alert(
          "It seems your email client didn't open automatically. Please send an email to sweccmailinglist@u.washington.edu with your message.",
        );
      }
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setContentSelected(content);
  };

  const Sponsors = () => (
    <div>
      <div className="Sponsors-Info">
        <h2>Our Sponsors</h2>
        <h3>{new Date().getFullYear()}</h3>
        <p>
          We value the supports of our sponsors, and we are thankful for their{" "}
          supports that promotes many technical SWECC events which enables
          thousands of students and professionals to communicate and share new
          insights. We want more to know how those valuable partners have helped
          us and how they can further support our community as well.
        </p>
      </div>

      {/*<div className="Sponsors-Logo">*/}
      {/*  <img src={deloitteLogo} alt="Deloitte Img" />*/}
      {/*</div>*/}
    </div>
  );

  const WhyUs = () => (
    <div>
      <div className="WhyUs-Info">
        <div className="WhySponsor">
          <h2>Why Sponsor</h2>
          <p id="HowToSponsorIntro">
            "Sponsoring the Software Engineering Career Club gives you access to
            over 1000 students, >70% of which are part of the Allen School, and
            >90% in computing related majors. Partner with us to gain access to
            our resume book, recruiting/promotional events, talent pool, and
            more."
          </p>
        </div>

        <div className="HowToSponsor">
          <h2>How to Sponsor</h2>
          <p>
            We appreciate all forms of your supports, you can support us by:
          </p>
          <ul>
            <li>Hosting informational/promotional panels</li>
            <li>
              Sponsoring our events, such as hackathons and programming
              competitions
            </li>
            <li>
              Sponsor coding competitions with company-specific challenges
            </li>
            <li>Getting involved in our professional mentorship program</li>
            <li>
              Provide financial support for club operations and event costs
            </li>
            <li>Sponsor networking events or industry mixers</li>
          </ul>
        </div>

        <div className="contact-info">
          <h2 id="contact-info-title">Connect with Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <input
              type="text"
              name="company"
              value={contactData.company}
              onChange={handleChange}
              placeholder="Company"
            />
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleChange}
              placeholder="Message"
            ></textarea>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="sponsor-page">
        <div className="sponsor-page-intro">
          <h1 className="sponsor-headers">Sponsors & Connection</h1>
        </div>

        <div className="sponsor-content">
          <nav className="sponsor-sidebar">
            <h2>Fundraising</h2>
            <ul>
              {["sponsor", "why us"].map((content) => (
                <li>
                  <button
                    onClick={() => handleContentChange(content)}
                    className={ContentSelected === content ? "selected" : ""}
                  >
                    {content}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sponsorConnectionContent">
            {ContentSelected === "sponsor" && Sponsors()}
            {ContentSelected === "why us" && WhyUs()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
