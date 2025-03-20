"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { studentProfiles } from "@/db/schema";
import { StudentProfileFormData } from "../validator";
import { auth } from "@/auth";

/**
 * Check if a username is available
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    // Query for existing username
    const existingProfile = await db
      .select({ username: studentProfiles.username })
      .from(studentProfiles)
      .where(eq(studentProfiles.username, username))
      .limit(1);
    
    // Return true if no matching profile found (username is available)
    return existingProfile.length === 0;
  } catch (error) {
    console.error("Error checking username availability:", error);
    // In case of error, assume username is taken to be safe
    return false;
  }
}

/**
 * Create a new student profile
 */
export async function createStudentProfile(formData: StudentProfileFormData) {
  try {
    // Get the authenticated user
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error("You must be logged in to create a profile");
    }
    
    const userId = session.user.id;
    
    // Check if user already has a profile
    const existingProfile = await db
      .select()
      .from(studentProfiles)
      .where(eq(studentProfiles.userId, userId))
      .limit(1);
    
    if (existingProfile.length > 0) {
      // Update existing profile
      await db
        .update(studentProfiles)
        .set({
          username: formData.username,
          grade: formData.grade,
          ageGroup: formData.ageGroup,
          school: formData.school,
          avatarColor: formData.avatarColor,
          isCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(studentProfiles.userId, userId));
    } else {
      // Create new profile
      await db.insert(studentProfiles).values({
        userId: userId,
        username: formData.username,
        grade: formData.grade,
        ageGroup: formData.ageGroup,
        school: formData.school,
        avatarColor: formData.avatarColor,
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    // Revalidate the profile paths
    revalidatePath("/");
    revalidatePath("/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Error creating student profile:", error);
    throw new Error("Failed to create student profile");
  }
}

/**
 * Get the student profile for the current user
 */
export async function getCurrentUserProfile() {
  try {
    // Get the authenticated user
    const session = await auth();
    
    if (!session?.user?.id) {
      return null;
    }
    
    const userId = session.user.id;
    
    // Get the user's profile
    const profile = await db
      .select()
      .from(studentProfiles)
      .where(eq(studentProfiles.userId, userId))
      .limit(1);
    
    return profile.length > 0 ? profile[0] : null;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
} 