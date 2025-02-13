import { NextRequest, NextResponse } from "next/server";
import { traders } from "@/data/traders";

// GET method handler
export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const segments = url.split("/");
  const adress = segments[segments.length - 1];

  const findRightProfile = traders.find((trader) => trader.address === adress);
  // Simulate fetching users
  return NextResponse.json(findRightProfile);
}
