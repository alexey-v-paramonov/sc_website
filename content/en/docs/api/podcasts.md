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
<b>offset:</b> offset, indicates the starting record (optional)<br/>
<b>server:</b> radio server ID (optional)<br/>
</div>

Gets a list of podcasts.

#### Example

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.streaming.center:8080/api/v2/podcasts/?server=1")
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
- episodes_count: the number of episodes in this podcast
- feed_url: [RSS feed URL for this podcast](/docs/api/podcasts/#api-podcast-rss)
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

Create a podcast on the radio with specified radio server ID. If you also need to include podcast cover into the podcast creation request, you need to send your POST request with `multipart/form-data` header and specify the podcast cover via the **image** parameter.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>id</b>/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Authentication:</b> not required<br/>
</div>

Gets a single podcast by ID.

<div class="api-block" id="api-podcast-episodes">
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

## Manage podcasts and episodes

Use a [panel token](/docs/api/auth/#api-panel-sign-in) with podcast write permission for changes. The [public episode list](/docs/api/podcasts/#api-podcast-episodes) includes episodes with `publish_ts` in the past. The `q` parameter searches episode title and description.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts/{id}/<br/>
<b>HTTP methods</b> PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Update `title`, `description`, `published`, or an uploaded `image`, or delete the podcast. `folder`, `feed_url` and `episodes_count` are calculated.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts/{id}/episodes/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Create an episode by sending multipart `podcast`, `title`, and audio file `path`. Optional fields include `description`, `image`, and `publish_ts` (Unix seconds on input, milliseconds in responses). Returns HTTP 201 and the episode.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts/{id}/episodes/{episode_id}/<br/>
<b>HTTP methods</b> PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Update or delete an episode. The episode response uses `url` and `public_page_url` for published links.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts/{id}/create_episode_from_track/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Copy a [library track](/docs/api/playlists/#api-music-track) by `track_id`. Returns `{}` on success and HTTP 400 on a duplicate episode title or copy failure.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts/{id}/add_recording/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send the [DJ ID](/docs/api/djs/#api-djs) in `dj` and [file names](/docs/api/djs/#api-dj-recordings) in `recordings`. Returns `{}` on success.

```http
POST /api/v2/podcasts/2/create_episode_from_track/
```

```json
{
  "track_id": 40
}
```

## Public feed and page settings

<div class="api-block" id="api-podcast-rss">
<b>Endpoint</b> /api/v2/podcasts/{id}/feed.xml<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

RSS feed for a podcast. The path ends in `.xml`.

<div class="api-block">
<b>Endpoint</b> /api/podcast_feed/{server_id}/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Public station podcast browser as HTML.

<div class="api-block" id="api-podcast-page-settings">
<b>Endpoint</b> /api/v2/podcasts_settings/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

GET with `?server=1` returns the station’s page settings object. POST creates a settings record with `server` when no record exists.

<div class="api-block">
<b>Endpoint</b> /api/v2/podcasts_settings/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

GET uses the station ID in the path. For updates, send `server` or supply `?server=1`. Fields include `title_tag`, `description_tag`, and `block_footer_html`. DELETE uses the same station selector as update.
