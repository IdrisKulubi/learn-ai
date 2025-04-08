"use client";

import { auth } from "@/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  return session?.user;
};

export const useServerSession = async (): Promise<Session | null> => {
  const session = await auth();
  return session;
}; 