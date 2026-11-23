---
title: "Track requests"
weight: 57
summary: "Submit, list, and moderate listener song requests."
seo_title: "Track requests API | Streaming.Center API"
description: "Submit, list, and moderate listener song requests."
---

<a id="api-track-requests"></a>

## Submit a request

```http
POST /api/v2/track_requests/
```

```json
{
  "server_id": 1,
  "music_id": 40,
  "person": "Alex",
  "message": "For the evening show"
}
```

`server_id` is the station ID and `music_id` is the [music library ID](/docs/api/playlists/#api-music-track). `person` and `message` are optional strings. No login is required. The station applies its configured [request intervals](/docs/api/website/#api-track-request-widget) and [moderation mode](/docs/api/settings/#api-station-settings-detail). HTTP 201 returns the saved request. HTTP 400 can report `bad_params`, `ip_blocked`, `track_blocked`, or field validation errors.

## Read and moderate requests

<div class="api-block">
<b>Endpoint</b> /api/v2/track_requests/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Filter by `server`. `with_name=true` and `with_message=true` are the defaults and exclude blank fields. Pass `false` to include blanks. Supply `show_pending=1` to include unplayed requests.

<div class="api-block">
<b>Endpoint</b> /api/v2/track_requests/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Get a request, edit its fields, or delete it. Writes require [panel authorization](/docs/api/auth/#api-panel-sign-in).

<div class="api-block">
<b>Endpoint</b> /api/v2/track_requests/{id}/approve/<br/>
<b>HTTP methods</b> PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Mark the request as moderated. Returns `{}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/track_requests/clear/<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `?server=1` to remove unplayed requests for the station.

The request object includes `id`, `server`, `person`, `message`, `moderated`, the nested `all_music` track, and `dttm` and `played_at` timestamps in Unix milliseconds. `played_at` is null until playback. Public GET responses omit `src_ip`.

## Request filters and example IDs

The example sends `server_id: 1` for station ID 1 and `music_id: 40` for library track ID 40. For `with_name` and `with_message`, `true` excludes empty values and `false` includes them. Omit `show_pending` to exclude unplayed requests, or pass `show_pending=1` to include them. Any nonempty query value for `show_pending`, including `0`, includes unplayed records.
