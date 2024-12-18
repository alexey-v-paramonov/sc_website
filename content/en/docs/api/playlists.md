---
title: "Playlists"
date: 2024-08-22T11:37:29+03:00
weight: 40
---

/api/v2/playlists/      playlists.views.PlaylistViewSet playlist-list
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
