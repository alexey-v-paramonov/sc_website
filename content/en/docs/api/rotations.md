---
title: "Rotations"
weight: 55
summary: "Create playlist, sequential, and clock rotations and schedule them for broadcast."
seo_title: "Rotations API | Streaming.Center API"
description: "Create playlist, sequential, and clock rotations and schedule them for broadcast."
---

## Rotation endpoints

<div class="api-block" id="api-rotations">
<b>Endpoint</b> /api/v2/rotations/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List rotations with `?server=1` or create a rotation.

<div class="api-block">
<b>Endpoint</b> /api/v2/rotations/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read, update, or delete a rotation. When updating `entries`, send the desired full list and keep IDs of entries you want to update.

<div class="api-block">
<b>Endpoint</b> /api/v2/rotations/{id}/copy/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Optional `new_name`. Returns the new rotation with HTTP 201.

<div class="api-block">
<b>Endpoint</b> /api/v2/rotations/{id}/start_broadcasting/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Optional IANA `timezone`. Returns `{"result":"success","start_ts":1744041660}` with time in seconds, or `result: error` with `msg: grid_busy` or `playlist_empty`.

## Create a rotation

```http
POST /api/v2/rotations/
```

```json
{
  "server": 1,
  "title": "Daytime music",
  "rotation_type": 1,
  "entries": [
    {
      "block_type": 1,
      "position": 0,
      "playlist": 12,
      "weight": 1
    }
  ]
}
```

Successful creation returns HTTP 201 and the rotation object with its `id` and saved `entries`. `rotation_type` is `1` (playlists), `2` (sequential), or `3` (clock). `is_random` enables random selection, `fallback_playlist` is the fallback playlist ID, `is_template` identifies a template, and `on_air` indicates air status.

## Entry fields

`position` sets the order, `weight` affects random selection, and `show_hist` controls history visibility. Clock entries use `clock_offset_seconds` and `clock_duration_seconds` for non-overlapping slots and `timing_mode` of `1` (soft), `2` (strict), or `3` (back-timed).

Set `block_type` to `1` for [a playlist (`playlist`)](/docs/api/playlists/#api-playlist-detail), `2` for [a specific track (`track`)](/docs/api/playlists/#api-music-track), `3` for a random track, `4` for [a jingle (`jingle`)](/docs/api/jingles/#api-jingles), `5` for a jingle block, `6` for [a random jingle (`jingle_category`)](/docs/api/jingles/#api-jingle-categories), `7` for [listener requests](/docs/api/track-requests/#api-track-requests), `9` for a wait, `10` for [category tracks (`filter_category`)](/docs/api/playlists/#api-music-categories), or `11` for [a relay (`relay`)](/docs/api/djs/#api-relays). All referenced content belongs to the station.

Random tracks support `filter_category`, `filter_genre`, `filter_artist`, `filter_folder`, `filter_not_played_hours`, and `filter_added_days`. Wait blocks use one of `wait_minutes`, `wait_until_time`, and `wait_until_minute`. Jingle blocks can combine `jingle_in` or `jingle_category_in`, playlist or track content, and `jingle_out` or `jingle_category_out`. Playlist behavior uses `playlist_track_count`, `play_entire_playlist`, and `play_entire_playlist_in_sequence` as applicable.

Use the [schedule API](/docs/api/schedule/#api-schedule) to place a rotation on the grid at a specific time.

## Rotation example values

The sample creates a playlist rotation on station ID 1. `rotation_type: 1` selects playlist rotation, `block_type: 1` selects a playlist block, `position: 0` puts it first, `playlist: 12` selects playlist ID 12, and `weight: 1` gives it one unit of random selection weight.

- `weight` accepts integers from 1 to 10000. A larger weight makes a block more likely to be selected in a random playlist rotation. Sequential and clock rotations force `is_random` to `false`.
- `clock_offset_seconds` is the slot start after the top of the hour, from 0 (the top of the hour) to 3599 (the last second). `clock_duration_seconds` is a positive slot length. Their sum can be at most 3600 seconds, the end of the hour.
- `wait_minutes` waits a positive number of minutes. `wait_until_time` waits for a clock time. `wait_until_minute` waits for a minute of the hour from 0 to 59. Supply exactly one for a wait block.
