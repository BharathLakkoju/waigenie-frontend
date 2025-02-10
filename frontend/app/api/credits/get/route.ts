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
      
      // Return refreshed credits
      return NextResponse.json({
        credits: user.maxCredits
      });
    }

    // Return current credits
    return NextResponse.json({
      credits: user.userType === "enterpriseTierUser" ? 999999 : user.credits
    });

  } catch (error) {
    console.error("Error getting credits:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal error",
      { status: 500 }
    );
  }
} 