---
title: "Каналы вещания"
date: 2026-04-08T12:00:00+03:00
weight: 4
seo_title: "API каналов вещания интернет-радио | Радио-Точка"
description: "Документация по API каналов вещания Radio-Tochka: получение списка каналов, создание, изменение, удаление и служебные endpoint-ы авторизации слушателей."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> GET - не обязательна, POST - необходима<br/>
<b>Query параметры для GET:</b> <br/>
<b>limit:</b> количество элементов в ответе<br/>
<b>offset:</b> смещение для пагинации<br/>
<b>server:</b> ID радиосервера<br/>
</div>

Этот endpoint позволяет получить список каналов вещания радиостанции и создать новый канал.

#### Пример: GET

Получить список каналов для сервера с ID 1:

{{< highlight python  >}}

import requests

response = requests.get(
	"https://demo.streaming.center:1030/api/v2/channels/?limit=20&offset=0&server=1"
)
print(response.json())

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
   "count":2,
   "next":null,
   "previous":null,
   "results":[
	  {
		 "id":11,
		 "active":true,
		 "server":1,
		 "bitrate":"128",
		 "listeners":"500",
		 "s_type":"icecast",
		 "s_format":"mp3",
		 "ip_address":"127.0.0.1",
		 "port":8000,
		 "ssl_port":8443,
		 "mount_point":"/stream",
		 "public":true,
		 "traf":0,
		 "traf_month":0,
		 "autodj_enabled":true,
		 "centovacast_compatible":true,
		 "proxy_enabled":false,
		 "proxy_status":0,
		 "proxy_url_path":null,
		 "ssl_proxy_enabled":false,
		 "ssl_proxy_status":0,
		 "ssl_proxy_url_path":null,
		 "allow_auth_listeners_only":false,
		 "queue_size":524288,
		 "burst_size":131072,
		 "listeners_current":37,
		 "listeners_peak":82,
		 "traffic":"0 B",
		 "state":2,
		 "links_html":"<a href=\"#\">Listen</a>",
		 "stream_url":"http://s02.demo.streaming.center:8000/stream",
		 "secure_stream_url":"https://s02.demo.streaming.center:8443/stream",
		 "admin_link":"https://s02.demo.streaming.center:8443/",
		 "youtube_stream_image":null,
		 "youtube_stream_image_resolution":null,
		 "fb_stream_image":null,
		 "fb_stream_image_resolution":null,
		 "vk_stream_image":null,
		 "vk_stream_image_resolution":null,
		 "telegram_stream_image":null,
		 "telegram_stream_image_resolution":null,
		 "rutube_stream_image":null
	  }
   ]
}

{{< / highlight >}}

#### Описание ответа

Ответ списка использует стандартную пагинацию и содержит поля:

- count: общее количество каналов, подходящих под запрос.
- next: URL следующей страницы результатов или `null`.
- previous: URL предыдущей страницы результатов или `null`.
- results: массив объектов каналов.

#### Поля объекта канала

Поля, которые доступны в публичном `GET`-ответе:

- id: уникальный ID канала.
- active: активен ли канал.
- server: ID радиосервера, к которому относится канал.
- bitrate: битрейт потока.
- listeners: лимит слушателей для канала.
- s_type: тип стриминг-сервера, например `icecast`, `icecast-kh`, `shoutcast1`, `shoutcast2`, `shoutcast2.6`.
- s_format: формат потока, например `mp3`, `aac`, `flac`.
- ip_address: IP-адрес, на котором работает поток.
- port: основной порт канала.
- ssl_port: SSL-порт канала, если доступен.
- mount_point: mount point потока. Для Icecast он формируется системой автоматически.
- public: признак публичного каталога.
- traf: накопленный трафик канала.
- traf_month: месяц, к которому относится статистика трафика.
- autodj_enabled: включён ли AutoDJ для канала.
- centovacast_compatible: использовать ли совместимый mount point для Icecast.
- proxy_enabled: включён ли HTTP proxy на 80 порту.
- proxy_status: статус HTTP proxy.
- proxy_url_path: путь для HTTP proxy.
- ssl_proxy_enabled: включён ли HTTPS proxy на 443 порту.
- ssl_proxy_status: статус HTTPS proxy.
- ssl_proxy_url_path: путь для HTTPS proxy.
- allow_auth_listeners_only: разрешать ли подключение только авторизованным слушателям.
- queue_size: размер очереди буфера.
- burst_size: размер burst-буфера.
- listeners_current: текущее количество слушателей на канале.
- listeners_peak: пиковое количество слушателей.
- traffic: человекочитаемое значение трафика.
- state: состояние канала. `0` - offline, `1` - online, but not connected, `2` - online, connected (broadcasting).
- links_html: HTML-блок со ссылками на подключение к потоку.
- stream_url: прямой URL потока без SSL.
- secure_stream_url: прямой URL потока по HTTPS, если доступен.
- admin_link: ссылка на административную страницу стриминг-сервера канала.
- youtube_stream_image: загруженное изображение или видео-заставка для YouTube stream.
- youtube_stream_image_resolution: разрешение файла для YouTube.
- fb_stream_image: изображение или видео-заставка для Facebook stream.
- fb_stream_image_resolution: разрешение файла для Facebook.
- vk_stream_image: изображение или видео-заставка для VK stream.
- vk_stream_image_resolution: разрешение файла для VK.
- telegram_stream_image: изображение или видео-заставка для Telegram stream.
- telegram_stream_image_resolution: разрешение файла для Telegram.
- rutube_stream_image: изображение или видео-заставка для RuTube stream.

