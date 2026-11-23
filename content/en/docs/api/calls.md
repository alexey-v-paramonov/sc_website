---
title: "Listener calls and realtime connections"
weight: 66
summary: "Check call availability, request admission, manage call settings, and obtain realtime tickets."
seo_title: "Listener calls and realtime API | Streaming.Center API"
description: "Check call availability, request admission, manage call settings, and obtain realtime tickets."
---

## Listener calls

Paths on this page have no trailing slash. The caller endpoints accept [optional listener bearer authorization](/docs/api/listeners/#api-listener-login). The station determines [whether guests may call](/docs/api/calls/#api-call-settings).

<div class="api-block">
<b>Endpoint</b> /api/v2/calls/status<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Optional listener bearer token<br/>
</div>

Pass `station` and optional `browser_id`. Returns `state` (`ok` or `offline`), `cooldown_until`, `who_can_call`, and `logged_in`.

<div class="api-block" id="api-call-request">
<b>Endpoint</b> /api/v2/calls/requests<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Optional listener bearer token<br/>
</div>

Send `station`, `browser_id`, guest `name` when needed, `intro`, and the solved `altcha` payload from an unscoped [listener challenge](/docs/api/listeners/#api-listener-challenge). HTTP 201 returns `call_id`, `call_token`, and `ticket`. HTTP 409 can mean `busy`, `duplicate`, `unavailable`, or `cooldown` with `retry_at` in Unix seconds.

<div class="api-block">
<b>Endpoint</b> /api/v2/calls/requests/{id}/ticket<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Optional listener bearer token<br/>
</div>

Send the `call_token` [from admission](/docs/api/calls/#api-call-request) to obtain another `ticket` with `expires_in` in seconds.

## Panel calls

[Use a panel JWT](/docs/api/auth/#api-panel-sign-in) with access to call management.

<div class="api-block" id="api-call-settings">
<b>Endpoint</b> /api/v2/calls/settings<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET takes query `station`. PUT takes JSON `station` plus any of `enabled`, `who_can_call`, `cooldown_min`, `max_wait_min`, and `max_call_min`. Responses also include the durations in seconds.

<div class="api-block" id="api-call-log">
<b>Endpoint</b> /api/v2/calls/logs<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `station` and optional `date`, `outcome`, `registered`, `limit`, and `offset`. Rows include `id`, timestamps, caller data, `status`, `wait_s`, `call_s`, `air_ms`, and `end_reason`.

<div class="api-block">
<b>Endpoint</b> /api/v2/calls/blocks<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

GET lists blocks for query `station`. POST creates a block with JSON `station`, [`call_id`](/docs/api/calls/#api-call-log), and optional `note`. Returns the block with HTTP 201.

<div class="api-block">
<b>Endpoint</b> /api/v2/calls/blocks/{id}<br/>
<b>HTTP methods</b> DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Remove the call block. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/calls/ice<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `station`. Returns `ice_servers` for the call host.

<div class="api-block" id="api-call-widget">
<b>Endpoint</b> /api/v2/call_widget_settings/{station_id}<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read or partially update widget settings. Returns the station’s call widget configuration.

## Realtime panel tickets

<div class="api-block" id="api-realtime-tickets">
<b>Endpoint</b> /api/v2/realtime/tickets<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Use a panel JWT. Send integer `station`, `role` (`ptt`, `call_host`, or `chat_staff`), and `connection` (`messaging` or `audio`). HTTP 201 returns `ticket` and `expires_in` (30 seconds).

<div class="api-block">
<b>Endpoint</b> /api/v2/realtime/logout<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Revoke realtime access for the current panel session. Returns HTTP 204.

```http
POST /api/v2/realtime/tickets
```

```json
{
  "station": 1,
  "role": "ptt",
  "connection": "audio"
}
```

The ticket response is for opening a connection to the station’s realtime service. Ticket issuance depends on the role being enabled, [station settings](/docs/api/settings/#api-station-settings-detail), and the caller’s permissions. Listener chat uses the [listener ticket endpoint](/docs/api/listeners/#api-listener-ticket) instead.

### Example settings request

The panel settings accept `who_can_call` as `anyone` or `registered`. A value of zero for `cooldown_min` or `max_call_min` disables that limit. `max_wait_min` must be between 1 and 1440.

```http
PUT /api/v2/calls/settings
```

```json
{"station":1,"enabled":true,"who_can_call":"registered","max_wait_min":15}
```

## Call status and log filters

| Field or parameter | Meaning |
| --- | --- |
| `state` | `ok` means calling is available, `offline` means it is unavailable for this caller. |
| `status`, `outcome` | `pending` admission in progress, `queued` waiting for host, `accepted` answered, `ended` closed. The `outcome` query accepts one of these states or an exact `end_reason` from a log row. |
| `registered` | `1`, `true`, or `yes` for accounts; `0`, `false`, or `no` for guests. An omitted or empty value includes both. |
| `date`, `limit`, `offset` | Log date in `YYYY-MM-DD`, result count (50 by default, at most 200), and number of rows to skip (0 starts at the first row), respectively. |
| `browser_id`, `name`, `intro` | Browser identifier of 1–64 characters, guest name up to 40 characters, and optional introduction up to 140 characters. Signed-in callers use their account display name. |

In the examples, `station: 1` selects station ID 1 and `max_wait_min: 15` limits the wait to 15 minutes. `messaging` requests a control or chat connection. `audio` requests an audio connection. Panel roles are `ptt` for push-to-talk, `call_host` for the call host, and `chat_staff` for chat staff.
