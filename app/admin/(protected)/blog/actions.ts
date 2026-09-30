"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  z,
} from "zod";

import {
  cmsBlogPostSchema,
} from "../../../../lib/cms/core/schemas";

import {
  getCurrentAdmin,
} from "../../../../lib/auth/current-admin";

import {
  writeCmsActivity,
} from "../../../../lib/repositories/cms-activity";

import {
  deleteCmsBlogPost,
  findAvailableCmsBlogSlug,
  getCmsBlogPostById,
  insertCmsBlogPost,
  replaceCmsBlogPost,
} from "../../../../lib/repositories/cms-blog";

const optionalUrl =
  z
    .string()
    .trim()
    .url()
    .or(
      z.literal(""),
    );

const inputSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(160),

    slug: z
      .string()
      .trim()
      .max(160),

    category: z
      .string()
      .trim()
      .min(1)
      .max(80),

    author: z
      .string()
      .trim()
      .min(1)
      .max(120),

    status:
      z.enum([
        "draft",
        "published",
      ]),

    excerpt: z
      .string()
      .trim()
      .max(420),

    body: z
      .string()
      .max(100000),

    coverImage:
      optionalUrl,

    publishedAt: z
      .string()
      .trim(),

    featured:
      z.boolean(),

    seoTitle: z
      .string()
      .trim()
      .max(70),

    seoDescription: z
      .string()
      .trim()
      .max(180),

    seoKeywords: z
      .string()
      .max(2000),

    canonicalUrl:
      optionalUrl,

    ogTitle: z
      .string()
      .trim()
      .max(100),

    ogDescription: z
      .string()
      .trim()
      .max(200),

    ogImage:
      optionalUrl,

    noIndex:
      z.boolean(),
  });

function text(
  formData:
    FormData,

  key:
    string,
): string {
  const value =
    formData.get(
      key,
    );

  return typeof value ===
    "string"
    ? value
    : "";
}

function checked(
  formData:
    FormData,

  key:
    string,
): boolean {
  return (
    text(
      formData,
      key,
    ) ===
    "true"
  );
}

function keywords(
  value:
    string,
): string[] {
  return [
    ...new Set(
      value
        .split(
          /[,\n]+/,
        )
        .map(
          (
            item,
          ) =>
            item.trim(),
        )
        .filter(
          Boolean,
        ),
    ),
  ].slice(
    0,
    30,
  );
}

function parsedDate(
  value:
    string,
): Date | null {
  if (!value) {
    return null;
  }

  const date =
    new Date(
      value,
    );

  return Number.isNaN(
    date.getTime(),
  )
    ? null
    : date;
}

async function requireAdmin() {
  const admin =
    await getCurrentAdmin();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }
}

async function activity(
  action:
    string,

  id:
    string,

  name:
    string,
) {
  try {
    await writeCmsActivity({
      action,

      entityType:
        "post",

      entityId:
        id,

      entityName:
        name,

      createdAt:
        new Date(),
    });
  } catch (
    error
  ) {
    console.error(
      "Blog activity logging failed:",
      error,
    );
  }
}

function refresh(
  slug?:
    string,
) {
  revalidatePath(
    "/admin",
  );

  revalidatePath(
    "/admin/blog",
  );

  revalidatePath(
    "/blog",
  );

  revalidatePath(
    "/sitemap.xml",
  );

  if (slug) {
    revalidatePath(
      `/blog/${slug}`,
    );
  }
}

function readInput(
  formData:
    FormData,
) {
  return inputSchema.parse({
    title:
      text(
        formData,
        "title",
      ),

    slug:
      text(
        formData,
        "slug",
      ),

    category:
      text(
        formData,
        "category",
      ),

    author:
      text(
        formData,
        "author",
      ),

    status:
      text(
        formData,
        "status",
      ),

    excerpt:
      text(
        formData,
        "excerpt",
      ),

    body:
      text(
        formData,
        "body",
      ),

    coverImage:
      text(
        formData,
        "coverImage",
      ),

    publishedAt:
      text(
        formData,
        "publishedAt",
      ),

    featured:
      checked(
        formData,
        "featured",
      ),

    seoTitle:
      text(
        formData,
        "seoTitle",
      ),

    seoDescription:
      text(
        formData,
        "seoDescription",
      ),

    seoKeywords:
      text(
        formData,
        "seoKeywords",
      ),

    canonicalUrl:
      text(
        formData,
        "canonicalUrl",
      ),

    ogTitle:
      text(
        formData,
        "ogTitle",
      ),

    ogDescription:
      text(
        formData,
        "ogDescription",
      ),

    ogImage:
      text(
        formData,
        "ogImage",
      ),

    noIndex:
      checked(
        formData,
        "noIndex",
      ),
  });
}

