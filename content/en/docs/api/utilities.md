---
title: "Storage and tools"
weight: 71
summary: "Check disk usage and find a free streaming port, generate voiceovers, and retrieve admin notifications."
seo_title: "Storage and tools API | Streaming.Center API"
description: "Check disk usage and find a free streaming port, generate voiceovers, and retrieve admin notifications."
---

## Disk usage and streaming ports

<div class="api-block">
<b>Endpoint</b> /api/v2/du/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Returns `du_free_gb`, `du_total_gb`, `du_free_mb`, `du_total_mb`, `show_mb`, `du_overspending`, and `is_unlimited` for the authenticated account.

<div class="api-block" id="api-free-port">
<b>Endpoint</b> /api/v2/catalog/free_port/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Returns the available streaming port as `port`.

## Voiceover and developer feedback

<div class="api-block" id="api-tts">
<b>Endpoint</b> /api/v2/tts/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Submit form fields `text`, `lang`, `voice`, `speed`, and `emotion`. The service JSON includes `audio` on success. Pass it as `mp3_base64` [to save the result](/docs/api/utilities/#api-tts-save).

<div class="api-block" id="api-tts-save">
<b>Endpoint</b> /api/v2/tts_save/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Save [generated MP3 audio](/docs/api/utilities/#api-tts). Send `mp3_base64`, `server_id`, `filename`, optional metadata `author`, `title`, and `destination` (`media` by default, or `jingles`). Music accepts `media_dir` and [optional `playlist`](/docs/api/playlists/#api-playlists); [jingles accept `jingle_dir`](/docs/api/jingles/#api-jingles). Returns `{}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/developer_feedback/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send JSON `message` (20–10,000 characters) and optionally `server_id`, `locale`, `page_path`, and `frontend_version`. HTTP 201 returns the receipt `id`. Upstream failures can return HTTP 502, 503, or 504.

## Admin and reseller notifications

<div class="api-block">
<b>Endpoint</b> /api/v2/admin_notifications/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Returns `enabled` and `items` for the authenticated account. Each item has `id`, `title`, `body_html`, and UTC `published_at`.

<div class="api-block">
<b>Endpoint</b> /api/v2/admin_notifications/{id}/dismiss/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Dismiss the notification. Returns HTTP 204.

```http
GET /api/v2/admin_notifications/
```

```json
{
  "enabled": true,
  "items": []
}
```

## Utility values

`du_free_gb` and `du_total_gb` are free and total space in binary gigabytes. The `*_mb` variants use binary megabytes. `show_mb` indicates which display unit to use, `du_overspending` is usage above quota in megabytes, and `is_unlimited` indicates an unlimited disk quota. `port` is the free streaming port number.

Voiceover `text` is the text to synthesize, `lang` selects a language/locale, `voice` selects a voice for that locale, `speed` is its speaking rate multiplier, and `emotion` is the voice style. Available combinations depend on the voiceover service and are shown in the panel’s voice picker.
