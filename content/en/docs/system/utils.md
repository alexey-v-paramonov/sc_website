---
title: "Utilities"
date: 2024-08-23T11:40:53+03:00
weight: 50
summary: You can manage your installed Streaming.Center platform via SSH by using built-in server utilities to change admin, radio, and FTP passwords, update the domain name, and configure an SSL certificate.
seo_title: "Utilities for Internet Radio Control Panel | Streaming.Center"
description: "Discover essential utilities for managing and configuring your Internet radio control panel, including tools for SSL, domain, and server maintenance."
---

The main utilities that you can use on a server which already has our Streaming Platform [installed](/docs/system/installation) are described below. Normally you run these utilities by connecting to the server terminal via SSH.


### Changing the administrator password:
If you forgot the password to log in to the admin interface, which was issued by the installation script, or there is no way to restore it via the Web interface, you can do this from the server console.

{{< highlight bash  >}}
cd /opt/sc_radio
./manage.py change_admin_password
New 'admin' user password:  Pup3C9ObEY
{{< / highlight >}}
A new random administrator password is generated and set, and the password itself is displayed in the console.

### Changing the hostname:
This utility allows you to change the domain name on which the Control Panel is installed. For example, at the time of configuration, you did not have a domain yet and it was configured and linked to the server via DNS later, or there is a need to change the domain name of the panel, say from `stream.radio.com` to `air.radio.com`, then **change_host** utility can do this for you:

{{< highlight bash  >}}
cd /opt/bin
./change_host
{{< / highlight >}}

When started, the utility outputs the current domain name or IP address and requests a new domain/IP. After changing the domain, it is recommended to run the system update script:
```bash <(curl -s https://streaming.center/dist/update.sh)```

### Сonfiguring an SSL certificate:

{{< highlight bash  >}}
cd /opt/bin
./ssl_enable
{{< / highlight >}}

A free certificate from Letsencrypt is installed, which is updated automatically every 90 days. After changing the domain, it is recommended to run the system update script.:

```bash <(curl -s https://streaming.center/dist/update.sh)```

### Changing passwords for all radio accounts:
{{< highlight bash  >}}
cd /opt/bin
./change_account_passwords
{{< / highlight >}}
This command is useful if, for example, the server has been hacked and it is urgently necessary to change all passwords for logging into the Broadcaster Panel of all radio stations on the server.

### Changing passwords of all FTP accounts:
{{< highlight bash  >}}
cd /opt/bin
./change_ftp_passwords
{{< / highlight >}}

This command is useful if, for example, the server has been hacked and it is urgently necessary to change all passwords for uploading files via FTP for all users on the server.