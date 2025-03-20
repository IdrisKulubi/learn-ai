"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { School } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SchoolStepProps {
  initialValue?: string;
  onUpdate: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

// Sample school list (would come from a database in a real app)
const SAMPLE_SCHOOLS = [
  "Sunshine Elementary",
  "Oakwood Middle School",
  "Westside Academy",
  "Pine Ridge Elementary",
  "Meadowbrook School",
  "Lincoln Elementary",
  "Washington Middle School",
  "Valley View Elementary",
  "Riverdale School",
  "Mountain View Elementary",
];

export default function SchoolStep({ initialValue, onUpdate, onNext, onBack }: SchoolStepProps) {
  const [school, setSchool] = useState(initialValue || "");
  const [open, setOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Show school bell animation when a school is selected
  useEffect(() => {
    if (school && !initialValue) {
      setShowAnimation(true);
      
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [school, initialValue]);
  
  const handleSelect = (value: string) => {
    setSchool(value);
    onUpdate(value);
    setOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(e.target.value);
    onUpdate(e.target.value);
  };
  
  const handleContinue = () => {
    onNext();
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">What School Do You Attend?</h2>
        <p className="text-muted-foreground">
          Let us know where you go to school! You can select from our list or enter your own.
        </p>
      </div>
      
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="school">Your School</Label>
          
          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-left"
                >
                  {school ? school : "Select a school..."}
                  {showAnimation && (
                    <motion.div
                      initial={{ rotate: -30 }}
                      animate={{ rotate: [30, -30, 20, -20, 10, -10, 0] }}
                      transition={{ duration: 1 }}
                      className="ml-2"
                    >
                      🔔
                    </motion.div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search for your school..." />
                  <CommandEmpty className="py-2 px-4 text-sm">
                    <div className="space-y-1">
                      <p>School not in the list?</p>
                      <div className="pt-2">
                        <Input
                          ref={inputRef}
                          placeholder="Enter your school name..."
                          value={school}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Suggested Schools">
                    <CommandList>
                      {SAMPLE_SCHOOLS.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={handleSelect}
                          className="flex items-center gap-2"
                        >
                          <School className="h-4 w-4" />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            This helps us connect you with other students from your school!
          </p>
        </div>
        
        {/* Input option if they prefer to type directly */}
        <div className="space-y-2">
          <Label htmlFor="custom-school">Or type your school name:</Label>
          <Input
            id="custom-school"
            placeholder="Enter your awesome school name!"
            value={school}
            onChange={handleInputChange}
          />
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
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 