import Link from "next/link";

import type {
  CmsBlock,
  CmsSettings,
} from "../../lib/cms/core/types";

import {
  normalizeCmsBlockData,
} from "../../lib/cms/core/block-data-normalizer";

import type {
  CmsBlogPostRecord,
} from "../../lib/repositories/cms-blog";

type Props = {
  blocks:
    readonly CmsBlock[];

  settings:
    CmsSettings;

  recentPosts:
    readonly CmsBlogPostRecord[];
};

type ProductItem = {
  id:
    string;

  title:
    string;

  description:
    string;
};

function MapStage() {
  return (
    <div
      className="gpsx-map-stage"
      aria-hidden="true"
    >
      <div className="gpsx-map-grid" />

      <svg
        className="gpsx-map-svg"
        viewBox="0 0 720 680"
        role="presentation"
      >
        <g className="gpsx-map-roads">
          <path d="M-40 150 C120 130 190 210 350 175 S590 80 770 120" />
          <path d="M-20 490 C120 430 245 470 355 410 S590 300 760 350" />
          <path d="M135 -30 C155 120 115 230 190 350 S230 560 205 730" />
          <path d="M535 -30 C500 110 565 220 505 350 S500 580 570 730" />
          <path d="M-30 300 C130 250 240 310 390 280 S610 220 760 255" />
          <path d="M355 -30 C330 105 390 165 350 270 S300 510 340 730" />
        </g>

        <g className="gpsx-map-minor-roads">
          <path d="M45 60 L650 600" />
          <path d="M85 620 L620 70" />
          <path d="M-20 385 L760 500" />
          <path d="M20 225 L690 80" />
          <path d="M275 -20 L680 420" />
          <path d="M35 555 L460 675" />
        </g>

        <path
          className="gpsx-route-shadow"
          d="M150 520 C210 470 185 400 280 370 C370 342 390 275 455 250 C520 224 540 175 590 125"
        />

        <path
          className="gpsx-route"
          d="M150 520 C210 470 185 400 280 370 C370 342 390 275 455 250 C520 224 540 175 590 125"
        />

        <circle
          className="gpsx-route-origin"
          cx="150"
          cy="520"
          r="13"
        />

        <circle
          className="gpsx-route-origin-core"
          cx="150"
          cy="520"
          r="5"
        />

        <circle
          className="gpsx-route-destination"
          cx="590"
          cy="125"
          r="15"
        />

        <circle
          className="gpsx-route-destination-core"
          cx="590"
          cy="125"
          r="6"
        />
      </svg>

      <div className="gpsx-map-status gpsx-map-status-top">
        <span className="gpsx-map-status-label">
          Route
        </span>

        <strong>
          12.4 km
        </strong>
      </div>

      <div className="gpsx-map-status gpsx-map-status-bottom">
        <span className="gpsx-map-pulse" />

        <span>
          Location active
        </span>
      </div>

      <div className="gpsx-map-place gpsx-map-place-a">
        Start
      </div>

      <div className="gpsx-map-place gpsx-map-place-b">
        Destination
      </div>
    </div>
  );
}

function FeatureDisclosure({
  number,
  item,
}: {
  number:
    number;

  item:
    ProductItem;
}) {
  return (
    <details className="gpsx-feature-item">
      <summary>
        <span className="gpsx-feature-number">
          {String(
            number,
          ).padStart(
            2,
            "0",
          )}
        </span>

        <span className="gpsx-feature-name">
          {
            item.title
          }
        </span>

        <span
          className="gpsx-feature-toggle"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      {item.description && (
        <p>
          {
            item.description
          }
        </p>
      )}
    </details>
  );
}

function findItem(
  items:
    readonly ProductItem[],

  title:
    string,
) {
  return items.find(
    (
      item,
    ) =>
      item.title ===
      title,
  );
}

