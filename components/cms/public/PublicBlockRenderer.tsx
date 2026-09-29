import type {
  ReactNode,
} from "react";

import type {
  CmsBlock,
} from "../../../lib/cms/core/types";

import {
  normalizeCmsBlockData,
} from "../../../lib/cms/core/block-data-normalizer";

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
            normalizeCmsBlockData(
              "hero",
              block.data,
            )
          }
        />
      );
      break;

    case "richText":
      content = (
        <RichTextBlock
          data={
            normalizeCmsBlockData(
              "richText",
              block.data,
            )
          }
        />
      );
      break;

    case "imageText":
      content = (
        <ImageTextBlock
          data={
            normalizeCmsBlockData(
              "imageText",
              block.data,
            )
          }
        />
      );
      break;

    case "featureGrid":
      content = (
        <FeatureGridBlock
          data={
            normalizeCmsBlockData(
              "featureGrid",
              block.data,
            )
          }
        />
      );
      break;

    case "cardGrid":
      content = (
        <CardGridBlock
          data={
            normalizeCmsBlockData(
              "cardGrid",
              block.data,
            )
          }
        />
      );
      break;

    case "stats":
      content = (
        <StatsBlock
          data={
            normalizeCmsBlockData(
              "stats",
              block.data,
            )
          }
        />
      );
      break;

    case "gallery":
      content = (
        <GalleryBlock
          data={
            normalizeCmsBlockData(
              "gallery",
              block.data,
            )
          }
        />
      );
      break;

    case "logoGrid":
      content = (
        <LogoGridBlock
          data={
            normalizeCmsBlockData(
              "logoGrid",
              block.data,
            )
          }
        />
      );
      break;

    case "faq":
      content = (
        <FaqBlock
          data={
            normalizeCmsBlockData(
              "faq",
              block.data,
            )
          }
        />
      );
      break;

    case "cta":
      content = (
        <CtaBlock
          data={
            normalizeCmsBlockData(
              "cta",
              block.data,
            )
          }
        />
      );
      break;

    case "buttonGroup":
      content = (
        <ButtonGroupBlock
          data={
            normalizeCmsBlockData(
              "buttonGroup",
              block.data,
            )
          }
        />
      );
      break;

    case "download":
      content = (
        <DownloadBlock
          data={
            normalizeCmsBlockData(
              "download",
              block.data,
            )
          }
        />
      );
      break;

    case "divider":
      content = (
        <DividerBlock
          data={
            normalizeCmsBlockData(
              "divider",
              block.data,
            )
          }
        />
      );
      break;

    case "spacer":
      content = (
        <SpacerBlock
          data={
            normalizeCmsBlockData(
              "spacer",
              block.data,
            )
          }
        />
      );
      break;
  }

  return (
    <div
      className="pdf-block"
      data-cms-block={
        block.type
      }
      data-cms-schema-version="2"
    >
      {
        content
      }
    </div>
  );
}
