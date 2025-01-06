import React from 'react';
import './submitButtons.css';

interface SubmitButtonProps {
  nextRoute: string;
  isDisabled?: boolean;
  validate: () => boolean;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const handleNavigation = () => {
    if (props.validate()) {
      window.location.href = props.nextRoute; // Navigate to the next route
    }
  };

  return (
    <div className="submit-buttons">
      {props.isDisabled ? (
        <div className="error-message">Please select all fields to continue</div>
      ) : (
        <>
          <button className="next-button" onClick={handleNavigation}>
            Next
          </button>
          <a href={props.nextRoute}>
            <button className="skip-button">SKIP FOR NOW</button>
          </a>
        </>
      )}
    </div>
  );
}
