---
title: "Плейлисты"
date: 2024-08-22T11:37:29+03:00
weight: 50
seo_title: "API плейлистов Панели Управления Интернет-радио | Документация Radio-Tochka.com"
description: "Полное руководство по программному управлению плейлистами интернет-радио. Узнайте, как создавать, изменять, копировать плейлисты и добавлять треки с помощью API Radio-Tochka.com."
---

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>server:</b> ID радиосервера<br/>
</div>

Это API позволяет управлять плейлистами вашей станции.

#### Пример: GET

Получить все плейлисты с сервера с ID 1:

{{< highlight python  >}}

import requests
API_KEY = "6aNLaqRN.87L4xZ5LUXwWLCkK7dBswDafWZNcaLOB"

headers = {"SC-API-KEY": API_KEY}

response = requests.get(
  "https://demo.streaming.center:1030/api/v2/playlists/?server=1",
  headers=headers
)
print(response.json())

{{< / highlight >}}

#### Пример ответа
{{< highlight json  >}}

[
   {
      "id":1,
      "duration":9244067,
      "playlist_files_per_page":1000,
      "tracks_num":55,
      "name":"All music",
      "is_default":true,
      "is_random":true,
      "on_air":false,
      "directory_name":"",
      "current_track_order":-9,
      "server":1
   },
   {
      "id":2,
      "duration":9240712,
      "playlist_files_per_page":1000,
      "tracks_num":54,
      "name":"Morning shows",
      "is_default":false,
      "is_random":false,
      "on_air":true,
      "directory_name":"",
      "current_track_order":43,
      "server":1
   }
]
{{< / highlight >}}

#### Описание
Этот API endpoint возвращает массив ваших плейлистов. Каждый плейлист содержит следующие свойства:

- id: уникальный ID плейлиста
- duration: длительность воспроизведения плейлиста в миллисекундах
- playlist_files_per_page: специальная настройка, ограничивающая количество треков плейлиста на одной странице. Влияет только на отображение плейлиста в административном веб-интерфейсе.
- tracks_num: количество треков в плейлисте
- name: название плейлиста
- is_default: boolean-значение, указывающее, является ли плейлист плейлистом по умолчанию на сервере. Вы не можете удалить плейлисты по умолчанию. Вся музыка, которую вы загружаете на сервер, добавляется в плейлист по умолчанию, который используется как запасной вариант, когда Auto DJ больше нечего воспроизводить. На сервере может быть только один плейлист по умолчанию. В нашем случае "All music" является плейлистом по умолчанию на сервере 1.
- is_random: указывает, перемешивается ли плейлист или воспроизводится последовательно по порядку.
- on_air: true, если плейлист воспроизводится в данный момент.
- directory_name: указывает, создан ли плейлист из директории сервера с включенной опцией синхронизации.
- current_track_order: число, указывающее текущую позицию воспроизведения в плейлисте.
- server: число, ID текущего сервера.

#### Пример: POST

Создать плейлист на сервере с ID 1:

{{< highlight python  >}}

import requests
API_KEY = "6aNLaqRN.87L4xZ5LUXwWLCkK7dBswDafWZNcaLOA"

headers = {"SC-API-KEY": API_KEY}

response = requests.post(
    "https://demo.streaming.center:1030/api/v2/playlists/", 
    headers=headers, 
    json={"name":"New playlist","is_random":True,"server":1}
)

if response.ok:
    print("The playlist was created successfully")
    newly_created_playlist = response.json()

{{< / highlight >}}

Для создания плейлиста нужно отправить следующий JSON payload:

- name: название нового плейлиста
- is_random: передайте `true`, если хотите перемешивать плейлист
- server: целое число, обозначающее ID сервера.

#### Пример: POST-запрос для импорта файла плейлиста M3U.

Чтобы импортировать файл M3U, сначала необходимо загрузить сами аудиофайлы на сервер через FTP или веб-интерфейс. Затем отправьте **POST**-запрос с заголовком `Content-Type`, установленным в `multipart/form-data`. Вот как это сделать на Python:

{{< highlight python  >}}
import requests

API_KEY = "oaChhEn3.5Dnmm0rkJiJA4TNVE7266ypdOcp4Uakl"

