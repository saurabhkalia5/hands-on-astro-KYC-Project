import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import type { UserType } from "./types";

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


const initialUserState:UserType = {
  pan_card_number: '',
  name: '',
  age: null,
  gender: '',
  date_of_birth: '',
  address: '',
  pincode: '',
  email: '',
  marital_status: '',
  annual_income: '',
  father_name: '',
  mother_name: '',
  documents: {
    photo: '',
    pan_card: '',
    signature: '',
  }
};

export const userStore = persistentAtom<UserType>('userStore', initialUserState, {
  encode: JSON.stringify,
  decode: JSON.parse,
})




export function updateUser(key: string, value: string) {
  const currentUser = userStore.get(); // Directly retrieve the object

  const updatedUser = {
    ...currentUser, // Spread the current values
    [key]: value,   // Update the specific key
  };

  // Save the updated object back to the persistent store
  userStore.set(updatedUser);
}

// Function to reset the user store to the initial state
export function resetUserStore() {
  userStore.set(initialUserState)
  }
