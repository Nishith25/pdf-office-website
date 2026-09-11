import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import ConvertOrganize from "@/components/sections/ConvertOrganize";
import DownloadCTA from "@/components/sections/DownloadCTA";
import ESignShowcase from "@/components/sections/ESignShowcase";
import FAQ from "@/components/sections/FAQ";
import PDFTools from "@/components/sections/PDFTools";
import ProductHighlights from "@/components/sections/ProductHighlights";
import ScannerOCR from "@/components/sections/ScannerOCR";

import {
  getSiteContent,
} from "@/lib/content";

export const dynamic =
  "force-dynamic";

export default async function Home() {
  const content =
    await getSiteContent();

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar
        brand={
          content.brand
        }
        navigation={
          content.navigation
        }
        playStoreUrl={
          content.hero
            .playStoreUrl
        }
      />

      <Hero
        eyebrow={
          content.hero
            .eyebrow
        }
        titleTop={
          content.hero
            .titleTop
        }
        titleBottom={
          content.hero
            .titleBottom
        }
        description={
          content.hero
            .description
        }
        primaryCta={
          content.hero
            .primaryCta
        }
        secondaryCta={
          content.hero
            .secondaryCta
        }
        playStoreUrl={
          content.hero
            .playStoreUrl
        }
        stats={
          content.stats
        }
      />

      <ProductHighlights
        eyebrow={
          content.onboarding
            .eyebrow
        }
        title={
          content.onboarding
            .title
        }
        description={
          content.onboarding
            .description
        }
        items={
          content.onboarding
            .items
        }
      />

      <PDFTools
        eyebrow={
          content.tools
            .eyebrow
        }
        title={
          content.tools
            .title
        }
        description={
          content.tools
            .description
        }
        items={
          content.tools
            .items
        }
      />

      <ScannerOCR />

      <ConvertOrganize />

      <ESignShowcase />

      <DownloadCTA
        appName={
          content.brand.name
        }
        playStoreUrl={
          content.hero
            .playStoreUrl
        }
      />

      <FAQ
        eyebrow={
          content.faq
            .eyebrow
        }
        title={
          content.faq
            .title
        }
        description={
          content.faq
            .description
        }
        items={
          content.faq
            .items
        }
      />

      <Footer
        brandName={
          content.brand.name
        }
        shortName={
          content.brand
            .shortName
        }
        playStoreUrl={
          content.hero
            .playStoreUrl
        }
      />
    </main>
  );
}