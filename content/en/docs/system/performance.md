---
title: "Testing server performance"
date: 2026-01-30
weight: 12
seo_title: "Server Performance Benchmark Tool for Audio Streaming & Databases | Linux Testing Guide"
summary: "Learn how to benchmark your Linux server for audio streaming and database workloads using an open-source tool that measures CPU, disk I/O, and fsync latency to provide objective performance assessments beyond marketing specs."
description: "Benchmark your Linux server for radio automation and streaming with our open-source tool. Measure real CPU performance, disk I/O, and database fsync latency—not just model names. Get objective verdicts in under 2 minutes."
---

# How to Benchmark Your Server for Audio and Database Workloads
When running a radio automation platform, streaming service, or any real-time audio application, server performance isn't just about specs - it's about real-world behavior. A server with an "Intel Xeon" label might be 10 years old and severely throttled, while a modest modern CPU can outperform it dramatically.

That’s why we built a smart benchmarking script that doesn’t guess based on CPU or disk model names - but measures actual performance through real I/O and CPU stress tests.

In this guide, you’ll learn how to use our open-source tool to objectively evaluate any Linux server for audio processing, database workloads, and real-time reliability.

## 🔍 Why Model Names Lie (and Benchmarks Don’t)
Many cloud providers advertise servers with "Intel Xeon" or "NVMe SSD"—but these labels can be misleading:

Old Xeon CPUs (e.g., E5-2670 from 2012) have weak single-thread performance, hurting real-time audio decoding.
Shared VPS disks may report as "NVMe" but deliver < 200 IOPS (Input/Output Operations Per Second — a measure of how many read/write operations a disk can handle per second) due to oversubscription.
Burstable instances give high peak performance but throttle under sustained load.
Our script bypasses marketing claims and tests what actually matters:

- CPU single-thread speed (critical for MP3 decoding, cue point handling)
- 4K random IOPS (affects logging, metadata writes, database indexes)
- fsync() latency (determines database transaction throughput)
- Available RAM (impacts caching and buffer pools)

All results are measured, not assumed.

## 🚀 How the Script Works
The benchmark `/opt/bin/sc_speedtest.py` runs three core tests:

1. CPU Performance Test

   - Uses sysbench to calculate prime numbers for 10 seconds
   - Measures events per second (higher = better)
   - Reflects real-world single-thread performance used in audio decoding

2. Disk I/O Test

   - Uses fio to perform 4K random read/write operations (simulating database and logging workloads)
   - Tests with direct I/O (O_DIRECT) to bypass OS cache and measure real disk speed
   - Adapts file size and I/O depth based on whether your system uses RAID or is a small VPS

3. fsync Latency Test

   - Measures how long it takes to safely commit data to disk
   - Critical for MySQL/PostgreSQL transaction performance
   - High latency (>10 ms) indicates shared or slow storage

### The script also checks:

- Total RAM and swap usage
- CPU model and estimated age (for context, not verdict)
- Free disk space

Then it compares results against audio + database optimized thresholds and gives a clear verdict: Fast, Moderate, or Slow.

## ▶️ How to Run the Benchmark
The script is pre-installed at `/opt/bin/sc_speedtest.py` and is executable.

### Step 1: Run the benchmark

```
/opt/bin/sc_speedtest.py
```
The script needs root privileges to:

- Use direct I/O (--direct=1)
- Write test files to /var/tmp
- Accurately measure fsync latency

### Step 2: Review the output
You’ll see a detailed report like this:

{{< highlight bash  >}}
🚀 Server Performance Benchmark (Audio + Database Optimized)
==============================================================
💻 CPU Model: 13th Gen Intel(R) Core(TM) i5-13500
📅 Estimated Release: ~2022 (4 years ago)

🧠 RAM: 64115 MB, Swap: 32734 MB

💾 Disk: Free space = 111 GB, RAID = Yes
⏳ Running adaptive disk benchmark...
📊 Disk IOPS (R/W): 100000 / 100000
🔍 Disk Verdict: Fast

⏳ Testing fsync latency (critical for databases)...
⏱️  fsync latency: 7.61 ms

⏳ Running CPU benchmark...
⚡ CPU Events/sec: 1489.05
🔍 CPU Verdict: Fast

==============================================================
📊 FINAL VERDICT (Audio + Database Workloads)
   Disk: Fast
   CPU:  Fast
   fsync: Good (7.61 ms)

✅ System is well-suited for audio and database workloads.

{{< / highlight >}}


### Step 3: Interpret the verdict
- ✅ "Fast" → Excellent for production audio + database
- ⚠️ "Moderate" → Still Suitable for average load
- ❌ "Slow" → Risk of glitches, missed cues, or slow operations

📊 What the Results Mean for Your Workload
| Metric | Good for Audio? | Good for Database? |
|-------|------------------|---------------------|
| **CPU ≥ 1800 events/sec** | ✅ Handles many streams | ✅ Fast query execution |
| **CPU 1000–2500** | ✅ Handles less streams | ⚠️ Moderate query execution |
| **CPU < 1000** | ❌ Risk of dropouts | ❌ Avoid |
| **Disk IOPS ≥ 5000** | ✅ Smooth buffering | ✅ Good for indexes |
| **Disk IOPS 500–5000** | ✅ OK for audio | ⚠️ Small DB only |
| **Disk IOPS < 500** | ❌ Unreliable | ❌ Avoid |
| **fsync < 2 ms** | — | ✅ Excellent for transactions |
| **fsync 2–10 ms** | — | ⚠️ Acceptable for a small number of DBs |
| **fsync > 10 ms** | — | ❌ Transaction bottleneck |


💡 IOPS (Input/Output Operations Per Second) measures how many read or write operations a storage device can complete in one second. For databases and real-time logging, 4K random IOPS is the most relevant metric—since most database operations involve small, random reads and writes.

## 🛠️ Requirements
The script automatically installs dependencies if missing:

- Ubuntu/Debian: fio, sysbench
- CentOS 7: fio, sysbench (via EPEL)

### It works on:

- Dedicated servers (Hetzner, OVH, etc.)
- Cloud VMs (AWS, GCP, DigitalOcean)
- Small VPS (adapts test size to avoid filling disk)

### 💡 Pro Tips

- Run during low-traffic periods for consistent results
- Compare multiple servers before migrating your platform
- Re-run after upgrades (e.g., new disk, more RAM) to validate improvements

### 🔚 Final Thoughts
Don’t trust labels—trust benchmarks.
With `/opt/bin/sc_speedtest.py`, you get an objective, workload-aware assessment of any server in under 2 minutes.

Whether you’re evaluating a new VPS, troubleshooting playback glitches, or scaling your radio automation platform, this tool gives you the data you need to make confident decisions.

🎧 Your listeners deserve reliable audio. Your database deserves fast storage. Now you can verify both.