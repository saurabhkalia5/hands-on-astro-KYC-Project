import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { z } from "zod";
import { useStore } from "@nanostores/react";
import { userStore } from "../../../userStore";

// Fetch user fields from the Astro Store
const currentUser = useStore(userStore);


const schema = z.object({
  type: z.literal("user"),
  pan_card_number: z.string(),
  name: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  date_of_birth: z.string(),
  address: z.string(),
  pincode: z.string(),
  email: z.string().email(),
  marital_status: z.enum(["Unmarried", "Married", "Divorced", "Widowed"]),
  annual_income: z.string(),
  father_name: z.string(),
  mother_name: z.string(),
  documents: z.object({
    photo: z.string(),
    pan_card: z.string(),
    signature: z.string(),
  }),
  terms_agreed: z.boolean(),
});

export const POST: APIRoute = async () => {
  const rawData = {
    pan_card_number: currentUser.pan_card_number,
    name: currentUser.name,
    gender: currentUser.gender,
    date_of_birth: currentUser.date_of_birth,
    address: currentUser.address,
    pincode: currentUser.pincode,
    email: currentUser.email,
    marital_status: currentUser.marital_status,
    annual_income: currentUser.annual_income,
    father_name: currentUser.father_name,
    mother_name: currentUser.mother_name,
    documents: {
      photo: currentUser.documents?.photo,
      pan_card: currentUser.documents?.pan_card,
      signature: currentUser.documents?.signature,
    },
  };

  try {
    const data = schema.parse(rawData);
    const db = getFirestore(app);
    const storage = getStorage(app);

    // Save the user data to Firestore
    await db.collection("users").add({
      ...data,
      // documents,
    });
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      // Return error details for validation failure
      return new Response(
        JSON.stringify({ success: false, errors: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
