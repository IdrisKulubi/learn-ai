"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { StudentProfileFormData } from "@/lib/validator";

interface ProfilePreviewStepProps {
  profileData: StudentProfileFormData;
  onUpdate: (data: Partial<StudentProfileFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

// Avatar color options
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-emerald-500",
];

export default function ProfilePreviewStep({ 
  profileData, 
  onUpdate, 
  onBack, 
  onSubmit,
  isSubmitting 
}: ProfilePreviewStepProps) {
  const [selectedColor, setSelectedColor] = useState(profileData.avatarColor || AVATAR_COLORS[0]);
  
  // Get the initials for the avatar
  const getInitials = () => {
    const username = profileData.username || "";
    // Remove emojis and special characters
    const cleanUsername = username.replace(/[^\w\s]/gi, '');
    return cleanUsername.substring(0, 2).toUpperCase();
  };
  
  // Handle avatar color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onUpdate({ avatarColor: color });
  };
  
  // Get the age group display text
  const getAgeGroupLabel = () => {
    switch (profileData.ageGroup) {
      case "5-7":
        return "Little Explorers (5-7)";
      case "8-10":
        return "Junior Geniuses (8-10)";
      case "11-13":
        return "Future Leaders (11-13)";
      default:
        return "";
    }
  };
  
  // Get emoji for the grade
  const getGradeEmoji = () => {
    const grade = parseInt(profileData.grade || "0");
    const emojis = ["✏️", "📚", "🔍", "🔭", "🔬", "🧪", "🧩", "🚀"];
    return emojis[Math.min(grade - 1, emojis.length - 1)] || "📚";
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Your Profile Preview</h2>
        <p className="text-muted-foreground">
          Here&apos;s how your profile will look. You can customize your avatar color
        </p>
      </div>
      
      <div className="space-y-6 py-2">
        {/* Avatar and Color Selection */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Avatar className="h-24 w-24">
              <AvatarFallback className={`text-xl ${selectedColor}`}>
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <div className="space-y-2">
            <Label>Choose your avatar color:</Label>
            <div className="flex flex-wrap gap-2 justify-center">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-full ${color} transition-all ${
                    selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                  aria-label={`Select ${color} avatar`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Profile Details Card */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Username</Label>
              <p className="text-xl font-medium">{profileData.username}</p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Grade</Label>
              <p className="text-lg flex items-center gap-2">
                {getGradeEmoji()} {profileData.grade}
                {profileData.grade === "1" && "st"}
                {profileData.grade === "2" && "nd"}
                {profileData.grade === "3" && "rd"}
                {!["1", "2", "3"].includes(profileData.grade || "") && "th"} Grade
              </p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-muted-foreground text-sm">Age Group</Label>
              <p className="text-lg">{getAgeGroupLabel()}</p>
            </div>
            
            {profileData.school && (
              <div className="space-y-1">
                <Label className="text-muted-foreground text-sm">School</Label>
                <p className="text-lg flex items-center gap-2">
                  🏫 {profileData.school}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Final Action Button */}
        <motion.div
          className="flex flex-col items-center justify-center text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium">Ready to start your learning adventure?</h3>
          <p className="text-muted-foreground">Your profile looks awesome! Let&apos;s get started</p>
        </motion.div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          onClick={onBack}
          variant="outline"
          disabled={isSubmitting}
        >
          Back
        </Button>
        
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Profile...
            </>
          ) : (
            "Let's Go 🚀"
          )}
        </Button>
      </div>
    </div>
  );
} 