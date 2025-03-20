"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface AgeGroupStepProps {
  initialValue?: "5-7" | "8-10" | "11-13" | "14-16" | "17-19" | "20-24";
  onUpdate: (value: "5-7" | "8-10" | "11-13" | "14-16" | "17-19" | "20-24") => void;
  onNext: () => void;
  onBack: () => void;
}

// Age brackets with fun icons and labels
const AGE_GROUPS = [
  {
    value: "5-7" as const,
    label: "Little Explorers",
    description: "Ages 5-7",
    icon: "🧸",
    animation: "bounce",
  },
  {
    value: "8-10" as const,
    label: "Junior Geniuses",
    description: "Ages 8-10",
    icon: "🔍",
    animation: "pulse",
  },
  {
    value: "11-13" as const,
    label: "Future Leaders",
    description: "Ages 11-13",
    icon: "🎓",
    animation: "rocket",
  },
  {
    value: "14-16" as const,
    label: "Teen Innovators",
    description: "Ages 14-16", 
    icon: "🚀",
    animation: "rocket",
  },
  {
    value: "17-19" as const,
    label: "Rising Stars",
    description: "Ages 17-19",
    icon: "⭐",
    animation: "rocket",
  },
  {
    value: "20-24" as const,
    label: "Knowledge Seekers", 
    description: "Ages 20-24",
    icon: "🎯",
    animation: "rocket",
  },

];

export default function AgeGroupStep({ initialValue, onUpdate, onNext, onBack }: AgeGroupStepProps) {
  const [ageGroup, setAgeGroup] = useState<"5-7" | "8-10" | "11-13" | "14-16" | "17-19" | "20-24" | undefined>(initialValue);
  
  const handleSelect = (value: "5-7" | "8-10" | "11-13" | "14-16" | "17-19" | "20-24") => {
    setAgeGroup(value);
    onUpdate(value);
    
    // Trigger animation based on age group
    if (value === "5-7") {
      // Simple bounce animation
    } else if (value === "8-10") {
      // Pulse animation
    } else if (value === "11-13") {
      // Launch confetti for future leaders
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
        }
  };
  
  const handleContinue = () => {
    if (ageGroup) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Choose Your Age Group</h2>
        <p className="text-muted-foreground">
          Select your age bracket so we can show you the right content!
        </p>
      </div>
      
      <div className="space-y-4 py-2">
        <Label>Your Age Group</Label>
        
        <div className="grid gap-4">
          {AGE_GROUPS.map((group) => (
            <motion.div
              key={group.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                y: ageGroup === group.value && group.animation === "bounce" ? [0, -10, 0] : 0 
              }}
              transition={{ 
                y: { repeat: ageGroup === group.value ? 3 : 0, duration: 0.5 } 
              }}
            >
              <button
                type="button"
                onClick={() => handleSelect(group.value)}
                className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                  ageGroup === group.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className="text-4xl">
                    {group.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-lg">{group.label}</h3>
                    <p className="text-muted-foreground text-sm">{group.description}</p>
                  </div>
                </div>
                
                {ageGroup === group.value && (
                  <div className="w-4 h-4 rounded-full bg-primary" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Back
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!ageGroup}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 