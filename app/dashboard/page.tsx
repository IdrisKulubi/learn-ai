import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { UserProfile } from "@/components/auth/user-profile";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <UserProfile />
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Welcome to Your Learning Dashboard</h2>
            <p className="text-gray-600 mb-4">
              This is your personalized dashboard where you can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Select topics to learn</li>
              <li>Create and customize your character avatars</li>
              <li>Track your learning progress</li>
              <li>Review past conversations</li>
              <li>Take quizzes to test your knowledge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 