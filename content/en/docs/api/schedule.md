---
title: "Scheduler"
date: 2026-04-08T12:00:00+03:00
weight: 52
seo_title: "Scheduler API for Internet Radio | Streaming.Center"
description: "Documentation for the Streaming.Center scheduler API: retrieving schedule events, creating, updating, deleting, and clearing the broadcast schedule."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> GET - not required, POST - required<br/>
<b>GET query parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
<b>start_ts:</b> range start as Unix timestamp<br/>
<b>end_ts:</b> range end as Unix timestamp<br/>
<b>utc:</b> optional flag, `1` if `start_ts` and `end_ts` are passed in UTC<br/>
</div>

This endpoint lets you retrieve scheduler events for a selected time range and create new schedule events.

#### How the GET list works

When you request the event list, the API:

- loads events for the selected server;
- expands periodic events into real occurrences by weekday and week-of-month rules;
- automatically calculates `finish_date`, `finish_time`, and `end_ts` based on the next event or the end of a radioshow;
- may add a service event representing the end of a radioshow when `playlist_after_radioshow` or `rotation_after_radioshow` is configured.

#### Example: GET

Get the scheduler for server ID 1 within a specific range:

{{< highlight python  >}}

import requests

response = requests.get(
    "https://demo.streaming.center:1030/api/v2/grid/?server=1&start_ts=1744041600&end_ts=1744646400&utc=1"
)
print(response.json())

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

[
  {
    "id": 10,
    "server": 1,
    "name": "Morning show",
    "periodicity": "onetime",
    "cast_type": "radioshow",
    "break_track": true,
    "start_playlist_from_beginning": true,
    "start_date": "2026-04-08",
    "start_time": "08:00:00",
    "finish_date": "2026-04-08",
    "finish_time": "10:00:00",
    "wd_mon": false,
    "wd_tue": false,
    "wd_wed": false,
    "wd_thu": false,
    "wd_fri": false,
    "wd_sat": false,
    "wd_sun": false,
    "week_1": false,
    "week_2": false,
    "week_3": false,
    "week_4": false,
    "playlist": 2,
    "playlist_after_radioshow": 1,
    "rotation_after_radioshow": null,
    "dj": null,
    "rotation": null,
    "allow_jingles": true,
    "allow_song_requests": true,
    "allow_jingles_after": true,
    "allow_song_requests_after": true,
    "color": "#87c95f",
    "color2": "#a2e47a",
    "local_time": "08:00:00",
    "timezone": "Europe/Moscow",
    "parent_id": null,
    "start_ts": 1744099200,
    "start_ts_utc_readable": "2026-04-08T05:00:00Z",
    "end_ts": 1744106400
  },
  {
    "id": null,
    "server": 1,
    "name": "All music",
    "periodicity": "onetime",
    "cast_type": "playlist",
    "break_track": false,
    "start_playlist_from_beginning": true,
    "start_date": "2026-04-08",
    "start_time": "10:00:00",
    "finish_date": "2026-04-08",
    "finish_time": "12:00:00",
    "playlist": 1,
    "playlist_after_radioshow": null,
    "rotation_after_radioshow": null,
    "dj": null,
    "rotation": null,
    "allow_jingles": true,
    "allow_song_requests": true,
    "allow_jingles_after": false,
    "allow_song_requests_after": false,
    "color": "#a2e47a",
    "color2": null,
    "local_time": "10:00:00",
    "timezone": "UTC",
    "parent_id": 10,
    "start_ts": 1744106400,
    "start_ts_utc_readable": "2026-04-08T07:00:00Z",
    "end_ts": 1744113600
  }
]

{{< / highlight >}}

#### Event object fields

- id: event ID. For service events marking the end of a radioshow, this may be `null`.
- server: radio server ID.
- name: event name.
- periodicity: event periodicity type, `onetime` or `periodic`.
- cast_type: event mode. The model uses `playlist`, `radioshow`, `relay`, and `rotation`.
- break_track: whether the current track should be interrupted when the event starts.
- start_playlist_from_beginning: whether to start the playlist from the beginning.
- start_date: event start date.
- start_time: event start time.
- finish_date: event finish date.
- finish_time: event finish time.
- wd_mon: repeat on Monday.
- wd_tue: repeat on Tuesday.
- wd_wed: repeat on Wednesday.
- wd_thu: repeat on Thursday.
- wd_fri: repeat on Friday.
- wd_sat: repeat on Saturday.
- wd_sun: repeat on Sunday.
- week_1: first week of the month enabled.
- week_2: second week of the month enabled.
- week_3: third week of the month enabled.
- week_4: fourth week of the month enabled.
- playlist: playlist ID if the event starts a playlist or a radioshow playlist.
- playlist_after_radioshow: playlist ID that should start after a radioshow.
- rotation_after_radioshow: rotation ID that should start after a radioshow.
- dj: DJ ID if the event is associated with a DJ.
- rotation: rotation ID.
- allow_jingles: whether jingles are allowed during the event.
- allow_song_requests: whether song requests are allowed during the event.
- allow_jingles_after: whether jingles are allowed after a radioshow.
- allow_song_requests_after: whether song requests are allowed after a radioshow.
- color: primary event color.
- color2: secondary event color, usually used for the post-radioshow continuation.
- local_time: local event time.
- timezone: event timezone.
- parent_id: parent radioshow event ID for automatically generated ending events.
- start_ts: event start time as Unix timestamp.
- start_ts_utc_readable: event start time as a readable UTC datetime.
- end_ts: event end time as Unix timestamp.

