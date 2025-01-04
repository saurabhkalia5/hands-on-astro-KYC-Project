import { defineCollection, z } from 'astro:content';

//NOT BEING USED THERE ARE MADE TO LEARN MORE ABOUT COLLECTIONS AND MD along with Zod

const userCollection = defineCollection({
  schema: z.object({
    type: z.literal('user'),
    pan_card_number: z.string(),
    name: z.string(),
    gender: z.enum(['Male', 'Female', 'Other']),
    date_of_birth: z.string(),
    address: z.string(),
    pincode: z.string(),
    email: z.string().email(),
    marital_status: z.enum(['Unmarried', 'Married', 'Divorced', 'Widowed']),
    annual_income: z.string(),
    father_name: z.string(),
    mother_name: z.string(),
    documents: z.object({
      photo: z.string(),
      pan_card: z.string(),
      signature: z.string(),
    }),
    terms_agreed: z.boolean(),
  }),
});

export const collections = {
  user: userCollection,
};
