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

const primaryFeatures = [
  {
    title: "Voice Navigation",
    description:
      "Turn-by-turn guidance, destination search, route awareness and voice-assisted directions for everyday driving.",
  },
  {
    title: "Offline Maps",
    description:
      "Download supported countries, regions or selected map areas before travelling and keep essential map access ready without a connection.",
  },
  {
    title: "Weather Intelligence",
    description:
      "Current conditions, hourly forecasts, 10-day outlooks, rain awareness, weather alerts and activity-focused insights.",
  },
  {
    title: "Nearby Explore",
    description:
      "Discover restaurants, cafes, shopping, fuel, hospitals, parking, temples and useful places around your location.",
  },
  {
    title: "Live Location",
    description:
      "Share location, stay connected through private circles and use location-aware safety tools while travelling.",
  },
  {
    title: "Travel Planner",
    description:
      "Plan source, destination and travel dates while considering weather conditions and outdoor activity suitability.",
  },
];

const safetyFeatures = [
  {
    title: "Live Location Sharing",
    description:
      "Share your live location with the people who matter while you are moving.",
  },
  {
    title: "Private Circles",
    description:
      "Create private groups for family, friends and other trusted people.",
  },
  {
    title: "Geofencing Alerts",
    description:
      "Use location-aware boundaries and alerts around selected places.",
  },
];

const toolItems = [
  {
    title: "Parking Manager",
    description:
      "Save where you parked and return to your vehicle without searching again.",
  },
  {
    title: "Ride Dashboard",
    description:
      "Track live speed, ride time, distance, direction, average speed and useful trip information.",
  },
  {
    title: "Digital Compass",
    description:
      "Stay oriented with a digital compass and alternate viewing modes when direction matters.",
  },
  {
    title: "Translator",
    description:
      "Translate useful text between languages while travelling.",
  },
  {
    title: "Map Styles",
    description:
      "Switch between supported map views including normal, hybrid, terrain and satellite-style experiences.",
  },
  {
    title: "My Location & Find Address",
    description:
      "See your current position and quickly understand or search for an address.",
  },
];

const faqItems = [
  {
    question: "Can GPS Maps work without internet?",
    answer:
      "Supported regions and selected map areas can be downloaded in advance for use when connectivity is limited.",
  },
  {
    question: "Does GPS Maps support voice navigation?",
    answer:
      "Yes. Voice-assisted navigation helps you follow routes and driving directions while travelling.",
  },
  {
    question: "Does the app include weather, radar and AQI?",
    answer:
      "Yes. GPS Maps includes weather forecasts, radar-style information and air-quality insights for travel planning.",
  },
  {
    question: "Can I share my live location?",
    answer:
      "Yes. Live-location sharing and private-circle features help you stay connected with people you trust.",
  },
];

function MapStage() {
  return (
    <div
      className="gpsx-map-stage gpsx-map-stage-empty"
      aria-hidden="true"
    />
  );
}

function ProductFeature({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <details className="gpsx-feature-item">
      <summary>
        <span className="gpsx-feature-number">
          {String(index).padStart(2, "0")}
        </span>

        <span className="gpsx-feature-name">
          {title}
        </span>

        <span
          className="gpsx-feature-toggle"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <p>{description}</p>
    </details>
  );
}

function WeatherBoard() {
  return (
    <div className="gpsx-weather-board">
      <div className="gpsx-weather-board-head">
        <span>WEATHER / LIVE</span>
        <span>GPS MAPS</span>
      </div>

      <div className="gpsx-weather-current">
        <div>
          <span className="gpsx-weather-place">
            Current location
          </span>

          <strong>30°</strong>

          <p>
            Forecast, rain probability and conditions before you travel.
          </p>
        </div>

        <div className="gpsx-weather-condition">
          <span className="gpsx-weather-symbol">
            ☁
          </span>

          <span>Weather aware</span>
        </div>
      </div>

      <div className="gpsx-weather-strip">
        {[
          ["NOW", "30°", "56%"],
          ["+3H", "29°", "74%"],
          ["+6H", "27°", "48%"],
          ["+9H", "26°", "32%"],
        ].map(([time, temp, rain]) => (
          <div key={time}>
            <span>{time}</span>
            <strong>{temp}</strong>
            <small>{rain} rain</small>
          </div>
        ))}
      </div>

      <div className="gpsx-weather-layers">
        <span>RAIN</span>
        <span>CLOUDS</span>
        <span>TEMPERATURE</span>
        <span>RADAR</span>
      </div>
    </div>
  );
}

