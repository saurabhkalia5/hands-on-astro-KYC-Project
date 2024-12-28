import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const age = formData.get("age")?.toString();

  if (!name || !age) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const usersRef = db.collection("users");
    await usersRef.add({
      name,
      age: parseInt(age),
    });
  } catch (error) {
    debugger
    console.log(error)
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/");
};