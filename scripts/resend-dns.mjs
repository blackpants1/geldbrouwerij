#!/usr/bin/env node
/**
 * Voegt de Resend DNS-records toe aan geldbrouwerij.nl via de Hostinger DNS API.
 * Idempotent: leest bestaande zones en overschrijft alleen die records die Resend vereist.
 *
 * Use:
 *   HOSTINGER_API_TOKEN=xxx RESEND_DOMAIN_ID=xxx RESEND_FULL_KEY=re_xxx \
 *     node scripts/resend-dns.mjs
 */

const HT = process.env.HOSTINGER_API_TOKEN;
const RK = process.env.RESEND_FULL_KEY;
const DID = process.env.RESEND_DOMAIN_ID;
if (!HT || !RK || !DID) {
  console.error(
    "Vereist: HOSTINGER_API_TOKEN, RESEND_FULL_KEY, RESEND_DOMAIN_ID env vars.",
  );
  process.exit(1);
}

const DOMAIN = "geldbrouwerij.nl";

async function main() {
  // 1) Haal Resend DNS-records op
  const rRes = await fetch(`https://api.resend.com/domains/${DID}`, {
    headers: { Authorization: `Bearer ${RK}` },
  });
  if (!rRes.ok) throw new Error(`Resend API fout: ${rRes.status}`);
  const rData = await rRes.json();
  console.log(`Resend records voor ${rData.name} (${rData.status}):`);
  for (const r of rData.records) {
    console.log(
      ` - ${r.type} ${r.name} → ${r.value.slice(0, 60)}${r.value.length > 60 ? "…" : ""} ${r.priority ? `(prio ${r.priority})` : ""}`,
    );
  }

  // 2) Haal huidige Hostinger zone op
  const zRes = await fetch(
    `https://developers.hostinger.com/api/dns/v1/zones/${DOMAIN}`,
    { headers: { Authorization: `Bearer ${HT}` } },
  );
  if (!zRes.ok) throw new Error(`Hostinger zone fout: ${zRes.status}`);
  const zData = await zRes.json();
  console.log(`\nHostinger zone heeft nu ${zData.length} entries.`);

  // 3) Bouw nieuwe zone
  // Hostinger API voor DNS update endpoint: PUT /api/dns/v1/zones/:domain
  // We sturen de nieuwe records én behouden bestaande records die niet conflicteren.
  const newRecords = rData.records.map((r) => {
    const entry = {
      name: r.name,
      type: r.type,
      ttl: 300,
      records: [
        r.priority != null
          ? { content: `${r.priority} ${r.value}.`, is_disabled: false }
          : { content: r.value, is_disabled: false },
      ],
    };
    return entry;
  });

  // Filter bestaande records die we gaan vervangen (zelfde name + type)
  const resendSignatures = new Set(
    newRecords.map((r) => `${r.name}|${r.type}`),
  );
  const preserved = zData.filter(
    (z) => !resendSignatures.has(`${z.name}|${z.type}`),
  );
  const merged = [...preserved, ...newRecords];

  console.log(
    `\nNa merge: ${merged.length} records totaal (${preserved.length} bestaand + ${newRecords.length} Resend).`,
  );

  // 4) Push
  const upRes = await fetch(
    `https://developers.hostinger.com/api/dns/v1/zones/${DOMAIN}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${HT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zone: merged, overwrite: true }),
    },
  );
  const upText = await upRes.text();
  if (!upRes.ok) {
    throw new Error(`Hostinger update fout ${upRes.status}: ${upText}`);
  }
  console.log("\n✓ DNS records bijgewerkt.\nResponse:", upText.slice(0, 300));

  // 5) Trigger Resend verify
  const vRes = await fetch(
    `https://api.resend.com/domains/${DID}/verify`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${RK}` },
    },
  );
  const vData = await vRes.json().catch(() => null);
  console.log("\nResend verify trigger:", vRes.status, vData);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
