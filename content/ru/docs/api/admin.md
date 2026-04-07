---
title: "Описание API панели администратора"
date: 2025-10-10T11:37:26+03:00
weight: 20
seo_title: Справочник API панели администратора — Авторизация, Создание Станций
description: Полный справочник разработчика по API админки панели управления Интернет-радио Radio-Tochka.com. Включает авторизацию, CRUD операции для создания радио-аккаунтов, провфили с примерами JSON и curl.
---


# Справочник API для панели администратора

Панель администратора используется для добавления и управления вашими радио-аккаунтами на сервере. Обычно URL панели администратора после установки нашей Панели Управления Интернет-радио выглядит примерно так:

`https://stream.radio.ru:2345`

Базовый URL-префикс для API: `/api/v1/`

---

## Авторизация

### POST /api/v1/rest-auth/login/

Описание: endpoint логина в систему, используйте его для получения токена авторизации по логину и паролю админа

Запрос (JSON):

```json
{
  "username": "admin",
  "password": "secret"
}
```

Пример успешного входа (HTTP 200):

```json
{
  "key": "<dj-rest-auth-token>",
  "user": { /* здесь следует информация об аккаунте пользователя */ }
}
```

Пример на curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' \
  https://your-host/api/v1/rest-auth/login/
```

Если в ответе вы получили `key`, используйте его для авторизации последующих запросов через следующий header в HTTP запросах:

```
Authorization: Token <key>
```

---

## Радио-аккаунты

Доступные URL API:
- `GET /api/v1/broadcasters/` — получение списка радио-аккаунтов
- `POST /api/v1/broadcasters/` — создание радио
- `GET /api/v1/broadcasters/{pk}/` — выгрузка определенного аккаунта по ID
- `PUT /api/v1/broadcasters/{pk}/` — изменение радио аккаунта
- `PATCH /api/v1/broadcasters/{pk}/` — частичное изменение
- `DELETE /api/v1/broadcasters/{pk}/` — отметить аккаунт для удаления

Авторизация: Необходима

Поля радио-аккаунта, которые выдает API:
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
- `backup_status`, `backup_auto_type`, `backup_auto_when`, `backup_quick` (поля, относящиеся к статусу бэкапа радио)
- `branded_url`, `branded_url_status` (собственный домен радио-аккаунта)
- `listeners_current`, `du_current`, `traffic_current` (статистика использования количаства слушателей, диска и трафика)

Пример запроса на создание (JSON):

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

Пример успешного ответа при создании (HTTP 201, частично):

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

Пример curl (с авторизацией):

```bash
# First login and obtain token
TOKEN=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' https://your-host/api/v1/rest-auth/login/ | jq -r '.key')

curl -X POST https://your-host/api/v1/broadcasters/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $TOKEN" \
  -d '{"username":"myradio","email":"owner@example.com","password":"initpass","limit_stations":1}'
```

Дополнительные действия broadcaster

- `POST /api/v1/broadcasters/{pk}/backup/`
  - Авторизация: Необходима
  - Примеры JSON-запросов:
    - Запуск backup:
      `{ "action": "backup", "backup_quick": true }`
    - Сохранение расписания:
      `{ "action": "save", "when": 1, "type": 0 }`
  - Response: 200 + данные радио-аккаунта

- `POST /api/v1/broadcasters/{pk}/suspend/` и `/unsuspend/`
  - Авторизация: Необходима
  - Ответ: `{}` при успешном выполнении - отключает или включает обратно радио-аккаунт

- `POST /api/v1/broadcasters/{pk}/login/`
  - Авторизация: Необходима
  - Ответ: `{ "url": "http://host:port", "token": "<jwt>" }`

---

### Реселлеры
Routes:
- `GET /api/v1/resellers/`
- `POST /api/v1/resellers/`
- `GET /api/v1/resellers/{pk}/`
- `PUT /api/v1/resellers/{pk}/`
- `PATCH /api/v1/resellers/{pk}/`
- `DELETE /api/v1/resellers/{pk}/`

Авторизация: Необходима

Поля :
- `pk`, `username`, `email`, `first_name`, `image`
- `accounts_current` (integer) — количество радио-аккаунтов, принадлежащих этому реселлеру
- `limit_accounts`, `limit_listeners`, `limit_du`, `limit_bitrate`, `limit_traffic`
- feature flags такие же, как у broadcaster

Пример создания:

```json
{
  "username": "newreseller",
  "email": "reseller@example.com",
  "password": "respass",
  "limit_accounts": 20
}
```

Пример успешного создания (HTTP 201):

```json
{
  "pk": 11,
  "username": "newreseller",
  "email": "reseller@example.com",
  "accounts_current": 0,
  "limit_accounts": 20
}
```

Пример curl (с авторизацией):

```bash
TOKEN=... # get as earlier
curl -X POST https://your-host/api/v1/resellers/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $TOKEN" \
  -d '{"username":"r1","email":"r1@example.com","password":"secret","limit_accounts":5}'
