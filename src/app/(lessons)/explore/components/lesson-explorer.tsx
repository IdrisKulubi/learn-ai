"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Star, Sparkles, Clock, Zap, BookOpenCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { searchLessons, startLesson } from "@/lib/actions/lesson.actions";
import { toast } from "sonner";
import { LessonResult } from "@/lib/actions/lesson.actions";
import { useCurrentUser } from "@/hooks/use-current-user";

interface LessonExplorerProps {
  username: string;
  grade: string;
  ageGroup: string;
}

export default function LessonExplorer({ username, grade, ageGroup }: LessonExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lessons, setLessons] = useState<LessonResult[]>([]);
  const [suggestedLessons, setSuggestedLessons] = useState<LessonResult[]>([]);
  const [isStartingLesson, setIsStartingLesson] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const user = useCurrentUser();
  
  // Define categories with fun icons
  const categories = [
    { id: "all", name: "All Topics", icon: <Sparkles className="h-4 w-4" /> },
    { id: "math", name: "Math Magic", icon: <span>🧮</span> },
    { id: "science", name: "Science Lab", icon: <span>🔬</span> },
    { id: "coding", name: "Coding Fun", icon: <span>💻</span> },
    { id: "history", name: "Time Travel", icon: <span>🏛️</span> },
    { id: "language", name: "Word Wizards", icon: <span>📚</span> },
  ];
  
  // Wrap fetchLessons in useCallback
  const fetchLessons = useCallback(async (category: string) => {
    try {
      const results = await searchLessons({
        category: category === "all" ? undefined : category,
        gradeLevel: grade,
      });
      
      return results;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Something went wrong loading lessons");
      return [];
    }
  }, [grade]);
  
  // Search for lessons
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      const results = await searchLessons({
        query: searchQuery,
        category: selectedCategory === "all" ? undefined : selectedCategory
      });
      
      setLessons(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.info("No lessons found for your search");
      }
    } catch (error) {
      console.error("Error searching lessons:", error);
      toast.error("Oops! Couldn't find those lessons. Try again!");
      setIsSearching(false);
    }
  };
  
  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    const categoryLessons = await fetchLessons(category);
    setLessons(categoryLessons);
  };
  
  // Handle starting a lesson
  const handleStartLesson = async (lessonId: number) => {
    if (!user?.id) {
      toast.error("You need to be logged in to start a lesson");
      return;
    }
    
    setIsStartingLesson(true);
    setSelectedLessonId(lessonId);
    
    try {
      const result = await startLesson(lessonId, user.id);
      
      if (result.success) {
        toast.success(`Starting lesson: ${result.lesson?.title}! Let's learn!`);
        // In a real app, redirect to the lesson page
        // window.location.href = `/lessons/${lessonId}`;
      } else {
        toast.error(result.error || "Failed to start lesson");
      }
      
      setIsStartingLesson(false);
      setSelectedLessonId(null);
    } catch (error) {
      console.error("Error starting lesson:", error);
      toast.error("Oops! Couldn't start this lesson. Try again!");
      setIsStartingLesson(false);
      setSelectedLessonId(null);
    }
  };
  
  // Get suggested lessons on initial load
  useEffect(() => {
    const getSuggestedLessons = async () => {
      const suggested = await fetchLessons("all");
      setSuggestedLessons(suggested.slice(0, 4)); // Just show top 4 suggestions
      setLessons(suggested);
    };
    
    getSuggestedLessons();
  }, [grade,fetchLessons]);
  
  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-2">
          Hey {username}! <span className="text-2xl">👋</span>
        </h2>
        <p className="text-muted-foreground">
          Ready for an adventure? Pick a lesson below or search for something you&apos;d like to learn
        </p>
      </div>
      
      {/* Search bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for something fun to learn..."
              className="pl-10"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      
      {/* Recommended for you section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Just For You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestedLessons.length > 0 ? (
            suggestedLessons.map((lesson) => (
              <motion.div
                key={`suggested-${lesson.id}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full cursor-pointer overflow-hidden border-2 hover:border-primary transition-colors">
                  <CardContent className="p-0">
                    <div className="p-6 space-y-4">
                      <div className="text-4xl mb-2">{lesson.emoji}</div>
                      <h3 className="font-bold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {lesson.estimatedTime}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {lesson.difficulty}
                        </Badge>
                      </div>
                      
                      <Button 
                        className="w-full mt-4"
                        size="sm"
                        onClick={() => handleStartLesson(lesson.id)}
                        disabled={isStartingLesson && selectedLessonId === lesson.id}
                      >
                        {isStartingLesson && selectedLessonId === lesson.id ? (
                          <span className="flex items-center gap-2">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.div>
                            Loading...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <BookOpenCheck className="h-4 w-4" />
                            Start Lesson
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center p-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Looking for lessons...</h3>
              <p className="text-muted-foreground">
                We&apos;re finding the perfect lessons for your level.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Browse lessons by category */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          Browse Lessons
        </h2>
        
        <Tabs defaultValue="all" onValueChange={handleCategoryChange}>
          <TabsList className="mb-4 overflow-x-auto flex w-full no-scrollbar">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl">{lesson.emoji}</div>
                        <Badge variant="secondary" className="capitalize">
                          {lesson.category}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {lesson.estimatedTime}
                        </Badge>
                        <Badge variant="outline">Grade {lesson.gradeLevel}</Badge>
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${
                            lesson.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" :
                            lesson.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" :
                            "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                          }`}
                        >
                          {lesson.difficulty}
                        </Badge>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => handleStartLesson(lesson.id)}
                        disabled={isStartingLesson && selectedLessonId === lesson.id}
                      >
                        {isStartingLesson && selectedLessonId === lesson.id ? (
                          <span className="flex items-center gap-2">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.div>
                            Preparing Lesson...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Start Learning
                          </span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center p-12">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">No lessons found</h3>
                  <p className="text-muted-foreground">
                    Try a different category or check back later for new content!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </section>
    </div>
  );
} 