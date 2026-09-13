import {
  z,
} from "zod";

export const passwordChangeSchema =
  z
    .object({
      currentPassword: z
        .string()
        .min(
          8,
          "Enter your current password",
        )
        .max(200),

      newPassword: z
        .string()
        .min(
          12,
          "New password must be at least 12 characters",
        )
        .max(200),

      confirmPassword: z
        .string()
        .min(1)
        .max(200),
    })
    .superRefine(
      (
        input,
        context,
      ) => {
        if (
          input.newPassword !==
          input.confirmPassword
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "confirmPassword",
            ],

            message:
              "Passwords do not match",
          });
        }

        if (
          input.currentPassword ===
          input.newPassword
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "newPassword",
            ],

            message:
              "Choose a different password",
          });
        }
      },
    );

export type PasswordChangeInput =
  z.infer<
    typeof passwordChangeSchema
  >;