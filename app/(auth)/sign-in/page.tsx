import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GoogleSignInForm from "./google-signin-form";
import { APP_NAME } from "../../../lib/constants";

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
    ref?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl;
  const referralCode = params?.ref;

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10"></div>

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl shadow-2xl border border-gray-800 rounded-xl overflow-hidden z-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <CardHeader className="space-y-8 pb-8 pt-10">
          <div className="flex justify-center transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn">
            <Link href="/" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src="/assets/icons/logo.svg"
                  width={64}
                  height={64}
                  alt={APP_NAME}
                  className="relative transform transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <div className="space-y-2 text-center transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn delay-200">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to explore the future of AI learning
            </p>
          </div>

          {referralCode && (
            <div className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-lg text-center border border-purple-500/30 transition-all duration-500 ease-in-out transform translate-y-0 opacity-0 animate-slideUp delay-200">
                <p className="text-sm font-medium text-gray-300 mb-1">
                  <span className="text-blue-400">✨</span> You were referred by a friend <span className="text-blue-400">✨</span>
                </p>
                <p className="text-xs text-gray-400 italic">
                  Use your Strathmore email to claim your referral bonus
                </p>
                <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto transform animate-pulse"></div>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8 pb-10">
          <div className="transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-300">
            <GoogleSignInForm />
          </div>

          <div className="space-y-6 transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-400">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-sm font-medium text-gray-300">
                Join the AI revolution today
              </p>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse animation-delay-1000"></div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="font-medium text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Terms & Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
