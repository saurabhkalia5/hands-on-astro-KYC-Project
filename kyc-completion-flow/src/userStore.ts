import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { UserType } from "./types";
import CryptoJS from "crypto-js";

/**
 * @typedef {Object} UserDocuments
 * @property {string} photo - Path to the user's photo document
 * @property {string} pan_card - Path to the user's PAN card document
 * @property {string} signature - Path to the user's signature document
 */

/**
 * @typedef {Object} User
 * @property {string} pan_card_number
 * @property {string} name
 * @property {number} age
 * @property {string} gender
 * @property {string} date_of_birth
 * @property {string} address
 * @property {string} pincode
 * @property {string} email
 * @property {string} marital_status
 * @property {string} annual_income
 * @property {string} father_name
 * @property {string} mother_name
 * @property {UserDocuments} documents
 */

/** @type {import('nanostores').Atom<User>} */

const initialUserState: UserType = {
  pan_card_number: "Indian Citizen",
  name: "Tanvi Jadhav",
  age: 0,
  gender: "Male",
  date_of_birth: "DD/MM/YYYY",
  address: "250 Flat No, second floor, sector 57, shushant lok Phase 2",
  pincode: "122003",
  email: "",
  marital_status: "",
  annual_income: "",
  father_name: "",
  mother_name: "",
  documents: {
    photo: "https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg",
    pan_card: "https://i.etsystatic.com/36262552/r/il/e99d3d/4200185857/il_570xN.4200185857_4q6q.jpg",
    signature: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8dfNitSE3DimQsl9LmGzBvSORvE0Cj17Vg&s",
  },
};

const ENCRYPTION_KEY = "kjdsjkasdjksdkjjkdsakjkjadkjjkadkj";

export const userStore = persistentAtom<UserType>(
  "userStore",
  initialUserState,
  {
    encode: (data: UserType) => {
      try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
        return encrypted;
      } catch (error) {
        console.error("Failed to encrypt data:", error);
        return ""; 
      }
    },    
    decode: (data: string) => {
      try {
        if (!data || typeof data !== "string" || !/^[A-Za-z0-9+/=]+$/.test(data)) {
          console.warn("Invalid encrypted data format.");
          return initialUserState;
        }
    
        const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
        return JSON.parse(decrypted) as UserType;
      } catch (error) {
        console.error("Failed to decrypt userStore data:", error);
        return initialUserState; 
      }
    }
    
  }
);

userStore.subscribe((value) => {
  console.log("updaated value", value);
});

export function updateUser(key: string, value: string) {
  const currentUser = userStore.get(); // Directly retrieve the object
  let updatedUser;

  if (key === "documents.pan_card") {
    updatedUser = {
      ...currentUser,
      documents: {
        ...currentUser.documents, // Copy existing document properties
        pan_card: value, // Update the `pan_card` property
      },
    };
  } else if (key === "documents.signature") {
    updatedUser = {
      ...currentUser,
      documents: {
        ...currentUser.documents, // Copy existing document properties
        signature: value, // Update the `pan_card` property
      },
    };
  } else {
    updatedUser = {
      ...currentUser, // Spread the current values
      [key]: value, // Update the specific key
    };
  }

  // Save the updated object back to the persistent store
  userStore.set(updatedUser);
}

// Function to reset the user store to the initial state
export function resetUserStore() {
  userStore.set(initialUserState);
}
