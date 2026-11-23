---
title: "Jingles and intros"
weight: 56
summary: "Manage jingle audio, scheduling rules, jingle blocks, and listener connection intros."
seo_title: "Jingles and intros API | Streaming.Center API"
description: "Manage jingle audio, scheduling rules, jingle blocks, and listener connection intros."
---

## Jingles

<div class="api-block" id="api-jingles">
<b>Endpoint</b> /api/v2/jingles/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List station jingles with `server` and optional `remote=1`, or create a jingle record. Use the [media upload endpoint](/docs/api/playlists/#api-media-upload) to upload audio.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read and manage the jingle. Properties include `server`, `author`, `title`, `album`, `genre`, `length`, `samplerate`, and read-only `path`, `categories`, and `audio_format`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/{id}/regions/<br/>
<b>HTTP methods</b> PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Set playback or mix markers in seconds with `playback_start_time`, `playback_end_time`, `mix_in_time`, and `mix_out_time`. Returns the markers and `effective_duration`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/{id}/waveform/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Both methods return waveform bytes as `application/octet-stream`. POST regenerates the waveform first. If generation fails, it returns HTTP 400 with `result: waveform_generation_failed`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/{id}/download/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Audio attachment for a local file, or redirect to a remote file.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/tree/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

`server` selects the station. Returns `{"tree":[...]}` containing folders and jingle entries.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/add_dir/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server_id`, `parent_dir`, `new_dir`. Returns the updated tree.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/remove/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server_id`, file IDs in `files` and directory paths in `directories`. Returns the updated tree.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/remote_file/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server` and remote audio URL `path`. Optional metadata includes `author`, `title`, `album`. Returns `{}` on success.

## Categories, rules, and blocks

<div class="api-block" id="api-jingle-categories">
<b>Endpoint</b> /api/v2/jingle_categories/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List or create categories. Send `server`, `name`, and optional `directory_name`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_categories/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read, update, or delete a category.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_schemes/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List or create jingle rules. Fields include `server`, `cat`, `jingle`, `random_category`, [`playlist`](/docs/api/playlists/#api-playlist-detail), `hour`, `minute`, `break_track`, `active`, `stop_track`, `show_hist`, `is_ad`, `do_mix`, `mix_level`, and time-window fields.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_schemes/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read, update, or delete a rule.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_blocks/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List or create blocks with `server`, `title`, optional `jingle_in` and `jingle_out` or their random categories, and optional `playlist` or [`track`](/docs/api/playlists/#api-playlist-track-detail). Send `repeat_days` (weekday numbers mapped to arrays of hours), `minute` and optional IANA `timezone`. The read-only `repeat_schedule` shows saved slots.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_blocks/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read, update, or delete a block.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_schemes/{id}/toggle/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Toggle a rule. Returns `result` (enabled) and `is_currently_active` (active in its date window).

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_blocks/{id}/toggle/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Toggle a block. Returns `result` and `is_currently_active`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_schemes/{id}/reorder/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server` and zero-based `position`. Returns `id` and `position`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingle_blocks/{id}/reorder/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server` and zero-based `position`. Returns `id` and `position`.

<div class="api-block">
<b>Endpoint</b> /api/v2/jingles/blocks/import_calendar/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Calendar integration credential<br/>
</div>

Replaces all jingle blocks for the station. Each slot requires `id`, `url`, `slot_number`, `weekday`, `hour`, `minute`, and `timezone`. Optional fields are `artist`, `title`, `album`, `length`, `samplerate`, and `is_ad`. Requires the calendar integration’s `Authorization` credential, `server_id` and a `slots` array. Returns `{}` when accepted.

## Connection intros

The intro management endpoints accept a panel token or API key. Filter collections with `?server=1`.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/files/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List intro files or upload multipart `original_file` with `server` and `name`. Optional booleans include `enabled`, `is_default`, and `is_ad`. The response includes `uploaded_at`, `encoding_status`, `duration` in seconds and `stream_url`.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/files/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read, update, or delete a file.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/files/{id}/set_default/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Toggle this file as the station’s default. Selecting it clears any other file or group default. Returns the updated file object.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/files/{id}/stream/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Stream the original audio file.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/groups/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List groups or create one with `server`, `name`, and optional `is_default`. Returns groups with embedded `files`.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/groups/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read, update, or delete a group.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/groups/{id}/add_file/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Send `intro_file` (file ID). Returns the group.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/groups/{id}/remove_file/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Send `intro_file` (file ID). Returns the group.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/groups/{id}/set_default/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Toggle this group as the station’s default. Selecting it clears any other file or group default. Returns the group.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/slots/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List or create intro schedule slots.

<div class="api-block">
<b>Endpoint</b> /api/v2/intros/slots/{id}/<br/>
<b>HTTP methods</b> GET, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read or delete one slot. Use the [schedule save endpoint](/docs/api/jingles/#api-intro-schedule-save) to change a slot.

<div class="api-block" id="api-intro-schedule-save">
<b>Endpoint</b> /api/v2/intros/slots/save/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Send `server`, a `slots` array, and optional `timezone` as a fallback when the station has no time zone to replace the station’s schedule atomically. Returns the saved slot array.

Each slot has `time_start`, `time_end`, `days` (seven characters, Monday first, `1` for an active day), and `play_mode`. Use `single` with `intro_file` or `random` with `intro_group`. `enabled` controls whether the slot is used.

```http
POST /api/v2/intros/slots/save/
```

```json
{
  "server": 1,
  "timezone": "Europe/Helsinki",
  "slots": [
    {
      "server": 1,
      "time_start": "08:00:00",
      "time_end": "12:00:00",
      "days": "1111100",
      "play_mode": "single",
      "intro_file": 4,
      "enabled": true
    }
  ]
}
```

## Jingle rules and intro values

| Field or parameter | Meaning |
| --- | --- |
| `cat` | `hourly` each hour, `daily` at a daily time, `time_interval` at minute intervals inside the time window, `break` after a track interval, `request` before a listener request, `playlist` before a playlist starts. |
| `hour`, `minute`, `weekday` | Clock hour 0–23 and minute 0–59. Weekdays are `0` Monday through `6` Sunday, in calendar order. The keys of `repeat_days` use the same weekday numbering. |
| `break_track`, `time_interval_minute` | Number of tracks between inserts for a track interval, or minutes between inserts for a timed interval, respectively. `time_interval_start_ts` and `time_interval_end_ts` are clock times for the window. |
| `mix_level` | Mix level from 0 to 100 percent, applied when `do_mix` is enabled. |
| `encoding_status` | `pending` when encoding is incomplete or has yet to start, `ready` when the encoded versions are ready. |

The intro example uses station ID 1 and intro file ID 4. `08:00:00` and `12:00:00` are local start and end times, and `1111100` enables Monday through Friday. An intro slot may cross midnight when its end is earlier than its start.
