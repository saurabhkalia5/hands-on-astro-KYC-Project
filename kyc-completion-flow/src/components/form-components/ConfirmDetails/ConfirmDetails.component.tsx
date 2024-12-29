import { useStore } from "@nanostores/react";
import "./ConfirmDetails.styles.css";
import { userStore } from "../../../userStore";
import type { UserType } from "../../../types";

// const userData = {
//   data: {
//     pan_card_number: 'XXXX-XXXX-XXXX',
//     name: 'John Doe',
//     age: 30,
//     gender: 'Male',
//     date_of_birth: '1993-01-01',
//     address: '123 Main St, City, Country',
//     pincode: '123456',
//     email: 'johndoe@example.com',
//     marital_status: 'Single',
//     annual_income: '50000',
//     father_name: 'Father Name',
//     mother_name: 'Mother Name',
//     documents:{
//         photo:"null",
//         pan_card:"null",
//         signature:"null"
//     }
//   }
// };

const UserProfile: React.FC = () => {
  // Fetch the data from nano store
  //   const userData = userStore.get();

  const currentUser = useStore(userStore);

  return (
    <div>
      {/* User Details Section */}
      <div className="card">
        <div className="card-header">
          User Details <span className="edit"><a href="/personalDetails">Edit</a></span>
        </div>
        <div className="card-content">
          <p>PAN Card Number: {currentUser.pan_card_number}</p>
          <p>Name: {currentUser.name}</p>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="card">
        <div className="card-header">Personal Details</div>
        <div className="card-content">
          <p>Gender: {currentUser.gender}</p>
          <p>Date of Birth: {currentUser.date_of_birth}</p>
          <p>Address: {currentUser.address}</p>
          <p>Pincode: {currentUser.pincode}</p>
          <div className="note">
            Note: You cannot edit the above details as they are already verified
            through Digilocker.
          </div>
        </div>
      </div>

      {/* KYC Details Section */}
      <div className="card">
        <div className="card-header">
          KYC Details <span className="edit"><a href="/personalDetails">Edit</a></span>
        </div>
        <div className="card-content">
          <p>Email: {currentUser.email}</p>
          <p>Marital Status: {currentUser.marital_status}</p>
          <p>Annual Income: {currentUser.annual_income}</p>
          <p>Father's Name: {currentUser.father_name}</p>
          <p>Mother's Name: {currentUser.mother_name}</p>
        </div>
      </div>

      {/* Documents Section */}
      <div className="card">
        <div className="card-header">
          Documents <span className="edit"><a href="/uploadDocuments">Edit</a></span>
        </div>
        <div className="documents">
          <div className="document-placeholder">
          <img src={currentUser.documents.photo} alt="Photo" className="document-image" />
        </div>
          <div className="document-placeholder">
            {/* <img src={currentUser.documents.pan_card} alt="PAN Card" className="document-image" /> */}
            <img
              src={currentUser.documents.pan_card}
              alt="PAN Card"
              className="document-image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="document-placeholder">
            <img
              src={currentUser.documents.signature}
              alt="Signature"
              className="document-image"
            />
           
          </div>
        </div>
      </div>

      {/* Terms and Buttons Section */}
      <div className="terms">
        <label>
          <input type="checkbox" aria-label="Agree to terms and conditions" /> I
          agree to the <a href="#">Terms & Conditions</a>
        </label>
      </div>
      <div className="buttons">
        <button className="next-btn" aria-label="Proceed to the next step">
          Next
        </button>
        <button className="skip-btn" aria-label="Skip for now">
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
