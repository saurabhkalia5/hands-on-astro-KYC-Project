export const maritalStatusOptions = [
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
  ];
  
  export const incomeStatusOptions = [
    { label: "Below 1 Lakh", value: "Below 1 Lakh" },
    { label: "1-5 Lakh", value: "1-5 Lakh" },
    { label: "5-10 Lakhs", value: "5-10 Lakhs" },
    { label: "Above 25 Lakhs", value: ">25 Lakhs" },
  ];
  
  export const emailDomains = [
    "gmail.com","yahoo.com","yahoo.co.in","rediffmail.com"
  ]

  export const FATCAdeclarations = [
    {
      id: "indian-citizen",
      label: "Indian citizen",
      state: "isIndianCitizen",
    },
    {
      id: "tax-resident",
      label: "Indian tax resident",
      state: "isTaxResident",
    },
    {
      id: "not-exposed",
      label: "Not politically exposed",
      state: "isNotPoliticallyExposed",
    }
  ];



  export const userDetailsConfig = [
    {
      label: "PAN Card Number",
      key: "pan_card_number",
    },
    {
      label: "Name",
      key: "name",
    },
  ];

  export const personalDetailsConfig = [
    {
      label: "Gender",
      key: "gender",
    },
    {
      label: "Date of Birth",
      key: "date_of_birth",
    },
    {
      label: "Address",
      key: "address",
    },
    {
      label: "Pincode",
      key: "pincode",
    },
  ];
  
  export const kycDetailsConfig = [
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Marital Status",
      key: "marital_status",
    },
    {
      label: "Annual Income",
      key: "annual_income",
    },
    {
      label: "Father's Name",
      key: "father_name",
    },
    {
      label: "Mother's Name",
      key: "mother_name",
    },
  ];
  
  export const documentsConfig = [
    {
      label: "Photo",
      src: "photo",
    },
    {
      label: "PAN Card",
      src: "pan_card",
    },
    {
      label: "Signature",
      src: "signature",
    },
  ];