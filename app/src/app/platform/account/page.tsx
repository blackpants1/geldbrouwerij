import type { Metadata } from "next";
import { readSession } from "@/lib/auth/session";
import { users, brouwketelRecords } from "@/lib/db/store";
import { Eyebrow } from "@/components/ui/Card";
import { AccountForm } from "@/components/platform/AccountForm";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default async function AccountPage() {
  const session = await readSession();
  const user = session ? await users.byId(session.uid) : null;
  if (!user) return null;

  const records = await brouwketelRecords.listForUser(user._id);

  return (
    <div>
      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">
        Jouw Brouwmaatje-profiel.
      </h1>
      <p className="mt-2 text-hout-soft max-w-xl">
        Dit is wat wij weten. Pas aan wat je wilt — wij slaan niks dubieus op.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <Meta label="E-mail" value={user.email} />
        <Meta
          label="Lid sinds"
          value={new Date(user.createdAt).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        />
        <Meta label="Brouwsels" value={`${records.length}`} />
      </div>

      <div className="mt-8">
        <AccountForm initialNaam={user.naam} initialBio={user.bio} />
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-creme border border-hout/5 p-4">
      <p className="text-xs uppercase tracking-wider text-koper-dark font-medium">
        {label}
      </p>
      <p className="mt-1 text-hout font-medium truncate">{value}</p>
    </div>
  );
}
