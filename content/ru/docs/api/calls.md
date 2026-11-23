---
title: "Звонки слушателей и подключения в реальном времени"
weight: 66
summary: "Проверка доступности звонков, запрос на звонок, управление настройками и получение билетов подключения."
seo_title: "API звонков слушателей и подключения в реальном времени | Radio-Tochka.com API"
description: "Проверка доступности звонков, запрос на звонок, управление настройками и получение билетов подключения."
---

## Звонки слушателей

Пути на этой странице не оканчиваются косой чертой. Методы для звонящих принимают [необязательный токен слушателя](/docs/api/listeners/#api-listener-login). Возможность звонков без регистрации определяется [настройками станции](/docs/api/calls/#api-call-settings).

<div class="api-block">
<b>Путь</b> /api/v2/calls/status<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> Необязательный токен слушателя<br/>
</div>

Передайте `station` и необязательный `browser_id`. Ответ содержит `state` (`ok` или `offline`), `cooldown_until`, `who_can_call` и `logged_in`.

<div class="api-block" id="api-call-request">
<b>Путь</b> /api/v2/calls/requests<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Необязательный токен слушателя<br/>
</div>

Передайте `station`, `browser_id`, имя гостя `name` при необходимости, `intro` и решение `altcha` для [проверочного задания слушателя](/docs/api/listeners/#api-listener-challenge), полученного без параметра `purpose`. HTTP 201 возвращает `call_id`, `call_token` и `ticket`. При HTTP 409 возможны `busy`, `duplicate`, `unavailable` или `cooldown` с `retry_at` в секундах Unix.

<div class="api-block">
<b>Путь</b> /api/v2/calls/requests/{id}/ticket<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> Необязательный токен слушателя<br/>
</div>

Передайте `call_token` [из ответа на запрос звонка](/docs/api/calls/#api-call-request), чтобы получить новый `ticket` и `expires_in` в секундах.

## Звонки в панели

Используйте [JWT-токен](/docs/api/auth/#api-panel-sign-in) пользователя с правом управлять звонками.

<div class="api-block" id="api-call-settings">
<b>Путь</b> /api/v2/calls/settings<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET принимает `station` в строке запроса. PUT принимает `station` в JSON и изменяемые поля `enabled`, `who_can_call`, `cooldown_min`, `max_wait_min` и `max_call_min`. Ответы также содержат длительности в секундах.

<div class="api-block" id="api-call-log">
<b>Путь</b> /api/v2/calls/logs<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `station` и при необходимости `date`, `outcome`, `registered`, `limit` и `offset`. Строки включают `id`, время действий, сведения о звонящем, `status`, `wait_s`, `call_s`, `air_ms` и `end_reason`.

<div class="api-block">
<b>Путь</b> /api/v2/calls/blocks<br/>
<b>Методы HTTP</b> GET, POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

GET возвращает блокировки по параметру `station`. POST создаёт блокировку по полям JSON `station`, [`call_id`](/docs/api/calls/#api-call-log) и необязательному `note`. Возвращает блокировку с HTTP 201.

<div class="api-block">
<b>Путь</b> /api/v2/calls/blocks/{id}<br/>
<b>Методы HTTP</b> DELETE<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Снимает блокировку звонков. Возвращает HTTP 204.

<div class="api-block">
<b>Путь</b> /api/v2/calls/ice<br/>
<b>Методы HTTP</b> GET<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Передайте `station`. Возвращает `ice_servers` для ведущего.

<div class="api-block" id="api-call-widget">
<b>Путь</b> /api/v2/call_widget_settings/{station_id}<br/>
<b>Методы HTTP</b> GET, PUT<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Чтение или частичное обновление настроек. Возвращает конфигурацию виджета звонков станции.

## Билеты подключения панели

<div class="api-block" id="api-realtime-tickets">
<b>Путь</b> /api/v2/realtime/tickets<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Используйте JWT-токен. Передайте целое число `station`, роль `role` (`ptt`, `call_host` или `chat_staff`) и тип `connection` (`messaging` или `audio`). HTTP 201 возвращает `ticket` и `expires_in` (30 секунд).

<div class="api-block">
<b>Путь</b> /api/v2/realtime/logout<br/>
<b>Методы HTTP</b> POST<br/>
<b>Авторизация</b> JWT-токен<br/>
</div>

Отзывает доступ к подключениям в реальном времени для текущего сеанса панели. Возвращает HTTP 204.

```http
POST /api/v2/realtime/tickets
```

```json
{
  "station": 1,
  "role": "ptt",
  "connection": "audio"
}
```

Билет из ответа используется для подключения к сервису станции в реальном времени. Выдача зависит от доступности роли, [настроек станции](/docs/api/settings/#api-station-settings-detail) и прав пользователя. Для чата слушателей используйте [метод получения билета слушателя](/docs/api/listeners/#api-listener-ticket).

### Пример изменения настроек

Поле `who_can_call` принимает `anyone` (все) или `registered` (только зарегистрированные). Нулевое значение `cooldown_min` или `max_call_min` отключает соответствующее ограничение. Поле `max_wait_min` принимает от 1 до 1440 минут.

```http
PUT /api/v2/calls/settings
```

```json
{"station":1,"enabled":true,"who_can_call":"registered","max_wait_min":15}
```

## Состояния звонка и фильтры журнала

| Поле или параметр | Значение |
| --- | --- |
| `state` | `ok` — звонок доступен, `offline` — для этого звонящего он недоступен. |
| `status`, `outcome` | `pending` — проверяется допуск, `queued` — ожидает ведущего, `accepted` — принят, `ended` — завершён. Фильтр `outcome` принимает одно из этих состояний или точное значение `end_reason` из журнала. |
| `registered` | `1`, `true` или `yes` — с аккаунтом, `0`, `false` или `no` — гости. Пустой или отсутствующий параметр включает обе группы. |
| `date`, `limit`, `offset` | Дата журнала в формате `YYYY-MM-DD`, число строк (по умолчанию 50, максимум 200) и число пропускаемых строк (0 начинает с первой). |
| `browser_id`, `name`, `intro` | Идентификатор браузера от 1 до 64 символов, имя гостя до 40 символов и необязательное представление до 140 символов. Для вошедших используется имя из аккаунта. |

В примерах `station: 1` выбирает станцию с ID 1, а `max_wait_min: 15` ограничивает ожидание 15 минутами. `messaging` запрашивает подключение для управления или чата, `audio` — для звука. Роли: `ptt` — push-to-talk, `call_host` — ведущий звонков, `chat_staff` — сотрудник чата.
