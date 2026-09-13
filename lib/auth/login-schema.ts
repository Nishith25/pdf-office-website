import {
  z,
} from "zod";

export const loginSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email(
        "Enter a valid email address",
      ),

    password: z
      .string()
      .min(
        8,
        "Password is required",
      )
      .max(
        200,
        "Password is too long",
      ),
  });

export type LoginInput =
  z.infer<
    typeof loginSchema
  >;