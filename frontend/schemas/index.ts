import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters!",
  }),
  tier: z.enum(["freeTierUser", "proTierUser", "enterpriseTierUser"]).default("freeTierUser"),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters!",
  }),
});
