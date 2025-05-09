---
title: "Authentication"
date: 2024-08-23T11:37:26+03:00
weight: 2
seo_title: "API Authentication & Authorization | Streaming.Center API Docs"
description: "Learn how to securely authenticate with the Streaming.Center API using API keys. Step-by-step guide with code examples for implementing secure API authentication."
---

Most API requests are aimed at getting information about the status of the radio, but in some cases there is a need:
- get information that is not public, for example, a list of DJs on the radio with access passwords
- make changes on the radio server, for example, add a new channel, server, create a playlist and so on.

In such cases, the API will require authorization upon request.
Our Internet Radio platform supports a standard authorization mechanism for the API: keys that you can manage in the Settings -> API Keys section of the Internet Radio control panel.

In general, the process looks like this:
- a new API key is created in the "API Keys" section of the broadcaster Web-interface
- this key is specified when making API requests in the HTTP header
- the API checks for the key in the request, checks its correctness and executes the request if the key is valid.


Please note that when working with API keys, it is critically necessary to work over the HTTPS protocol, otherwise API keys may be compromised.

#### API Key usage example code.

In the "Settings" -> "API Keys" section of the Internet Radio Control Panel, a key was created: **g0hsQEz6.JSXQWKby36Y1CefRA4JuUGKEg3ACY9wt**. In your case, you need to go to this section yourself, get your own key and use it, in the article the specified key is used **only for demonstration** and will not work with your API!

To demonstrate, we will create a random playlist with the name "Test Playlist" on the server with ID 1. The request is made by the POST method at **/api/v2/playlists/** URL:

{{< highlight python  >}}

import requests

payload = {
   "name":"Test Playlist",
   "is_random":True,
   "server":1
}

headers = {"SC-API-KEY": "p6HLVit4.trl8xfTaFCGpdv74FO3YHNeUsBSDofDx"}
response = requests.post("https://demoaccount.s02.radio-tochka.com:8080/api/v2/playlists/", headers=headers, json=payload)

{{< / highlight >}}


HTTP header **"SC-API-KEY"** is used to transmit the key, if the key turned out to be incorrect, the server response will contain the HTTP 403 error code and a description of the error in the response.


Any key can be revoked, the system allows you to create any number of keys and for each of them you can specify the expiration date.