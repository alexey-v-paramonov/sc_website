---
title: "Техническое описание"
date: 2024-08-23T11:40:53+03:00
draft: true
---

Наша Платформа Интернет-радио состоит из нескольких основных компонентов:
- Интерфейс администратора, где администратор может создавать новые радио аккаунты на сервере.
- Интерфейс радио-вещателя, где владелец станции управляет эфиром станции.
- Вещательное "ядро", которое осуществляет обработку звука, планирование эфира и формирует стрим радио.

Она так же зависит от системных сервисов операционной системы Linux, таких так:  Nginx, Apache, MySQL, Cron, Supervisord, ProFTPd, FFMPEG, Python и различные системные библиотеки.

### Основные правила отладки:

В случае, если какой-либо компонент перестал функционировать, Вы можете:
- проверить, что файлы этого компонента находятся на сервере и не повреждены
- проверить, что сервис запущен и работает
- если нет - подключить логи и проверить по сообщениям в лог-файлах что именно пошло не так


### Интерфейс администратора
Является Django/Python/Javascript приложением, находящемся в папке `/opt/sc_radio` сервера. Приложение работает под управлением Python контейнера uWSGI, файлы конфигурации сервисов доступны в:
- <b>Supervisord</b>: `/etc/supervisor/conf.d/sc_radio.conf`
- <b>Nginx</b>: `/etc/nginx/conf.d/sc_radio.conf`

*Отладка:*
1. Проверьте запущен ли uWSGI процесс командой `ps -Af | grep uwsgi | grep sc_radio`
2. Проверьте системные логи Supervisord в `/var/log/supervisor/supervisord.log`
3. Проверьте системные логи Nginx в `/var/log/nginx/error.log`
4. Если сервис Supervisord запущен и работает и при этом нет ошибок в системном логе, попробуйте включить логи идивидуально в `/etc/supervisor/conf.d/sc_radio.conf` заменив `stdout_logfile=/dev/null` на путь к лог-файлу, например `stdout_logfile=/tmp/sc_uwsgi.log`, перезапустите Supervisor сервис командой `service supervisor restart` и проверьте логи админки в файле `/tmp/sc_uwsgi.log`
5. Проверьте запускается ли административный интерфейс с консоли сервера, перейдя в директорию `/opt/sc_radio` и выполнив команду в терминале `./manage.py shell`. Если команда успешно выполняется (не показывает ошибок, например, соединения с БД) и показывает консоль - приложение в порядке, в противном случае она выведет подробную информацию о возможной ошибке или сбое. Наиболее типичными ошибками являются ошибки с зависимостями в пакетах Python и невозможносью подключиться к Базе Данных.

### Интерфейс радио-вещателя
Django/Python/Javascript приложение, находится в папке `/var/users/<USERNAME>/app`. Приложение работает под управлением Python контейнера uWSGI, файлы конфигурации сервисов доступны в:
- <b>Supervisord</b>: `/etc/supervisor/conf.d/<USERNAME>.conf`
- <b>Nginx</b>: `/etc/nginx/conf.d/<USERNAME>.conf`

*Отладка:*
1. Проверьте запущен ли uWSGI процесс командой `ps -Af | grep uwsgi | grep <USERNAME>`
2. Проверьте системные логи Supervisord в `/var/log/supervisor/supervisord.log`
3. Проверьте системные логи Nginx в `/var/log/nginx/error.log`
4. Если сервис Supervisord запущен и работает и при этом нет ошибок в системном логе, попробуйте включить логи идивидуально в `/etc/supervisor/conf.d/<USERNAME>.conf` заменив `stdout_logfile=/dev/null` на путь к лог-файлу, например `stdout_logfile=/tmp/sc_uwsgi.log`, перезапустите Supervisor сервис командой `service supervisor restart` и проверьте логи панели управления в файле `/tmp/sc_uwsgi.log`
5. Проверьте запускается ли административный интерфейс с консоли сервера, перейдя в директорию `/var/users/<USERNAME>/app` и выполнив команду в терминале `./manage.py shell`. Если команда успешно выполняется (не показывает ошибок, например, соединения с БД) и показывает консоль - приложение в порядке, в противном случае она выведет подробную информацию о возможной ошибке или сбое. Наиболее типичными ошибками являются ошибки с зависимостями в пакетах Python и невозможносью подключиться к Базе Данных.


### Вещательное ядро
Состоит из двух бинарных файлов:
- content_indexer - утилита, которая обрабатывает закачанную на сервер для вещания через Авто-диджей музыку. Она вытаскивает обложки из треков (или ищет их на музыкальных сервисах), расчитывает уроверь громкости в файлах, обрабатывает ID тэги.
- radiopoint - главный процесс, который непосредственно создает поток на радио, управляет эфиром диджеев, кодирует аудио и управляет каналами вещания.

Эти программы сильно оптимизированы на быстродействие и написаны на языке C++. Находятся они в папке **/usr/local/bin** сервера.


### Сервис обработки музыки
Используется для обработки MP3/FLAC файлов, закачиваемых пользователями через WEB-интерфейс панели управления вещателя или через FTP. Этот сервис синхронизирует файлы на диске с музыкальной библиотекой радио, расчитывает длительность воспроизведения, уровень звука, подгружает обложки треков.
Сервис использует сторонную программу: [loudgain](https://github.com/Moonbase59/loudgain) для расчёта уровня громкости в файлах.

Этот сервис запускается вещательным ядром, если оно обнаруживает новые файлы на диске и дополнительно каждые 5 минут через CRON правило:
`*/5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null`

это правило прописано в `/etc/crontab`.

*Отладка:*

Лог этого сервиса находится индивидуально в папке каждого радио аккаунта в

`/var/users/<USERNAME>/log/indexer.log`

Плюс к этому, можно перенаправить потоки STDERR/STDOUT этого сервиса, если в CRON правиле

`*/5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null`

поменять команду на

`*/5 * * * * root /usr/local/bin/content_indexer 1>>/path/to/output.log 2>>/path/to/error.log`

Либо можно просто запустить `content_indexer` в консоли сервера и посмотреть вывод команды. Если есть проблема с подключением к БД или другие проблемы - Вы сможете это увидеть в консоли.

Сервис использует файл конфигурации `/opt/bin/indexer.cfg` и подключается к серверу MySQL с правами root и пароль пользователя root указан в этом файле, т.е. если Вы сменили пароль root для MySQL - его необходимо поменять и в этом конфиге.


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

Restart with `service proftpd restart`

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
