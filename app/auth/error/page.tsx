"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred during authentication";

  // Map error codes to user-friendly messages
  switch (error) {
    case "OAuthSignin":
      errorMessage = "Error starting the OAuth sign-in process";
      break;
    case "OAuthCallback":
      errorMessage = "Error during the OAuth callback";
      break;
    case "OAuthCreateAccount":
      errorMessage = "Error creating a user account with OAuth";
      break;
    case "EmailCreateAccount":
      errorMessage = "Error creating a user account with email";
      break;
    case "Callback":
      errorMessage = "Error during the callback process";
      break;
    case "OAuthAccountNotLinked":
      errorMessage = "This email is already associated with another account";
      break;
    case "EmailSignin":
      errorMessage = "Error sending the email for sign-in";
      break;
    case "CredentialsSignin":
      errorMessage = "Invalid email or password";
      break;
    case "SessionRequired":
      errorMessage = "You must be signed in to access this page";
      break;
    default:
      errorMessage = "An unknown error occurred during authentication";
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pt-4">
          <Link href="/auth/signin">
            <Button>
              Return to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
} 