---
title: "Version 3.34.1: Live DJ reliability and scheduling improvements"
date: 2026-11-17
seo_title: "Streaming.Center 3.34.1: Live DJ and scheduling improvements"
description: "Version 3.34.1 improves live DJ reliability, jingle scheduling, audio processing, calls, playback and statistics."
---

Streaming.Center version 3.34.1 brings improvements to live broadcasts, scheduling and audio processing.

- More reliable live DJ broadcasts: Improved DJ buffering and recovery from audio stalls and extended network interruptions, helping keep live shows on air.
- Jingle scheduling: Added a setting to play all jingles scheduled for the same time, with improved handling of scheduling collisions.
- Audio processing: Added separate silence thresholds for the start and end of tracks. Loudness is now measured directly by the media indexer, replacing the external LoudGain process.
- Push-to-talk and calls: Improved microphone audio handling for push-to-talk and added a choice of audio output device for call hosts. Fixed duplicate track history entries during push-to-talk.
- Playback and scheduling: Unplayable tracks are skipped so rotations can continue. Improved playlist duration calculations and added safeguards around destructive schedule actions.
- Streaming connections: Improved reconnection behavior for external channels and source connections.
- Statistics: Improved listener-session collection and repair, and added support for identifying listeners behind proxied Shoutcast 2 connections.
- Critical Nginx vulnerability closed (CVE-2026-123007)
