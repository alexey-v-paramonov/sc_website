---
title: "Technical details"
date: 2024-08-23T11:40:53+03:00
draft: true
---

Our streaming platform consists of several components:
- Admin interface, where you create radio accounts on your server
- Broadcaster interface, where radio owner manages his stations
- Streaming core application which does the audio porcessing, scheduling, encoding and the actual streming

It also depends on some system-wide services like Nginx, Apache, MySQL, Cron, Supervisord, ProFTPd, Python and system libraries, etc.

### Debugging general rules:

In case if some component of the system is not functional, you can:
- check the general health of the system: CPU load, amount of free RAM, whether the disk is completely full
- check the corresponding files are present on the filesystem
- check if component is running
- in case if it does not - enable logging and see what went wrong


### Admin application
This is a Django/Python/Javascript application located in `/opt/sc_radio`. The application is running in a Python uWSGI container, configuration files are available in:
- <b>Supervisord</b>: `/etc/supervisor/conf.d/sc_radio.conf`
- <b>Nginx</b>: `/etc/nginx/conf.d/sc_radio.conf`

*Debugging:*
1. See if uWSGI process is running with `ps -Af | grep uwsgi | grep sc_radio`
2. Check system-wide Supervisord logs in `/var/log/supervisor/supervisord.log`
3. Check system-wide Nginx logs in `/var/log/nginx/error.log`
4. If Supervisord service is running fine and no isses in the main log try to enable logging in `/etc/supervisor/conf.d/sc_radio.conf` by chaning `stdout_logfile=/dev/null` to a log file, for example `stdout_logfile=/tmp/sc_uwsgi.log` then restart Supervisor service with `service supervisor restart` and check Admin application log in `/tmp/sc_uwsgi.log`
5. Check if Admin application compiles and starts with no isses by chaging to `/opt/sc_radio` directory and running `./manage.py shell` if this command does not crash and ends up showing the console - application is fine, otherwise a traceback with an error description is displayed.
Common issues are related to broken Python dependencies or broken packages or database connection issues.


### Broadcaster applications
This is a Django/Python/Javascript application located in `/var/users/<USERNAME>/app`. The application is running in a Python uWSGI container, configuration files are available in:
- <b>Supervisord</b>: `/etc/supervisor/conf.d/<USERNAME>.conf`
- <b>Nginx</b>: `/etc/nginx/conf.d/<USERNAME>.conf`

*Debugging:*
1. See if uWSGI process is running with `ps -Af | grep uwsgi | grep <USERNAME>`
2. Check system-wide Supervisord logs in `/var/log/supervisor/supervisord.log`
3. Check system-wide Nginx logs in `/var/log/nginx/error.log`
4. If Supervisord service is running fine and no isses in the main log try to enable logging in `/etc/supervisor/conf.d/<USERNAME>.conf` by chaning `stdout_logfile=/dev/null` to a log file, for example `stdout_logfile=/tmp/sc_uwsgi.log` then restart Supervisor service with `service supervisor restart` and check Broadcaster application log in `/tmp/sc_uwsgi.log`
5. Check if Admin application compiles and starts with no isses by chaging to `/var/users/<USERNAME>/app` directory and running `./manage.py shell` if this command does not crash and ends up showing the console - application is fine, otherwise a traceback with an error description is displayed.
Common issues are related to broken Python dependencies or broken packages or database connection issues.


### Streaming core 
It has 2 binaries:
- content_indexer - utility to process audio files for streaming by Auto-DJ
- radiopoint - the main process, which manages the Djs, Channels, audio encoding, processing and streaming.

These are high performance C++ applications located in **/usr/local/bin** directory.


