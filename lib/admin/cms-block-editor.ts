import {
  getCmsBlockDefinition,
} from "../cms/core/block-registry";

import type {
  CmsBlockType,
} from "../cms/core/types";

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

export function parseCmsLines(
  value: string,
): string[] {
  return value
    .split("\n")
    .map(
      (item) =>
        item.trim(),
    )
    .filter(Boolean);
}

export function buildCmsBlockDataFromFormData(
  type: CmsBlockType,
  formData: FormData,
): Record<
  string,
  unknown
> {
  const definition =
    getCmsBlockDefinition(
      type,
    );

  const result =
    structuredClone(
      definition.defaultData,
    );

  for (
    const field of definition.fields
  ) {
    const value =
      readText(
        formData,
        `field.${field.key}`,
      );

    if (
      field.type ===
      "lines"
    ) {
      result[
        field.key
      ] =
        parseCmsLines(
          value,
        );

      continue;
    }

    if (
      field.type ===
      "select"
    ) {
      const valid =
        field.options?.some(
          (option) =>
            option.value ===
            value,
        );

      if (valid) {
        result[
          field.key
        ] =
          value;
      }

      continue;
    }

    result[
      field.key
    ] =
      value;
  }

  return result;
}