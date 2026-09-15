export type CmsPublicBlockData =
  Record<
    string,
    unknown
  >;

export function blockText(
  data:
    CmsPublicBlockData,

  key:
    string,
): string {
  const value =
    data[key];

  return typeof value ===
    "string"
    ? value
    : "";
}

export function blockLines(
  data:
    CmsPublicBlockData,

  key:
    string,
): string[] {
  const value =
    data[key];

  if (
    !Array.isArray(
      value,
    )
  ) {
    return [];
  }

  return value
    .map(
      (
        item,
      ) =>
        String(
          item,
        ).trim(),
    )
    .filter(Boolean);
}