---
title: "Shoutcast v2 protocol support"
date: 2026-06-01
weight: 24
summary: "Learn how Streaming.Center supports SHOUTcast 2 live DJ broadcasting with station logos and track covers from compatible source clients."
seo_title: "SHOUTcast 2 Live Streaming with Track Covers | Streaming.Center"
description: "Learn how Streaming.Center automatically detects SHOUTcast and Icecast DJ connections, and how SHOUTcast 2 sends station logos and track covers."
---

# Live DJ broadcasting now supports SHOUTcast 2 with track covers

  Streaming.Center supports live DJ connections using SHOUTcast 1.x, SHOUTcast 2.x (Ultravox 2.1), and Icecast protocols.
  The platform detects the incoming protocol automatically, making it compatible with virtually all streaming source clients.

  In addition to broadcasting audio and song information, compatible source clients can send image metadata with the live
  stream. This includes the station logo and cover for the currently playing track.

  When a track cover is received, Streaming.Center automatically makes it available throughout the platform, including:

  - Current-track and station-status widgets
  - Recently played and stream-history widgets
  - Embedded website players
  - Mobile applications and other integrations using the Streaming.Center API

  ## How track covers are selected

  **SHOUTcast 2** supports two independent image types:

  - Station image — your station logo or another permanent branding image
  - Playing track cover — the cover associated with the current song or programme

  Streaming.Center uses the playing track’s cover whenever one is provided. If the source client sends only a station image,
  the station logo is used as the fallback. If neither image is available, the normal default cover is displayed.

  When the next track begins and its cover arrives, the displayed image and history entry are updated automatically.

  ## Compatible broadcasting software

  The following source clients have documented support for sending SHOUTcast 2 image metadata.

  ### Station logo and per-track covers

  - RadioBOSS — can send the station logo and cover for the playing track. Enable SHOUTcast 2 as the server type and turn
    on the playing-artwork option in the encoder settings. Make sure your music files contain embedded cover images.
    [RadioBOSS broadcasting guide](https://manual.djsoft.net/radioboss/en/broadcasting_internet_radio.htm)

  - Winamp with the SHOUTcast Source DSP — supports both stream branding and covers extracted from the playing file. On the
    DSP’s Artwork tab, enable “Send in-stream artwork,” then select the playing-file and stream-branding options you want to
    use. [SHOUTcast Source DSP artwork documentation](https://www.unix.dog/~agris/winamp/Src/Plugins/DSP/dsp_sc/docs/Source_DSP_Plug-in.html)

  - ProppFrexx ONAIR — sends the current track’s cover and can fall back to the station logo. Select SHOUTcast 2, specify
    the stream ID if the application requires one, and enable the Artwork option. [ProppFrexx ONAIR documentation](https://www.proppfrexx.radio42.com/download/ProppFrexx%20ONAIR%20UserManual%20v4.0.pdf)

  - MB STUDIO — supports both station logos and covers for songs or programmes. Select the SHOUTcast 2 encoder and activate
    “Send Cover.” [MB STUDIO in-stream cover guide](https://www.mbradio.it/en/support/help/1056-webcast-mb-studio-in-stream-cover-logo-and-cover)

  ### Station images

  - Rocket Broadcaster — its native SHOUTcast 2/Ultravox mode supports station images. Select the actual SHOUTcast 2
    protocol, not SHOUTcast 1 compatibility mode. [Rocket Broadcaster SHOUTcast 2 documentation](https://www.rocketbroadcaster.com/streaming-audio-server/rocket-broadcaster-1.2-with-shoutcast-2.html)

  - Jazler SOHO — supports embedding the station logo in a SHOUTcast 2 stream. In Streaming Encoders, edit the encoder and
    enable “Send station logo image in stream.” Jazler SOHO manual
    (https://support.jazler.com/downloads/Manual-JazlerSOHO-en.pdf)

  Other encoders may support SHOUTcast 2 audio and ordinary title metadata without supporting image metadata. Look
  specifically for settings named “in-stream artwork,” “playing artwork,” “send cover,” or “station artwork.”

  ## Connecting your DJ software

  Create or open your DJ account in the Streaming.Center control panel and use the connection details shown there:

  - Server: your Streaming.Center server hostname
  - Port: the DJ connection port
  - Password: the DJ account password
  - Protocol: SHOUTcast 2 or Ultravox 2.1
  - Audio format: MP3

  If the source client asks for a Stream ID or SID, use its default value—normally 1. Streaming.Center does not require a
  separate DJ user ID for authentication.

  Be sure to select native SHOUTcast 2 mode. Options such as “SHOUTcast 1,” “legacy SHOUTcast,” or “SHOUTcast 1 with SID” can
  send audio and song titles but cannot transfer embedded track covers.

  ## Track cover recommendations

  For reliable results:

  - Embed a cover image in each audio file.
  - Enable playing-artwork transmission in the source client.
  - Configure a station logo as a fallback.
  - Use JPEG or PNG where possible.
  - Keep each image below 511 KiB for maximum source-client compatibility.
  - Use square covers, ideally between 500×500 and 1500×1500 pixels.

  Streaming.Center also accepts SHOUTcast 2 JPEG, PNG, GIF and BMP cover images within the protocol size limit.

  ## Existing DJ connections remain supported

  This update does not remove or replace the existing connection methods. DJs can continue broadcasting through Icecast and
  SHOUTcast 1.x as before.

  However, binary station logos and per-track cover images are a SHOUTcast 2 feature. For automatic track cover transfer directly
  inside the live stream, the source client must connect using native SHOUTcast 2/Ultravox and have image metadata enabled.
