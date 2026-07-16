import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/ai/provider";
import type { AiToolId } from "@/lib/ai/tools";
import { getToolById } from "@/lib/ai/tools";
import {
  verifyIdToken,
  getUserSubscription,
  hasActiveSubscription,
} from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.slice(7);

    let uid: string;
    try {
      const decoded = await verifyIdToken(idToken);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const { role, subscriptionStatus } = await getUserSubscription(uid);
    if (!hasActiveSubscription(role, subscriptionStatus)) {
      return NextResponse.json(
        { error: "Active subscription required to use AI tools" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { toolId, inputs } = body as {
      toolId: AiToolId;
      inputs: Record<string, string>;
    };

    if (!toolId || !getToolById(toolId)) {
      return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
    }

    const result = await generateAiContent({ toolId, inputs });

    return NextResponse.json({
      content: result.content,
      provider: result.provider,
    });
  } catch (err) {
    console.error("AI generate error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
