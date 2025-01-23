"use server";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";

const razorCred = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

export async function checkUserPlan(
  userId: string
): Promise<"free" | "pro" | "enterprise"> {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        credits: true,
        userType: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Enterprise users typically have a specific subscription status
    if (user.userType === "enterprise") {
      return "enterprise";
    }

    // Pro users have an active subscription
    if (user.userType === "active") {
      return "pro";
    }

    // Default to free tier
    return "free";
  } catch (error) {
    console.error("Error checking user plan:", error);
    return "free"; // Default to free tier on error
  }
}


