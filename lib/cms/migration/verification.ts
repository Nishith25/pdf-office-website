export type GenericCmsVerificationState = {
  homepageCount:
    number;

  homepage:
    {
      id:
        string;

      status:
        string;
    } | null;

  blocks:
    Array<{
      pageId:
        string;

      order:
        number;
    }>;

  settingsPresent:
    boolean;

  headerMenuPresent:
    boolean;

  footerMenuPresent:
    boolean;

  invalidPageReferences:
    string[];

  draftPageReferences:
    string[];

  legacyCollectionsReadable:
    boolean;
};

export type GenericCmsVerificationResult = {
  valid:
    boolean;

  errors:
    string[];
};

export function verifyGenericCmsState(
  state:
    GenericCmsVerificationState,
): GenericCmsVerificationResult {
  const errors:
    string[] = [];

  if (
    state.homepageCount !==
    1
  ) {
    errors.push(
      `Expected exactly one CMS homepage, found ${state.homepageCount}.`,
    );
  }

  if (
    !state.homepage ||
    state.homepage.status !==
      "published"
  ) {
    errors.push(
      "CMS homepage must be published.",
    );
  }

  if (
    state.blocks.length ===
    0
  ) {
    errors.push(
      "CMS homepage must contain at least one block.",
    );
  }

  const sortedOrders =
    state.blocks
      .map(
        (
          block,
        ) =>
          block.order,
      )
      .sort(
        (
          a,
          b,
        ) =>
          a - b,
      );

  const contiguous =
    sortedOrders.every(
      (
        order,
        index,
      ) =>
        order ===
        index + 1,
    );

  if (
    state.blocks.length >
      0 &&
    !contiguous
  ) {
    errors.push(
      "CMS homepage block order is not contiguous.",
    );
  }

  if (
    !state.settingsPresent
  ) {
    errors.push(
      "Global CMS settings are missing.",
    );
  }

  if (
    !state.headerMenuPresent
  ) {
    errors.push(
      "Assigned header menu is missing.",
    );
  }

  if (
    !state.footerMenuPresent
  ) {
    errors.push(
      "Assigned footer menu is missing.",
    );
  }

  if (
    state
      .invalidPageReferences
      .length >
    0
  ) {
    errors.push(
      "Menu contains missing page references.",
    );
  }

  if (
    state
      .draftPageReferences
      .length >
    0
  ) {
    errors.push(
      "Menu contains draft page references.",
    );
  }

  if (
    !state
      .legacyCollectionsReadable
  ) {
    errors.push(
      "Legacy collections could not be verified.",
    );
  }

  return {
    valid:
      errors.length ===
      0,

    errors,
  };
}