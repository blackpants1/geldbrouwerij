import fs from "node:fs/promises";
import path from "node:path";
import { render } from "@react-email/components";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM_TX =
  process.env.RESEND_FROM_TX || "Roy van De Geldbrouwerij <roy@geldbrouwerij.nl>";
const FROM_NL =
  process.env.RESEND_FROM_NEWSLETTER ||
  "Het Brouwboek <brouwboek@geldbrouwerij.nl>";
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || "dev@geldbrouwerij.nl";

type SendOpts = {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  from?: string;
  replyTo?: string | string[];
  tags?: { name: string; value: string }[];
  channel?: "tx" | "newsletter";
};

export async function sendEmail(opts: SendOpts) {
  const html = await render(opts.react);
  const text = await render(opts.react, { plainText: true });

  if (!resend) {
    return devFallback({ html, text, ...opts });
  }

  const from =
    opts.from ?? (opts.channel === "newsletter" ? FROM_NL : FROM_TX);

  try {
    const res = await resend.emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      html,
      text,
      replyTo: opts.replyTo,
      tags: opts.tags,
    });
    return { ok: true, ...res };
  } catch (err) {
    console.error("[resend] send failed", err);
    return { ok: false, error: String(err) };
  }
}

export async function addToNewsletterAudience({
  email,
  firstName,
}: {
  email: string;
  firstName?: string;
}) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!resend || !audienceId) return { ok: true, dev: true };
  try {
    await resend.contacts.create({
      audienceId,
      email,
      firstName,
      unsubscribed: false,
    });
    return { ok: true };
  } catch (err) {
    console.error("[resend] contact create failed", err);
    return { ok: false, error: String(err) };
  }
}

async function devFallback({
  html,
  text,
  to,
  subject,
}: {
  html: string;
  text: string;
  to: string | string[];
  subject: string;
}) {
  try {
    const dir = path.join(process.cwd(), ".data", "email-outbox");
    await fs.mkdir(dir, { recursive: true });
    const slug = slugify(subject);
    const ts = Date.now();
    const base = path.join(dir, `${ts}-${slug}`);
    await fs.writeFile(
      `${base}.html`,
      `<!-- to: ${Array.isArray(to) ? to.join(", ") : to} -->\n<!-- subject: ${subject} -->\n${html}`,
    );
    await fs.writeFile(`${base}.txt`, text);
    return { ok: true, dev: true, file: `${base}.html` };
  } catch (err) {
    console.error("[resend dev-fallback] write failed", err);
    return { ok: false, dev: true, error: String(err) };
  }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export const resendConfig = {
  from: { tx: FROM_TX, newsletter: FROM_NL },
  adminEmail: ADMIN_EMAIL,
  hasApiKey: Boolean(apiKey),
};
