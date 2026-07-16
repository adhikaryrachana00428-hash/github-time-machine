import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET() {
  const cookieStore = await cookies();
  
  // 1. Generate a random CSRF state
  const state = crypto.randomBytes(16).toString("hex");
  
  // 2. Save state in HTTP-only secure cookie
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectTo = `${siteUrl}/auth/callback`;

  // 3. Initiate sign-in with OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
      scopes: "read:user repo",
      queryParams: {
        state: state,
      },
    },
  });

  if (error || !data.url) {
    console.error("OAuth initiation failed:", error);
    return NextResponse.redirect(new URL("/login?error=github_not_configured", siteUrl));
  }

  return NextResponse.redirect(data.url);
}
