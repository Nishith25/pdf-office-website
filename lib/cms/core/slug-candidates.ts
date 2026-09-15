import {
  normalizeCmsSlug,
} from "./slug";

export function buildCmsSlugCandidate(
  baseSlug: string,
  attempt: number,
): string {
  if (
    !Number.isInteger(
      attempt,
    ) ||
    attempt < 1
  ) {
    throw new Error(
      "Slug attempt must be a positive integer.",
    );
  }

  const normalized =
    normalizeCmsSlug(
      baseSlug,
    );

  if (!normalized) {
    throw new Error(
      "Unable to create a valid slug.",
    );
  }

  if (
    attempt === 1
  ) {
    return normalized;
  }

  return `${normalized}-${attempt}`;
}