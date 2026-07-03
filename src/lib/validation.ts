import { z } from "zod";

export const callbackFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(2, "Please select a country"),
  preferredTime: z.string().min(1, "Please select a preferred callback time"),
  issueCategory: z.string().min(1, "Please select an issue category"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
  agreePrivacy: z.boolean().refine((val) => val === true, "You must agree to the Privacy Policy"),
  understandSecurity: z.boolean().refine((val) => val === true, "You must understand the security warning"),
});

export type CallbackFormData = z.infer<typeof callbackFormSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;
