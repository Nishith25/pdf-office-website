# GAMENEXA CMS — PDF Office

PDF Office is powered by the reusable GAMENEXA CMS architecture.

The project combines a site-specific theme with a generic structured content management system built with Next.js, TypeScript, MongoDB and Cloudinary.

## Architecture

Each GAMENEXA website has:

- one deployment
- one MongoDB database
- one primary administrator
- one isolated admin session identity
- one isolated Cloudinary media folder
- one site profile
- the shared V2 structured CMS core
- a site-specific public theme

The current PDF Office profile is defined in:

`site.config.ts`

Runtime configuration is resolved through:

`lib/site/config.ts`

## PDF Office

Current defaults:

- Site key: `pdf-office`
- Database: `pdf_office_website`
- Admin subject: `pdf-office-admin`
- Media folder: `pdf-office`
- Theme: `pdf-office-product-editorial`

Environment variables can override deployment-specific identity values.

See `.env.example`.

## Development

Install dependencies:

`npm ci`

Run locally:

`npm run dev`

Production build:

`npm run build`

Run tests:

`npm test`

Run the complete local release check:

`npm run verify:release`

## CMS Verification

Verify the existing generic CMS:

`npm run cms:verify`

Verify structured V2 CMS blocks:

`npm run cms:blocks:verify`

Verify the GAMENEXA site:

`npm run site:bootstrap:verify`

## Creating a New GAMENEXA Website

Configure a separate deployment using values such as:

- `SITE_KEY=gps-maps`
- `SITE_NAME=GPS Maps`
- `SITE_SHORT_NAME=GPS Maps`
- `SITE_URL=https://example.com`
- `SITE_MEDIA_FOLDER=gps-maps`
- `MONGODB_DB=gps_maps_website`

Preview the target database before creating anything:

`npm run site:bootstrap:preview`

Preview mode is read-only.

For an existing site the bootstrap must report:

`EXISTING SITE DETECTED — bootstrap apply would be refused.`

Only for a brand-new empty database, after reviewing the preview and setting the bootstrap administrator credentials, initialize it with:

`npm run site:bootstrap:apply`

Never run the bootstrap apply command against an existing production website.

## Structured CMS Blocks

The CMS uses schema version 2 structured blocks.

Supported blocks:

- hero
- richText
- imageText
- featureGrid
- cardGrid
- stats
- gallery
- logoGrid
- faq
- cta
- buttonGroup
- download
- divider
- spacer

Public rendering consumes normalized V2 data directly.

## Production

The public website includes:

- dynamic CMS metadata
- dynamic sitemap generation
- robots directives
- baseline security headers
- public 404 and runtime error handling
- GitHub CI
- Vercel deployment verification

The admin area is available under `/admin`.

## Safety

Do not commit `.env.local`, credentials, API secrets or database connection credentials.

`.env.example` contains variable names only and is safe to commit.

## GPS Maps Deployment

GPS Maps uses the shared GAMENEXA CMS codebase but must run as an isolated deployment.

Expected GPS production profile:

- site key: `gps-maps`
- database: `gps_maps_website`
- media folder: `gps-maps`
- theme: `gps-maps-navigation`
- admin session subject: `gps-maps-admin`

Use `.env.gps.example` as the deployment variable checklist.

Before initializing a new site, inspect the resolved configuration:

`npm run site:config`

Then run only the read-only bootstrap preview:

`npm run site:bootstrap:preview`

The preview must show the intended GPS site and database and must report:

`EMPTY SITE — ready for bootstrap apply.`

Bootstrap apply has an additional safety lock. Apply mode requires exact confirmation of:

- site key
- database name
- site URL
- `CREATE_EMPTY_SITE` confirmation phrase

The bootstrap still refuses any database that already contains CMS or administrator records.

Never reuse the PDF Office database for GPS Maps.
