---
title: "Пользователи и роли панели"
weight: 68
summary: "Управление пользователями панели вещателя, правами ролей, сроками доступа и сеансами."
seo_title: "API пользователей и ролей панели | Radio-Tochka.com API"
description: "Управление пользователями панели вещателя, правами ролей, сроками доступа и сеансами."
---

## Пользователи и роли

Используйте [`Authorization: JWT <access_token>`](/docs/api/auth/#api-panel-sign-in). Управление ролями и пользователями требует соответствующих прав панели. Для аккаунтов администрирования хостинга используется отдельный [API администратора](/docs/api/admin/).

<div class="api-block" id="api-permission-catalog">
<b>Путь</b> /api/v2/panel_users/permissions/catalog/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Каталог прав для формирования объектов разрешений ролей.

<div class="api-block" id="api-panel-roles">
<b>Путь</b> /api/v2/panel_users/roles/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список или создание роли. Поля — `name`, `description` и `permissions`. Возвращает роль с `id` и `is_builtin`.

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/roles/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение, изменение или удаление роли. Встроенную или назначенную роль удалить нельзя.

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/users/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список или создание пользователя панели. При создании передайте `username`, `email` и `password`. Дополнительно можно передать [`roles` (ID ролей)](/docs/api/panel-users/#api-panel-roles), `is_active` и `access_expires_at` (ISO 8601 или null).

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/users/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение, изменение или удаление пользователя. Аккаунт владельца защищён. Ответ включает `is_owner`, `last_login`, `totp_enabled` и `status`.

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/users/{id}/set_password/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `password`. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/users/{id}/sign_out/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Завершает сеансы пользователя панели. Возвращает HTTP 204.

<div class="api-block" id="api-panel-profile">
<b>Путь</b> /api/v2/panel_users/me/<br/>
<b>Методы HTTP</b> GET, PATCH<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение текущего профиля с ролями и действующими правами или изменение `email` через PATCH. Возвращает профиль.

<div class="api-block">
<b>Путь</b> /api/v2/panel_users/me/sign_out/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Завершает прежние сеансы и возвращает новый JWT-токен в поле `token`.

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

### Пример роли

Каждый [элемент каталога](/docs/api/panel-users/#api-permission-catalog) содержит `key`, `label_i18n_key`, `group` и допустимые `levels`. Объект `permissions` роли сопоставляет ключ с уровнем доступа. Действующие права пользователя по всем ролям возвращает [`/api/v2/panel_users/me/`](/docs/api/panel-users/#api-panel-profile).

```http
POST /api/v2/panel_users/roles/
```

```json
{"name":"Аналитик","description":"Отчёты об аудитории","permissions":{"statistics":"read"}}
```
