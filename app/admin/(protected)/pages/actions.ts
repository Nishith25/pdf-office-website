"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  buildCmsBlockDataFromFormData,
} from "../../../../lib/admin/cms-block-editor";

import {
  buildCmsPageFromEditor,
  cmsPageEditorInputSchema,
} from "../../../../lib/admin/cms-page-editor";

import {
  readCmsPageEditorInputFromFormData,
} from "../../../../lib/admin/cms-page-form";

import {
  cloneCmsBlocksForPage,
} from "../../../../lib/cms/core/block-copy";

import {
  CMS_BLOCK_REGISTRY,
  createCmsBlockDraft,
} from "../../../../lib/cms/core/block-registry";

import {
  moveCmsBlock,
} from "../../../../lib/cms/core/block-operations";

import {
  duplicateCmsPageDraft,
  ensureCmsHomepageEligibility,
  publishCmsPage,
  unpublishCmsPage,
} from "../../../../lib/cms/core/page-lifecycle";

import type {
  CmsBlockType,
} from "../../../../lib/cms/core/types";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  deleteCmsBlockById,
  getCmsBlockById,
  getCmsBlocksForPage,
  insertCmsBlock,
  persistCmsBlockOrder,
  replaceCmsBlock,
  replaceCmsBlocksForPage,
} from "../../../../lib/repositories/cms-blocks";

import {
  writeCmsActivity,
} from "../../../../lib/repositories/cms-activity";

import {
  deleteCmsPageWithBlocks,
  findAvailableCmsSlug,
  getCmsPageById,
  insertCmsPage,
  replaceCmsPage,
  setCmsHomepage,
} from "../../../../lib/repositories/cms-pages";

async function requireAdmin() {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }

  return admin;
}

function text(
  formData: FormData,

  name: string,
): string {
  const value =
    formData.get(
      name,
    );

  return typeof value ===
    "string"
    ? value
    : "";
}

async function logActivity(
  action: string,

  entityType:
    | "page"
    | "block",

  entityId: string,

  entityName: string,
) {
  try {
    await writeCmsActivity({
      action,

      entityType,

      entityId,

      entityName,

      createdAt:
        new Date(),
    });
  } catch (
    error
  ) {
    console.error(
      "CMS activity log failed:",
      error,
    );
  }
}

function refreshPage(
  pageId: string,
) {
  revalidatePath(
    "/admin",
  );

  revalidatePath(
    "/admin/pages",
  );

  revalidatePath(
    `/admin/pages/${pageId}`,
  );

  revalidatePath(
    `/admin/preview/${pageId}`,
  );
}

export async function createCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const input =
    readCmsPageEditorInputFromFormData(
      formData,
    );

  const parsed =
    cmsPageEditorInputSchema.safeParse(
      input,
    );

  if (
    !parsed.success
  ) {
    redirect(
      "/admin/pages/new?error=invalid",
    );
  }

  const editablePage =
    buildCmsPageFromEditor(
      {
        ...parsed.data,

        isHomepage:
          false,
      },
    );

  const page =
    ensureCmsHomepageEligibility(
      editablePage,

      parsed.data
        .isHomepage,
    );

  const slug =
    await findAvailableCmsSlug(
      page.slug,
    );

  const created =
    await insertCmsPage({
      ...page,

      slug,
    });

  if (
    parsed.data
      .isHomepage
  ) {
    await setCmsHomepage(
      created.id,
    );
  }

  await logActivity(
    "Created page",

    "page",

    created.id,

    created.title,
  );

  refreshPage(
    created.id,
  );

  redirect(
    `/admin/pages/${created.id}?created=1`,
  );
}

