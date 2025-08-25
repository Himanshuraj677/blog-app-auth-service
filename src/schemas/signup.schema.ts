import z from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(4, "Name must contain at least 4 characters"),
    
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
});

export type signupType = z.infer<typeof signupSchema>;
