---
title: "System requirements"
date: 2024-08-23T11:40:53+03:00
weight: 10
---

The information below will be useful if Streaming.Center Radio Platform is installed on a dedicated or a virtual server. If the radio is hosted on our servers, all system requirements have already been taken into account by us.

### Minimum system requirements
**Works if**: you plan to have 1-5 radios with a small number of streams, without streaming to social networks or using StereoTools audio processor, which consume a lot of CPU resources.
- CPU: 1 core
- RAM: 1Gb
- Disk space: at least 10Gb


### Recommended system requirements
**Works if**: You still have a few stations (up to 10), but you want to work comfortably and connect additional options, have several synchronous broadcast streams, and have plans for the future development of your radio.
- CPU: 2 cores
- RAM: 2Gb
- Disk space: at least 20Gb


### System requirements for radio hostings and large projects
**Works if**: You are a hosting provider with many stations.
- CPU: We recommend a fully dedicated processor rather than a virtual one. The more powerful it is, the more radios you can host on a single server. According to our tests, the Intel Core i7 8700 processor can handle approximately 100 radios on a single server, while the Intel Core i5 13500 processor can handle 200-250 radios on a single server.
- RAM: 16-32Gb
- Disk space: at least 100Gb


### Disk space and disk hardware
The minimum requirement for the Streaming.center Radio Platform is 10 gigabytes of disk space: this is enough for the operating system, log files, and the Radio Platform itself. Next, you should have a rough idea of how much audio content you have that you plan to upload to the server for broadcasting. Please note that if you make backups of the radio on the server, they also take up disk space.

Optimal performance will be achieved by using an SSD/NVMe disk, the use of HDD disks is not recommended, except those cases where disk space is a priority and the number of stations on the server is not large (1-10 radios on the server).

### Supported Operating systems
- Ubuntu Linux 24.04
- Ubuntu Linux 22.04
- Ubuntu Linux 20.04
- Centos Linux 7 (obsolete, not recommended for fresh installations)

### OS Architecture
We support Linux operating system with **x86 64bit** architecture.


### Server network bandwidth
Netwrok bandwidth is the main factor that affects the simultaneous listener limit that you can have on your server. It is not up to RAM or CPU, those factor are insignificant. The following network connections are commonly used:

- **100 mbps**: can host up to ~**700** simultaneous listeners in 128Kbps MP3
- **1 Gbps**: can host up to ~**7.000** simultaneous listeners in 128Kbps MP3