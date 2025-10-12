---
title: "Admin Area API description"
date: 2025-10-10T11:37:26+03:00
weight: 20
seo_title: Admin Area API Reference — Authentication, Broadcasters & Resellers
description: Complete developer reference for the streamingCenter Admin API (v1). Covers authentication, broadcaster and reseller CRUD and actions, profile/password-reset, and migration/WHMCS endpoints with JSON and curl examples.
---


# API Reference for the Admin area

Admin area is where you add or manage your broadcaster clients. Typically the URL for the admin area is something like:

`https://stream.radio.com:2345`

And the base URL prefix for the API is: `/api/v1/`

---

## Authentication endpoints

### POST /api/v1/rest-auth/login/
Auth: No

Description: login endpoint, use it to get the authentication token.

Request (JSON):

```json
{
  "username": "admin",
  "password": "secret"
}
```

Successful login example (HTTP 200):

```json
{
  "key": "<dj-rest-auth-token>",
  "user": { /* token serializer includes nested user profile */ }
}
```

Curl example (dj-rest-auth token flow):

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' \
  https://your-host/api/v1/rest-auth/login/
```

If you receive a `key` in response use it to authenticate further requests via header:

```
Authorization: Token <key>
```

---

## Users

### Broadcasters (ModelViewSet)
Routes:
- `GET /api/v1/broadcasters/` — list
- `POST /api/v1/broadcasters/` — create
- `GET /api/v1/broadcasters/{pk}/` — retrieve
- `PUT /api/v1/broadcasters/{pk}/` — update
- `PATCH /api/v1/broadcasters/{pk}/` — partial update
- `DELETE /api/v1/broadcasters/{pk}/` — mark as BEING_DELETED

Auth: Required (IsAuthenticated)

Fields (subset of `RadioUser` via `BroadcasterSerializer`):
- `pk` (int)
- `username` (string)
- `email` (string)
- `first_name` (string)
- `image` (string)
- `owner` (object | nested ResellerSerializer)
- `account_type` (int)
- `account_status` (int, read-only)
- `account_status_display` (string)
- `panel_port` (int)
- `default_channel_port` (int)
- `port_range_min` (int)
- `port_range_max` (int)
- `stations_current` (int)
- `limit_stations`, `limit_streams`, `limit_listeners`, `limit_bitrate`, `limit_du`, `limit_traffic` (ints)
- `youtube_streaming_enabled`, `fb_streaming_enabled`, `vk_streaming_enabled`, `tg_streaming_enabled` (bools)
- `geoblocking_enabled`, `stereo_tool_enabled`, `url_branding_enabled` (bools)
- `website_enabled`, `tts_enabled`, `podcasts_enabled`, `save_dj_streams_enabled` (bools)
- `backup_status`, `backup_auto_type`, `backup_auto_when`, `backup_quick` (backup-related fields)
- `branded_url`, `branded_url_status` (branding)
- `listeners_current`, `du_current`, `traffic_current` (usage statistics)

Create request example (JSON):

```json
{
  "username": "myradio",
  "email": "owner@example.com",
  "password": "initpass",
  "limit_stations": 1,
  "limit_listeners": 100,
  "server_type": "icecast"
}
```

Create success response (HTTP 201) — example (partial):

```json
{
  "pk": 123,
  "username": "myradio",
  "email": "owner@example.com",
  "owner": { "pk": 1, "username": "reseller" },
  "limit_stations": 1,
  "limit_listeners": 100,
  "server_type": "icecast",
  "is_active": false
}
```

Curl example (Authenticated):

```bash
# First login and obtain token
TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' https://your-host/api/v1/rest-auth/login/ | jq -r '.key')

curl -X POST https://your-host/api/v1/broadcasters/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $TOKEN" \
  -d '{"username":"myradio","email":"owner@example.com","password":"initpass","limit_stations":1}'
