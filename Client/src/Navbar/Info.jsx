import React, { useState } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function RegistrationSteps() {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="info-page">
      <Navbar />
    <div className="registration-steps">
      <h2 className="steps-title">Steps to Register and Get Access to Vote</h2>

      <p className="steps-intro">Dear Applicant,</p>
      <p className="steps-intro">
        Please follow the steps below to register and get access to vote through our platform.
        This process ensures that only eligible individuals with verified credentials can vote.
      </p>

      <ol className="steps-list">
        <li>
          <strong>Submit Your Registration Details</strong>
          <ul>
            <li>Fill out the registration form with accurate information.</li>
            <li>Upload your valid UDID number.</li>
            <li>Upload any government-issued ID proof like Aadhaar or PAN card.</li>
            <li>Upload a clear passport-size photo of yourself.</li>
            <li>Provide a valid phone number and email address.</li>
          </ul>
        </li>

        <li>
          <strong>Verification by Admin</strong>
          <ul>
            <li>Our admin team will verify all submitted details and images.</li>
            <li>If valid, your request will be approved and a password sent via email.</li>
            <li>If rejected (due to unclear or fake documents), a rejection email with reason will be sent.</li>
          </ul>
        </li>

        <li>
          <strong>Login to Vote</strong>
          <ul>
            <li>Use your UDID number and the received password to log in and vote.</li>
          </ul>
        </li>
      </ol>

      <div className="steps-checkbox">
        <label>
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
          />{" "}
          I have read and understood the process.
        </label>
      </div>

      <button className="steps-submit-btn" disabled={!acknowledged} onClick={() => navigate("/signup")}>
        Submit
      </button>
    </div>
    </div>
  );
}
