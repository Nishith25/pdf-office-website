import type {
  CmsPageEditorInput,
} from "./cms-page-editor";

function readText(
  formData: FormData,
  name: string,
): string {
  const value =
    formData.get(name);

  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readBoolean(
  formData: FormData,
  name: string,
): boolean {
  const value =
    readText(
      formData,
      name,
    ).toLowerCase();

  return (
    value === "true" ||
    value === "1" ||
    value === "on"
  );
}

export function readCmsPageEditorInputFromFormData(
  formData: FormData,
): CmsPageEditorInput {
  const status =
    readText(
      formData,
      "status",
    ) === "published"
      ? "published"
      : "draft";

  return {
    title:
      readText(
        formData,
        "title",
      ),

    slug:
      readText(
        formData,
        "slug",
      ),

    status,

    isHomepage:
      readBoolean(
        formData,
        "isHomepage",
      ),

    seoTitle:
      readText(
        formData,
        "seoTitle",
      ),

    seoDescription:
      readText(
        formData,
        "seoDescription",
      ),

    seoKeywords:
      readText(
        formData,
        "seoKeywords",
      ),

    canonicalUrl:
      readText(
        formData,
        "canonicalUrl",
      ),

    ogTitle:
      readText(
        formData,
        "ogTitle",
      ),

    ogDescription:
      readText(
        formData,
        "ogDescription",
      ),

    ogImage:
      readText(
        formData,
        "ogImage",
      ),

    noIndex:
      readBoolean(
        formData,
        "noIndex",
      ),
  };
}