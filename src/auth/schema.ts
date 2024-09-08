import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, "Password is too short. Minimum 8 characters required.").max(64),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters.").max(64),
  lastName: z.string().min(2, "Last name must be at least 2 characters.").max(64),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, "Password is too short. Minimum 8 characters required.").max(64),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Invalid token" }),
  password: z.string().min(8, { message: "Password is too short." }).max(64),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
