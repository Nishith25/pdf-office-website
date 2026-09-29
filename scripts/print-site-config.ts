import {
  getSiteConfig,
} from "../lib/site/config";

const site =
  getSiteConfig();

console.log("");
console.log(
  "========================================",
);

console.log(
  "GAMENEXA Site Configuration",
);

console.log(
  "========================================",
);

console.log(
  `Site: ${site.name}`,
);

console.log(
  `Site key: ${site.key}`,
);

console.log(
  `Site URL: ${site.siteUrl}`,
);

console.log(
  `Database: ${site.databaseName}`,
);

console.log(
  `Media folder: ${site.mediaFolder}`,
);

console.log(
  `Theme: ${site.themeKey}`,
);

console.log(
  `Admin session: ${site.adminSessionSubject}`,
);

console.log(
  `Admin logo: ${site.adminLogoUrl}`,
);

console.log("");
console.log(
  "No database connection was opened.",
);
