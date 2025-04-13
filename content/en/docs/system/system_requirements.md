---
title: "System requirements"
date: 2024-08-23T11:40:53+03:00
weight: 10
summary: "To ensure stable and efficient operation of the Streaming.Center Radio Platform, users must choose appropriate server resources and reliable hosting providers based on their project size, with considerations for CPU, RAM, storage type, bandwidth, and hardware quality."
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


### Important Notice About Unreliable Hosting Providers and Potential Issues

Over the years of working with various hosting providers, we have gained extensive experience in dealing with different services. Based on this experience, we strongly recommend that our clients carefully evaluate the quality of the hosting they choose in advance.

**Key Issues You May Encounter:**

#### 1. Weak Hardware Sold as a Powerful Server
Some providers may offer servers with seemingly high specifications, but in reality, they use outdated components. For example, you may be sold a server advertised as having a quad-core processor, but in fact, it could be a 15-year-old model. Such a processor would barely be sufficient for running our internet radio platform, and if high computational power is required (e.g., for **StereoTools**), the CPU may become overloaded and fail to handle the workload.

#### 2. Bandwidth Limitations
Shared hosting services often suffer from artificially reduced network bandwidth. For instance, a provider may promise a 100 Mbps connection but actually allocate only 20 Mbps. This can lead to instability in streaming and data transfer issues.

#### 3. Slow and Outdated Storage
Using old **HDDs** instead of modern **SSDs** or **NVMe** drives can significantly slow down server performance, especially when performing resource-intensive tasks such as data backups. We strongly recommend choosing servers equipped with SSDs or NVMe drives for stable and fast operation.

#### 4. Cooling System Failures
There have been cases where server cooling systems failed, causing processors to overheat and **throttle** (reduce their clock speed). This results in a severe drop in performance, making it impossible for our platform to function properly.

**Conclusion**

All of these factors directly impact the stability and performance of our software. To avoid frequent support requests due to system instability, make sure to choose a **reliable hosting provider and a high-quality server** in advance. Doing so will save you time, effort, and ensure the smooth operation of your internet radio platform.