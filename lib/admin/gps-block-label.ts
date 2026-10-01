import type {
  CmsBlockType,
} from "../cms/core/types";

export type GpsBlockLabelInput = {
  type: CmsBlockType;
  data: Record<string, unknown>;
};

function readString(
  input: unknown,
): string {
  return typeof input === "string"
    ? input.trim()
    : "";
}

function combinedText(
  data: Record<string, unknown>,
): string {
  return [
    readString(data.eyebrow),
    readString(data.title),
    readString(data.description),
  ]
    .join(" ")
    .toLowerCase();
}

export function getGpsHomepageBlockLabel({
  type,
  data,
}: GpsBlockLabelInput): {
  label: string;
  description: string;
} {
  const text =
    combinedText(data);

  if (type === "hero") {
    return {
      label:
        "Hero",
      description:
        "Main GPS Maps headline, introduction and primary download action.",
    };
  }

  if (type === "richText") {
    return {
      label:
        "Journal Heading",
      description:
        "Controls the heading and supporting text above recent blog articles.",
    };
  }

  if (type === "buttonGroup") {
    return {
      label:
        "Journal Link",
      description:
        "Controls the View all articles link shown in the Journal section.",
    };
  }

  if (
    text.includes("core") ||
    text.includes("feature") ||
    text.includes("navigate smarter")
  ) {
    return {
      label:
        "Core Features",
      description:
        "Main GPS Maps capabilities shown near the top of the homepage.",
    };
  }

  if (
    text.includes("route preview") ||
    text.includes("route")
  ) {
    return {
      label:
        "Route Preview",
      description:
        "Route planning preview and navigation information.",
    };
  }

  if (
    text.includes("turn-by-turn") ||
    text.includes("voice navigation") ||
    text.includes("navigation")
  ) {
    return {
      label:
        "Navigation",
      description:
        "Voice guidance, route planning and turn-by-turn navigation content.",
    };
  }

  if (
    text.includes("offline")
  ) {
    return {
      label:
        "Offline Maps",
      description:
        "Offline map access and travel without a constant internet connection.",
    };
  }

  if (
    text.includes("weather") ||
    text.includes("radar") ||
    text.includes("aqi") ||
    text.includes("air quality")
  ) {
    return {
      label:
        "Weather, Radar & AQI",
      description:
        "Weather, radar and air-quality information available inside GPS Maps.",
    };
  }

  if (
    text.includes("live location") ||
    text.includes("location safety") ||
    text.includes("location & safety") ||
    text.includes("safety")
  ) {
    return {
      label:
        "Location & Safety",
      description:
        "Live location, location sharing and travel-safety features.",
    };
  }

  if (
    text.includes("nearby") ||
    text.includes("places")
  ) {
    return {
      label:
        "Nearby Places",
      description:
        "Nearby place discovery and useful destinations around the user.",
    };
  }

  if (
    text.includes("travel planner") ||
    text.includes("trip planner") ||
    text.includes("planner")
  ) {
    return {
      label:
        "Travel Planner",
      description:
        "Trip and travel-planning tools available in GPS Maps.",
    };
  }

  if (
    text.includes("parking") ||
    text.includes("compass") ||
    text.includes("translator") ||
    text.includes("ride") ||
    text.includes("map style") ||
    type === "cardGrid"
  ) {
    return {
      label:
        "GPS Tools",
      description:
        "Utility tools including parking, compass, translator, map styles and more.",
    };
  }

  if (type === "faq") {
    return {
      label:
        "FAQ",
      description:
        "Frequently asked questions about GPS Maps.",
    };
  }

  if (
    type === "cta" ||
    type === "download"
  ) {
    return {
      label:
        "Download CTA",
      description:
        "Final download and conversion section for the GPS Maps app.",
    };
  }

  if (type === "featureGrid") {
    return {
      label:
        "Feature Section",
      description:
        "Structured GPS Maps feature content.",
    };
  }

  if (type === "imageText") {
    return {
      label:
        "Feature Story",
      description:
        "A focused GPS Maps feature section with supporting content.",
    };
  }

  return {
    label:
      "Content Section",
    description:
      "Homepage content managed through the GPS Maps CMS.",
  };
}
