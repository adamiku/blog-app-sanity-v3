import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  draftMode().disable();
  // redirect("/");
  return NextResponse.redirect("/");
}
