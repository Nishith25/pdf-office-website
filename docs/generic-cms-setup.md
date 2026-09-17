# Generic CMS Setup

This project uses a reusable single-admin CMS architecture.

Each website should use:

- one deployment,
- one database,
- one primary admin,
- one site-specific theme,
- the shared generic CMS core.

## Structured Block Data

CMS block data is moving from the original string/list representation to structured version 2 data.

Preview the conversion:

```bash
npm run cms:blocks:preview