---
title: "Пагинация в плейлистах, исправления ошибок"
date: 2020-08-10T10:54:49+03:00
---

Добавлена страница "быстрых ссылок", которая содержит всю информацию по ссылкам, потокам, паролям и доступам. Плей-листы теперь поддерживают пагинацию. Если треков в плей-листе слишком много - отображение будет разбито на страницы и количество треков на странице можно менять в настройках. Если у трека в плей-листе есть обложка - это будет отмечено в списке треков. В плей-лист добавлена опция поиска треков по названию, исполнителю или имени файла. Исправлено некорректное отображение повторяющихся событий в сетке вещания. Устранена ошибка, которая вызывала наложение некоторых событий в сетке вещания друг на друга. API карт обновлен, согласно последним требованиям сервиса карт MapBox. Улучшена работа скрипта сбора статистики слушателей, увеличена скорость его работы. Запрет на повтор для джинглов, которые стоят внутри блока джинглов. Иногда в истории не правильно отображались обложки треков, исправлено. Исправлены ошибки смены сервера с icecast на shoutcast. Исправлена ошибка при установке плейлиста в сетку вещания через нажатие на кнопку в списке плейлистов. Устранена утечка памяти в AutoDJ. Кнопка удаления нескольких треков из плей-листа не работала, если выбрано много файлов - исправлено. Статистика трафика не работала для SSL портов - исправлено. Улучшена поддержка Unicode тэгов в mp3 файлах. Для джинглов теперь так же разбираются расширенные мп3 тэги, такие как год, альбом, жанр и т.п. В некоторых случаях удаление трека из плей-листа вызывало ошибку - исправлено. Улучшен подсчет длительности звучания мп3 файлов, что в итоге дает более точный подсчет длительности плей-листов. Исправления в выходе в эфир интервальных джинглов. Для файлов из сети улучшена синхронизация мета-данных (теперь она пере-читывается). В некоторых случая файлы из сети не корректно отображались в списке - исправлено. Интеграция с TuneIn теперь работает и с мета-данными от диджеев, ретрансляторов. Улучшен алгоритм работы отправки данных в TuneIn. В некоторых случаях Авто диджей не правильно выводил заявки слушателей в эфир (или не выводил вообще) - исправлено. Несколько исправлений в функцию импорта m3u файлов плей-листов. Для сервера Icecast-kh на некоторых страницах отображались не корректные ссылки на прослушивание, исправлено. Для ретрансляторов исправлена загрузка картинок-обложек.
