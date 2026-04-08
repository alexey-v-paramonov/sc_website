---
title: "Playlists"
date: 2024-08-22T11:37:29+03:00
weight: 50
seo_title: "Internet Radio Playlist API | Streaming.Center Documentation"
description: "Complete guide to managing internet radio playlists programmatically with Streaming.Center. Learn how to create, update, copy playlists, add tracks, and work with the AllMusic library API."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
</div>

This API lets you manage playlists for your station.

#### Example: GET

Get all playlists for server ID 1:

{{< highlight python  >}}

import requests
API_KEY = "your_api_key"

headers = {"SC-API-KEY": API_KEY}

response = requests.get(
  "https://demo.streaming.center:1030/api/v2/playlists/?server=1",
  headers=headers
)
print(response.json())

{{< / highlight >}}

#### Example response
{{< highlight json  >}}

[
   {
      "id":1,
      "duration":9244067,
      "playlist_files_per_page":1000,
      "tracks_num":55,
      "name":"All music",
      "is_default":true,
      "is_random":true,
      "on_air":false,
      "directory_name":"",
      "current_track_order":-9,
      "server":1
   },
   {
      "id":2,
      "duration":9240712,
      "playlist_files_per_page":1000,
      "tracks_num":54,
      "name":"Morning shows",
      "is_default":false,
      "is_random":false,
      "on_air":true,
      "directory_name":"",
      "current_track_order":43,
      "server":1
   }
]
{{< / highlight >}}

#### Description

This endpoint returns an array of your playlists. Each playlist contains the following properties:

- id: unique playlist ID.
- duration: playback duration in milliseconds.
- playlist_files_per_page: special setting limiting how many playlist tracks are shown on one page in the admin web interface.
- tracks_num: number of tracks in the playlist.
- name: playlist name.
- is_default: whether this is the default playlist for the server. Default playlists cannot be deleted. All uploaded music is added to the default playlist, which is used as a fallback when AutoDJ has nothing else to play.
- is_random: whether the playlist is shuffled or played sequentially.
- on_air: `true` if this playlist is currently on air.
- directory_name: indicates whether the playlist was created from a synced server directory.
- current_track_order: current playback position inside the playlist.
- server: current server ID.

#### Example: POST

Create a playlist on server ID 1:

{{< highlight python  >}}

import requests
API_KEY = "your_api_key"

headers = {"SC-API-KEY": API_KEY}

response = requests.post(
    "https://demo.streaming.center:1030/api/v2/playlists/", 
    headers=headers, 
    json={"name":"New playlist","is_random":True,"server":1}
)

if response.ok:
    print("The playlist was created successfully")
    newly_created_playlist = response.json()

{{< / highlight >}}

To create a playlist, send the following JSON payload:

- name: new playlist name.
- is_random: pass `true` if the playlist should be shuffled.
- server: integer radio server ID.

#### Example: POST request for importing an M3U playlist file

To import an M3U file, first upload the actual audio files to the server using FTP or the web interface. Then send a **POST** request with `Content-Type` set to `multipart/form-data`:

{{< highlight python  >}}
import requests

API_KEY = "your_api_key"

headers = {"SC-API-KEY": API_KEY}

m3u_file = "import.m3u"
data = {
    "name":"m3u import",
    "is_random":True,
    "server":1
}
files = {
    'm3u': (m3u_file, open(m3u_file, 'rb'),)
}
response = requests.post(
    "https://demo.streaming.center:1030/api/v2/playlists/", 
    headers=headers, 
    data=data,
    files=files
)

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/<br/>
<b>HTTP method:</b> GET, PUT, DELETE <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Lets you retrieve a specific playlist with **GET**, update it with **PUT**, or delete it with **DELETE**.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/add_tracks_ordered/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

#### Example payload:

```[40, 52, 7]```

Adds tracks to a playlist. You must pass an array of `AllMusic` track IDs. The order of the IDs matters: tracks are inserted in the exact order in which they appear in the payload.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/start_broadcasting/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Schedules the playlist to start playing at the next full minute. For example, if you call this API at 11:30:25, a scheduler event will be created for 11:31. No payload is required.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/copy/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> source playlist ID<br/>
</div>

