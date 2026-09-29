export const siteProfiles = {
  "pdf-office": {
    key:
      "pdf-office",

    name:
      "PDF Office – Doc Scanner",

    shortName:
      "PDF Office",

    tagline:
      "Scanner • OCR • PDF Tools • eSign",

    siteUrl:
      "https://pdf-office-website.vercel.app",

    defaultDatabaseName:
      "pdf_office_website",

    defaultMediaFolder:
      "pdf-office",

    adminLogoUrl:
      "/app-icon.png",

    themeKey:
      "pdf-office-product-editorial",
  },

  "gps-maps": {
    key:
      "gps-maps",

    name:
      "GPS Maps",

    shortName:
      "GPS Maps",

    tagline:
      "Earth Maps • Navigation • Location Tools",

    siteUrl:
      "https://gps-earth-maps-web.vercel.app",

    defaultDatabaseName:
      "gps_maps_website",

    defaultMediaFolder:
      "gps-maps",

    adminLogoUrl:
      "/gps-maps-icon.svg",

    themeKey:
      "gps-maps-navigation",
  },
} as const;

export const defaultSiteProfileKey =
  "pdf-office" as const;

const siteProfile =
  siteProfiles[
    defaultSiteProfileKey
  ];

export default siteProfile;
