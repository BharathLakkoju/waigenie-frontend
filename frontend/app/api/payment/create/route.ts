import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Razorpay from "razorpay";
// import { getServerSession } from "next-auth";
import {auth} from "@/auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const body = await req.json();
    const { plan } = body;

    let amount;
    if (plan === "pro") {
      amount = 1; // $15.00
    } else if (plan === "enterprise") {
      amount = 1; // $100.00 or custom amount
    } else {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Generate a shorter receipt ID using timestamp and last 4 chars of user ID
    const shortUserId = user.id.slice(-4);
    const timestamp = Date.now().toString().slice(-8);
    const receipt = `rcpt_${shortUserId}${timestamp}`;

    const options = {
      amount: amount * 100, // Amount in smallest currency unit (cents)
      currency: "INR",
      receipt: receipt, // This will now be under 40 chars
      notes: {
        userId: user.id,
        userEmail: user.email,
        plan: plan,
      },
    };

    console.log("Creating order with options:", options);
    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new NextResponse(error instanceof Error ? error.message : "Internal error", { status: 500 });
  }
} 