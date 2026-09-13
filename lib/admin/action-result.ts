export type AdminActionResult = {
  success: boolean;
  message: string;
};

export type FormattedAdminActionResult = {
  tone:
    | "success"
    | "error";
  message: string;
};

export function formatAdminActionResult(
  result:
    | AdminActionResult
    | null,
): FormattedAdminActionResult | null {
  if (!result) {
    return null;
  }

  return {
    tone:
      result.success
        ? "success"
        : "error",

    message:
      result.message,
  };
}