export async function createCmsBlogPostAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const input =
    readInput(
      formData,
    );

  const now =
    new Date();

  const slug =
    await findAvailableCmsBlogSlug(
      input.slug ||
      input.title,
    );

  const publishedAt =
    input.status ===
      "published"
      ? (
          parsedDate(
            input.publishedAt,
          ) ??
          now
        )
      : null;

  const post =
    cmsBlogPostSchema.parse({
      title:
        input.title,

      slug,

      status:
        input.status,

      category:
        input.category,

      author:
        input.author,

      excerpt:
        input.excerpt,

      body:
        input.body,

      coverImage:
        input.coverImage,

      featured:
        input.featured,

      seo: {
        title:
          input.seoTitle,

        description:
          input.seoDescription,

        keywords:
          keywords(
            input.seoKeywords,
          ),

        canonicalUrl:
          input.canonicalUrl,

        ogTitle:
          input.ogTitle,

        ogDescription:
          input.ogDescription,

        ogImage:
          input.ogImage,

        noIndex:
          input.noIndex,
      },

      createdAt:
        now,

      updatedAt:
        now,

      publishedAt,
    });

  const created =
    await insertCmsBlogPost(
      post,
    );

  await activity(
    "Created blog post",

    created.id,

    created.title,
  );

  refresh(
    created.slug,
  );

  redirect(
    `/admin/blog/${created.id}?created=1`,
  );
}

export async function saveCmsBlogPostAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const postId =
    text(
      formData,
      "postId",
    );

  const existing =
    await getCmsBlogPostById(
      postId,
    );

  if (!existing) {
    redirect(
      "/admin/blog?error=missing",
    );
  }

  const input =
    readInput(
      formData,
    );

  const slug =
    await findAvailableCmsBlogSlug(
      input.slug ||
      input.title,

      postId,
    );

  const now =
    new Date();

  const publishedAt =
    input.status ===
      "published"
      ? (
          parsedDate(
            input.publishedAt,
          ) ??
          existing.publishedAt ??
          now
        )
      : null;

  const post =
    cmsBlogPostSchema.parse({
      title:
        input.title,

      slug,

      status:
        input.status,

      category:
        input.category,

      author:
        input.author,

      excerpt:
        input.excerpt,

      body:
        input.body,

      coverImage:
        input.coverImage,

      featured:
        input.featured,

      seo: {
        title:
          input.seoTitle,

        description:
          input.seoDescription,

        keywords:
          keywords(
            input.seoKeywords,
          ),

        canonicalUrl:
          input.canonicalUrl,

        ogTitle:
          input.ogTitle,

        ogDescription:
          input.ogDescription,

        ogImage:
          input.ogImage,

        noIndex:
          input.noIndex,
      },

      createdAt:
        existing.createdAt,

      updatedAt:
        now,

      publishedAt,
    });

  await replaceCmsBlogPost(
    postId,

    post,
  );

  await activity(
    "Updated blog post",

    postId,

    post.title,
  );

  refresh(
    post.slug,
  );

  if (
    existing.slug !==
    post.slug
  ) {
    revalidatePath(
      `/blog/${existing.slug}`,
    );
  }

  redirect(
    `/admin/blog/${postId}?saved=1`,
  );
}

export async function deleteCmsBlogPostAction(
  formData:
    FormData,
) {
  await requireAdmin();

  const postId =
    text(
      formData,
      "postId",
    );

  const existing =
    await getCmsBlogPostById(
      postId,
    );

  if (!existing) {
    return;
  }

  const deleted =
    await deleteCmsBlogPost(
      postId,
    );

  if (deleted) {
    await activity(
      "Deleted blog post",

      postId,

      existing.title,
    );

    refresh(
      existing.slug,
    );
  }

  redirect(
    "/admin/blog",
  );
}
