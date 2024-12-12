---
title: "История эфира"
date: 2024-08-24T11:37:29+03:00
---

<div class="api-block">
<b>URL:</b> /api/v2/history/ <br/>
<b>HTTP Методы:</b> GET <br/>
<b>Параметры:</b> <br/>
<b>limit: </b> количество запрашиваемых элементов<br/>
<b>offset:</b> отступ (с какой записи начинать вывод)<br/>
<b>server:</b> ID радио-сервера<br/>
</div>

История треков в эфире радио, последний трек в выводе данного API представляет собой трек, который играет прямо сейчас на радио.

#### Пример

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.s02.radio-tochka.com:8080/api/v2/history/?limit=1&offset=0&server=1")
print(response.json())

{{< / highlight >}}

#### Результат

{{< highlight json  >}}

{
   "count":500,
   "next":"https://demoaccount.s02.radio-tochka.com:8080/api/v2/history/?limit=1&offset=1&server=1",
   "previous":"None",
   "results":[
      {
         "album":"Ozzmosis (Expanded Edition)",
         "all_music_id":1190,
         "author":"Ozzy Osbourne",
         "author_other":"None",
         "comment":"None",
         "composer":"None",
         "dj_name":"AutoDJ",
         "genre":"None",
         "id":11552,
         "img_fetched":true,
         "img_large_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190_large.jpg",
         "img_medium_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190_medium.jpg",
         "img_url":"https://demoaccount.s02.radio-tochka.com:8080/media/tracks/trackImage1190.jpg",
         "isrc":"None",
         "jingle_id":"None",
         "label":"None",
         "length":296347,
         "lyricist":"",
         "metadata":"Ozzy Osbourne - I Just Want You",
         "n_listeners":0,
         "performance_type":"None",
         "playlist_title":"All music",
         "publisher":"None",
         "title":"I Just Want You",
         "ts":1733763534000,
         "year":"None"
      }
   ]
}
{{< / highlight >}}

#### Параметры

- album: Альбом 
- all_music_id: ID трека в музыкальной библиотеке сервера. Если трек является джинглом, этот параметр равен null. Если трек был воспроизведён в прямом эфире, а не из музыкальной библиотеки Авто-диджея - этот параметр равен null.
- author: исполнитель
- author_other: со-автор
- comment: комментарий к треку
- composer: композитор
- dj_name: имя диджея, во время эфира которого вышел в эфир этот трек.
- genre: жанр композиции
- id: ID записи в истории треков (уникальное значение)
- img_fetched: системой была выполнена попытка подгрузки обложки трека на музыкальных сервисах, если она отсутствует в mp3 тэгах файла 
- img_large_url: - URL картинки в максимальном разрешении для этого трека без сжатия
- img_medium_url: - вариант картинки среднего размера, который система получила путём сжатия оригинальной картинки до 500х500 пикселей
- img_url: мини-обложка трека, обычно в разрешении 100х100 пикселей
- isrc: ISRC код трека (используется для отчётности правообладателям)
- jingle_id: если трек в эфире был джинглом - этот параметр содержит ID джингла в базе контента Авто-диджея
- label: лейбл
- length: длительность трека в миллисекундах
- lyricist: автор текста
- metadata: итоговые метаданные с которыми трек вышел в эфир, обычно это Исполнитель - Название, но метаданные могут содержать и другие  данные, в зависимости от формата мета-данных, которые указаны в разделе "Настройки" радио-панели: например, имя ведущего Диджея
- n_listeners: количество слушателей на радио на момент запуска трека в эфир
- performance_type: вид исполнения: вокал, инструментал,чтец и т.п.
- playlist_title: название плей-листа, который был в эфире, может быть null для джинглов и для треков из прямого эфира
- publisher: издатель
- title: название трека
- ts: время выхода в эфир в формате int в миллисекундах во временной зоне UTC
- year: год трека