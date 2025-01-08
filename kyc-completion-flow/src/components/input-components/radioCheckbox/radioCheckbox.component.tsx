import React from "react";
import "./radioCheckbox.styles.css";

interface RadioCheckBoxProps {
  name: string;
  question: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  errorMessage?: string;
  onChange: (name: string, value: string) => void;
  verticalDisplay?: boolean;
}

export default function RadioCheckBox(props: RadioCheckBoxProps) {
  return (
    <div className="field">
      <h2>{props.question}</h2>
      <div
        className={!props.verticalDisplay ? "radio-group" : "income-options"}
      >
        {" "}
        {props.options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={props.name}
              value={option.value}
              checked={props.selectedValue === option.value}
              onChange={() => props.onChange(props.name, option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {props.errorMessage && (
        <div className="error-message">{props.errorMessage}</div>
      )}
    </div>
  );
}
