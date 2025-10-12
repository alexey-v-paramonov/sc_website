---
title: "Podcasts"
date: 2024-08-22T11:37:29+03:00
weight: 60
seo_title: "Podcasts API for Internet Radio | Streaming.Center Documentation"
description: "Integrate podcast functionality with your Internet radio station. API reference for retrieving, creating and managing podcasts with detailed examples and response formats."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>limit: </b> the number of records in response (optional)<br/>
<b>offset:</b> offest, idicates the starting record (optional)<br/>
<b>server:</b> radio server ID (optional)<br/>
</div>

Gets a list of podcasts.

#### Example

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.s02.radio-tochka.com:8080/api/v2/podcasts/?server=1")
print(response.json())

{{< / highlight >}}

#### Example Output
{{< highlight json  >}}

[
    {
        "id": 2,
        "folder": "the-retro-podcast",
        "image": "https://radio.com:8080/media/podcast_covers/podcast1.jpg",
        "episodes_count": 5,
        "feed_url": "https://radio.com:8080/api/v2/podcasts/2/feed.xml",
        "public_page_url": "https://radio.com:8080/public/podcasts/2/",
        "title": "The Retro Podcast",
        "description": "There are many variations of passages of Lorem Ipsum",
        "published": true,
        "server": 1
    },
]
{{< / highlight >}}

#### Description

- folder: podcast folder on the server filesystem
- image: podcast cover image 
- episodes_count: the number of episoded in this podcast
- feed_url: RSS feed URL for this podcast
- public_page_url: public page URL for this podcast, allows to browse the podcast via a browser
- title: podcast title
- description: podcast description
- published: true if podcast is published (not a draft)
- server: radio server ID the podcast belongs to

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/ <br/>
<b>HTTP methods:</b> POST <br/>
<b>Authentication:</b> required<br/>
<b>Parameters:</b> <br/>
<b>title: </b> podcast title, string<br/>
<b>published:</b> boolean<br/>
<b>description: </b> podcast description, string<br/>
<b>server:</b> radio server ID<br/>
</div>

Create a podcast on the radio with specified radio server ID. If you also need to include podcast cover into the podcast creation request, you need to send your POST request with `multipart/form-data` header and specify the podcats cover via the **image** parameter.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>id</b>/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Gets a single podcast by ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Gets a list of podcast episodes by podcast ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/<b>episode_id</b>/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Gets a podcast episode by ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/<b>episode_id</b>/episode.mp3/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Download episode file as MP3.


<!-- 

/api/v2/podcasts/<pk>/add_recording/    podcasts.views.PodcastViewSet   podcast-add-recording
/api/v2/podcasts/<pk>/create_episode_from_track/        podcasts.views.PodcastViewSet   podcast-create-episode-from-track
/api/v2/podcasts_settings/      podcasts.views.PodcastsPageSettingsViewSet      podcastspagesettings-list
/api/v2/podcasts_settings/<pk>/ podcasts.views.PodcastsPageSettingsViewSet      podcastspagesettings-detail
-->
