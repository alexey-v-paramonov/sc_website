---
title: "Диск и инструменты"
weight: 71
summary: "Проверка использования диска, поиск свободного порта вещания, синтез речи и получение уведомлений администратора."
seo_title: "API диска и инструментов | Radio-Tochka.com API"
description: "Проверка использования диска, поиск свободного порта вещания, синтез речи и получение уведомлений администратора."
---

## Диск и порты вещания

<div class="api-block">
<b>Путь</b> /api/v2/du/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Возвращает `du_free_gb`, `du_total_gb`, `du_free_mb`, `du_total_mb`, `show_mb`, `du_overspending` и `is_unlimited` для авторизованного аккаунта.

<div class="api-block" id="api-free-port">
<b>Путь</b> /api/v2/catalog/free_port/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Возвращает номер свободного порта вещания в `port`.

## Синтез речи и обратная связь разработчикам

<div class="api-block" id="api-tts">
<b>Путь</b> /api/v2/tts/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте поля формы `text`, `lang`, `voice`, `speed` и `emotion`. При успехе в JSON сервиса возвращается `audio`. [Для сохранения](/docs/api/utilities/#api-tts-save) передайте его в поле `mp3_base64`.

<div class="api-block" id="api-tts-save">
<b>Путь</b> /api/v2/tts_save/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Сохраняет [сгенерированный MP3](/docs/api/utilities/#api-tts). Передайте `mp3_base64`, `server_id`, `filename`, необязательные `author` и `title` и `destination` (`media` по умолчанию или `jingles`). Для музыки укажите `media_dir` и [при необходимости `playlist`](/docs/api/playlists/#api-playlists), [для джинглов — `jingle_dir`](/docs/api/jingles/#api-jingles). Возвращает `{}`.

<div class="api-block">
<b>Путь</b> /api/v2/developer_feedback/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте JSON с `message` (20–10 000 символов) и необязательными `server_id`, `locale`, `page_path` и `frontend_version`. HTTP 201 возвращает `id` принятого обращения. При сбое внешнего сервиса возможны HTTP 502, 503 или 504.

## Уведомления администратора и реселлера

<div class="api-block">
<b>Путь</b> /api/v2/admin_notifications/<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Возвращает `enabled` и `items` для авторизованного аккаунта. У каждого уведомления есть `id`, `title`, `body_html` и `published_at` в UTC.

<div class="api-block">
<b>Путь</b> /api/v2/admin_notifications/{id}/dismiss/<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Скрывает уведомление. Возвращает HTTP 204.

```http
GET /api/v2/admin_notifications/
```

```json
{
  "enabled": true,
  "items": []
}
```

## Значения параметров инструментов

Поля `du_free_gb` и `du_total_gb` — свободное и общее пространство в гибибайтах. Поля `*_mb` используют мебибайты. `show_mb` задаёт единицу отображения, `du_overspending` показывает превышение квоты в мегабайтах, а `is_unlimited` отмечает отсутствие лимита. `port` — номер свободного порта вещания.

В синтезе речи `text` — исходный текст, `lang` — язык или локаль, `voice` — голос для выбранной локали, `speed` — множитель скорости речи, `emotion` — стиль озвучивания. Доступные сочетания зависят от сервиса синтеза и отображаются при выборе голоса в панели.
