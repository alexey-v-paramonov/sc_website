---
title: "Streaming Radio to Social Networks"
date: 2026-06-01
weight: 22
summary: ""
seo_title: ""
description: ""
---

# How to Stream Internet Radio to YouTube, Facebook, Telegram and Other Platforms

Our Internet radio platform can automatically relay your station's broadcast to social networks and video platforms, including:

- [YouTube](#setting-up-radio-streaming-on-youtube)
- Facebook
- Telegram

This article focuses specifically on social network integration for radio stations that have already been created and are running on our platform.

**Important:** You can stream audio or video to social networks without our platform, for example, by using OBS Studio. However, this option is not covered in this article. Here, we will show you how to connect an existing Internet radio station running on the Radio-Tochka.com platform to social networks.

Once everything is set up, listeners will be able to connect to your station just like any regular video stream: they can listen to music, chat on the social network, and open the stream on a phone, computer, browser, or Smart TV. YouTube, RuTube, and other platforms are available on almost any device.

During the stream, your station's logo or a video loop can be displayed instead of regular video. You can upload a short video clip that will automatically repeat throughout the broadcast.

Please note that, due to the technical limitations of this integration, listeners who connect through social networks will not be included in the listening statistics on our platform. As a result, they will not appear in your station's audience charts and reports.

## Setting Up Radio Streaming on YouTube

1. Create or prepare a YouTube account.

    You probably already have a YouTube account. However, for an Internet radio station, it is better to create a separate account or channel and name it after your station.
    This will make it easier for listeners to find your station and give the stream a more professional appearance.

2. Get the stream URL and stream key.

    Sign in to YouTube with the account you will use to stream your radio station.

    Then open the live streaming dashboard:

    https://www.youtube.com/live_dashboard

    Copy the following two values from the live streaming dashboard:

    - Server URL
    - Stream key

    {{< lightbox "/images/social/en/yt1_mini.png" "/images/social/en/yt1.png" >}}

    For example, in our case:

    - **Key:** `kmq2-ghku-2hys-7ag0-9z7f`
    - **Stream URL:** `rtmp://a.rtmp.youtube.com/live2`

    You will need these details to connect your radio station to YouTube.

    If you have never started a live stream from this account before, YouTube may ask you to enable live streaming first. Activation usually takes some time, so it is best to do this in advance.

3. Connect your radio stream to YouTube.

    Open your Internet radio control panel. On the main page, where your broadcast channels are listed, select the channel you want to use.

    A single radio station can have multiple channels, for example:

    - 320 kbps MP3
    - 64 kbps MP3

    {{< lightbox "/images/social/en/channels.png" "/images/social/en/channels.png" >}}

    Only one channel can be connected to YouTube. We recommend selecting the highest-quality channel. In the example above, that is the 320 kbps MP3 channel.

    The audio quality of your YouTube stream will match the quality of the selected channel.

4. Enter the YouTube settings in the control panel.

    Click **Edit** for the selected channel.

    In the settings window, open the YouTube section and fill in the required fields:

    - stream URL;
    - stream key;
    - a logo image or video clip to use as the stream visual.

    The uploaded logo or video clip will be displayed in the YouTube stream instead of regular video.

    Once all fields have been filled in correctly, you can enable streaming. Select the checkbox that enables the stream, then save the settings.

    To stop streaming to YouTube, clear this checkbox and save the settings again.

    The result should look similar to this:

    {{< lightbox "/images/social/en/channel_edit_mini.png" "/images/social/en/channel_edit.png" >}}

    An image should appear in the YouTube live streaming dashboard, and the stream status should change to **LIVE**:

    {{< lightbox "/images/social/en/yt2.png" "/images/social/en/yt2.png" >}}

    Congratulations! Your radio station is now streaming on **YouTube**.

    Please note that when you stream audio to YouTube, the service automatically checks the content for copyright violations and may block the stream.
