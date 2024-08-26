import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { semester_id: string } }
) {
  return NextResponse.json({ id: params.semester_id });
}
