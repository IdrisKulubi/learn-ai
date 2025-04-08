"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import UsernameStep from "./steps/username-step";
import GradeStep from "./steps/grade-step";
import AgeGroupStep from "./steps/age-group-step";
import SchoolStep from "./steps/school-step";
import ProfilePreviewStep from "./steps/profile-preview-step";
import { StudentProfileFormData } from "@/lib/validator";
import { createStudentProfile } from "@/lib/actions/profile.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 5;

export default function ProfileSetupWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentProfileFormData>>({});
  const router = useRouter();

  const progress = (step / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const updateFormData = (data: Partial<StudentProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Submit the profile data
      await createStudentProfile(formData as StudentProfileFormData);
      
      toast.success("Your awesome profile has been created! Let's start learning!");
      
      // Redirect to the dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <UsernameStep 
                  initialValue={formData.username} 
                  onUpdate={(username) => updateFormData({ username })} 
                  onNext={handleNext}
                />
              )}
              {step === 2 && (
                <GradeStep 
                  initialValue={formData.grade} 
                  onUpdate={(grade) => updateFormData({ grade })} 
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {step === 3 && (
                <AgeGroupStep 
                  initialValue={formData.ageGroup} 
                  onUpdate={(ageGroup) => updateFormData({ ageGroup })} 
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {step === 4 && (
                <SchoolStep 
                  initialValue={formData.school} 
                  onUpdate={(school) => updateFormData({ school })} 
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {step === 5 && (
                <ProfilePreviewStep 
                  profileData={formData as StudentProfileFormData} 
                  onUpdate={(data) => updateFormData(data)}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
} 