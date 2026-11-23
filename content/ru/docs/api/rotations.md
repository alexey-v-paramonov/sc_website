---
title: "Ротации"
weight: 55
summary: "Создание плейлистовых, последовательных и часовых ротаций и запуск в эфир."
seo_title: "API ротаций | Radio-Tochka.com API"
description: "Создание плейлистовых, последовательных и часовых ротаций и запуск в эфир."
---

## Методы для ротаций

<div class="api-block" id="api-rotations">
<b>Путь</b> /api/v2/rotations/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список ротаций по `?server=1` или создание ротации.

<div class="api-block">
<b>Путь</b> /api/v2/rotations/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение, изменение или удаление ротации. При обновлении `entries` передайте весь нужный список и сохраните ID изменяемых элементов.

<div class="api-block">
<b>Путь</b> /api/v2/rotations/{id}/copy/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Необязательное поле `new_name`. Возвращает копию ротации с HTTP 201.

<div class="api-block">
<b>Путь</b> /api/v2/rotations/{id}/start_broadcasting/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Необязательный часовой пояс IANA `timezone`. Возвращает `{"result":"success","start_ts":1744041660}` со временем в секундах или `result: error` с `msg: grid_busy` либо `playlist_empty`.

## Создание ротации

```http
POST /api/v2/rotations/
```

```json
{
  "server": 1,
  "title": "Daytime music",
  "rotation_type": 1,
  "entries": [
    {
      "block_type": 1,
      "position": 0,
      "playlist": 12,
      "weight": 1
    }
  ]
}
```

При успешном создании возвращается HTTP 201 и объект ротации с `id` и сохранённым массивом `entries`. Поле `rotation_type` принимает `1` (плейлисты), `2` (последовательная) или `3` (часовая). `is_random` включает случайный выбор, `fallback_playlist` задаёт резервный плейлист, `is_template` отмечает шаблон, а `on_air` отражает состояние эфира.

## Поля элемента ротации

`position` задаёт порядок, `weight` влияет на случайный выбор, а `show_hist` управляет показом в истории. Непересекающиеся слоты часовой ротации задаются в секундах полями `clock_offset_seconds` и `clock_duration_seconds`. Поле `timing_mode` принимает `1` (гибкое время), `2` (строгое время) или `3` (расчёт от времени окончания).

В поле `block_type` укажите `1` для [плейлиста (`playlist`)](/docs/api/playlists/#api-playlist-detail), `2` для [конкретного трека (`track`)](/docs/api/playlists/#api-music-track), `3` для случайного трека, `4` для [джингла (`jingle`)](/docs/api/jingles/#api-jingles), `5` для блока джинглов, `6` для [случайного джингла (`jingle_category`)](/docs/api/jingles/#api-jingle-categories), `7` для [заказов слушателей](/docs/api/track-requests/#api-track-requests), `9` для ожидания, `10` для [треков категории (`filter_category`)](/docs/api/playlists/#api-music-categories) или `11` для [ретрансляции (`relay`)](/docs/api/djs/#api-relays). Все связанные объекты должны принадлежать станции.

Для случайных треков доступны `filter_category`, `filter_genre`, `filter_artist`, `filter_folder`, `filter_not_played_hours` и `filter_added_days`. Для ожидания используйте одно из полей `wait_minutes`, `wait_until_time` и `wait_until_minute`. Блок джинглов может содержать вступление `jingle_in` или `jingle_category_in`, трек или плейлист и завершение `jingle_out` или `jingle_category_out`. Воспроизведение плейлиста задают поля `playlist_track_count`, `play_entire_playlist` и `play_entire_playlist_in_sequence` в зависимости от типа блока.

Чтобы поставить ротацию в сетку на определённое время, используйте [API расписания](/docs/api/schedule/#api-schedule).

## Значения в примере ротации

Пример создаёт плейлистовую ротацию на станции с ID 1. `rotation_type: 1` выбирает тип ротации, `block_type: 1` задаёт блок плейлиста, `position: 0` ставит его первым, `playlist: 12` выбирает плейлист с ID 12, а `weight: 1` задаёт одну единицу веса при случайном выборе.

- `weight` принимает целое число от 1 до 10000. Больший вес повышает вероятность выбора блока в случайной плейлистовой ротации. Для последовательных и часовых ротаций `is_random` всегда равно `false`.
- `clock_offset_seconds` — смещение начала слота от начала часа, от 0 (начало часа) до 3599 (последняя секунда). `clock_duration_seconds` — положительная длительность слота. Сумма не должна превышать 3600 секунд, то есть границу часа.
- `wait_minutes` задаёт положительное число минут ожидания. `wait_until_time` задаёт время на часах. `wait_until_minute` задаёт минуту часа от 0 до 59. Для блока ожидания передайте ровно одно из этих полей.
