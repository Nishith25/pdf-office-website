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

  switch (
    block.type
  ) {
    case "hero":
      return (
        <HeroBlock
          data={
            data
          }
        />
      );

    case "richText":
      return (
        <RichTextBlock
          data={
            data
          }
        />
      );

    case "imageText":
      return (
        <ImageTextBlock
          data={
            data
          }
        />
      );

    case "featureGrid":
      return (
        <FeatureGridBlock
          data={
            data
          }
        />
      );

    case "cardGrid":
      return (
        <CardGridBlock
          data={
            data
          }
        />
      );

    case "stats":
      return (
        <StatsBlock
          data={
            data
          }
        />
      );

    case "gallery":
      return (
        <GalleryBlock
          data={
            data
          }
        />
      );

    case "logoGrid":
      return (
        <LogoGridBlock
          data={
            data
          }
        />
      );

    case "faq":
      return (
        <FaqBlock
          data={
            data
          }
        />
      );

    case "cta":
      return (
        <CtaBlock
          data={
            data
          }
        />
      );

    case "buttonGroup":
      return (
        <ButtonGroupBlock
          data={
            data
          }
        />
      );

    case "download":
      return (
        <DownloadBlock
          data={
            data
          }
        />
      );

    case "divider":
      return (
        <DividerBlock
          data={
            data
          }
        />
      );

    case "spacer":
      return (
        <SpacerBlock
          data={
            data
          }
        />
      );

    default:
      return null;
  }
}