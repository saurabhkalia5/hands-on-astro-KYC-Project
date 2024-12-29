import { useStore } from "@nanostores/react";
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks
import "./ConfirmDetails.styles.css";
import { userStore } from "../../../userStore";
import type { UserType } from "../../../types";
import HeadingTile from "../../HeadingTile/headingTile.component";

const UserProfile: React.FC = () => {
  const currentUser = useStore(userStore);

  // State to track if the terms checkbox is checked
  const [isTermsChecked, setIsTermsChecked] = useState(true);
  // State to track whether the error message should be displayed
  const [showError, setShowError] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsTermsChecked(isChecked);
    setShowError(!isChecked);  // Show error message immediately when unchecked
  };
  

  return (
    <div>
      <HeadingTile title={"Confirm Details"}></HeadingTile>
      {/* User Details Section */}
      <div className="form-details">
        <div className="card">
          <div className="card-header">
            User Details{" "}
            <span className="edit">
              <a href="/personalDetails">Edit</a>
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
            <strong>Note</strong>: You cannot edit the above details as they are already
            verified through Digilocker.
          </div>
        </div>

        {/* KYC Details Section */}
        <div className="card">
          <div className="card-header">
            KYC Details{" "}
            <span className="edit">
              <a href="/personalDetails">Edit</a>
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
              <a href="/uploadDocuments">Edit</a>
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

        {/* Terms and Buttons Section */}
        <div className="terms">
          <label>
            <input
              type="checkbox"
              checked={isTermsChecked}
              aria-label="Agree to terms and conditions"
              onChange={handleCheckboxChange} // Update state when checkbox is clicked
            />
            I agree to the <a href="#">Terms & Conditions</a>
          </label>
        </div>

        {/* Error Message */}
        {showError && (
          <div className="error-message">
            <p style={{ color: "red", fontSize: "14px" }}>
              Please select the terms and conditions to proceed.
            </p>
          </div>
        )}
      </div>

      <div className="buttons">
        <button
          className={`submit-btn ${!isTermsChecked ? 'inactive':''}`}
          aria-label="Proceed to the next step"
          disabled={!isTermsChecked} // Disable button if terms are not checked
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
