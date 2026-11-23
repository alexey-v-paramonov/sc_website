---
title: "Сайт станции и виджеты"
weight: 70
summary: "Настройка сайта станции, встраиваемых виджетов, новостей и анонсов эфира."
seo_title: "API сайта станции и виджетов | Radio-Tochka.com API"
description: "Настройка сайта станции, встраиваемых виджетов, новостей и анонсов эфира."
---

## Сайт и материалы

<div class="api-block">
<b>Путь</b> /api/startpage/{server_id}/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

HTML публичного сайта станции. Вложенные страницы используют `/api/startpage/{server_id}/{spa_path}`.

<div class="api-block" id="api-site-settings">
<b>Путь</b> /api/v2/site_settings/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `server`, чтобы получить объект настроек сайта.

<div class="api-block">
<b>Путь</b> /api/v2/site_settings/{station_id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или обновление настроек сайта. GET использует ID станции в пути. Для PUT и PATCH также передайте `server` в теле или строке запроса и полный массив ID потоков `channels`.

<div class="api-block">
<b>Путь</b> /api/v2/site_settings/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Создание настроек сайта для `server`, если у станции ещё нет записи.

<div class="api-block">
<b>Путь</b> /api/v2/site_settings/{station_id}/<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Удаление настроек для станции, выбранной через `?server=1`.

<div class="api-block">
<b>Путь</b> /api/v2/startpage/download/{website_id}/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET скачивает ZIP. POST публикует сайт в веб-каталог аккаунта и возвращает `{}`. В путь передаётся [ID записи настроек сайта](/docs/api/website/#api-site-settings).

<div class="api-block">
<b>Путь</b> /api/v2/news/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список по `server` или создание новости с `server`, `title`, `text`, `dttm`, необязательными `image` и `video_url`.

<div class="api-block">
<b>Путь</b> /api/v2/news/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или управление новостью.

<div class="api-block">
<b>Путь</b> /api/v2/broadcasts/<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Список по `server` или создание анонса через `server`, `title`, `text`, `dttm` и необязательный `image`.

<div class="api-block">
<b>Путь</b> /api/v2/broadcasts/{id}/<br/>
<b>Методы HTTP</b> GET, PUT, PATCH, DELETE<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или управление анонсом эфира.

<div class="api-block">
<b>Путь</b> /api/v2/feedback/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Форма обратной связи сайта. Передайте `subject`, `message` и контактный `email`. Возвращает `status` (`ok`, `no_user` или `email_exception`) и необязательное поле `error`.

Для новостей и анонсов передавайте `dttm` в секундах Unix. В ответах поле возвращается в миллисекундах.

Среди свойств сайта — `title_tag`, `description_tag`, HTML-блоки `block_1_html`, `block_2_html`, `block_footer_html`, ссылки на соцсети (`social_*`), ссылки на приложения (`android_app`, `ios_app`, `rustore_app`) и переключатели, например `enable_news`, [`enable_podcasts`](/docs/api/podcasts/#api-podcast-page-settings), [`enable_chat`](/docs/api/chat/#api-chat-rooms), [`enable_calls`](/docs/api/calls/#api-call-settings) и `enable_feedback`.

## Виджеты

<div class="api-block">
<b>Путь</b> /api/v2/current_track_widget_settings/{station_id}/<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или сохранение настроек виджета текущего трека. Среди полей — `background_color`, `background_opacity`, `track_image_default`, `track_image_size`, `meta_font_size`, `progress_bar_color` и `vote_show`.

<div class="api-block" id="api-track-request-widget">
<b>Путь</b> /api/v2/request_track_widget_settings/{station_id}/<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или сохранение настроек виджета заказов. Среди полей — `tracks_num`, `track_width`, `ordering`, `allow_person_and_message`, интервалы `ip_timeout` и `track_timeout` в миллисекундах и оформление.

<div class="api-block">
<b>Путь</b> /api/v2/player_widget_settings/{station_id}/<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> GET доступен без авторизации. Для изменений нужен JWT-токен.<br/>
</div>

Чтение или сохранение настроек плеера. PUT принимает [ID каналов в поле `channels`](/docs/api/channels/#api-channels) строкой через запятую. Другие поля — `station_name`, `station_url`, `lang`, `autoplay`, `player_width`, `show_history`, `history_limit` и `show_vote`.

<div class="api-block">
<b>Путь</b> /api/v2/player_widget_settings/{station_id}/delete/<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Сброс сохранённых настроек плеера.

GET возвращает объекты конфигурации. Три метода PUT выше возвращают HTTP 201 и сохранённые поля. Для изображений используйте multipart. У виджетов чата и звонков есть отдельные методы настройки.

```http
PUT /api/v2/player_widget_settings/1/
```

```json
{
  "station_name": "Example Radio",
  "channels": "11,12",
  "show_history": true,
  "history_limit": 10
}
```

В настройках виджетов чата и звонков доступны `background_color`, `text_color` и `accent_color` в трёх- или шестизначном формате HEX. Поле `width` принимает 100–2000 пикселей, а `height` — 100–3000. Виджет звонков также принимает `height: 0`. В виджете чата поле `default_room` принимает [ID комнаты той же станции](/docs/api/chat/#api-chat-rooms) или null. Методы настройки приведены в разделах [«Чат»](/docs/api/chat/#api-chat-widget) и [«Звонки»](/docs/api/calls/#api-call-widget).
