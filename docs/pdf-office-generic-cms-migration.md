# PDF Office Generic CMS Migration

## Overview

PDF Office has been migrated from the legacy site-specific CMS structure to the reusable generic CMS.

The public website now renders from:

- `cms_pages`
- `cms_blocks`
- `cms_menus`
- `cms_settings`

Legacy collections are intentionally preserved for rollback.

## Legacy Collections Preserved

- `site_content`
- `site_pages`
- `site_sections`
- `tools`
- `faqs`
- `site_settings`
- `media`
- `activity_log`

The generic migration does not delete or modify these collections.

## Migration Commands

Preview the migration without making database changes:

```bash
npm run cms:migrate:preview