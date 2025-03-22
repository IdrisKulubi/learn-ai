"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

// Type for searching lessons
export interface LessonSearchParams {
  query?: string;
  category?: string;
  gradeLevel?: string;
  difficulty?: string;
}

// Type for lesson results
export interface LessonResult {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  gradeLevel: string;
  estimatedTime: string;
  emoji: string;
}

// Dummy data for now
const sampleLessons: LessonResult[] = [
  {
    id: 1,
    title: "Addition & Subtraction Adventures",
    description: "Learn to add and subtract numbers in a fun space adventure!",
    category: "math",
    difficulty: "beginner",
    gradeLevel: "1-2",
    estimatedTime: "15 minutes",
    emoji: "🚀"
  },
  {
    id: 2,
    title: "Dinosaur Discovery",
    description: "Explore the world of dinosaurs and learn amazing facts!",
    category: "science",
    difficulty: "beginner",
    gradeLevel: "1-3",
    estimatedTime: "20 minutes",
    emoji: "🦕"
  },
  // More lessons can be added here
];

/**
 * Search for lessons based on search parameters
 */
export async function searchLessons(params: LessonSearchParams): Promise<LessonResult[]> {
  try {
    // In a real application, this would query the database
    // For now, we're using sample data
    
    let results = [...sampleLessons];
    
    // Filter by query if provided
    if (params.query) {
      const query = params.query.toLowerCase();
      results = results.filter(lesson => 
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category if provided
    if (params.category && params.category !== "all") {
      results = results.filter(lesson => 
        lesson.category.toLowerCase() === params.category?.toLowerCase()
      );
    }
    
    // Filter by grade level if provided
    if (params.gradeLevel) {
      results = results.filter(lesson => {
        const [min, max] = lesson.gradeLevel.split("-").map(Number);
        const grade = Number(params.gradeLevel);
        return grade >= min && grade <= max;
      });
    }
    
    // Filter by difficulty if provided
    if (params.difficulty) {
      results = results.filter(lesson => 
        lesson.difficulty.toLowerCase() === params.difficulty?.toLowerCase()
      );
    }
    
    return results;
  } catch (error) {
    console.error("Error searching lessons:", error);
    return [];
  }
}

/**
 * Start a lesson for a student
 */
export async function startLesson(lessonId: number, userId: string) {
  try {
    // In a real application, this would:
    // 1. Record that the user started this lesson
    // 2. Create a lesson progress entry
    // 3. Return the lesson content or redirect URL
    
    // For now, just find the lesson in our sample data
    const lesson = sampleLessons.find(l => l.id === lessonId);
    
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    
    // Simulate recording the lesson start
    console.log(`User ${userId} started lesson: ${lesson.title}`);
    
    // In a real app, you might update the database here
    // await db.lessonProgress.create({
    //   data: {
    //     lessonId,
    //     userId,
    //     startedAt: new Date(),
    //     status: "in_progress"
    //   }
    // });
    
    revalidatePath("/lessons/explore");
    
    return {
      success: true,
      lesson
    };
  } catch (error) {
    console.error("Error starting lesson:", error);
    return {
      success: false,
      error: "Failed to start lesson"
    };
  }
} 