import {
  normalizeCmsBlockData,
} from "../cms/core/block-data-normalizer";

import {
  parseCmsStructuredBlockData,
} from "../cms/core/block-data-schemas";

import type {
  CmsStructuredBlockDataByType,
} from "../cms/core/block-data-schemas";

import type {
  CmsBlockType,
} from "../cms/core/types";

export function getCmsStructuredEditorData<
  T extends CmsBlockType,
>(
  type:
    T,

  input:
    Record<
      string,
      unknown
    >,
): CmsStructuredBlockDataByType[T] {
  const normalized =
    normalizeCmsBlockData(
      type,
      input,
    );

  return parseCmsStructuredBlockData(
    type,
    normalized,
  ) as CmsStructuredBlockDataByType[T];
}

export function parseCmsStructuredBlockPayload<
  T extends CmsBlockType,
>(
  type:
    T,

  payload:
    string,
): CmsStructuredBlockDataByType[T] {
  const parsedJson:
    unknown =
      JSON.parse(
        payload,
      );

  return parseCmsStructuredBlockData(
    type,
    parsedJson,
  ) as CmsStructuredBlockDataByType[T];
}

export function stringifyCmsStructuredBlockPayload<
  T extends CmsBlockType,
>(
  type:
    T,

  input:
    Record<
      string,
      unknown
    >,
): string {
  const data =
    parseCmsStructuredBlockData(
      type,
      input,
    );

  return JSON.stringify(
    data,
  );
}

export function readCmsStructuredBlockDataFromFormData<
  T extends CmsBlockType,
>(
  type:
    T,

  formData:
    FormData,
): CmsStructuredBlockDataByType[T] {
  const value =
    formData.get(
      "blockData",
    );

  if (
    typeof value !==
      "string" ||
    value.length ===
      0
  ) {
    throw new Error(
      "Missing structured CMS block payload.",
    );
  }

  return parseCmsStructuredBlockPayload(
    type,
    value,
  );
}
