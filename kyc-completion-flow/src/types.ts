import { z } from "zod";

export interface UserDocuments {
  photo: string;
  pan_card: string;
  signature: string;
}

export interface UserType {
  pan_card_number: string;
  name: string;
  age: number;
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

export const userSchema = z.object({
  type: z.literal("user"),
  pan_card_number: z
    .string()
    .min(1, { message: "Pan card number cannot be empty" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  gender: z.enum(["Male", "Female", "Other"]),
  date_of_birth: z
    .string()
    .min(1, { message: "Date of birth cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  pincode: z.string().min(1, { message: "Pincode cannot be empty" }),
  email: z.string().email().min(1, { message: "Email cannot be empty" }),
  marital_status: z
    .string()
    .refine((val) => val !== "", {
      message: "Marital status cannot be empty",
    })
    .refine(
      (val) => ["Single", "Married", "Divorced", "Widowed"].includes(val),
      {
        message: "Please select a valid marital status",
      }
    ),
  annual_income: z
    .string()
    .min(1, { message: "Annual income cannot be empty" }),
  father_name: z.string().min(1, { message: "Father's name cannot be empty" }),
  mother_name: z.string().min(1, { message: "Mother's name cannot be empty" }),
  panCard: z.string({
    required_error: "PAN Card is mandatory",
    invalid_type_error: "PAN Card is mandatory",
  }),

  signature: z.string({
    required_error: "Signature is Mandatory",
    invalid_type_error: "Signature is Mandatory",
  }),
});

