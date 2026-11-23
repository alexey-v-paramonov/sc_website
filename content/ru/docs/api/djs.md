---
title: "Диджеи, ретрансляции и записи"
weight: 54
summary: "Управление источниками прямого эфира, их приоритетом, записями и отметками выхода в эфир."
seo_title: "API диджеев, ретрансляций и записей | Radio-Tochka.com API"
description: "Управление источниками прямого эфира, их приоритетом, записями и отметками выхода в эфир."
---

## Диджеи и ретрансляции

Для фильтрации списков передавайте `?server=1`. В публичном ответе нет полей `ip` и `password`. Для управления нужен JWT-токен пользователя с правом работать с диджеями.

<div class="api-block" id="api-djs">
<b>Путь</b> /api/v2/djs/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список или создание источников. Передайте `server`, `name` и настройки источника. Для прямого подключения используются `port` и `password`.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение и управление источником. Удалить AutoDJ нельзя.

<div class="api-block" id="api-relays">
<b>Путь</b> /api/v2/relays/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список или создание ретрансляций. Передайте `server`, `name` и `stream_url`.

<div class="api-block">
<b>Путь</b> /api/v2/relays/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение, изменение или удаление ретрансляции.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/toggle/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Переключает активность источника. Возвращает новое значение в поле `result`.

<div class="api-block">
<b>Путь</b> /api/v2/relays/{id}/toggle/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Переключает активность ретрансляции. Возвращает новое значение в поле `result`.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/rewind/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Перемотка AutoDJ. Возвращает `{"result":"rewind_done"}` или HTTP 400 с причиной в `result`.

<div class="api-block">
<b>Путь</b> /api/v2/relays/{id}/start_broadcasting/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

[Ставит разовую ретрансляцию](/docs/api/schedule/#api-schedule) на начало следующей минуты. Необязательный `timezone` — часовой пояс IANA. Возвращает `result: success` и `start_ts` в секундах Unix либо `result: error` и `msg: grid_busy`.

<div class="api-block">
<b>Путь</b> /api/v2/djs/set_priority/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server` и объект `priorities`, где ключи — ID диджеев, а значения — целочисленные приоритеты. Ответ содержит `result: done` и `new_priorities`.

## Поля источника

Объект источника включает `id`, `server`, `name`, `cat` (`auto` — AutoDJ, `real` — подключение энкодера, `ws` — веб-диджей, `server` — ретрансляция), `active`, `priority`, `port`, `stream_url`, `dj_buffer_ms` (буфер в миллисекундах), `metadata`, `meta_charset`, `volume_change` и `image`. Поля `connected`, `on_air`, `dt_connect` и `dt_disconnect` описывают состояние подключения. `do_recording` включает запись, а `do_recording_hourly` разбивает записи по часам.

## Записи

<div class="api-block" id="api-dj-recordings">
<b>Путь</b> /api/v2/djs/{id}/recordings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Имена MP3-файлов, начиная с последнего.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/download_recording/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Параметр `file` — имя из [списка записей](/docs/api/djs/#api-dj-recordings). Возвращает аудиофайл для скачивания.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/recording_air_timeline/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `file`, чтобы получить отметки эфира. Поле `available` показывает наличие отметок, в `events` указаны смещения `at_ms` и признаки `on_air`.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/delete_recording/<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте имя файла в параметре строки запроса `file`. Тело ответа пустое.

<div class="api-block">
<b>Путь</b> /api/v2/djs/{id}/delete_recordings/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте массив имён файлов `files`. Тело ответа пустое.

```http
GET /api/v2/djs/7/recording_air_timeline/?file=show.mp3
```

```json
{
  "available": true,
  "events": [
    {
      "at_ms": 1200,
      "on_air": true
    }
  ],
  "recording_type": "raw_input"
}
```

## Значения буфера и записей

`dj_buffer_ms` принимает `0` (без резерва на джиттер), `1000` (1 секунда), `3000` (3 секунды), `8000` (8 секунд), `30000` (30 секунд) или `60000` (60 секунд). В примере записи `7` — ID диджея, а `at_ms: 1200` отмечает выход в эфир через 1,2 секунды после начала исходной записи.

`volume_change` — изменение уровня входящего источника в процентах. Значение 0 оставляет уровень прежним. `meta_charset` — кодировка метаданных потока, по умолчанию `UTF-8`. В объекте `priorities` каждый ключ — ID диджея, а целочисленное значение — его новый приоритет.
