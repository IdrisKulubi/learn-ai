import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import GoogleSignUpForm from "./google-signup-form";
import { Session } from "next-auth";

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
    ref?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const session = (await auth()) as Session | null;
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
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* Particles effect */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10"></div>
      
      {/* Neural network lines - animated */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,25 50,50 T100,50" stroke="url(#grad1)" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" 
              values="M0,50 Q25,25 50,50 T100,50;
                     M0,50 Q25,75 50,50 T100,50;
                     M0,50 Q25,25 50,50 T100,50" />
          </path>
          <path d="M0,30 Q25,55 50,30 T100,30" stroke="url(#grad2)" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
              values="M0,30 Q25,55 50,30 T100,30;
                     M0,30 Q25,5 50,30 T100,30;
                     M0,30 Q25,55 50,30 T100,30" />
          </path>
          <path d="M0,70 Q25,45 50,70 T100,70" stroke="url(#grad3)" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" 
              values="M0,70 Q25,45 50,70 T100,70;
                     M0,70 Q25,95 50,70 T100,70;
                     M0,70 Q25,45 50,70 T100,70" />
          </path>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl shadow-2xl border border-gray-800 rounded-xl overflow-hidden z-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"></div>
        <CardHeader className="space-y-8 pb-8 pt-10">
          <div className="flex justify-center transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn">
            <Link href="/" className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full overflow-hidden border-2 border-white/20">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
              Join the AI Community
            </h1>
            <p className="text-gray-400 text-sm">
              Create your account and start your journey into AI
            </p>
          </div>

          {referralCode && (
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-4 rounded-lg text-center border border-blue-500/30 transition-opacity duration-500 ease-in-out opacity-0 animate-slideUp delay-300">
              <p className="text-sm font-medium text-gray-300">
                <span className="text-cyan-400">✨</span> You were referred by a friend <span className="text-cyan-400">✨</span>
              </p>
              <p className="text-xs text-gray-400 italic">
                Use your Strathmore email to claim your referral bonus
              </p>
              <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto transform animate-pulse"></div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8 pb-10">
          <div className="transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-400">
            <GoogleSignUpForm />
          </div>

          <div className="space-y-6 transition-transform duration-500 ease-in-out transform translate-y-5 opacity-0 animate-slideUp delay-500">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              <p className="text-sm font-medium text-gray-300">
                Unlock advanced AI learning tools
              </p>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse animation-delay-1000"></div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Sign in
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
