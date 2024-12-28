import React, { useEffect, useState } from 'react';
import './PersonalDetails.styles.css';
import { useStore } from '@nanostores/react'; 
import {  resetUserStore, updateUser, userStore } from '../../../userStore';
import type { UserType } from '../../../types';

export default function PersonalDetailsForm() {
  const currentUser = useStore(userStore)
  // Local state for form inputs
  const [marital_status, setMaritalstatus] = useState(currentUser.marital_status || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [fatherName, setFatherName] = useState(currentUser.father_name || '');
  const [mother_name, setMothername] = useState(currentUser.mother_name || '');
  const [annual_income, setAnnualIncome] = useState(currentUser.annual_income || '');

 

  // Handle value changes for various input types
  const handleValueChange = (key: string, value: string) => {
    // Update React state
    switch (key) {
      case 'marital_status':
        setMaritalstatus(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'father_name':
        setFatherName(value);
        break;
      case 'mother_name':
        setMothername(value);
        break;
      case 'annual_income':
        setAnnualIncome(value);
        break;
      default:
        break;
    }
    updateUser(key, value)
  };

  // Handle email domain click
  const handleEmailDomainClick = (domain: string) => {
    const updatedEmail = email.split('@')[0] + '@' + domain;
    setEmail(updatedEmail);
    handleValueChange('email', updatedEmail);
  };

  return (
    <div className="personal-details-form">
      <div className="form-container">
        <h2>Marital Status</h2>
        <div className="field">
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="marital_status" 
                value="Single" 
                checked={currentUser.marital_status === 'Single'} 
                onChange={() => handleValueChange('marital_status', 'Single')} 
              /> 
              Single
            </label>
            <label>
              <input 
                type="radio" 
                name="marital_status" 
                value="Married" 
                checked={currentUser.marital_status === 'Married'} 
                onChange={() => handleValueChange('marital_status', 'Married')} 
              /> 
              Married
            </label>
          </div>
        </div>
        <div className="field">
          <label>Father’s Name</label>
          <input 
            type="text" 
            id="fathersName" 
            className="text-input" 
            value={fatherName} 
            onChange={(e) => handleValueChange('father_name', e.target.value)} 
            placeholder="Enter father's name here" 
          />
        </div>
        <div className="field">
          <label>Mother’s Name</label>
          <input 
            type="text" 
            id="mothersName" 
            className="text-input" 
            value={mother_name} 
            onChange={(e) => handleValueChange('mother_name', e.target.value)} 
            placeholder="Enter mother's name here" 
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input 
            type="text" 
            id="email" 
            className="text-input" 
            value={email} 
            onChange={(e) => handleValueChange('email', e.target.value)} 
            placeholder="@gmail.com" 
          />
          <div className="email-domains">
            <button className="active" onClick={() => handleEmailDomainClick('gmail.com')}>@gmail.com</button>
            <button onClick={() => handleEmailDomainClick('yahoo.com')}>@yahoo.com</button>
            <button onClick={() => handleEmailDomainClick('yahoo.co.in')}>@yahoo.co.in</button>
            <button onClick={() => handleEmailDomainClick('rediffmail.com')}>@rediffmail.com</button>
          </div>
          <small style={{color: "gray", fontSize: "0.9rem"}}>
            You will receive portfolio statements on this email id
          </small>
        </div>
        <h2>Annual Income</h2>
        <div className="income-options">
          <label>
            <input 
              type="radio" 
              name="annual_income" 
              value="Below 1 Lakh" 
              checked={annual_income === 'Below 1 Lakh'} 
              onChange={() => handleValueChange('annual_income', 'Below 1 Lakh')} 
            /> 
            Below 1 Lakh
          </label>
          <label>
            <input 
              type="radio" 
              name="annual_income" 
              value="1-5 Lakhs" 
              checked={annual_income === '1-5 Lakhs'} 
              onChange={() => handleValueChange('annual_income', '1-5 Lakhs')} 
            /> 
            1-5 Lakhs
          </label>
          <label>
            <input 
              type="radio" 
              name="annual_income" 
              value="5-10 Lakhs" 
              checked={annual_income === '5-10 Lakhs'} 
              onChange={() => handleValueChange('annual_income', '5-10 Lakhs')} 
            /> 
            5-10 Lakhs
          </label>
          <label>
            <input 
              type="radio" 
              name="annual_income" 
              value=">25 Lakhs" 
              checked={annual_income === '>25 Lakhs'} 
              onChange={() => handleValueChange('annual_income', '>25 Lakhs')} 
            /> 
            Above 25 Lakhs
          </label>
        </div>
        <div className="submit-buttons">
          <a href="/uploadDocuments">
            <button className="next-button">Next</button>
          </a>
          <a href="/uploadDocuments">
            <button className="skip-button">Skip for Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};
