import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BrouwprocesTeaser } from "@/components/sections/BrouwprocesTeaser";
import { BrouwketelCta } from "@/components/sections/BrouwketelCta";
import { Diensten } from "@/components/sections/Diensten";
import { SocialProof } from "@/components/sections/SocialProof";
import { Brouwmeester } from "@/components/sections/Brouwmeester";
import { Newsletter } from "@/components/sections/Newsletter";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "De Geldbrouwerij — Brouw aan je financiële vrijheid",
  description:
    "Het Brouwproces™ — een systeem van vijf stappen dat je van financiële chaos naar financiële rust brengt. Start gratis met De Brouwketel.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrouwprocesTeaser />
      <BrouwketelCta />
      <Diensten compact />
      <SocialProof />
      <Brouwmeester />
      <Faq />
      <Newsletter />
    </>
  );
}
