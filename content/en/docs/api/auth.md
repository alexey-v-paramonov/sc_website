---
title: "Authentication"
date: 2024-08-23T11:37:26+03:00
weight: 30
seo_title: "API Authentication & Authorization | Streaming.Center API Docs"
description: "Learn how to securely authenticate with the Streaming.Center API using API keys. Step-by-step guide with code examples for implementing secure API authentication."
---

Most API requests are aimed at getting information about the status of the radio, but in some cases there is a need:
- get information that is not public, for example, a [list of DJs](/docs/api/djs/#api-djs) on the radio with access passwords
- make changes on the radio server, for example, [add a new channel](/docs/api/channels/#api-channels), server, [create a playlist](/docs/api/playlists/#api-playlists) and so on.

In such cases, the API will require authorization upon request.
Our Internet Radio platform supports a standard authorization mechanism for the API: keys that you can manage in the Settings -> API Keys section of the Internet Radio control panel.

In general, the process looks like this:
- a new API key is created in the "API Keys" section of the broadcaster Web-interface
- this key is specified when making API requests in the HTTP header
- the API checks for the key in the request, checks its correctness and executes the request if the key is valid.

Please note that when working with API keys, it is critically necessary to work over the HTTPS protocol, otherwise API keys may be compromised.

#### API Key usage example code.

In the "Settings" -> "API Keys" section of the Internet Radio Control Panel, a key was created: **YOUR_API_KEY**. In your case, you need to go to this section yourself, get your own key and use it, in the article the specified key is used **only for demonstration** and will not work with your API!

To demonstrate, we will create a random playlist with the name "Test Playlist" on the server with ID 1. The request is made by the POST method at [`/api/v2/playlists/`](/docs/api/playlists/#api-playlists) URL:

{{< highlight python  >}}

import requests

payload = {
   "name":"Test Playlist",
   "is_random":True,
   "server":1
}

headers = {"SC-API-KEY": "YOUR_API_KEY"}
response = requests.post("https://demo.streaming.center:8080/api/v2/playlists/", headers=headers, json=payload)

{{< / highlight >}}

HTTP header **"SC-API-KEY"** is used to transmit the key, a missing or invalid key is rejected on endpoints that require a key or panel user authentication. The header is supported only by endpoints that explicitly accept API keys.

Any key can be revoked, the system allows you to create any number of keys and for each of them you can specify the expiration date.

For key creation, expiry dates, and revocation via the API, see [API keys](/docs/api/settings/#api-api-keys).

<a id="api-panel-sign-in"></a>

## Sign in to the broadcaster panel

Use HTTPS for credentials and tokens. Panel JWTs are separate from the keys above and from [listener sessions](/docs/api/listeners/#api-listener-login). Use a panel JWT for endpoints that require a signed-in panel user.

```http
POST /api/v2/api-token-auth/
```

```json
{
  "username": "show-host",
  "password": "<panel password>"
}
```

The response includes `access` and `refresh`. Send the access token as `Authorization: JWT <access>`. Call the sign-in endpoint again when the access token expires. If the account uses [two-factor authentication](/docs/api/auth/#api-two-factor), include a current `otp` string or a single-use `recovery_code`. A missing code gives HTTP 400 with `detail: otp_required`.

<div class="api-block">
<b>Endpoint</b> /api/v2/auth_user/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

[Current panel identity](/docs/api/panel-users/#api-panel-profile), roles, effective `permissions`, ownership flag and `access_expires_at`. JWT required.

<div class="api-block">
<b>Endpoint</b> /api/v2/change_password/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

JWT required. Send `old_password` and `new_password`. Returns replacement `token` and invalidates earlier tokens.

<div class="api-block">
<b>Endpoint</b> /api/v2/remind_password/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Send `email` and optionally `lang` to request password reset. Returns an empty HTTP 200 on acceptance.

<div class="api-block">
<b>Endpoint</b> /api/v2/tokenized_change_password/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Public<br/>
</div>

Submit `u` and `t` from the reset link and the new `password`. Returns `{}`.

<a id="api-two-factor"></a>

## Two-factor authentication

These endpoints require the current user’s panel JWT.

<div class="api-block">
<b>Endpoint</b> /api/v2/totp/status/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Returns `enabled`, `confirmed`, and `recovery_codes_remaining`.

<div class="api-block">
<b>Endpoint</b> /api/v2/totp/setup/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Begin enrollment. Returns `secret`, provisioning `uri`, and `qr_svg`.

<div class="api-block">
<b>Endpoint</b> /api/v2/totp/confirm/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `code` from the authenticator app. Enables 2FA and returns single-use `recovery_codes`.

<div class="api-block">
<b>Endpoint</b> /api/v2/totp/disable/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send current `password` to disable 2FA. Returns `{}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/totp/regenerate/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Replace previously issued recovery codes. Returns new `recovery_codes`.

## Authentication example values

The example creates a playlist on station ID 1. `is_random: true` enables shuffle and `false` uses sequential playback. The `otp` and `code` values are strings from the authenticator app. Keep any leading zeroes.
