import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { studentProfiles } from "@/db/schema";
import { auth } from "@/auth";

export async function GET() {
  try {
    // Get the authenticated user
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", hasProfile: false },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Check if the user has a completed profile
    const profile = await db
      .select({ id: studentProfiles.id, isCompleted: studentProfiles.isCompleted })
      .from(studentProfiles)
      .where(eq(studentProfiles.userId, userId))
      .limit(1);
    
    const hasProfile = profile.length > 0 && profile[0].isCompleted;
    
    return NextResponse.json({ hasProfile });
  } catch (error) {
    console.error("Error checking profile:", error);
    return NextResponse.json(
      { error: "Internal server error", hasProfile: false },
      { status: 500 }
    );
  }
} 