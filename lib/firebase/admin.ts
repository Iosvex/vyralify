import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

let adminApp: App | undefined;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    adminApp = initializeApp({
      credential: cert(serviceAccount),
      projectId,
    });
  } else {
    adminApp = initializeApp({ projectId });
  }

  return adminApp;
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export async function verifyIdToken(idToken: string) {
  return getAdminAuth().verifyIdToken(idToken);
}

export async function getUserSubscription(uid: string): Promise<{
  role: string;
  subscriptionStatus: string | null;
  tier: string;
}> {
  const doc = await getAdminDb().collection("users").doc(uid).get();
  if (!doc.exists) {
    return { role: "member", subscriptionStatus: null, tier: "standard" };
  }
  const data = doc.data()!;
  return {
    role: data.role || "member",
    subscriptionStatus: data.subscriptionStatus || null,
    tier: data.tier || "standard",
  };
}

export function hasActiveSubscription(
  role: string,
  subscriptionStatus: string | null
): boolean {
  return role === "admin" || subscriptionStatus === "active";
}
