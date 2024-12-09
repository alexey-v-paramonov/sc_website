---
title: "Введение"
date: 2024-08-24T11:37:29+03:00
---

Здесь и следующих подразделах мы расскажем как использовать API нашей панели управления Интернет-радио для получения информации о состоянии эфира и других данных программными методами. Используя наш API Вы можете строить свои собственные скрипты, приложения и модули для сайта своего радио, мобильного приложения и любой интеграции, где требуется программное взаимодействие с сервером радио.

Для работы с API у Вас уже должна быть установлена и настроена наша Панель Управления Интернет-радио. Для работы с API Вы должны знать URL своей панели управления: тот адрес, по которому Вы обычно заходите в интерфейс вещателя, где Ваши каналы, плей-листы, сетка вещания и прочие разделы.

URL адрес API находится по адресу: **<адрес Вашей панели на сервере>/api/<версия api>**, например: 

[http://demoaccount.radio-tochka.com:8080/api/v2/](http://demoaccount.radio-tochka.com:8080/api/v2/) 


Наш API использует форматы JSON и JSONP для обмена данными. Для правильной работы API мы настоятельно рекомендуем иметь настроенную и рабочую поддержку протокола HTTPS на стороне сервера, а в тех случаях, где необходима [Авторизация](/docs/api/auth) для API запросов - HTTPS протокол критически необходим для защиты передачи токенов авторизации.


Пример API запроса на языке программирования Python, который получает историю эфира (1 последний трек, он же является текущим на радио, который играет прямо сейчас), которые играли на сервере **1**:

{{< highlight python  >}}

import requests

response = requests.get("https://demoaccount.s02.radio-tochka.com:8080/api/v2/history/?limit=1&offset=0&server=1")
print(response.json())

{{< / highlight >}}

В результате выполнения скрипта будет выведена информация в JSON о текущем треке на радио, примерно так:

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

Как видите, система предоставляет множество информации - название текущего трека, плей-лист, когда трек начал играть и сколько длится, обложки трека (если есть) и прочие параметры, которые подробно разобраны в нашей документации.
