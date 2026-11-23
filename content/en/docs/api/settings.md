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

## Setting values

| Field or parameter | Meaning |
| --- | --- |
| `crossfade_mode` | `1` fade out the first track and fade in the next, `2` fade out with next track at normal volume, `3` first track ends at normal volume and next fades in, `4` mix without fades. |
| `autodj_resume_mode` | `0` continue where playback stopped, `1` resume with the next track. |
| `random_mode` | `1` choose by score, `2` choose from a shuffled permutation. |
| `request_moderation` | `0` allow all, `1` premoderate, `2` registered-users-only setting. |
| `stereotool_status` | `0` off, `1` on, `2` turning on, `3` turning off, `4` error. `stereotool_status_debug` provides diagnostic text. |
| `status` in URL branding | `0` inactive, `1` configuring, `2` active, `3` DNS error, `4` Apache error, `5` TLS error, `6` nginx error, `7` panel error, `8` stream error, `9` other error. `ip` is the target host address and `branded_url` is the configured hostname. |

In the PATCH example, 3 is the settings record ID. The strings `"3.25"` and `"1.50"` set transitions of 3.25 seconds between tracks and 1.50 seconds between DJ sources, respectively.

### Audio, metadata, and library settings

- `trim_silence` enables silence trimming. `trim_silence_db` and `trim_silence_end_db` set start and end thresholds for tracks. `jingle_trim_silence_start_db` and `jingle_trim_silence_end_db` set the thresholds for jingles. All thresholds are −80 to −20 dB and default to −40 dB.
- `dc_blocker_enabled` enables the DC filter. `eq_enabled` enables the equalizer. Fields `m_eq_frequency_0` through `m_eq_frequency_9` set gain in dB for 31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, and 16000 Hz, respectively. Zero means no gain adjustment.
- `normalize_volume` normalizes track levels. `emergency_restart` restarts a stopped station. `jingles_play_all_colliding` plays all jingles scheduled for the same time.
- `djname_in_metadata` includes the presenter’s name. `dj_caption` is the fallback for a live connection without metadata. `playlist_meta_empty` is the fallback when the playlist is empty. `use_static_metadata` enables the fixed `static_metadata` text. `output_meta_format` formats stream metadata, and `request_meta_format` formats metadata for requested tracks.
- `playlist_creating_dirs` creates playlists from folders. `jingles_create_dirs` creates jingle groups from folders. `set_missing_tags` fills missing tags, and `search_cover_art` enables cover lookup. `media_server` selects the library station by ID and `playlist_files_per_page` controls the playlist page size in the panel.
- `request_notification_email` receives request notifications. `tunein_station_id`, `tunein_partner_id`, and `tunein_partner_key` are the TuneIn station ID, partner ID, and partner key. `timezone_name` is an IANA zone. `timezones_available` lists the zones offered by the panel.

`library_rescan_state` is `never` when there is no previous rescan, `scheduled` when a request awaits completion, and `completed` when the latest request has finished. `library_rescan_requested_at` and `library_rescan_completed_at` are UTC timestamps. `library_rescan_next_allowed_at` is the next time a rescan can be requested.