### Music processing service
Used to look for MP3/FLAC files that users upload via the WEB interface or FTP. It syncronizes files on the file system with the database information, calculates file length, extracts images and so on.
It is using an extenral program: [loudgain](https://github.com/Moonbase59/loudgain) to calculate volume levels in the media files.

This service is running every 5 minutes according to this CRON rule:
`*/5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null`

this line is configured in `/etc/crontab`.

*Debugging:*

A log of this service for every user is located in 

`/var/users/<USERNAME>/log/indexer.log`

Also it is possible to save STDERR/STDOUT of this process by changing CRON rule from 

`*/5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null`

to

`*/5 * * * * root /usr/local/bin/content_indexer 1>>/path/to/output.log 2>>/path/to/error.log`

You can also just run `content_indexer` from the server console to see the output, if there is a database connection problem or any other issues - most likely you will see an error message in your console.

Indexing service is using a configuration file `/opt/bin/indexer.cfg` and it is using MySQL root password to operate, so if MySQL root password changes - it should be changed in this config file as well.


### Streaming core
Normally if user account is not suspended and running fine - a running "radiopoint" process shuld be present in the system for that user.
You can check that by running `ps -Af | grep radiopoint | grep <USERNAME>"`, one user may have several "radiopoint" processes running at the same, one per each radio station in his account.


*Debugging:*
Configuration file is avaialbe at: `/var/users/<USERNAME>/conf/radiopoint_<SERVER_ID>.conf`

You can change
`LOG=0` to `LOG=3` in config file, so the log file from `LOGPATH` setting will have a detailed report how radio station is operating (radio station restart is required).
Process can be started from the broadcaster web interface, or killed using SSH using standard kill command.
It also gets restarted automatically by utilities and scripts if the process is not running.

It is also possible to enable the logs without restarting the station by sending a `SIGUSR2` signal to "radiopoint" process. You can get the process ID by running `ps -Af | grep radiopoint | grep <USERNAME>"` and then run `kill -SIGUSR2 <PID>` and it will enable logging. Sending the same signal one more time will disable the logs.



**Utilities**

Additional system utilities are run y CRON, configuration from `/etc/crontab` usually looks like this:

```
1. */5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null
2. */1 * * * * root python3 /opt/bin/sc_stats 1>/dev/null 2>/dev/null
3. */15 * * * * root python3 /opt/bin/sc_backup 1>/dev/null 2>/dev/null
4. */1  * * * * root python3 /opt/bin/sc_accounts 1>/dev/null 2>/dev/null
5. 0    * * * * root python3 /opt/bin/awstats 1>/dev/null 2>/dev/null
6. 30 2 * * 1 root /usr/bin/letsencrypt renew
```

- (1) - music indexing service
- (2) - utility that goes through every broadcaster account and collects Shoutcast/Icecast listener statistics.
- (3) - Backup script userd to create or restore broadcaster accounts backups.
- (4) - used to create or delete broadcaster accounts 
- (5) - AWSTATS module that generates advances listener reports based on Icecast/Shoutcast access log files.
- (6) - Optional, in case SSL certificate is configured.

*Debugging:*

1. Change 1>/dev/null 2>/dev/null to real stdout/stderr log files to see what utils are doing and for possible issues.
2. Try to run utility by hand via console, for example `python3 /opt/bin/sc_accounts` to see the output for potential issues.


Our streaming platform also depends on the following system-level services, so make sure all of them are running.

**Supervisord**
- command to restart the service: `service supervisor restart`
- system-wide log file: `/var/log/supervisor/supervisord.log`



**Nginx**

Nginx is used to server Django applications for broadcaster and admin interfaces.
Configuration files are located in 
`/etc/nginx/conf.d/<USERNAME>.conf` - for broadcaster app
`/etc/nginx/conf.d/sc_radio.conf` - for admin app
*Debugging:*

By default all Nginx logs are disabled to save the disk space. Enable it by changing
```
access_log  /dev/null;
error_log   /dev/null;
```
to
```
access_log  /path/to/access.log;
error_log   /path/to/error.log;
```
In the user config file to see each user account Nginx log individually, but in most cases it is enough to check the main Nginx log file in `/var/log/nginx/error.log`

- Command to restart the service: `service nginx restart`


**MySQL**

MySQL is used to store all the data for broadcaster/admin accounts. Default system-level configuration is uses with default settings.
When MySQL root password changes it should be also updated in:

`/opt/bin/indexer.cfg`

`/opt/bin/utils.ini` under "[MySQL]" section.

*Debugging:*

Most common problem with MySQL is a crash or unable to start, see system logs in `/var/log/mysql` for details.
Depending on what MySQL version (MariaDB or original MySQL) is installed use corresponding command to restart it:

`service mysql restart`

or

`service mariadb restart`

**ProFTP**

This is a default FTP server running on port 21. It has a default configuration with MySQL extension enabled for broadcaster accounts.
Configuration is located in `/etc/proftpd.conf` for CentoS and `/etc/proftpd/` for Ubuntu Linux.

- command to restart the service: `service proftpd restart`
- system-wide log file: `/var/log/proftpd/proftpd.log`