headers = {"SC-API-KEY": API_KEY}

m3u_file = "import.m3u"
data = {
    "name":"m3u import",
    "is_random":True,
    "server":1
}
files = {
    'm3u': (m3u_file, open(m3u_file, 'rb'),)
}
response = requests.post(
    "https://demo.streaming.center:1030/api/v2/playlists/", 
    headers=headers, 
    data=data,
    files=files
)

{{< / highlight >}}


<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/<br/>
<b>HTTP метод:</b> GET, PUT, DELETE <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Позволяет загрузить конкретный плейлист по ID при использовании метода **GET** и обновить плейлист при использовании метода **PUT**.
С помощью метода **DELETE** можно удалить плейлист по ID.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/add_tracks_ordered/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

### Пример payload:

```[40, 52, 7]```

Этот endpoint позволяет добавлять треки в плейлист. Необходимо передать массив ID музыкальных файлов для треков, которые вы хотите добавить. Порядок ID в payload важен: треки будут добавлены в плейлист в том же порядке, в котором они указаны в массиве.


<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/start_broadcasting/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Позволяет запланировать воспроизведение плейлиста. Воспроизведение начнется в следующую полную минуту. Например, если вызвать это API в 11:30:25, в планировщике будет создано событие на 11:31 для запуска этого плейлиста. Этот endpoint не требует payload.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/copy/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID исходного плейлиста<br/>
</div>

Создаёт копию плейлиста вместе с его треками.

#### Пример payload

{{< highlight json  >}}

{
    "new_name": "Morning shows copy"
}

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
    "new_name": "Morning shows copy"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/order_tracks/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Позволяет изменить порядок отдельных элементов внутри плейлиста.

#### Пример payload

```[101, 97, 105, 110]```

Нужно передать массив ID записей из таблицы playlist tracks, а не ID треков из `AllMusic`. Endpoint возвращает пустой успешный ответ.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/shuffle_tracks/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Перемешивает порядок всех треков в плейлисте. Endpoint не требует payload и возвращает пустой JSON-ответ.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/clean_duplicates/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Удаляет дубликаты одинаковых треков внутри одного плейлиста, оставляя по одному экземпляру. Endpoint не требует payload и возвращает пустой JSON-ответ.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/excel/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
<b>lang:</b> необязательный язык заголовков файла, например `ru` или `en`<br/>
</div>

Возвращает Excel-файл `.xlsx` со списком треков плейлиста. В таблицу включаются номер, имя файла, исполнитель, название, длительность и дата загрузки.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:id/add_recording/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID плейлиста<br/>
</div>

Добавляет в плейлист записи из директории recordings выбранного DJ. Файлы копируются в музыкальную библиотеку сервера и одновременно добавляются как новые записи `AllMusic`.

#### Пример payload

{{< highlight json  >}}

{
    "dj": 4,
    "recordings": ["show_2026_04_08.mp3", "guest_hour.mp3"]
}

{{< / highlight >}}

Если `recordings` пустой, API вернёт ошибку `400`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>playlist_pk:</b> ID плейлиста<br/>
<b>limit:</b> необязательный лимит элементов<br/>
<b>offset:</b> необязательное смещение<br/>
<b>q:</b> строка поиска по `path`, `author` или `title`<br/>
</div>

Возвращает треки конкретного плейлиста с информацией о позиции и вложенным объектом трека из `AllMusic`.

#### Пример ответа

{{< highlight json  >}}

