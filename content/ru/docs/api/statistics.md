---
title: "Статистика аудитории и отчёты о правах"
weight: 62
summary: "Получение статистики аудитории, экспорт данных эфира и формирование отчётов о правах."
seo_title: "API статистики аудитории и отчётов о правах | Radio-Tochka.com API"
description: "Получение статистики аудитории, экспорт данных эфира и формирование отчётов о правах."
---

## Аналитика аудитории

Используйте [JWT-токен](/docs/api/auth/#api-panel-sign-in) пользователя с правом просмотра статистики. Для всех методов, кроме [`channels`](/docs/api/statistics/#api-analysis-channels) и [`live`](/docs/api/statistics/#api-analysis-live), передайте `server`, `date_from` и `date_to`. Даты включительно, в формате `YYYY-MM-DD` и часовом поясе станции. Необязательный параметр `channels` — [ID каналов через запятую](/docs/api/channels/#api-channels). Поле `protocol` принимает `icecast`, `shoutcast` или `hls`. Общая аналитика охватывает до 366 дней, отчёты по музыке и рекламе — до 31 дня. Для экспорта используйте `export=csv` или `export=xlsx`, где эти форматы доступны.

<div class="api-block" id="api-analysis-channels">
<b>Путь</b> /api/v2/analytics/channels/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

`server` выбирает станцию. Возвращает массив текущих и исторических каналов.

<div class="api-block" id="api-analysis-overview">
<b>Путь</b> /api/v2/analytics/overview/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Итоги по аудитории, сравнение периодов, полнота данных и состояние сервиса. Для выбора таблицы при экспорте CSV используйте `section`.

<div class="api-block">
<b>Путь</b> /api/v2/analytics/timeseries/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Динамика аудитории в `rows` с группировкой `interval`: `15m`, `hour`, `day` (по умолчанию), `week` или `month`.

<div class="api-block">
<b>Путь</b> /api/v2/analytics/breakdown/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

`dim` принимает `country` (по умолчанию), `city`, `client`, `device`, `os`, `channel` или `protocol`. Возвращает строки по группам и сведения о полноте данных.

<div class="api-block" id="api-analysis-heatmap">
<b>Путь</b> /api/v2/analytics/heatmap/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Данные аудитории по дням недели и часам.

<div class="api-block" id="api-analysis-durations">
<b>Путь</b> /api/v2/analytics/durations/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Распределение длительности сеансов прослушивания.

<div class="api-block" id="api-analysis-live">
<b>Путь</b> /api/v2/analytics/live/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `server` и при необходимости `channels` и `protocol`. Ответ содержит `as_of`, `timezone`, `refresh_seconds`, `units`, `estimates`, `channels` и `stale`.

```http
GET /api/v2/analytics/live/?server=1
```

```json
{
  "server": 1,
  "as_of": "2026-04-07T10:00:00Z",
  "timezone": "Europe/Helsinki",
  "refresh_seconds": 10,
  "estimates": {
    "hls_listening": true,
    "hls_current_lag_seconds": 60
  },
  "channels": [],
  "stale": false
}
```

В сокращённом примере `as_of` — время снимка, `refresh_seconds` — интервал опроса. Данные HLS являются оценочными. Отчёты за период включают полноту данных и единицы измерения. Во время пересчёта в ответе может появиться `rebuild_pending`.

## Отчёты о музыке и рекламе

<div class="api-block">
<b>Путь</b> /api/v2/analytics/music/groups/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Укажите `kind` со значением `dj`, `playlist` или `rotation`. Возвращает `rows` и число исключённых, ожидающих и незавершённых событий.

<div class="api-block">
<b>Путь</b> /api/v2/analytics/music/tracks/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Отметки «нравится», «не нравится» и заказы треков. В ответе указано, что фильтры каналов и протоколов для этого отчёта не применяются.

<div class="api-block">
<b>Путь</b> /api/v2/analytics/ads/summary/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Обязательный `type` принимает `item`, `block` или `intro`. Возвращает сводку `summary`.

<div class="api-block" id="api-ads-units">
<b>Путь</b> /api/v2/analytics/ads/units/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `type` и необязательный `by`. Группировка — `item` или `rule` для отдельных элементов, `block` для блоков и `intro` для вступлений. Возвращает `rows`.

<div class="api-block">
<b>Путь</b> /api/v2/analytics/ads/airings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

По умолчанию `type=item`. Используйте `unit_key` из [отчёта по группам](/docs/api/statistics/#api-ads-units). Для постраничной выдачи укажите `page` и `page_size`. Ответ содержит `count`, `pages` и `rows`.

## Статистика и экспорт прежнего формата

<div class="api-block" id="api-total-listeners">
<b>Путь</b> /api/total_listeners/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Публичный суммарный счётчик по активным каналам. Возвращает `{"total_listeners":42}`.

<div class="api-block">
<b>Путь</b> /api/v2/stats/{period}/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

История аудитории за `hour`, `day` или `week`. Требуется `server`. Возвращает время и число слушателей по каналам.

<div class="api-block">
<b>Путь</b> /api/v2/listeners_geoip/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Текущие подключения к активным каналам с необязательным `server`. Записи содержат `connecttime`, `channel_data` и `geodata`, если есть данные геолокации.

<div class="api-block">
<b>Путь</b> /api/v2/listeners_geoposition/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Массив сведений о местоположении слушателей.

<div class="api-block">
<b>Путь</b> /api/v2/listening_hours/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Возвращает `total_time` и `dates`. Параметр `excel` переключает ответ на таблицу.

<div class="api-block" id="api-track-stats">
<b>Путь</b> /api/v2/track_stats/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список статистики треков. Требуется авторизация.

<div class="api-block">
<b>Путь</b> /api/v2/track_stats/best/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Публичный рейтинг треков станции `server` по положительным голосам.

<div class="api-block">
<b>Путь</b> /api/v2/track_stats/worst/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Публичный рейтинг треков станции `server` по отрицательным голосам.

<div class="api-block">
<b>Путь</b> /api/v2/track_stats/{export}/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Доступные выгрузки — `csv`, `rao`, `rao_pub`, `vois`, `best_excel` и `worst_excel`.

<a id="api-royalty-reports"></a>

## Отчёты о правах

<div class="api-block" id="api-royalty-settings">
<b>Путь</b> /api/v2/royalty_settings/<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение или сохранение настроек отчётности. PUT возвращает обновлённые настройки.

<div class="api-block" id="api-royalty-formats">
<b>Путь</b> /api/v2/royalty_reports/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Необязательный `country` фильтрует доступные `formats`.

<div class="api-block" id="api-royalty-preview">
<b>Путь</b> /api/v2/royalty_reports/preview/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

[Передайте `format`](/docs/api/statistics/#api-royalty-formats), `date1`, `date2` (секунды Unix), `server` и необязательный часовой пояс IANA `tz`. Возвращает сведения об отчёте, результаты проверки и данные предварительного просмотра.

<div class="api-block">
<b>Путь</b> /api/v2/royalty_reports/download/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Те же параметры, [что и для просмотра](/docs/api/statistics/#api-royalty-preview). Если отчёт проходит проверку, возвращает файл в выбранном формате.

<div class="api-block" id="api-soundexchange-reports">
<b>Путь</b> /api/v2/soundexchange_reports/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Список по `server` или создание с полями `server`, `start_ts` и `end_ts` в формате `DD-MM-YYYY`. В ответе даты передаются в формате `DD/MM/YYYY`.

<div class="api-block">
<b>Путь</b> /api/v2/soundexchange_reports/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение, изменение или удаление отчёта. Поля `status` и `created` доступны только для чтения.

<div class="api-block">
<b>Путь</b> /api/v2/soundexchange_reports/{id}/excel/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Скачивание отчёта в виде таблицы.

<div class="api-block">
<b>Путь</b> /api/v2/soundexchange_reports_data/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Для чтения списка или отдельной строки передайте `?report=ID`. POST сохраняет строку отчёта.

<div class="api-block">
<b>Путь</b> /api/v2/soundexchange_reports_data/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен или ключ API<br/>
</div>

Чтение, изменение или удаление строки отчёта.

### Поля отчётов

[`GET /api/v2/track_stats/`](/docs/api/statistics/#api-track-stats) группирует проигрывания по `metadata` и возвращает их количество для каждой позиции в поле `num`. Требуется `server`. Для выбора периода передайте `date1` и `date2` в секундах Unix. По умолчанию период начинается с первого дня текущего месяца.

Методы `GET` и [`PUT /api/v2/royalty_settings/?server=1`](/docs/api/statistics/#api-royalty-settings) используют поля `legal_name`, `address`, `region`, `country` (двухбуквенный код), `tax_id`, `fiscal_code`, `licence_number`, `contact_name`, `contact_email`, `contact_phone`, `service_name` и `service_url`.

Строка SoundExchange содержит [ID `report`](/docs/api/statistics/#api-soundexchange-reports) и может включать `history_all_music_id`, `history_jingle_id`, `metadata`, `name_of_service`, `transmission_category`, `artist`, `title`, `isrc`, `album`, `label`, `atp` (суммарное число прослушиваний трека), `ath` (суммарные часы прослушивания), `channel_or_program_name` и `play_frequency`. Поле отчёта `status` принимает 1 (в работе), 2 (готово) или 3 (ошибка).

### Поля ответов аналитики

В ответах за период объект `range` содержит локальные даты `date_from` и `date_to` и соответствующие границы UTC `start_utc` и `end_utc`. Поля `coverage` и `availability` описывают доступность данных за выбранный период. В `units` и `methodology` указаны единицы и методы расчёта.

[В `overview`](/docs/api/statistics/#api-analysis-overview) объект `totals` включает `sessions_started`, `qualified_started`, `short_started`, `short_share`, `listeners`, `listeners_all`, `listening_s`, `listening_hours`, `average_audience` и `bytes`. Сравнение с предыдущим периодом находится в `previous` и `trend`. Объекты `legacy` и `service_health` описывают исторические данные и состояние потоков. Для CSV-выгрузки таблицы отказов или сбоев укажите `section=rejections` или `section=outages`.

[В `heatmap`](/docs/api/statistics/#api-analysis-heatmap) каждая строка содержит `weekday` (0 — понедельник), `hour`, `available`, `listening_s` и `sessions_started`. [В `durations`](/docs/api/statistics/#api-analysis-durations) массив `buckets` содержит `lower_s`, `upper_s`, `sessions` и `total_s`. Средняя и медианная длительность сеанса возвращаются в `mean_s` и `median_s`.
