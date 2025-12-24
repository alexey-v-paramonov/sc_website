---
weight: 31

title: "Domain/DNS Setup"
summary: "Learn how to connect your domain or subdomain to your radio server using DNS records, wait for DNS propagation, and verify the connection with simple checks."
seo_title: "How to Connect a Domain or Subdomain to Your Radio Server (DNS Guide)"
description: "User-friendly guide explaining how to point a domain or subdomain to a radio server IP using DNS records, how long DNS changes take, and how to verify them."
---

# Connecting a Domain or Subdomain to Your Radio Server

When Streaming.Center panel is installed on a dedicated server with its own IP address, it can technically be accessed directly using that IP address in a browser, for example:  
```
http://123.123.123.123:2345
```

While this works, it is **not recommended**. Accessing the control panel via an IP address is inconvenient and prevents proper use of SSL encryption. Also, if you decide to move to another server in the future, all existing stream links will stop working because the IP address will change.

Using a **domain name or subdomain** (for example `radio.com` or `stream.radio.com`) provides:

- A clean and professional URL wich is easy to remember
- Easier access to the Radio Panel web interface  
- The ability to use HTTPS with a free SSL certificate (Let’s Encrypt)  

This guide explains, in simple terms, how to correctly connect a domain or subdomain to your radio server using DNS.

---

## Domain vs. Subdomain – Which One Should You Use?

### Using the Main Domain
Example: `radio.com`

This means the entire domain will point to the radio server.

This option is **not recommended** if:
- You already have a website on that domain
- Email services are attached to that domain

Changing the main domain IP may break existing services. It is also better to host the main domain not on the radio server, but on a specialized web hosting platform designed for websites, with convenient tools and control panels tailored specifically for site management.

---

### Using a Subdomain (Recommended)
Examples:
- `stream.radio.com`
- `panel.radio.com`
- `cp.radio.com`

This approach allows:
- Your main website to continue working normally
- Only the subdomain to be assigned to the radio server

Most users should choose this option.

---

## What DNS Is (Simple Explanation)

DNS (Domain Name System) connects a domain name to a server IP address.

You can think of DNS as a directory:
- Domain name → server IP address

To connect your domain or subdomain to the radio server, you must **edit DNS records**.

---

## Important: DNS Records Are NOT the Same as Creating a Website

Many hosting panels have buttons like:
- “Create subdomain”
- “Add new website”

These options usually:
- Create folders
- Configure web hosting
- Set up files on that hosting account

This is **not** what is needed.

You do **not** need to create a website or hosting space.

You only need to **edit DNS records** and point them to the server IP address.  
This is a very common source of confusion.

---

## Where to Find Your DNS Editor

If you are not sure where your DNS settings are located, try the following:

### 1. Check Where You Bought the Domain
DNS is usually managed by the domain registrar, such as:
- Namecheap
- GoDaddy
- Cloudflare
- Google Domains
- OVH

Log in and look for “DNS settings”, “DNS management”, or “Name servers”.

---

### 2. Ask Your Hosting or Domain Provider
If you are unsure, contact their support and ask:  
“Where can I edit DNS records for my domain?”

They will tell you exactly where to find the DNS editor.
We cannot provide a universal instruction that fits all hosting providers, because almost every provider has its own interface for managing DNS records. However, the general principle is the same.

---

### 3. Use a WHOIS Lookup
A WHOIS lookup shows which name servers manage your domain. You can use the following service to get the WHOIS information:
``` 
https://who.is/
```

Look for NS (Name Server) records, for example:  
ns1.provider.com  
ns2.provider.com  

This usually tells you which company controls your DNS.

---

## How to Point a Domain to the Radio Server IP

### Main Domain (Example: radio.com)

Edit the existing DNS record:

- Record type: A  
- Name or Host: @  
- Value: your server IP address  

This assigns the entire domain to the radio server.

Be careful: this may disable an existing website or email.

---

### Subdomain (Example: stream.radio.com)

Create a new DNS record:

- Record type: A  
- Name or Host: stream  
- Value: your server IP address  

This safely connects only the subdomain to the radio server and is the recommended setup.

---

## DNS Update Time (Very Important)

DNS changes are **not instant**.

What to expect:
- Usually updates within 15–60 minutes
- In some cases may take up to 24 hours

During this time:
- The domain may work for some users and not for others
- This is normal DNS behavior

Do not reinstall or change settings repeatedly while waiting.

---

## How to Check If the Domain Is Working (Simple Method)

You can verify DNS using the `ping` command. This works on most computers and is easy to use.

### On Windows
1. Press Win + R  
2. Type `cmd` and press Enter  
3. Run:  
   ping stream.radio.com  

### On macOS or Linux
Open Terminal and run:  
ping stream.radio.com  

### What You Should See
The output should show an IP address.  
That IP must match the IP address of your radio server.

If it shows the correct IP, the domain is already working.

If it shows a different IP or does not resolve:
- DNS has not finished updating yet
- Wait and try again later

---

## HTTPS and SSL Certificate

Once the domain or subdomain resolves to the correct IP address:

- Contact our technical support to have a free SSL certificate installed for you, or use the `change_host` and `ssl_enable` utilities as described in [this section](/docs/system/utils/)
- Your panel becomes accessible via HTTPS, for example:  
  https://stream.radio.com  

Benefits:
- Encrypted and secure connection
- Better browser compatibility
- More professional appearance

SSL certificates cannot be reliably used with IP-only access, which is another reason domains are strongly recommended.

---

## Final Notes

To connect your domain or subdomain to your radio server:

1. Choose a subdomain whenever possible  
2. Locate your DNS editor  
3. Create or update an A record pointing to the server IP  
4. Wait for DNS propagation  
5. Verify using ping  
6. Enable HTTPS with SSL  

If you are unsure at any step, your domain or hosting provider can always assist with DNS changes.

Using a proper domain makes your radio control panel easier, safer, and more professional to work with.
