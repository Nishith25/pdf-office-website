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
  blocks: readonly CmsBlock[];
  settings: CmsSettings;
  recentPosts: readonly CmsBlogPostRecord[];
};

export default function GpsHomeExperience({
  blocks,
  settings,
  recentPosts,
}: Props) {
  const heroBlocks = blocks
    .filter((block) => block.type === "hero")
    .map((block) =>
      normalizeCmsBlockData("hero", block.data),
    );

  const imageTextBlocks = blocks
    .filter((block) => block.type === "imageText")
    .map((block) =>
      normalizeCmsBlockData("imageText", block.data),
    );

  const featureBlocks = blocks
    .filter((block) => block.type === "featureGrid")
    .map((block) =>
      normalizeCmsBlockData("featureGrid", block.data),
    );

  const statsBlocks = blocks
    .filter((block) => block.type === "stats")
    .map((block) =>
      normalizeCmsBlockData("stats", block.data),
    );

  const cardBlocks = blocks
    .filter((block) => block.type === "cardGrid")
    .map((block) =>
      normalizeCmsBlockData("cardGrid", block.data),
    );

  const faqBlocks = blocks
    .filter((block) => block.type === "faq")
    .map((block) =>
      normalizeCmsBlockData("faq", block.data),
    );

  const ctaBlocks = blocks
    .filter((block) => block.type === "cta")
    .map((block) =>
      normalizeCmsBlockData("cta", block.data),
    );

  const hero = heroBlocks[0];
  const navigation = imageTextBlocks[0];

  const routePreview = statsBlocks[0];
  const routeSteps = statsBlocks[1];

  const coreFeatures = featureBlocks[0];
  const offlineMaps = featureBlocks[1];
  const safety = featureBlocks[2];

  const weather = cardBlocks[0];
  const tools = cardBlocks[1];

  const faq = faqBlocks[0];
  const cta = ctaBlocks[0];

  const playStoreUrl =
    settings.externalLinks.googlePlayUrl ||
    hero?.primaryCta.url ||
    "";

  const routeStart =
    routePreview?.items[0];

  const routeDestination =
    routePreview?.items[1];

  const routeEta =
    routePreview?.items[2];

  const routeDistance =
    routePreview?.items[3];

  return (
    <main className="gpsx-home">
      <section className="gpsx-hero">
        <div className="gpsx-shell gpsx-hero-layout">
          <div className="gpsx-hero-copy">
            {hero?.eyebrow && (
              <p className="gpsx-label">
                {hero.eyebrow}
              </p>
            )}

            <h1>
              {hero?.title ||
                "Navigate smarter. Wherever you go."}
            </h1>

            <p className="gpsx-hero-description">
              {hero?.description || ""}
            </p>

            <div className="gpsx-hero-actions">
              {playStoreUrl && (
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gpsx-button gpsx-button-dark"
                >
                  {hero?.primaryCta.label ||
                    "Get GPS Maps"}

                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}

              {hero?.secondaryCta.label && (
                <a
                  href={
                    hero.secondaryCta.url ||
                    "#features"
                  }
                  className="gpsx-text-link"
                >
                  {hero.secondaryCta.label}

                  <span aria-hidden="true">
                    ↓
                  </span>
                </a>
              )}
            </div>

            {coreFeatures &&
              coreFeatures.items.length > 0 && (
                <div className="gpsx-hero-meta">
                  {coreFeatures.items
                    .slice(0, 4)
                    .map((item) => (
                      <span key={item.id}>
                        {item.title}
                      </span>
                    ))}
                </div>
              )}
          </div>
        </div>
      </section>

      {coreFeatures &&
        coreFeatures.items.length > 0 && (
          <section
            id="features"
            className="gpsx-feature-rail-section"
          >
            <div className="gpsx-shell">
              <div className="gpsx-section-intro gpsx-section-intro-inline">
                <p className="gpsx-label">
                  The app
                </p>

                <div>
                  <h2>
                    {coreFeatures.title}
                  </h2>

                  {coreFeatures.description && (
                    <p className="gpsx-cms-section-description">
                      {coreFeatures.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="gpsx-feature-rail">
                {coreFeatures.items.map(
                  (item, index) => (
                    <details
                      key={item.id}
                      className="gpsx-feature-item"
                    >
                      <summary>
                        <span className="gpsx-feature-number">
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <span className="gpsx-feature-name">
                          {item.title}
                        </span>

                        <span className="gpsx-feature-toggle">
                          +
                        </span>
                      </summary>

                      <p>
                        {item.description}
                      </p>
                    </details>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {navigation && (
        <section className="gpsx-route-story">
          <div className="gpsx-shell gpsx-route-story-layout">
            <div className="gpsx-route-story-copy">
              <p className="gpsx-label">
                {navigation.eyebrow}
              </p>

              <h2>
                {navigation.title}
              </h2>

              <p>
                {navigation.description}
              </p>

              {routeSteps &&
                routeSteps.items.length > 0 && (
                  <div className="gpsx-route-points">
                    {routeSteps.items.map(
                      (item) => (
                        <div key={item.id}>
                          <span>
                            {item.value}
                          </span>

                          <p>
                            {item.description ||
                              item.label}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}
            </div>

            {routePreview &&
              routePreview.items.length > 0 && (
                <div className="gpsx-route-card">
                  <div className="gpsx-route-card-top">
                    <span>
                      {routePreview.title}
                    </span>

                    <span>
                      {navigation.cta.label}
                    </span>
                  </div>

                  <div className="gpsx-route-card-body">
                    {routeStart && (
                      <div className="gpsx-route-stop">
                        <span className="gpsx-route-stop-dot gpsx-route-stop-dot-start" />

                        <div>
                          <small>
                            {routeStart.value}
                          </small>

                          <strong>
                            {routeStart.label}
                          </strong>
                        </div>
                      </div>
                    )}

                    <div className="gpsx-route-connector" />

                    {routeDestination && (
                      <div className="gpsx-route-stop">
                        <span className="gpsx-route-stop-dot gpsx-route-stop-dot-end" />

                        <div>
                          <small>
                            {
                              routeDestination.value
                            }
                          </small>

                          <strong>
                            {
                              routeDestination.label
                            }
                          </strong>
                        </div>
                      </div>
                    )}

                    <div className="gpsx-route-card-meta">
                      {routeEta && (
                        <div>
                          <small>
                            {routeEta.value}
                          </small>

                          <strong>
                            {routeEta.label}
                          </strong>
                        </div>
                      )}

                      {routeDistance && (
                        <div>
                          <small>
                            {routeDistance.value}
                          </small>

                          <strong>
                            {
                              routeDistance.label
                            }
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </section>
      )}

      {offlineMaps &&
        offlineMaps.items.length > 0 && (
          <section
            id="offline"
            className="gpsx-product-story gpsx-product-story-soft"
          >
            <div className="gpsx-shell gpsx-product-story-grid">
              <div className="gpsx-product-story-copy">
                <p className="gpsx-label">
                  Offline Maps
                </p>

                <h2>
                  {offlineMaps.title}
                </h2>

                <p>
                  {offlineMaps.description}
                </p>

                <ul className="gpsx-story-list">
                  {offlineMaps.items.map(
                    (item) => (
                      <li key={item.id}>
                        {item.title}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="gpsx-offline-board">
                <div className="gpsx-offline-map">
                  <div className="gpsx-offline-grid" />

                  <div className="gpsx-offline-selection">
                    <span>
                      {
                        offlineMaps.items[0]
                          ?.eyebrow
                      }
                    </span>

                    <strong>
                      {
                        offlineMaps.items[0]
                          ?.description
                      }
                    </strong>
                  </div>
                </div>

                <div className="gpsx-offline-list">
                  {offlineMaps.items.map(
                    (item, index) => (
                      <div key={item.id}>
                        <span>
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <strong>
                          {item.title}
                        </strong>

                        <small>
                          {item.badge ||
                            "READY"}
                        </small>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {weather &&
        weather.cards.length > 0 && (
          <section
            id="weather"
            className="gpsx-weather-section"
          >
            <div className="gpsx-shell">
              <div className="gpsx-weather-heading">
                <div>
                  <p className="gpsx-label">
                    Weather intelligence
                  </p>

                  <h2>
                    {weather.title}
                  </h2>
                </div>

                <p>
                  {weather.description}
                </p>
              </div>

              <div className="gpsx-cms-weather-grid">
                {weather.cards.map(
                  (card) => (
                    <article
                      key={card.id}
                      className="gpsx-cms-weather-card"
                    >
                      <div className="gpsx-cms-weather-card-head">
                        <span>
                          {card.badge}
                        </span>

                        {card.icon && (
                          <small>
                            {card.icon}
                          </small>
                        )}
                      </div>

                      <h3>
                        {card.title}
                      </h3>

                      <p>
                        {card.description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {safety &&
        safety.items.length > 0 && (
          <section
            id="safety"
            className="gpsx-location-section"
          >
            <div className="gpsx-shell">
              <div className="gpsx-location-heading">
                <p className="gpsx-label gpsx-label-light">
                  Location & Safety
                </p>

                <h2>
                  {safety.title}
                </h2>

                <p>
                  {safety.description}
                </p>
              </div>

              <div className="gpsx-location-grid">
                {safety.items.map(
                  (item, index) => (
                    <article
                      key={item.id}
                      className="gpsx-location-card"
                    >
                      <span className="gpsx-location-index">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {tools &&
        tools.cards.length > 0 && (
          <section
            id="tools"
            className="gpsx-tool-section"
          >
            <div className="gpsx-shell">
              <div className="gpsx-tool-heading">
                <p className="gpsx-label">
                  Map tools
                </p>

                <div>
                  <h2>
                    {tools.title}
                  </h2>

                  {tools.description && (
                    <p className="gpsx-cms-section-description">
                      {tools.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="gpsx-tool-index">
                {tools.cards.map(
                  (item, index) => (
                    <details
                      key={item.id}
                      className="gpsx-tool-row"
                    >
                      <summary>
                        <span className="gpsx-tool-number">
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <span className="gpsx-tool-name">
                          {item.title}
                        </span>

                        <span className="gpsx-tool-open">
                          +
                        </span>
                      </summary>

                      <p>
                        {item.description}
                      </p>
                    </details>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {recentPosts.length > 0 && (
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
                .slice(0, 3)
                .map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="gpsx-journal-item"
                  >
                    <span className="gpsx-journal-number">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      <div className="gpsx-journal-meta">
                        <span>
                          {post.category}
                        </span>

                        {post.publishedAt && (
                          <time>
                            {post.publishedAt.toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </time>
                        )}
                      </div>

                      <h3>
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p>
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <span className="gpsx-journal-arrow">
                      ↗
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {faq &&
        faq.items.length > 0 && (
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
                  {faq.title}
                </h2>

                {faq.description && (
                  <p className="gpsx-cms-section-description">
                    {faq.description}
                  </p>
                )}
              </div>

              <div className="gpsx-faq-list">
                {faq.items.map(
                  (item, index) => (
                    <details
                      key={item.id}
                      className="gpsx-faq-item"
                    >
                      <summary>
                        <span>
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <strong>
                          {item.question}
                        </strong>

                        <span className="gpsx-faq-toggle">
                          +
                        </span>
                      </summary>

                      <p>
                        {item.answer}
                      </p>
                    </details>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {cta && (
        <section className="gpsx-final-cta">
          <div className="gpsx-shell">
            <p className="gpsx-label gpsx-label-light">
              {cta.eyebrow}
            </p>

            <h2>
              {cta.title}
            </h2>

            <p>
              {cta.description}
            </p>

            {(cta.primaryCta.url ||
              playStoreUrl) && (
              <a
                href={
                  cta.primaryCta.url ||
                  playStoreUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="gpsx-button gpsx-button-light"
              >
                {cta.primaryCta.label ||
                  "Get it on Google Play"}

                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
