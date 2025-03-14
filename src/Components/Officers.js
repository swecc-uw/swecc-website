import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Officers.css";
import ProfileCard from "./profileCard";

const Officers = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const members = await import(`../Data/officers${selectedYear}.json`);
        setTeamMembers(members.default);
      } catch (error) {
        console.error("Error loading team members:", error);
        setTeamMembers([]);
      }
    };

    loadTeamMembers();
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <div>
        <div className="about-message-section">
          <h1>Our Officers</h1>
        </div>
        <div className="Officer-content">
        <div className="officer-application-link">
          <Link to="/OfficerApplication">
            <button className="apply-button">Apply to be an Officer for 2025-2026!</button>
          </Link>
        </div>
          <nav className="officer-sidebar">
            <h2>Year</h2>
            <ul>
              {[2024, 2023, 2022].map((year) => (
                <li key={year}>
                  <button
                    onClick={() => handleYearChange(year)}
                    className={selectedYear === year ? "selected" : ""}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="officer-info">
            <h2>{selectedYear} Officers</h2>
            <ProfileCard info={teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Officers;
