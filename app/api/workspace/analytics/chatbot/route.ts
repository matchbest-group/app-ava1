import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ANALYTICS_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "chatbot-analytics.json"
);
const SECRET_KEY = "helloiamfromavachatbot";

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

interface ConversationAnalytics {
  conversationId: string;
  websiteId: string;
  sessionDuration?: number;
  messageCount: number;
  userMessages: number;
  aiMessages: number;
  startTime?: string;
  endTime?: string;
  userIntent: string;
  topicsDiscussed: string[];
  sentimentAnalysis: {
    overall: string;
    score: number;
  };
  issueResolved: boolean;
  resolutionType: string;
  userSatisfaction: string;
  frequentQuestions: string[];
  technicalIssues: string[];
  featureRequests: string[];
  commonKeywords: string[];
  conversationQuality: {
    coherence: number;
    helpfulness: number;
    completeness: number;
  };
  businessMetrics: {
    leadGenerated: boolean;
    demoRequested: boolean;
    supportTicketCreated: boolean;
    planInquiry?: string;
  };
  metadata: {
    userAgent: string;
    deviceType: string;
    location: string;
    referrer: string;
  };
}

interface AnalyticsEntry {
  id: string;
  source: string;
  timestamp: string;
  analytics: ConversationAnalytics;
  version: string;
  processedAt: string;
}

// POST - Receive analytics from chatbot
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authorization = request.headers.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];
    if (token !== SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 401 }
      );
    }

    // Verify source
    const source = request.headers.get("x-source");
    if (source !== "MatchBest-Chatbot") {
      return NextResponse.json({ error: "Invalid source" }, { status: 401 });
    }

    const data = await request.json();
    const { source: dataSource, timestamp, analytics, version } = data;

    if (!analytics || !analytics.conversationId) {
      return NextResponse.json(
        { error: "Invalid analytics data" },
        { status: 400 }
      );
    }

    ensureDataDirectory();

    // Load existing analytics
    let existingAnalytics: AnalyticsEntry[] = [];
    if (fs.existsSync(ANALYTICS_FILE_PATH)) {
      const fileContent = fs.readFileSync(ANALYTICS_FILE_PATH, "utf8");
      existingAnalytics = JSON.parse(fileContent);
    }

    // Check if conversation already exists
    const existingIndex = existingAnalytics.findIndex(
      (entry) => entry.analytics.conversationId === analytics.conversationId
    );

    const newEntry: AnalyticsEntry = {
      id: analytics.conversationId,
      source: dataSource,
      timestamp,
      analytics: {
        ...analytics,
        sessionDuration: analytics.sessionDuration || 0,
        startTime: analytics.startTime || timestamp,
        endTime: analytics.endTime || timestamp,
      },
      version,
      processedAt: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      // Merge with existing conversation
      const existing = existingAnalytics[existingIndex];
      const merged: AnalyticsEntry = {
        ...newEntry,
        analytics: {
          ...existing.analytics,
          ...analytics,
          messageCount: Math.max(
            existing.analytics.messageCount,
            analytics.messageCount
          ),
          userMessages: Math.max(
            existing.analytics.userMessages,
            analytics.userMessages
          ),
          aiMessages: Math.max(
            existing.analytics.aiMessages,
            analytics.aiMessages
          ),
          endTime: analytics.endTime || timestamp,
          topicsDiscussed: [
            ...new Set([
              ...existing.analytics.topicsDiscussed,
              ...analytics.topicsDiscussed,
            ]),
          ],
          frequentQuestions: [
            ...new Set([
              ...existing.analytics.frequentQuestions,
              ...analytics.frequentQuestions,
            ]),
          ],
          commonKeywords: [
            ...new Set([
              ...existing.analytics.commonKeywords,
              ...analytics.commonKeywords,
            ]),
          ],
          technicalIssues: [
            ...new Set([
              ...existing.analytics.technicalIssues,
              ...analytics.technicalIssues,
            ]),
          ],
          featureRequests: [
            ...new Set([
              ...existing.analytics.featureRequests,
              ...analytics.featureRequests,
            ]),
          ],
          conversationQuality: {
            coherence: Math.max(
              existing.analytics.conversationQuality.coherence,
              analytics.conversationQuality.coherence
            ),
            helpfulness: Math.max(
              existing.analytics.conversationQuality.helpfulness,
              analytics.conversationQuality.helpfulness
            ),
            completeness: Math.max(
              existing.analytics.conversationQuality.completeness,
              analytics.conversationQuality.completeness
            ),
          },
        },
      };
      existingAnalytics[existingIndex] = merged;
    } else {
      // Add new conversation
      existingAnalytics.push(newEntry);
    }

    // Keep only last 1000 entries to prevent file from getting too large
    if (existingAnalytics.length > 1000) {
      existingAnalytics = existingAnalytics.slice(-1000);
    }

    // Save to file
    fs.writeFileSync(
      ANALYTICS_FILE_PATH,
      JSON.stringify(existingAnalytics, null, 2)
    );

    console.log(
      `Analytics processed for conversation: ${analytics.conversationId}`
    );

    return NextResponse.json({
      success: true,
      message: "Analytics received and processed successfully",
      conversationId: analytics.conversationId,
      merged: existingIndex !== -1,
    });
  } catch (error) {
    console.error("Error processing analytics:", error);
    return NextResponse.json(
      { error: "Failed to process analytics" },
      { status: 500 }
    );
  }
}
