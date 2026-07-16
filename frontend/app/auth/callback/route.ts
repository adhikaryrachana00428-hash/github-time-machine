import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const cookieStore = await cookies();

  // 1. Validate CSRF state
  const storedState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!state || !storedState || state !== storedState) {
    console.error("CSRF state mismatch or missing");
    return NextResponse.redirect(new URL("/login?error=csrf_verification_failed", siteUrl));
  }

  if (code) {
    try {
      const supabase = await createClient();
      
      // 2. Exchange code for Supabase session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      const session = data.session;
      if (!session) throw new Error("No session returned from exchange");

      // 3. Backend Sync: Call POST /repos/connect to register/update the user record
      const githubAccessToken = session.provider_token;
      const supabaseAccessToken = session.access_token;

      if (githubAccessToken && supabaseAccessToken) {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        
        try {
          const connectResponse = await fetch(`${backendUrl}/repos/connect`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${supabaseAccessToken}`,
            },
            body: JSON.stringify({
              github_access_token: githubAccessToken,
            }),
          });

          if (!connectResponse.ok) {
            console.error("Failed to connect user to backend:", await connectResponse.text());
          }
        } catch (backendErr) {
          console.error("Error calling backend connect endpoint:", backendErr);
        }
      }

      // 4. Redirect to the dashboard
      return NextResponse.redirect(new URL("/repo/demo", siteUrl));
    } catch (e: any) {
      console.error("Auth callback error:", e);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(e.message || "auth_failed")}`, siteUrl));
    }
  }

  return NextResponse.redirect(new URL("/login?error=no_code_provided", siteUrl));
}