function AqiPanel() {
  return (
    <div className="gpsx-aqi-panel">
      <div className="gpsx-aqi-score">
        <span>AIR QUALITY</span>
        <strong>25</strong>
        <p>Good</p>
      </div>

      <div className="gpsx-aqi-grid">
        {[
          ["PM2.5", "Low"],
          ["PM10", "Low"],
          ["NO₂", "Good"],
          ["O₃", "Good"],
          ["CO", "Good"],
          ["TREND", "Stable"],
        ].map(([name, value]) => (
          <div key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <p className="gpsx-aqi-note">
        Air-quality details and health-oriented guidance help you judge outdoor conditions.
      </p>
    </div>
  );
}

function OfflineBoard() {
  return (
    <div className="gpsx-offline-board">
      <div className="gpsx-offline-map">
        <div className="gpsx-offline-grid" />

        <div className="gpsx-offline-selection">
          <span>SELECTED AREA</span>
          <strong>Offline ready</strong>
        </div>
      </div>

      <div className="gpsx-offline-list">
        {[
          "Local region",
          "State / region",
          "Entire country",
          "Custom map area",
        ].map((item, index) => (
          <div key={item}>
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>{item}</strong>

            <small>DOWNLOAD</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GpsHomeExperience({
  blocks,
  settings,
  recentPosts,
}: Props) {
  const heroBlock = blocks.find(
    (block) => block.type === "hero",
  );

  const ctaBlock = blocks.find(
    (block) => block.type === "cta",
  );

  const hero = heroBlock
    ? normalizeCmsBlockData(
        "hero",
        heroBlock.data,
      )
    : null;

  const cta = ctaBlock
    ? normalizeCmsBlockData(
        "cta",
        ctaBlock.data,
      )
    : null;

  const playStoreUrl =
    settings.externalLinks.googlePlayUrl ||
    hero?.primaryCta.url ||
    "https://play.google.com/store/apps/details?id=com.maps.voice.navigation.traffic.gps.location.route.driving.directions&hl=en_IN";

  return (
    <main className="gpsx-home">
      <section className="gpsx-hero">
        <div className="gpsx-shell gpsx-hero-layout">
          <div className="gpsx-hero-copy">
            <p className="gpsx-label">
              GPS Maps
              <span>Android</span>
            </p>

            <h1>
              {hero?.title ||
                "Navigate smarter. Wherever you go."}
            </h1>

            <p className="gpsx-hero-description">
              Voice navigation, offline maps, weather intelligence,
              nearby discovery, live location and practical travel
              tools in one app.
            </p>

            <div className="gpsx-hero-actions">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gpsx-button gpsx-button-dark"
              >
                Get GPS Maps
                <span aria-hidden="true">
                  ↗
                </span>
              </a>

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
              <span>Voice navigation</span>
              <span>Offline maps</span>
              <span>Weather & AQI</span>
              <span>Live location</span>
            </div>
          </div>

          <MapStage />
        </div>
      </section>

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
            {primaryFeatures.map(
              (item, index) => (
                <ProductFeature
                  key={item.title}
                  index={index + 1}
                  title={item.title}
                  description={
                    item.description
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>

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
              Search destinations, understand the route and
              follow voice-assisted navigation throughout
              the journey.
            </p>

            <div className="gpsx-route-points">
              <div>
                <span>01</span>
                <p>
                  Choose your starting point and destination.
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  Review route options and driving information.
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  Navigate with voice guidance and useful map tools.
                </p>
              </div>
            </div>
          </div>

          <div className="gpsx-route-card">
              <div className="gpsx-route-card-top">
                <span>Route preview</span>
                <span>Voice guidance on</span>
              </div>

              <div className="gpsx-route-card-body">
                <div className="gpsx-route-stop">
                  <span className="gpsx-route-stop-dot gpsx-route-stop-dot-start" />

                  <div>
                    <small>Start</small>
                    <strong>Madhapur</strong>
                  </div>
                </div>

                <div className="gpsx-route-connector" />

                <div className="gpsx-route-stop">
                  <span className="gpsx-route-stop-dot gpsx-route-stop-dot-end" />

                  <div>
                    <small>Destination</small>
                    <strong>HITEC City</strong>
                  </div>
                </div>

                <div className="gpsx-route-card-meta">
                  <div>
                    <small>ETA</small>
                    <strong>18 min</strong>
                  </div>

                  <div>
                    <small>Distance</small>
                    <strong>7.4 km</strong>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </section>

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
              No signal.
              <br />
              Still moving.
            </h2>

            <p>
              Prepare maps before the journey. Download supported
              regions, countries or selected areas so essential
              map access remains ready when connectivity drops.
            </p>

            <ul className="gpsx-story-list">
              <li>
                Country and region downloads
              </li>
              <li>
                Selected-area map downloads
              </li>
              <li>
                Offline-ready travel preparation
              </li>
            </ul>
          </div>

          <OfflineBoard />
        </div>
      </section>

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
                Know what&apos;s ahead
                <br />
                before you step outside.
              </h2>
            </div>

            <p>
              Current weather, hourly forecasts, longer-range
              outlooks, alerts, radar and air-quality information
              help you prepare before every trip.
            </p>
          </div>

          <div className="gpsx-weather-grid">
            <WeatherBoard />
            <AqiPanel />
          </div>

          <div className="gpsx-travel-compact">
            <div>
              <span>TRAVEL PLANNER</span>
              <strong>Plan around the conditions.</strong>
            </div>

            <div>
              <span>CYCLING</span>
              <strong>GOOD</strong>
            </div>

            <div>
              <span>RUNNING</span>
              <strong>FAIR</strong>
            </div>

            <div>
              <span>HIKING</span>
              <strong>FAIR</strong>
            </div>

            <div>
              <span>PICNIC</span>
              <strong>GOOD</strong>
            </div>
          </div>
        </div>
      </section>

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
              Stay connected.
              <br />
              Stay in control.
            </h2>

            <p>
              Location tools built around the people and places
              that matter while you move.
            </p>
          </div>

          <div className="gpsx-location-grid">
            {safetyFeatures.map(
              (item, index) => (
                <article
                  key={item.title}
                  className="gpsx-location-card"
                >
                  <span className="gpsx-location-index">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="tools"
        className="gpsx-tool-section"
      >
        <div className="gpsx-shell">
          <div className="gpsx-tool-heading">
            <p className="gpsx-label">
              Map tools
            </p>

            <h2>
              Useful tools.
              <br />
              No clutter.
            </h2>
          </div>

          <div className="gpsx-tool-index">
            {toolItems.map(
              (item, index) => (
                <details
                  key={item.title}
                  className="gpsx-tool-row"
                >
                  <summary>
                    <span className="gpsx-tool-number">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
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
                      ).padStart(
                        2,
                        "0",
                      )}
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

                      <h3>{post.title}</h3>

                      {post.excerpt && (
                        <p>{post.excerpt}</p>
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
            {faqItems.map(
              (item, index) => (
                <details
                  key={item.question}
                  className="gpsx-faq-item"
                >
                  <summary>
                    <span>
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <strong>
                      {item.question}
                    </strong>

                    <span className="gpsx-faq-toggle">
                      +
                    </span>
                  </summary>

                  <p>{item.answer}</p>
                </details>
              ),
            )}
          </div>
        </div>
      </section>

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
            Navigation, offline maps, weather and location tools for everyday travel.
          </p>

          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gpsx-button gpsx-button-light"
          >
            Get it on Google Play
            <span aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
