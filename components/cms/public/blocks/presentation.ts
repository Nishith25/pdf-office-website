export type CmsPublicPresentation = {
  background:
    | "default"
    | "muted"
    | "contrast"
    | "accent";

  width:
    | "narrow"
    | "standard"
    | "wide"
    | "full";

  spacing:
    | "compact"
    | "normal"
    | "spacious";

  alignment:
    | "left"
    | "center";

  variant:
    string;
};

export function cmsPresentationClassName(
  presentation:
    CmsPublicPresentation,

  ...baseClasses:
    string[]
): string {
  return [
    ...baseClasses,

    "pdf-presentation",

    `pdf-bg-${presentation.background}`,

    `pdf-width-${presentation.width}`,

    `pdf-spacing-${presentation.spacing}`,

    `pdf-align-${presentation.alignment}`,

    `pdf-variant-${presentation.variant}`,
  ]
    .filter(
      Boolean,
    )
    .join(
      " ",
    );
}
