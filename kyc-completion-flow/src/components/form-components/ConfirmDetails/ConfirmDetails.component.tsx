import { useStore } from "@nanostores/react";
import "./ConfirmDetails.styles.css";
import { userStore } from "../../../userStore";
import "font-awesome/css/font-awesome.min.css";
import HeadingTile from "../../HeadingTile/headingTile.component";

import React, { useState } from "react";
import {
  documentsConfig,
  kycDetailsConfig,
  userDetailsConfig,
} from "../../../configurations";
import type { UserType } from "../../../types";
import { postUserData } from "../../../utils/userSubmit.service";

const KYCForm = () => {
  const currentUser = useStore(userStore);

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setErrorMessage(
      event.target.checked ? "" : "Please agree to the terms to proceed."
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (event.isTrusted) {
      if (!isChecked) {
        setErrorMessage("Please agree to the terms to proceed.");
        return;
      }
  
      setIsLoading(true);
  
      const { success, message } = await postUserData(currentUser);
  
      if (success) {
        console.log("User data submitted successfully");
      } else {
        setErrorMessage(message as string);
      }
  
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <form className="container" id="kyc-form"> */}
      <HeadingTile title={"Confirm Details"}></HeadingTile>
      {/* User Details Section */}
      <div className="form-details">
        <div>
          {/* User Details Section */}
          <div className="card">
            <div className="card-header">
              User Details{" "}
              <span className="edit">
                <a href="/personalDetails?edit=true">
                  <i className="fa fa-pencil fa-sm"></i> Edit
                </a>
              </span>
            </div>
            <div className="card-content">
              {userDetailsConfig.map(({ label, key }) => (
                <p key={key}>
                  <span className="key">{label}:</span>
                  <br />
                  <span className="value">
                    {currentUser[key as keyof UserType] as string}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="card non-editable">
            <div className="content-box">
              <div className="card-header">Personal Details</div>
              <div className="card-content">
                {userDetailsConfig.map(({ label, key }) => (
                  <p key={key}>
                    <span className="key">{label}:</span>
                    <br />
                    <span className="value">
                      {currentUser[key as keyof UserType] as string}
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="note">
              <strong>Note</strong>: You cannot edit the above details as they
              are already verified through Digilocker.
            </div>
          </div>

          {/* KYC Details Section */}
          <div className="card">
            <div className="card-header">
              KYC Details{" "}
              <span className="edit">
                <a href="/personalDetails?edit=true">
                  <i className="fa fa-pencil fa-sm"></i> Edit
                </a>
              </span>
            </div>
            <div className="card-content">
              {kycDetailsConfig.map(({ label, key }) => (
                <p key={key}>
                  <span className="key">{label}:</span>
                  <br />
                  <span className="value">
                    {currentUser[key as keyof UserType] as string}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Documents Section */}
          <div className="card">
            <div className="card-header">
              Documents{" "}
              <span className="edit">
                <a href="/uploadDocuments?edit=true">
                  <i className="fa fa-pencil fa-sm"></i> Edit
                </a>
              </span>
            </div>
            <div className="documents">
              {documentsConfig.map(({ label, src }) => (
                <div className="document-placeholder" key={src}>
                  <img
                    src={
                      currentUser.documents[src as keyof UserType["documents"]]
                    }
                    alt={label}
                    className="document-image"
                  />
                </div>
              ))}
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
