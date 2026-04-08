---
title: "Сетка вещания"
date: 2026-04-08T12:00:00+03:00
weight: 5
seo_title: "API сетки вещания интернет-радио | Радио-Точка"
description: "Документация по API сетки вещания Radio-Tochka: получение событий расписания, создание, изменение, удаление и очистка сетки эфира."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> GET - не обязательна, POST - необходима<br/>
<b>Query параметры для GET:</b> <br/>
<b>server:</b> ID радиосервера<br/>
<b>start_ts:</b> начало диапазона в Unix timestamp<br/>
<b>end_ts:</b> конец диапазона в Unix timestamp<br/>
<b>utc:</b> необязательный флаг, `1` если `start_ts` и `end_ts` передаются в UTC<br/>
</div>

Этот endpoint позволяет получить события сетки вещания за выбранный диапазон времени и создать новое событие в расписании.

#### Как работает GET списка событий

При запросе списка API:

- получает события для указанного сервера;
- разворачивает periodic-события в реальные вхождения по дням недели и неделям месяца;
- автоматически вычисляет `finish_date`, `finish_time` и `end_ts` на основе следующего события или окончания radioshow;
- может добавлять служебное событие завершения radioshow, если у эфира задан `playlist_after_radioshow` или `rotation_after_radioshow`.

#### Пример: GET

Получить сетку вещания для сервера с ID 1 на определённый диапазон:

{{< highlight python  >}}

import requests

response = requests.get(
		"https://demo.streaming.center:1030/api/v2/grid/?server=1&start_ts=1744041600&end_ts=1744646400&utc=1"
)
print(response.json())

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

[
	{
		"id": 10,
		"server": 1,
		"name": "Morning show",
		"periodicity": "onetime",
		"cast_type": "radioshow",
		"break_track": true,
		"start_playlist_from_beginning": true,
		"start_date": "2026-04-08",
		"start_time": "08:00:00",
		"finish_date": "2026-04-08",
		"finish_time": "10:00:00",
		"wd_mon": false,
		"wd_tue": false,
		"wd_wed": false,
		"wd_thu": false,
		"wd_fri": false,
		"wd_sat": false,
		"wd_sun": false,
		"week_1": false,
		"week_2": false,
		"week_3": false,
		"week_4": false,
		"playlist": 2,
		"playlist_after_radioshow": 1,
		"rotation_after_radioshow": null,
		"dj": null,
		"rotation": null,
		"allow_jingles": true,
		"allow_song_requests": true,
		"allow_jingles_after": true,
		"allow_song_requests_after": true,
		"color": "#87c95f",
		"color2": "#a2e47a",
		"local_time": "08:00:00",
		"timezone": "Europe/Moscow",
		"parent_id": null,
		"start_ts": 1744099200,
		"start_ts_utc_readable": "2026-04-08T05:00:00Z",
		"end_ts": 1744106400
	},
	{
		"id": null,
		"server": 1,
		"name": "All music",
		"periodicity": "onetime",
		"cast_type": "playlist",
		"break_track": false,
		"start_playlist_from_beginning": true,
		"start_date": "2026-04-08",
		"start_time": "10:00:00",
		"finish_date": "2026-04-08",
		"finish_time": "12:00:00",
		"playlist": 1,
		"playlist_after_radioshow": null,
		"rotation_after_radioshow": null,
		"dj": null,
		"rotation": null,
		"allow_jingles": true,
		"allow_song_requests": true,
		"allow_jingles_after": false,
		"allow_song_requests_after": false,
		"color": "#a2e47a",
		"color2": null,
		"local_time": "10:00:00",
		"timezone": "UTC",
		"parent_id": 10,
		"start_ts": 1744106400,
		"start_ts_utc_readable": "2026-04-08T07:00:00Z",
		"end_ts": 1744113600
	}
]

{{< / highlight >}}

#### Поля объекта события

- id: ID события. У служебных событий завершения radioshow может быть `null`.
- server: ID радиосервера.
- name: название события.
- periodicity: тип периодичности, `onetime` или `periodic`.
- cast_type: режим события. В модели используются значения `playlist`, `radioshow`, `relay`, `rotation`.
- break_track: прерывать ли текущий трек при старте события.
- start_playlist_from_beginning: запускать ли плейлист с начала.
- start_date: дата начала события.
- start_time: время начала события.
- finish_date: дата окончания события.
- finish_time: время окончания события.
- wd_mon: признак повтора по понедельникам.
- wd_tue: признак повтора по вторникам.
- wd_wed: признак повтора по средам.
- wd_thu: признак повтора по четвергам.
- wd_fri: признак повтора по пятницам.
- wd_sat: признак повтора по субботам.
- wd_sun: признак повтора по воскресеньям.
- week_1: активна ли первая неделя месяца.
- week_2: активна ли вторая неделя месяца.
- week_3: активна ли третья неделя месяца.
- week_4: активна ли четвёртая неделя месяца.
- playlist: ID плейлиста, если событие запускает плейлист или radioshow-плейлист.
- playlist_after_radioshow: ID плейлиста, который должен стартовать после radioshow.
- rotation_after_radioshow: ID ротации, которая должна стартовать после radioshow.
- dj: ID DJ, если событие связано с DJ.
- rotation: ID ротации.
- allow_jingles: разрешены ли джинглы во время события.
- allow_song_requests: разрешены ли заказы треков во время события.
- allow_jingles_after: разрешены ли джинглы после radioshow.
- allow_song_requests_after: разрешены ли заказы треков после radioshow.
- color: основной цвет события.
- color2: дополнительный цвет события, обычно для продолжения после radioshow.
- local_time: локальное время события.
- timezone: таймзона события.
- parent_id: ID родительского radioshow-события для автоматически добавленного завершающего события.
- start_ts: Unix timestamp времени начала события.
- start_ts_utc_readable: UTC datetime начала события в читаемом формате.
- end_ts: Unix timestamp времени окончания события.

