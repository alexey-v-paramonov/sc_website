---
title: "Station settings and access"
weight: 69
summary: "Configure AutoDJ, account options, API keys, FTP users, and listener access rules."
seo_title: "Station settings and access API | Streaming.Center API"
description: "Configure AutoDJ, account options, API keys, FTP users, and listener access rules."
---

## Station and account settings

[Use a panel JWT](/docs/api/auth/#api-panel-sign-in) with the appropriate settings permissions. [`server_settings`](/docs/api/settings/#api-station-settings) and [`stereo_tool_settings`](/docs/api/settings/#api-stereo-tool-settings) refer to configuration records. Read the list with `?server=1` to obtain the record ID for updates.

<div class="api-block">
<b>Endpoint</b> /api/v2/settings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Installation and account feature flags, including HLS, podcast, website, text-to-speech, realtime, and demo availability.

<div class="api-block">
<b>Endpoint</b> /api/v2/global_settings/<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET returns the global key/value settings and account `email`. PUT accepts `statistic_password`, `language`, and `email`, returning HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/copyright_settings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Branding with `logo`, `copyright`, `copyright_mode`, and optional `favicon`.

<div class="api-block">
<b>Endpoint</b> /api/v2/url_branding_settings/<br/>
<b>HTTP methods</b> GET, PUT, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read branded URL settings, set `branded_url`, or clear the branded hostname. Successful PUT returns HTTP 204.

<div class="api-block" id="api-station-settings">
<b>Endpoint</b> /api/v2/server_settings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List station configurations.

<div class="api-block" id="api-station-settings-detail">
<b>Endpoint</b> /api/v2/server_settings/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read or update AutoDJ settings. Returns the configuration.

<div class="api-block">
<b>Endpoint</b> /api/v2/server_settings/{id}/rescan_library/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Request a full library rescan. Returns the station configuration with rescan timestamps. Use [`POST /api/v2/music/rescan_files/`](/docs/api/playlists/#api-music-rescan) to request reanalysis of selected files.

<div class="api-block" id="api-stereo-tool-settings">
<b>Endpoint</b> /api/v2/stereo_tool_settings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List station Stereo Tool configurations.

<div class="api-block">
<b>Endpoint</b> /api/v2/stereo_tool_settings/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read or update `stereotool_enabled`, `stereotool_key` and the uploaded `stereotool_settings` file. Response includes `stereotool_status`, `stereotool_status_debug` and `master_stereo_tool_enabled`.

`crossfade_track` and `crossfade_dj` are decimal seconds from 0 to 60 for track and live transitions. Other settings include `crossfade_mode`, `autodj_resume_mode`, `random_mode`, `same_artist_interval`, `normalize_volume`, `trim_silence` and its thresholds, `timezone_name`, [`ptt_enabled`](/docs/api/calls/#api-realtime-tickets), `output_meta_format`, `static_metadata`, and [`request_moderation`](/docs/api/track-requests/#api-track-requests). `server`, `library_rescan_requested_at`, and `library_rescan_completed_at` are read-only.

```http
PATCH /api/v2/server_settings/3/
```

```json
{
  "crossfade_track": "3.25",
  "crossfade_dj": "1.50"
}
```

## API keys and FTP

<div class="api-block" id="api-api-keys">
<b>Endpoint</b> /api/v2/api_keys/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List metadata or create a key with `name` and optional `expiry_date` (ISO 8601). The full `key` is returned only at creation, with HTTP 201.

<div class="api-block">
<b>Endpoint</b> /api/v2/api_keys/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read, update, or remove a key. Records include `created`, `name`, `revoked`, `is_currently_active` and `expiry_date`.

<div class="api-block" id="api-ftp-users">
<b>Endpoint</b> /api/v2/ftpusers/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List or create FTP users with `username`, `password`, and `homedir` relative to the account’s FTP root. The response omits the password.

<div class="api-block">
<b>Endpoint</b> /api/v2/ftpusers/{username}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Use the [full username returned by creation](/docs/api/settings/#api-ftp-users). The login name cannot be changed.

<div class="api-block">
<b>Endpoint</b> /api/v2/ftp_password/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `username` and new `password`. Returns `{}` on success.

## Stream access and blocking

<div class="api-block" id="api-stream-access">
<b>Endpoint</b> /api/v2/authlisteners/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List or create stream access records. Send `server`, a unique access `token` for the listener, and optionally `username` and `active`. The record includes access `token`, `created`, and `last_connection_ts`, plus `listen_links` for authenticated streaming channels.

<div class="api-block">
<b>Endpoint</b> /api/v2/authlisteners/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Manage a stream access record. These records are used by the channel’s [Icecast authentication callback](/docs/api/channels/#api-icecast-auth).

<div class="api-block">
<b>Endpoint</b> /api/v2/ip_blocking/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List or create station geoblocking settings. Use `?server=1` to retrieve settings for a station, initializing its configuration if necessary.

<div class="api-block">
<b>Endpoint</b> /api/v2/ip_blocking/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read or manage the configuration. Include `block_mode`: 0 disables, 1 blocks listed countries, 2 allows listed countries. Updates accept `countries` (country codes) and `channels` ([channel IDs](/docs/api/channels/#api-channels) mapped to booleans). Send the complete country list when changing settings.

<div class="api-block">
<b>Endpoint</b> /api/v2/ip_blocking_ip/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List or add IP entries. Create with `server` and `ip_or_mask` containing an IP address or CIDR.

<div class="api-block">
<b>Endpoint</b> /api/v2/ip_blocking_ip/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read, update, or delete an IP entry.
