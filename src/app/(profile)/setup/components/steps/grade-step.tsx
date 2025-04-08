"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface GradeStepProps {
  initialValue?: string;
  onUpdate: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

// Grade options with fun icons and messages
const GRADE_OPTIONS = [
  {
    value: "1",
    label: "1st Grade",
    icon: "✏️",
    message: "First grade? Let's start your learning adventure",
  },
  {
    value: "2",
    label: "2nd Grade",
    icon: "📚",
    message: "Second grade is awesome! Ready to discover new things?",
  },
  {
    value: "3",
    label: "3rd Grade",
    icon: "🔍",
    message: "Third grade? Amazing! Let's blast off to learning",
  },
  {
    value: "4",
    label: "4th Grade",
    icon: "🔭",
    message: "Fourth grade explorer! You're going to discover so much",
  },
  {
    value: "5",
    label: "5th Grade",
    icon: "🔬",
    message: "Fifth grade scientist! Let's experiment with knowledge",
  },
  {
    value: "6",
    label: "6th Grade",
    icon: "🧪",
    message: "Sixth grade is when the real fun begins!",
  },
  {
    value: "7",
    label: "7th Grade",
    icon: "🧩",
    message: "Seventh grade puzzle solver! You're putting it all together",
  },
  {
    value: "8",
    label: "8th Grade",
    icon: "🚀",
    message: "Eighth grade? You're ready to launch into advanced learning",
  },
  {
    value: "9",
    label: "9th Grade", 
    icon: "🎯",
    message: "Ninth grade sharpshooter! Your precision and focus will take you far",
  },
  {
    value: "10",
    label: "10th Grade",
    icon: "⚡️",
    message: "Tenth grade powerhouse! You're charging ahead with unstoppable energy",
  },
  {
    value: "11",
    label: "11th Grade", 
    icon: "🌟",
    message: "Eleventh grade star! You're shining bright and reaching new heights",
  },
  {
    value: "12",
    label: "12th Grade",
    icon: "👑",
    message: "Twelfth grade champion! You're ready to conquer any challenge",
  },
  {
    value: "13",
    label: "College",
    icon: "🎓",
    message: "College bound! Get ready for an exciting new chapter of learning",
  },
  
];

export default function GradeStep({ initialValue, onUpdate, onNext, onBack }: GradeStepProps) {
  const [grade, setGrade] = useState(initialValue || "");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  
  // Show celebratory message when grade changes
  useEffect(() => {
    if (grade) {
      const selectedGrade = GRADE_OPTIONS.find(option => option.value === grade);
      if (selectedGrade) {
        setMessage(selectedGrade.message);
        setShowMessage(true);
        
        // Hide the message after 4 seconds
        const timer = setTimeout(() => {
          setShowMessage(false);
        }, 4000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [grade]);
  
  const handleSelect = (value: string) => {
    setGrade(value);
    onUpdate(value);
  };
  
  const handleContinue = () => {
    if (grade) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Select Your Grade</h2>
        <p className="text-muted-foreground">
          Tell us what grade you&apos;re in so we can find the perfect learning materials
        </p>
      </div>
      
      <div className="space-y-4 py-2">
        <Label htmlFor="grade-selection">Your Grade Level</Label>
        
        <RadioGroup 
          value={grade} 
          onValueChange={handleSelect}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {GRADE_OPTIONS.map((option) => (
            <div key={option.value} className="relative">
              <RadioGroupItem
                value={option.value}
                id={`grade-${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`grade-${option.value}`}
                className="flex items-center justify-between px-4 py-3 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/10 hover:border-muted-foreground"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{option.icon}</div>
                  <span className="font-medium">{option.label}</span>
                </div>
                {grade === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 rounded-full bg-primary"
                  />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* Celebratory message */}
        {showMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-secondary text-center"
          >
            {message}
          </motion.div>
        )}
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
          disabled={!grade}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 