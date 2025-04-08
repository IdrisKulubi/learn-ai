import { auth } from "@/auth";
import { studentProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { UserSection } from "./components/user-section";
import { ActivitySection } from "./components/activity-section";
import { RecommendedLessons } from "./components/recommended-lessons";
import db from "@/db/drizzle";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  
  const userId = session.user.id;
  
  // Check if the user has a student profile
  const studentProfile = await db.query.studentProfiles.findFirst({
    where: eq(studentProfiles.userId, userId),
  });
  
  // If no profile, redirect to setup
  if (!studentProfile) {
    redirect("/setup");
  }
  
  // If profile is not completed, redirect to setup
  if (!studentProfile.isCompleted) {
    redirect("/setup");
  }
  
  return (
    <div className="container max-w-7xl py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* User Profile Section */}
        <div className="md:col-span-1">
          <Suspense fallback={<div className="h-[200px] rounded-xl bg-muted animate-pulse" />}>
            <UserSection 
              userId={userId} 
              username={studentProfile.username}
              grade={studentProfile.grade || ""}
              ageGroup={studentProfile.ageGroup || "5-7"}
              avatarColor={studentProfile.avatarColor || "#4f46e5"}
            />
          </Suspense>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, <span className="text-primary">{studentProfile.username}</span>!
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to continue learning? Pick up where you left off or explore new lessons.
            </p>
          </div>
          
          {/* Activities & Progress */}
          <Suspense fallback={<div className="h-[200px] rounded-xl bg-muted animate-pulse" />}>
            <ActivitySection userId={userId} />
          </Suspense>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/lessons/explore" 
              className="bg-primary hover:bg-primary/90 dark:bg-primary/90 text-white rounded-lg px-6 py-3 text-center font-medium inline-flex items-center justify-center"
            >
              Find New Lessons
            </Link>
            <Link 
              href="/lessons/continue" 
              className="bg-secondary hover:bg-secondary/90 dark:bg-secondary/90 text-secondary-foreground rounded-lg px-6 py-3 text-center font-medium inline-flex items-center justify-center"
            >
              Continue Learning
            </Link>
          </div>
          
          {/* Recommended Lessons */}
          <Suspense fallback={<div className="h-[300px] rounded-xl bg-muted animate-pulse" />}>
            <RecommendedLessons 
              userId={userId} 
              grade={studentProfile.grade || ""}
              ageGroup={studentProfile.ageGroup || "5-7"}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 