import React, { useState } from "react";
import "./FatcaDeclarations.styles.css";
import { useStore } from "@nanostores/react";
import { userStore } from "../../../userStore";

const FatcaVerificationForm: React.FC = () => {


  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean>(true);
  const [isTaxResident, setIsTaxResident] = useState<boolean>(true);
  const [isNotPoliticallyExposed, setIsNotPoliticallyExposed] =
    useState<boolean>(true);

  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean
  ) => {
    setter(!currentValue);
  };

  return (
    <div className="container">
      <div className="header">Please verify that you are an:</div>

      {/* Indian Citizen */}
      <div className="form-row">
        <label htmlFor="indian-citizen">Indian citizen</label>
        <div className="toggle">
          <input
            id="indian-citizen"
            type="checkbox"
            checked={isIndianCitizen}
            onChange={() => handleToggle(setIsIndianCitizen, isIndianCitizen)}
          />
          <span
            className="slider"
            onChange={() => handleToggle(setIsIndianCitizen, isIndianCitizen)}
          ></span>
        </div>
      </div>

      {/* Indian Tax Resident */}
      <div className="form-row">
        <label htmlFor="tax-resident">Indian tax resident</label>
        <div className="toggle">
          <input
            id="tax-resident"
            type="checkbox"
            checked={isTaxResident}
            onChange={() => handleToggle(setIsTaxResident, isTaxResident)}
          />
          <span
            className="slider"
            onChange={() => handleToggle(setIsTaxResident, isTaxResident)}
          ></span>
        </div>
      </div>

      {/* Not Politically Exposed */}
      <div className="form-row">
        <label htmlFor="not-exposed">Not politically exposed</label>
        <div className="toggle">
          <input
            id="not-exposed"
            type="checkbox"
            checked={isNotPoliticallyExposed}
            onChange={() =>
              handleToggle(setIsNotPoliticallyExposed, isNotPoliticallyExposed)
            }
          />
          <span
            className="slider"
            onToggle={() =>
              handleToggle(setIsNotPoliticallyExposed, isNotPoliticallyExposed)
            }
          ></span>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <a href="/confirmDetails">
          <button className="next-btn">Next</button>
        </a>
        <a href="/confirmDetails">
          <button className="skip-btn">Skip for now</button>
        </a>
      </div>
    </div>
  );
};

export default FatcaVerificationForm;
