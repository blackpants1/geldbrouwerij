import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { nlNL } from "@clerk/localizations";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const siteName = "De Geldbrouwerij";
const siteDescription =
  "Brouw aan je financiële vrijheid. Het Brouwproces™ — een systeem van vijf stappen dat je van financiële chaos naar financiële rust brengt.";

export const metadata: Metadata = {
  metadataBase: new URL("https://geldbrouwerij.nl"),
  title: {
    default: `${siteName} — Brouw aan je financiële vrijheid`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "financiële coaching",
    "potjessysteem",
    "Brouwproces",
    "Brouwketel",
    "budgetteren",
    "sparen",
    "beleggen voor beginners",
    "pensioen ZZP",
    "financiële rust",
  ],
  authors: [{ name: "Roy Brouwer" }],
  creator: "Roy Brouwer",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://geldbrouwerij.nl",
    siteName,
    title: `${siteName} — Brouw aan je financiële vrijheid`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Brouw aan je financiële vrijheid`,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3A2D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const clerkAppearance = {
  variables: {
    colorPrimary: "#C78C4E",
    colorBackground: "#FEFCF7",
    colorText: "#3D2B1F",
    colorInputBackground: "#F5F0E8",
    colorInputText: "#3D2B1F",
    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
    borderRadius: "0.875rem",
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: "#C78C4E",
      borderRadius: "9999px",
      fontWeight: 500,
      textTransform: "none" as const,
      ":hover": { backgroundColor: "#a87139" },
    },
    card: {
      boxShadow: "0 1px 2px rgba(27,58,45,0.04), 0 8px 24px -12px rgba(27,58,45,0.12)",
      borderRadius: "1.25rem",
    },
    headerTitle: {
      fontFamily: "var(--font-fraunces), Georgia, serif",
      color: "#1B3A2D",
    },
    headerSubtitle: {
      color: "#5A4738",
    },
    footer: { background: "transparent" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={nlNL} appearance={clerkAppearance}>
      <ConvexClientProvider>
        <html
          lang="nl"
          className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
        >
          <body
            className="min-h-full flex flex-col bg-schuim text-hout"
            suppressHydrationWarning
          >
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-bg-groen focus:px-3 focus:py-2 focus:text-schuim"
            >
              Naar hoofdinhoud
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
