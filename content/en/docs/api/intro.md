---
title: "Getting started"
date: 2024-08-24T11:37:29+03:00
---

Here and in the following subsections, we will explain how to use the API of our Internet Radio control panel 
to obtain information about the what is on air and other data using programmatic methods. 
Using our API, you can build your own scripts, applications and modules for your radio website, 
mobile application and any integration where programmatic interaction with the radio server is required.

To work with the API, you must already have our Internet Radio Control Panel installed and configured. To work with the API, you need to know the URL of your control panel: the address at which you usually enter the broadcaster's interface, where your channels, playlists, broadcast grid and other sections are.

The API URL is: **<<address of your panel on the server>>/api/<<api version>>**, for example:

[https://demoaccount.radio-tochka.com:8080/api/v2/](https://demoaccount.radio-tochka.com:8080/api/v2/) 


Our API uses JSON and JSONP formats for data exchange. For the API to work correctly, we strongly recommend that you have configured and working support for the **HTTPS** protocol on the server side, and in cases where [Authorization](/docs/api/auth) is required for API requests, the **HTTPS** protocol is critically necessary to protect the transfer of authorization tokens.

An example of an API request in the Python programming language that receives the history of the broadcast (1 last track, it is also the current one on the radio that is playing right now) that were played on the server **1**:

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.s02.radio-tochka.com:8080/api/v2/history/?limit=1&offset=0&server=1")
print(response.json())

{{< / highlight >}}

Example output about the current track on the radio in JSON format:

{{< highlight json  >}}

{
   "count":500,
   "next":"https://demoaccount.s02.radio-tochka.com:8080/api/v2/history/?limit=1&offset=1&server=1",
   "previous":"None",
   "results":[
      {
         "album":"Ozzmosis (Expanded Edition)",
         "all_music_id":1190,
         "author":"Ozzy Osbourne",
         "author_other":"None",
         "comment":"None",
         "composer":"None",
         "dj_name":"AutoDJ",
         "genre":"None",
         "id":11552,
         "img_fetched":true,
         "img_large_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190_large.jpg",
         "img_medium_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190_medium.jpg",
         "img_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190.jpg",
         "isrc":"None",
         "jingle_id":"None",
         "label":"None",
         "length":296347,
         "lyricist":"",
         "metadata":"Ozzy Osbourne - I Just Want You",
         "n_listeners":0,
         "performance_type":"None",
         "playlist_title":"All music",
         "publisher":"None",
         "title":"I Just Want You",
         "ts":1733763534000,
         "year":"None"
      }
   ]
}
{{< / highlight >}}

As you can see, the API provides a lot of information - the name of the current track, 
the playlist, when the track started playing and how long it lasts, the track covers (if any) and other parameters that are described in details in our documentation.