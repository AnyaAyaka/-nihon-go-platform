// app/api/orlando-waitlist/route.ts
//
// POST endpoint for the Orlando waitlist form on nihongo-world.com/orlando/
// - Validates payload
// - Inserts into public.orlando_waitlist (service role; table has RLS with no policies)
// - Sends a confirmation email via Resend (only for new signups)
// - CORS: the form lives on nihongo-world.com, the API on app.nihongo-world.com
//
// Required env vars (should already exist in this app):
//   NEXT_PUBLIC_SUPABASE_URL  (or SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// ---- config -----------------------------------------------------------
const ALLOWED_ORIGINS = [
  "https://nihongo-world.com",
  "https://www.nihongo-world.com",
];

// nihongo-world.com is verified in Resend, so this sender works now.
// Replies go to the live mailbox until the info@nihongo-world.com alias
// exists (Google Workspace domain alias) - then REPLY_TO can be removed.
const FROM_ADDRESS = "Nihon GO! World <info@nihongo-world.com>";
const REPLY_TO = "info@nihongolondon.com";

const VALID_FORMATS = ["online", "in_person", "either"] as const;
const VALID_AREAS = [
  "orlando",
  "tampa",
  "miami",
  "jacksonville",
  "other_fl",
  "outside_fl",
] as const;
const VALID_LEVELS = ["beginner", "some", "n5n4", "n3plus", "heritage"] as const;
const VALID_INTERESTS = ["jlpt", "anime", "business", "kids", "travel"];

// ---- helpers ----------------------------------------------------------
function corsHeaders(origin: string | null) {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null
) {
  return NextResponse.json(body, { status, headers: corsHeaders(origin) });
}

// ---- OPTIONS (CORS preflight) ----------------------------------------
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

// ---- POST -------------------------------------------------------------
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin);
  }

  // -- validate ---------------------------------------------------------
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email =
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";
  const format = payload.format;
  const area = VALID_AREAS.includes(payload.area) ? payload.area : "orlando";
  const level = VALID_LEVELS.includes(payload.level)
    ? payload.level
    : "beginner";
  const interests = Array.isArray(payload.interests)
    ? payload.interests.filter((i: string) => VALID_INTERESTS.includes(i))
    : [];

  if (!name || name.length > 200) {
    return json({ error: "Please provide your name." }, 400, origin);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 320) {
    return json({ error: "Please provide a valid email address." }, 400, origin);
  }
  if (!VALID_FORMATS.includes(format)) {
    return json(
      { error: "Please choose how you would like to learn." },
      400,
      origin
    );
  }

  // -- insert -----------------------------------------------------------
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { error: insertError } = await supabase
    .from("orlando_waitlist")
    .insert({
      name,
      email,
      format,
      interests,
      area,
      level,
      source: "orlando_lp",
    });

  let isNewSignup = true;
  if (insertError) {
    // 23505 = unique violation -> already on the list. Treat as success,
    // skip the email (no duplicate confirmations, no info leaked).
    if (insertError.code === "23505") {
      isNewSignup = false;
    } else {
      console.error("orlando_waitlist insert failed:", insertError);
      return json(
        { error: "Something went wrong. Please try again." },
        500,
        origin
      );
    }
  }

  // -- confirmation email (best-effort: signup succeeds even if it fails)
  if (isNewSignup) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        replyTo: REPLY_TO,
        subject: "You're on the Nihon GO! Orlando waitlist",
        html: buildConfirmationHtml(name),
      });
    } catch (e) {
      console.error("orlando_waitlist confirmation email failed:", e);
    }
  }

  return json({ ok: true }, 200, origin);
}

// ---- email template ---------------------------------------------------
function buildConfirmationHtml(name: string): string {
  const safeName = name.replace(/[<>&"]/g, "");
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.6;">
  <div style="background:#1e293b;padding:28px 32px;border-radius:12px 12px 0 0;">
    <p style="color:#fb7185;font-weight:700;font-size:18px;margin:0;">Nihon GO! World</p>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
    <h1 style="font-size:22px;color:#1e293b;margin:0 0 16px;">You're on the list, ${safeName}!</h1>
    <p style="margin:0 0 16px;">Thanks for joining the <strong>Nihon GO! Orlando waitlist</strong>. You'll be the first to hear about:</p>
    <ul style="margin:0 0 20px;padding-left:20px;color:#374151;">
      <li style="margin-bottom:8px;">Our free monthly <strong>online info session</strong> &mdash; meet our certified teachers live and ask anything</li>
      <li style="margin-bottom:8px;">Online lesson availability with <strong>EST-friendly scheduling</strong></li>
      <li style="margin-bottom:8px;">First access when our <strong>in-person Orlando classes</strong> open</li>
    </ul>
    <p style="margin:0 0 24px;">In the meantime, you can try a free JLPT mock test or book an online trial lesson (&pound;23 / about $29) with a government-certified native teacher:</p>
    <p style="margin:0 0 12px;">
      <a href="https://nihongo-world.com/materials/jlpt/" style="display:inline-block;background:#1e293b;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:8px;margin-right:8px;">Free JLPT Mock Test</a>
      <a href="https://app.nihongo-world.com/booking" style="display:inline-block;background:#fb7185;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:8px;">Book a Trial Lesson</a>
    </p>
    <p style="font-size:13px;color:#94a3b8;margin:28px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">
      Nihon GO! World &mdash; London &middot; Manchester &middot; Orlando (coming soon)<br>
      Operated by A-Digital Works Ltd, 150 New Cavendish Street, London W1W 6YJ<br>
      You received this because you joined the Orlando waitlist at nihongo-world.com. Reply to this email to unsubscribe.
    </p>
  </div>
</div>`;
}
