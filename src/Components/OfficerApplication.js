import React from "react";
import "../CSS/OfficerApplication.css";
import { links } from "./Utils/Utils";

function OfficerApplication() {
    return (
        <div className="application-page">
            <h1>SWECC Leadership Applications 2025-2026</h1>
            <p>
                <h2>
                    Applications for the 2025-2026 SWECC officer team are now
                    open!
                </h2>
                Are you passionate about software engineering and helping others
                succeed in their careers? Do you want to be part of a team that
                organizes events/workshops, builds software for students, and
                facilitates community within the University of Washington? Apply
                to be an officer for the Software Engineering Career Club!
            </p>
            <h2>TimeLine</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Stage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>March 21st</td>
                        <td>Applications Open</td>
                    </tr>
                    <tr>
                        <td>April 21st</td>
                        <td>Applications Close</td>
                    </tr>
                    <tr>
                        <td>April 22nd - May 8st</td>
                        <td>Interviews</td>
                    </tr>
                    <tr>
                        <td>May 10th</td>
                        <td>Offers Extended</td>
                    </tr>
                    <tr>
                        <td>May 14th</td>
                        <td>Officer Team Announced</td>
                    </tr>
                </tbody>
            </table>
            <h2>Roles</h2>
            <ul>
                <li>
                    <strong>President:</strong> Leads the officer team,
                    determines the club's direction
                </li>
                <li>
                    <strong>Events:</strong> Organizes club events and workshops
                </li>
                <li>
                    <strong>External Outreach:</strong> Manages relationships
                    with guests, companies and other student organizations
                </li>
                <li>
                    <strong>Marketing:</strong> Manages the club's social media
                    and marketing efforts
                </li>
                <li>
                    <strong>Mentorship Programs:</strong> Manages the Student
                    Mentorship or Professional Mentorship Program
                </li>
                <li>
                    <strong>Software Engineering:</strong> Builds on top of and
                    maintains the club's various software projects
                </li>
            </ul>
            <p>No experience required for any of the roles!</p>

            <h2>Application</h2>
            <a href={links.resources.officerapp} target="_blank">Apply here</a>
            <h2>Interview Process</h2>
            <p>For those applying to be an officer, there is only one 30-minute interview. When answering questions, you'll want to highlight what you specifically want to do in the role you're applying for.</p>
            <p>For those applying for president, there will be two interview rounds. The first will be a 20-minute interview with the current president, and the second will be a 30-minute interview with a panel of current officers.</p>
            
        </div>
    );
}

export default OfficerApplication;
