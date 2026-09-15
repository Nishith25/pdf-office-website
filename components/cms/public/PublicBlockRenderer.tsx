import type {
  CmsBlock,
} from "../../../lib/cms/core/types";

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
  switch (
    block.type
  ) {
    case "hero":
      return (
        <HeroBlock
          data={
            block.data
          }
        />
      );

    case "richText":
      return (
        <RichTextBlock
          data={
            block.data
          }
        />
      );

    case "imageText":
      return (
        <ImageTextBlock
          data={
            block.data
          }
        />
      );

    case "featureGrid":
      return (
        <FeatureGridBlock
          data={
            block.data
          }
        />
      );

    case "cardGrid":
      return (
        <CardGridBlock
          data={
            block.data
          }
        />
      );

    case "stats":
      return (
        <StatsBlock
          data={
            block.data
          }
        />
      );

    case "gallery":
      return (
        <GalleryBlock
          data={
            block.data
          }
        />
      );

    case "logoGrid":
      return (
        <LogoGridBlock
          data={
            block.data
          }
        />
      );

    case "faq":
      return (
        <FaqBlock
          data={
            block.data
          }
        />
      );

    case "cta":
      return (
        <CtaBlock
          data={
            block.data
          }
        />
      );

    case "buttonGroup":
      return (
        <ButtonGroupBlock
          data={
            block.data
          }
        />
      );

    case "download":
      return (
        <DownloadBlock
          data={
            block.data
          }
        />
      );

    case "divider":
      return (
        <DividerBlock
          data={
            block.data
          }
        />
      );

    case "spacer":
      return (
        <SpacerBlock
          data={
            block.data
          }
        />
      );

    default:
      return null;
  }
}