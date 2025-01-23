"use server";

import { db } from "@/lib/db";
import Razorpay from "razorpay";
import { revalidatePath } from "next/cache";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

const PRO_TIER_PRICE = 999; // Price in INR
const PRO_TIER_CREDITS = 1000;

export async function createPaymentOrder() {
  try {
    const options = {
      amount: PRO_TIER_PRICE * 100, // Amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error("Error creating payment order:", error);
    return { success: false, error: "Failed to create payment order" };
  }
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string,
  userId: string
) {
  try {
    // Verify payment signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === signature;

    if (!isAuthentic) {
      throw new Error("Payment verification failed");
    }

    // Get current user
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user already has an active subscription
    if (
      user.subscriptionEndDate &&
      user.subscriptionEndDate > new Date() &&
      user.userType === "proTierUser"
    ) {
      throw new Error("User already has an active subscription");
    }

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    // Update user subscription
    await db.user.update({
      where: { id: userId },
      data: {
        userType: "proTierUser",
        credits: PRO_TIER_CREDITS,
        maxCredits: PRO_TIER_CREDITS,
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
        lastPaymentId: paymentId,
        lastPaymentStatus: "success",
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return { success: false, error: error.message };
  }
}

export async function checkSubscriptionStatus(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        userType: true,
        subscriptionEndDate: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const canPurchaseSubscription =
      !user.subscriptionEndDate ||
      user.subscriptionEndDate <= new Date() ||
      user.userType !== "proTierUser";

    return {
      success: true,
      canPurchase: canPurchaseSubscription,
      currentPlan: user.userType,
      subscriptionEndDate: user.subscriptionEndDate,
    };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return { success: false, error: error.message };
  }
}
