"use server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const incrementCredits = async (user: User) => {
  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      credits: {
        increment: 1,
      },
    },
  });
  revalidatePath("/dashboard");
  return updatedUser;
};
export const decrementCredits = async (user: User) => {
  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });
  revalidatePath("/dashboard");
  return updatedUser;
};
