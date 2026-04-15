import * as React from "react";
import { Link, Section, Text } from "@react-email/components";
import { EmailLayout, emailStyles as s } from "./layout";

export default function WelcomeBrouwketel({
  naam = "Brouwmaatje",
  score = 58,
  kleur = "amber",
  acties = [
    "Zet vandaag een automatische €50/mnd overboeking in naar een losse Brouwen-rekening.",
    "Scan je abonnementen en energie in één uur.",
    "Bouw eerst je noodfonds op: 3× je vaste lasten op een aparte rekening.",
  ],
  projectie30 = 150000,
}: {
  naam?: string;
  score?: number;
  kleur?: "rood" | "amber" | "groen";
  acties?: string[];
  projectie30?: number;
}) {
  const scoreKleur =
    kleur === "rood" ? "#C0392B" : kleur === "amber" ? "#C78C4E" : "#27AE60";

  return (
    <EmailLayout preview={`Je Brouw-score: ${score}/100`}>
      <Text style={s.h1}>Proost, {naam}.</Text>
      <Text style={s.p}>
        Je hebt je eerste stap gezet. De Brouwketel heeft je cijfers geproefd.
        Hier is je Brouw-score:
      </Text>
      <Section style={{ margin: "16px 0 20px" }}>
        <Text style={{ ...s.score, color: scoreKleur }}>{score}/100</Text>
        <Text style={s.small}>
          Kleur: <strong>{kleur}</strong>. Laag is niet erg — het is je startpunt.
        </Text>
      </Section>

      <Text style={s.h2}>Drie dingen die ik je meegeef:</Text>
      {acties.map((a, i) => (
        <Text key={i} style={s.p}>
          <strong>{i + 1}.</strong> {a}
        </Text>
      ))}

      <Text style={s.h2}>En als je dit 30 jaar laat rijpen?</Text>
      <Text style={s.p}>
        Op je huidige tempo staat er over 30 jaar ongeveer{" "}
        <strong>€{format(projectie30)}</strong> in je Vat. Niet door harder te
        werken. Door de tijd het werk te laten doen.
      </Text>

      <Section>
        <Link href="https://geldbrouwerij.nl/brouwketel" style={s.button}>
          Bekijk je volledige resultaat
        </Link>
      </Section>

      <Text style={s.h2}>Wat nu?</Text>
      <Text style={s.p}>
        De Brouwketel is stap 1. Wil je begeleiding bij stap 2 tot en met 4?
        Reserveer een kruk aan de Brouwavond (€29) — online, 2 uur, tussen 8 en
        15 andere Brouwmaatjes. Dan zet je in één avond je systeem op.
      </Text>
      <Section>
        <Link href="https://geldbrouwerij.nl/brouwavond" style={s.button}>
          Reserveer je kruk
        </Link>
      </Section>

      <Text style={{ ...s.p, marginTop: 20 }}>Proost.</Text>
      <Text style={s.p}>— Roy</Text>
    </EmailLayout>
  );
}

function format(n: number) {
  return new Intl.NumberFormat("nl-NL").format(Math.round(n));
}
