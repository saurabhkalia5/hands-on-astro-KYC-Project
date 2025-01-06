import React, { useEffect, useState } from "react";
import "./FatcaDeclarations.styles.css";
import { useStore } from "@nanostores/react";
import { userStore } from "../../../userStore";
import HeadingTile from "../../HeadingTile/headingTile.component";
import SubmitButton from "../../submitButtons/submitButtons";

const FatcaVerificationForm: React.FC = () => {
  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean>(true);
  const [isTaxResident, setIsTaxResident] = useState<boolean>(true);
  const [isNotPoliticallyExposed, setIsNotPoliticallyExposed] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean
  ) => {
    setter(!currentValue);
  };

  useEffect(() => {
    // Check if any of the values are false and set `isDisabled` accordingly
    if (!isIndianCitizen || !isTaxResident || !isNotPoliticallyExposed) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isIndianCitizen, isTaxResident, isNotPoliticallyExposed]);

  return (
    <>
      {" "}
      <HeadingTile title="FATCA Declaration" />
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
              onClick={() => handleToggle(setIsIndianCitizen, isIndianCitizen)} // Updated to handle click on the slider as well
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
              onClick={() => handleToggle(setIsTaxResident, isTaxResident)} // Updated to handle click on the slider as well
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
                handleToggle(
                  setIsNotPoliticallyExposed,
                  isNotPoliticallyExposed
                )
              }
            />
            <span
              className="slider"
              onClick={
                () =>
                  handleToggle(
                    setIsNotPoliticallyExposed,
                    isNotPoliticallyExposed
                  ) // Updated to handle click on the slider as well
              }
            ></span>
          </div>
        </div>

        {/* Buttons */}
        <SubmitButton nextRoute="/confirmDetails" isDisabled={isDisabled} validate={()=>true}/>
      </div>
    </>
  );
};

export default FatcaVerificationForm;
