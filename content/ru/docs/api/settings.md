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

## Значения настроек

| Поле или параметр | Значение |
| --- | --- |
| `crossfade_mode` | `1` — затухание первого и нарастание следующего, `2` — затухание первого и обычная громкость следующего, `3` — первый заканчивается с обычной громкостью, следующий нарастает, `4` — сведение без изменения громкости. |
| `autodj_resume_mode` | `0` — продолжить с места остановки, `1` — перейти к следующему треку. |
| `random_mode` | `1` — выбор по оценке, `2` — выбор из перемешанной последовательности. |
| `request_moderation` | `0` — разрешены все заказы, `1` — предварительная модерация, `2` — режим только для зарегистрированных. |
| `stereotool_status` | `0` — выключен, `1` — включён, `2` — включается, `3` — выключается, `4` — ошибка. Диагностика возвращается в `stereotool_status_debug`. |
| в настройках домена | `0` — неактивен, `1` — настраивается, `2` — активен, `3` — ошибка DNS, `4` — Apache, `5` — TLS, `6` — nginx, `7` — панели, `8` — потока, `9` — другая ошибка. `ip` — адрес хоста, `branded_url` — настроенное доменное имя. |

В примере PATCH число 3 — ID записи настроек. Строки `"3.25"` и `"1.50"` задают переходы длительностью 3,25 секунды между треками и 1,50 секунды между источниками.

### Звук, метаданные и медиатека

- `trim_silence` включает обрезку тишины. `trim_silence_db` и `trim_silence_end_db` задают пороги в начале и конце трека. `jingle_trim_silence_start_db` и `jingle_trim_silence_end_db` задают пороги для джинглов. Все пороги принимают от −80 до −20 дБ, по умолчанию −40 дБ.
- `dc_blocker_enabled` включает фильтр постоянной составляющей. `eq_enabled` включает эквалайзер. Поля `m_eq_frequency_0`–`m_eq_frequency_9` задают усиление в дБ на частотах 31, 62, 125, 250, 500, 1000, 2000, 4000, 8000 и 16000 Гц соответственно. Ноль означает отсутствие коррекции.
- `normalize_volume` выравнивает громкость треков. `emergency_restart` перезапускает остановившуюся станцию. `jingles_play_all_colliding` воспроизводит все джинглы, назначенные на одно время.
- `djname_in_metadata` добавляет имя ведущего. `dj_caption` задаёт подпись прямого эфира без метаданных. `playlist_meta_empty` — подпись для пустого плейлиста. `use_static_metadata` включает постоянный текст `static_metadata`. `output_meta_format` задаёт формат метаданных потока, `request_meta_format` — метаданных заказанного трека.
- `playlist_creating_dirs` создаёт плейлисты из каталогов. `jingles_create_dirs` создаёт группы джинглов из каталогов. `set_missing_tags` заполняет отсутствующие теги, а `search_cover_art` включает поиск обложек. `media_server` — ID станции с нужной медиатекой, `playlist_files_per_page` — число треков на странице в панели.
- `request_notification_email` задаёт адрес для уведомлений о заказах. `tunein_station_id`, `tunein_partner_id` и `tunein_partner_key` — ID станции, ID партнёра и ключ партнёра TuneIn. `timezone_name` — часовой пояс IANA. `timezones_available` содержит список поясов в панели.

`library_rescan_state` принимает `never`, если пересканирования ещё не было, `scheduled`, если запрос ожидает завершения, и `completed`, если последний запрос выполнен. Поля `library_rescan_requested_at` и `library_rescan_completed_at` содержат время UTC. Поле `library_rescan_next_allowed_at` сообщает, когда можно запросить следующее пересканирование.
