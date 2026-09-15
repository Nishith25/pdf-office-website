import {
  cache,
} from "react";

import {
  buildPublicHomepageModel,
} from "../public/homepage-model";

import {
  getMediaItems,
} from "./media";

import {
  getFaqs,
  getHomePage,
  getHomepageSections,
  getSiteSettings,
  getTools,
} from "./site-content";

export const getPublicHomepageModel =
  cache(
    async () => {
      const [
        page,
        settings,
        sections,
        tools,
        faqs,
        media,
      ] =
        await Promise.all([
          getHomePage(),
          getSiteSettings(),
          getHomepageSections(),
          getTools(),
          getFaqs(),
          getMediaItems(
            250,
          ),
        ]);

      return buildPublicHomepageModel({
        page,
        settings,
        sections,
        tools,
        faqs,
        media,
      });
    },
  );