import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if it's time to reset credits
    const lastRefreshDate = user.lastCreditRefresh;
    const now = new Date();
    const monthsSinceLastRefresh = (now.getFullYear() - lastRefreshDate.getFullYear()) * 12 + 
      (now.getMonth() - lastRefreshDate.getMonth());

    if (monthsSinceLastRefresh >= 1) {
      // Reset credits based on user type
      const defaultCredits = user.userType === "freeTierUser" ? 25 :
                           user.userType === "proTierUser" ? 1000 : 
                           5000; // Enterprise tier

      // Update user with reset credits
      const updatedUser = await db.user.update({
        where: { email },
        data: {
          credits: defaultCredits,
          lastCreditRefresh: now,
          nextCreditRefresh: new Date(now.setMonth(now.getMonth() + 1))
        },
      });

      return NextResponse.json({
        success: true,
        credits: updatedUser.credits,
        message: "Credits have been reset"
      });
    }

    return NextResponse.json({
      success: false,
      credits: user.credits,
      message: "Not time to reset credits yet"
    });

  } catch (error) {
    console.error("Error resetting credits:", error);
    return NextResponse.json(
      { error: "Failed to reset credits" },
      { status: 500 }
    );
  }
} 