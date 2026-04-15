#!/usr/bin/env node
/**
 * Hostinger mailbox + DNS bootstrap voor De Geldbrouwerij.
 *
 * Maakt aan:
 *   - roy@geldbrouwerij.nl         (transactional + reply-to)
 *   - brouwboek@geldbrouwerij.nl   (nieuwsbrief "From")
 *   - noreply@geldbrouwerij.nl     (optioneel, system)
 *
 * Gebruik:
 *   HOSTINGER_API_TOKEN=xxx node scripts/hostinger-setup.mjs
 *
 * Token komt standaard uit env, fallback op de lokale hostinger-claude-code-config.
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function getToken() {
  if (process.env.HOSTINGER_API_TOKEN) return process.env.HOSTINGER_API_TOKEN;
  throw new Error("Set HOSTINGER_API_TOKEN env var.");
}

const BASE = "https://developers.hostinger.com/api/email/v1";
const DOMAIN = "geldbrouwerij.nl";

const strongPassword = () => {
  const alphabet =
    "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";
  const bytes = crypto.randomBytes(20);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
};

async function api(pathname, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) {
    throw new Error(
      `Hostinger API ${method} ${pathname} failed: ${res.status} ${text}`,
    );
  }
  return data;
}
function safeJson(t) {
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}

const MAILBOXES = [
  {
    local: "roy",
    label: "Roy van De Geldbrouwerij (transactional)",
  },
  {
    local: "brouwboek",
    label: "Het Brouwboek (nieuwsbrief)",
  },
  {
    local: "noreply",
    label: "System notifications",
  },
];

async function main() {
  const token = await getToken();
  const created = [];

  for (const m of MAILBOXES) {
    const email = `${m.local}@${DOMAIN}`;
    const password = strongPassword();
    try {
      await api(`/mailboxes`, {
        method: "POST",
        token,
        body: { email, password, quota: 1024 },
      });
      created.push({ email, password, label: m.label, status: "created" });
      console.log(`✓ created ${email}`);
    } catch (err) {
      if (String(err).includes("409") || String(err).includes("exists")) {
        created.push({ email, password: null, label: m.label, status: "exists" });
        console.log(`· exists  ${email}`);
      } else {
        console.error(`✗ failed  ${email}: ${err.message}`);
        throw err;
      }
    }
  }

  const outPath = path.join(root, ".data", "mailboxes.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(created, null, 2));
  console.log(`\nCredentials written to ${outPath}. Do NOT commit.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
