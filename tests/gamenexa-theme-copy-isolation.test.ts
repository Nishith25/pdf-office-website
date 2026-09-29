import {
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  path:
    string,
): string {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "GAMENEXA theme copy isolation",
  () => {
    it(
      "does not hardcode PDF Office fallback copy inside shared blocks",
      () => {
        const sharedBlocks = [
          "components/cms/public/blocks/HeroBlock.tsx",
          "components/cms/public/blocks/FeatureGridBlock.tsx",
          "components/cms/public/blocks/ImageTextBlock.tsx",
          "components/cms/public/blocks/DownloadBlock.tsx",
        ]
          .map(
            source,
          )
          .join(
            "\n",
          );

        expect(
          sharedBlocks,
        ).not.toContain(
          "PDF OFFICE",
        );

        expect(
          sharedBlocks,
        ).not.toContain(
          "Mobile document workspace",
        );

        expect(
          sharedBlocks,
        ).not.toContain(
          "Built for document work",
        );

        expect(
          sharedBlocks,
        ).not.toContain(
          "One workspace.",
        );
      },
    );

    it(
      "uses a theme copy resolver in shared presentation blocks",
      () => {
        const hero =
          source(
            "components/cms/public/blocks/HeroBlock.tsx",
          );

        const feature =
          source(
            "components/cms/public/blocks/FeatureGridBlock.tsx",
          );

        expect(
          hero,
        ).toContain(
          "getPublicThemeCopy",
        );

        expect(
          feature,
        ).toContain(
          "getPublicThemeCopy",
        );
      },
    );
  },
);
