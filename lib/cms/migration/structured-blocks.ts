import {
  isCmsStructuredBlockData,
} from "../core/block-data-schemas";

import {
  normalizeCmsBlockData,
} from "../core/block-data-normalizer";

import type {
  CmsBlockType,
} from "../core/types";

export type StructuredCmsBlockMigrationRecord = {
  id:
    string;

  type:
    CmsBlockType;

  data:
    unknown;
};

export type StructuredCmsBlockMigrationEntry = {
  id:
    string;

  type:
    CmsBlockType;

  before:
    unknown;

  after:
    unknown;

  changed:
    boolean;
};

export type StructuredCmsBlockMigrationPlan = {
  entries:
    StructuredCmsBlockMigrationEntry[];

  totalCount:
    number;

  changedCount:
    number;

  alreadyStructuredCount:
    number;
};

export function buildStructuredCmsBlockMigrationPlan(
  records:
    readonly StructuredCmsBlockMigrationRecord[],
): StructuredCmsBlockMigrationPlan {
  const entries =
    records.map(
      (
        record,
      ) => {
        const before =
          structuredClone(
            record.data,
          );

        const alreadyStructured =
          isCmsStructuredBlockData(
            record.type,
            before,
          );

        const after =
          normalizeCmsBlockData(
            record.type,
            before,
          );

        return {
          id:
            record.id,

          type:
            record.type,

          before,

          after,

          changed:
            !alreadyStructured,
        };
      },
    );

  return {
    entries,

    totalCount:
      entries.length,

    changedCount:
      entries.filter(
        (
          entry,
        ) =>
          entry.changed,
      ).length,

    alreadyStructuredCount:
      entries.filter(
        (
          entry,
        ) =>
          !entry.changed,
      ).length,
  };
}

export function verifyStructuredCmsBlockRecords(
  records:
    readonly StructuredCmsBlockMigrationRecord[],
): {
  valid:
    boolean;

  invalidIds:
    string[];
} {
  const invalidIds =
    records
      .filter(
        (
          record,
        ) =>
          !isCmsStructuredBlockData(
            record.type,
            record.data,
          ),
      )
      .map(
        (
          record,
        ) =>
          record.id,
      );

  return {
    valid:
      invalidIds.length ===
      0,

    invalidIds,
  };
}