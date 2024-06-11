import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type) => z.object({

  // for sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  // for both sign up and sign in
  email: z.string().email(),
  password: z.string().min(8),
});

export const parseStringify = (data) => JSON.parse(JSON.stringify(data));
