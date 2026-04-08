---
title: "Broadcast Channels"
date: 2026-04-04T12:00:00+03:00
weight: 51
seo_title: "Streaming Channel API for Internet Radio | Streaming.Center"
description: "Documentation for the Streaming.Center broadcast channels API: listing channels, creating, updating, deleting, and using listener authentication endpoints."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> GET - not required, POST - required<br/>
<b>GET query parameters:</b> <br/>
<b>limit:</b> number of items in the response<br/>
<b>offset:</b> pagination offset<br/>
<b>server:</b> radio server ID<br/>
</div>

This endpoint lets you retrieve a list of broadcast channels for a radio station and create a new channel.

#### Example: GET

Get the list of channels for server ID 1:

{{< highlight python  >}}

import requests

response = requests.get(
    "https://demo.streaming.center:1030/api/v2/channels/?limit=20&offset=0&server=1"
)
print(response.json())

{{< / highlight >}}

#### Example response

{{< highlight json  >}}

{
   "count":2,
   "next":null,
   "previous":null,
   "results":[
      {
         "id":11,
         "active":true,
         "server":1,
         "bitrate":"128",
         "listeners":"500",
         "s_type":"icecast",
         "s_format":"mp3",
         "ip_address":"127.0.0.1",
         "port":8000,
         "ssl_port":8443,
         "mount_point":"/stream",
         "public":true,
         "traf":0,
         "traf_month":0,
         "autodj_enabled":true,
         "centovacast_compatible":true,
         "proxy_enabled":false,
         "proxy_status":0,
         "proxy_url_path":null,
         "ssl_proxy_enabled":false,
         "ssl_proxy_status":0,
         "ssl_proxy_url_path":null,
         "allow_auth_listeners_only":false,
         "queue_size":524288,
         "burst_size":131072,
         "listeners_current":37,
         "listeners_peak":82,
         "traffic":"0 B",
         "state":2,
         "links_html":"<a href=\"#\">Listen</a>",
         "stream_url":"http://s02.demo.streaming.center:8000/stream",
         "secure_stream_url":"https://s02.demo.streaming.center:8443/stream",
         "admin_link":"https://s02.demo.streaming.center:8443/",
         "youtube_stream_image":null,
         "youtube_stream_image_resolution":null,
         "fb_stream_image":null,
         "fb_stream_image_resolution":null,
         "vk_stream_image":null,
         "vk_stream_image_resolution":null,
         "telegram_stream_image":null,
         "telegram_stream_image_resolution":null,
         "rutube_stream_image":null
      }
   ]
}

{{< / highlight >}}

#### Response structure

The list response uses standard pagination and contains the following fields:

- count: total number of channels matching the query.
- next: URL of the next page, or `null`.
- previous: URL of the previous page, or `null`.
- results: array of channel objects.

#### Channel object fields

Fields available in the public `GET` response:

- id: unique channel ID.
- active: whether the channel is active.
- server: ID of the radio server this channel belongs to.
- bitrate: stream bitrate.
- listeners: channel listener limit.
- s_type: stream server type, for example `icecast`, `icecast-kh`, `shoutcast1`, `shoutcast2`, `shoutcast2.6`.
- s_format: stream format, for example `mp3`, `aac`, `flac`.
- ip_address: IP address used by the stream.
- port: main channel port.
- ssl_port: SSL port, if available.
- mount_point: stream mount point. For Icecast it is generated automatically by the system.
- public: whether the channel is public.
- traf: accumulated traffic.
- traf_month: month associated with the traffic statistics.
- autodj_enabled: whether AutoDJ is enabled.
- centovacast_compatible: whether to use a Centova Cast compatible mount point.
- proxy_enabled: whether HTTP proxy on port 80 is enabled.
- proxy_status: HTTP proxy status.
- proxy_url_path: HTTP proxy URL path.
- ssl_proxy_enabled: whether HTTPS proxy on port 443 is enabled.
- ssl_proxy_status: HTTPS proxy status.
- ssl_proxy_url_path: HTTPS proxy URL path.
- allow_auth_listeners_only: whether only authenticated listeners are allowed.
- queue_size: buffer queue size.
- burst_size: burst buffer size.
- listeners_current: current number of listeners on the channel.
- listeners_peak: peak number of listeners.
- traffic: human-readable traffic value.
- state: channel state. `0` - offline, `1` - online but not connected, `2` - online and connected (broadcasting).
- links_html: HTML block with stream links.
- stream_url: direct non-SSL stream URL.
- secure_stream_url: direct HTTPS stream URL, if available.
- admin_link: link to the stream server admin page.
- youtube_stream_image: uploaded image or video splash for YouTube streaming.
- youtube_stream_image_resolution: file resolution for YouTube.
- fb_stream_image: uploaded image or video splash for Facebook streaming.
- fb_stream_image_resolution: file resolution for Facebook.
- vk_stream_image: uploaded image or video splash for VK streaming.
- vk_stream_image_resolution: file resolution for VK.
- telegram_stream_image: uploaded image or video splash for Telegram streaming.
- telegram_stream_image_resolution: file resolution for Telegram.
- rutube_stream_image: uploaded image or video splash for RuTube streaming.

