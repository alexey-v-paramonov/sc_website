---
title: "Аккаунты слушателей"
weight: 64
summary: "Регистрация и вход слушателей, управление профилем и блокировками, получение билетов для чата."
seo_title: "API аккаунтов слушателей | Radio-Tochka.com API"
description: "Регистрация и вход слушателей, управление профилем и блокировками, получение билетов для чата."
---

## Авторизация слушателей

Передавайте `token`, полученный [при входе](/docs/api/listeners/#api-listener-login), в заголовке `Authorization: Bearer <listener_token>`. Токен слушателя отличается от [JWT-токена для входа в панель управления](/docs/api/auth/#api-panel-sign-in), [токена доступа к аудиопотоку](/docs/api/settings/#api-stream-access) и [ключа API](/docs/api/settings/#api-api-keys). Пути ниже не оканчиваются косой чертой.

<div class="api-block" id="api-listener-challenge">
<b>Путь</b> /api/v2/listeners/challenge<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `purpose` со значением `register`, `resend` или `reset`. Без этого параметра возвращает универсальное проверочное задание. Ответ содержит подписанное одноразовое задание ALTCHA. Передайте решение в поле `altcha`.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/register<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `email`, `display_name`, `password`, [проверочное задание и решение](/docs/api/listeners/#api-listener-challenge), а также необязательный `language`. Возвращает HTTP 202 с `status: pending_confirmation` или сеанс и профиль, если подтверждение выполняется сразу.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/resend-confirmation<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `email`, [проверочное задание и решение](/docs/api/listeners/#api-listener-challenge) для повторной отправки. Возвращает HTTP 202 с `status: accepted`.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/confirm<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `token` из письма в теле или строке запроса. Возвращает `{"status":"confirmed"}`.

<div class="api-block" id="api-listener-login">
<b>Путь</b> /api/v2/listeners/login<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `email` и `password`. Возвращает `token` и `account` либо HTTP 401.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/logout<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Завершает текущий сеанс слушателя. Возвращает HTTP 204.

<div class="api-block" id="api-listener-reset">
<b>Путь</b> /api/v2/listeners/password-reset<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте `email`, [проверочное задание и решение](/docs/api/listeners/#api-listener-challenge) для сброса. Возвращает HTTP 202 с `status: accepted`.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/password-reset/confirm<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

Передайте [`token` сброса](/docs/api/listeners/#api-listener-reset) и новый `password`. Возвращает `{"status":"changed"}`.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/password<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

С токеном слушателя передайте `current_password` и `new_password`. Возвращает новый `token` и `account`.

<div class="api-block">
<b>Путь</b> /api/listeners/landing/confirm<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

GET с `token` показывает форму подтверждения. POST с полем формы `token` подтверждает email. Оба метода возвращают HTML.

<div class="api-block">
<b>Путь</b> /api/listeners/landing/reset<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> Без авторизации<br/>
</div>

GET с `token` показывает форму сброса. POST принимает поля формы `token`, `password` и необязательное `password_confirm`. Оба метода возвращают HTML.

```http
POST /api/v2/listeners/login
```

```json
{
  "email": "listener@example.com",
  "password": "<listener password>"
}
```

Профиль `account` содержит `id`, `email`, `display_name`, `language`, `email_verified`, `created_at` и `last_seen_at`. При ошибке возвращается код `error`. При превышении лимита запросов возможен HTTP 429 с `Retry-After`.

## Профиль, блокировки и сообщения

<div class="api-block">
<b>Путь</b> /api/v2/listeners/me<br/>
<b>Методы HTTP</b> GET, PATCH<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Возвращает текущий профиль. PATCH принимает `display_name`, `language` или оба поля и возвращает обновлённый профиль.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/me/delete<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Передайте `password` для удаления текущего аккаунта. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/me/export<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Скачивание данных аккаунта слушателя в ZIP.

<div class="api-block">
<b>Путь</b> /api/v2/listeners/blocks<br/>
<b>Методы HTTP</b> GET, POST, DELETE<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

GET возвращает `blocks`. POST с полем `account` в JSON блокирует слушателя и возвращает запись блокировки. DELETE с параметром запроса `account` снимает блокировку и возвращает HTTP 204.

<div class="api-block" id="api-listener-ticket">
<b>Путь</b> /api/v2/listeners/realtime/ticket<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Токен слушателя<br/>
</div>

Передайте `station` для [подключения к чату](/docs/api/chat/#api-chat-rooms). HTTP 201 возвращает `ticket` и `expires_in` (30 секунд).

## Значения параметров слушателей

Параметр задания `purpose` принимает `register` для регистрации, `resend` для повторной отправки письма и `reset` для сброса пароля. Без него возвращается универсальное задание. `email_verified` равно `true` для подтверждённой почты и `false` в остальных случаях. `account` в запросе блокировки — ID другого слушателя. `station` в запросе билета — ID станции, для которой он выдаётся.

## Ограничения профиля и проверочного задания

`display_name` — отображаемое имя слушателя, от 3 до 32 символов после удаления пробелов по краям. `email` — адрес для входа и подтверждения. `password` — пароль не короче 8 символов, который проходит проверку надёжности. `language` — тег локали длиной до 16 символов. По умолчанию используется `en` (английский). При отсутствии перевода сервер также использует английский.

Поле `altcha` содержит решение проверочного задания. Задание действует 10 минут. Поле `ticket` содержит отдельный временный билет для сообщений, а `expires_in` — срок его действия в секундах.