Если запрос выполняется с авторизацией, объект канала дополнительно включает административные и служебные поля:

- password: пароль source-подключения к каналу.
- admin_password: административный пароль канала.
- sc_authhash: Shoutcast auth hash.
- youtube_stream_url: RTMP URL для YouTube.
- youtube_stream_key: stream key для YouTube.
- youtube_stream_enabled: включена ли ретрансляция в YouTube.
- fb_stream_url: RTMP URL для Facebook.
- fb_stream_key: stream key для Facebook.
- fb_stream_enabled: включена ли ретрансляция в Facebook.
- vk_stream_url: RTMP URL для VK.
- vk_stream_key: stream key для VK.
- vk_stream_enabled: включена ли ретрансляция в VK.
- telegram_stream_url: RTMPS URL для Telegram.
- telegram_stream_key: stream key для Telegram.
- telegram_stream_enabled: включена ли ретрансляция в Telegram.
- rutube_stream_url: RTMP URL для RuTube.
- rutube_stream_key: stream key для RuTube.
- rutube_stream_enabled: включена ли ретрансляция в RuTube.
- shoutcast_uid: UID лицензии Shoutcast.
- shoutcast_license_key: лицензионный ключ Shoutcast.
- awstats_nginx: доступна ли nginx-интеграция статистики.
- vhost_name: вычисленное доменное имя узла.
- proxy_stream_url: готовый HTTP URL через proxy, если proxy активен.
- ssl_proxy_stream_url: готовый HTTPS URL через proxy, если proxy активен.
- awstats_password: пароль для доступа к статистике.
- hls_url: URL HLS плейлиста для канала.
- hls_status: статус HLS-потока, например `inactive`, `starting`, `active`.

#### Пример: POST

Создать новый канал на сервере с ID 1:

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.post(
	"https://demo.streaming.center:1030/api/v2/channels/",
	headers=headers,
	json={
		"server": 1,
		"port": 8000,
		"bitrate": "128",
		"listeners": "500",
		"s_type": "icecast",
		"s_format": "mp3",
		"public": True,
		"autodj_enabled": True,
		"centovacast_compatible": True
	}
)

print(response.json())

{{< / highlight >}}

#### Параметры POST

Основные параметры, которые обычно передаются при создании канала:

- server: обязательный ID радиосервера.
- port: обязательный порт основного потока.
- bitrate: обязательный битрейт канала.
- listeners: обязательный лимит слушателей.
- s_type: обязательный тип сервера потока.
- s_format: обязательный формат аудио.
- public: нужно ли делать канал публичным.
- autodj_enabled: включить ли AutoDJ для канала.
- centovacast_compatible: использовать ли mount point в Centova Cast стиле.
- admin_password: необязательный административный пароль. Если не передан, будет использован пароль сервера.
- proxy_enabled: включить ли HTTP proxy.
- proxy_url_path: URL path для HTTP proxy.
- ssl_proxy_enabled: включить ли HTTPS proxy.
- ssl_proxy_url_path: URL path для HTTPS proxy.
- allow_auth_listeners_only: разрешить ли доступ только авторизованным слушателям.
- queue_size: размер очереди буфера.
- burst_size: размер burst-буфера.
- youtube_stream_image: файл изображения или видео для YouTube stream.
- youtube_stream_url: RTMP URL YouTube.
- youtube_stream_key: stream key YouTube.
- youtube_stream_enabled: включить отправку потока в YouTube.
- fb_stream_image: файл изображения или видео для Facebook stream.
- fb_stream_url: RTMP URL Facebook.
- fb_stream_key: stream key Facebook.
- fb_stream_enabled: включить отправку потока в Facebook.
- vk_stream_image: файл изображения или видео для VK stream.
- vk_stream_url: RTMP URL VK.
- vk_stream_key: stream key VK.
- vk_stream_enabled: включить отправку потока в VK.
- telegram_stream_image: файл изображения или видео для Telegram stream.
- telegram_stream_url: RTMPS URL Telegram.
- telegram_stream_key: stream key Telegram.
- telegram_stream_enabled: включить отправку потока в Telegram.
- rutube_stream_image: файл изображения или видео для RuTube stream.
- rutube_stream_url: RTMP URL RuTube.
- rutube_stream_key: stream key RuTube.
- rutube_stream_enabled: включить отправку потока в RuTube.
- shoutcast_uid: UID лицензии Shoutcast.
- shoutcast_license_key: лицензионный ключ Shoutcast.

