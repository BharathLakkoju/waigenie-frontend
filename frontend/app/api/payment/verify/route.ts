import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const { notes } = payment;
    const userId = notes?.userId;

    if (!userId) {
      return new NextResponse("User ID not found in payment", { status: 400 });
    }

    // Update user subscription status
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // 1 month subscription

    const newUserType = plan === "pro" ? "proTierUser" : "enterpriseTierUser";
    console.log("Updating user:", userId, "to type:", newUserType);

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        userType: newUserType,
        subscriptionStartDate: new Date(),
        subscriptionEndDate,
        lastPaymentId: razorpay_payment_id,
        lastPaymentStatus: "success",
        credits: plan === "pro" ? 1000 : 999999, // Pro: 1000 credits, Enterprise: unlimited
        maxCredits: plan === "pro" ? 1000 : 999999,
        creditRefreshInterval: 1, // 1 day refresh interval
      },
    });

    console.log("User updated successfully:", updatedUser);

    return NextResponse.json({
      success: true,
      message: "Payment verified and subscription updated",
      userType: updatedUser.userType
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return new NextResponse(error instanceof Error ? error.message : "Internal error", { status: 500 });
  }
} 