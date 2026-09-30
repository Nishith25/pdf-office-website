import {
  existsSync,
  readFileSync,
} from "node:fs";

import {
  resolve,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

function source(
  path:
    string,
) {
  const absolute =
    resolve(
      process.cwd(),
      path,
    );

  if (
    !existsSync(
      absolute,
    )
  ) {
    return "";
  }

  return readFileSync(
    absolute,
    "utf8",
  );
}

describe(
  "GPS Maps blog CMS",
  () => {
    it(
      "has a dedicated blog collection and schema",
      () => {
        expect(
          source(
            "lib/cms/core/collections.ts",
          ),
        ).toMatch(
          /blogPosts:\s*"cms_blog_posts"/,
        );

        expect(
          source(
            "lib/cms/core/schemas.ts",
          ),
        ).toContain(
          "cmsBlogPostSchema",
        );

        expect(
          source(
            "lib/cms/core/types.ts",
          ),
        ).toContain(
          "CmsBlogPost",
        );
      },
    );

    it(
      "has blog repository operations",
      () => {
        const repository =
          source(
            "lib/repositories/cms-blog.ts",
          );

        expect(
          repository,
        ).toContain(
          "listPublishedCmsBlogPosts",
        );

        expect(
          repository,
        ).toContain(
          "getPublishedCmsBlogPostBySlug",
        );

        expect(
          repository,
        ).toContain(
          "insertCmsBlogPost",
        );
      },
    );

    it(
      "adds Blog to CMS navigation",
      () => {
        expect(
          source(
            "lib/admin/cms-navigation.ts",
          ),
        ).toMatch(
          /label:\s*"Blog"/,
        );

        expect(
          source(
            "lib/admin/cms-navigation.ts",
          ),
        ).toContain(
          "/admin/blog",
        );
      },
    );

    it(
      "has public blog routes",
      () => {
        expect(
          source(
            "app/blog/page.tsx",
          ),
        ).toContain(
          "GPS Maps Journal",
        );

        expect(
          source(
            "app/blog/[slug]/page.tsx",
          ),
        ).toContain(
          "BlogPosting",
        );
      },
    );

    it(
      "uses GPS Maps Team as the default author",
      () => {
        expect(
          source(
            "components/admin/blog/BlogPostForm.tsx",
          ),
        ).toContain(
          "GPS Maps Team",
        );
      },
    );

    it(
      "adds blog posts to the sitemap",
      () => {
        expect(
          source(
            "app/sitemap.ts",
          ),
        ).toContain(
          "listPublishedCmsBlogPosts",
        );
      },
    );

    it(
      "configures supplied GameNexa social links",
      () => {
        const finalizer =
          source(
            "scripts/finalize-gps-submission.ts",
          );

        expect(
          finalizer,
        ).toContain(
          "https://www.facebook.com/GameNexa/",
        );

        expect(
          finalizer,
        ).toContain(
          "https://www.linkedin.com/company/gamenexa/",
        );

        expect(
          finalizer,
        ).toContain(
          "https://www.youtube.com/c/GameNexaStudios",
        );

        expect(
          finalizer,
        ).toContain(
          "https://x.com/gamenexastudio?lang=en",
        );

        expect(
          finalizer,
        ).toContain(
          "https://www.gamenexa.com/",
        );
      },
    );
  },
);
