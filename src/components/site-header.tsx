import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { UserMenu } from "@/components/user-menu";

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              AI<span className="text-primary">Learn</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/lessons/explore"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Lessons
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
} 