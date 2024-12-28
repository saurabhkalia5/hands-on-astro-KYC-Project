export interface UserDocuments {
    photo: string;
    pan_card: string;
    signature: string;
  }
  
  export interface UserType {
    pan_card_number: string;
    name: string;
    age: number | null;
    gender: string;
    date_of_birth: string;
    address: string;
    pincode: string;
    email: string;
    marital_status: string;
    annual_income: string;
    father_name: string;
    mother_name: string;
    documents: UserDocuments;
  }
  