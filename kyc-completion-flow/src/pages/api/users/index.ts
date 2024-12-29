import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { z } from "zod";
import { getCollection } from "astro:content";

// Fetch user fields from the Astro collection
const userCollection = await getCollection("user"); // this fetches the user data collection
const currentUser = userCollection[0]; // Get the first user in the collection

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

export const POST: APIRoute = async ({ request, redirect }) => {
  const rawData = {
    type: currentUser.data.type,
    pan_card_number: currentUser.data.pan_card_number,
    name: currentUser.data.name,
    gender: currentUser.data.gender,
    date_of_birth: currentUser.data.date_of_birth,
    address: currentUser.data.address,
    pincode: currentUser.data.pincode,
    email: currentUser.data.email,
    marital_status: currentUser.data.marital_status,
    annual_income: currentUser.data.annual_income,
    father_name: currentUser.data.father_name,
    mother_name: currentUser.data.mother_name,
    documents: {
      photo: currentUser.data.documents?.photo,
      pan_card: currentUser.data.documents?.pan_card,
      signature: currentUser.data.documents?.signature,
    },
    terms_agreed: currentUser.data.terms_agreed,
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
    return redirect("/");
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
