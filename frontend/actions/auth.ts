"use server";
import z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { LoginSchema, ResetSchema, SignupSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "No user found! Please Create an account" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        case "CallbackRouteError":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!.", errorType: error.type };
      }
    }
    throw error;
  }
  return {
    success: "Successfully Signed in!",
  };
};

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };
  const { name, email, password } = validatedFields.data;
  const hashedPwd = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPwd,
    },
  });
  return { success: "User Created" };
};

export const signout = async () => {
  const isSignedOut = await signOut();
  if (!isSignedOut) {
    return Response.redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return { error: "Something went wrong!" };
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };
  const { email, password } = validatedFields.data;
  const hashedPwd = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "No user found! Please create an account" };
  }
  await db.user.update({
    where: { email: email },
    data: { password: hashedPwd },
  });
  return { success: "Password Updated! Please Login." };
};

// export const updateData = async (values: z.infer<typeof )
