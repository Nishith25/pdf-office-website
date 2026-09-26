type CmsStructuredPath =
  readonly (
    | string
    | number
  )[];

type CmsStructuredRecord =
  Record<
    string,
    unknown
  >;

type CmsStructuredRepeaterBlockType =
  | "featureGrid"
  | "cardGrid"
  | "stats"
  | "gallery"
  | "logoGrid"
  | "faq"
  | "buttonGroup";

function isRecord(
  value:
    unknown,
): value is CmsStructuredRecord {
  return (
    typeof value ===
      "object" &&
    value !==
      null &&
    !Array.isArray(
      value,
    )
  );
}

function itemHasId(
  value:
    unknown,

  itemId:
    string,
): boolean {
  return (
    isRecord(
      value,
    ) &&
    value.id ===
      itemId
  );
}

export function createCmsStructuredRepeaterItem(
  type:
    CmsStructuredRepeaterBlockType,

  id:
    string,
): CmsStructuredRecord {
  switch (
    type
  ) {
    case "featureGrid":
      return {
        id,

        eyebrow:
          "",

        title:
          "",

        description:
          "",

        icon:
          "",

        image:
          "",

        badge:
          "",

        linkLabel:
          "",

        linkUrl:
          "",
      };

    case "cardGrid":
      return {
        id,

        title:
          "",

        description:
          "",

        image:
          "",

        icon:
          "",

        badge:
          "",

        linkLabel:
          "",

        linkUrl:
          "",
      };

    case "stats":
      return {
        id,

        value:
          "",

        label:
          "",

        description:
          "",
      };

    case "gallery":
      return {
        id,

        image:
          "",

        altText:
          "",

        caption:
          "",
      };

    case "logoGrid":
      return {
        id,

        image:
          "",

        name:
          "",

        url:
          "",
      };

    case "faq":
      return {
        id,

        question:
          "",

        answer:
          "",
      };

    case "buttonGroup":
      return {
        id,

        label:
          "",

        url:
          "",

        style:
          "primary",

        target:
          "same-tab",
      };

    default: {
      const exhaustiveCheck:
        never =
          type;

      throw new Error(
        `Unsupported structured repeater block type: ${exhaustiveCheck}`,
      );
    }
  }
}

export function updateCmsStructuredField<
  T extends object,
>(
  data:
    T,

  path:
    CmsStructuredPath,

  value:
    unknown,
): T {
  const clone =
    structuredClone(
      data,
    );

  if (
    path.length ===
    0
  ) {
    return clone;
  }

  let current:
    unknown =
      clone;

  for (
    let index =
      0;
    index <
      path.length -
        1;
    index +=
      1
  ) {
    const key =
      path[
        index
      ];

    if (
      Array.isArray(
        current,
      )
    ) {
      if (
        typeof key !==
        "number"
      ) {
        return clone;
      }

      current =
        current[
          key
        ];

      continue;
    }

    if (
      isRecord(
        current,
      )
    ) {
      if (
        typeof key !==
        "string"
      ) {
        return clone;
      }

      current =
        current[
          key
        ];

      continue;
    }

    return clone;
  }

  const finalKey =
    path[
      path.length -
        1
    ];

  if (
    Array.isArray(
      current,
    )
  ) {
    if (
      typeof finalKey !==
        "number"
    ) {
      return clone;
    }

    current[
      finalKey
    ] =
      value;

    return clone;
  }

  if (
    isRecord(
      current,
    ) &&
    typeof finalKey ===
      "string"
  ) {
    current[
      finalKey
    ] =
      value;
  }

  return clone;
}

export function appendCmsStructuredRepeaterItem<
  T extends object,
>(
  data:
    T,

  collectionKey:
    string,

  item:
    CmsStructuredRecord,
): T {
  const clone =
    structuredClone(
      data,
    );

  const record =
    clone as CmsStructuredRecord;

  const collection =
    record[
      collectionKey
    ];

  if (
    !Array.isArray(
      collection,
    )
  ) {
    return clone;
  }

  record[
    collectionKey
  ] = [
    ...collection,

    structuredClone(
      item,
    ),
  ];

  return clone;
}

export function updateCmsStructuredRepeaterItemField<
  T extends object,
>(
  data:
    T,

  collectionKey:
    string,

  itemId:
    string,

  path:
    CmsStructuredPath,

  value:
    unknown,
): T {
  const clone =
    structuredClone(
      data,
    );

  const record =
    clone as CmsStructuredRecord;

  const collection =
    record[
      collectionKey
    ];

  if (
    !Array.isArray(
      collection,
    )
  ) {
    return clone;
  }

  const itemIndex =
    collection.findIndex(
      (
        item,
      ) =>
        itemHasId(
          item,
          itemId,
        ),
    );

  if (
    itemIndex ===
    -1
  ) {
    return clone;
  }

  const item =
    collection[
      itemIndex
    ];

  if (
    !isRecord(
      item,
    )
  ) {
    return clone;
  }

  collection[
    itemIndex
  ] =
    updateCmsStructuredField(
      item,
      path,
      value,
    );

  return clone;
}

export function removeCmsStructuredRepeaterItem<
  T extends object,
>(
  data:
    T,

  collectionKey:
    string,

  itemId:
    string,
): T {
  const clone =
    structuredClone(
      data,
    );

  const record =
    clone as CmsStructuredRecord;

  const collection =
    record[
      collectionKey
    ];

  if (
    !Array.isArray(
      collection,
    )
  ) {
    return clone;
  }

  record[
    collectionKey
  ] =
    collection.filter(
      (
        item,
      ) =>
        !itemHasId(
          item,
          itemId,
        ),
    );

  return clone;
}

export function moveCmsStructuredRepeaterItem<
  T extends object,
>(
  data:
    T,

  collectionKey:
    string,

  itemId:
    string,

  direction:
    | "up"
    | "down",
): T {
  const clone =
    structuredClone(
      data,
    );

  const record =
    clone as CmsStructuredRecord;

  const collection =
    record[
      collectionKey
    ];

  if (
    !Array.isArray(
      collection,
    )
  ) {
    return clone;
  }

  const index =
    collection.findIndex(
      (
        item,
      ) =>
        itemHasId(
          item,
          itemId,
        ),
    );

  if (
    index ===
    -1
  ) {
    return clone;
  }

  const nextIndex =
    direction ===
      "up"
      ? index - 1
      : index + 1;

  if (
    nextIndex <
      0 ||
    nextIndex >=
      collection.length
  ) {
    return clone;
  }

  const currentItem =
    collection[
      index
    ];

  const nextItem =
    collection[
      nextIndex
    ];

  collection[
    index
  ] =
    nextItem;

  collection[
    nextIndex
  ] =
    currentItem;

  return clone;
}