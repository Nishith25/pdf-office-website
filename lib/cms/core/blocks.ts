export function normalizeCmsBlockOrder<
  T extends {
    order:
      number;
  },
>(
  blocks:
    readonly T[],
): T[] {
  return [
    ...blocks,
  ]
    .sort(
      (
        a,
        b,
      ) =>
        a.order -
        b.order,
    )
    .map(
      (
        block,
        index,
      ) => ({
        ...block,

        order:
          index +
          1,
      }),
    );
}