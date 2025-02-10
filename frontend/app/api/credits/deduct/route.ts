import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Get user
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        credits: true,
        userType: true,
        maxCredits: true,
        lastCreditRefresh: true,
        creditRefreshInterval: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if credits need to be refreshed
    const now = new Date();
    const lastRefresh = new Date(user.lastCreditRefresh);
    const daysSinceRefresh = Math.floor((now.getTime() - lastRefresh.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceRefresh >= user.creditRefreshInterval) {
      // Refresh credits
      await db.user.update({
        where: { email },
        data: {
          credits: user.maxCredits,
          lastCreditRefresh: now,
        },
      });
      
      // Update local user object
      user.credits = user.maxCredits;
    }

    // Skip credit deduction for enterprise users
    if (user.userType === "enterpriseTierUser") {
      return NextResponse.json({ success: true, credits: 999999 });
    }

    // Check if user has enough credits
    if (user.credits <= 0) {
      return new NextResponse("Insufficient credits", { status: 403 });
    }

    // Deduct credit
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        credits: {
          decrement: 1
        }
      },
      select: {
        credits: true
      }
    });

    return NextResponse.json({
      success: true,
      credits: updatedUser.credits
    });

  } catch (error) {
    console.error("Credit deduction error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
} 