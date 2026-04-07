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

<!--
/api/v2/playlists/<pk>/add_recording/   playlists.views.PlaylistViewSet playlist-add-recording
/api/v2/playlists/<pk>/clean_duplicates/        playlists.views.PlaylistViewSet playlist-clean-duplicates
/api/v2/playlists/<pk>/copy/    playlists.views.PlaylistViewSet playlist-copy
/api/v2/playlists/<pk>/excel/   playlists.views.PlaylistViewSet playlist-excel
/api/v2/playlists/<pk>/order_tracks/    playlists.views.PlaylistViewSet playlist-order-tracks
/api/v2/playlists/<pk>/shuffle_tracks/  playlists.views.PlaylistViewSet playlist-shuffle-tracks
/api/v2/playlists/<playlist_pk>/tracks/ playlists.views.PlaylistTracksViewSet   track-list
/api/v2/playlists/<playlist_pk>/tracks/<pk>/    playlists.views.PlaylistTracksViewSet   track-detail
/api/v2/playlists/<playlist_pk>/tracks/bulk_delete/     playlists.views.PlaylistTracksViewSet   track-bulk-delete
/api/v2/playlists/<playlist_pk>/tracks/bulk_move/       playlists.views.PlaylistTracksViewSet   track-bulk-move



-->