If the request is authenticated, the channel object also includes administrative and service fields:

- password: source connection password.
- admin_password: channel admin password.
- sc_authhash: Shoutcast auth hash.
- youtube_stream_url: RTMP URL for YouTube.
- youtube_stream_key: YouTube stream key.
- youtube_stream_enabled: whether YouTube restreaming is enabled.
- fb_stream_url: RTMP URL for Facebook.
- fb_stream_key: Facebook stream key.
- fb_stream_enabled: whether Facebook restreaming is enabled.
- vk_stream_url: RTMP URL for VK.
- vk_stream_key: VK stream key.
- vk_stream_enabled: whether VK restreaming is enabled.
- telegram_stream_url: RTMPS URL for Telegram.
- telegram_stream_key: Telegram stream key.
- telegram_stream_enabled: whether Telegram restreaming is enabled.
- rutube_stream_url: RTMP URL for RuTube.
- rutube_stream_key: RuTube stream key.
- rutube_stream_enabled: whether RuTube restreaming is enabled.
- shoutcast_uid: Shoutcast license UID.
- shoutcast_license_key: Shoutcast license key.
- awstats_nginx: whether nginx statistics integration is available.
- vhost_name: calculated host name.
- proxy_stream_url: ready-to-use HTTP proxy stream URL, if proxy is active.
- ssl_proxy_stream_url: ready-to-use HTTPS proxy stream URL, if proxy is active.
- awstats_password: password for statistics access.
- hls_url: HLS playlist URL for the channel.
- hls_status: HLS stream status, for example `inactive`, `starting`, `active`.

#### Example: POST

Create a new channel for server ID 1:

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.post(
    "https://demo.streaming.center:1030/api/v2/channels/",
    headers=headers,
    json={
        "server": 1,
        "port": 8000,
        "bitrate": "128",
        "listeners": "500",
        "s_type": "icecast",
        "s_format": "mp3",
        "public": True,
        "autodj_enabled": True,
        "centovacast_compatible": True
    }
)

print(response.json())

{{< / highlight >}}

#### POST parameters

Main parameters typically used to create a channel:

- server: required radio server ID.
- port: required main stream port.
- bitrate: required channel bitrate.
- listeners: required listener limit.
- s_type: required stream server type.
- s_format: required audio format.
- public: whether the channel should be public.
- autodj_enabled: whether to enable AutoDJ.
- centovacast_compatible: whether to use a Centova Cast style mount point.
- admin_password: optional admin password. If omitted, the server password is used.
- proxy_enabled: whether to enable HTTP proxy.
- proxy_url_path: HTTP proxy URL path.
- ssl_proxy_enabled: whether to enable HTTPS proxy.
- ssl_proxy_url_path: HTTPS proxy URL path.
- allow_auth_listeners_only: whether to allow only authenticated listeners.
- queue_size: buffer queue size.
- burst_size: burst buffer size.
- youtube_stream_image: image or video file for YouTube streaming.
- youtube_stream_url: YouTube RTMP URL.
- youtube_stream_key: YouTube stream key.
- youtube_stream_enabled: whether to enable YouTube restreaming.
- fb_stream_image: image or video file for Facebook streaming.
- fb_stream_url: Facebook RTMP URL.
- fb_stream_key: Facebook stream key.
- fb_stream_enabled: whether to enable Facebook restreaming.
- vk_stream_image: image or video file for VK streaming.
- vk_stream_url: VK RTMP URL.
- vk_stream_key: VK stream key.
- vk_stream_enabled: whether to enable VK restreaming.
- telegram_stream_image: image or video file for Telegram streaming.
- telegram_stream_url: Telegram RTMPS URL.
- telegram_stream_key: Telegram stream key.
- telegram_stream_enabled: whether to enable Telegram restreaming.
- rutube_stream_image: image or video file for RuTube streaming.
- rutube_stream_url: RuTube RTMP URL.
- rutube_stream_key: RuTube stream key.
- rutube_stream_enabled: whether to enable RuTube restreaming.
- shoutcast_uid: Shoutcast license UID.
- shoutcast_license_key: Shoutcast license key.

