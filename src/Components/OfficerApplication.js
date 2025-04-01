import React from "react";
import "../CSS/OfficerApplication.css";
import { links } from "./Utils/Utils";

function OfficerApplication() {
    return (
        <div className="application-page">
            <div className="header">
                <h1>SWECC Leadership Applications 2025-2026</h1>
            </div>
            <div className="content">
                <p>
                    <h2>
                        Applications for the 2025-2026 SWECC officer team are
                        now open!
                    </h2>
                    Are you passionate about software engineering and helping
                    others succeed in their careers? Do you want to be part of a
                    team that organizes events/workshops, builds software for
                    students, and facilitates community within the University of
                    Washington? Apply to be an officer for the Software
                    Engineering Career Club!
                </p>
                <h2>TimeLine</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Stage</th>
                        </tr>
                        <tr>
                            <td>March 21st</td>
                            <td>Applications Open</td>
                        </tr>
                        <tr>
                            <td>April 4th</td>
                            <td>Applications Close</td>
                        </tr>
                        <tr>
                            <td>April 1st - April 14th</td>
                            <td>Interviews</td>
                        </tr>
                        <tr>
                            <td>April 17th</td>
                            <td>Offers Extended</td>
                        </tr>
                        <tr>
                            <td>April 24th</td>
                            <td>Officer Mixer</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Roles</h2>
                <ul>
                    <li>
                        <strong>Events:</strong> Organizes club events and
                        workshops
                    </li>
                    <li>
                        <strong>External Outreach:</strong> Manages
                        relationships with guests, companies and other student
                        organizations
                    </li>
                    <li>
                        <strong>Marketing:</strong> Manages the club's social
                        media and marketing efforts
                    </li>
                    <li>
                        <strong>Mentorship Programs:</strong> Manages the
                        Student Mentorship or Professional Mentorship Program
                    </li>
                    <li>
                        <strong>Software Engineering:</strong> Builds on top of
                        and maintains the club's various software projects
                    </li>
                    <li>
                        <strong>Community and Diversity:</strong> Help build and
                        foster community and diversity within the club
                    </li>
                    <li>
                        <strong>Finance:</strong> Manage club finances and
                        spending
                    </li>
                </ul>
                <p>
                    No experience required for any of the roles! We strongly
                    encourage underclassmen to apply!
                </p>

                <h2>Application</h2>
                <a href={links.resources.officerapp} target="_blank">
                    Apply here
                </a>
                <h2>Interview Process</h2>
                <p>
                    Interviews will be 30-45 min and scheduled on a rolling
                    basis (so apply early!). During the interview, you'll want
                    to highlight what you specifically want to do in the role
                    you're applying for. After offers are extended, you'll have
                    until April 25th to accept or decline the offer. Potential
                    start dates will be discussed during the interview.
                </p>
            </div>
        </div>
    );
}

export default OfficerApplication;
