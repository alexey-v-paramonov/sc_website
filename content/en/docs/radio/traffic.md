---
title: "Traffic Usage"
date: 2024-08-23T11:40:05+03:00
weight: 60
js: js/traf_calc.js
---

### Internet Radio Streaming and Traffic Consumption

#### For Listeners:
When listening to internet radio, it feels like an "endless" file download because the streaming audio is played almost in real-time while gradually being "downloaded" to the listener's device. At the same time:
- Over **Wi-Fi** — data usage is usually not charged.
- Over a **Mobile network** — data may be charged according to your mobile operator’s plan.

Approximate data usage depends on the stream quality:

- **128 kbps (MP3)** — about **1 MB** per minute or **60 MB per hour**.
- **256 kbps (MP3)** — about **2 MB** per minute or **120 MB per hour**.
- **Mobile-optimized formats (AAC++, HE-AAC 32 kbps)** — only 15 MB per hour while maintaining good sound quality. Our streaming platform supports these formats.

#### For Radio Station Owners

Streaming Options:

- **Auto-DJ (automated streaming from the server)** — all traffic is handled by the server; the owner doesn’t generate any traffic on their side.
- **Live Broadcasting (streaming from your computer to the server)** — your traffic usage equals that of one listener. For example, streaming at 128 kbps (MP3) will consume about 60 MB per hour on your side.

**Server Traffic and Bandwidth Requirements:**

Server traffic is typically not charged by hosting providers, but the bandwidth capacity is crucial. Common bandwidth allocations are:

- **100 Mbps**
- **1 Gbps**

For streaming at **128 kbps (MP3)**, a server with:

- **100 Mbps bandwidth** can support up to **700 concurrent listeners**, generating around 4 GB of traffic per hour.
- **1 Gbps bandwidth** can support up to **7000 concurrent listeners**, generating around 40 GB of traffic per hour.

#### Important:
When you order internet radio hosting from us, traffic is not metered and does not affect the cost of the service.

### Internet-radio Trafic Calculator:

<div class="pure-g">
    <div class="pure-u-1-2">
        Quality, Kbps:
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
        Сoncurrent listeners:
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
        Time Period:
    </div>
    <div class="pure-u-1-2">
        <select id="period" class="form-control input-small">
            <option value="0.5">30 minutes</option>
            <option value="1" selected="selected">1 hour</option>
            <option value="2">2 hours</option>
            <option value="4">4 hours</option>
            <option value="8">8 hours</option>
            <option value="24">1 day</option>
            <option value="168">Week (7 days)</option>
            <option value="720">Month (30 days)</option>
        </select>    
    </div>
    <div class="pure-u-1-2">
        Total traffic:
    </div>
    <div class="pure-u-1-2">
        <span id="sum_m"></span> Megabytes = <span id="sum_g"></span> Gigabytes
    </div>
    <div class="pure-u-1-2">
        Data transfer rate:
    </div>
    <div class="pure-u-1-2">
        <span id="netspeed_k"></span> Kbps = <span id="netspeed_m"></span> Mbps
    </div>

</div>