{
    "count": 2,
    "results": [
        {
            "id": 101,
            "order": 1,
            "flag": 0,
            "added_ts": "2026-04-08T09:10:11Z",
            "track": {
                "id": 40,
                "author": "Daft Punk",
                "title": "One More Time",
                "human_up": 12,
                "human_down": 1,
                "path": "/srv/media/Server_1/daft_punk_one_more_time.mp3"
            }
        }
    ]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/:id/<br/>
<b>HTTP метод:</b> GET, DELETE <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>playlist_pk:</b> ID плейлиста<br/>
<b>id:</b> ID записи playlist track<br/>
</div>

`GET` возвращает один элемент плейлиста с вложенным треком. `DELETE` удаляет один или несколько элементов из плейлиста. Для массового удаления можно передать несколько ID через запятую в URL. После удаления API возвращает JSON вида:

{{< highlight json  >}}

{
    "length": 9231000
}

{{< / highlight >}}

где `length` - обновлённая длительность плейлиста в миллисекундах.

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/bulk_delete/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>playlist_pk:</b> ID плейлиста<br/>
</div>

Удаляет несколько элементов из плейлиста за один запрос.

#### Пример payload

{{< highlight json  >}}

{
    "tracks": [101, 102, 103],
    "fs": false
}

{{< / highlight >}}

Поле `tracks` содержит ID записей playlist track. Если `fs=true`, связанные аудиофайлы также будут удалены из файловой системы. В ответе возвращается обновлённая длина плейлиста:

{{< highlight json  >}}

{
    "length": 9123000
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/playlists/:playlist_pk/tracks/bulk_move/<br/>
<b>HTTP метод:</b> PUT <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>playlist_pk:</b> ID плейлиста<br/>
</div>

Перемещает несколько элементов плейлиста на новую позицию.

#### Пример payload

{{< highlight json  >}}

{
    "tracks": [101, 102],
    "position": 5
}

{{< / highlight >}}

`position` задаётся с единицы. При успехе endpoint возвращает пустой JSON-ответ.

## API музыкальной базы AllMusic

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не обязательна<br/>
<b>Параметры:</b> <br/>
<b>server:</b> ID радиосервера<br/>
<b>genre:</b> фильтр по жанру<br/>
<b>with_tags_only:</b> вернуть только треки, у которых заполнены `author` и `title`<br/>
<b>remote:</b> вернуть только remote-файлы с URL в `path`<br/>
<b>requestable:</b> вернуть только треки, доступные для запросов слушателей<br/>
<b>search_q:</b> поиск по `author` и `title`<br/>
<b>order:</b> сортировка, `1` - по `author`, `2` - по `title`, `3` - случайный порядок<br/>
</div>

Этот endpoint возвращает треки из музыкальной базы `AllMusic`.

#### Пример: GET

{{< highlight python  >}}

import requests

response = requests.get(
        "https://demo.streaming.center:1030/api/v2/music/?server=1&requestable=1&search_q=queen"
)
print(response.json())

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

[
    {
        "id": 40,
        "server": 1,
        "author": "Queen",
        "title": "Radio Ga Ga",
        "album": "The Works",
        "genre": "Rock",
        "length": 343000,
        "path": "/srv/media/Server_1/queen_radio_ga_ga.mp3",
        "public_path": "/queen_radio_ga_ga.mp3",
        "filename": "queen_radio_ga_ga",
        "meta": "Queen - Radio Ga Ga",
        "requestable": true,
        "human_up": 25,
        "human_down": 2,
        "has_waveform": true,
        "length_formatted": "05:43",
        "category": {
            "id": 3,
            "name": "Rock"
        }
    }
]

{{< / highlight >}}

#### Основные поля ответа AllMusic

- id: ID трека в музыкальной базе.
- server: ID радиосервера.
- path: полный путь к файлу или URL remote-файла.
- public_path: публичный относительный путь к файлу.
- filename: имя файла без расширения.
- meta: строка вида `Author - Title`.
- author: исполнитель.
- author_other: дополнительный исполнитель.
- title: название трека.
- album: альбом.
- genre: жанр.
- performance_type: вид исполнения.
- composer: композитор.
- lyricist: автор текста.
- publisher: издатель.
- label: лейбл.
- year: год.
- comment: комментарий.
- length: длительность в миллисекундах.
- length_formatted: форматированная длительность.
- samplerate: sample rate файла.
- audio_format: формат аудио.
- requestable: доступен ли трек для requests.
- requests_number: сколько раз трек заказывали.
- human_up: количество лайков.
- human_down: количество дизлайков.
- auto_up: рост слушателей на треке.
- auto_down: снижение слушателей на треке.
- tag_image: маленькая обложка.
- image_medium: средняя обложка.
- image_large: большая обложка.
- gain_db: сохранённая коррекция громкости.
- peak_value: peak-сигнал трека.
- isrc: ISRC-код.
- mbid: MusicBrainz ID.
- category: вложенный объект категории с полями `id` и `name`, либо `null`.
- playback_start_time: начало playback region.
- playback_end_time: конец playback region.
- playback_start_bytes_offset: смещение старта в байтах.
- playback_end_bytes_offset: смещение конца в байтах.
- playback_region_calculation_status: статус расчёта playback region.
- disable_crossfade: выключен ли crossfade для трека.
- has_waveform: есть ли сохранённая waveform.
- region_length: вычисленная длина playback region.
- max_volume_db: максимально допустимое увеличение уровня без перегруза.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/<br/>
<b>HTTP метод:</b> GET, PUT, DELETE <br/>
<b>Авторизация:</b> GET - не обязательна, PUT и DELETE - необходимы<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

`GET` возвращает один объект трека. `PUT` позволяет обновить метаданные, например `author`, `title`, `album`, `genre`, `isrc`, `requestable`, `category` и другие поля модели. `DELETE` удаляет трек из базы и удаляет соответствующий файл из storage.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/like/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

Увеличивает счётчик лайков `human_up` у трека. Голосование ограничено одним голосом с одного IP за последние 24 часа.

#### Пример ответа

{{< highlight json  >}}

{
    "up": 26,
    "down": 2
}

{{< / highlight >}}

Если этот IP уже голосовал, API вернёт `400` и ответ вида:

{{< highlight json  >}}

{
    "result": "already_voted",
    "up": 26,
    "down": 2
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/dislike/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

Работает аналогично `like`, но увеличивает счётчик `human_down`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/playlists/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> GET - не обязательна, POST - необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

`GET` возвращает список ID плейлистов, в которые включён трек.

#### Пример ответа

{{< highlight json  >}}

{
    "playlists": [1, 2, 5]
}

{{< / highlight >}}

`POST` синхронизирует принадлежность трека к плейлистам.

#### Пример payload

{{< highlight json  >}}

{
    "playlists": [1, 5, 6]
}

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
    "added": [6],
    "removed": [2]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/get_artists/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Возвращает массив уникальных значений поля `author`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/get_genres/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
</div>

Возвращает массив уникальных значений поля `genre`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/batch_update/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Позволяет массово обновлять несколько треков `AllMusic` за один запрос.

#### Пример payload

{{< highlight json  >}}

{
    "update_mode": "overwrite",
    "track_ids": [40, 52, 70],
    "fields": {
        "genre": "Rock",
        "requestable": true
    }
}

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
    "result": "ok",
    "updated": 3
}

{{< / highlight >}}

`update_mode` может быть `fill-empty` или `overwrite`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/rename/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Этот endpoint отсутствует как collection route. Для переименования используется маршрут `/api/v2/music/:id/rename/`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/rename/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

Переименовывает файл на файловой системе и обновляет путь в базе данных.

#### Пример payload

{{< highlight json  >}}

{
    "new_name": "queen_radio_ga_ga_remastered"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/waveform/<br/>
<b>HTTP метод:</b> GET, POST <br/>
<b>Авторизация:</b> GET - не обязательна, POST - необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

`POST` генерирует waveform для трека и сохраняет её в базе. `GET` возвращает бинарные данные waveform с content type `application/octet-stream`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/:id/regions/<br/>
<b>HTTP метод:</b> PUT <br/>
<b>Авторизация:</b> необходима<br/>
<b>Параметры:</b> <br/>
<b>id:</b> ID трека `AllMusic`<br/>
</div>

Обновляет playback region трека.

#### Пример payload

{{< highlight json  >}}

{
    "playback_start_time": 0.85,
    "playback_end_time": 176.12
}

{{< / highlight >}}

После вызова поле `playback_region_calculation_status` переводится в состояние очереди на перерасчёт.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/folder_tree/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>server:</b> ID радиосервера<br/>
</div>

Возвращает дерево папок музыкальной библиотеки сервера.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/folder_files/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Возвращает список файлов из выбранных папок музыкальной библиотеки.

#### Пример payload

{{< highlight json  >}}

{
    "folders": ["/Rock/", "/Gold/"],
    "text": "queen"
}

{{< / highlight >}}

Дополнительно можно использовать query-параметр `server`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/tree/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>server_id:</b> ID радиосервера<br/>
</div>

Возвращает старый формат дерева музыкальной библиотеки с файлами и служебными полями `tree`, `open` и `root`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/reset_top/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Сбрасывает счётчики `human_up` и `human_down` у всех треков указанного сервера.

#### Пример payload

{{< highlight json  >}}

{
    "server_id": 1
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/toggle_requestable/<br/>
<b>HTTP метод:</b> PUT <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Массово переключает флаг `requestable` у треков.

#### Пример payload

{{< highlight json  >}}

[
    {"id": 40, "requestable": true},
    {"id": 52, "requestable": false}
]

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remote/<br/>
<b>HTTP метод:</b> GET <br/>
<b>Авторизация:</b> не требуется<br/>
<b>Параметры:</b> <br/>
<b>server_id:</b> ID радиосервера<br/>
</div>

Возвращает только remote-треки, у которых `path` начинается с `http` или `https`.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remote_file/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Добавляет один remote-файл в `AllMusic` по URL после проверки доступности и аудиоформата.

#### Пример payload

{{< highlight json  >}}

{
    "server": 1,
    "path": "https://cdn.example.com/stream/track.mp3",
    "author": "Queen",
    "title": "Radio Ga Ga",
    "album": "The Works"
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/bulk_add_remote_files/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Позволяет быстро добавить несколько remote-файлов одним запросом.

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/move_files/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Перемещает выбранные треки в другую директорию внутри музыкальной библиотеки сервера.

#### Пример payload

{{< highlight json  >}}

{
    "file_ids": [40, 52],
    "target_directory": "/Rock/Gold/",
    "server_id": 1
}

{{< / highlight >}}

#### Пример ответа

{{< highlight json  >}}

{
    "moved_count": 2,
    "failed_count": 0,
    "moved_files": [
        {
            "id": 40,
            "old_path": "/srv/media/Server_1/track1.mp3",
            "new_path": "/srv/media/Server_1/Rock/Gold/track1.mp3",
            "filename": "track1.mp3"
        }
    ]
}

{{< / highlight >}}

<div class="api-block">
<b>Endpoint:</b> /api/v2/music/remove/<br/>
<b>HTTP метод:</b> POST <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Удаляет выбранные файлы и, при необходимости, пустые директории.

#### Пример payload

{{< highlight json  >}}

{
    "server_id": 1,
    "files": [40, 52],
    "directories": ["Server_1/Rock/Old"],
    "ml": true
}

{{< / highlight >}}

Если `ml=true`, соответствующие записи `AllMusic` тоже будут удалены из базы.

<div class="api-block">
<b>Endpoint:</b> /api/v2/mediafile/upload/<br/>
<b>HTTP метод:</b> PUT <br/>
<b>Авторизация:</b> необходима<br/>
</div>

Загружает аудиофайл в указанную папку на сервере.

#### Параметры multipart/form-data

- filename: загружаемый файл.
- server_id: ID сервера.
- parent_dir: папка назначения.
- is_jingle: если `true`, файл загружается в директорию джинглов.

#### Как получить количество лайков у определённого трека по его ID из музыкальной базы AllMusic

Чтобы получить количество лайков у трека, выполните `GET` запрос к `/api/v2/music/:id/`, где `:id` — это ID объекта `AllMusic`. В ответе используйте поле `human_up`: именно оно содержит текущее число лайков трека.

Например, для трека с ID `40` запрос `GET /api/v2/music/40/` вернёт объект трека, в котором поле `human_up` может выглядеть так:

{{< highlight json  >}}

{
    "id": 40,
    "author": "Queen",
    "title": "Radio Ga Ga",
    "human_up": 25,
    "human_down": 2
}

{{< / highlight >}}

Если нужно не только прочитать текущее значение, но и сразу получить обновлённые счётчики после пользовательского голосования, можно вызвать `POST /api/v2/music/:id/like/`. В ответе API вернёт поля `up` и `down`, где `up` соответствует новому числу лайков.