#### Поведение periodic событий

Если `periodicity=periodic`, то событие в списке разворачивается по выбранным дням недели `wd_*` и неделям месяца `week_1` ... `week_4`. Если в это же время существует `onetime` событие, приоритет получает `onetime`, и periodic-вхождение в ответ не попадает.

#### Пример: POST

Создать одноразовое событие для запуска плейлиста:

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.post(
		"https://demo.streaming.center:1030/api/v2/grid/",
		headers=headers,
		json={
				"server": 1,
				"name": "Morning playlist",
				"periodicity": "onetime",
				"cast_type": "playlist",
				"break_track": True,
				"start_playlist_from_beginning": True,
				"start_date": "2026-04-08",
				"start_time": "08:00:00",
				"playlist": 2,
				"local_time": "08:00:00",
				"timezone": "Europe/Moscow",
				"color": "#87c95f"
		}
)

print(response.json())

{{< / highlight >}}

#### Параметры POST

Основные параметры, которые используются при создании события:

- server: обязательный ID радиосервера.
- name: обязательное название события.
- periodicity: обязательный тип периодичности, `onetime` или `periodic`.
- cast_type: обязательный режим события.
- break_track: нужно ли прерывать текущий трек.
- start_playlist_from_beginning: запускать ли плейлист с начала.
- start_date: обязательная дата начала для `onetime` события.
- start_time: обязательное время начала.
- finish_date: необязательная дата окончания.
- finish_time: необязательное время окончания.
- wd_mon, wd_tue, wd_wed, wd_thu, wd_fri, wd_sat, wd_sun: дни недели для `periodic` события.
- week_1, week_2, week_3, week_4: недели месяца для `periodic` события.
- playlist: ID плейлиста.
- playlist_after_radioshow: ID плейлиста после radioshow.
- rotation_after_radioshow: ID ротации после radioshow.
- dj: ID DJ.
- rotation: ID ротации.
- allow_jingles: разрешить джинглы.
- allow_song_requests: разрешить song requests.
- allow_jingles_after: разрешить джинглы после radioshow.
- allow_song_requests_after: разрешить song requests после radioshow.
- color: основной цвет события в hex-формате.
- color2: дополнительный цвет события в hex-формате.
- local_time: локальное время события.
- timezone: таймзона события.

#### Валидация событий

При создании и обновлении API проверяет ограничения модели и может вернуть ошибки валидации:

- `repeat_week_days_not_set`: для `periodic` события не выбран ни один день недели.
- `repeat_weeks_not_set`: для `periodic` события не выбрана ни одна неделя месяца.
- `playlist_required`: событие требует плейлист, но поле `playlist` не заполнено.
- `time_slot_busy`: выбранный слот уже занят другим событием.

В ответ на успешное создание API возвращает созданный объект события в JSON.

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/:id/<br/>
<b>HTTP метод:</b> GET, PUT, DELETE <br/>
<b>Авторизация:</b> GET - не обязательна, PUT и DELETE - необходимы<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID события сетки<br/>
</div>

Позволяет получить одно событие, обновить его или удалить.

#### Пример: GET

{{< highlight python  >}}

import requests

response = requests.get(
		"https://demo.streaming.center:1030/api/v2/grid/10/"
)
print(response.json())

{{< / highlight >}}

В ответ возвращается один объект события с теми же полями, что и в списке.

#### Пример: PUT

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.put(
		"https://demo.streaming.center:1030/api/v2/grid/10/",
		headers=headers,
		json={
				"id": 10,
				"server": 1,
				"name": "Morning show updated",
				"periodicity": "onetime",
				"cast_type": "radioshow",
				"break_track": True,
				"start_playlist_from_beginning": True,
				"start_date": "2026-04-08",
				"start_time": "08:30:00",
				"playlist": 2,
				"playlist_after_radioshow": 1,
				"allow_jingles": True,
				"allow_song_requests": True,
				"allow_jingles_after": True,
				"allow_song_requests_after": True,
				"local_time": "08:30:00",
				"timezone": "Europe/Moscow",
				"color": "#87c95f",
				"color2": "#a2e47a"
		}
)

print(response.json())

{{< / highlight >}}

Для `PUT` обычно передают полный объект события. В ответ API возвращает обновлённый объект.

#### Пример: DELETE

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
		"https://demo.streaming.center:1030/api/v2/grid/10/",
		headers=headers
)

print(response.status_code)

{{< / highlight >}}

При успешном удалении endpoint возвращает HTTP status `204 No Content`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/grid/clear/<br/>
<b>HTTP метод:</b> DELETE <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>server:</b> ID радиосервера<br/>
</div>

Удаляет все события сетки вещания для указанного сервера.

#### Пример запроса

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
		"https://demo.streaming.center:1030/api/v2/grid/clear/?server=1",
		headers=headers
)
print(response.json())

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
	"result": "ok"
}

{{< / highlight >}}

#### Практическое замечание по запросу списка

Для `GET /api/v2/grid/` лучше всегда передавать одновременно `server`, `start_ts` и `end_ts`. Именно в таком виде этот endpoint рассчитывает диапазон календаря, разворачивает periodic события и корректно отфильтровывает события вне выбранного интервала.
