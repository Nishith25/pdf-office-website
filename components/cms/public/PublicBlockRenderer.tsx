import type {
  ReactNode,
} from "react";

import type {
  CmsBlock,
} from "../../../lib/cms/core/types";

import {
  projectCmsBlockDataForLegacyRenderer,
} from "../../../lib/cms/public/legacy-render-projection";

import ButtonGroupBlock from "./blocks/ButtonGroupBlock";
import CardGridBlock from "./blocks/CardGridBlock";
import CtaBlock from "./blocks/CtaBlock";
import DividerBlock from "./blocks/DividerBlock";
import DownloadBlock from "./blocks/DownloadBlock";
import FaqBlock from "./blocks/FaqBlock";
import FeatureGridBlock from "./blocks/FeatureGridBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import HeroBlock from "./blocks/HeroBlock";
import ImageTextBlock from "./blocks/ImageTextBlock";
import LogoGridBlock from "./blocks/LogoGridBlock";
import RichTextBlock from "./blocks/RichTextBlock";
import SpacerBlock from "./blocks/SpacerBlock";
import StatsBlock from "./blocks/StatsBlock";

export default function PublicBlockRenderer({
  block,
}: {
  block:
    CmsBlock;
}) {
  const data =
    projectCmsBlockDataForLegacyRenderer(
      block.type,
      block.data,
    );

  let content:
    ReactNode =
      null;

  switch (
    block.type
  ) {
    case "hero":
      content = (
        <HeroBlock
          data={
            data
          }
        />
      );
      break;

    case "richText":
      content = (
        <RichTextBlock
          data={
            data
          }
        />
      );
      break;

    case "imageText":
      content = (
        <ImageTextBlock
          data={
            data
          }
        />
      );
      break;

    case "featureGrid":
      content = (
        <FeatureGridBlock
          data={
            data
          }
        />
      );
      break;

    case "cardGrid":
      content = (
        <CardGridBlock
          data={
            data
          }
        />
      );
      break;

    case "stats":
      content = (
        <StatsBlock
          data={
            data
          }
        />
      );
      break;

    case "gallery":
      content = (
        <GalleryBlock
          data={
            data
          }
        />
      );
      break;

    case "logoGrid":
      content = (
        <LogoGridBlock
          data={
            data
          }
        />
      );
      break;

    case "faq":
      content = (
        <FaqBlock
          data={
            data
          }
        />
      );
      break;

    case "cta":
      content = (
        <CtaBlock
          data={
            data
          }
        />
      );
      break;

    case "buttonGroup":
      content = (
        <ButtonGroupBlock
          data={
            data
          }
        />
      );
      break;

    case "download":
      content = (
        <DownloadBlock
          data={
            data
          }
        />
      );
      break;

    case "divider":
      content = (
        <DividerBlock
          data={
            data
          }
        />
      );
      break;

    case "spacer":
      content = (
        <SpacerBlock
          data={
            data
          }
        />
      );
      break;
  }

  return (
    <div
      className="pdf-block"
      data-pdf-block={
        block.type
      }
    >
      {
        content
      }
    </div>
  );
}
