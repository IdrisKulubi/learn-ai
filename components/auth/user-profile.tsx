"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
          <CardDescription className="text-center">Loading your profile information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Not Signed In</CardTitle>
          <CardDescription className="text-center">You need to sign in to view your profile</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const { user } = session;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        <CardDescription className="text-center">Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            ) : null}
            <AvatarFallback className="text-2xl">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/auth/signout">
          <Button variant="outline">Sign Out</Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 