import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ModeToggle } from "@/components/themes/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Learn AI</h1>
      <p className="text-xl text-center mb-10">
        Your interactive AI learning platform for students
      </p>

      <div className="space-y-4">
        <Link href="/setup">
          <Button 
            className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            size="lg"
          >
            Create Your Profile <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <ModeToggle/>
      </div>
    </main>
  );
}
