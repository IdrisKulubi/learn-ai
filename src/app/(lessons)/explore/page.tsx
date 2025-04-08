import { auth } from "@/auth";
import { studentProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "@/db/drizzle";
import LessonExplorer from "./components/lesson-explorer";

export const metadata = {
  title: "Explore Lessons | AI Learning Platform",
  description: "Discover fun and engaging lessons designed just for you",
};

export default async function ExplorePage() {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Explore Lessons
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover fun and engaging lessons designed to help you learn in an enjoyable way.
          </p>
        </div>
        
        <LessonExplorer 
          username={studentProfile.username}
          grade={studentProfile.grade || "1"}
          ageGroup={studentProfile.ageGroup || "5-7"}
        />
      </div>
    </div>
  );
} 