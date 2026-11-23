---
title: "DJs, relays, and recordings"
weight: 54
summary: "Manage live sources, change source priority, and retrieve DJ recordings and their on-air timelines."
seo_title: "DJs, relays, and recordings API | Streaming.Center API"
description: "Manage live sources, change source priority, and retrieve DJ recordings and their on-air timelines."
---

## DJs and relays

Use `?server=1` to filter lists. Public reads use a reduced representation without `ip` and `password`. Send a panel token with DJ permissions for administrative operations.

<div class="api-block" id="api-djs">
<b>Endpoint</b> /api/v2/djs/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List or create DJ sources. Set `server`, `name` and source settings. Direct connections use `port` and `password`.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or manage one source. AutoDJ cannot be deleted.

<div class="api-block" id="api-relays">
<b>Endpoint</b> /api/v2/relays/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List or create relay sources. Set `server`, `name` and `stream_url`.

<div class="api-block">
<b>Endpoint</b> /api/v2/relays/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read, update, or delete a relay.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/toggle/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Toggle the source. Returns the new active flag in `result`.

<div class="api-block">
<b>Endpoint</b> /api/v2/relays/{id}/toggle/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Toggle the relay. Returns the new active flag in `result`.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/rewind/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Rewind AutoDJ. Returns `{"result":"rewind_done"}` or HTTP 400 with a reason in `result`.

<div class="api-block">
<b>Endpoint</b> /api/v2/relays/{id}/start_broadcasting/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

[Schedule a one-time relay](/docs/api/schedule/#api-schedule) starting at the next minute. Optional `timezone` is an IANA zone. Returns `result: success` with Unix seconds in `start_ts`, or `result: error` and `msg: grid_busy`.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/set_priority/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `server` and a `priorities` object mapping DJ IDs to integer priorities. Returns `result: done` and `new_priorities`.

## Source fields

The source object includes `id`, `server`, `name`, `cat` (`auto` for AutoDJ, `real` for an encoder connection, `ws` for web DJ, `server` for a relay), `active`, `priority`, `port`, `stream_url`, `dj_buffer_ms` (milliseconds), `metadata`, `meta_charset`, `volume_change`, and `image`. `connected`, `on_air`, `dt_connect` and `dt_disconnect` describe live connection state. `do_recording` enables recording and `do_recording_hourly` splits files by hour.

## Recordings

<div class="api-block" id="api-dj-recordings">
<b>Endpoint</b> /api/v2/djs/{id}/recordings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Array of MP3 file names, newest first.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/download_recording/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Query parameter `file` is a name from the [recordings list](/docs/api/djs/#api-dj-recordings). Returns the audio attachment.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/recording_air_timeline/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `file` for timing markers. `available` indicates whether markers exist and `events` contains `at_ms` offsets and `on_air` flags.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/delete_recording/<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass the file name in the `file` query parameter. Returns an empty body.

<div class="api-block">
<b>Endpoint</b> /api/v2/djs/{id}/delete_recordings/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `files`, an array of file names. Returns an empty body.

```http
GET /api/v2/djs/7/recording_air_timeline/?file=show.mp3
```

```json
{
  "available": true,
  "events": [
    {
      "at_ms": 1200,
      "on_air": true
    }
  ],
  "recording_type": "raw_input"
}
```
