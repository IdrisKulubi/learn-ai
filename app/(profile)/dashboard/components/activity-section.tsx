import { lessonProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import db from "@/db/drizzle";

interface ActivitySectionProps {
  userId: string;
}

export async function ActivitySection({ userId }: ActivitySectionProps) {
  // Get progress stats for the user
  // In a real app, you would fetch real data from the database
  const progress = await db.query.lessonProgress.findMany({
    where: eq(lessonProgress.userId, userId),
  });
  
  // Calculate stats (using placeholder data for now)
  const lessonsInProgress = progress.filter(p => p.status === "in_progress").length || 0;
  const lessonsCompleted = progress.filter(p => p.status === "completed").length || 0;
  const totalLessons = lessonsInProgress + lessonsCompleted || 0;
  const percentageCompleted = totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0;
  
  // Get time spent learning (placeholder for now)
  const hoursSpent = 0;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Learning Activity</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Lessons in Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lessons in Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span className="text-3xl font-bold">{lessonsInProgress}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Lessons Completed */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lessons Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-3xl font-bold">{lessonsCompleted}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Time Spent Learning */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Time Spent Learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-purple-500" />
              <span className="text-3xl font-bold">{hoursSpent}h</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Bar */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Overall Progress</CardTitle>
          <CardDescription>
            {lessonsCompleted} of {totalLessons} lessons completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={percentageCompleted} className="h-2" />
            <p className="text-right text-sm text-muted-foreground">
              {percentageCompleted}% complete
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 