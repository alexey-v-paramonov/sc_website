---
title: "Playlists"
date: 2024-08-22T11:37:29+03:00
weight: 40
seo_title: "Playlists API Reference | Streaming.Center Radio API"
description: "Complete guide to managing Internet radio playlists programmatically. Learn how to create, modify, copy playlists and add tracks with the Streaming.Center API."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/<br/>
<b>HTTP methods:</b> GET, POST <br/>
<b>Authentication:</b> requred<br/>
<b>Parameters:</b> <br/>
<b>server:</b> radio server ID<br/>
</div>

<br />
Manages your station playlists.
<br />
<br />

#### Example: GET

Fetch all the playlists from server ID 1:

{{< highlight python  >}}

import requests
API_KEY = "6aNLaqRN.87L4xZ5LUXwWLCkK7dBswDafWZNcaLOB"

headers = {"SC-API-KEY": API_KEY}

response = requests.get("https://demo.streaming.center:1030/api/v2/playlists/?server=1", headers=headers)
print(response.json())

{{< / highlight >}}

#### Example Output
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
This API endpoint returns an array of your playlists. Each playlist has the following properties:

- id: unique playlist ID
- duration: playlist playback duration in milliseconds
- playlist_files_per_page: a  special setting that limits the number of playlist tracks per page. Only affects the playlist display in the admin web interface.
- tracks_num: the number of tracks in the playlist
- name: The playlist name
- is_default: boolean value indicating whether the playlist is a default playlist on the server. You cannot remove the default playlists.  All music you upload to the server is added to the default playlist, which is used as a fallback when Auto DJ has nothing else to play. There can be only one default playlist on the server. In our case, "All music" is the default playlist on server 1.
- is_random: indicates whether the playlist is shuffled or plays sequentially in order.
- on_air: true if the playlist is currently playing.
- directory_name: indicates whether the playlist is created from a server directory with the sync option enabled.
- current_track_order: the number indicating the current playback position in the playlist.
- server: number, current server ID.

#### Example: POST

Create a playlist on server ID 1:

{{< highlight python  >}}

import requests
API_KEY = "6aNLaqRN.87L4xZ5LUXwWLCkK7dBswDafWZNcaLOA"

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

To create a playlist you need to send the following JSON payload:

- name: new playlist name
- is_random: pass `true`  if you want the playlist to be shuffled
- server: an integer representing the server ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/<br/>
<b>HTTP methods:</b> GET, PUT, DELETE <br/>
<b>Authentication:</b> requred<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

Allows you to load a specific playlist by ID when using the **GET** method and update a playlist when using the **PUT** method.
With the **DELETE** method, you can delete a playlist by ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/add_tracks_ordered/<br/>
<b>HTTP methods:</b> POST <br/>
<b>Authentication:</b> requred<br/>
<b>Parameters:</b> <br/>
<b>id:</b> playlist ID<br/>
</div>

### Example payload:

```[40, 52, 7]```

This endpoint allows you to add tracks to a playlist. You need to pass an array of music IDs for the tracks you want to add. The order of IDs in the payload is important - tracks will be added to the playlist in the exact same order as they appear in the array.

<!--
/api/v2/playlists/<pk>/add_recording/   playlists.views.PlaylistViewSet playlist-add-recording
/api/v2/playlists/<pk>/add_tracks/      playlists.views.PlaylistViewSet playlist-add-tracks
/api/v2/playlists/<pk>/add_tracks_ordered/      playlists.views.PlaylistViewSet playlist-add-tracks-ordered
/api/v2/playlists/<pk>/clean_duplicates/        playlists.views.PlaylistViewSet playlist-clean-duplicates
/api/v2/playlists/<pk>/copy/    playlists.views.PlaylistViewSet playlist-copy
/api/v2/playlists/<pk>/excel/   playlists.views.PlaylistViewSet playlist-excel
/api/v2/playlists/<pk>/order_tracks/    playlists.views.PlaylistViewSet playlist-order-tracks
/api/v2/playlists/<pk>/shuffle_tracks/  playlists.views.PlaylistViewSet playlist-shuffle-tracks
/api/v2/playlists/<pk>/start_broadcasting/      playlists.views.PlaylistViewSet playlist-start-broadcasting
/api/v2/playlists/<playlist_pk>/tracks/ playlists.views.PlaylistTracksViewSet   track-list
/api/v2/playlists/<playlist_pk>/tracks/<pk>/    playlists.views.PlaylistTracksViewSet   track-detail
/api/v2/playlists/<playlist_pk>/tracks/bulk_delete/     playlists.views.PlaylistTracksViewSet   track-bulk-delete
/api/v2/playlists/<playlist_pk>/tracks/bulk_move/       playlists.views.PlaylistTracksViewSet   track-bulk-move



-->