import { NextResponse } from "next/server";
import { traders } from "@/data/traders";

// GET method handler
export async function GET() {
  // Simulate fetching traders
  return NextResponse.json(traders);
}
