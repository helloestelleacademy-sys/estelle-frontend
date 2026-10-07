import { NextResponse } from "next/server";

// Submits to the Tally form https://tally.so/r/nWL7gv the same way Tally's own page does.
// This is Tally's internal endpoint, not a documented API, so it may change without notice.
const TALLY_RESPOND_URL = "https://tally.so/api/forms/nWL7gv/respond";

// Tally keys each answer by the field's groupUuid.
const FIELDS = {
  email: "ff1fa5c1-192f-4fcf-b23c-c051f37028e2",
  name: "e8ddd7ae-529e-4f32-811b-481d7b2324e5",
  phone: "7a611448-fa24-4072-91ed-7680b2dd5a13",
  country: "f5e8716d-412e-471e-9fb6-56e0bed10b46",
} as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot: real visitors never see this field, so a value means a bot. Pretend success.
  if (body?.website) return NextResponse.json({ ok: true });

  const values = Object.fromEntries(
    (Object.keys(FIELDS) as (keyof typeof FIELDS)[]).map((key) => [key, String(body?.[key] ?? "").trim()])
  ) as Record<keyof typeof FIELDS, string>;

  if (Object.values(values).some((v) => !v) || !/^\S+@\S+\.\S+$/.test(values.email)) {
    return NextResponse.json({ error: "Please fill in every field with a valid email." }, { status: 400 });
  }

  const responses = Object.fromEntries(
    (Object.keys(FIELDS) as (keyof typeof FIELDS)[]).map((key) => [FIELDS[key], values[key]])
  );

  const res = await fetch(TALLY_RESPOND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionUuid: crypto.randomUUID(),
      respondentUuid: crypto.randomUUID(),
      responses,
      captchas: {},
      isCompleted: true,
    }),
  });

  if (!res.ok) {
    console.error("Tally respond failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Could not join the waitlist. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
