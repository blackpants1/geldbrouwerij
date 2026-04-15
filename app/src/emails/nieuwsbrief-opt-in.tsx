import * as React from "react";
import { Link, Text, Section } from "@react-email/components";
import { EmailLayout, emailStyles as s } from "./layout";

export default function NieuwsbriefOptIn({
  naam = "Brouwmaatje",
}: {
  naam?: string;
}) {
  return (
    <EmailLayout preview="Proost — welkom bij Het Brouwboek.">
      <Text style={s.h1}>Proost{naam && `, ${naam}`}.</Text>
      <Text style={s.p}>
        Je bent ingeschonken. Het Brouwboek valt elke vrijdag in je inbox — één
        mail, nuchter, bruikbaar, zonder geneuzel.
      </Text>
      <Text style={s.p}>
        Tip voor nu: heb je de Brouwketel al gevuld? In 5 minuten weet je je
        Brouw-score, je geldlekken en drie concrete acties. Gratis, geen account
        nodig.
      </Text>
      <Section>
        <Link href="https://geldbrouwerij.nl/brouwketel" style={s.button}>
          Gooi je cijfers in de Brouwketel
        </Link>
      </Section>
      <Text style={{ ...s.p, marginTop: 20 }}>Tot vrijdag.</Text>
      <Text style={s.p}>— Roy</Text>
    </EmailLayout>
  );
}
