import React, { useState } from "react";
import { Link } from "react-router";
import "../CSS/Officers.css";
import ProfileCard from "./profileCard";
import { officersByYear, rosterYears } from "../Data/officers";

const yearOptions = rosterYears(new Date());

const Officers = () => {
  const SHOW_OFFICER_APPLICATION = false;
  const APPLICATION_YEAR = "2025-2026";
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    yearOptions[0],
  );
  const teamMembers =
    selectedYear === undefined ? [] : officersByYear[selectedYear];

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div className="officers-page">
      <section className="officers-hero">
        <div className="officers-hero__inner">
          <h1 className="type-display mono">Our Officers</h1>
        </div>
      </section>

      <section className="officers-body">
        {SHOW_OFFICER_APPLICATION && (
          <div className="officer-application-link">
            <Link to="/OfficerApplication">
              <button className="apply-button">
                Apply to be an Officer for {APPLICATION_YEAR}!
              </button>
            </Link>
          </div>
        )}

        <div className="officers-layout">
          <nav className="officers-years" aria-label="Officer years">
            <h2 className="type-display mono">Year</h2>
            <ul>
              {yearOptions.map((year) => (
                <li key={year}>
                  <button
                    type="button"
                    onClick={() => handleYearChange(year)}
                    className={selectedYear === year ? "selected" : ""}
                    aria-pressed={selectedYear === year}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="officers-roster">
            <h2 className="type-display mono">{selectedYear} Officers</h2>
            <ProfileCard info={teamMembers} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Officers;
