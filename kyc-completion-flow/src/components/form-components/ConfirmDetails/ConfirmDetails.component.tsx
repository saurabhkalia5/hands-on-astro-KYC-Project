import { useStore } from "@nanostores/react";
import "./ConfirmDetails.styles.css";
import { userStore } from "../../../userStore";
import "font-awesome/css/font-awesome.min.css";
import HeadingTile from "../../HeadingTile/headingTile.component";

import React, { useState } from "react";

const KYCForm = () => {
  const currentUser = useStore(userStore);

  const [isChecked, setIsChecked] = useState(false); // Manage checkbox state
  const [isLoading, setIsLoading] = useState(false); // Manage loader state
  const [errorMessage, setErrorMessage] = useState(""); // Manage error message

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setErrorMessage(
      event.target.checked ? "" : "Please agree to the terms to proceed."
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (!isChecked) {
      setErrorMessage("Please agree to the terms to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      console.log(JSON.stringify(currentUser));
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });
      if (response.redirected) {
        window.location.assign(response.url);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <form className="container" id="kyc-form"> */}
      <HeadingTile title={"Confirm Details"}></HeadingTile>
      {/* User Details Section */}
      <div className="form-details">
        <div className="card">
          <div className="card-header">
            User Details{" "}
            <span className="edit">
              <a href="/personalDetails">
                <i className="fa fa-pencil fa-sm"></i> Edit
              </a>
            </span>
          </div>
          <div className="card-content">
            <p>
              <span className="key">PAN Card Number:</span>
              <br />
              <span className="value">{currentUser.pan_card_number}</span>
            </p>
            <p>
              <span className="key">Name:</span>
              <br />
              <span className="value">{currentUser.name}</span>
            </p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="card non-editable">
          <div className="content-box">
            <div className="card-header">Personal Details</div>
            <div className="card-content">
              <p>
                <span className="key">Gender:</span>
                <br />
                <span className="value">{currentUser.gender}</span>
              </p>
              <p>
                <span className="key">Date of Birth:</span>
                <br />
                <span className="value">{currentUser.date_of_birth}</span>
              </p>
              <p>
                <span className="key">Address:</span>
                <br />
                <span className="value">{currentUser.address}</span>
              </p>
              <p>
                <span className="key">Pincode:</span>
                <br />
                <span className="value">{currentUser.pincode}</span>
              </p>
            </div>
          </div>
          <div className="note">
            <strong>Note</strong>: You cannot edit the above details as they are
            already verified through Digilocker.
          </div>
        </div>

        {/* KYC Details Section */}
        <div className="card">
          <div className="card-header">
            KYC Details{" "}
            <span className="edit">
              <a href="/personalDetails">
                <i className="fa fa-pencil fa-sm"></i> Edit
              </a>
            </span>
          </div>
          <div className="card-content">
            <p>
              <span className="key">Email:</span>
              <br />
              <span className="value">{currentUser.email}</span>
            </p>
            <p>
              <span className="key">Marital Status:</span>
              <br />
              <span className="value">{currentUser.marital_status}</span>
            </p>
            <p>
              <span className="key">Annual Income:</span>
              <br />
              <span className="value">{currentUser.annual_income}</span>
            </p>
            <p>
              <span className="key">Father's Name:</span>
              <br />
              <span className="value">{currentUser.father_name}</span>
            </p>
            <p>
              <span className="key">Mother's Name:</span>
              <br />
              <span className="value">{currentUser.mother_name}</span>
            </p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="card">
          <div className="card-header">
            Documents{" "}
            <span className="edit">
              <a href="/uploadDocuments">
                <i className="fa fa-pencil fa-sm"></i> Edit
              </a>
            </span>
          </div>
          <div className="documents">
            <div className="document-placeholder">
              <img
                src={currentUser.documents.photo}
                alt="Photo"
                className="document-image"
              />
            </div>
            <div className="document-placeholder">
              <img
                src={currentUser.documents.pan_card}
                alt="PAN Card"
                className="document-image"
              />
            </div>
            <div className="document-placeholder">
              <img
                src={currentUser.documents.signature}
                alt="Signature"
                className="document-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="terms">
        <label>
          <input
            style={{ accentColor: "#03A87D" }}
            type="checkbox"
            id="terms-checkbox"
            aria-label="Agree to terms and conditions"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          I agree to the{" "}
          <a
            href="https://zfunds.in/privacy-policy"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Terms & Conditions
          </a>
        </label>
      </div>

      {errorMessage && (
        <div className="error-message" id="error-message">
          <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
        </div>
      )}

      <div className="buttons">
        <button
          onClick={handleSubmit}
          className={`submit-btn ${!isChecked ? "inactive" : ""}`}
          id="submit-btn"
          aria-label="Proceed to the next step"
          disabled={!isChecked || isLoading}
        >
          {isLoading ? "Submitting..." : "SUBMIT"}
        </button>
        {isLoading && <div id="loader" className="loader"></div>}
      </div>
      {/* </form> */}
    </div>
  );
};

export default KYCForm;
