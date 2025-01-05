---
title: "Installing updates"
date: 2024-08-23T11:40:53+03:00
weight: 30
---

If you already have our Internet Radio Platform [installed](/docs/system/installation) and you want to update it to the latest version, just run the update command in the server terminal by connecting via SSH:

### The update script:

{{< highlight bash  >}}
bash <(curl -s https://streaming.center/dist/update.sh)
{{< / highlight >}}

The update is fully automatic, the script does not ask any additional questions, if an error occurs during the update, the script will report it.
The update script also re-generates configuration files and performs other technical checks on the server, so if for any reason you have problems with our Platform, the update script can try to fix them.