---
title: "Чат слушателей и модерация"
weight: 65
summary: "Просмотр комнат и сообщений, личная переписка и модерация чата из панели."
seo_title: "API чата слушателей и модерации | Radio-Tochka.com API"
description: "Просмотр комнат и сообщений, личная переписка и модерация чата из панели."
---

## Чат слушателей

Публичное чтение комнат поддерживает токен слушателя там, где доступна необязательная авторизация. Для отправки сообщений, реакций и личной переписки [нужен токен слушателя](/docs/api/listeners/#api-listener-login). Для модерации [нужен JWT-токен](/docs/api/auth/#api-panel-sign-in) и [соответствующее право на чат](/docs/api/panel-users/#api-permission-catalog). Пути на этой странице не оканчиваются косой чертой.

<div class="api-block" id="api-chat-rooms">
<b>Путь</b> /api/v2/chat/rooms<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `station` или `server`. Возвращает массив комнат.

<div class="api-block">
<b>Путь</b> /api/v2/chat/rooms/{id}/messages<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> GET доступен без авторизации. Для POST нужен токен слушателя.<br/>
</div>

История сообщений комнаты. Необязательный `before` — ID сообщения, `limit` — размер страницы.

<div class="api-block">
<b>Путь</b> /api/v2/chat/rooms/{id}/messages<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> GET доступен без авторизации. Для POST нужен токен слушателя.<br/>
</div>

Передайте `text`, `client_id` и при необходимости multipart-файл `photo`. Новое сообщение возвращает HTTP 201, повтор с тем же клиентским ID — HTTP 200.

<div class="api-block">
<b>Путь</b> /api/v2/chat/photos/{id}/{size}<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Зависит от доступа к сообщению<br/>
</div>

Возвращает доступное изображение чата. Используйте ссылки из объекта сообщения.

<div class="api-block">
<b>Путь</b> /api/v2/chat/messages/{id}<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Удаляет собственное сообщение слушателя. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/chat/messages/{id}/reactions/{emoji}<br/>
<b>Методы HTTP</b> PUT, DELETE<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Добавляет или удаляет реакцию текущего слушателя. Возвращает `message_id`, счётчики по эмодзи в `counts`, реакции текущего слушателя в `mine` и `actor_emojis`, ID его аккаунта `actor` и `version`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/dms<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

GET возвращает переписку с параметрами `before` и `limit`. POST открывает диалог по `with_account` (ID слушателя) или `station`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/dms/{id}/messages<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Получение страницы сообщений или отправка `text`, `client_id` и необязательного multipart-файла `photo`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/dms/{id}/read<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Отмечает диалог прочитанным. Возвращает обновлённый диалог.

```http
POST /api/v2/chat/rooms/12/messages
```

```json
{
  "text": "Hello from the evening show",
  "client_id": "32d822e2-7d0a-492c-a5e5-49082dd67a15"
}
```

## Комнаты и переписка в панели

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/rooms<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET возвращает комнаты станции `station`. POST принимает `station` и `name`, возвращает созданную комнату.

<div class="api-block" id="api-staff-room">
<b>Путь</b> /api/v2/chat/staff/rooms/{id}<br/>
<b>Методы HTTP</b> GET, PATCH, PUT, POST, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Получение, изменение `name` или `archived`, либо удаление комнаты с HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/rooms/{id}/rename<br/>
<b>Методы HTTP</b> GET, PATCH, PUT, POST, DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Альтернативный путь к тому же [методу комнаты](/docs/api/chat/#api-staff-room).

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/rooms/{id}/{action}<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Укажите `archive` или `unarchive`. Возвращает обновлённую комнату.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/rooms/{id}/reorder<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `station` и `position`. Возвращает `id` и `position`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/rooms/{id}/messages<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Получение страницы сообщений или отправка сообщения сотрудника с `text` и `client_id`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/dms<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Входящие сообщения станции. Передайте `station` и при необходимости `limit` и `before`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/dms/{id}<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Просмотр диалога станции с параметром запроса `station`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/dms/{id}/messages<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET читает страницу сообщений с параметром `station`. POST принимает в JSON поля `station`, `text` и `client_id`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/dms/{id}/read<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Отмечает диалог прочитанным. Передайте `station` в строке запроса.

## Модерация и виджет

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/messages/{id}<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Удаляет сообщение. Принимает `reason_code`. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/sanctions<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Фильтрация по `account` и `station`. Для создания передайте `account`, `kind` и при необходимости `station`, `until`, `reason` и `reason_code`. Возвращает объект ограничения.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/sanctions/{id}/lift<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Снимает ограничение. Принимает `reason_code` и возвращает обновлённый объект.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/ip-bans<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Список по `station` или создание блокировки через `ip` либо `message_id`, область действия и необязательные срок и причину. Возвращает объект блокировки.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/ip-bans/{id}/lift<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Снимает блокировку IP. Принимает `reason_code`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/listeners<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Поиск по `q` или `search` с `page` и `limit`. Возвращает `results`, `total`, `page`, `limit` и `pages`.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/listeners/{id}<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Профиль слушателя, ограничения и счётчики активности.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/listeners/{id}/delete<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Удаляет аккаунт слушателя. Принимает `reason_code` и необязательное `station`. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/chat/staff/listeners/{id}/export<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Скачивание данных слушателя в ZIP.

<div class="api-block" id="api-chat-widget">
<b>Путь</b> /api/v2/chat_widget_settings/{station_id}<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение или частичное обновление настроек виджета чата станции. Возвращает конфигурацию виджета.

### Страницы сообщений и диалогов

В истории сообщений возвращаются `messages`, `has_more` и `next_before`. Чтобы получить более ранние сообщения, передайте `next_before` в параметре `before` следующего запроса. В странице не более 50 сообщений. Списки диалогов возвращают `items`, `has_more` и собственный курсор `next_before`.

При отправке сообщения возвращаются `id`, `message_id`, `duplicate`, `version` и `message`. Объект сообщения содержит сведения об отправителе `author_id`, `author_name`, `author_kind`, текст `text`, дату `created_at`, необязательное фото `photo`, счётчики и списки реакций и одно из полей `room_id` или `conversation_id`.
