---
title: "Stations and social streaming"
weight: 53
summary: "Manage stations, start and stop AutoDJ, and configure social streaming destinations."
seo_title: "Stations and social streaming API | Streaming.Center API"
description: "Manage stations, start and stop AutoDJ, and configure social streaming destinations."
---

## Stations

A station ID is the `server` value used in [channel](/docs/api/channels/#api-channels), [playlist](/docs/api/playlists/#api-playlists), and [schedule requests](/docs/api/schedule/#api-schedule). Station list, detail, and first-station reads are public. Other station operations require a panel token with the appropriate permissions or a valid API key. Social streaming configuration uses a panel token.

<div class="api-block" id="api-stations">
<b>Endpoint</b> /api/v2/servers/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT or API key.<br/>
</div>

List stations or create a station with a unique `title`. Optional fields include `genre`, `description`, `url_address`, `icq`, `minisite_display`, `default`, and image upload `image`. Creation returns the station with HTTP 201.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT or API key.<br/>
</div>

Read, update, or delete a station. The default station and the last station cannot be deleted.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/first/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

First station in the panel.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/{id}/countries/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Country counts aggregated from live channels of the station.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/{id}/start/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Start the station. Returns `result` equal to `started` or `running`.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/{id}/stop/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Stop the station. Returns `{"result":"stopped"}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/{id}/toggle_hls/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Toggle HLS. Returns `hls_enabled`. HTTP 403 with `detail: hls_not_allowed` means HLS is unavailable.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/ftp_folders/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Sorted array of FTP directory paths.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/jingle_folders/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Pass `server` to get paths in the station’s jingle directory.

<div class="api-block">
<b>Endpoint</b> /api/v2/servers/media_folders/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Pass `server` to get paths in the station’s media directory.

## Example

```http
POST /api/v2/servers/1/start/
```

```json
{
  "result": "started"
}
```

A station response includes runtime fields `is_running`, `timezone_name`, `hls_enabled`, `ptt_enabled`, `ptt_available`, `calls_enabled`, `calls_available`, and `new_version_available`.

## Social streaming

<div class="api-block">
<b>Endpoint</b> /api/v2/social-ingests/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List destinations with `?server=1` or create one with `server`, `platform`, and `server_url`.

<div class="api-block">
<b>Endpoint</b> /api/v2/social-ingests/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read, update, or delete a destination. `status` reflects the engine state and is read-only.

<div class="api-block">
<b>Endpoint</b> /api/v2/social-ingests/limits/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Account-wide allowance, including `limit`, `used` and `enableable_ids`. A null limit means unlimited.

<div class="api-block">
<b>Endpoint</b> /api/v2/social-ingests/presets/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Returns `presets` for supported platforms, `editable_fields` with value ranges and `field_defaults`.

Use `label` for the panel label, `stream_key` for the platform’s stream key, and `enabled` to activate the destination. `audio_only` selects audio-only mode where supported. In video mode, `asset` is an uploaded background, `cover_enabled` and `title_enabled` control overlays, and `base_color` and `title_color` use hex colors. `profile_overrides` supplies permitted encoding overrides.

The `platform` values are `youtube`, `rutube`, `vk`, `telegram`, `facebook`, `tiktok`, `instagram`, `twitch`, `mixcloud`, `ok`, `x`, and `custom`. The response includes `effective_profile` (the resulting encoding settings), `audio_only_supported`, `encoder_editable`, and any uploaded asset’s dimensions and duration.
