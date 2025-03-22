import { db } from "@/db";
import { searchLessons } from "@/lib/actions/lesson.actions";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecommendedLessonsProps {
  userId: string;
  grade: string;
  ageGroup: string;
}

export async function RecommendedLessons({ userId, grade, ageGroup }: RecommendedLessonsProps) {
  // Get recommended lessons for the user based on grade and age group
  // In a real app, you would use the user's progress and interests to recommend relevant lessons
  const lessons = await searchLessons({
    gradeLevel: grade,
  });
  
  // Limit to 3 recommendations
  const recommendedLessons = lessons.slice(0, 3);
  
  if (recommendedLessons.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link 
            href="/lessons/explore" 
            className="flex items-center text-primary hover:underline"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground">
              As you learn more, we'll recommend lessons just for you!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <Link 
          href="/lessons/explore" 
          className="flex items-center text-primary hover:underline"
        >
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {recommendedLessons.map((lesson) => (
          <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
            <Card className="h-full overflow-hidden hover:border-primary transition-colors">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="text-4xl mb-2">{lesson.emoji}</div>
                  <div>
                    <h3 className="font-bold line-clamp-1">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.estimatedTime}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {lesson.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 