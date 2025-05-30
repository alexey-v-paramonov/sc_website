---
title: "Расход трафика"
date: 2024-08-23T11:40:02+03:00
weight: 70
summary: "Трафик, потребляемый при прослушивании интернет-радио, зависит от качества потока, например, 128 кбит/с требует около 60 МБ в час, а для владельцев радиостанций трафик зависит от количества слушателей и пропускной способности сервера. Используйте наш калькулятор траффика, чтобы узнать точные цифры."
js: js/traf_calc.js
---

### Сколько трафика потребляет Интернет-радио?

#### Для слушателя
При прослушивании Интернет-радио создаётся впечатление "бесконечной" загрузки файла, так как потоковое аудио воспроизводится в практически реальном времени и постепенно "скачивается" на устройство слушателя, при этом:
- Через Wi-Fi — трафик обычно не тарифицируется.
- Через мобильного оператора — трафик может тарифицироваться по тарифам оператора.

Примерный расход трафика зависит от качества потока:

- 128 кбит/с (MP3) — около 1 МБ в минуту или 60 МБ в час.
- 256 кбит/с (MP3) — около 2 МБ в минуту или 120 МБ в час.

Форматы для мобильных устройств (AAC++, HE-AAC) — всего 15 МБ в час при сохранении хорошего качества звука в качестве 32 кбит/с. Наша платформа поддерживает такие форматы.



#### Для владельца радио
Если вещание идёт полностью с сервера (через встроенный Авто-Диджей) - то весь трафик идет только через сервер. Если же Вы ведёте прямой эфир и вещаете на сервер - то трафик для Вас равен трафику 1 слушателя, т.е. если Вы вещаете со своего компьютера на сервер, где установлена наша платформа Интернет-радио - то трафик составит 60 мегабайт в час при вещании в 128кбит MP3.

Трафик сервера же, обычно, не тарифицируется провайдером. Когда Ваше вещание идет в прямом эфире или через встроенный Авто-Диджей - то весь трафик ложится на сервер. Для сервера очень важна ширина сетевого канала, которую выделил хостинг провайдер Вашему серверу. Обычно это либо 100 мбит в секунду, либо 1 гигабит в секунду.

- при вещании в качестве 128 кбит MP3 сервер с сетевым каналом **100 мегабит в секунду** может обслуживать до **700 *одновременно подключенных*** слушателей. В случае полного заполнения слушателями (700 одновременно) трафик будет составлять примерно 4 гигабайта в час на сервере.

- при вещании в качестве 128 кбит MP3 сервер с сетевым каналом **1 Гигабит в секунду** может обслуживать до **7000 *одновременно подключенных*** слушателей. Трафик в этом случае составит 40 гигабайт в час на сервере.

При заказе радио у нас - трафик не тарифицируется и не влияет на стоимость услуг.


#### Для владельца радиостанции

Варианты вещания:

- **Авто-Диджей** (автоматическое вещание с сервера) — весь трафик идёт только через сервер, владельцу трафик не начисляется.

- **Прямой эфир** (трансляция с компьютера на сервер) — трафик ведущего эфир равен трафику одного слушателя. Например, при вещании в качестве 128 кбит/с (MP3) расход составит 60 МБ в час.

**Трафик сервера и требования к каналу:**

Трафик на сервере обычно не тарифицируется хостинг-провайдером, но важна пропускная способность канала. Обычно это:

- **100 Мбит/с**
- **1 Гбит/с**

При вещании в **128 кбит/с (MP3)** сервер с каналом:

- **100 Мбит/с** выдерживает до **700 слушателей одновременно**, генерируя около 4 ГБ трафика в час.
- **1 Гбит/с** выдерживает до **7000 слушателей одновременно**, с общим трафиком около 40 ГБ в час.

#### Важно:
При заказе Интернет-радио на нашей платформе весь трафик не тарифицируется и не влияет на стоимость услуг.


### Калькулятор трафика Интернет-радио

<div class="pure-g">
    <div class="pure-u-1-2">
        Качество, Kbps:
    </div>
    <div class="pure-u-1-2">
        <select id="quality"  class="form-control input-small">
            <option value="24">24 kbps</option>
            <option value="32">32 kbps</option>
            <option value="64">64 kbps</option>
            <option value="96">96 kbps</option>
            <option value="128" selected>128 kbps</option>
            <option value="192">192 kbps</option>
            <option value="256">256 kbps</option>
            <option value="320">320 kbps</option>
        </select>
    </div>
    <div class="pure-u-1-2">
        Одновременно слушателей:
    </div>
    <div class="pure-u-1-2">
        <select id="listeners">
            <option value="1" selected="">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="350">350</option>
            <option value="400">400</option>
            <option value="450">450</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1000">1000</option>
        </select>
    </div>
    <div class="pure-u-1-2">
        Период времени:	
    </div>
    <div class="pure-u-1-2">
        <select id="period" class="form-control input-small">
            <option value="0.5">30 минут</option>
            <option value="1" selected="selected">1 час</option>
            <option value="2">2 часа</option>
            <option value="4">4 часа</option>
            <option value="8">8 часов</option>
            <option value="24">1 день</option>
            <option value="168">Неделя (7 дней)</option>
            <option value="720">Месяц (30 дней)</option>
        </select>    
    </div>
    <div class="pure-u-1-2">
        Суммарный трафик:
    </div>
    <div class="pure-u-1-2">
        <span id="sum_m"></span> МБайт = <span id="sum_g"></span> ГБайт
    </div>
    <div class="pure-u-1-2">
        Скорость передачи данных:
    </div>
    <div class="pure-u-1-2">
        <span id="netspeed_k"></span> КБит/с = <span id="netspeed_m"></span> МБит/c
    </div>

</div>



