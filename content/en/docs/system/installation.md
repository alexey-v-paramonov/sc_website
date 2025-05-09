---
title: "Installation"
date: 2024-08-23T11:40:53+03:00
weight: 30
seo_title: "How to Install the Streaming.Center Internet Radio Platform on a Dedicated Server (Step-by-Step Guide)"
summary: "You can install the Streaming.Center Platform on a clean Linux server with SSH access by following step-by-step instructions or letting the support team handle it for free, after which you'll configure the domain, SSL, and admin settings to access the control panel and start broadcasting."
description: "Learn how to install the Streaming.Center Internet radio platform on a clean Linux server via SSH. Step-by-step guide with video, screenshots, and free installation support included."
---

You can install our Streaming Platform on a virtual or any type of dedicated server that meets the [mininum requirements](/docs/system/system_requirements). Installation is only possible on a clean server, you must have SSH access to the server.

**Important**: if the procedure described below causes difficulties for you, you are afraid of breaking something or you do not have experience - no problem, just provide our specialists with access to the server during installation (you can change your passwords later) and we will perform the installation **free of charge**.

### Connecting to the server:
To perform the installation, you will need:
- server IP address
- root user password (SSH key will also work)
- Terminal program. MacOS and Linux have native built-in terminals, on Windows you can use [Putty](https://www.putty.org/)

### Installation:
In this example article we will install the software on a server with the following parameters:
- IP address: 109.172.7.21
- Domain name: demo.streaming.center
- SSH Username: root
- SSH Password: XqWgxD901jP0
- Operating system: Ubuntu Linux 24.04

Your IP address and the password of the root user will differ from those that we have here.

#### Linux/MacOS: 
To connect to the server, run ssh in the terminal 
Run this command in your terminal to connect to the server: `ssh root@109.172.7.21` and provide `XqWgxD901jP0` password when asked:

{{< lightbox "/images/installation/ru/ssh_01.png" "/images/installation/ru/ssh_01.png" >}}

#### Windows and Putty: 

After installing Putty, you must enter the server's IP address on the home screen:

{{< lightbox "/images/installation/putty.png" "/images/installation/putty.png" >}}

When you click the Open button, you will be prompted for the username: enter `root` and password - `XqWgxD901jP0`:

{{< lightbox "/images/installation/putty2.png" "/images/installation/putty2.png" >}}

Further commands in the terminal are the same and do not depend on your operating system.

### Full video of the installation process

<iframe width="560" height="315" src="https://www.youtube.com/embed/E6Q3_xGWCQI?si=0zJs6iRI91XD8Rz1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### Starting the installation script
Copy and run this command in your terminal: `bash <(wget -qO- https://streaming.center/dist/install.sh)`

### Choosing disk drive partition
At the first step, the system will display the following message, which requires confirmation from your side:

{{< highlight bash  >}}

The software default installation path is /var/users. Make sure you have enough space on that partition. 
If not - you can create a symbolic link from /var/users to any other partition that has enough disk space. 
Press [y] to continue or any other key to quit.

{{< / highlight >}}


At this step, the system informs you that the `/var/users/` partition will be used to store radio files (including audio files that take the most disk space).

If your disk is not partitioned, just accept this question by default, but if your disk has the partition with the largest number of megabytes, for example, in the `/home` partition, then you can, for example, make a symbolic link from `/var/users` to `/home/users` in advance, before continuing the installation, so that there is enough space for user data and files.

To confirm, press "y" or abort the installation, prepare the disk partitions and start again.


### Setting the domain name
Having a domain name for the radio is very important, as listening link URLs will use it, a URL for logging into the Radio Control Panel itself will also be using the domain name, for example using `stream.radio.com` it is much more convenient than a digital IP address.

Moreover, if in the future you want to move to a server with a different IP address, then the links to the streams and the control panel will not change, since the domain can simply be reconfigured to a new IP by configuring DNS and nothing will change at all for your listeners.

Additionally, if you have a domain name for the radio, you can easily set up a free SSL certificate.

The installation script at this stage outputs the following:

{{< highlight bash  >}}
Please enter your domain name or leave blank to run the software on IP address [109.172.7.21]:
NOTE: SSL encryption is available for valid domains only and not available for IP address
{{< / highlight >}}

(the address 109.172.7.21 in your case will be different - this is the IP address of *your* server.)
We will be using **demo.streaming.center** domain in our example and this domain is already configured to resolve to **109.172.7.21** IP address by creating an `А` record type with `demo` nama and `109.172.7.21` as a value in the DNS settings of the root `streaming.center` domain, so we provide it to the installation script:

{{< highlight bash  >}}
demo.streaming.center
{{< / highlight >}}

Press Enter to continue.
The domain name must be configured and linked to the server's IP address (109.172.7.21 in our case) via DNS before installation begins. If you install the panel on a domain that is linked to another IP address, the control panel will not work properly.

### Admin Email address
System reports, passwords, and other official information will be sent to this email. Using this email, you can later restore the administrator password.

{{< highlight bash  >}}
Please enter your admin account email:
{{< / highlight >}}

We enter our email address:
{{< highlight bash  >}}
info@streaming.center
{{< / highlight >}}

### SSL certificate
In the next step, the installation script will request the installation of an SSL certificate:

{{< highlight bash  >}}
Do you want to create Let's Encrypt SSL certificate for your domain? [y/N] 
{{< / highlight >}}

The SSL certificate is configured via Letsencrypt.org service and it is free. It is updated every 90 days automatically and immediately connects to both the Radio Control Panel and radio streams. We recommend that you agree and continue the installation by pressing "y", but if for some reason the certificate is not necessary, or you want to configure it later, press "N".
If you did not specify a domain name earlier when installing the panel and set the panel to an IP address, this question will not appear.
If you agree to install the certificate, the script will request a service email address to which notifications about the operation of the certificate and its update will be sent:

{{< highlight bash  >}}
Enter your email address (required by Let's Encrypt SSL cenrtificate): 
{{< / highlight >}}

Usually you can just use the same admin email that you used before:
{{< highlight bash  >}}
info@streaming.center
{{< / highlight >}}


### Finishing the installation, getting your credentials
So, if everything went well, at the last step, the installation script will give you the URL, username, and password to log in to the admin interface:
{{< highlight bash  >}}
Installation is complete, you can now sign in to the control panel:
URL: https://demo.streaming.center:2345

Username: admin
Password: Njc3OGNjOT
{{< / highlight >}}

### Admin Interface
After logging in, you should see the admin control panel:

{{< lightbox "/images/installation/en/installed.png" "/images/installation/en/installed.png">}}


To create a radio, go to the "Broadcasters" section of the admin panel and create a radio station there, after which you can log in either using your created username and password, or by clicking on the blue icon of the entrance to the admin panel and set up broadcasting. Immediately after installation, you will have 2 days of free operation of the radio control panel, after which, in order for the radio to continue working, you must top up your balance in [your account](https://app.streaming.center).

### Post-install quickstart: creating a radio

<iframe width="560" height="315" src="https://www.youtube.com/embed/NNOm9wGtNd8?si=_cvQz7SfeJN0N-lq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br />
<br />
<br />