Creates a copy of the playlist together with its tracks.

#### Example payload

{{< highlight json  >}}

{
  "new_name": "Morning shows copy"
}

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
  "new_name": "Morning shows copy"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/order_tracks/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Changes the order of individual playlist entries.

#### Example payload

```[101, 97, 105, 110]```

You must pass playlist track IDs, not `AllMusic` track IDs. The endpoint returns an empty successful response.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/shuffle_tracks/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Shuffles the order of all tracks in the playlist. No payload is required and the endpoint returns an empty JSON response.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/clean_duplicates/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Removes duplicate occurrences of the same track inside one playlist, keeping a single copy. No payload is required and the endpoint returns an empty JSON response.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/excel/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
<b>lang:</b> optional spreadsheet header language, for example `ru` or `en`<br/>
</div>

Returns an `.xlsx` Excel file with the playlist track list. The spreadsheet contains the track number, filename, artist, title, duration, and upload date.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/add_recording/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Adds recordings from the selected DJ recordings directory into the playlist. Files are copied into the server music library and also created as new `AllMusic` records.

#### Example payload

{{< highlight json  >}}

{
  "dj": 4,
  "recordings": ["show_2026_04_08.mp3", "guest_hour.mp3"]
}

{{< / highlight >}}

If `recordings` is empty, the API returns `400`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>playlist_pk:</b> playlist ID<br/>
<b>limit:</b> optional item limit<br/>
<b>offset:</b> optional offset<br/>
<b>q:</b> search string for `path`, `author`, or `title`<br/>
</div>

Returns tracks for a specific playlist with position information and a nested `AllMusic` track object.

#### Example response

{{< highlight json  >}}

