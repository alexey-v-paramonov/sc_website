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



      playlists.views.PlaylistViewSet playlist-list
/api/v2/playlists/<pk>/ playlists.views.PlaylistViewSet playlist-detail
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



Playlists API.
Getting all the playlist for a radio server.
Endpoint: /api/v2/playlists/
Params: server:int - radio server ID
Example: /api/v2/playlists/?server=1

Description:
Gets all server playlists as an array. Available without authentication.

JSON data description:
{
 "id": - playlist ID
 "duration": playlist playback duration in milliseconds
 "playlist_files_per_page": - number of tracks displayed on a single page
 "tracks_num": - the total number of all tracks in the playlist
 "name": - playlist title
 "is_default": - whatever this playlist is a default (fallback) playlist for the server. Typical "default" playlist is a playlist that has all the music and called "All music" 
 "is_random": - true if playlist is shuffled
 "on_air": - true if playlist is playing now
 "directory_name": - if playlist folders sync is enabled in settings - this is the directory name that playlist belongs to
 "current_track_order": - current playing track order in the playlist. Only makes sense for non-shuffled playlist that play in order
 "server": - radio server ID that this playlist belongs to
}


Getting a particular playlist from the server.
Endpoint: /api/v2/playlists/ID:int/
Params: ID: playlist ID
Example: /api/v2/playlists/1/

Returns a single playlist from the server by ID specified.

JSON data description:
{
 "id": - playlist ID
 "duration": playlist playback duration in milliseconds
 "playlist_files_per_page": - number of tracks displayed on a single page
 "tracks_num": - the total number of all tracks in the playlist
 "name": - playlist title
 "is_default": - whatever this playlist is a default (fallback) playlist for the server. Typical "default" playlist is a playlist that has all the music and called "All music" 
 "is_random": - true if playlist is shuffled
 "on_air": - true if playlist is playing now
 "directory_name": - if playlist folders sync is enabled in settings - this is the directory name that playlist belongs to
 "current_track_order": - current playing track order in the playlist. Only makes sense for non-shuffled playlist that play in order
 "server": - radio server ID that this playlist belongs to
}


Creating a playlist
Requires authentication: yes
Endpoint: /api/v2/playlists/
HTTP method: POST
Example: /api/v2/playlists/1/
Payload:
{
 "name": - playlist title
 "is_random": -tru if you want a shuffled playlist
 "server": - radio server ID
}


Changing a playlist
Requires authentication: yes
Endpoint: /api/v2/playlists/ID:int/
Params: ID: playlist ID
HTTP method: PUT
Example: /api/v2/playlists/1/
Payload:
{
 "name": - playlist title
 "is_random": - true if you want a shuffled playlist
 "server": - radio server ID
}


Deleting a playlist
Requires authentication: yes
Endpoint: /api/v2/playlists/ID:int/
HTTP method: DELETE
Example: /api/v2/playlists/1/


Getting playlist tracks:
Endpoint: /api/v2/playlists/ID:int/tracks/
Params: 
  ID: playlist ID
  limit: maximum number of tracks (optional)
  offset: starting offset for a list of tracks (optional)
HTTP method: GET
Example: /api/v2/playlists/78/tracks/?limit=1000&offset=0