export async function saveCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const existing =
    await getCmsPageById(
      pageId,
    );

  if (!existing) {
    redirect(
      "/admin/pages?error=missing",
    );
  }

  const input =
    readCmsPageEditorInputFromFormData(
      formData,
    );

  const parsed =
    cmsPageEditorInputSchema.safeParse(
      input,
    );

  if (
    !parsed.success
  ) {
    redirect(
      `/admin/pages/${pageId}?error=invalid`,
    );
  }

  const editedPage =
    buildCmsPageFromEditor(
      {
        ...parsed.data,

        isHomepage:
          existing.isHomepage,
      },

      existing,
    );

  const page =
    ensureCmsHomepageEligibility(
      editedPage,

      existing.isHomepage,
    );

  const slug =
    await findAvailableCmsSlug(
      page.slug,

      pageId,
    );

  await replaceCmsPage(
    pageId,

    {
      ...page,

      slug,
    },
  );

  await logActivity(
    "Updated page",

    "page",

    pageId,

    page.title,
  );

  refreshPage(
    pageId,
  );

  redirect(
    `/admin/pages/${pageId}?saved=1`,
  );
}

export async function publishCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const page =
    await getCmsPageById(
      pageId,
    );

  if (!page) {
    return;
  }

  await replaceCmsPage(
    pageId,

    publishCmsPage(
      page,
    ),
  );

  await logActivity(
    "Published page",

    "page",

    pageId,

    page.title,
  );

  refreshPage(
    pageId,
  );
}

export async function unpublishCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const page =
    await getCmsPageById(
      pageId,
    );

  if (
    !page ||
    page.isHomepage
  ) {
    return;
  }

  await replaceCmsPage(
    pageId,

    unpublishCmsPage(
      page,
    ),
  );

  await logActivity(
    "Unpublished page",

    "page",

    pageId,

    page.title,
  );

  refreshPage(
    pageId,
  );
}

export async function setCmsHomepageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const page =
    await getCmsPageById(
      pageId,
    );

  if (!page) {
    return;
  }

  const changed =
    await setCmsHomepage(
      pageId,
    );

  if (!changed) {
    return;
  }

  await logActivity(
    "Set homepage",

    "page",

    pageId,

    page.title,
  );

  refreshPage(
    pageId,
  );
}

export async function duplicateCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const source =
    await getCmsPageById(
      pageId,
    );

  if (!source) {
    return;
  }

  const slug =
    await findAvailableCmsSlug(
      `${source.slug}-copy`,
    );

  const duplicate =
    duplicateCmsPageDraft(
      source,

      slug,
    );

  const created =
    await insertCmsPage(
      duplicate,
    );

  const sourceBlocks =
    await getCmsBlocksForPage(
      pageId,
    );

  const copiedBlocks =
    cloneCmsBlocksForPage(
      sourceBlocks,

      created.id,
    );

  await replaceCmsBlocksForPage(
    created.id,

    copiedBlocks,
  );

  await logActivity(
    "Duplicated page",

    "page",

    created.id,

    created.title,
  );

  refreshPage(
    created.id,
  );

  redirect(
    `/admin/pages/${created.id}?created=1`,
  );
}

export async function deleteCmsPageAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const page =
    await getCmsPageById(
      pageId,
    );

  if (
    !page ||
    page.isHomepage
  ) {
    return;
  }

  const deleted =
    await deleteCmsPageWithBlocks(
      pageId,
    );

  if (deleted) {
    await logActivity(
      "Deleted page",

      "page",

      pageId,

      page.title,
    );
  }

  revalidatePath(
    "/admin",
  );

  revalidatePath(
    "/admin/pages",
  );

  redirect(
    "/admin/pages",
  );
}

function validBlockType(
  value: string,
): value is CmsBlockType {
  return CMS_BLOCK_REGISTRY.some(
    (
      definition,
    ) =>
      definition.type ===
      value,
  );
}

export async function addCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const type =
    text(
      formData,
      "blockType",
    );

  if (
    !validBlockType(
      type,
    )
  ) {
    return;
  }

  const page =
    await getCmsPageById(
      pageId,
    );

  if (!page) {
    return;
  }

  const blocks =
    await getCmsBlocksForPage(
      pageId,
    );

  const block =
    createCmsBlockDraft(
      type,

      pageId,

      blocks.length +
        1,
    );

  const created =
    await insertCmsBlock(
      block,
    );

  await logActivity(
    "Added block",

    "block",

    created.id,

    type,
  );

  refreshPage(
    pageId,
  );
}

