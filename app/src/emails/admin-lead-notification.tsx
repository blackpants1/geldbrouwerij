import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, emailStyles as s } from "./layout";

export default function AdminLeadNotification({
  email,
  naam,
  source,
  extra,
}: {
  email: string;
  naam?: string;
  source: string;
  extra?: Record<string, unknown>;
}) {
  return (
    <EmailLayout preview={`Nieuwe lead: ${email}`}>
      <Text style={s.h1}>Nieuwe lead — {source}</Text>
      <Text style={s.p}>
        <strong>Naam:</strong> {naam ?? "—"}
        <br />
        <strong>E-mail:</strong> {email}
        <br />
        <strong>Source:</strong> {source}
      </Text>
      {extra && (
        <>
          <Text style={s.h2}>Payload</Text>
          <pre
            style={{
              background: "#F5F0E8",
              padding: 12,
              borderRadius: 8,
              fontSize: 12,
              lineHeight: "18px",
              color: "#3D2B1F",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(extra, null, 2)}
          </pre>
        </>
      )}
      <Text style={{ ...s.small, marginTop: 16 }}>
        (Automatisch verstuurd door De Geldbrouwerij · leadhook)
      </Text>
    </EmailLayout>
  );
}
