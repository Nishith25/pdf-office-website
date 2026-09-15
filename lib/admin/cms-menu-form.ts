import type {
  CmsMenuItemTarget,
  CmsMenuItemType,
} from "../cms/core/types";

export type CmsMenuItemFormInput = {
  label:
    string;

  type:
    CmsMenuItemType;

  pageId:
    string | null;

  customUrl:
    string;

  target:
    CmsMenuItemTarget;

  enabled:
    boolean;
};

function readText(
  formData:
    FormData,

  name:
    string,
): string {
  const value =
    formData.get(
      name,
    );

  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readBoolean(
  formData:
    FormData,

  name:
    string,
): boolean {
  const value =
    readText(
      formData,
      name,
    ).toLowerCase();

  return (
    value ===
      "true" ||
    value ===
      "1" ||
    value ===
      "on"
  );
}

export function readCmsMenuItemFromFormData(
  formData:
    FormData,
): CmsMenuItemFormInput {
  const requestedType =
    readText(
      formData,
      "type",
    );

  const type:
    CmsMenuItemType =
    requestedType ===
    "page"
      ? "page"
      : "custom";

  const requestedTarget =
    readText(
      formData,
      "target",
    );

  const target:
    CmsMenuItemTarget =
    requestedTarget ===
    "new-tab"
      ? "new-tab"
      : "same-tab";

  const pageId =
    type ===
    "page"
      ? readText(
          formData,
          "pageId",
        ) ||
        null
      : null;

  const customUrl =
    type ===
    "custom"
      ? readText(
          formData,
          "customUrl",
        )
      : "";

  return {
    label:
      readText(
        formData,
        "label",
      ),

    type,

    pageId,

    customUrl,

    target,

    enabled:
      readBoolean(
        formData,
        "enabled",
      ),
  };
}