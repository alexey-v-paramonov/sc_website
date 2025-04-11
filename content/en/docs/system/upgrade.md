---
title: "Installing updates"
date: 2024-08-23T11:40:53+03:00
weight: 30
---

If you already have our Internet Radio Platform [installed](/docs/system/installation) and you want to update it to the latest version, just run the update command in the server terminal by connecting via SSH:

#### Linux/MacOS: 
To connect to the server, run ssh in the terminal 
Run this command in your terminal to connect to the server: `ssh root@your-server-ip` and provide your password when asked:

{{< lightbox "/images/installation/ru/ssh_01.png" "/images/installation/ru/ssh_01.png" >}}

#### Windows and Putty: 

After installing Putty, you must enter the server's IP address on the home screen:

{{< lightbox "/images/installation/putty.png" "/images/installation/putty.png" >}}

When you click the Open button, you will be prompted for the username: enter `root` and your password :

{{< lightbox "/images/installation/putty2.png" "/images/installation/putty2.png" >}}

Further commands in the terminal are the same and do not depend on your operating system.


### The update script:

Run the following command in your terminal:

{{< highlight bash  >}}
bash <(curl -s https://streaming.center/dist/update.sh)
{{< / highlight >}}

The update is fully automatic, the script does not ask any additional questions, if an error occurs during the update, the script will report it.
The update script also re-generates configuration files and performs other technical checks on the server, so if for any reason you have problems with our Platform, the update script can try to fix them.

### Post-update script (optional):
In some cases, you may need to run additional custom commands after the update script has finished. To do this, you can create a script at `/opt/bin/sc_post_update_hook`. If this script exists, the installer will automatically execute it immediately after the update completes.

The script can be written in BASH or any other language, as long as it is marked as executable.