import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// GET - Load all leads
export async function GET() {
  try {
    ensureDataDirectory();

    if (fs.existsSync(LEADS_FILE_PATH)) {
      const leads = fs.readFileSync(LEADS_FILE_PATH, "utf8");
      return NextResponse.json(JSON.parse(leads));
    } else {
      // Return empty array if file doesn't exist
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error loading leads:", error);
    return NextResponse.json(
      { error: "Failed to load leads" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a lead
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    ensureDataDirectory();

    if (fs.existsSync(LEADS_FILE_PATH)) {
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE_PATH, "utf8"));
      const updatedLeads = leads.filter((lead: any) => lead.id !== id);

      fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(updatedLeads, null, 2));

      return NextResponse.json({
        success: true,
        message: "Lead deleted successfully",
      });
    }

    return NextResponse.json(
      { error: "Leads file not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
