export type BootstrapApplyTarget = {
  siteKey:
    string;

  databaseName:
    string;

  siteUrl:
    string;
};

export function assertBootstrapApplyConfirmation(
  target:
    BootstrapApplyTarget,

  env:
    Record<
      string,
      string | undefined
    > = process.env,
): void {
  const confirmedSiteKey =
    env
      .CMS_BOOTSTRAP_CONFIRM_SITE_KEY
      ?.trim() ||
    "";

  const confirmedDatabase =
    env
      .CMS_BOOTSTRAP_CONFIRM_DATABASE
      ?.trim() ||
    "";

  const confirmedSiteUrl =
    env
      .CMS_BOOTSTRAP_CONFIRM_SITE_URL
      ?.trim() ||
    "";

  const confirmationPhrase =
    env
      .CMS_BOOTSTRAP_CONFIRM_APPLY
      ?.trim() ||
    "";

  const errors:
    string[] = [];

  if (
    confirmedSiteKey !==
    target.siteKey
  ) {
    errors.push(
      `CMS_BOOTSTRAP_CONFIRM_SITE_KEY must exactly equal "${target.siteKey}".`,
    );
  }

  if (
    confirmedDatabase !==
    target.databaseName
  ) {
    errors.push(
      `CMS_BOOTSTRAP_CONFIRM_DATABASE must exactly equal "${target.databaseName}".`,
    );
  }

  if (
    confirmedSiteUrl !==
    target.siteUrl
  ) {
    errors.push(
      `CMS_BOOTSTRAP_CONFIRM_SITE_URL must exactly equal "${target.siteUrl}".`,
    );
  }

  if (
    confirmationPhrase !==
    "CREATE_EMPTY_SITE"
  ) {
    errors.push(
      'CMS_BOOTSTRAP_CONFIRM_APPLY must exactly equal "CREATE_EMPTY_SITE".',
    );
  }

  if (
    errors.length >
    0
  ) {
    throw new Error(
      [
        "Bootstrap apply confirmation failed.",
        "",
        ...errors,
        "",
        "No database writes were performed by the bootstrap.",
      ].join(
        "\n",
      ),
    );
  }
}
