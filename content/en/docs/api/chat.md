---
title: "Listener chat and moderation"
weight: 65
summary: "Read rooms and messages, send direct messages, and moderate chat from the panel."
seo_title: "Listener chat and moderation API | Streaming.Center API"
description: "Read rooms and messages, send direct messages, and moderate chat from the panel."
---

## Listener chat

Public room reads can use optional listener authorization where supported. Sending messages, reactions, and direct messages [requires a listener bearer token](/docs/api/listeners/#api-listener-login). Staff routes [require a panel JWT](/docs/api/auth/#api-panel-sign-in) and the [matching chat permission](/docs/api/panel-users/#api-permission-catalog). The paths on this page have no trailing slash.

<div class="api-block" id="api-chat-rooms">
<b>Endpoint</b> /api/v2/chat/rooms<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Pass `station` or `server`. Returns an array of rooms.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/rooms/{id}/messages<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> GET is public. POST requires a listener token.<br/>
</div>

Room message history. Optional `before` is a message ID and `limit` is page size.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/rooms/{id}/messages<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> GET is public. POST requires a listener token.<br/>
</div>

Send `text`, `client_id` and optionally a multipart `photo`. A new message returns HTTP 201. A replay with the same client ID returns HTTP 200.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/photos/{id}/{size}<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Depends on message visibility<br/>
</div>

Returns a permitted chat image. Use the image URLs from the message payload.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/messages/{id}<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Delete a message belonging to the listener. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/messages/{id}/reactions/{emoji}<br/>
<b>HTTP methods</b> PUT, DELETE<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Add or remove the caller’s reaction. Returns `message_id`, `counts` by emoji, the caller’s reactions in `mine` and `actor_emojis`, the `actor` account ID, and `version`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/dms<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

GET lists conversations with `before` and `limit`. POST opens a conversation using either `with_account` (listener ID) or `station`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/dms/{id}/messages<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Read a page of messages or send `text`, `client_id`, and optional multipart `photo`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/dms/{id}/read<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Mark a conversation as read. Returns the updated conversation.

```http
POST /api/v2/chat/rooms/12/messages
```

```json
{
  "text": "Hello from the evening show",
  "client_id": "32d822e2-7d0a-492c-a5e5-49082dd67a15"
}
```

## Staff rooms and inbox

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/rooms<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET lists rooms for `station`. POST accepts `station` and `name` and returns the created room.

<div class="api-block" id="api-staff-room">
<b>Endpoint</b> /api/v2/chat/staff/rooms/{id}<br/>
<b>HTTP methods</b> GET, PATCH, PUT, POST, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Get, change `name` or `archived`, or delete a room with HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/rooms/{id}/rename<br/>
<b>HTTP methods</b> GET, PATCH, PUT, POST, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Alias of [the room detail endpoint](/docs/api/chat/#api-staff-room).

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/rooms/{id}/{action}<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Use `archive` or `unarchive`. Returns the updated room.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/rooms/{id}/reorder<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `station` and `position`. Returns `id` and `position`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/rooms/{id}/messages<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read a message page or send a staff reply with `text` and `client_id`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/dms<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Station inbox. Pass `station` and optionally `limit` and `before`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/dms/{id}<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read a station conversation with the `station` query parameter.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/dms/{id}/messages<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET reads a message page with query `station`. POST takes JSON `station`, `text`, and `client_id`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/dms/{id}/read<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Mark the station conversation read. Pass `station` in the query.

## Moderation and widget

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/messages/{id}<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Remove a message. Accepts `reason_code`. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/sanctions<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Filter by `account` and `station`. To create, send `account`, `kind`, optional `station`, `until`, `reason` and `reason_code`. Returns the sanction object.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/sanctions/{id}/lift<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Lift a sanction. Accepts `reason_code` and returns the updated sanction.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/ip-bans<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List by `station`, or send `ip` or `message_id` with scope and optional expiry and reason fields. Returns the ban object.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/ip-bans/{id}/lift<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Lift an IP ban. Accepts `reason_code`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/listeners<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Search by `q` or `search`, with `page` and `limit`. Returns `results`, `total`, `page`, `limit`, and `pages`.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/listeners/{id}<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Listener profile, sanctions and activity counts.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/listeners/{id}/delete<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Delete a listener account. Accepts `reason_code` and optional `station`. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/chat/staff/listeners/{id}/export<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Download the listener’s data as ZIP.

<div class="api-block" id="api-chat-widget">
<b>Endpoint</b> /api/v2/chat_widget_settings/{station_id}<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read or partially update the station’s chat widget settings. Returns the widget configuration.

### Message and conversation pages

Message histories return `messages`, `has_more`, and `next_before`. Pass `next_before` as the next request’s `before` to load older messages. Page size is limited to 50. Conversation lists return `items`, `has_more`, and a conversation-specific `next_before` cursor.

Message sends return `id`, `message_id`, `duplicate`, `version`, and `message`. A message includes the sender’s `author_id`, `author_name`, `author_kind`, `text`, `created_at`, optional `photo`, reaction counts and lists, and either a `room_id` or a `conversation_id`.

## Chat and moderation values

| Field or parameter | Meaning |
| --- | --- |
| `size` | `display` for the display image or `thumb` for the thumbnail. |
| `emoji` | Emoji character or its hexadecimal Unicode codepoint key from the chat widget’s reaction set. For example, `1f44d` is 👍. Availability follows the widget’s reaction catalog. |
| `kind`, `until` | `mute` prevents sending messages and `ban` blocks chat access. `until` is the expiration time or `null` for no expiration. |
| `reason_code` | `spam`, `abuse` (abusive behavior), `off_topic`, or `other`. |

In the example, `12` is the room ID, and the value of `client_id` is an opaque client-generated message identifier for retry deduplication. Staff listener lookup uses a one-based `page` and a `limit` of 25 by default, at most 100 results per page.
