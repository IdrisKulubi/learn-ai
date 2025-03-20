import { Metadata } from "next";
import ProfileSetupWizard from "./components/profile-setup-wizard";

export const metadata: Metadata = {
  title: "Create Your Profile | Learn AI",
  description: "Set up your AI learning profile with a cool username, grade, and more",
};

export default function ProfileSetupPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Create Your Profile
        </h1>
        <p className="text-muted-foreground text-lg">
          Let&apos;s personalize your learning journey
        </p>
      </div>
      
      <ProfileSetupWizard />
    </div>
  );
} 