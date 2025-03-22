"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, User } from "lucide-react";

interface UserSectionProps {
  userId: string;
  username: string;
  grade: string;
  ageGroup: string;
  avatarColor: string;
}

export function UserSection({ userId, username, grade, ageGroup, avatarColor }: UserSectionProps) {
  // Get initials from username
  const initials = username
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="border-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 border-4" style={{ borderColor: avatarColor }}>
            <AvatarFallback 
              className={`text-2xl ${avatarColor}`}
              style={{ color: 'white' }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mt-4">{username}</h2>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {grade && (
              <Badge variant="outline" className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3" /> Grade {grade}
              </Badge>
            )}
            {ageGroup && (
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3 w-3" /> Age {ageGroup}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" /> Lessons Completed
            </span>
            <span className="text-lg font-medium">0</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4" /> Current Streak
            </span>
            <span className="text-lg font-medium">0 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" /> Member Since
            </span>
            <span className="text-sm">Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 