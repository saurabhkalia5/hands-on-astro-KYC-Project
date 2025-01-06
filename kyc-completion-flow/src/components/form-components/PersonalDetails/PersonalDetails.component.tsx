import React, { useEffect, useState } from "react";
import "./PersonalDetails.styles.css";
import { useStore } from "@nanostores/react";
import { resetUserStore, updateUser, userStore } from "../../../userStore";
import type { UserType } from "../../../types";
import HeadingTile from "../../HeadingTile/headingTile.component";
import SubmitButton from "../../submitButtons/submitButtons";

interface PersonalDetailsFormProps {
  isEditable?: boolean;
}

export default function PersonalDetailsForm(props: PersonalDetailsFormProps) {
  const currentUser = useStore(userStore);

  // Local state for form inputs
  const [formState, setFormState] = useState({
    email: "",
    marital_status: "",
    father_name: "",
    mother_name: "",
    annual_income: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    marital_status: "",
    father_name: "",
    mother_name: "",
    annual_income: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors }; 

    // Check each field for empty values
    if (!formState.email) {
      newErrors.email = "Email cannot be empty";
      valid = false;
    } else {
      newErrors.email = ""; 
    }

    if (!formState.marital_status) {
      newErrors.marital_status = "Marital Status cannot be empty";
      valid = false;
    } else {
      newErrors.marital_status = ""; 
    }

    if (!formState.father_name) {
      newErrors.father_name = "Father's Name cannot be empty";
      valid = false;
    } else {
      newErrors.father_name = ""; 
    }

    if (!formState.mother_name) {
      newErrors.mother_name = "Mother's Name cannot be empty";
      valid = false;
    } else {
      newErrors.mother_name = ""; 
    }

    if (!formState.annual_income) {
      newErrors.annual_income = "Annual Income cannot be empty";
      valid = false;
    } else {
      newErrors.annual_income = "";
    }

    setErrors(newErrors);

    return valid;
  };

  useEffect(() => {
    if (currentUser) {
      setFormState({
        email: currentUser.email || "",
        marital_status: currentUser.marital_status || "",
        father_name: currentUser.father_name || "",
        mother_name: currentUser.mother_name || "",
        annual_income: currentUser.annual_income || "",
      });
    }
  }, [currentUser]);

  const handleValueChange = (key: keyof typeof formState, value: string) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "", // Clear the error message for the changed field
    }));
    updateUser(key, value);
  };

  const handleEmailDomainClick = (domain: string) => {
    const updatedEmail = formState.email.split("@")[0] + "@" + domain;
    handleValueChange("email", updatedEmail);
  };

  const getDomain = (email: string) => email.split("@")[1] || "gmail.com";

  const currentDomain = getDomain(formState.email);

  return (
    <div className="personal-details-form">
      <HeadingTile title="Personal Details" />
      <div className="form-container">
        <h2>Marital Status</h2>
        <div className="field">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="marital_status"
                value="Single"
                checked={currentUser.marital_status === "Single"}
                onChange={() => handleValueChange("marital_status", "Single")}
              />
              Single
            </label>
            <label>
              <input
                type="radio"
                name="marital_status"
                value="Married"
                checked={currentUser.marital_status === "Married"}
                onChange={() => handleValueChange("marital_status", "Married")}
              />
              Married
            </label>
          </div>
          {errors.marital_status && (
            <div className="error-message">{errors.marital_status}</div>
          )}
        </div>
        <div className="field">
          <h2>Father’s Name</h2>
          <input
            type="text"
            id="father_name"
            className="text-input"
            value={formState.father_name}
            onChange={(e) => handleValueChange("father_name", e.target.value)}
            placeholder="Enter father's name here"
          />
          {errors.father_name && (
            <div className="error-message">{errors.father_name}</div>
          )}
        </div>
        <div className="field">
          <h2>Mother’s Name</h2>
          <input
            type="text"
            id="mother_name"
            className="text-input"
            value={formState.mother_name}
            onChange={(e) => handleValueChange("mother_name", e.target.value)}
            placeholder="Enter mother's name here"
          />
          {errors.mother_name && (
            <div className="error-message">{errors.mother_name}</div>
          )}
        </div>
        <div className="field">
          <h2>Email</h2>
          <input
            type="text"
            id="email"
            className="text-input email"
            value={formState.email}
            onChange={(e) => handleValueChange("email", e.target.value)}
            placeholder="@gmail.com"
          />
          {/* @TODO : CAN IMPLEMENT EMAIL VALIDATION AND DISABLE FIELD */}
          <div
            style={{
              color: "gray",
              fontSize: "0.9rem",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            You will receive portfolio statements on this email id
          </div>
          <div>
            <div className="email-domains">
              <button
                className={currentDomain === "gmail.com" ? "active" : ""}
                onClick={() => handleEmailDomainClick("gmail.com")}
              >
                @gmail.com
              </button>
              <button
                className={currentDomain === "yahoo.com" ? "active" : ""}
                onClick={() => handleEmailDomainClick("yahoo.com")}
              >
                @yahoo.com
              </button>
              <button
                className={currentDomain === "yahoo.co.in" ? "active" : ""}
                onClick={() => handleEmailDomainClick("yahoo.co.in")}
              >
                @yahoo.co.in
              </button>
              <button
                className={currentDomain === "rediffmail.com" ? "active" : ""}
                onClick={() => handleEmailDomainClick("rediffmail.com")}
              >
                @rediffmail.com
              </button>
            </div>
          </div>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <h2>Annual Income</h2>
        <div className="income-options">
          <label>
            <input
              type="radio"
              name="annual_income"
              value="Below 1 Lakh"
              checked={formState.annual_income === "Below 1 Lakh"}
              onChange={() =>
                handleValueChange("annual_income", "Below 1 Lakh")
              }
            />
            Below 1 Lakh
          </label>
          <label>
            <input
              type="radio"
              name="annual_income"
              value="1-5 Lakhs"
              checked={formState.annual_income === "1-5 Lakhs"}
              onChange={() => handleValueChange("annual_income", "1-5 Lakhs")}
            />
            1-5 Lakhs
          </label>
          <label>
            <input
              type="radio"
              name="annual_income"
              value="5-10 Lakhs"
              checked={formState.annual_income === "5-10 Lakhs"}
              onChange={() => handleValueChange("annual_income", "5-10 Lakhs")}
            />
            5-10 Lakhs
          </label>
          <label>
            <input
              type="radio"
              name="annual_income"
              value=">25 Lakhs"
              checked={formState.annual_income === ">25 Lakhs"}
              onChange={() => handleValueChange("annual_income", ">25 Lakhs")}
            />
            Above 25 Lakhs
          </label>
          {errors.annual_income && (
            <div className="error-message">{errors.annual_income}</div>
          )}
          <SubmitButton
            nextRoute={
              props.isEditable ? "/confirmDetails" : "/uploadDocuments"
            }
            validate={validateForm}
          />
        </div>
      </div>
    </div>
  );
}
