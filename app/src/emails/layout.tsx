import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html lang="nl">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={wordmark}>
              De <span style={{ fontWeight: 600 }}>Geldbrouwerij</span>
            </Text>
          </Section>
          <Section style={content}>{children}</Section>
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              De Geldbrouwerij · Roy Brouwer · Nederland
            </Text>
            <Text style={footerText}>
              Dit is geen financieel advies. Voor je situatie: raadpleeg een
              gekwalificeerd adviseur.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  background: "#f5f0e8",
  margin: 0,
  padding: "24px 0",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif",
  color: "#3D2B1F",
};
const container: React.CSSProperties = {
  maxWidth: 600,
  margin: "0 auto",
  background: "#FEFCF7",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(27,58,45,0.06), 0 18px 40px -16px rgba(27,58,45,0.18)",
};
const header: React.CSSProperties = {
  background: "#1B3A2D",
  padding: "18px 24px",
};
const wordmark: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: 24,
  lineHeight: "28px",
  color: "#FEFCF7",
  margin: 0,
  letterSpacing: "-0.01em",
};
const content: React.CSSProperties = {
  padding: "28px 28px 12px",
};
const hr: React.CSSProperties = {
  borderTop: "1px solid rgba(61,43,31,0.12)",
  margin: "8px 28px",
};
const footer: React.CSSProperties = { padding: "12px 28px 24px" };
const footerText: React.CSSProperties = {
  fontSize: 12,
  lineHeight: "18px",
  color: "#5A4738",
  margin: "0 0 4px",
};

export const emailStyles = {
  h1: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 28,
    lineHeight: "34px",
    color: "#1B3A2D",
    margin: "0 0 12px",
  } as React.CSSProperties,
  h2: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 20,
    lineHeight: "26px",
    color: "#1B3A2D",
    margin: "20px 0 8px",
  } as React.CSSProperties,
  p: {
    fontSize: 16,
    lineHeight: "24px",
    color: "#3D2B1F",
    margin: "0 0 12px",
  } as React.CSSProperties,
  button: {
    display: "inline-block",
    background: "#C78C4E",
    color: "#FEFCF7",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 16,
    margin: "8px 0 4px",
  } as React.CSSProperties,
  score: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 48,
    lineHeight: "56px",
    color: "#1B3A2D",
    fontWeight: 600,
    margin: "0 0 4px",
  } as React.CSSProperties,
  small: {
    fontSize: 13,
    lineHeight: "20px",
    color: "#5A4738",
    margin: "0 0 8px",
  } as React.CSSProperties,
};