```

Custom broadcaster actions

- `GET /api/v1/broadcasters/{pk}/download_backup/?t=<token>`
  - Auth: HasTokenInURL — requires `t` query param (a DefaultTokenModel key)
  - Response: file attachment (gzip)

- `POST /api/v1/broadcasters/{pk}/backup/`
  - Auth: Required
  - Request JSON examples:
    - Trigger backup:
      `{ "action": "backup", "backup_quick": true }`
    - Save schedule:
      `{ "action": "save", "when": 1, "type": 0 }`
  - Response: 200 + broadcaster serializer data

- `POST /api/v1/broadcasters/{pk}/suspend/` and `/unsuspend/`
  - Auth: Required
  - Response: `{}` on success

- `POST /api/v1/broadcasters/{pk}/login/`
  - Auth: Required
  - Response: `{ "url": "http://host:port", "token": "<jwt>" }`

---

### Resellers (ModelViewSet)
Routes:
- `GET /api/v1/resellers/`
- `POST /api/v1/resellers/`
- `GET /api/v1/resellers/{pk}/`
- `PUT /api/v1/resellers/{pk}/`
- `PATCH /api/v1/resellers/{pk}/`
- `DELETE /api/v1/resellers/{pk}/`

Auth: Required

Reseller fields (ResellerSerializer):
- `pk`, `username`, `email`, `first_name`, `image`
- `accounts_current` (integer) — number of broadcasters owned by this reseller
- `limit_accounts`, `limit_listeners`, `limit_du`, `limit_bitrate`, `limit_traffic`
- feature flags same as broadcaster fields

Create example:

```json
{
  "username": "newreseller",
  "email": "reseller@example.com",
  "password": "respass",
  "limit_accounts": 20
}
```

Create success (HTTP 201):

```json
{
  "pk": 11,
  "username": "newreseller",
  "email": "reseller@example.com",
  "accounts_current": 0,
  "limit_accounts": 20
}
```

Curl example (Authenticated):

```bash
TOKEN=... # get as earlier
curl -X POST https://your-host/api/v1/resellers/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $TOKEN" \
  -d '{"username":"r1","email":"r1@example.com","password":"secret","limit_accounts":5}'
```

Extra action:
- `POST /api/v1/resellers/{pk}/login/` — returns a `TokenModel` serialized via `TokenSerializer`:
  - Response example:

```json
{
  "key": "<token_key>",
  "user": { /* ProfileResellerSerializer or ProfileSerializer nested */ }
}
```

---

### Profile endpoints

`GET /api/v1/user_profile/`
- Auth: Required
- Response: current user profile (ProfileSerializer or ProfileResellerSerializer)

Example response (regular user):

```json
{
  "pk": 2,
  "email": "user@example.com",
  "first_name": "Alice",
  "image": "/media/user/user_default.png",
  "username": "user",
  "account_type": 2,
  "allows_reseller": false,
  "youtube_streaming_enabled": false
}
```

`PUT /api/v1/user_profile/`
- Auth: Required
- Request: fields from `ProfileSerializer` (note `username` and `account_type` are read-only)
- Password change supported by including `password` and `password_current` fields in the request.

Example update request:

```json
{
  "first_name": "Alicia",
  "password_current": "oldpass",
  "password": "newpass"
}
```

Success: returns updated profile JSON

---

### Password reset endpoints

`POST /api/v1/password_reset/`
- Auth: No
- Request JSON:
  - `email` (string)
- Response:
  - 200 `{}` on success (sends reset email)
  - 400 `{"email": ["user_not_found"]}` if email not found

Example curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com"}' https://your-host/api/v1/password_reset/
```

`POST /api/v1/password_reset_confirm/`
- Auth: No
- Request JSON:
  - `uid` (base64 encoded user id)
  - `token` (reset token)
  - `password` (string)
- Response:
  - 200 `{}` on success
  - 400 with serializer errors or `{"uid": ["user_not_found"]}` on bad uid

Example request:

```json
{ "uid": "Mg==", "token": "<token>", "password": "newpass" }
```

