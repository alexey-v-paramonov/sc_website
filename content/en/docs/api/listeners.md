---
title: "Listener accounts"
weight: 64
summary: "Register and authenticate listeners, manage profiles and blocks, and issue chat connection tickets."
seo_title: "Listener accounts API | Streaming.Center API"
description: "Register and authenticate listeners, manage profiles and blocks, and issue chat connection tickets."
---

## Listener authentication

Use the session `token` [from login](/docs/api/listeners/#api-listener-login) in `Authorization: Bearer <listener_token>`. The listener token is distinct from [the panel JWT](/docs/api/auth/#api-panel-sign-in), [the streaming access token](/docs/api/settings/#api-stream-access), and [the API key](/docs/api/settings/#api-api-keys). The paths below have no trailing slash.

<div class="api-block" id="api-listener-challenge">
<b>Endpoint</b> /api/v2/listeners/challenge<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Pass `purpose` as `register`, `resend`, or `reset`. Omit it for a general-purpose challenge. Returns a signed, single-use ALTCHA challenge. Submit the solved payload as `altcha`.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/register<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send `email`, `display_name`, `password`, [challenge and solution](/docs/api/listeners/#api-listener-challenge), and optional `language`. Returns HTTP 202 with `status: pending_confirmation`, or a session and profile when registration immediately verifies the account.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/resend-confirmation<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send `email` and the corresponding [challenge and solution](/docs/api/listeners/#api-listener-challenge). Returns HTTP 202 with `status: accepted`.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/confirm<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send email confirmation `token` in the body or query. Returns `{"status":"confirmed"}`.

<div class="api-block" id="api-listener-login">
<b>Endpoint</b> /api/v2/listeners/login<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send `email` and `password`. Returns `token` and `account` or HTTP 401.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/logout<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Revoke the current listener session. Returns HTTP 204.

<div class="api-block" id="api-listener-reset">
<b>Endpoint</b> /api/v2/listeners/password-reset<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send `email` and the reset [challenge and solution](/docs/api/listeners/#api-listener-challenge). Returns HTTP 202 with `status: accepted`.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/password-reset/confirm<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send [reset `token`](/docs/api/listeners/#api-listener-reset) and the new `password`. Returns `{"status":"changed"}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/password<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Send `current_password` and `new_password` with listener authorization. Returns a new `token` and `account`.

<div class="api-block">
<b>Endpoint</b> /api/listeners/landing/confirm<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Public<br/>
</div>

GET with `token` renders the confirmation form. POST with form `token` confirms the email. Both return HTML.

<div class="api-block">
<b>Endpoint</b> /api/listeners/landing/reset<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Public<br/>
</div>

GET with `token` renders the reset form. POST takes form `token`, `password`, and optional `password_confirm`. Both return HTML.

```http
POST /api/v2/listeners/login
```

```json
{
  "email": "listener@example.com",
  "password": "<listener password>"
}
```

The `account` profile includes `id`, `email`, `display_name`, `language`, `email_verified`, `created_at`, and `last_seen_at`. Listener endpoints use an `error` code in error responses and can return HTTP 429 with `Retry-After` when rate limited.

## Profile, blocks, and messaging

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/me<br/>
<b>HTTP methods</b> GET, PATCH<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Read the current profile. PATCH accepts `display_name`, `language`, or both. Returns the updated profile.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/me/delete<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Send `password` to delete the current listener account. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/me/export<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Download the listener’s account data as ZIP.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners/blocks<br/>
<b>HTTP methods</b> GET, POST, DELETE<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

GET returns `blocks`. POST with JSON `account` blocks that listener and returns the block. DELETE with query `account` removes the block and returns HTTP 204.

<div class="api-block" id="api-listener-ticket">
<b>Endpoint</b> /api/v2/listeners/realtime/ticket<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Listener bearer token<br/>
</div>

Send `station` for [a chat connection](/docs/api/chat/#api-chat-rooms). HTTP 201 returns `ticket` and `expires_in` (30 seconds).

## Listener parameter values

Challenge `purpose` is `register` for account creation, `resend` for another confirmation email, or `reset` for password reset. Omitting it requests a general challenge. `email_verified` is `true` for a confirmed email and `false` otherwise. `account` in a block request identifies the other listener. `station` in a ticket request identifies the station that the ticket grants access to.

## Profile and challenge limits

`display_name` is the visible listener name, with 3–32 characters after trimming spaces. `email` is the address used for sign-in and confirmation. `password` is at least 8 characters and must pass strength checks. `language` is a locale tag of at most 16 characters and defaults to `en` (English). Where a translation is missing, the server uses English.

`altcha` contains the solved challenge. The challenge expires after 10 minutes. The messaging `ticket` is a separate temporary credential and `expires_in` gives its lifetime in seconds.
