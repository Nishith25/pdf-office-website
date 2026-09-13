import {
  z,
} from "zod";

import {
  toolSchema,
} from "../cms/schemas";

import type {
  ToolItem,
} from "../cms/types";

export const toolEditorSchema =
  z
    .array(
      toolSchema,
    )
    .max(100)
    .superRefine(
      (
        tools,
        context,
      ) => {
        const seen =
          new Set<
            string
          >();

        tools.forEach(
          (
            tool,
            index,
          ) => {
            if (
              seen.has(
                tool.type,
              )
            ) {
              context.addIssue({
                code:
                  "custom",

                path: [
                  index,
                  "type",
                ],

                message:
                  "Tool type must be unique.",
              });

              return;
            }

            seen.add(
              tool.type,
            );
          },
        );
      },
    );

export function normalizeToolOrders(
  tools:
    readonly ToolItem[],
): ToolItem[] {
  return tools.map(
    (
      tool,
      index,
    ) => ({
      ...tool,

      order:
        index + 1,
    }),
  );
}