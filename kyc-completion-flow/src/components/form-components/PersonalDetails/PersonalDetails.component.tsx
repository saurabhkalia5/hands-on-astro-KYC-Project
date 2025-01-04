import React, { useEffect, useState } from 'react';
import './PersonalDetails.styles.css';
import { useStore } from '@nanostores/react'; 
import {  resetUserStore, updateUser, userStore } from '../../../userStore';
import type { UserType } from '../../../types';
import HeadingTile from '../../HeadingTile/headingTile.component';
import SubmitButton from '../../submitButtons/submitButtons';

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

  const getDomain = (email:string) => {
    return email.split('@')[1];
  };

  const currentDomain = getDomain(email) ?? "gmail.com";


  return (
    <div className="personal-details-form">
      <HeadingTile title='Personal Details'/>
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
          <h2>Father’s Name</h2>
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
          <h2>Mother’s Name</h2>
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
          <h2>Email</h2>
          <input 
            type="text" 
            id="email" 
            className="text-input email" 
            value={email} 
            onChange={(e) => handleValueChange('email', e.target.value)} 
            placeholder="@gmail.com" 
          />
          {/* @TODO : CAN IMPLEMENT EMAIL VALIDATION AND DISABLE FIELD */}
           <div style={{color: "gray", fontSize: "0.9rem", marginTop:"10px", marginBottom:"20px"}}>
            You will receive portfolio statements on this email id
          </div>
          <div>
      <div className="email-domains">
        <button
          className={currentDomain === 'gmail.com' ? 'active' : ''}
          onClick={() => handleEmailDomainClick('gmail.com')}
        >
          @gmail.com
        </button>
        <button
          className={currentDomain === 'yahoo.com' ? 'active' : ''}
          onClick={() => handleEmailDomainClick('yahoo.com')}
        >
          @yahoo.com
        </button>
        <button
          className={currentDomain === 'yahoo.co.in' ? 'active' : ''}
          onClick={() => handleEmailDomainClick('yahoo.co.in')}
        >
          @yahoo.co.in
        </button>
        <button
          className={currentDomain === 'rediffmail.com' ? 'active' : ''}
          onClick={() => handleEmailDomainClick('rediffmail.com')}
        >
          @rediffmail.com
        </button>
      </div>
    </div>
         
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
          <SubmitButton nextRoute='/uploadDocuments'/>
        </div>
      </div>
    </div>
  );
};
