---
title: "Version 3.34.0: Listener chat, calls, push-to-talk and new statistics"
date: 2026-11-03
seo_title: "Streaming.Center 3.34.0: Chat, Calls, Push-to-Talk and Statistics"
description: "Version 3.34.0 adds listener chat, listener calls, push-to-talk over any source, a new Statistics section with music, show and ad audience reports, intro ad delivery counts, and removes PHP from Apache."
---

Streaming.Center version 3.34.0 has been released: listener chat, listener calls, push-to-talk, new statistics, and more.

- Added listener chat: listener accounts, chat rooms, direct messages, moderation tools and an embeddable chat widget. A default chat room is created for every station.
- Added push-to-talk: speak over any source (AutoDJ, live DJ or relay) from the broadcaster panel, with microphone boost and limiter. Enabled by default and can be switched off per station.
- Added listener calls: listeners can call the station from a call widget, and the broadcaster can take calls on air from the new Calls panel, with call log, caller blocking, cooldown and who-can-call settings.
- Added a new Statistics section: Overview, Live listeners, Audience, Music & shows, Ads and Royalties, with per-channel and per-protocol filters, ranges up to today, and CSV/Excel export for every report.
- Statistics collects every listener session directly in AutoDJ for Icecast, Icecast-KH, Shoutcast v1/v2 and HLS: unique listeners, listening hours, average and peak audience, geography, devices and players, time of day, and listening-time distribution.
- Music & shows and Ads reports show the real audience of every track, show, DJ, playlist, rotation, jingle and ad block, based on the exact on-air time.
- Apache no longer runs PHP to improve security: new installations do not install the Apache PHP module and updates disable it. PHP-FPM and AWStats keep working.
