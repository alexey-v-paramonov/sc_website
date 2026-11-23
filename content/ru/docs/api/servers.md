---
title: "Станции и вещание в соцсети"
weight: 53
summary: "Управление станциями, запуск и остановка AutoDJ и настройка вещания в соцсети."
seo_title: "API станций и вещания в соцсети | Radio-Tochka.com API"
description: "Управление станциями, запуск и остановка AutoDJ и настройка вещания в соцсети."
---

## Станции

Идентификатор станции передаётся в поле `server` при работе с [каналами](/docs/api/channels/#api-channels), [плейлистами](/docs/api/playlists/#api-playlists) и [сеткой вещания](/docs/api/schedule/#api-schedule). Список станций, сведения о станции и первая станция доступны без авторизации. Для остальных операций нужен JWT-токен с соответствующими правами или действующий ключ API. Для настройки вещания в соцсети используйте JWT-токен.

<div class="api-block" id="api-stations">
<b>Путь</b> /api/v2/servers/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен или ключ API.<br/>
</div>

Список станций или создание станции с уникальным `title`. Дополнительные поля — `genre` (жанр), `description` (описание), `url_address` (сайт), `icq`, `minisite_display` (показ на стартовой странице), `default` и файл `image`. При создании возвращается станция с HTTP 201.

<div class="api-block">
<b>Путь</b> /api/v2/servers/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен или ключ API.<br/>
</div>

Чтение, изменение или удаление станции. Станцию по умолчанию и последнюю станцию удалить нельзя.

<div class="api-block">
<b>Путь</b> /api/v2/servers/first/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Первая станция в панели.

<div class="api-block">
<b>Путь</b> /api/v2/servers/{id}/countries/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Число слушателей по странам для каналов станции.

<div class="api-block">
<b>Путь</b> /api/v2/servers/{id}/start/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Запускает станцию. Поле `result` принимает значение `started` или `running`.

<div class="api-block">
<b>Путь</b> /api/v2/servers/{id}/stop/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Останавливает станцию. Возвращает `{"result":"stopped"}`.

<div class="api-block">
<b>Путь</b> /api/v2/servers/{id}/toggle_hls/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Переключает HLS. Возвращает `hls_enabled`. HTTP 403 с `detail: hls_not_allowed` означает, что HLS недоступен.

<div class="api-block">
<b>Путь</b> /api/v2/servers/ftp_folders/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Отсортированный массив путей к каталогам FTP.

<div class="api-block">
<b>Путь</b> /api/v2/servers/jingle_folders/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Передайте `server`, чтобы получить пути к каталогам джинглов станции.

<div class="api-block">
<b>Путь</b> /api/v2/servers/media_folders/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Передайте `server`, чтобы получить пути к медиакаталогам станции.

## Пример

```http
POST /api/v2/servers/1/start/
```

```json
{
  "result": "started"
}
```

В ответе со станцией также возвращаются `is_running` (станция запущена), `timezone_name` (часовой пояс), `hls_enabled`, `ptt_enabled`, `ptt_available`, `calls_enabled`, `calls_available` и `new_version_available` (доступно обновление AutoDJ).

## Вещание в соцсети

<div class="api-block">
<b>Путь</b> /api/v2/social-ingests/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список направлений по `?server=1` или создание направления с полями `server`, `platform` и `server_url`.

<div class="api-block">
<b>Путь</b> /api/v2/social-ingests/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение, изменение или удаление направления. Поле `status` отражает состояние вещания и доступно только для чтения.

<div class="api-block">
<b>Путь</b> /api/v2/social-ingests/limits/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Лимит аккаунта, включая `limit`, `used` и `enableable_ids`. Значение `null` означает отсутствие лимита.

<div class="api-block">
<b>Путь</b> /api/v2/social-ingests/presets/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Возвращает настройки платформ `presets`, диапазоны редактируемых полей `editable_fields` и значения по умолчанию `field_defaults`.

Поле `label` задаёт название в панели, `stream_key` — ключ трансляции платформы, `enabled` — включение направления. Поле `audio_only` включает передачу только звука, если платформа её поддерживает. Для видео `asset` задаёт загруженный фон, `cover_enabled` и `title_enabled` управляют показом обложки и названия, `base_color` и `title_color` задают цвета в HEX. Поле `profile_overrides` задаёт разрешённые переопределения параметров кодирования.

Поле `platform` принимает `youtube`, `rutube`, `vk`, `telegram`, `facebook`, `tiktok`, `instagram`, `twitch`, `mixcloud`, `ok`, `x` и `custom`. В ответе возвращаются `effective_profile` (итоговые параметры кодирования), `audio_only_supported`, `encoder_editable`, а также размеры и длительность загруженного файла.
