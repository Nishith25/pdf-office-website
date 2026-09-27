# GAMENEXA Generic CMS Setup

## Purpose

GAMENEXA CMS is a reusable single-admin content management system.

The same CMS core can power multiple independent websites without sharing their production content or administrator sessions.

Each website uses:

- its own deployment
- its own MongoDB database
- its own administrator
- its own JWT session subject
- its own Cloudinary media folder
- its own identity configuration
- its own public theme
- the shared structured CMS core

## Site Configuration

The repository contains a default site profile:

`site.config.ts`

The runtime configuration layer is:

`lib/site/config.ts`

Deployment environment variables can override the site profile.

Important variables:

- `SITE_KEY`
- `SITE_NAME`
- `SITE_SHORT_NAME`
- `SITE_TAGLINE`
- `SITE_URL`
- `SITE_THEME_KEY`
- `SITE_MEDIA_FOLDER`
- `SITE_ADMIN_LOGO_URL`
- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_SESSION_SECRET`

## Database Isolation

The shared database layer does not contain a PDF Office database fallback.

The selected database comes from:

`getSiteConfig().databaseName`

Examples:

- PDF Office → `pdf_office_website`
- GPS Maps → `gps_maps_website`

## Authentication Isolation

Each site derives its own JWT subject from the site key.

Examples:

- `pdf-office` → `pdf-office-admin`
- `gps-maps` → `gps-maps-admin`

A session issued for one GAMENEXA website should not validate as the administrator session for another site.

## Media Isolation

Cloudinary uploads use the configured site media folder.

Examples:

- `pdf-office`
- `gps-maps`

## Fresh Website Bootstrap

Before initializing a new database:

`npm run site:bootstrap:preview`

Preview mode performs no writes.

If CMS or administrator records already exist, the bootstrap reports:

`EXISTING SITE DETECTED — bootstrap apply would be refused.`

For a genuinely new empty database only, configure:

- `CMS_BOOTSTRAP_ADMIN_EMAIL`
- `CMS_BOOTSTRAP_ADMIN_PASSWORD`

Then run:

`npm run site:bootstrap:apply`

The bootstrap creates:

- one published homepage
- one V2 hero block
- header navigation
- footer navigation
- global CMS settings
- one primary administrator
- required indexes

Never run bootstrap apply against an established production database.

## Verification

Run the site-level verifier:

`npm run site:bootstrap:verify`

Verify generic CMS state:

`npm run cms:verify`

Verify all CMS blocks use structured V2 data:

`npm run cms:blocks:verify`

## Structured Block Migration

For older databases only, preview structured block conversion:

`npm run cms:blocks:preview`

Do not run the apply command unless preview explicitly reports blocks that require migration and the database has been reviewed.

For the current PDF Office production database, all homepage blocks are already V2.

## Release Verification

Run:

`npm run verify:release`

This runs lint, tests and the production build.

Database verification commands remain separate because they require access to the target MongoDB deployment.
