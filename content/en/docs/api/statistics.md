---
title: "Audience statistics and royalty reports"
weight: 62
summary: "Query audience analytics, export airplay data, and generate royalty reports."
seo_title: "Audience statistics and royalty reports API | Streaming.Center API"
description: "Query audience analytics, export airplay data, and generate royalty reports."
---

## Audience analytics

Authenticate with [a panel token](/docs/api/auth/#api-panel-sign-in) and statistics read permission. Except for [`channels`](/docs/api/statistics/#api-analysis-channels) and [`live`](/docs/api/statistics/#api-analysis-live), pass `server`, `date_from` and `date_to`. The dates are inclusive local dates in `YYYY-MM-DD` format, interpreted in the station’s time zone. Optional `channels` is [a comma-separated list of channel IDs](/docs/api/channels/#api-channels). `protocol` is `icecast`, `shoutcast`, or `hls`. The general date range is limited to 366 days and music/advertising reports to 31 days. Use `export=csv` or `export=xlsx` where offered.

<div class="api-block" id="api-analysis-channels">
<b>Endpoint</b> /api/v2/analytics/channels/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

`server` selects the station. Returns an array of current and historical channels.

<div class="api-block" id="api-analysis-overview">
<b>Endpoint</b> /api/v2/analytics/overview/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Audience totals, comparison, coverage, and service health. Use `section` to select a table for CSV export.

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/timeseries/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Audience `rows` grouped by `interval`: `15m`, `hour`, `day` (default), `week`, or `month`.

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/breakdown/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

`dim` accepts `country` (default), `city`, `client`, `device`, `os`, `channel`, or `protocol`. Returns grouped rows and coverage.

<div class="api-block" id="api-analysis-heatmap">
<b>Endpoint</b> /api/v2/analytics/heatmap/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Audience rows by weekday and hour.

<div class="api-block" id="api-analysis-durations">
<b>Endpoint</b> /api/v2/analytics/durations/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Listening session duration distribution.

<div class="api-block" id="api-analysis-live">
<b>Endpoint</b> /api/v2/analytics/live/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `server` and optional `channels` and `protocol`. Returns `as_of`, `timezone`, `refresh_seconds`, `units`, `estimates`, `channels` and `stale`.

```http
GET /api/v2/analytics/live/?server=1
```

```json
{
  "server": 1,
  "as_of": "2026-04-07T10:00:00Z",
  "timezone": "Europe/Helsinki",
  "refresh_seconds": 10,
  "estimates": {
    "hls_listening": true,
    "hls_current_lag_seconds": 60
  },
  "channels": [],
  "stale": false
}
```

In this abbreviated response, `as_of` is the snapshot time, `refresh_seconds` is the polling interval, and HLS figures are estimates. Date-range reports include coverage and units. A response can indicate `rebuild_pending` while the data is being recalculated.

## Music and advertising reports

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/music/groups/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Set `kind` to `dj`, `playlist`, or `rotation`. Returns `rows` and counts of excluded, pending, and unknown-end occurrences.

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/music/tracks/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Track likes, dislikes and requests. The payload reports channel and protocol filters as unapplied for this report.

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/ads/summary/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Required `type` is `item`, `block`, or `intro`. Returns aggregate `summary`.

<div class="api-block" id="api-ads-units">
<b>Endpoint</b> /api/v2/analytics/ads/units/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Pass `type` and optional `by`. Group by `item` or `rule` for items, `block` for blocks, and `intro` for intros. Returns `rows`.

<div class="api-block">
<b>Endpoint</b> /api/v2/analytics/ads/airings/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Optional `type` defaults to `item`. Filter by `unit_key` from [the units report](/docs/api/statistics/#api-ads-units). Pass `page` and `page_size` for an object with `count`, `pages`, and `rows`.

## Legacy statistics and exports

<div class="api-block" id="api-total-listeners">
<b>Endpoint</b> /api/total_listeners/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Public total across active streaming channels. Returns `{"total_listeners":42}`.

<div class="api-block">
<b>Endpoint</b> /api/v2/stats/{period}/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Audience history for `hour`, `day`, or `week`. Requires `server`. Returns time and listener count data grouped by channel.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners_geoip/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Current connections for active channels with optional `server`. Rows include `connecttime`, `channel_data`, and `geodata` if available.

<div class="api-block">
<b>Endpoint</b> /api/v2/listeners_geoposition/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Listener position data as an array.

<div class="api-block">
<b>Endpoint</b> /api/v2/listening_hours/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Returns `total_time` and `dates`. Include `excel` for a spreadsheet.

<div class="api-block" id="api-track-stats">
<b>Endpoint</b> /api/v2/track_stats/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Authenticated track statistics list.

<div class="api-block">
<b>Endpoint</b> /api/v2/track_stats/best/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Public track chart for `server`, sorted by positive votes.

<div class="api-block">
<b>Endpoint</b> /api/v2/track_stats/worst/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Public<br/>
</div>

Public track chart for `server`, sorted by negative votes.

<div class="api-block">
<b>Endpoint</b> /api/v2/track_stats/{export}/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Supported exports are `csv`, `rao`, `rao_pub`, `vois`, `best_excel`, and `worst_excel`.

<a id="api-royalty-reports"></a>

## Royalty reports

<div class="api-block" id="api-royalty-settings">
<b>Endpoint</b> /api/v2/royalty_settings/<br/>
<b>HTTP methods</b> GET, PUT<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Read or save royalty reporting settings. PUT returns the updated configuration.

<div class="api-block" id="api-royalty-formats">
<b>Endpoint</b> /api/v2/royalty_reports/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Optional `country` filters the available `formats`.

<div class="api-block" id="api-royalty-preview">
<b>Endpoint</b> /api/v2/royalty_reports/preview/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

[Pass `format`](/docs/api/statistics/#api-royalty-formats), `date1`, `date2` (Unix seconds), `server`, and optional IANA `tz`. Returns report metadata, validation messages and preview information.

<div class="api-block">
<b>Endpoint</b> /api/v2/royalty_reports/download/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT<br/>
</div>

Same selectors [as preview](/docs/api/statistics/#api-royalty-preview). Returns an attachment in the chosen format if the report passes validation.

<div class="api-block" id="api-soundexchange-reports">
<b>Endpoint</b> /api/v2/soundexchange_reports/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

List by `server` or create a report with `server`, `start_ts`, and `end_ts` in `DD-MM-YYYY`. Responses format both dates as `DD/MM/YYYY`.

<div class="api-block">
<b>Endpoint</b> /api/v2/soundexchange_reports/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read, update, or delete a report. `status` and `created` are read-only.

<div class="api-block">
<b>Endpoint</b> /api/v2/soundexchange_reports/{id}/excel/<br/>
<b>HTTP methods</b> GET<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Download the report spreadsheet.

<div class="api-block">
<b>Endpoint</b> /api/v2/soundexchange_reports_data/<br/>
<b>HTTP methods</b> GET, POST<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Use `?report=ID` to list or retrieve rows. POST saves a report row.

<div class="api-block">
<b>Endpoint</b> /api/v2/soundexchange_reports_data/{id}/<br/>
<b>HTTP methods</b> GET, PUT, PATCH, DELETE<br/>
<b>Authentication</b> Panel JWT or API key<br/>
</div>

Read, update, or delete a report row.

### Report properties

[`GET /api/v2/track_stats/`](/docs/api/statistics/#api-track-stats) groups plays by `metadata` and returns the count per item as `num`. It requires `server`. Pass `date1` and `date2` in Unix seconds to select a reporting period. By default the period starts at the beginning of the current month.

For `GET` and [`PUT /api/v2/royalty_settings/?server=1`](/docs/api/statistics/#api-royalty-settings), reporting fields include `legal_name`, `address`, `region`, `country` (two-letter code), `tax_id`, `fiscal_code`, `licence_number`, `contact_name`, `contact_email`, `contact_phone`, `service_name`, and `service_url`.

A SoundExchange row has [a `report` ID](/docs/api/statistics/#api-soundexchange-reports) and can record `history_all_music_id`, `history_jingle_id`, `metadata`, `name_of_service`, `transmission_category`, `artist`, `title`, `isrc`, `album`, `label`, `atp` (actual total performances), `ath` (aggregate tuning hours), `channel_or_program_name`, and `play_frequency`. The report’s `status` is 1 (processing), 2 (done), or 3 (error).

### Analytics response properties

Date-range responses include `range` with local `date_from` and `date_to` and corresponding UTC `start_utc` and `end_utc`. `coverage` and `availability` describe which data the selected period has. `units` and `methodology` describe the metrics.

[In `overview`](/docs/api/statistics/#api-analysis-overview), `totals` includes `sessions_started`, `qualified_started`, `short_started`, `short_share`, `listeners`, `listeners_all`, `listening_s`, `listening_hours`, `average_audience`, and `bytes`. `previous` and `trend` provide comparison data. The `legacy` and `service_health` objects describe legacy coverage and stream service health. For overview CSV, use `section=rejections` or `section=outages` to export those tables.

[In `heatmap`](/docs/api/statistics/#api-analysis-heatmap), each row contains `weekday` (0 is Monday), `hour`, `available`, `listening_s`, and `sessions_started`. [In `durations`](/docs/api/statistics/#api-analysis-durations), `buckets` hold `lower_s`, `upper_s`, `sessions`, and `total_s`. `mean_s` and `median_s` summarize session duration.
