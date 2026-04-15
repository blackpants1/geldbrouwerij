"use server";

import { saveLead } from "@/lib/leads";
import { addToNewsletterAudience, sendEmail, resendConfig } from "@/lib/resend";
import NieuwsbriefOptIn from "@/emails/nieuwsbrief-opt-in";
import AdminLeadNotification from "@/emails/admin-lead-notification";
import WelcomeBrouwketel from "@/emails/welcome-brouwketel";
import type { BrouwketelInput, BrouwketelResult } from "@/lib/brouwketel/types";
import { berekenBrouwketel } from "@/lib/brouwketel/score";
import { readSession } from "@/lib/auth/session";
import { users, brouwketelRecords } from "@/lib/db/store";
import React from "react";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function subscribeNewsletter({
  email,
  naam,
  source,
}: {
  email: string;
  naam?: string;
  source: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isEmail(email)) {
    return { ok: false, error: "Dat mailadres klopt niet helemaal." };
  }

  await saveLead({
    email,
    naam,
    source: "newsletter",
    payload: { origin: source },
  });
  await addToNewsletterAudience({ email, firstName: naam });
  await sendEmail({
    to: email,
    subject: "Proost — welkom bij Het Brouwboek",
    react: React.createElement(NieuwsbriefOptIn, { naam }),
    channel: "newsletter",
    tags: [{ name: "type", value: "newsletter_optin" }],
  });
  await sendEmail({
    to: resendConfig.adminEmail,
    subject: `Nieuwe Brouwboek-lezer: ${email}`,
    react: React.createElement(AdminLeadNotification, {
      email,
      naam,
      source: "newsletter",
      extra: { origin: source },
    }),
    tags: [{ name: "type", value: "admin" }],
  });
  return { ok: true };
}

export async function submitBrouwketel({
  email,
  naam,
  input,
}: {
  email: string;
  naam: string;
  input: BrouwketelInput;
}): Promise<
  | { ok: true; result: BrouwketelResult }
  | { ok: false; error: string }
> {
  if (!isEmail(email)) {
    return { ok: false, error: "Dat mailadres klopt niet helemaal." };
  }
  if (!naam || naam.trim().length < 2) {
    return { ok: false, error: "Vul een naam in, dan weet ik hoe ik je moet aanspreken." };
  }

  const result = berekenBrouwketel(input);

  await saveLead({
    email,
    naam,
    source: "brouwketel",
    payload: { input, score: result.score, assen: result.assen },
  });

  // Koppel aan account als ingelogd
  const session = await readSession();
  const user = session ? await users.byId(session.uid) : null;

  await brouwketelRecords.create({
    userId: user?._id,
    email,
    naam,
    score: result.score,
    kleur: result.kleur,
    assen: {
      spaarquote: result.assen.spaarquote,
      vasteLastenRatio: result.assen.vasteLastenRatio,
      bufferMaanden: result.assen.bufferMaanden,
      schuldenRatio: result.assen.schuldenRatio,
      automatisering: result.assen.automatisering,
    },
    input: input as unknown as Record<string, unknown>,
    acties: result.acties,
    projectie30: result.projectie.jaren30,
  });

  await sendEmail({
    to: email,
    subject: `Je Brouw-score: ${result.score}/100`,
    react: React.createElement(WelcomeBrouwketel, {
      naam,
      score: result.score,
      kleur: result.kleur,
      acties: result.acties,
      projectie30: result.projectie.jaren30,
    }),
    tags: [{ name: "type", value: "brouwketel_result" }],
  });

  await sendEmail({
    to: resendConfig.adminEmail,
    subject: `Nieuwe Brouwketel-invulling: ${email} — score ${result.score}`,
    react: React.createElement(AdminLeadNotification, {
      email,
      naam,
      source: "brouwketel",
      extra: { score: result.score, input },
    }),
    tags: [{ name: "type", value: "admin" }],
  });

  return { ok: true, result };
}