Curl example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"uid":"<uid>","token":"<token>","password":"newpass"}' https://your-host/api/v1/password_reset_confirm/
```

---

## Migration & remote WHMCS endpoints

> These endpoints typically accept `server_username` and `server_password` (server admin credentials) in request body/query and authenticate them using Django.

### GET /api/v1/before_migration_check/
Auth: Required
Query params: `host` (string), `username` (string), `password` (string)

Response:
- `200 { "success": true }` if SFTP connection established
- `500 { "success": false }` on authentication failure

Example curl (authenticated session token required for this endpoint):

```bash
curl -G -H "Authorization: Token $TOKEN" \
  --data-urlencode "host=host.example" \
  --data-urlencode "username=root" \
  --data-urlencode "password=pass" \
  https://your-host/api/v1/before_migration_check/
```

### GET /api/v1/migration_file_transfer/
Auth: Required
Query params: `host`, `port`(default 22), `user`, `username`, `password`
Response example (success):

```json
{ "success": true, "files": 10 }
```

---

### GET /api/v1/remote_get_all_broadcasters/
Auth: No (but requires `server_username` and `server_password` query params to authenticate inside view)

Query params:
- `server_username` (string)
- `server_password` (string)

Response:
- `200 { "broadcasters": [ { <db row dict> }, ... ] }`
- `400 { "error": "Username or password not set" }` or `400 {"error": "Invalid credentials"}`

Curl example:

```bash
curl -G --data-urlencode 'server_username=admin' --data-urlencode 'server_password=secret' https://your-host/api/v1/remote_get_all_broadcasters/
```

### GET /api/v1/check_username/
Auth: No
Query params: `username`
Response:
- `200 { "exists": true|false }`

Example:

```bash
curl -G --data-urlencode 'username=myradio' https://your-host/api/v1/check_username/
```

### POST /api/v1/remote_admin_login/
Auth: No
Request JSON:
- `username` (server admin username)
- `password` (server admin password)

Response:
- `200 { "token": "<token>" }` on success
- `400 { "error": "Invalid credentials" }` on failure

Curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' https://your-host/api/v1/remote_admin_login/
```

### POST /api/v1/remote_user_login/
Auth: No
Request JSON:
- `server_username`, `server_password` (to authenticate server admin)
- `username` (account username to get panel token for)

Response (success):
```json
{ "url": "http://host:4000/auth?t=<token>" }
```

### PATCH /api/v1/remote_change_password/
Auth: No
Request JSON:
- `server_username`, `server_password`
- `username` (account username)
- `new_password`

Response:
- `200 { "success": true }` on success
- `400` with error message if failure

### POST /api/v1/remote_user_suspend/`
### POST /api/v1/remote_user_unsuspend/
### POST /api/v1/remote_user_delete/
Auth: No (but require server credentials in body)
Request JSON:
- `server_username`, `server_password`, `username`
Response: `{}` on success or 400 with error

### POST /api/v1/remote_bcaster_create_from_template/
Auth: No
Request JSON (required):
- `server_username`, `server_password`
- `username`, `email`, `password`, `template`
- optional: target `server_type`, limits (`limit_stations`, `limit_streams`, `limit_listeners`, `limit_bitrate`, `limit_du`, `limit_traffic`) and feature flags (see BroadcasterTemplate fields)

Response:
- `200 {}` on success
- `400 { "error": "..." }` on failure

### POST /api/v1/remote_get_templates/
Auth: No (but requires server credentials)
Request JSON: `server_username`, `server_password`
Response example:

```json
{
  "broadcaster_templates": ["small", "standard"],
  "reseller_templates": ["reseller_basic"]
}
```

### POST /api/v1/remote_get_details/
Auth: No (but requires server credentials)
Request JSON: `server_username`, `server_password`, `username`
Response: `200` with `BroadcasterSerializer` JSON

### PATCH /api/v1/remote_update_client/
Auth: No
Request JSON:
- `server_username`, `server_password`, `username`
- `template` or `configoption1` (template name), or `template="no_template"` and custom fields
Response:
- `200` with updated broadcaster serializer data or `{}` for template apply
- `400` on errors

---

## Settings

### GET /api/v1/settings/
Auth: optional
Response: Settings data. If unauthenticated returns `SettingsAnonymousSerializer` with fields:
- `company_logo` (file/string)
- `company_name` (string)
- `company_favicon` (file/string)
- `copyright` (string)

If authenticated returns full settings including SMTP fields (via `SettingsSerializer`):
- `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_sender`, `smtp_tls`, `smtp_ssl`

