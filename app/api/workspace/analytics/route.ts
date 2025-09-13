import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ANALYTICS_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "chatbot-analytics.json"
);

// GET - Retrieve analytics data
export async function GET() {
  try {
    if (!fs.existsSync(ANALYTICS_FILE_PATH)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(ANALYTICS_FILE_PATH, "utf8");
    const analytics = JSON.parse(fileContent);

    // Sort by timestamp (most recent first)
    analytics.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error loading analytics:", error);
    return NextResponse.json(
      { error: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
