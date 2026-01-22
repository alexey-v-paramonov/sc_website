---
title: "Streaming with BUTT"
date: 2026-01-21
weight: 10
summary: ""
seo_title: ""
description: ""
---

# Streaming Internet Radio with BUTT

## Important: This Guide Applies to Streaming.Center Only

The setup described in this article applies **exclusively** to  **Streaming.Center** Internet-radio control panel and uses streaming credentials generated inside your Streaming.Center account.

## How Streaming Works with Streaming.Center (Short Overview)

To stream audio, you must first create a DJ in the **“DJs”** section of the Streaming.Center control panel and then configure your streaming software using the credentials provided there; **this DJ-based setup works for all live streaming software supported by Streaming.Center, not only BUTT**.

## What is BUTT?

**BUTT** is a free, open-source audio streaming encoder designed specifically for live internet radio broadcasting. It captures audio from a selected input device (such as a microphone, mixer, or virtual audio interface), encodes the signal, and sends it directly to a remote streaming server.

BUTT is widely used by DJs, presenters, and internet radio stations because it is lightweight, stable, and focused on one task only: **reliable live audio streaming**.

## Supported Operating Systems

BUTT is a cross-platform application and works on all major desktop operating systems:

- **Windows**
- **Linux**
- **macOS**

This makes it suitable for most broadcasting setups, regardless of the operating system used.

## Where to Download BUTT

You should always download BUTT from the official project website to ensure compatibility and security:

https://danielnoethen.de/butt/

Choose the installer that matches your operating system and follow the standard installation process.

## Creating a DJ for Live Streaming

Log in to the **Streaming.Center** broadcaster interface and navigate to the **“DJs”** section. By default, this section contains only **AutoDJ**, which is used for automated playback. To enable live streaming, click the **“Add DJ”** button and create a new DJ account that will be used specifically for live broadcasts.
    {{< lightbox "/images/live_stream/butt/en/dj_create_mini.png" "/images/live_stream/butt/en/dj_create.png" >}}

## DJ Creation Settings

After clicking the **“Add DJ”** button, a DJ creation form will appear. In this form, select **“Desktop / Standalone application”** as the **Broadcast using** option, as this mode is intended for external streaming software such as BUTT. Then upload a DJ avatar image, specify a DJ name, and set a password — this password will later be used in the BUTT streaming settings.

Once all fields are completed, click the **“Add DJ”** button. After the DJ is created, our system will automatically allocate a dedicated streaming port for this DJ, which will be used for live broadcasting.
    {{< lightbox "/images/live_stream/butt/en/dj_form_mini.png" "/images/live_stream/butt/en/dj_form.png" >}}

## Viewing DJ Connection Parameters

After the DJ is created successfully, it will appear in the list of DJs for the radio server. Locate the newly created DJ and click **“Edit”** next to it. This will open the DJ settings page, where you can find connection details for the most commonly used streaming software under the **“Connection parameters”** section.

To connect from BUTT, you will need the following three parameters provided by the **Streming.Center** control panel:

- **Server hostname** — enter the hostname exactly as shown, **without any `http://` or `https://` prefix** (this is important, as adding a protocol is a common mistake).
- **Port** — a numeric value only.
- **Password** — the DJ password you set during DJ creation.

These parameters will be entered directly into the BUTT connection settings to establish the live stream.
{{< lightbox "/images/live_stream/butt/en/dj_edit_mini.png" "/images/live_stream/butt/en/dj_edit.png" >}}