On success, the API returns the created channel object as JSON.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/<br/>
<b>HTTP method:</b> GET, PUT, DELETE <br/>
<b>Authentication:</b> GET - not required, PUT and DELETE - required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> channel ID<br/>
</div>

This endpoint lets you retrieve a specific channel, update its settings, or delete it.

#### Example: GET

{{< highlight python  >}}

import requests

response = requests.get(
    "https://demo.streaming.center:1030/api/v2/channels/11/"
)
print(response.json())

{{< / highlight >}}

The response returns one channel object with the same fields used in the `results` list. Sensitive administrative fields are hidden for anonymous requests.

#### Example: PUT

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.put(
    "https://demo.streaming.center:1030/api/v2/channels/11/",
    headers=headers,
    json={
        "server": 1,
        "port": 8000,
        "bitrate": "192",
        "listeners": "1000",
        "s_type": "icecast",
        "s_format": "mp3",
        "public": True,
        "proxy_enabled": True,
        "proxy_url_path": "radio"
    }
)

print(response.json())

{{< / highlight >}}

#### PUT parameters

You can pass the same fields used during channel creation. The API returns the updated channel object.

#### Example: DELETE

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
    "https://demo.streaming.center:1030/api/v2/channels/11/",
    headers=headers
)

print(response.status_code)

{{< / highlight >}}

If deletion succeeds, the endpoint returns HTTP status `204 No Content`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/add_listener/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> channel ID<br/>
</div>

Service endpoint used to register a listener connection. It is usually called by the streaming server or a proxy layer rather than by a user-facing application.

#### Request parameters

The endpoint accepts parameters either in the query string or in the POST body. Values are written to the connection log.

- action: connection action type.
- mount: mount point or connection string.
- server: server or node name.
- port: connection port.
- client: client identifier.
- user: username, if supplied by the external system.
- pass: password, if supplied by the external system.
- ip: listener IP address.
- agent: listener user-agent.

#### Example response

The endpoint returns an empty HTTP 200 response and sets these headers:

- icecast-auth-user: always `1`.
- icecast-auth-message: always `auth`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/auth_listener/<br/>
<b>HTTP method:</b> GET, POST <br/>
<b>Authentication:</b> not required<br/>
<b>Parameters:</b> <br/>
<b>id:</b> channel ID<br/>
</div>

This service endpoint checks whether a listener may connect to a protected channel with `allow_auth_listeners_only=true`.

#### Request parameters

The endpoint accepts parameters in the query string or in the POST body.

- mount: required parameter used to extract the token. It usually contains the mount point and token in the query part, for example `/stream?abc123token`.
- action: connection action type.
- server: server or node name.
- port: connection port.
- client: client identifier.
- user: username, if supplied by the caller.
- pass: password, if supplied by the caller.
- ip: listener IP address.
- agent: listener user-agent.

If the token extracted from `mount` exists in the authorized listener table and is active for the channel server, the endpoint allows the connection.

#### Example response

The endpoint returns an empty HTTP 200 response and sets these headers:

- icecast-auth-user: `1` if the listener is authenticated, otherwise `0`.
- icecast-auth-message: always `auth`.

#### How to get the total number of listeners for a radio station

To get the total listener count for a radio station, request the channel list through `/api/v2/channels/?server=<server_id>` and sum the `listeners_current` field only for channels that are online. The `state` field helps identify the current channel state: `0` means offline, `1` means online but without an active source connection, and `2` means online and actively broadcasting. If you need the current total listeners across all live streams, you will usually sum `listeners_current` for channels with `state = 2`.