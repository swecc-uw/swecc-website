import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Officers.css";
import ProfileCard from "./profileCard";

const Officers = () => {
  const SHOW_OFFICER_APPLICATION = false;
  const APPLICATION_YEAR = "2025-2026";
  const [selectedYear, setSelectedYear] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  const yearSetup = async () => {
    const currentDate = new Date();
    const availableYears = [];

    // officer data will be out at the end of June, this will update beginning of July
    const defaultToThisYear = currentDate.getMonth() > 5;

    // check if officer json data for the current year should be added
    // and exists first, then add previous years back to 2022
    for (let year = currentDate.getFullYear(); year >= 2022; year--) {
      if (defaultToThisYear || year !== currentDate.getFullYear()) {
        try {
          await import(`../Data/officers${year}.json`);
          availableYears.push(year);
        } catch (error) {
          // officer data for this year won't be added
          console.log("Error loading year:", error);
        }
      }
    }

    // set year options and default year to most recent available year
    setYearOptions(availableYears);
    setSelectedYear(availableYears[0]);
  };

  useEffect(() => {
    yearSetup();
  }, []); // only runs after initial render

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
          {/* CONTROLLED BY FLAG ABOVE */}
          {SHOW_OFFICER_APPLICATION && (
            <div className="officer-application-link">
              <Link to="/OfficerApplication">
                <button className="apply-button">
                  Apply to be an Officer for {APPLICATION_YEAR}!
                </button>
              </Link>
            </div>
          )}
        </div>
        <nav className="officer-sidebar">
          <h2>Year</h2>
          <ul>
            {yearOptions.map((year) => (
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
  );
};

export default Officers;
