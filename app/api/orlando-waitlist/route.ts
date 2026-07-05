// app/api/orlando-waitlist/route.ts
//
// POST endpoint for the Orlando waitlist form on nihongo-world.com/orlando/
// - Validates payload
// - Inserts into public.orlando_waitlist (service role; table has RLS with no policies)
// - Sends a confirmation email to the signup via Resend (new signups only)
// - Sends an admin notification email with full signup details (new signups only)
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
// exists (Google Workspace domain alias) - then REPLY_TO can be removed
// and ADMIN_EMAIL switched to info@nihongo-world.com.
const FROM_ADDRESS = "Nihon GO! World <info@nihongo-world.com>";
const REPLY_TO = "info@nihongolondon.com";
const ADMIN_EMAIL = "info@nihongolondon.com";

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

// Human-readable labels for the admin notification
const FORMAT_LABELS: Record<string, string> = {
  online: "Online",
  in_person: "In person (Orlando)",
  either: "Either online or in person",
};
const AREA_LABELS: Record<string, string> = {
  orlando: "Orlando / Central Florida",
  tampa: "Tampa Bay area",
  miami: "Miami / South Florida",
  jacksonville: "Jacksonville / North Florida",
  other_fl: "Elsewhere in Florida",
  outside_fl: "Outside Orlando area / online only",
};
const LEVEL_LABELS: Record<string, string> = {
  beginner: "Complete beginner",
  some: "Knows some basics",
  n5n4: "Around JLPT N5-N4",
  n3plus: "JLPT N3 or above",
  heritage: "Heritage speaker",
};

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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
    // skip the emails (no duplicate confirmations, no info leaked).
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

  // -- emails (best-effort: signup succeeds even if either send fails) --
  if (isNewSignup) {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // 1) confirmation to the signup
    try {
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

    // 2) admin notification with full details
    try {
      const inPersonSignal = format === "in_person" || format === "either";
      const formatLabel = FORMAT_LABELS[format] ?? format;
      const interestLabel =
        interests.length > 0 ? interests.join(", ").toUpperCase() : "none selected";
      const subject = inPersonSignal
        ? `[IN-PERSON] New Orlando waitlist signup - ${formatLabel} (${interestLabel})`
        : `New Orlando waitlist signup - Online (${interestLabel})`;

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMIN_EMAIL,
        replyTo: email, // reply goes straight to the signup
        subject,
        html: buildAdminHtml({ name, email, format, interests, area, level }),
      });
    } catch (e) {
      console.error("orlando_waitlist admin notification failed:", e);
    }
  }

  return json({ ok: true }, 200, origin);
}

// ---- email templates ---------------------------------------------------
function buildConfirmationHtml(name: string): string {
  const safeName = escapeHtml(name);
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

function buildAdminHtml(data: {
  name: string;
  email: string;
  format: string;
  interests: string[];
  area: string;
  level: string;
}): string {
  const rows: Array<[string, string]> = [
    ["Name", escapeHtml(data.name)],
    ["Email", escapeHtml(data.email)],
    ["Format", FORMAT_LABELS[data.format] ?? data.format],
    [
      "Interests",
      data.interests.length > 0
        ? escapeHtml(data.interests.join(", "))
        : "(none selected)",
    ],
    ["Area", AREA_LABELS[data.area] ?? data.area],
    ["Level", LEVEL_LABELS[data.level] ?? data.level],
    ["Signed up", new Date().toISOString()],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#64748b;font-weight:600;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:8px 0;color:#1e293b;">${v}</td></tr>`
    )
    .join("");

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.6;">
  <div style="background:#1e293b;padding:20px 28px;border-radius:12px 12px 0 0;">
    <p style="color:#fb7185;font-weight:700;font-size:16px;margin:0;">Nihon GO! Orlando &mdash; New Waitlist Signup</p>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px 28px;">
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${tableRows}</table>
    <p style="font-size:13px;color:#94a3b8;margin:20px 0 0;border-top:1px solid #e2e8f0;padding-top:14px;">
      Reply to this email to contact the signup directly.<br>
      Full list: Supabase &rarr; orlando_waitlist
    </p>
  </div>
</div>`;
}