В ответ на успешное создание API возвращает созданный объект канала в JSON.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/<br/>
<b>HTTP метод:</b> GET, PUT, DELETE <br/>
<b>Авторизация:</b> GET - не обязательна, PUT и DELETE - необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID канала<br/>
</div>

Этот endpoint позволяет получить один конкретный канал, обновить его настройки или удалить канал.

#### Пример: GET

{{< highlight python  >}}

import requests

response = requests.get(
	"https://demo.streaming.center:1030/api/v2/channels/11/"
)
print(response.json())

{{< / highlight >}}

В ответе возвращается один объект канала с теми же полями, что и в `results` списка каналов. Для анонимного запроса скрываются чувствительные административные поля.

#### Пример: PUT

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.put(
	"https://demo.streaming.center:1030/api/v2/channels/11/",
	headers=headers,
	json={
		"server": 1,
		"port": 8000,
		"bitrate": "192",
		"listeners": "1000",
		"s_type": "icecast",
		"s_format": "mp3",
		"public": True,
		"proxy_enabled": True,
		"proxy_url_path": "radio"
	}
)

print(response.json())

{{< / highlight >}}

#### Параметры PUT

Для обновления можно передавать те же поля, что и при создании канала. В ответ API возвращает обновлённый объект канала.

#### Пример: DELETE

{{< highlight python  >}}

import requests

API_KEY = "your_api_key"
headers = {"SC-API-KEY": API_KEY}

response = requests.delete(
	"https://demo.streaming.center:1030/api/v2/channels/11/",
	headers=headers
)

print(response.status_code)

{{< / highlight >}}

При успешном удалении endpoint возвращает HTTP status `204 No Content`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/add_listener/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID канала<br/>
</div>

Служебный endpoint для регистрации факта подключения слушателя. Обычно он вызывается самим стриминг-сервером или прокси-слоем, а не пользовательским приложением.

#### Параметры запроса

Endpoint принимает параметры в query string или в POST body. Значения сохраняются в лог подключения.

- action: тип действия подключения.
- mount: mount point или строка подключения.
- server: имя сервера или узла.
- port: порт подключения.
- client: идентификатор клиента.
- user: имя пользователя, если оно передаётся внешней системой.
- pass: пароль, если он передаётся внешней системой.
- ip: IP-адрес слушателя.
- agent: user-agent слушателя.

#### Пример ответа

Endpoint возвращает пустой HTTP 200 response и выставляет заголовки:

- icecast-auth-user: всегда `1`.
- icecast-auth-message: всегда `auth`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/channels/:id/auth_listener/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID канала<br/>
</div>

Этот служебный endpoint проверяет, может ли слушатель подключиться к закрытому каналу с параметром `allow_auth_listeners_only=true`.

#### Параметры запроса

Endpoint принимает параметры в query string или в POST body.

- mount: обязательный параметр для проверки токена. Обычно содержит mount point и token в query-части, например `/stream?abc123token`.
- action: тип действия подключения.
- server: имя сервера или узла.
- port: порт подключения.
- client: идентификатор клиента.
- user: имя пользователя, если оно передаётся источником запроса.
- pass: пароль, если он передаётся источником запроса.
- ip: IP-адрес слушателя.
- agent: user-agent слушателя.

Если token из параметра `mount` найден в таблице авторизованных слушателей и активен для сервера канала, endpoint разрешит подключение.

#### Пример ответа

Endpoint возвращает пустой HTTP 200 response и выставляет заголовки:

- icecast-auth-user: `1`, если слушатель авторизован, иначе `0`.
- icecast-auth-message: всегда `auth`.

#### Как получить общее количество слушателей радио

Чтобы получить суммарное количество слушателей по радио, запросите список каналов через `/api/v2/channels/?server=<server_id>` и просуммируйте поле `listeners_current` только для тех каналов, которые находятся online. Поле `state` помогает определить состояние канала: `0` - канал offline, `1` - канал online, но без активного подключения, `2` - канал online и реально вещает. Если вам нужен именно текущий total listeners по всем вещающим потокам радио, обычно суммируют `listeners_current` у каналов со `state = 2`.