```

Дополнительное действие:
- `POST /api/v1/resellers/{pk}/login/` — возвращает `TokenModel`, сериализованный через `TokenSerializer`:
  - Пример ответа:

```json
{
  "key": "<token_key>",
  "user": { /* Информация о реселлере */ }
}
```

---

### Профили

`GET /api/v1/user_profile/`
- Авторизация: Необходима
- Ответ: профиль текущего пользователя

Пример ответа (обычный пользователь):

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
- Авторизация: Необходима
- Request: поля из `ProfileSerializer` (обратите внимание, что `username` и `account_type` доступны только для чтения)
- Смена пароля поддерживается при передаче в запросе полей `password` и `password_current`.

Пример запроса на обновление пароля аккаунта и имени:

```json
{
  "first_name": "Alicia",
  "password_current": "oldpass",
  "password": "newpass"
}
```

При успехе возвращается обновленный профиль в формате JSON

---

### Сброс пароля

`POST /api/v1/password_reset/`
- Авторизация: Нет
- Request JSON:
  - `email` (string) - емейл, на который нужно отправить ссылку со сбросом пароля
- Ответ:
  - 200 `{}` при успешном выполнении (отправляет email для сброса пароля)
  - 400 `{"email": ["user_not_found"]}`, если email не найден

Пример curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com"}' https://your-host/api/v1/password_reset/
```

`POST /api/v1/password_reset_confirm/`
- Авторизация: Нет
- JSON запроса:
  - `uid` (base64 encoded user id)
  - `token` (reset token)
  - `password` (string)
- Response:
  - 200 `{}` при успешном выполнении - подтверждение изменения пароля
  - 400 с ошибками serializer или `{"uid": ["user_not_found"]}` при неверном uid

Пример запроса:

```json
{ "uid": "Mg==", "token": "<token>", "password": "newpass" }
```

Пример curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"uid":"<uid>","token":"<token>","password":"newpass"}' https://your-host/api/v1/password_reset_confirm/
```

---

## Migration & remote WHMCS endpoints

> Эти endpoints обычно принимают `server_username` и `server_password` (учетные данные администратора сервера) в request body или query string и аутентифицируют их через Django.

### GET /api/v1/before_migration_check/
Авторизация: необходима
Параметры запроса: `host` (string), `username` (string), `password` (string)

Ответ:
- `200 { "success": true }`, если SFTP-соединение установлено
- `500 { "success": false }` при ошибке аутентификации

Пример curl (для этого endpoint требуется токен авторизованной сессии):

```bash
curl -G -H "Authorization: Token $TOKEN" \
  --data-urlencode "host=host.example" \
  --data-urlencode "username=root" \
  --data-urlencode "password=pass" \
  https://your-host/api/v1/before_migration_check/
```

### GET /api/v1/migration_file_transfer/
Авторизация: необходима
Параметры запроса: `host`, `port`(default 22), `user`, `username`, `password`
Пример успешного ответа:

```json
{ "success": true, "files": 10 }
```

---

### GET /api/v1/remote_get_all_broadcasters/
Авторизация: не требуется (но для аутентификации внутри view требуются параметры запроса `server_username` и `server_password`)

Параметры запроса:
- `server_username` (string)
- `server_password` (string)

Ответ:
- `200 { "broadcasters": [ { <db row dict> }, ... ] }`
- `400 { "error": "Username or password not set" }` или `400 {"error": "Invalid credentials"}`

Пример curl:

```bash
curl -G --data-urlencode 'server_username=admin' --data-urlencode 'server_password=secret' https://your-host/api/v1/remote_get_all_broadcasters/
```

### GET /api/v1/check_username/
Авторизация: не требуется
Параметры запроса: `username`
Ответ:
- `200 { "exists": true|false }`

Пример:

```bash
curl -G --data-urlencode 'username=myradio' https://your-host/api/v1/check_username/
```

### POST /api/v1/remote_admin_login/
Авторизация: не требуется
JSON запроса:
- `username` (server admin username)
- `password` (server admin password)

Ответ:
- `200 { "token": "<token>" }` при успехе
- `400 { "error": "Invalid credentials" }` при ошибке

Пример curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"secret"}' https://your-host/api/v1/remote_admin_login/
```

### POST /api/v1/remote_user_login/
Авторизация: не требуется
JSON запроса:
- `server_username`, `server_password` (для аутентификации администратора сервера)
- `username` (имя учетной записи для получения токена панели)

Ответ при успешном выполнении:
```json
{ "url": "http://host:4000/auth?t=<token>" }
```

### PATCH /api/v1/remote_change_password/
Авторизация: не требуется
JSON запроса:
- `server_username`, `server_password`
- `username` (account username)
- `new_password`

Ответ:
- `200 { "success": true }` при успехе
- `400` с сообщением об ошибке при неудаче

### POST /api/v1/remote_user_suspend/`
### POST /api/v1/remote_user_unsuspend/
### POST /api/v1/remote_user_delete/
Авторизация: не требуется (но в body нужны учетные данные сервера)
JSON запроса:
- `server_username`, `server_password`, `username`
Ответ: `{}` при успехе или 400 с ошибкой

