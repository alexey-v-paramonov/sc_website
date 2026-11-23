---
title: "Заказы треков"
weight: 57
summary: "Отправка, просмотр и модерация заказов треков от слушателей."
seo_title: "API заказов треков | Radio-Tochka.com API"
description: "Отправка, просмотр и модерация заказов треков от слушателей."
---

<a id="api-track-requests"></a>

## Отправка заказа

```http
POST /api/v2/track_requests/
```

```json
{
  "server_id": 1,
  "music_id": 40,
  "person": "Alex",
  "message": "For the evening show"
}
```

`server_id` — ID станции, `music_id` — [ID трека в медиатеке](/docs/api/playlists/#api-music-track). Строки `person` и `message` необязательны. Вход в аккаунт не требуется. Станция применяет свои [интервалы между заказами](/docs/api/website/#api-track-request-widget) и [режим модерации](/docs/api/settings/#api-station-settings-detail). HTTP 201 возвращает сохранённый заказ. При HTTP 400 возможны `bad_params`, `ip_blocked`, `track_blocked` или ошибки полей.

## Просмотр и модерация заказов

<div class="api-block">
<b>Путь</b> /api/v2/track_requests/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Фильтруйте по `server`. По умолчанию `with_name=true` и `with_message=true` исключают пустые поля. Передайте `false`, чтобы включить их, и `show_pending=1`, чтобы включить ещё не сыгравшие заказы.

<div class="api-block">
<b>Путь</b> /api/v2/track_requests/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Получение, изменение или удаление заказа. Для записи нужна [авторизация в панели](/docs/api/auth/#api-panel-sign-in).

<div class="api-block">
<b>Путь</b> /api/v2/track_requests/{id}/approve/<br/>
<b>Методы HTTP</b> PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Одобряет заказ. Возвращает `{}`.

<div class="api-block">
<b>Путь</b> /api/v2/track_requests/clear/<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `?server=1`, чтобы удалить ещё не прозвучавшие заказы станции.

Объект заказа содержит `id`, `server`, `person`, `message`, `moderated`, вложенный трек `all_music` и временные метки `dttm` и `played_at` в миллисекундах Unix. До воспроизведения `played_at` равно `null`. В публичном ответе GET поле `src_ip` отсутствует.
