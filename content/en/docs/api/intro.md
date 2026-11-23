---
title: "Getting started"
date: 2024-08-24T11:37:29+03:00
weight: 10
seo_title: "Getting Started with Streaming.Center API | Internet Radio API Guide"
description: "Introduction to Streaming.Center's Internet radio API. Learn basic concepts, make your first API request, and understand the structure of API responses with practical examples."
---

Here and in the following subsections, we will explain how to use the API of our Internet Radio control panel 
to obtain information about the what is on air and other data using programmatic methods. 
Using our API, you can build your own scripts, applications and modules for your radio website, 
mobile application and any integration where programmatic interaction with the radio server is required.

To work with the API, you must already have our Internet Radio Control Panel installed and configured. To work with the API, you need to know the URL of your control panel: the address at which you usually enter the broadcaster's interface, where your channels, playlists, broadcast grid and other sections are.

The API URL is: **<<address of your panel on the server>>/api/<<api version>>**, for example:

[https://demoaccount.streaming.center:8080/api/v2/](https://demoaccount.streaming.center:8080/api/v2/) 


The API uses JSON for most requests and responses. [History](/docs/api/history/#api-history) also supports JSONP. Endpoints for media, exports, widgets, and public pages can use other formats as described in their reference sections. For the API to work correctly, we strongly recommend that you have configured and working support for the **HTTPS** protocol on the server side, and in cases where [Authorization](/docs/api/auth/) is required for API requests, the **HTTPS** protocol is critically necessary to protect the transfer of authorization tokens.

An example of an API request in the Python programming language that receives the [history of the broadcast](/docs/api/history/#api-history) (1 last track, it is also the current one on the radio that is playing right now) that were played on the server **1**:

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.streaming.center:8080/api/v2/history/?limit=1&offset=0&server=1")
print(response.json())

{{< / highlight >}}

Example output about the current track on the radio in JSON format:

{{< highlight json  >}}

{
   "count":500,
   "next":"https://demoaccount.streaming.center:8080/api/v2/history/?limit=1&offset=1&server=1",
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
         "img_large_url":"https://demoaccount.streaming.center:8080/media/tracks/trackImage1190_large.jpg",
         "img_medium_url":"https://demoaccount.streaming.center:8080/media/tracks/trackImage1190_medium.jpg",
         "img_url":"https://demoaccount.streaming.center:8080/media/tracks/trackImage1190.jpg",
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

As you can see, the API provides a lot of information - the name of the current track, 
the playlist, when the track started playing and how long it lasts, the track covers (if any) and other parameters that are described in details in our documentation.

## Request conventions

Use the URL paths as shown, including a trailing slash where present. Path placeholders in braces, such as `{id}`, are replaced by actual IDs. For station-specific collections, `?server=1` commonly filters the list and the JSON field `server` sets [the station when creating](/docs/api/servers/#api-stations) a resource.

Use `Content-Type: application/json` for JSON bodies, or `multipart/form-data` for uploads. Standard list endpoints return an array unless pagination applies. For limit/offset pagination the object contains `count`, `next`, `previous`, and `results`. Link fields are null when there is no corresponding page. Some endpoints use their own pagination and response fields.

Standard create operations respond with HTTP 201 and the saved object. Update operations generally return HTTP 200 with the object, and standard deletions return HTTP 204 without a body. Validation errors usually return HTTP 400 with field-specific messages. Access failures can return HTTP 401 or 403, and missing records return HTTP 404. See the section for each endpoint for options and exceptions.
