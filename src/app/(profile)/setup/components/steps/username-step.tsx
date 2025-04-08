"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { studentProfileSchema } from "@/lib/validator";
import { checkUsernameAvailability } from "@/lib/actions/profile.actions";
import { motion } from "framer-motion";

// Fun username suggestions
const USERNAME_SUGGESTIONS = [
  "🚀SpaceExplorer",
  "MathWizard42",
  "CaptainHistory",
  "🌟BrainNinja🌟",
  "CodeMaster3000",
  "PixelPioneer",
  "🐒JungleGenius",
  "RobotBuilder",
  "GalacticGamer",
  "SuperScientist"
];

interface UsernameStepProps {
  initialValue?: string;
  onUpdate: (value: string) => void;
  onNext: () => void;
}

export default function UsernameStep({ initialValue, onUpdate, onNext }: UsernameStepProps) {
  const [username, setUsername] = useState(initialValue || "");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isRocketLaunched, setIsRocketLaunched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Generate a random username
  const generateRandomUsername = () => {
    const randomUsername = USERNAME_SUGGESTIONS[Math.floor(Math.random() * USERNAME_SUGGESTIONS.length)];
    setUsername(randomUsername);
    setIsAvailable(null);
    setError("");
  };
  
  // Apply a suggestion
  const applySuggestion = (suggestion: string) => {
    setUsername(suggestion);
    setIsAvailable(null);
    setError("");
  };
  
  // Validate and check username availability
  const checkAvailability = async () => {
    try {
      // Validate the username format first
      const result = studentProfileSchema.pick({ username: true }).safeParse({ username });
      
      if (!result.success) {
        setError(result.error.errors[0].message);
        setIsAvailable(null);
        return;
      }
      
      setIsChecking(true);
      setError("");
      
      // Check if username is available in database
      const available = await checkUsernameAvailability(username);
      
      setIsAvailable(available);
      
      if (available) {
        // Launch the rocket animation
        setIsRocketLaunched(true);
        
        // Reset the animation after 2 seconds
        setTimeout(() => {
          setIsRocketLaunched(false);
        }, 2000);
      } else {
        setError("This awesome username is already taken. Try another one!");
      }
    } catch (err) {
      console.error("Error checking username:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleContinue = () => {
    // Final validation before proceeding
    try {
      studentProfileSchema.pick({ username: true }).parse({ username });
      onUpdate(username);
      onNext();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Create Your Username</h2>
        <p className="text-muted-foreground">
          Choose a fun, unique username for your learning adventures!
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Your Username</Label>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              id="username"
              placeholder="Enter a cool username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsAvailable(null);
                setError("");
              }}
              className="flex-1"
            />
            <Button 
              onClick={checkAvailability} 
              disabled={!username || isChecking}
              variant="outline"
              className="relative"
            >
              {isChecking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isRocketLaunched ? (
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -80 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute"
                >
                  🚀
                </motion.div>
              ) : (
                "Check"
              )}
            </Button>
          </div>
          
          {/* Status messages */}
          {isAvailable === true && (
            <p className="text-green-500 text-sm flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Great choice! This username is available
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}
        </div>
        
        {/* Username suggestions */}
        <div className="space-y-2">
          <Label>Try one of these cool suggestions:</Label>
          <div className="flex flex-wrap gap-2">
            {USERNAME_SUGGESTIONS.slice(0, 5).map((suggestion) => (
              <Badge 
                key={suggestion}
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => applySuggestion(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={generateRandomUsername}
            variant="outline"
            type="button"
          >
            Generate Random Username
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!username || !!error}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 