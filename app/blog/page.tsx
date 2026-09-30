import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import PublicSiteShell from "../../components/cms/public/PublicSiteShell";

import {
  getCmsPublicHomepageModel,
} from "../../lib/cms/public/site-data";

import {
  listPublishedCmsBlogPosts,
} from "../../lib/repositories/cms-blog";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<
  Metadata
> {
  const model =
    await getCmsPublicHomepageModel();

  if (!model) {
    return {};
  }

  const base =
    model.settings
      .identity
      .siteUrl.replace(
        /\/+$/,
        "",
      );

  return {
    title: {
      absolute:
        "GPS Maps Journal",
    },

    description:
      "Navigation, location and travel articles from the GPS Maps Team.",

    alternates: {
      canonical:
        `${base}/blog`,
    },
  };
}

type Props = {
  searchParams:
    Promise<{
      category?:
        string;
    }>;
};

export default async function BlogPage({
  searchParams,
}: Props) {
  const model =
    await getCmsPublicHomepageModel();

  if (!model) {
    notFound();
  }

  const query =
    await searchParams;

  const selectedCategory =
    query.category?.trim() ??
    "";

  const posts =
    await listPublishedCmsBlogPosts();

  const categories = [
    ...new Set(
      posts.map(
        (
          post,
        ) =>
          post.category,
      ),
    ),
  ].sort();

  const visible =
    selectedCategory
      ? posts.filter(
          (
            post,
          ) =>
            post.category ===
            selectedCategory,
        )
      : posts;

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
      <main className="gps-blog-index">
        <section className="gps-blog-index-hero">
          <div className="gps-blog-wrap">
            <p className="gps-blog-kicker">
              GPS Maps
            </p>

            <h1>
              GPS Maps Journal
            </h1>

            <p>
              Navigation, location and travel insights from the GPS Maps Team.
            </p>
          </div>
        </section>

        <section className="gps-blog-list-section">
          <div className="gps-blog-wrap">
            <nav
              className="gps-blog-categories"
              aria-label="Blog categories"
            >
              <Link
                href="/blog"
                className={
                  !selectedCategory
                    ? "is-active"
                    : ""
                }
              >
                All
              </Link>

              {categories.map(
                (
                  category,
                ) => (
                  <Link
                    key={
                      category
                    }
                    href={`/blog?category=${encodeURIComponent(
                      category,
                    )}`}
                    className={
                      selectedCategory ===
                      category
                        ? "is-active"
                        : ""
                    }
                  >
                    {
                      category
                    }
                  </Link>
                ),
              )}
            </nav>

            {visible.length >
              0 ? (
              <div className="gps-blog-list">
                {visible.map(
                  (
                    post,
                  ) => (
                    <article
                      key={
                        post.id
                      }
                      className="gps-blog-card"
                    >
                      <div className="gps-blog-card-meta">
                        <span>
                          {
                            post.category
                          }
                        </span>

                        <span>
                          {post.publishedAt?.toLocaleDateString(
                            "en-IN",
                            {
                              day:
                                "2-digit",

                              month:
                                "short",

                              year:
                                "numeric",
                            },
                          )}
                        </span>
                      </div>

                      <h2>
                        <Link
                          href={`/blog/${post.slug}`}
                        >
                          {
                            post.title
                          }
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p>
                          {
                            post.excerpt
                          }
                        </p>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="gps-blog-read-link"
                      >
                        Read article
                        <span aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </article>
                  ),
                )}
              </div>
            ) : (
              <div className="gps-blog-empty">
                No published articles in this category yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </PublicSiteShell>
  );
}
