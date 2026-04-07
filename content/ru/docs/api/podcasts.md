---
title: "Подкасты"
date: 2024-08-22T11:37:29+03:00
weight: 60
seo_title: "API подкастов Панели Управления Интернет-радио | Документация Radio-Tochka.com"
description: "Интегрируйте функциональность подкастов с вашей интернет-радиостанцией. Справочник API для получения, создания и управления подкастами с подробными примерами и форматами ответов."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/ <br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>limit: </b> количество записей в ответе (опционально)<br/>
<b>offset:</b> смещение, указывает начальную запись (опционально)<br/>
<b>server:</b> ID радиосервера (опционально)<br/>
</div>

Возвращает список подкастов.

#### Пример

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.s02.radio-tochka.com:8080/api/v2/podcasts/?server=1")
print(response.json())

{{< / highlight >}}

#### Пример ответа
{{< highlight json  >}}

[
    {
        "id": 2,
        "folder": "the-retro-podcast",
        "image": "https://radio.com:8080/media/podcast_covers/podcast1.jpg",
        "episodes_count": 5,
        "feed_url": "https://radio.com:8080/api/v2/podcasts/2/feed.xml",
        "public_page_url": "https://radio.com:8080/public/podcasts/2/",
        "title": "The Retro Podcast",
        "description": "There are many variations of passages of Lorem Ipsum",
        "published": true,
        "server": 1
    },
]
{{< / highlight >}}

#### Описание

- folder: папка подкаста в файловой системе сервера
- image: изображение обложки подкаста
- episodes_count: количество эпизодов в этом подкасте
- feed_url: URL RSS-ленты для этого подкаста
- public_page_url: URL публичной страницы этого подкаста, позволяет просматривать подкаст в браузере
- title: название подкаста
- description: описание подкаста
- published: true, если подкаст опубликован (не черновик)
- server: ID радиосервера, к которому относится подкаст

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/ <br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Parameters:</b> <br/>
<b>title: </b> название подкаста, string<br/>
<b>published:</b> boolean - опубликован подкаст или нет<br/>
<b>description: </b> описание подкаста, string<br/>
<b>server:</b> ID радиосервера<br/>
</div>

Создает подкаст на радио с указанным ID радиосервера. Если вам также нужно включить обложку подкаста в запрос на создание, отправьте POST-запрос с заголовком `multipart/form-data` и укажите обложку подкаста через параметр **image**.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>id</b>/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Возвращает один подкаст по ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Возвращает список эпизодов подкаста по ID подкаста.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/<b>episode_id</b>/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Возвращает эпизод подкаста по ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/podcasts/<b>podcast_id</b>/episodes/<b>episode_id</b>/episode.mp3/ <br/>
<b>HTTP methods:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Скачивает файл эпизода в формате MP3.


<!-- 

/api/v2/podcasts/<pk>/add_recording/    podcasts.views.PodcastViewSet   podcast-add-recording
/api/v2/podcasts/<pk>/create_episode_from_track/        podcasts.views.PodcastViewSet   podcast-create-episode-from-track
/api/v2/podcasts_settings/      podcasts.views.PodcastsPageSettingsViewSet      podcastspagesettings-list
/api/v2/podcasts_settings/<pk>/ podcasts.views.PodcastsPageSettingsViewSet      podcastspagesettings-detail
-->
