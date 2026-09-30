import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import BlogArticleBody from "../../../components/blog/BlogArticleBody";
import PublicSiteShell from "../../../components/cms/public/PublicSiteShell";

import {
  getCmsPublicHomepageModel,
} from "../../../lib/cms/public/site-data";

import {
  getPublishedCmsBlogPostBySlug,
} from "../../../lib/repositories/cms-blog";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      slug:
        string;
    }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<
  Metadata
> {
  const {
    slug,
  } =
    await params;

  const [
    post,
    model,
  ] =
    await Promise.all([
      getPublishedCmsBlogPostBySlug(
        slug,
      ),

      getCmsPublicHomepageModel(),
    ]);

  if (
    !post ||
    !model
  ) {
    return {};
  }

  const base =
    model.settings
      .identity
      .siteUrl.replace(
        /\/+$/,
        "",
      );

  const canonical =
    post.seo
      .canonicalUrl ||
    `${base}/blog/${post.slug}`;

  const title =
    post.seo.title ||
    post.title;

  const description =
    post.seo
      .description ||
    post.excerpt;

  const ogImage =
    post.seo
      .ogImage ||
    post.coverImage;

  return {
    title: {
      absolute:
        title,
    },

    description:
      description ||
      undefined,

    keywords:
      post.seo
        .keywords.length >
        0
        ? post.seo.keywords
        : undefined,

    alternates: {
      canonical,
    },

    robots: {
      index:
        !post.seo
          .noIndex,

      follow:
        true,
    },

    openGraph: {
      type:
        "article",

      title:
        post.seo
          .ogTitle ||
        title,

      description:
        post.seo
          .ogDescription ||
        description ||
        undefined,

      url:
        canonical,

      publishedTime:
        post.publishedAt
          ?.toISOString(),

      authors: [
        post.author,
      ],

      ...(ogImage
        ? {
            images: [
              {
                url:
                  ogImage,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: Props) {
  const {
    slug,
  } =
    await params;

  const [
    post,
    model,
  ] =
    await Promise.all([
      getPublishedCmsBlogPostBySlug(
        slug,
      ),

      getCmsPublicHomepageModel(),
    ]);

  if (
    !post ||
    !model
  ) {
    notFound();
  }

  const base =
    model.settings
      .identity
      .siteUrl.replace(
        /\/+$/,
        "",
      );

  const url =
    post.seo
      .canonicalUrl ||
    `${base}/blog/${post.slug}`;

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    headline:
      post.title,

    description:
      post.excerpt,

    author: {
      "@type":
        "Organization",

      name:
        post.author,
    },

    publisher: {
      "@type":
        "Organization",

      name:
        model.settings
          .identity
          .siteName,
    },

    datePublished:
      post.publishedAt
        ?.toISOString(),

    dateModified:
      post.updatedAt
        .toISOString(),

    mainEntityOfPage:
      url,

    ...(post.coverImage
      ? {
          image:
            post.coverImage,
        }
      : {}),
  };

  return (
    <PublicSiteShell
      settings={
        model.settings
      }
      headerNavigation={
        model.headerNavigation
      }
      footerNavigation={
        model.footerNavigation
      }
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
      >
        {
          JSON
            .stringify(
              structuredData,
            )
            .replace(
              /</g,
              "\\u003c",
            )
        }
      </script>

      <main className="gps-blog-article">
        <article className="gps-blog-article-wrap">
          <Link
            href="/blog"
            className="gps-blog-back"
          >
            ← Journal
          </Link>

          <div className="gps-blog-article-meta">
            <span>
              {
                post.category
              }
            </span>

            <span>
              {
                post.author
              }
            </span>

            {post.publishedAt && (
              <time>
                {post.publishedAt.toLocaleDateString(
                  "en-IN",
                  {
                    day:
                      "2-digit",

                    month:
                      "long",

                    year:
                      "numeric",
                  },
                )}
              </time>
            )}
          </div>

          <h1>
            {
              post.title
            }
          </h1>

          {post.excerpt && (
            <p className="gps-blog-article-deck">
              {
                post.excerpt
              }
            </p>
          )}

          <div className="gps-blog-rule" />

          <BlogArticleBody
            body={
              post.body
            }
          />
        </article>
      </main>
    </PublicSiteShell>
  );
}
