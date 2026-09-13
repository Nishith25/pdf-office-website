import {
  z,
} from "zod";

import {
  faqSchema,
} from "../cms/schemas";

export const faqAdminItemSchema =
  faqSchema.extend({
    id: z
      .string()
      .min(1)
      .max(200),
  });

export const faqEditorSchema =
  z
    .array(
      faqAdminItemSchema,
    )
    .max(100)
    .superRefine(
      (
        faqs,
        context,
      ) => {
        const seen =
          new Set<
            string
          >();

        faqs.forEach(
          (
            faq,
            index,
          ) => {
            if (
              seen.has(
                faq.id,
              )
            ) {
              context.addIssue({
                code:
                  "custom",

                path: [
                  index,
                  "id",
                ],

                message:
                  "FAQ id must be unique.",
              });

              return;
            }

            seen.add(
              faq.id,
            );
          },
        );
      },
    );

export type FAQAdminItem =
  z.infer<
    typeof faqAdminItemSchema
  >;

export function normalizeFaqOrders(
  faqs:
    readonly FAQAdminItem[],
): FAQAdminItem[] {
  return faqs.map(
    (
      faq,
      index,
    ) => ({
      ...faq,

      order:
        index + 1,
    }),
  );
}