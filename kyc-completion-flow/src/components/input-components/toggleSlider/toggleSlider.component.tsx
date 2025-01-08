import React from "react";

interface ToggleSliderProps {
  label: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggle: (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean
  ) => void;
  id: string;
}

export default function ToggleSlider(props: ToggleSliderProps) {
  return (
    <div>
      <div className="form-row">
        <label htmlFor={props.id}>{props.label}</label>
        <div className="toggle">
          <input
            id={props.id}
            type="checkbox"
            checked={props.value}
            onChange={() => props.handleToggle(props.setValue, props.value)}
          />
          <span
            className="slider"
            onClick={() => props.handleToggle(props.setValue, props.value)}
          ></span>
        </div>
      </div>
    </div>
  );
}
