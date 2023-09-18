import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  draftMode().enable();
  // redirect("/");
  return NextResponse.redirect("/");
}
