---
title: "Version 3.32.0: New admin panel and upgraded social streaming"
date: 2026-10-15
seo_title: "Streaming.Center 3.32.0: New Admin Panel and Social Streaming"
description: "Version 3.32.0 brings redesigned admin and reseller panels, upgraded social streaming, two-factor authentication, account hooks, and detailed resource statistics."
---

Streaming.Center version 3.32.0 has been released: new admin page, upgraded social network streaming.

- Redesigned the admin and reseller panels to match the broadcaster panel’s look and feel.
- Added two-factor authentication and recovery codes for admins and resellers.
- Added an admin-only control to restart all radio stations.
- Added reseller branding with custom copyright text and white-label attribution.
- Added configurable backup defaults for new broadcasters. Scheduled backups are disabled and quick backups are enabled by default.
- Made backups faster and reduced temporary disk-space usage.
- Added detailed CPU, RAM, swap, and disk statistics, including per-core usage, top resource-consuming processes, and filesystem breakdowns.
- Added account hooks for admins and resellers, supporting webhooks and scripts for account creation, updates, suspension, reactivation, and termination.
- Added account-level HLS permissions, allowing admins to enable or disable HLS for broadcasters and resellers.
- Added HLS settings to the WHMCS module.
- Expanded social streaming with multiple destinations, custom RTMP/RTMPS endpoints, image or video backgrounds, and current-track cover art and title overlays.
- Added configurable social-stream limits for broadcaster accounts, reseller accounts, and account templates.
- Updated the WHMCS module for the new social-streaming settings. **Updating the WHMCS module is required.**
- Made large media libraries much faster to browse, search, and select files across playlists, jingles, categories, and rotation folder selectors.
- Added drag-and-drop ordering for jingle schedules and blocks.
- Modernized embedded players, removed the simple player’s jQuery dependency, and improved support for multiple players on one page.
- Added a feedback form in the broadcaster panel.
- Fixed FLAC encoding memory corruption and improved FLAC reconnection reliability.
- Improved custom-domain setup, SSL certificate handling, and installation and update reliability.
