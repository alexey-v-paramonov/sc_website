---
title: "Panel users and roles"
weight: 68
summary: "Manage broadcaster panel users, role permissions, access expiry, and sessions."
seo_title: "Panel users and roles API | Streaming.Center API"
description: "Manage broadcaster panel users, role permissions, access expiry, and sessions."
---

## Users and roles

Authenticate with [`Authorization: JWT <access_token>`](/docs/api/auth/#api-panel-sign-in). Role and user management is subject to the panel’s permission checks. Hosting administrator accounts use the separate [Admin API](/docs/api/admin/).

<div class="api-block" id="api-permission-catalog">
<b>Endpoint</b> /api/v2/panel_users/permissions/catalog/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Permission catalog for constructing role permission objects.

<div class="api-block" id="api-panel-roles">
<b>Endpoint</b> /api/v2/panel_users/roles/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List or create a role. Fields are `name`, `description`, and `permissions`. Returns the role with `id` and `is_builtin`.

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/roles/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read, edit, or delete a role. Built-in or assigned roles cannot be deleted.

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/users/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

List or create a panel user. Send `username`, `email`, and `password` on creation. Optional fields include [`roles` (IDs)](/docs/api/panel-users/#api-panel-roles), `is_active` and `access_expires_at` (ISO 8601 or null).

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/users/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read, edit, or delete a user. The account owner is protected. The response includes `is_owner`, `last_login`, `totp_enabled`, and `status`.

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/users/{id}/set_password/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Send `password`. Returns HTTP 204.

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/users/{id}/sign_out/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Invalidate the user’s panel sessions. Returns HTTP 204.

<div class="api-block" id="api-panel-profile">
<b>Endpoint</b> /api/v2/panel_users/me/<br/>
<b>HTTP methods</b> GET, PATCH<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read the current user with roles and effective permissions, or PATCH `email`. Returns the profile.

<div class="api-block">
<b>Endpoint</b> /api/v2/panel_users/me/sign_out/<br/>
<b>HTTP methods</b> POST<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Invalidate prior sessions and issue a replacement JWT in `token`.

```http
POST /api/v2/panel_users/users/
```

```json
{
  "username": "show-host",
  "email": "host@example.com",
  "password": "<new password>",
  "roles": [
    2
  ],
  "is_active": true
}
```

### Example role

Each [permission catalog item](/docs/api/panel-users/#api-permission-catalog) has a `key`, `label_i18n_key`, `group`, and allowed `levels`. A role’s `permissions` object maps each key to its level. To inspect the user’s effective permissions across roles, read [`/api/v2/panel_users/me/`](/docs/api/panel-users/#api-panel-profile).

```http
POST /api/v2/panel_users/roles/
```

```json
{"name":"Analyst","description":"Audience reporting","permissions":{"statistics":"read"}}
```
