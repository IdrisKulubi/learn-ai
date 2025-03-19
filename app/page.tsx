import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "./auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            AI Learning
          </Link>
          <div className="space-x-4">
            {session ? (
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Learn from Your Favorite Characters</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Upload an image of your favorite character and let them teach you any subject.
              Personalized learning has never been more engaging!
            </p>
            {!session && (
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
            )}
            {session && (
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Character</h3>
                <p className="text-gray-600">
                  Upload an image of your favorite character or hero.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Topic</h3>
                <p className="text-gray-600">
                  Select a subject or topic you want to learn about.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                <p className="text-gray-600">
                  Interact with your character and learn in a fun, engaging way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-4">© {new Date().getFullYear()} AI Learning. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
              <Link href="/terms" className="text-gray-300 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
 }