export async function updateCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const blockId =
    text(
      formData,
      "blockId",
    );

  const block =
    await getCmsBlockById(
      blockId,
    );

  if (
    !block ||
    block.pageId !==
      pageId
  ) {
    return;
  }

  const data =
    buildCmsBlockDataFromFormData(
      block.type,

      formData,
    );

  await replaceCmsBlock(
    blockId,

    {
      pageId:
        block.pageId,

      type:
        block.type,

      order:
        block.order,

      visible:
        block.visible,

      data,

      createdAt:
        block.createdAt,

      updatedAt:
        new Date(),
    },
  );

  await logActivity(
    "Updated block",

    "block",

    blockId,

    block.type,
  );

  refreshPage(
    pageId,
  );
}

export async function moveCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const blockId =
    text(
      formData,
      "blockId",
    );

  const direction =
    text(
      formData,
      "direction",
    );

  if (
    direction !==
      "up" &&
    direction !==
      "down"
  ) {
    return;
  }

  const page =
    await getCmsPageById(
      pageId,
    );

  if (!page) {
    return;
  }

  const blocks =
    await getCmsBlocksForPage(
      pageId,
    );

  const ownsBlock =
    blocks.some(
      (
        block,
      ) =>
        block.id ===
        blockId,
    );

  if (!ownsBlock) {
    return;
  }

  const moved =
    moveCmsBlock(
      blocks,

      blockId,

      direction,
    );

  await persistCmsBlockOrder(
    moved,
  );

  refreshPage(
    pageId,
  );
}

export async function duplicateCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const blockId =
    text(
      formData,
      "blockId",
    );

  const source =
    await getCmsBlockById(
      blockId,
    );

  if (
    !source ||
    source.pageId !==
      pageId
  ) {
    return;
  }

  const blocks =
    await getCmsBlocksForPage(
      pageId,
    );

  const sourceIndex =
    blocks.findIndex(
      (
        block,
      ) =>
        block.id ===
        source.id,
    );

  if (
    sourceIndex ===
    -1
  ) {
    return;
  }

  const now =
    new Date();

  const created =
    await insertCmsBlock({
      pageId,

      type:
        source.type,

      order:
        blocks.length +
        1,

      visible:
        source.visible,

      data:
        structuredClone(
          source.data,
        ),

      createdAt:
        now,

      updatedAt:
        now,
    });

  const ordered = [
    ...blocks,
  ];

  ordered.splice(
    sourceIndex +
      1,

    0,

    created,
  );

  await persistCmsBlockOrder(
    ordered.map(
      (
        block,
        index,
      ) => ({
        ...block,

        order:
          index +
          1,
      }),
    ),
  );

  await logActivity(
    "Duplicated block",

    "block",

    created.id,

    created.type,
  );

  refreshPage(
    pageId,
  );
}

export async function toggleCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const blockId =
    text(
      formData,
      "blockId",
    );

  const block =
    await getCmsBlockById(
      blockId,
    );

  if (
    !block ||
    block.pageId !==
      pageId
  ) {
    return;
  }

  await replaceCmsBlock(
    blockId,

    {
      pageId:
        block.pageId,

      type:
        block.type,

      order:
        block.order,

      visible:
        !block.visible,

      data:
        block.data,

      createdAt:
        block.createdAt,

      updatedAt:
        new Date(),
    },
  );

  await logActivity(
    block.visible
      ? "Hid block"
      : "Showed block",

    "block",

    blockId,

    block.type,
  );

  refreshPage(
    pageId,
  );
}

export async function deleteCmsBlockAction(
  formData: FormData,
) {
  await requireAdmin();

  const pageId =
    text(
      formData,
      "pageId",
    );

  const blockId =
    text(
      formData,
      "blockId",
    );

  const block =
    await getCmsBlockById(
      blockId,
    );

  if (
    !block ||
    block.pageId !==
      pageId
  ) {
    return;
  }

  await deleteCmsBlockById(
    blockId,
  );

  const remaining =
    await getCmsBlocksForPage(
      pageId,
    );

  await persistCmsBlockOrder(
    remaining.map(
      (
        item,
        index,
      ) => ({
        ...item,

        order:
          index +
          1,
      }),
    ),
  );

  await logActivity(
    "Deleted block",

    "block",

    blockId,

    block.type,
  );

  refreshPage(
    pageId,
  );
}