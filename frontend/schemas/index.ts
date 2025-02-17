import * as z from "zod";
import { validatePassword } from "@/lib/password-validation";

const passwordValidation = z.string()
  .min(1, { message: "Password is required" })
  .refine((password) => {
    if (password.length > 0) {
      const validation = validatePassword(password);
      return validation.isValid;
    }
    return true;
  }, {
    message: "Password does not meet requirements"
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: passwordValidation,
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const SignupSchema = RegisterSchema.extend({
  tier: z.enum(["freeTierUser", "proTierUser", "enterpriseTierUser"]).default("freeTierUser"),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: passwordValidation,
});
