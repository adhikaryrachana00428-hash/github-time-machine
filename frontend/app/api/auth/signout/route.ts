import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST() {
  const supabase = await createClient();

  // Sign out from Supabase Auth (automatically clears session cookies)
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign-out error:", error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL("/login", siteUrl), {
    status: 303, // Redirect after POST
  });
}
