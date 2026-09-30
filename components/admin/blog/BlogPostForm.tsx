import type {
  CmsBlogPostRecord,
} from "../../../lib/repositories/cms-blog";

type Props = {
  post?:
    CmsBlogPostRecord | null;

  action:
    (
      formData:
        FormData,
    ) =>
      void |
      Promise<void>;
};

const inputClass =
  "mt-2 min-h-11 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 text-sm outline-none focus:border-[#617CE4]";

const textareaClass =
  "mt-2 w-full rounded-[10px] border border-[#DDE0E6] bg-white px-3.5 py-3 text-sm leading-6 outline-none focus:border-[#617CE4]";

const labelClass =
  "text-[11px] font-semibold text-[#343A46]";

function dateValue(
  date:
    Date | null | undefined,
) {
  if (!date) {
    return "";
  }

  return date
    .toISOString()
    .slice(
      0,
      16,
    );
}

export default function BlogPostForm({
  post,
  action,
}: Props) {
  return (
    <form
      action={
        action
      }
      className="space-y-6"
    >
      {post && (
        <input
          type="hidden"
          name="postId"
          value={
            post.id
          }
        />
      )}

      <section className="rounded-[16px] border border-[#E1E4E9] bg-white p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className={labelClass}>
              Title
            </span>

            <input
              name="title"
              required
              defaultValue={
                post?.title ??
                ""
              }
              className={inputClass}
              placeholder="Planning a route before you travel"
            />
          </label>

          <label>
            <span className={labelClass}>
              Slug
            </span>

            <input
              name="slug"
              defaultValue={
                post?.slug ??
                ""
              }
              className={inputClass}
              placeholder="planning-a-route-before-you-travel"
            />
          </label>

          <label>
            <span className={labelClass}>
              Category
            </span>

            <input
              name="category"
              required
              defaultValue={
                post?.category ??
                "Navigation"
              }
              className={inputClass}
              placeholder="Navigation"
            />
          </label>

          <label>
            <span className={labelClass}>
              Author
            </span>

            <input
              name="author"
              required
              defaultValue={
                post?.author ??
                "GPS Maps Team"
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Status
            </span>

            <select
              name="status"
              defaultValue={
                post?.status ??
                "draft"
              }
              className={inputClass}
            >
              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Publish date
            </span>

            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={
                dateValue(
                  post?.publishedAt,
                )
              }
              className={inputClass}
            />
          </label>

          <label className="flex items-center gap-2 self-end pb-3">
            <input
              type="checkbox"
              name="featured"
              value="true"
              defaultChecked={
                post?.featured ??
                false
              }
            />

            <span className={labelClass}>
              Featured article
            </span>
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Excerpt
            </span>

            <textarea
              name="excerpt"
              rows={
                3
              }
              maxLength={
                420
              }
              defaultValue={
                post?.excerpt ??
                ""
              }
              className={textareaClass}
              placeholder="A short summary shown on the blog page."
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Article body
            </span>

            <textarea
              name="body"
              rows={
                18
              }
              defaultValue={
                post?.body ??
                ""
              }
              className={textareaClass}
              placeholder={`Write the article here.

## Section heading

Normal paragraph text.

- Bullet item
- Another bullet item`}
            />

            <span className="mt-2 block text-[9px] leading-5 text-[#9096A1]">
              Supports simple headings using ## and bullet lists using -.
            </span>
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Optional cover image URL
            </span>

            <input
              type="url"
              name="coverImage"
              defaultValue={
                post?.coverImage ??
                ""
              }
              className={inputClass}
              placeholder="https://..."
            />
          </label>
        </div>
      </section>

      <section className="rounded-[16px] border border-[#E1E4E9] bg-white p-6">
        <h2 className="text-sm font-semibold">
          Search & social metadata
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              SEO title
            </span>

            <input
              name="seoTitle"
              maxLength={
                70
              }
              defaultValue={
                post?.seo.title ??
                ""
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Canonical URL
            </span>

            <input
              type="url"
              name="canonicalUrl"
              defaultValue={
                post?.seo
                  .canonicalUrl ??
                ""
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              SEO description
            </span>

            <textarea
              name="seoDescription"
              rows={
                3
              }
              maxLength={
                180
              }
              defaultValue={
                post?.seo
                  .description ??
                ""
              }
              className={textareaClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Keywords
            </span>

            <input
              name="seoKeywords"
              defaultValue={
                post?.seo
                  .keywords
                  .join(
                    ", ",
                  ) ??
                ""
              }
              className={inputClass}
              placeholder="navigation, route planning, GPS Maps"
            />
          </label>

          <label>
            <span className={labelClass}>
              Open Graph title
            </span>

            <input
              name="ogTitle"
              maxLength={
                100
              }
              defaultValue={
                post?.seo
                  .ogTitle ??
                ""
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Open Graph image
            </span>

            <input
              type="url"
              name="ogImage"
              defaultValue={
                post?.seo
                  .ogImage ??
                ""
              }
              className={inputClass}
            />
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Open Graph description
            </span>

            <textarea
              name="ogDescription"
              rows={
                3
              }
              maxLength={
                200
              }
              defaultValue={
                post?.seo
                  .ogDescription ??
                ""
              }
              className={textareaClass}
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="noIndex"
              value="true"
              defaultChecked={
                post?.seo
                  .noIndex ??
                false
              }
            />

            <span className={labelClass}>
              Prevent search indexing
            </span>
          </label>
        </div>
      </section>

      <div className="sticky bottom-4 flex justify-end rounded-[14px] border border-[#DDE0E6] bg-white/95 p-3 shadow-lg backdrop-blur">
        <button className="min-h-10 rounded-[9px] bg-[#111111] px-6 text-[11px] font-semibold text-white">
          {
            post
              ? "Save article"
              : "Create article"
          }
        </button>
      </div>
    </form>
  );
}