#### Periodic event behavior

If `periodicity=periodic`, the event is expanded in the list according to selected `wd_*` weekdays and `week_1` ... `week_4` month-week flags. If a matching `onetime` event exists at the same time, the `onetime` event takes priority and the periodic occurrence is omitted from the response.

#### Example: POST

Create a one-time event that starts a playlist:

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.post(
    "https://demo.streaming.center:1030/api/v2/grid/",
    headers=headers,
    json={
        "server": 1,
        "name": "Morning playlist",
        "periodicity": "onetime",
        "cast_type": "playlist",
        "break_track": True,
        "start_playlist_from_beginning": True,
        "start_date": "2026-04-08",
        "start_time": "08:00:00",
        "playlist": 2,
        "local_time": "08:00:00",
        "timezone": "Europe/Moscow",
        "color": "#87c95f"
    }
)

print(response.json())

{{< / highlight >}}

#### POST parameters

Main parameters used when creating a scheduler event:

- server: required radio server ID.
- name: required event name.
- periodicity: required periodicity type, `onetime` or `periodic`.
- cast_type: required event mode.
- break_track: whether the current track should be interrupted.
- start_playlist_from_beginning: whether the playlist should start from the beginning.
- start_date: required start date for a `onetime` event.
- start_time: required start time.
- finish_date: optional finish date.
- finish_time: optional finish time.
- wd_mon, wd_tue, wd_wed, wd_thu, wd_fri, wd_sat, wd_sun: weekdays for a `periodic` event.
- week_1, week_2, week_3, week_4: enabled month weeks for a `periodic` event.
- playlist: playlist ID.
- playlist_after_radioshow: playlist ID after a radioshow.
- rotation_after_radioshow: rotation ID after a radioshow.
- dj: DJ ID.
- rotation: rotation ID.
- allow_jingles: allow jingles.
- allow_song_requests: allow song requests.
- allow_jingles_after: allow jingles after a radioshow.
- allow_song_requests_after: allow song requests after a radioshow.
- color: primary event color in hex format.
- color2: secondary event color in hex format.
- local_time: local event time.
- timezone: event timezone.

#### Event validation

When creating or updating an event, the API validates model constraints and may return these validation errors:

- `repeat_week_days_not_set`: no weekday selected for a `periodic` event.
- `repeat_weeks_not_set`: no month week selected for a `periodic` event.
- `playlist_required`: the event requires a playlist, but `playlist` is empty.
- `time_slot_busy`: the selected slot is already occupied by another event.

On success, the API returns the created event object as JSON.

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/:id/<br/>
<b>HTTP method:</b> GET, PUT, DELETE <br/>
<b>Authentication:</b> GET - not required, PUT and DELETE - required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> scheduler event ID<br/>
</div>

Lets you retrieve one event, update it, or delete it.

#### Example: GET

{{< highlight python  >}}

import requests

response = requests.get(
    "https://demo.streaming.center:1030/api/v2/grid/10/"
)
print(response.json())

{{< / highlight >}}

The response returns one event object with the same fields as in the list response.

#### Example: PUT

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.put(
    "https://demo.streaming.center:1030/api/v2/grid/10/",
    headers=headers,
    json={
        "id": 10,
        "server": 1,
        "name": "Morning show updated",
        "periodicity": "onetime",
        "cast_type": "radioshow",
        "break_track": True,
        "start_playlist_from_beginning": True,
        "start_date": "2026-04-08",
        "start_time": "08:30:00",
        "playlist": 2,
        "playlist_after_radioshow": 1,
        "allow_jingles": True,
        "allow_song_requests": True,
        "allow_jingles_after": True,
        "allow_song_requests_after": True,
        "local_time": "08:30:00",
        "timezone": "Europe/Moscow",
        "color": "#87c95f",
        "color2": "#a2e47a"
    }
)

print(response.json())

{{< / highlight >}}

For `PUT`, you will typically send the full event object. The API returns the updated event.

#### Example: DELETE

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
    "https://demo.streaming.center:1030/api/v2/grid/10/",
    headers=headers
)

print(response.status_code)

{{< / highlight >}}

If deletion succeeds, the endpoint returns HTTP status `204 No Content`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/clear/<br/>
<b>HTTP method:</b> DELETE <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
</div>

Deletes all scheduler events for the selected server.

#### Example request

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
    "https://demo.streaming.center:1030/api/v2/grid/clear/?server=1",
    headers=headers
)
print(response.json())

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
  "result": "ok"
}

{{< / highlight >}}

#### Practical note for list requests

For `GET /api/v2/grid/`, it is best to always pass `server`, `start_ts`, and `end_ts` together. In this form the endpoint can correctly build the calendar range, expand periodic events, and filter out events that fall outside the requested interval.