{
  "count": 2,
  "results": [
    {
      "id": 101,
      "order": 1,
      "flag": 0,
      "added_ts": "2026-04-08T09:10:11Z",
      "track": {
        "id": 40,
        "author": "Daft Punk",
        "title": "One More Time",
        "human_up": 12,
        "human_down": 1,
        "path": "/srv/media/Server_1/daft_punk_one_more_time.mp3"
      }
    }
  ]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/:id/<br/>
<b>HTTP method:</b> GET, DELETE <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>playlist_pk:</b> playlist ID<br/>
<b>id:</b> playlist track entry ID<br/>
</div>

`GET` returns a single playlist entry with its nested track. `DELETE` removes one or more entries from the playlist. For bulk deletion through this route, you may pass several IDs separated by commas in the URL. After deletion the API returns:

{{< highlight json  >}}

{
  "length": 9231000
}

{{< / highlight >}}

where `length` is the updated playlist duration in milliseconds.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/bulk_delete/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>playlist_pk:</b> playlist ID<br/>
</div>

Deletes multiple playlist entries in one request.

#### Example payload

{{< highlight json  >}}

{
  "tracks": [101, 102, 103],
  "fs": false
}

{{< / highlight >}}

The `tracks` field contains playlist track IDs. If `fs=true`, related audio files are also removed from the filesystem. The response returns the updated playlist length:

{{< highlight json  >}}

{
  "length": 9123000
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/bulk_move/<br/>
<b>HTTP method:</b> PUT <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>playlist_pk:</b> playlist ID<br/>
</div>

Moves multiple playlist entries to a new position.

#### Example payload

{{< highlight json  >}}

{
  "tracks": [101, 102],
  "position": 5
}

{{< / highlight >}}

`position` is 1-based. On success the endpoint returns an empty JSON response.

## AllMusic Library API

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
<b>genre:</b> filter by genre<br/>
<b>with_tags_only:</b> return only tracks with both `author` and `title` filled in<br/>
<b>remote:</b> return only remote files whose `path` is a URL<br/>
<b>requestable:</b> return only tracks available for song requests<br/>
<b>search_q:</b> search by `author` and `title`<br/>
<b>order:</b> sorting, `1` - by `author`, `2` - by `title`, `3` - random order<br/>
</div>

This endpoint returns tracks from the `AllMusic` library.

#### Example: GET

{{< highlight python  >}}

import requests

response = requests.get(
    "https://demo.streaming.center:1030/api/v2/music/?server=1&requestable=1&search_q=queen"
)
print(response.json())

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

[
  {
    "id": 40,
    "server": 1,
    "author": "Queen",
    "title": "Radio Ga Ga",
    "album": "The Works",
    "genre": "Rock",
    "length": 343000,
    "path": "/srv/media/Server_1/queen_radio_ga_ga.mp3",
    "public_path": "/queen_radio_ga_ga.mp3",
    "filename": "queen_radio_ga_ga",
    "meta": "Queen - Radio Ga Ga",
    "requestable": true,
    "human_up": 25,
    "human_down": 2,
    "has_waveform": true,
    "length_formatted": "05:43",
    "category": {
      "id": 3,
      "name": "Rock"
    }
  }
]

{{< / highlight >}}

#### Main AllMusic response fields

- id: track ID in the music library.
- server: radio server ID.
- path: full file path or remote file URL.
- public_path: public relative file path.
- filename: filename without extension.
- meta: string in the form `Author - Title`.
- author: artist.
- author_other: additional artist.
- title: track title.
- album: album.
- genre: genre.
- performance_type: performance type.
- composer: composer.
- lyricist: lyricist.
- publisher: publisher.
- label: label.
- year: year.
- comment: comment.
- length: track duration in milliseconds.
- length_formatted: formatted duration.
- samplerate: file sample rate.
- audio_format: audio format.
- requestable: whether the track can be requested by listeners.
- requests_number: number of times the track was requested.
- human_up: like count.
- human_down: dislike count.
- auto_up: listener growth on this track.
- auto_down: listener drop on this track.
- tag_image: small cover image.
- image_medium: medium cover image.
- image_large: large cover image.
- gain_db: saved gain correction.
- peak_value: peak signal value.
- isrc: ISRC code.
- mbid: MusicBrainz ID.
- category: nested category object with `id` and `name`, or `null`.
- playback_start_time: playback region start.
- playback_end_time: playback region end.
- playback_start_bytes_offset: byte offset for playback start.
- playback_end_bytes_offset: byte offset for playback end.
- playback_region_calculation_status: playback region calculation status.
- disable_crossfade: whether crossfade is disabled for this track.
- has_waveform: whether a waveform is stored.
- region_length: calculated playback region length.
- max_volume_db: maximum safe gain increase without clipping.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/<br/>
<b>HTTP method:</b> GET, PUT, DELETE <br/>
<b>Authentication:</b> GET - not required, PUT and DELETE - required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

`GET` returns one track object. `PUT` lets you update metadata such as `author`, `title`, `album`, `genre`, `isrc`, `requestable`, `category`, and other model fields. `DELETE` removes the track from the database and deletes the corresponding file from storage.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/like/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

Increments the `human_up` like counter for the track. Voting is limited to one vote per IP during the last 24 hours.

#### Example response

{{< highlight json  >}}

{
  "up": 26,
  "down": 2
}

{{< / highlight >}}

If the IP has already voted, the API returns `400` and a response like this:

{{< highlight json  >}}

{
  "result": "already_voted",
  "up": 26,
  "down": 2
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/dislike/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

Works like `like`, but increments `human_down`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/playlists/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> GET - not required, POST - required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

`GET` returns the list of playlist IDs containing the track.

#### Example response

{{< highlight json  >}}

{
  "playlists": [1, 2, 5]
}

{{< / highlight >}}

`POST` synchronizes the playlists containing the track.

#### Example payload

{{< highlight json  >}}

{
  "playlists": [1, 5, 6]
}

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
  "added": [6],
  "removed": [2]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/get_artists/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Returns an array of unique `author` values.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/get_genres/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Returns an array of unique `genre` values.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/batch_update/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Allows bulk updates for several `AllMusic` tracks in one request.

#### Example payload

{{< highlight json  >}}

{
  "update_mode": "overwrite",
  "track_ids": [40, 52, 70],
  "fields": {
    "genre": "Rock",
    "requestable": true
  }
}

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
  "result": "ok",
  "updated": 3
}

{{< / highlight >}}

`update_mode` can be `fill-empty` or `overwrite`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/rename/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

Renames the file on the filesystem and updates its path in the database.

#### Example payload

{{< highlight json  >}}

{
  "new_name": "queen_radio_ga_ga_remastered"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/waveform/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> GET - not required, POST - required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

`POST` generates a waveform for the track and stores it in the database. `GET` returns waveform binary data with content type `application/octet-stream`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/regions/<br/>
<b>HTTP method:</b> PUT <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> `AllMusic` track ID<br/>
</div>

Updates the track playback region.

#### Example payload

{{< highlight json  >}}

{
  "playback_start_time": 0.85,
  "playback_end_time": 176.12
}

{{< / highlight >}}

After this call, `playback_region_calculation_status` is set back to the queued state.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/folder_tree/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
</div>

Returns the music library folder tree for the server.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/folder_files/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Returns files from selected music library folders.

#### Example payload

{{< highlight json  >}}

{
  "folders": ["/Rock/", "/Gold/"],
  "text": "queen"
}

{{< / highlight >}}

You can also pass the `server` query parameter.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/tree/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>server_id:</b> radio server ID<br/>
</div>

Returns the legacy music library tree format with `tree`, `open`, and `root` fields.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/reset_top/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Resets `human_up` and `human_down` counters for all tracks on the given server.

#### Example payload

{{< highlight json  >}}

{
  "server_id": 1
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/toggle_requestable/<br/>
<b>HTTP method:</b> PUT <br/>
<b>Authentication:</b> required<br/>
</div>

Bulk toggles the `requestable` flag for tracks.

#### Example payload

{{< highlight json  >}}

[
  {"id": 40, "requestable": true},
  {"id": 52, "requestable": false}
]

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remote/<br/>
<b>HTTP method:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>server_id:</b> radio server ID<br/>
</div>

Returns only remote tracks whose `path` starts with `http` or `https`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remote_file/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Adds one remote file to `AllMusic` from a URL after verifying availability and audio format.

#### Example payload

{{< highlight json  >}}

{
  "server": 1,
  "path": "https://cdn.example.com/stream/track.mp3",
  "author": "Queen",
  "title": "Radio Ga Ga",
  "album": "The Works"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/bulk_add_remote_files/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Lets you quickly add several remote files in a single request.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/move_files/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Moves selected tracks to another directory inside the server music library.

#### Example payload

{{< highlight json  >}}

{
  "file_ids": [40, 52],
  "target_directory": "/Rock/Gold/",
  "server_id": 1
}

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
  "moved_count": 2,
  "failed_count": 0,
  "moved_files": [
    {
      "id": 40,
      "old_path": "/srv/media/Server_1/track1.mp3",
      "new_path": "/srv/media/Server_1/Rock/Gold/track1.mp3",
      "filename": "track1.mp3"
    }
  ]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remove/<br/>
<b>HTTP method:</b> POST <br/>
<b>Authentication:</b> required<br/>
</div>

Deletes selected files and optionally removes empty directories.

#### Example payload

{{< highlight json  >}}

{
  "server_id": 1,
  "files": [40, 52],
  "directories": ["Server_1/Rock/Old"],
  "ml": true
}

{{< / highlight >}}

If `ml=true`, the corresponding `AllMusic` records are also deleted from the database.

<div class="api-block">
<b>Endpoint:</b> /api/v2/mediafile/upload/<br/>
<b>HTTP method:</b> PUT <br/>
<b>Authentication:</b> required<br/>
</div>

Uploads an audio file into the selected folder on the server.

#### multipart/form-data parameters

- filename: uploaded file.
- server_id: server ID.
- parent_dir: destination folder.
- is_jingle: if `true`, the file is uploaded into the jingles directory.

#### How to get the like count for a specific track by its AllMusic ID

To get the like count for a track, perform a `GET` request to `/api/v2/music/:id/`, where `:id` is the `AllMusic` object ID. In the response, use the `human_up` field, which contains the current number of likes.

For example, for track ID `40`, the request `GET /api/v2/music/40/` returns a track object where `human_up` may look like this:

{{< highlight json  >}}

{
  "id": 40,
  "author": "Queen",
  "title": "Radio Ga Ga",
  "human_up": 25,
  "human_down": 2
}

{{< / highlight >}}

If you want not only to read the current value but also to immediately get updated counters after a user vote, call `POST /api/v2/music/:id/like/`. The API response includes `up` and `down`, where `up` is the new like count.