### POST /api/v1/remote_bcaster_create_from_template/
Авторизация: не требуется
JSON запроса (обязательно):
- `server_username`, `server_password`
- `username`, `email`, `password`, `template`
- optional: целевой `server_type`, лимиты (`limit_stations`, `limit_streams`, `limit_listeners`, `limit_bitrate`, `limit_du`, `limit_traffic`) и флаги возможностей (см. поля BroadcasterTemplate)

Ответ:
- `200 {}` при успехе
- `400 { "error": "..." }` при ошибке

### POST /api/v1/remote_get_templates/
Авторизация: не требуется (но требуются учетные данные сервера)
JSON запроса: `server_username`, `server_password`
Пример ответа:

```json
{
  "broadcaster_templates": ["small", "standard"],
  "reseller_templates": ["reseller_basic"]
}
```

### POST /api/v1/remote_get_details/
Авторизация: не требуется (но требуются учетные данные сервера)
JSON запроса: `server_username`, `server_password`, `username`
Ответ: `200` с JSON от `BroadcasterSerializer`

### PATCH /api/v1/remote_update_client/
Авторизация: не требуется
JSON запроса:
- `server_username`, `server_password`, `username`
- `template` или `configoption1` (имя template), либо `template="no_template"` и пользовательские поля
Ответ:
  - `200` с обновленными данными broadcaster serializer или `{}` при применении template
  - `400` при ошибках

---

## Настройки

### GET /api/v1/settings/
Авторизация: опциональна
Ответ: данные настроек. Если пользователь не авторизован, возвращается `SettingsAnonymousSerializer` с полями:
- `company_logo` (file/string)
- `company_name` (string)
- `company_favicon` (file/string)
- `copyright` (string)

Если пользователь авторизован, возвращаются полные настройки, включая SMTP-поля (через `SettingsSerializer`):
- `smtp_host`, `smtp_port`, `smtp_username`, `smtp_password`, `smtp_sender`, `smtp_tls`, `smtp_ssl`

Пример curl (без авторизации):

```bash
curl https://your-host/api/v1/settings/
```

### PUT /api/v1/settings/
Авторизация: необходима для изменения
JSON запроса: поля SettingsSerializer
Ответ: обновленный JSON настроек или 400

### POST /api/v1/settings/test_email/
Авторизация: необходима
JSON запроса:
- `subject` (string)
- `recipient` (email)
- `body` (string)
Ответ:
- 200 `{}` при успешном выполнении
- 400 `{"non_field_errors": ["email_failed"], "smtp_exception": "<error>"}` при ошибке

### GET /api/v1/settings/permanent_stats/
Авторизация: необходима
Пример ответа:

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
Авторизация: необходима
Пример ответа:

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

## Шаблоны

### GET /api/v1/templates/email/
Авторизация: необходима
Параметры запроса:
- `language` (default `en`)
- `email_type` (optional)

Ответ: EmailTemplateSerializer (поля: `owner`, `language`, `email_type`, `subject`, `body`)

### PUT /api/v1/templates/email/
Авторизация: необходима
JSON запроса: `language`, `email_type`, `subject`, `body`
Ответ: обновленный JSON шаблона

### GET /api/v1/templates/email/types/
Авторизация: необходима
Ответ: `EmailType.choices` (массив пар [value, label])

### Шаблоны broadcaster (ViewSet)
Routes под `/api/v1/templates/broadcasters/` (list, create, retrieve, update, delete)

Поля (модель BroadcasterTemplate):
- `name` (string)
- `limit_stations`, `limit_streams`, `limit_bitrate`, `limit_listeners`, `limit_du`, `limit_traffic` (ints)
- `youtube_streaming_enabled`, `fb_streaming_enabled`, `vk_streaming_enabled`, `tg_streaming_enabled` (bools)
- `geoblocking_enabled`, `stereo_tool_enabled`, `url_branding_enabled`, `website_enabled`, `tts_enabled`, `podcasts_enabled`, `save_dj_streams_enabled` (bools)
- `server_type` (string; one of ServerType choices)

Пример запроса на создание:

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

### Шаблоны reseller (ViewSet)
Routes под `/api/v1/templates/resellers/`
Поля аналогичны модели `ResellerTemplate`.

---

## Лицензия

### GET /api/v1/license/
Авторизация: необходима
Ответ: если лицензия существует, возвращается объект `license.license_info()` со структурой:
- `sc` (bool)
- `key` (string)
- `version` (string)
- `last_version` (string|null)
- `info` (object) — информация о лицензии от вендора (например, `{ "valid": true }`)
- `changes` (iterable/list) — сообщения об изменениях
- `update_available` (bool)

Если лицензия отсутствует: `400 { "license": ["not_found"] }`

### PUT /api/v1/license/
Авторизация: необходима
JSON запроса: `license_key` (string)
Ответ: JSON от LicenseSerializer с полями модели (`key`, `local_key`, `version`, `data`)

---

## Ошибки и соглашения
- Ошибки валидации и serializer возвращают HTTP 400 с JSON-объектом вида field -> список кодов или сообщений об ошибках.
- Многие endpoints возвращают простой `{}` или `{"success": true}` при успешном выполнении операций с побочным эффектом.

