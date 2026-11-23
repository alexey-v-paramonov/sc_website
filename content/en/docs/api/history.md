---
title: "What's on air"
date: 2024-08-22T11:37:29+03:00
weight: 40
seo_title: "Track History API | Streaming.Center Radio API Documentation"
description: "Access and retrieve your Internet radio station's track history with our History API. Complete reference with JSON examples for integrating playback history into your applications."
---

<div class="api-block" id="api-history">
<b>Endpoint:</b> /api/v2/history/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>limit: </b> the number of records in response<br/>
<b>offset:</b> offset, indicates the starting record<br/>
<b>server:</b> radio server ID<br/>
</div>

The endpoint returns airplay history with the newest entry first. Request `limit=1&offset=0` to read the latest track.

#### Example

{{< highlight python  >}}

import requests

response = requests.get("https://demo.streaming.center:8080/api/v2/history/?limit=1&offset=0&server=1")
print(response.json())

{{< / highlight >}}

#### Example Output

{{< highlight json  >}}

{
   "count":500,
   "next":"https://demo.streaming.center:8080/api/v2/history/?limit=1&offset=1&server=1",
   "previous":null,
   "results":[
      {
         "album":"Ozzmosis (Expanded Edition)",
         "all_music_id":1190,
         "author":"Ozzy Osbourne",
         "author_other":null,
         "comment":null,
         "composer":null,
         "dj_name":"AutoDJ",
         "genre":null,
         "id":11552,
         "img_fetched":true,
         "img_large_url":"https://demo.streaming.center:8080/media/tracks/trackImage1190_large.jpg",
         "img_medium_url":"https://demo.streaming.center:8080/media/tracks/trackImage1190_medium.jpg",
         "img_url":"https://demo.streaming.center:8080/media/tracks/trackImage1190.jpg",
         "isrc":null,
         "jingle_id":null,
         "label":null,
         "length":296347,
         "lyricist":"",
         "metadata":"Ozzy Osbourne - I Just Want You",
         "n_listeners":0,
         "performance_type":null,
         "playlist_title":"All music",
         "publisher":null,
         "title":"I Just Want You",
         "ts":1733763534000,
         "year":null
      }
   ]
}
{{< / highlight >}}

#### Description

- album: track album 
- all_music_id: the [ID of the track in the server's music library](/docs/api/playlists/#api-music-track). If the track is a jingle, this parameter is null. If the track was played live and not from the Auto DJ's music library, this parameter is null.
- author: track artist
- author_other: co-author
- comment: track comments
- composer: composer
- dj_name: the name of the DJ who played this track.
- genre: genre of composition
- id: track history record ID (unique value)
- img_fetched: the system attempted to download the track cover from music services (Apple Music, Spotify, MusicBrainz) if it is missing in the mp3 tags of the file
- img_large_url: - the URL of the track cover image in the maximum resolution for this track with no compression
- img_medium_url: - a medium-sized version of the image that the system obtained by compressing the original image to 500x500 pixels
- img_url: a mini track cover, usually in a resolution of 100x100 pixels
- isrc: ISRC track code (used in [royalty reports](/docs/api/statistics/#api-royalty-reports))
- jingle_id: if the track is a jingle, this parameter contains the [jingle ID in the Auto-DJ content database](/docs/api/jingles/#api-jingles)
- label: label
- length: track duration in milliseconds
- lyricist: the author of the lyrics
- metadata: the final metadata with which the track was aired is usually the "Artist - Name", but the metadata may also contain other data, depending on the format of the meta data, which is specified in the ["Settings" section of the radio panel](/docs/api/settings/#api-station-settings-detail): for example, the name of the DJ
- n_listeners: the number of listeners on the radio at the time the track started playing
- performance_type: type of performance: vocal, instrumental, reading, etc.
- playlist_title: the name of the playlist that was on the air can be null for jingles and for tracks played during live streams
- publisher: publisher
- title: track name
- ts: the broadcasting time (integer) in milliseconds, timezone: UTC
- year: track year


## Pagination and archive access

Public reads use the last 500 tracks for the selected station. With `limit`, the response is a paginated object and the maximum page size is 100. Without `limit`, the response is an array. For older history, send [a valid API key](/docs/api/settings/#api-api-keys) or [a panel JWT](/docs/api/auth/#api-panel-sign-in) with statistics read permission and an explicit `limit` and `offset` whose sum exceeds 500. An archive request with `offset` greater than 10,000 returns an empty page.

`GET /api/v2/history/{id}/?server=1` returns a history entry available in the selected history view, or HTTP 404. For JSONP, request `format=jsonp` and pass optional `callback`, which defaults to `callback`.

## History example values

The example requests one entry (`limit=1`), skipping zero rows (`offset=0)), from station 1 (`server=1`). The next URL skips one row. The response shows 500 matching entries and zero listeners when this track began playing. `id: 11552` identifies the airplay record. `all_music_id: 1190` identifies the library track. `length: 296347` is the duration in milliseconds and `ts: 1733763534000` is its start time in Unix milliseconds.
