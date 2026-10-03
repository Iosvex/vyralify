import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  uid: 'usr_demo_founder',
  email: 'ahmad@vyralify.in',
  displayName: 'Ahmad Khan',
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  tier: 'free', // 'free' | 'pro' | 'elite'
  country: 'IN',
  currency: 'INR',
  role: 'member',
  onboarded: true,
  onboardingTrack: 'existing', // 'existing' | 'beginner'
  primaryObjective: 'monetization', // 'growth' | 'monetization' | 'automation'
  aiDataConsentAccepted: true,
  createdAt: new Date().toISOString()
};

const TIER_CREDIT_LIMITS = {
  free: 20,
  pro: 300,
  elite: 999999
};

export function AuthProvider({ children }) {
  // Check local storage for persistent testing
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vyralify_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });

  const [tier, setTier] = useState(() => {
    const saved = localStorage.getItem('vyralify_tier');
    return saved || 'free';
  });

  const [aiCredits, setAiCredits] = useState(() => {
    const saved = localStorage.getItem('vyralify_credits');
    if (saved) return JSON.parse(saved);
    return {
      usedToday: 4,
      limit: TIER_CREDIT_LIMITS['free'],
      resetAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString()
    };
  });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Sync tier changes with credit limit
  useEffect(() => {
    localStorage.setItem('vyralify_tier', tier);
    setAiCredits(prev => ({
      ...prev,
      limit: TIER_CREDIT_LIMITS[tier] || 20
    }));
  }, [tier]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vyralify_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vyralify_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vyralify_credits', JSON.stringify(aiCredits));
  }, [aiCredits]);

  // Helper to translate Firebase Auth errors to creator-friendly messages
  const formatAuthError = (error) => {
    if (!error) return 'An unexpected error occurred. Please try again.';
    const code = error.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please verify your credentials or sign up.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address. Please log in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing.';
      case 'auth/popup-blocked':
        return 'Sign-in popup was blocked by browser. Please allow popups.';
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Access temporarily locked for security. Please try again later.';
      default:
        return error.message || 'Authentication failed.';
    }
  };

  // Firebase auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: data.displayName || firebaseUser.displayName || 'Creator',
              photoURL: firebaseUser.photoURL || DEFAULT_DEMO_USER.photoURL,
              tier: data.tier || 'free',
              country: data.country || 'IN',
              currency: data.currency || 'INR',
              onboarded: data.onboarded ?? false,
              onboardingTrack: data.onboardingTrack || null,
              primaryObjective: data.primaryObjective || null,
              aiDataConsentAccepted: data.aiDataConsentAccepted ?? true
            });
            setTier(data.tier || 'free');
          } else {
            // New user without Firestore doc yet
            const initialDoc = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'Creator',
              photoURL: firebaseUser.photoURL || DEFAULT_DEMO_USER.photoURL,
              tier: 'free',
              country: 'IN',
              currency: 'INR',
              role: 'member',
              onboarded: false,
              aiDataConsentAccepted: true,
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, initialDoc, { merge: true });
            setUser(initialDoc);
            setTier('free');
          }
        } catch (e) {
          console.warn("Firestore fetch error, retaining local session state:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (isLockedOut) {
      throw new Error("Too many failed attempts. Account temporarily locked for 30 seconds for security.");
    }
    setAuthLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = cred.user;
      
      // Fetch user profile from Firestore
      let userProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || email.split('@')[0],
        photoURL: firebaseUser.photoURL || DEFAULT_DEMO_USER.photoURL,
        tier: 'free',
        country: 'IN',
        currency: 'INR',
        onboarded: true,
        onboardingTrack: 'existing',
        aiDataConsentAccepted: true
      };

      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const data = snap.data();
          userProfile = {
            ...userProfile,
            displayName: data.displayName || userProfile.displayName,
            tier: data.tier || 'free',
            country: data.country || 'IN',
            currency: data.currency || 'INR',
            onboarded: data.onboarded ?? true,
            onboardingTrack: data.onboardingTrack || 'existing',
            primaryObjective: data.primaryObjective || null,
            aiDataConsentAccepted: data.aiDataConsentAccepted ?? true
          };
        }
      } catch (err) {
        console.warn('Could not fetch user profile from Firestore:', err);
      }

      setUser(userProfile);
      setTier(userProfile.tier || 'free');
      setFailedAttempts(0);
      return true;
    } catch (err) {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setIsLockedOut(true);
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
        }, 30000);
      }
      throw new Error(formatAuthError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (email, password, displayName, explicitConsent = true) => {
    setAuthLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = cred.user;
      
      if (displayName) {
        await updateProfile(createdUser, { displayName }).catch(() => {});
      }

      const initialProfile = {
        email,
        displayName: displayName || email.split('@')[0],
        tier: 'free',
        country: 'IN',
        currency: 'INR',
        role: 'member',
        onboarded: false, // Explicitly false so Onboarding Wizard triggers!
        onboardingTrack: null,
        primaryObjective: null,
        aiDataConsentAccepted: explicitConsent,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', createdUser.uid), initialProfile, { merge: true });
      } catch (dbErr) {
        console.warn('Could not write initial user doc to Firestore:', dbErr.message);
      }

      setUser({
        uid: createdUser.uid,
        ...initialProfile,
        photoURL: DEFAULT_DEMO_USER.photoURL
      });
      setTier('free');
      return true;
    } catch (err) {
      throw new Error(formatAuthError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const u = res.user;

      let profileData = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || 'Google Creator',
        photoURL: u.photoURL || DEFAULT_DEMO_USER.photoURL,
        tier: 'free',
        country: 'IN',
        currency: 'INR',
        role: 'member',
        onboarded: false,
        onboardingTrack: null,
        aiDataConsentAccepted: true
      };

      try {
        const userDocRef = doc(db, 'users', u.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const data = snap.data();
          profileData = {
            ...profileData,
            ...data,
            onboarded: data.onboarded ?? false
          };
        } else {
          await setDoc(userDocRef, {
            ...profileData,
            createdAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (err) {
        console.warn('Google auth profile sync warning:', err.message);
      }

      setUser(profileData);
      setTier(profileData.tier || 'free');
      return true;
    } catch (e) {
      throw new Error(formatAuthError(e));
    } finally {
      setAuthLoading(false);
    }
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    setTier(DEFAULT_DEMO_USER.tier);
    return true;
  };

  const loginWithApple = async () => {
    // Apple OAuth simulation for App Store compliance preparedness
    setUser({
      ...DEFAULT_DEMO_USER,
      displayName: 'Apple Creator',
      email: 'creator.apple@privaterelay.appleid.com'
    });
    return true;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore
    }
    setUser(null);
    localStorage.removeItem('vyralify_user');
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.info("Password reset simulated for:", email);
    }
    return true;
  };

  const updateTier = async (newTier) => {
    setTier(newTier);
    setUser(prev => prev ? ({ ...prev, tier: newTier }) : null);
    if (user?.uid) {
      try {
        await setDoc(doc(db, 'users', user.uid), { tier: newTier, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (e) {
        console.warn('Could not sync tier to Firestore:', e.message);
      }
    }
  };

  const completeOnboarding = async (data) => {
    const updated = {
      ...user,
      onboarded: true,
      onboardingTrack: data.track,
      primaryObjective: data.objective,
      connectedHandle: data.handle || null,
      selectedNiche: data.niche || null
    };
    setUser(updated);
    localStorage.setItem('vyralify_user', JSON.stringify(updated));

    if (user?.uid) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          onboarded: true,
          onboardingTrack: data.track || 'existing',
          primaryObjective: data.objective || 'growth',
          connectedHandle: data.handle || null,
          selectedNiche: data.niche || null,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Could not sync onboarding to Firestore:', e.message);
      }
    }
  };

  const resetOnboarding = async () => {
    const updated = {
      ...(user || DEFAULT_DEMO_USER),
      onboarded: false,
      onboardingTrack: null,
      primaryObjective: null
    };
    setUser(updated);
    localStorage.setItem('vyralify_user', JSON.stringify(updated));

    if (user?.uid) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          onboarded: false,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Could not reset onboarding in Firestore:', e.message);
      }
    }
  };

  const consumeCredit = (amount = 1) => {
    if (tier === 'elite') return true; // Unlimited
    if (aiCredits.usedToday + amount > aiCredits.limit) {
      return false; // Quota exceeded
    }
    setAiCredits(prev => ({
      ...prev,
      usedToday: prev.usedToday + amount
    }));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      tier,
      aiCredits,
      authLoading,
      isLockedOut,
      login,
      signup,
      loginWithGoogle,
      loginWithApple,
      logout,
      resetPassword,
      updateTier,
      consumeCredit,
      completeOnboarding,
      resetOnboarding,
      loginAsDemo
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
