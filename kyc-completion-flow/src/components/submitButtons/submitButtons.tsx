import React from 'react'
import './submitButtons.css'

interface SubmitButtonProps {
    nextRoute:string;
    isDisabled?:boolean
}

export default function SubmitButton(props:SubmitButtonProps) {
  return (
    <div className="submit-buttons">
      {props.isDisabled ? (
        <div className="error-message">
          Please select all fields to continue
        </div>
      ) : (
        <>
          <a href={props.nextRoute}>
            <button className="next-button">Next</button>
          </a>
          <a href={props.nextRoute}>
            <button className="skip-button">SKIP FOR NOW</button>
          </a>
        </>
      )}
    </div>
  )
}