Curl example (no auth):

```bash
curl https://your-host/api/v1/settings/
```

### PUT /api/v1/settings/
Auth: required to modify
Request JSON: fields of SettingsSerializer
Response: updated settings JSON or 400

### POST /api/v1/settings/test_email/
Auth: Required
Request JSON:
- `subject` (string)
- `recipient` (email)
- `body` (string)
Response:
- 200 `{}` on success
- 400 `{"non_field_errors": ["email_failed"], "smtp_exception": "<error>"}` on failure

### GET /api/v1/settings/permanent_stats/
Auth: Required
Response example:

```json
{
  "hostname": "example.com",
  "ip": "192.0.2.1",
  "os": "Ubuntu...",
  "cpu_cores": "4",
  "cpu_model": "Intel(R)"
}
```

### GET /api/v1/settings/dynamic_stats/
Auth: Required
Response example:

```json
{
  "broadsters_num": 10,
  "resellers_num": 2,
  "listeners_num": 1234,
  "r_kbps": 10.5,
  "t_kbps": 5.1,
  "du_free": 1234567890,
  "du_free_readable": "1.2GiB",
  "du_total": 9876543210,
  "du_total_readable": "9.2GiB",
  "uptime": " 10:23:45 up 1 day",
  "ram_free_megabytes": 2048,
  "ram_total_megabytes": 8192,
  "cpu_load": "12.34"
}
```

---

## Templates

### GET /api/v1/templates/email/
Auth: Required
Query params:
- `language` (default `en`)
- `email_type` (optional)

Response: EmailTemplateSerializer (fields: `owner`, `language`, `email_type`, `subject`, `body`)

### PUT /api/v1/templates/email/
Auth: Required
Request JSON: `language`, `email_type`, `subject`, `body`
Response: updated template JSON

### GET /api/v1/templates/email/types/
Auth: Required
Response: `EmailType.choices` (array of [value, label] pairs)

### Broadcaster templates (ViewSet)
Routes under `/api/v1/templates/broadcasters/` (list, create, retrieve, update, delete)

Fields (BroadcasterTemplate model):
- `name` (string)
- `limit_stations`, `limit_streams`, `limit_bitrate`, `limit_listeners`, `limit_du`, `limit_traffic` (ints)
- `youtube_streaming_enabled`, `fb_streaming_enabled`, `vk_streaming_enabled`, `tg_streaming_enabled` (bools)
- `geoblocking_enabled`, `stereo_tool_enabled`, `url_branding_enabled`, `website_enabled`, `tts_enabled`, `podcasts_enabled`, `save_dj_streams_enabled` (bools)
- `server_type` (string; one of ServerType choices)

Example create request:

```json
{
  "name": "standard",
  "limit_stations": 1,
  "limit_streams": 1,
  "limit_listeners": 500,
  "server_type": "icecast",
  "youtube_streaming_enabled": true
}
```

### Reseller templates (ViewSet)
Routes under `/api/v1/templates/resellers/`
Fields similar to `ResellerTemplate` model.

---

## License

### GET /api/v1/license/
Auth: Required
Response: If license exists returns `license.license_info()` object with structure:
- `sc` (bool)
- `key` (string)
- `version` (string)
- `last_version` (string|null)
- `info` (object) — vendor-specific license info (e.g., `{ "valid": true }`)
- `changes` (iterable/list) — change messages
- `update_available` (bool)

If no license exists: `400 { "license": ["not_found"] }`

### PUT /api/v1/license/
Auth: Required
Request JSON: `license_key` (string)
Response: LicenseSerializer JSON with model fields (`key`, `local_key`, `version`, `data`)

---

## Errors & conventions
- Validation and serializer errors return HTTP 400 with a JSON mapping of field -> list of error codes/messages.
- Many endpoints return a simple `{}` or `{"success": true}` on success for side-effect operations.

---

If you want, I can:
- Add example `curl` commands for every single endpoint showing how to include the `Authorization: Token <key>` header when needed (I already included samples in the main flows). I can expand that to every endpoint verbosely.
- Generate a short table of endpoints at the top for quick navigation.


---

End of API reference.
