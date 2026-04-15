"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { updateProfile, deleteAccount } from "@/app/actions/account";
import { cn } from "@/lib/cn";

export function AccountForm({
  initialNaam,
  initialBio,
}: {
  initialNaam: string;
  initialBio?: string;
}) {
  const [naam, setNaam] = useState(initialNaam);
  const [bio, setBio] = useState(initialBio ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(null);
          setError(null);
          startTransition(async () => {
            const res = await updateProfile({ naam, bio });
            if (res.ok) setMessage("Opgeslagen. Proost.");
            else setError(res.error);
          });
        }}
        className="rounded-2xl bg-schuim border border-hout/10 p-5 sm:p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="acc-naam" className="text-sm font-medium text-hout">
            Voornaam
          </label>
          <input
            id="acc-naam"
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            required
            className="h-12 px-4 rounded-xl bg-creme border border-hout/10 focus:border-koper outline-none"
          />
        </div>
        <div className="mt-4 flex flex-col gap-1.5">
          <label htmlFor="acc-bio" className="text-sm font-medium text-hout">
            Korte bio (optioneel)
          </label>
          <textarea
            id="acc-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Bijv. ZZP-bouw uit Voorthuizen, sinds 2026 Brouwmaatje."
            className="px-4 py-3 rounded-xl bg-creme border border-hout/10 focus:border-koper outline-none"
          />
        </div>

        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            disabled={pending}
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-5 py-2.5 font-medium text-sm hover:bg-koper-dark",
              pending && "opacity-70",
            )}
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Opslaan
          </button>
          {message && (
            <span className="text-sm text-groen-ok">{message}</span>
          )}
          {error && <span className="text-sm text-rood">{error}</span>}
        </div>
      </form>

      <div className="rounded-2xl bg-rood/5 border border-rood/20 p-5 sm:p-6">
        <h2 className="font-display text-xl !text-rood">Account verwijderen</h2>
        <p className="mt-2 text-sm text-hout">
          Dit verwijdert je account, je Brouwketel-historie en je berichten in
          de Tapkamer. Onomkeerbaar. Je nieuwsbrief-lidmaatschap via Resend
          beheer je apart via de uitschrijflink.
        </p>
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-rood/40 text-rood px-5 py-2.5 font-medium text-sm hover:bg-rood hover:text-schuim"
          >
            Ik wil mijn account verwijderen
          </button>
        ) : (
          <form action={deleteAccount} className="mt-4 flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-rood text-schuim px-5 py-2.5 font-medium text-sm hover:bg-rood/90"
            >
              Ja, verwijder definitief
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-sm text-hout-soft hover:text-bg-groen"
            >
              Annuleren
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
