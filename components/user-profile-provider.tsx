"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "member" | "affiliate";
  tier: "standard" | "pro";
  subscriptionStatus: "active" | "canceled" | "past_due" | null;
  affiliateCode?: string;
  referredBy?: string;
  createdAt?: any;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
}

const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  loading: true,
  error: null,
});

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Listen to real-time updates of the user profile document in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setProfile({
            uid: user.uid,
            ...docSnap.data(),
          } as UserProfile);
        } else {
          // If the document does not exist yet (e.g. immediately after signup before triggers run),
          // fallback to a default structure so the UI does not crash
          setProfile({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            role: "member",
            tier: "standard",
            subscriptionStatus: null,
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching user profile from Firestore:", err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, authLoading]);

  return (
    <UserProfileContext.Provider value={{ profile, loading: authLoading || loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
