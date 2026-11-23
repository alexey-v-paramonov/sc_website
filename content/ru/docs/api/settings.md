---
title: "Настройки станции и доступ"
weight: 69
summary: "Настройка AutoDJ и аккаунта, управление ключами API, пользователями FTP и правилами доступа слушателей."
seo_title: "API настроек станции и доступа | Radio-Tochka.com API"
description: "Настройка AutoDJ и аккаунта, управление ключами API, пользователями FTP и правилами доступа слушателей."
---

## Настройки станции и аккаунта

Для защищённых методов передавайте [JWT-токен, полученный при входе в панель управления](/docs/api/auth/#api-panel-sign-in). У пользователя должны быть права на запрашиваемую операцию. В путях [`server_settings`](/docs/api/settings/#api-station-settings) и [`stereo_tool_settings`](/docs/api/settings/#api-stereo-tool-settings) используется ID записи настроек. Для его получения запросите список с `?server=1`.

<div class="api-block">
<b>Путь</b> /api/v2/settings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Признаки доступности функций установки и аккаунта, включая HLS, подкасты, сайт, синтез речи, подключения в реальном времени и деморежим.

<div class="api-block">
<b>Путь</b> /api/v2/global_settings/<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET возвращает глобальные настройки и `email` аккаунта. PUT принимает `statistic_password`, `language` и `email`, возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/copyright_settings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Оформление с полями `logo`, `copyright`, `copyright_mode` и необязательным `favicon`.

<div class="api-block">
<b>Путь</b> /api/v2/url_branding_settings/<br/>
<b>Методы HTTP</b> GET, PUT, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение настроек домена, установка `branded_url` или удаление привязки. Успешный PUT возвращает HTTP 204.

<div class="api-block" id="api-station-settings">
<b>Путь</b> /api/v2/server_settings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список настроек станций.

<div class="api-block" id="api-station-settings-detail">
<b>Путь</b> /api/v2/server_settings/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение или обновление настроек AutoDJ. Возвращает конфигурацию.

<div class="api-block">
<b>Путь</b> /api/v2/server_settings/{id}/rescan_library/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Запрашивает полное пересканирование медиатеки. Возвращает настройки станции с временными метками сканирования. Для повторного анализа отдельных файлов используйте [`POST /api/v2/music/rescan_files/`](/docs/api/playlists/#api-music-rescan).

<div class="api-block" id="api-stereo-tool-settings">
<b>Путь</b> /api/v2/stereo_tool_settings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список настроек Stereo Tool для станций.

<div class="api-block">
<b>Путь</b> /api/v2/stereo_tool_settings/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение или изменение `stereotool_enabled`, `stereotool_key` и файла `stereotool_settings`. Ответ включает `stereotool_status`, `stereotool_status_debug` и `master_stereo_tool_enabled`.

`crossfade_track` и `crossfade_dj` — длительность переходов между треками и источниками в секундах от 0 до 60 с дробной частью. Другие настройки включают `crossfade_mode`, `autodj_resume_mode`, `random_mode`, `same_artist_interval`, `normalize_volume`, `trim_silence` и пороги тишины, `timezone_name`, [`ptt_enabled`](/docs/api/calls/#api-realtime-tickets), `output_meta_format`, `static_metadata` и [`request_moderation`](/docs/api/track-requests/#api-track-requests). Поля `server`, `library_rescan_requested_at` и `library_rescan_completed_at` доступны только для чтения.

```http
PATCH /api/v2/server_settings/3/
```

```json
{
  "crossfade_track": "3.25",
  "crossfade_dj": "1.50"
}
```

## Ключи API и FTP

<div class="api-block" id="api-api-keys">
<b>Путь</b> /api/v2/api_keys/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список свойств ключей или создание с `name` и необязательным `expiry_date` (ISO 8601). Полный `key` возвращается только при создании с HTTP 201.

<div class="api-block">
<b>Путь</b> /api/v2/api_keys/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение, изменение или удаление ключа. Поля записи — `created`, `name`, `revoked`, `is_currently_active` и `expiry_date`.

<div class="api-block" id="api-ftp-users">
<b>Путь</b> /api/v2/ftpusers/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список или создание пользователей FTP через `username`, `password` и `homedir` относительно корня FTP аккаунта. Пароль в ответе отсутствует.

<div class="api-block">
<b>Путь</b> /api/v2/ftpusers/{username}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Используйте [полное имя, возвращённое при создании](/docs/api/settings/#api-ftp-users). Имя пользователя изменить нельзя.

<div class="api-block">
<b>Путь</b> /api/v2/ftp_password/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `username` и новый `password`. При успехе возвращает `{}`.

## Доступ к потокам и блокировки

<div class="api-block" id="api-stream-access">
<b>Путь</b> /api/v2/authlisteners/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список или создание записей доступа к потоку. Передайте `server`, уникальный токен доступа слушателя `token` и при необходимости `username` и `active`. Запись включает токен доступа `token`, `created` и `last_connection_ts`, а также `listen_links` для каналов с авторизацией.

<div class="api-block">
<b>Путь</b> /api/v2/authlisteners/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Управление записью доступа к потоку. Эти записи использует [обработчик авторизации Icecast](/docs/api/channels/#api-icecast-auth) для канала.

<div class="api-block">
<b>Путь</b> /api/v2/ip_blocking/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список или создание настроек геоблокировки. Запрос с `?server=1` возвращает настройки станции и создаёт их при необходимости.

<div class="api-block">
<b>Путь</b> /api/v2/ip_blocking/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение или изменение настроек. Укажите `block_mode`: 0 отключает, 1 блокирует перечисленные страны, 2 разрешает перечисленные страны. При обновлении передайте `countries` (коды стран) и `channels` (объект с [ID каналов](/docs/api/channels/#api-channels) и логическими значениями). При изменении настроек передавайте полный список стран.

<div class="api-block">
<b>Путь</b> /api/v2/ip_blocking_ip/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список или добавление IP-записей. Передайте `server` и `ip_or_mask` с IP-адресом или сетью CIDR.

<div class="api-block">
<b>Путь</b> /api/v2/ip_blocking_ip/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение, изменение или удаление IP-записи.
