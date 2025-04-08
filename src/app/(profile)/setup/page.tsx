import { Metadata } from "next";
import ProfileSetupWizard from "./components/profile-setup-wizard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { studentProfiles } from "@/db/schema";
import db from "@/db/drizzle";

export const metadata: Metadata = {
  title: "Student Profile Setup | AI Learning Platform",
  description: "Create your student profile to get started with AI Learning Platform",
};

export default async function ProfileSetupPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/sign-in');
  }
  
  const userId = session.user.id;
  
  const profile = await db.query.studentProfiles.findFirst({
    where: eq(studentProfiles.userId, userId)
  });
  
  // If profile is completed, redirect to dashboard
  if (profile?.isCompleted) {
    redirect('/dashboard');
  }
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Create Your Profile
        </h1>
        <p className="text-muted-foreground text-lg">
          Let&apos;s personalize your learning journey
        </p>
      </div>
      
      <ProfileSetupWizard />
    </div>
  );
} 