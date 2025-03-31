import React, { useEffect, useState } from "react";
import "../CSS/Officers.css";
import ProfileCard from "./profileCard";

const Officers = () => {
  
  const [selectedYear, setSelectedYear] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const yearSetup = async () => {
      const currentDate = new Date();
      const availableYears = [];

      // officer data will be out at the end of June, this will update beginning of July
      const defaultToThisYear = currentDate.getMonth() > 5; 

      // check if officer json data for the current year exists first
      if (defaultToThisYear) {
        try {
          await import(`../Data/officers${currentDate.getFullYear()}.json`);
          availableYears.push(currentDate.getFullYear());
        } catch (error) {
          // officer data for this year won't be added
        }
      }

      // add previous years back to 2022
      for (let year = currentDate.getFullYear(); year >= 2022; year--) {
        try {
          await import(`../Data/officers${year}.json`);
          availableYears.push(year);
        } catch (error) {
          // officer data for this year won't be added
        }
      }

      // set year options and default year to most recent available year
      setYearOptions(availableYears);
      setSelectedYear(availableYears[0]);
    };

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
    </div>
  );
};

export default Officers;
