import React, { useEffect, useState } from "react";
import "./FatcaDeclarations.styles.css";
import HeadingTile from "../../HeadingTile/headingTile.component";
import SubmitButton from "../../input-components/submitButtons/submitButtons";
import ToggleSlider from "../../input-components/toggleSlider/toggleSlider.component";
import { FATCAdeclarations } from "../../../configurations";

const FatcaVerificationForm: React.FC = () => {

  const [toggleStates, setToggleStates] = useState(() => {
    const initialStates: Record<string, boolean> = {};
    FATCAdeclarations.forEach((item) => {
      initialStates[item.state] = true;
    });
    return initialStates;
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleToggle = (key: string) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const anyFalse = Object.values(toggleStates).some((state) => !state);
    setIsDisabled(anyFalse);
  }, [toggleStates]);

  return (
    <>
      <HeadingTile title="FATCA Declaration" />
      <div className="container">
        <div className="header">Please verify that you are an:</div>
        {FATCAdeclarations.map((item) => (
          <ToggleSlider
            key={item.id}
            id={item.id}
            label={item.label}
            value={toggleStates[item.state]}
            setValue={() => handleToggle(item.state)}
            handleToggle={(setter, currentValue) => setter(!currentValue)}
          />
        ))}
        <SubmitButton
          nextRoute="/confirmDetails"
          isDisabled={isDisabled}
          validate={() => true}
        />
      </div>
    </>
  );
};

export default FatcaVerificationForm;
