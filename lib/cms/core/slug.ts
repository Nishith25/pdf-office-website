const RESERVED_CMS_SLUGS =
  new Set([
    "admin",
    "api",
    "_next",
    "favicon.ico",
    "icon.png",
    "robots.txt",
    "sitemap.xml",
  ]);

export function normalizeCmsSlug(
  input:
    string,
): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export function isReservedCmsSlug(
  slug:
    string,
): boolean {
  return RESERVED_CMS_SLUGS.has(
    normalizeCmsSlug(
      slug,
    ),
  );
}