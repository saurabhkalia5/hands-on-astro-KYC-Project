import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { z } from "zod";
import { getCollection } from "astro:content";

// Fetch user fields from the Astro collection
const userCollection = await getCollection("user"); // Assuming this fetches the user data collection
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
  // Directly use data from the Astro collection (currentUser)
  const rawData = {
    type: currentUser.data.type, // Assuming type is stored in currentUser.data
    pan_card_number: currentUser.data.pan_card_number, // Assuming pan_card_number is stored in currentUser.data
    name: currentUser.data.name, // Assuming name is stored in currentUser.data
    gender: currentUser.data.gender, // Assuming gender is stored in currentUser.data
    date_of_birth: currentUser.data.date_of_birth, // Assuming date_of_birth is stored in currentUser.data
    address: currentUser.data.address, // Assuming address is stored in currentUser.data
    pincode: currentUser.data.pincode, // Assuming pincode is stored in currentUser.data
    email: currentUser.data.email, // Assuming email is stored in currentUser.data
    marital_status: currentUser.data.marital_status, // Assuming marital_status is stored in currentUser.data
    annual_income: currentUser.data.annual_income, // Assuming annual_income is stored in currentUser.data
    father_name: currentUser.data.father_name, // Assuming father_name is stored in currentUser.data
    mother_name: currentUser.data.mother_name, // Assuming mother_name is stored in currentUser.data
    documents: {
      photo: currentUser.data.documents?.photo, // Assuming document photo is available in currentUser.data
      pan_card: currentUser.data.documents?.pan_card, // Assuming document pan_card is available in currentUser.data
      signature: currentUser.data.documents?.signature, // Assuming document signature is available in currentUser.data
    },
    terms_agreed: currentUser.data.terms_agreed, // Assuming terms_agreed is available in currentUser.data
  };

  try {
    // Validate the data
    const data = schema.parse(rawData);

    const db = getFirestore(app);
    const storage = getStorage(app);

    // const uploadFile = async (filePath: string, path: string): Promise<string> => {
    //   const bucketName = `${import.meta.env.FIREBASE_PROJECT_ID}.firebasestorage.app`;
    //   const bucket = storage.bucket(bucketName);
      
    //   const fileRef = bucket.file(path);
    
    //   // Assuming filePath is a buffer or a string representing the file content.
    //   await fileRef.save(Buffer.from(filePath), {
    //     contentType: "application/octet-stream", // Assuming file is being passed as a buffer
    //   });
    
    //   return fileRef.publicUrl();
    // };
    // // Assuming documents are already in a suitable location in currentUser, handle file uploads
    // const documents = {
    //   photo: await uploadFile(currentUser.data.documents?.photo, `documents/photos/${data.pan_card_number}`),
    //   pan_card: await uploadFile(currentUser.data.documents?.pan_card, `documents/pan_cards/${data.pan_card_number}`),
    //   signature: await uploadFile(currentUser.data.documents?.signature, `documents/signatures/${data.pan_card_number}`),
    // };

    // Save the user data to Firestore
    await db.collection("users").add({
      ...data,
      // documents,
    });

    return redirect("/");
  } catch (error) {
    // Handle errors (validation or upload issues)
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
      });
    }
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
