import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory in the project root
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Sanitize file name to avoid path issues
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}_${sanitizedName}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const downloadURL = `/uploads/${filename}`;
    return NextResponse.json({ downloadURL });
  } catch (error: any) {
    console.error("Local API Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to save file locally" }, { status: 500 });
  }
}