export default function GpsHomeExperience({
  blocks,
  settings,
  recentPosts,
}: Props) {
  const heroBlock =
    blocks.find(
      (
        block,
      ) =>
        block.type ===
        "hero",
    );

  const featuresBlock =
    blocks.find(
      (
        block,
      ) =>
        block.type ===
        "featureGrid",
    );

  const toolsBlock =
    blocks.find(
      (
        block,
      ) =>
        block.type ===
        "cardGrid",
    );

  const faqBlock =
    blocks.find(
      (
        block,
      ) =>
        block.type ===
        "faq",
    );

  const ctaBlock =
    blocks.find(
      (
        block,
      ) =>
        block.type ===
        "cta",
    );

  const hero =
    heroBlock
      ? normalizeCmsBlockData(
          "hero",
          heroBlock.data,
        )
      : null;

  const features =
    featuresBlock
      ? normalizeCmsBlockData(
          "featureGrid",
          featuresBlock.data,
        )
      : null;

  const tools =
    toolsBlock
      ? normalizeCmsBlockData(
          "cardGrid",
          toolsBlock.data,
        )
      : null;

  const faq =
    faqBlock
      ? normalizeCmsBlockData(
          "faq",
          faqBlock.data,
        )
      : null;

  const cta =
    ctaBlock
      ? normalizeCmsBlockData(
          "cta",
          ctaBlock.data,
        )
      : null;

  const featureItems:
    ProductItem[] =
    features?.items.map(
      (
        item,
      ) => ({
        id:
          item.id,

        title:
          item.title,

        description:
          item.description,
      }),
    ) ??
    [];

  const toolItems:
    ProductItem[] =
    tools?.cards.map(
      (
        item,
      ) => ({
        id:
          item.id,

        title:
          item.title,

        description:
          item.description,
      }),
    ) ??
    [];

  const allItems = [
    ...featureItems,
    ...toolItems,
  ];

  const route =
    findItem(
      allItems,
      "Route Planner",
    );

  const locationItems = [
    "Live Location Sharing",
    "Private Circles",
    "Geofencing Alerts",
  ]
    .map(
      (
        title,
      ) =>
        findItem(
          allItems,
          title,
        ),
    )
    .filter(
      (
        item,
      ): item is ProductItem =>
        Boolean(
          item,
        ),
    );

  const toolkitTitles = [
    "Parking Manager",
    "Digital Speedometer",
    "My Location & Address",
    "Weather & Travel",
    "Digital Compass",
    "Multi-language Support",
  ];

  const toolkitItems =
    toolkitTitles
      .map(
        (
          title,
        ) =>
          findItem(
            allItems,
            title,
          ),
      )
      .filter(
        (
          item,
        ): item is ProductItem =>
          Boolean(
            item,
          ),
      );

  const playStoreUrl =
    settings.externalLinks
      .googlePlayUrl ||
    hero?.primaryCta.url ||
    "";

  return (
    <main className="gpsx-home">
      <section className="gpsx-hero">
        <div className="gpsx-shell gpsx-hero-layout">
          <div className="gpsx-hero-copy">
            <p className="gpsx-label">
              GPS Maps
              <span>
                Android
              </span>
            </p>

            <h1>
              {hero?.title ||
                "Navigate smarter. Wherever you go."}
            </h1>

            <p className="gpsx-hero-description">
              {hero?.description ||
                "Routes, offline maps, live location sharing and useful travel tools in one app."}
            </p>

            <div className="gpsx-hero-actions">
              {playStoreUrl && (
                <a
                  href={
                    playStoreUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gpsx-button gpsx-button-dark"
                >
                  Get GPS Maps
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}

              <a
                href="#features"
                className="gpsx-text-link"
              >
                Explore the app
                <span aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>

            <div className="gpsx-hero-meta">
              <span>
                Route planning
              </span>

              <span>
                Offline maps
              </span>

              <span>
                Live location
              </span>
            </div>
          </div>

          <MapStage />
        </div>
      </section>

      {featureItems.length >
        0 && (
        <section
          id="features"
          className="gpsx-feature-rail-section"
        >
          <div className="gpsx-shell">
            <div className="gpsx-section-intro gpsx-section-intro-inline">
              <p className="gpsx-label">
                The app
              </p>

              <h2>
                One place for the journey.
              </h2>
            </div>

            <div className="gpsx-feature-rail">
              {featureItems.map(
                (
                  item,
                  index,
                ) => (
                  <FeatureDisclosure
                    key={
                      item.id
                    }
                    number={
                      index +
                      1
                    }
                    item={
                      item
                    }
                  />
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {route && (
        <section className="gpsx-route-story">
          <div className="gpsx-shell gpsx-route-story-layout">
            <div className="gpsx-route-story-copy">
              <p className="gpsx-label">
                Navigation
              </p>

              <h2>
                Plan before
                <br />
                you move.
              </h2>

              <p>
                {
                  route.description
                }
              </p>

              <div className="gpsx-route-points">
                <div>
                  <span>
                    01
                  </span>

                  <p>
                    Choose where you want to go.
                  </p>
                </div>

                <div>
                  <span>
                    02
                  </span>

                  <p>
                    Understand the route before starting.
                  </p>
                </div>

                <div>
                  <span>
                    03
                  </span>

                  <p>
                    Keep useful location tools close throughout the trip.
                  </p>
                </div>
              </div>
            </div>

            <div className="gpsx-route-board">
              <div className="gpsx-route-board-head">
                <span>
                  ROUTE / 01
                </span>

                <span>
                  GPS MAPS
                </span>
              </div>

              <svg
                viewBox="0 0 640 520"
                role="presentation"
                aria-hidden="true"
              >
                <path
                  className="gpsx-board-gridline"
                  d="M0 95 H640 M0 190 H640 M0 285 H640 M0 380 H640"
                />

                <path
                  className="gpsx-board-gridline"
                  d="M110 0 V520 M220 0 V520 M330 0 V520 M440 0 V520 M550 0 V520"
                />

                <path
                  className="gpsx-board-route"
                  d="M120 405 C145 330 230 340 250 275 C270 215 345 240 370 175 C392 116 460 150 520 82"
                />

                <circle
                  cx="120"
                  cy="405"
                  r="10"
                  className="gpsx-board-point"
                />

                <circle
                  cx="520"
                  cy="82"
                  r="14"
                  className="gpsx-board-point-end"
                />
              </svg>

              <div className="gpsx-route-board-distance">
                <small>
                  Distance
                </small>

                <strong>
                  12.4
                </strong>

                <span>
                  km
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {locationItems.length >
        0 && (
        <section className="gpsx-location-section">
          <div className="gpsx-shell">
            <div className="gpsx-location-heading">
              <p className="gpsx-label gpsx-label-light">
                Location
              </p>

              <h2>
                Stay connected.
                <br />
                Stay in control.
              </h2>

              <p>
                Location tools built around the people and places that matter to you.
              </p>
            </div>

            <div className="gpsx-location-grid">
              {locationItems.map(
                (
                  item,
                  index,
                ) => (
                  <article
                    key={
                      item.id
                    }
                    className="gpsx-location-card"
                  >
                    <span className="gpsx-location-index">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {toolkitItems.length >
        0 && (
        <section
          id="tools"
          className="gpsx-tool-section"
        >
          <div className="gpsx-shell">
            <div className="gpsx-tool-heading">
              <p className="gpsx-label">
                Toolkit
              </p>

              <h2>
                Useful tools.
                <br />
                No clutter.
              </h2>
            </div>

            <div className="gpsx-tool-index">
              {toolkitItems.map(
                (
                  item,
                  index,
                ) => (
                  <details
                    key={
                      item.id
                    }
                    className="gpsx-tool-row"
                  >
                    <summary>
                      <span className="gpsx-tool-number">
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span className="gpsx-tool-name">
                        {
                          item.title
                        }
                      </span>

                      <span className="gpsx-tool-open">
                        +
                      </span>
                    </summary>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </details>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {recentPosts.length >
        0 && (
        <section
          id="blog"
          className="gpsx-journal"
        >
          <div className="gpsx-shell">
            <div className="gpsx-journal-heading">
              <div>
                <p className="gpsx-label">
                  Journal
                </p>

                <h2>
                  Recent from
                  <br />
                  the journal.
                </h2>
              </div>

              <Link
                href="/blog"
                className="gpsx-text-link"
              >
                View all articles
                <span aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="gpsx-journal-list">
              {recentPosts
                .slice(
                  0,
                  3,
                )
                .map(
                  (
                    post,
                    index,
                  ) => (
                    <Link
                      key={
                        post.id
                      }
                      href={`/blog/${post.slug}`}
                      className="gpsx-journal-item"
                    >
                      <span className="gpsx-journal-number">
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div>
                        <div className="gpsx-journal-meta">
                          <span>
                            {
                              post.category
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
                                    "short",

                                  year:
                                    "numeric",
                                },
                              )}
                            </time>
                          )}
                        </div>

                        <h3>
                          {
                            post.title
                          }
                        </h3>

                        {post.excerpt && (
                          <p>
                            {
                              post.excerpt
                            }
                          </p>
                        )}
                      </div>

                      <span className="gpsx-journal-arrow">
                        ↗
                      </span>
                    </Link>
                  ),
                )}
            </div>
          </div>
        </section>
      )}

      {faq &&
        faq.items.length >
          0 && (
        <section
          id="faq"
          className="gpsx-faq"
        >
          <div className="gpsx-shell gpsx-faq-layout">
            <div>
              <p className="gpsx-label">
                FAQ
              </p>

              <h2>
                Good to know.
              </h2>
            </div>

            <div className="gpsx-faq-list">
              {faq.items.map(
                (
                  item,
                  index,
                ) => (
                  <details
                    key={
                      item.id
                    }
                    className="gpsx-faq-item"
                  >
                    <summary>
                      <span>
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <strong>
                        {
                          item.question
                        }
                      </strong>

                      <span className="gpsx-faq-toggle">
                        +
                      </span>
                    </summary>

                    <p>
                      {
                        item.answer
                      }
                    </p>
                  </details>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      <section className="gpsx-final-cta">
        <div className="gpsx-shell">
          <p className="gpsx-label gpsx-label-light">
            GPS Maps
          </p>

          <h2>
            {cta?.title ||
              "Ready to navigate?"}
          </h2>

          <p>
            {cta?.description ||
              "Navigation and useful travel tools for everyday movement."}
          </p>

          {playStoreUrl && (
            <a
              href={
                playStoreUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="gpsx-button gpsx-button-light"
            >
              Get it on Google Play
              <span aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
