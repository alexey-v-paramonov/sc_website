---
weight: 20
title: "Uploading Audio Files via FTP Client"
summary: "Learn how to quickly and easily upload MP3, FLAC, AAC, and other audio files to your internet radio server using the FTP client FileZilla."
seo_title: "Upload MP3, FLAC, and AAC to Internet Radio via FTP"
description: "Efficient bulk upload of audio files to your internet radio server using FileZilla. Supports MP3, FLAC, AAC, and more. Step-by-step connection and usage guide."
---

## Uploading Audio Files via FTP Client

Our internet radio control panel allows you to upload audio files (MP3, FLAC, AAC, and others) directly through the web interface in the Media Library section. However, it’s **much more convenient, faster, and reliable** to use a dedicated FTP client - especially when uploading large batches of files or high-quality albums.

### Why Use an FTP Client?

- **Fast bulk uploads**: send hundreds of files at once.
- **Full format support**: MP3, FLAC, AAC: you can upload files with *.mp3, *.flac, *.aac, *.m4a extension.
- **Greater stability**: fewer errors compared to web-based uploads.
- **Full control**: easily manage your folder structure and files: quickly rename and move files and folders.

---

## Download the FTP Client: FileZilla

One of the best free FTP clients is **FileZilla**.  
It is:
- completely free and ad-free,
- fully supports Unicode and special characters in filenames,
- available for Windows, macOS, and Linux,
- equipped with an intuitive interface,
- ideal for managing and updating files on your radio.

👉 **Download FileZilla from the official website**: [https://filezilla-project.org/](https://filezilla-project.org/)

Please install **FileZilla Client** (not Server!). The program is only about 4 - 5 MB in size.

---

## Installation and Launch

FileZilla installation is straightforward and requires no technical expertise.  
Once installed, launch the program via the **“FileZilla Client”** shortcut on your desktop or in the Start menu.

---

## Connecting to Your FTP Server

To connect, you’ll need **three credentials**, which you can find in your control panel:

1. **Host (server address)**  
2. **Username**  
3. **Password**

> 💡 **Where to find your credentials?**  

{{< lightbox "/images/ftp/en/settings.png" "/images/ftp/en/settings.png" >}}

> All FTP login details are available in the **“Settings”** section of your internet radio control panel. You can also **change your password** anytime there.

In FileZilla, enter these three values in the top toolbar and click **“Quickconnect.”**

Upon successful connection, the right panel will display the following server directories:

- `media/` — main folder for music (used by Auto-DJ)
- `jingles/` — jingles and short station IDs
- `intro/` — intro tracks
- `htdocs/` — website files for your radio

---

## How to Upload Audio Files

{{< lightbox "/images/ftp/en/filezilla.png" "/images/ftp/en/filezilla.png" >}}

1. In the right panel, navigate to:  
   **`media/Server_N`**, where **N** is your radio server number (typically `Server_1` for newly created stations).
2. In the left panel, locate the audio files on your computer (MP3, FLAC, AAC, etc.).
3. Drag and drop the files into the right panel **or double-click** a file to start uploading.
4. A progress bar (green) will appear at the bottom, showing upload status.

> ⏱️ **Important!**  
> The server automatically scans folders every few minutes. New tracks usually appear in the **“Media Library”** and **“Playlists”** section of your control panel within **5 minutes** after upload. Once indexed, Auto-DJ can play them and you will be able to add them into your playlists.

---

Using FileZilla gives you a professional, efficient way to manage your station’s music library—quickly, reliably, and without limitations.