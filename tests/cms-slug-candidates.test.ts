import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildCmsSlugCandidate,
} from "../lib/cms/core/slug-candidates";

describe(
  "CMS slug candidates",
  () => {
    it(
      "uses the normalized base slug for the first attempt",
      () => {
        expect(
          buildCmsSlugCandidate(
            " About Our Team ",
            1,
          ),
        ).toBe(
          "about-our-team",
        );
      },
    );

    it(
      "adds a numeric suffix to later attempts",
      () => {
        expect(
          buildCmsSlugCandidate(
            "about",
            2,
          ),
        ).toBe(
          "about-2",
        );

        expect(
          buildCmsSlugCandidate(
            "about",
            5,
          ),
        ).toBe(
          "about-5",
        );
      },
    );

    it(
      "rejects invalid attempt numbers",
      () => {
        expect(
          () =>
            buildCmsSlugCandidate(
              "about",
              0,
            ),
        ).toThrow();
      },
    );
  },
);