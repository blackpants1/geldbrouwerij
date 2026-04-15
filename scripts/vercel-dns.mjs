#!/usr/bin/env node
/**
 * Vervangt A @ en CNAME www in Hostinger DNS naar Vercel (76.76.21.21 +
 * cname.vercel-dns.com) en behoudt alle andere records (Resend DKIM/SPF/MX,
 * Hostinger mail records).
 */

const HT = process.env.HOSTINGER_API_TOKEN;
if (!HT) {
  console.error("Vereist: HOSTINGER_API_TOKEN");
  process.exit(1);
}
const DOMAIN = "geldbrouwerij.nl";

async function main() {
  const r = await fetch(
    `https://developers.hostinger.com/api/dns/v1/zones/${DOMAIN}`,
    { headers: { Authorization: `Bearer ${HT}` } },
  );
  const zone = await r.json();
  console.log(`Huidige zone: ${zone.length} records`);

  // Filter uit: apex A, www CNAME (vervangen)
  const kept = zone.filter((rec) => {
    if (rec.name === "@" && rec.type === "A") return false;
    if (rec.name === "www" && rec.type === "CNAME") return false;
    return true;
  });

  // Voeg Vercel records toe
  const vercelRecords = [
    {
      name: "@",
      type: "A",
      ttl: 300,
      records: [{ content: "76.76.21.21", is_disabled: false }],
    },
    {
      name: "www",
      type: "CNAME",
      ttl: 300,
      records: [{ content: "cname.vercel-dns.com.", is_disabled: false }],
    },
  ];

  const merged = [...kept, ...vercelRecords];
  console.log(
    `Nieuwe zone: ${merged.length} records (${kept.length} behouden + 2 Vercel)`,
  );

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
  const text = await upRes.text();
  if (!upRes.ok) throw new Error(`DNS update fout ${upRes.status}: ${text}`);
  console.log("\n✓ DNS records bijgewerkt.\n", text);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
