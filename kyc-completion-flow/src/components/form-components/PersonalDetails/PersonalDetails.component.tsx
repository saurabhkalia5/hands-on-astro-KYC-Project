import React, { useEffect, useState } from "react";
import "./PersonalDetails.styles.css";
import { useStore } from "@nanostores/react";
import { resetUserStore, updateUser, userStore } from "../../../userStore";
import { userSchema, type UserType } from "../../../types";
import HeadingTile from "../../HeadingTile/headingTile.component";
import SubmitButton from "../../input-components/submitButtons/submitButtons";
import { z } from "zod";
import { validateForm } from "../../../utils/validateForm";
import RadioCheckBox from "../../input-components/radioCheckbox/radioCheckbox.component";
import InputField from "../../input-components/inputField/InputField.component";
import {
  emailDomains,
  incomeStatusOptions,
  maritalStatusOptions,
} from "../../../configurations";

interface PersonalDetailsFormProps {
  isEditable?: boolean;
}

const initialFormState = {
  email: "",
  marital_status: "",
  father_name: "",
  mother_name: "",
  annual_income: "",
};

export default function PersonalDetailsForm(props: PersonalDetailsFormProps) {
  const currentUser = useStore(userStore);

  const [formState, setFormState] = useState<Record<string, string>>(initialFormState);

  const [errors, setErrors] = useState<Record<string, string>>(initialFormState);

  const handleValidation = () => {
    const validationResponse = validateForm({
      formState: formState,
      errorState: errors,
      setErrorState: setErrors,
    });
    return validationResponse;
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

  const handleValueChange = (key: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "",
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
        <RadioCheckBox
          question="Marital Status"
          name="marital_status"
          options={maritalStatusOptions}
          selectedValue={currentUser.marital_status}
          onChange={handleValueChange}
          errorMessage={errors.marital_status}
        />
        <InputField
          label="Father’s Name"
          handleValueChange={handleValueChange}
          errors={errors.father_name}
          value={formState.father_name}
          placeholder="Enter father's name here"
          id="father_name"
        />
        <InputField
          label="Mother’s Name"
          handleValueChange={handleValueChange}
          errors={errors.mother_name}
          value={formState.mother_name}
          placeholder="Enter mother's name here"
          id="mother_name"
        />

        <div className="field">
          <InputField
            label="Email"
            handleValueChange={handleValueChange}
            errors={errors.email}
            value={formState.email}
            placeholder="Enter Email Here"
            id="email"
          />
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
              {emailDomains.map((domain) => (
                <button
                  key={domain}
                  className={currentDomain === domain ? "active" : ""}
                  onClick={() => handleEmailDomainClick(domain)}
                >
                  @{domain}
                </button>
              ))}
            </div>
          </div>
        </div>
        <RadioCheckBox
          question="Annual Income"
          name="annual_income"
          options={incomeStatusOptions}
          selectedValue={currentUser.annual_income}
          onChange={handleValueChange}
          errorMessage={errors.annual_income}
          verticalDisplay={true}
        />

        <SubmitButton
          nextRoute={props.isEditable ? "/confirmDetails" : "/uploadDocuments"}
          validate={handleValidation}
        />
      </div>
    </div>
  );
}
