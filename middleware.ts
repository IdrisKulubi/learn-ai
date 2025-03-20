import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/sign-in',
    '/sign-up',
    '/api/auth',
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname.startsWith(path)
  );

  // If the user is not logged in and the path is not public, redirect to sign in
  if (!session?.user && !isPublicPath) {
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is logged in and accessing authentication pages, redirect to home
  if (session?.user && (
    request.nextUrl.pathname.startsWith('/sign-in') || 
    request.nextUrl.pathname.startsWith('/sign-up')
  )) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Profile setup path
  const profileSetupPath = '/setup';
  const isProfileSetupPath = request.nextUrl.pathname === profileSetupPath;

  // Check if the user is logged in and has a completed profile
  // This would be a database check in a real application
  // For now, we'll simulate it with a session check
  if (session?.user && !isPublicPath && !isProfileSetupPath) {
    // This is where you would check if the user has a profile
    // For example, by querying your database
    
    // For demonstration, we'll use an API endpoint to check for profile
    try {
      const profileResponse = await fetch(
        `${request.nextUrl.origin}/api/profile/check`,
        {
          headers: {
            'Cookie': request.headers.get('cookie') || '',
          },
        }
      );
      
      const profileData = await profileResponse.json();
      
      // If the user doesn't have a profile, redirect to profile setup
      if (!profileData.hasProfile) {
        const profileSetupUrl = new URL(profileSetupPath, request.url);
        return NextResponse.redirect(profileSetupUrl);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      // If there's an error, we'll just continue to the requested page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api/auth, etc)
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}; 