---
title: "Джинглы и вступления"
weight: 56
summary: "Управление файлами джинглов, правилами и блоками вещания и вступлениями при подключении слушателей."
seo_title: "API джинглов и вступлений | Radio-Tochka.com API"
description: "Управление файлами джинглов, правилами и блоками вещания и вступлениями при подключении слушателей."
---

## Джинглы

<div class="api-block" id="api-jingles">
<b>Путь</b> /api/v2/jingles/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список джинглов по `server` с необязательным `remote=1` или создание записи джингла. Для загрузки аудио используйте [метод загрузки медиафайлов](/docs/api/playlists/#api-media-upload).

<div class="api-block">
<b>Путь</b> /api/v2/jingles/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение и изменение джингла. Среди полей — `server`, `author`, `title`, `album`, `genre`, `length`, `samplerate` и поля только для чтения `path`, `categories` и `audio_format`.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/{id}/regions/<br/>
<b>Методы HTTP</b> PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Задаёт точки воспроизведения и сведения в секундах через `playback_start_time`, `playback_end_time`, `mix_in_time` и `mix_out_time`. Возвращает точки и `effective_duration`.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/{id}/waveform/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Оба метода возвращают двоичные данные волновой формы с типом `application/octet-stream`. POST сначала строит форму заново. При ошибке возвращает HTTP 400 с `result: waveform_generation_failed`.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/{id}/download/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Аудиофайл для скачивания или перенаправление к удалённому файлу.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/tree/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Параметр `server` выбирает станцию. Ответ `{"tree":[...]}` содержит каталоги и записи джинглов.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/add_dir/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server_id`, `parent_dir` и `new_dir`. Возвращает обновлённое дерево.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/remove/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server_id`, ID файлов в `files` и пути каталогов в `directories`. Возвращает обновлённое дерево.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/remote_file/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server` и URL аудиофайла `path`. Можно указать `author`, `title` и `album`. При успехе возвращает `{}`.

## Категории, правила и блоки

<div class="api-block" id="api-jingle-categories">
<b>Путь</b> /api/v2/jingle_categories/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список или создание категорий. Передайте `server`, `name` и необязательное `directory_name`.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_categories/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение, изменение или удаление категории.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_schemes/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список или создание правил. Среди полей — `server`, `cat`, `jingle`, `random_category`, [`playlist`](/docs/api/playlists/#api-playlist-detail), `hour`, `minute`, `break_track`, `active`, `stop_track`, `show_hist`, `is_ad`, `do_mix`, `mix_level` и временные ограничения.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_schemes/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение, изменение или удаление правила.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_blocks/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список или создание блоков через `server`, `title`, необязательные `jingle_in` и `jingle_out` либо случайные категории, а также `playlist` или [`track`](/docs/api/playlists/#api-playlist-track-detail). Передайте `repeat_days` (номера дней недели с массивами часов), `minute` и при необходимости часовой пояс IANA `timezone`. Сохранённое расписание возвращается в `repeat_schedule`.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_blocks/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение, изменение или удаление блока.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_schemes/{id}/toggle/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Переключает правило. Возвращает `result` (включено) и `is_currently_active` (действует в текущем временном интервале).

<div class="api-block">
<b>Путь</b> /api/v2/jingle_blocks/{id}/toggle/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Переключает блок. Возвращает `result` и `is_currently_active`.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_schemes/{id}/reorder/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server` и `position` с отсчётом от нуля. Возвращает `id` и `position`.

<div class="api-block">
<b>Путь</b> /api/v2/jingle_blocks/{id}/reorder/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server` и `position` с отсчётом от нуля. Возвращает `id` и `position`.

<div class="api-block">
<b>Путь</b> /api/v2/jingles/blocks/import_calendar/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Учётные данные интеграции календаря<br/>
</div>

Заменяет все блоки джинглов станции. Обязательные поля интервала — `id`, `url`, `slot_number`, `weekday`, `hour`, `minute`, `timezone`. Дополнительные — `artist`, `title`, `album`, `length`, `samplerate` и `is_ad`. Требует учётные данные интеграции в `Authorization`, `server_id` и массив `slots`. При успешном импорте возвращает `{}`.

## Вступления при подключении

Для управления вступлениями используйте JWT-токен или ключ API. Для фильтрации коллекций передавайте `?server=1`.

<div class="api-block">
<b>Путь</b> /api/v2/intros/files/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список вступлений или multipart-загрузка `original_file` с полями `server` и `name`. Необязательные флаги — `enabled`, `is_default` и `is_ad`. Ответ включает `uploaded_at`, `encoding_status`, `duration` в секундах и `stream_url`.

<div class="api-block">
<b>Путь</b> /api/v2/intros/files/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение, изменение или удаление файла.

<div class="api-block">
<b>Путь</b> /api/v2/intros/files/{id}/set_default/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Переключает использование файла по умолчанию. При включении сбрасывает прежний файл или группу по умолчанию. Возвращает обновлённый объект файла.

<div class="api-block">
<b>Путь</b> /api/v2/intros/files/{id}/stream/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Воспроизведение исходного аудиофайла.

<div class="api-block">
<b>Путь</b> /api/v2/intros/groups/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список групп или создание группы с полями `server`, `name` и необязательным `is_default`. Группы возвращаются с вложенными `files`.

<div class="api-block">
<b>Путь</b> /api/v2/intros/groups/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение, изменение или удаление группы.

<div class="api-block">
<b>Путь</b> /api/v2/intros/groups/{id}/add_file/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Передайте ID файла в `intro_file`. Возвращает группу.

<div class="api-block">
<b>Путь</b> /api/v2/intros/groups/{id}/remove_file/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Передайте ID файла в `intro_file`. Возвращает группу.

<div class="api-block">
<b>Путь</b> /api/v2/intros/groups/{id}/set_default/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Переключает использование группы по умолчанию. При включении сбрасывает прежний файл или группу по умолчанию. Возвращает группу.

<div class="api-block">
<b>Путь</b> /api/v2/intros/slots/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список или создание интервалов воспроизведения вступлений.

<div class="api-block">
<b>Путь</b> /api/v2/intros/slots/{id}/<br/>
<b>Методы HTTP</b> GET, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение или удаление интервала. Для изменения используйте [метод сохранения расписания](/docs/api/jingles/#api-intro-schedule-save).

<div class="api-block" id="api-intro-schedule-save">
<b>Путь</b> /api/v2/intros/slots/save/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Передайте `server`, массив `slots` и необязательный `timezone`, который используется при отсутствии часового пояса станции, чтобы целиком заменить расписание станции. Возвращает массив сохранённых интервалов.

Каждый интервал содержит `time_start`, `time_end`, `days` (семь символов, начиная с понедельника, `1` — активный день) и `play_mode`. Укажите `single` с `intro_file` или `random` с `intro_group`. Поле `enabled` включает интервал.

```http
POST /api/v2/intros/slots/save/
```

```json
{
  "server": 1,
  "timezone": "Europe/Helsinki",
  "slots": [
    {
      "server": 1,
      "time_start": "08:00:00",
      "time_end": "12:00:00",
      "days": "1111100",
      "play_mode": "single",
      "intro_file": 4,
      "enabled": true
    }
  ]
}
```
