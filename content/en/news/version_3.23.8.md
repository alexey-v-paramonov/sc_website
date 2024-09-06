---
title: "Version 3.23.8: Fixed audio issues when mixing audio"
date: 2024-04-02T13:50:08+03:00
---

Our Internet Radio control panel 3.23.8 has been released: Fixed a scratching that occurred on some files with a sampling rate other than 44100 (improved resampling). Fixed several bugs with FLAC files. When changing the settings for the output of jingles and song orders for an event in the broadcast grid, these changes are loaded automatically and immediately for events that have already begun. The mixing algorithm has been improved, now there will be no clipping when mixing jingles over the air and with a smooth transition between tracks. Fixed memory leaks.
