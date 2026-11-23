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
- feed_url: [URL RSS-ленты для этого подкаста](/docs/api/podcasts/#api-podcast-rss)
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

<div class="api-block" id="api-podcast-episodes">
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

## Управление подкастами и эпизодами

Для изменений нужен [JWT-токен](/docs/api/auth/#api-panel-sign-in) пользователя с правом редактировать подкасты. В [публичный список](/docs/api/podcasts/#api-podcast-episodes) входят уже опубликованные эпизоды по `publish_ts`. Параметр `q` ищет по названию и описанию эпизода.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts/{id}/<br/>
<b>Методы HTTP</b> PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Обновление `title`, `description`, `published` или загружаемого `image`, либо удаление подкаста. Поля `folder`, `feed_url` и `episodes_count` вычисляются автоматически.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts/{id}/episodes/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Для создания эпизода передайте multipart-поля `podcast`, `title` и аудиофайл `path`. Необязательные поля — `description`, `image` и `publish_ts` (секунды Unix в запросе, миллисекунды в ответе). Возвращает HTTP 201 и эпизод.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts/{id}/episodes/{episode_id}/<br/>
<b>Методы HTTP</b> PUT, PATCH, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Изменение или удаление эпизода. Ссылки возвращаются в `url` и `public_page_url`.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts/{id}/create_episode_from_track/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Копирует [трек из медиатеки](/docs/api/playlists/#api-music-track) по `track_id`. При успехе возвращает `{}`, при повторяющемся заголовке или ошибке копирования — HTTP 400.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts/{id}/add_recording/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте [ID диджея](/docs/api/djs/#api-djs) в `dj` и [имена файлов](/docs/api/djs/#api-dj-recordings) в `recordings`. При успехе возвращает `{}`.

```http
POST /api/v2/podcasts/2/create_episode_from_track/
```

```json
{
  "track_id": 40
}
```

## Публичный RSS и настройки страницы

<div class="api-block" id="api-podcast-rss">
<b>Путь</b> /api/v2/podcasts/{id}/feed.xml<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

RSS-лента подкаста. Путь заканчивается на `.xml`.

<div class="api-block">
<b>Путь</b> /api/podcast_feed/{server_id}/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Публичная HTML-страница подкастов станции.

<div class="api-block" id="api-podcast-page-settings">
<b>Путь</b> /api/v2/podcasts_settings/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

GET с `?server=1` возвращает объект настроек страницы станции. POST создаёт запись настроек с `server`, если записи ещё нет.

<div class="api-block">
<b>Путь</b> /api/v2/podcasts_settings/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

GET использует ID станции в пути. Для обновления передайте `server` или `?server=1`. Среди полей — `title_tag`, `description_tag` и `block_footer_html`. DELETE выбирает станцию так же, как обновление.
