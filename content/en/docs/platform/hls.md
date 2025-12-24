---
weight: 50
title: "HLS Streaming"
summary: "Learn how HLS streaming works on our internet radio control panel, its benefits, limitations, and how it differs from traditional Icecast/SHOUTcast setups."
seo_title: "HLS Streaming Explained – Internet Radio Platform Guide"
description: "Discover how our internet radio control panel uses proper HLS chunked streaming for adaptive audio delivery, and understand its pros, cons, and technical differences from Icecast."
---

## HLS Streaming on Our Internet Radio Platform

HTTP Live Streaming (HLS) is an adaptive bitrate streaming protocol developed by Apple. It works by breaking the audio stream into small **.ts (MPEG-TS) chunks**, typically 2–10 seconds long, and serving them via standard HTTP (or HTTPS). A **master playlist** (`.m3u8`) dynamically lists available stream variants (e.g., 64 kbps, 128 kbps, 256 kbps), allowing players to switch quality in real time based on network conditions.

### ✅ Pros of HLS
- **Adaptive bitrate**: Listeners automatically get the best quality their connection can handle.
- **Firewall-friendly**: Uses standard HTTP(S), so it works everywhere - including mobile networks and strict corporate firewalls.
- **Scalable**: Easily served via CDNs and standard web servers.

### ⚠️ Cons of HLS
- **Latency**: Due to chunking and buffering, HLS typically adds **10–30 seconds of delay**, making it unsuitable for real-time interaction.
- **No real-time listener stats**: Unlike Icecast or SHOUTcast, HLS is delivered over HTTP like regular web files - **there’s no built-in way to count concurrent listeners** or track who’s tuned in.
- **Geo-blocking limitations**: Since HLS chunks are served like static files, traditional IP-based geo-restriction at the stream level **doesn’t work** in our setup.

### Clarifying HLS Misconceptions

Many confuse two types of `.m3u` playlists:
- **Static playlist**: A simple list of unrelated streams (e.g., `http://radio.com:8080/stream_128`, `http://radio.com:8080/stream_64`).
- **True HLS**: A **chunked, segmented live stream** with time-sliced audio (`.ts` files) and dynamic quality switching.

**Our control panel uses the correct, standards-compliant HLS** - live audio is split into short chunks, not a static playlist.

{{< lightbox "/images/hls/en/hls.png" "/images/hls/en/hls.png" >}}

Additionally:
- **MP3 and AAC streams are kept separate**: You’ll get distinct HLS URLs for MP3 and AAC - never mixed.
- **Multiple Icecast/SHOUTcast sources?** If you have several encoders or servers running different bitrates (e.g., 64, 128, 256 kbps), our system **combines them into a single HLS master link**. The player then auto-selects the best stream based on bandwidth.

This modern approach ensures broad compatibility - especially on iOS, Android, and web players - while delivering a smooth, adaptive listening experience.