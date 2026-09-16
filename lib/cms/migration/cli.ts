export type GenericCmsMigrationCliOptions = {
  mode:
    | "preview"
    | "apply";

  apply:
    boolean;
};

export function parseGenericCmsMigrationCliArgs(
  args:
    readonly string[],
): GenericCmsMigrationCliOptions {
  for (
    const argument of
    args
  ) {
    if (
      argument !==
      "--apply"
    ) {
      throw new Error(
        `Unknown migration argument: ${argument}`,
      );
    }
  }

  const apply =
    args.includes(
      "--apply",
    );

  return {
    mode:
      apply
        ? "apply"
        : "preview",

    apply,
  };
}