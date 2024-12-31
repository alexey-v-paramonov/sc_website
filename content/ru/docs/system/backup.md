---
title: "Резервное копирование"
date: 2024-08-23T11:40:53+03:00
weight: 60
---

Регулярное резервное копирование, которое можно настроить в панели упраления, не только позволяет Вам обеспечить сохранность данных, настроек и аккаунтов пользователей, но и позволяет осуществлять перенос аккаунтов Платформы Интернет-радио с одного сервера на другой.

Обращаем ваше внимание на то, что при полном резервном копировании всех аккаунтов всех радио-станций на сервере сервер должен располагать достаточным свободным местом на диске, то есть если все файлы пользователей занимают, скажем, 50 гигабайт, но на сервере должно быть как минимум 100 гигабайт места.
Если по какой-либо причине диск ограничен и нет возможности копировать все данные пользователей, включая медиа-файлы - в настройках резервного копирования в Интерфейсе Администратора есть возможность установить галочку компактного бэкапа: в этом случае медиа-файлы пользователя не копируются, только файлы настроек и база данных. Рекоммендуется подключить как минимум этот режим, обычно пере-закачать снова медиа-файлы всегда можно, а восстановить настройки - достаточно сложно.

#### Резервное копирование сервера
#### Миграция на новый сервер при помощи резервного копирования текущего сервера
1. Run bash <(curl -s https://streaming.center/dist/install.sh)
2. backup old server.
3. On the new serverin /etc/crontab file comment-out lines:
```
*/5 * * * * root /usr/local/bin/content_indexer 1>/dev/null 2>/dev/null
*/1 * * * * root python3.6 /opt/bin/sc_stats 1>/dev/null 2>/dev/null
*/15 * * * * root python3.6 /opt/bin/sc_backup 1>/dev/null 2>/dev/null
*/1  * * * * root python3.6 /opt/bin/sc_accounts 1>/opt/acc.out 2>/opt/acc.err
0    * * * * root python3.6 /opt/bin/awstats 1>/dev/null 2>/dev/null
30 2 * * 1 root /usr/bin/letsencrypt renew
```
4. Copy backup files from the old server to the new one, to /var/users/backup_restore
5. Run: `cd /opt/bin`
6. Run: `python3 sc_backup.pyc` - that will restore the backup.
7. Change DNS for the domain to your new server IP.
8. Run `cd /opt/bin && ./change_host` - that will let you change the domain
9. Run `cd /opt/bin && ./ssl_enable` to install SSL certificates
10. Run `bash <(wget -qO- https://streaming.center/dist/update.sh)`
11. Uncomment lines in `/etc/crontab` back (step 3)

  - templates
mysql -u root -pYzYzY2QyZT sc_billing templates_broadcaster < templates_broadcaster.sql
mysql -u root -pYzYzY2QyZT sc_billing templates_reseller < templates_reseller.sql

mysql -u root -pNzYwNmNhNj sc_billing < templates_broadcaster.sql
mysql -u root -pNzYwNmNhNj sc_billing < templates_reseller.sql
