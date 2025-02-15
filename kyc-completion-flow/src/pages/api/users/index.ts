import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { z } from "zod";

export const POST: APIRoute = async ({ request, redirect }) => {
  const rawData = await request.json();

  const schema = z.object({
    pan_card_number: z.string(),
    name: z.string(),
    age: z.number(),
    gender: z.enum(["Male", "Female", "Other"]),
    date_of_birth: z.string(),
    address: z.string(),
    pincode: z.string(),
    email: z.string().email(),
    marital_status: z.enum(["Single", "Married", "Divorced", "Widowed"]),
    annual_income: z.string(),
    father_name: z.string(),
    mother_name: z.string(),
    documents: z.object({
      photo: z.string(),
      pan_card: z.string(),
      signature: z.string(),
    }),
  });

  try {
    const data = schema.parse(rawData);

    const db = getFirestore(app);
    await db.collection("users").add(data);
    return redirect("/confirmationScreen");
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      console.log("----> ", error);
        
      return new Response(
        JSON.stringify({ success: false, errors: error.message }),
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

