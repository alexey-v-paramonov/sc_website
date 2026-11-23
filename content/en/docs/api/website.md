---
title: "Station website and widgets"
weight: 70
summary: "Configure the station site, its embedded widgets, news, and broadcast announcements."
seo_title: "Station website and widgets API | Streaming.Center API"
description: "Configure the station site, its embedded widgets, news, and broadcast announcements."
---

## Website and content

<div class="api-block">
<b>Endpoint</b> /api/startpage/{server_id}/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Public station website HTML. Nested website paths use `/api/startpage/{server_id}/{spa_path}`.

<div class="api-block" id="api-site-settings">
<b>Endpoint</b> /api/v2/site_settings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Pass `server` to obtain its site settings object.

<div class="api-block">
<b>Endpoint</b> /api/v2/site_settings/{station_id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or update the site’s settings. GET uses the station ID in the path. For PUT or PATCH also send `server` in the body or query and include the complete `channels` array of stream IDs.

<div class="api-block">
<b>Endpoint</b> /api/v2/site_settings/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Create site settings for a station with `server` when no record exists.

<div class="api-block">
<b>Endpoint</b> /api/v2/site_settings/{station_id}/<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Delete site settings for the station selected with `?server=1`.

<div class="api-block">
<b>Endpoint</b> /api/v2/startpage/download/{website_id}/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET exports a ZIP. POST publishes the site to the account’s web directory and returns `{}`. The path takes the [site settings record ID](/docs/api/website/#api-site-settings).

<div class="api-block">
<b>Endpoint</b> /api/v2/news/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List by `server`, or create using `server`, `title`, `text`, `dttm`, optional `image` and `video_url`.

<div class="api-block">
<b>Endpoint</b> /api/v2/news/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or manage an article.

<div class="api-block">
<b>Endpoint</b> /api/v2/broadcasts/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

List by `server`, or create using `server`, `title`, `text`, `dttm` and optional `image`.

<div class="api-block">
<b>Endpoint</b> /api/v2/broadcasts/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or manage a broadcast announcement.

<div class="api-block">
<b>Endpoint</b> /api/v2/feedback/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Site feedback form. Send `subject`, `message`, and contact `email`. Returns `status` (`ok`, `no_user`, or `email_exception`) and optional `error`.

For news and announcements, send `dttm` as Unix seconds. Responses return it in milliseconds.

Site properties include `title_tag`, `description_tag`, `block_1_html`, `block_2_html`, `block_footer_html`, social links (`social_*`), app links (`android_app`, `ios_app`, `rustore_app`), and feature switches such as `enable_news`, [`enable_podcasts`](/docs/api/podcasts/#api-podcast-page-settings), [`enable_chat`](/docs/api/chat/#api-chat-rooms), [`enable_calls`](/docs/api/calls/#api-call-settings), and `enable_feedback`.

## Widgets

<div class="api-block">
<b>Endpoint</b> /api/v2/current_track_widget_settings/{station_id}/<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or save current-track widget settings. Fields include `background_color`, `background_opacity`, `track_image_default`, `track_image_size`, `meta_font_size`, `progress_bar_color`, and `vote_show`.

<div class="api-block" id="api-track-request-widget">
<b>Endpoint</b> /api/v2/request_track_widget_settings/{station_id}/<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or save track request widget settings. Fields include `tracks_num`, `track_width`, `ordering`, `allow_person_and_message`, `ip_timeout` and `track_timeout` (milliseconds), and appearance.

<div class="api-block">
<b>Endpoint</b> /api/v2/player_widget_settings/{station_id}/<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> GET is public. Changes require a panel JWT.<br/>
</div>

Read or save player settings. PUT accepts [a comma-separated string of `channels`](/docs/api/channels/#api-channels). Other fields include `station_name`, `station_url`, `lang`, `autoplay`, `player_width`, `show_history`, `history_limit`, and `show_vote`.

<div class="api-block">
<b>Endpoint</b> /api/v2/player_widget_settings/{station_id}/delete/<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Reset the saved player settings.

Widget reads return configuration objects. The three widget PUT endpoints above return HTTP 201 with the saved serializer data. Use multipart form data for uploaded images. Chat and call widgets have their own settings endpoints.

```http
PUT /api/v2/player_widget_settings/1/
```

```json
{
  "station_name": "Example Radio",
  "channels": "11,12",
  "show_history": true,
  "history_limit": 10
}
```

The chat and call widget configurations both accept `background_color`, `text_color`, and `accent_color` as three- or six-digit hex values. `width` accepts 100–2000 pixels and `height` accepts 100–3000 pixels. The call widget also accepts `height: 0`. The chat widget accepts `default_room`, [a room ID from the same station](/docs/api/chat/#api-chat-rooms) or null. Use the widget settings routes in [Chat](/docs/api/chat/#api-chat-widget) and [Calls](/docs/api/calls/#api-call-widget).
