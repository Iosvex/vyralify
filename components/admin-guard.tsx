"use client";

import React, { useEffect } from "react";
import { useUserProfile } from "./user-profile-provider";
import { useRouter } from "next/navigation";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    // In development mode, check if we have a bypass query parameter
    const params = new URLSearchParams(window.location.search);
    if (process.env.NODE_ENV === "development" && params.get("bypass") === "admin") {
      localStorage.setItem("admin_bypass", "true");
    }

    const isBypassed = process.env.NODE_ENV === "development" && localStorage.getItem("admin_bypass") === "true";
    if (isBypassed) return;

    if (!loading && (!profile || profile.role !== "admin")) {
      router.push("/");
    }
  }, [profile, loading, router]);

  const isBypassed = typeof window !== "undefined" && process.env.NODE_ENV === "development" && localStorage.getItem("admin_bypass") === "true";

  if (loading && !isBypassed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  if (!isBypassed && (!profile || profile.role !== "admin")) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};
