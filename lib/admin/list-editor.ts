export function moveArrayItem<T>(
  items:
    readonly T[],

  fromIndex:
    number,

  toIndex:
    number,
): T[] {
  const result =
    [
      ...items,
    ];

  if (
    fromIndex < 0 ||
    fromIndex >=
      result.length ||
    toIndex < 0 ||
    toIndex >=
      result.length ||
    fromIndex ===
      toIndex
  ) {
    return result;
  }

  const [
    item,
  ] =
    result.splice(
      fromIndex,
      1,
    );

  if (
    item ===
    undefined
  ) {
    return result;
  }

  result.splice(
    toIndex,
    0,
    item,
  );

  return result;
}