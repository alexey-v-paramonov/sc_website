---
title: "How AutoDJ Reduces Artist and Track Repeats"
date: 2026-10-16
weight: 25
summary: "Why a larger repeat limit does not always mean more variety, and how AutoDJ spaces out artists and songs automatically."
seo_title: "AutoDJ Shuffle: Artist Separation and Track Repeats | Streaming.Center"
description: "Learn how Streaming.Center AutoDJ reduces repeated artists and songs, why fixed repeat windows can disappoint, and what makes a playlist sound more varied."
---

# How AutoDJ Reduces Artist and Track Repeats

“Can I stop the same song or artist from playing again for a certain number of
tracks, an hour, or a day?”

It is a reasonable question. You want your station to sound varied, without having
to manage every song yourself. Streaming.Center AutoDJ works toward that goal
automatically: **its first priority is to space out artists, and it also uses recent
track history to reduce repeats of individual songs.**

We previously offered an adjustable repeat limit. We removed it because it was easy
to set a value that the playlist could not support. A higher number looked like
better protection, but often changed expectations more than it improved the music.

## Why a fixed repeat limit can disappoint

Imagine a playlist with ten songs, all by just two artists. Now add a rule:
“Do not play an artist who appeared in the last three tracks.”

The first song is by Artist A. The second is by Artist B. For the third song,
**both artists are already forbidden**, even though eight songs remain unplayed.

The player has to make an exception or find something else to play. Increasing the
limit to ten or twenty cannot help: the playlist still contains only two artists.

This is the weakness of a fixed window. It asks you to choose a number without
necessarily knowing whether your music can satisfy it. The same limit may be
reasonable for a varied playlist and impossible for a smaller one. Removing songs
or changing which playlist is on air can make a previously workable value unsuitable.

Such limits can be useful in carefully planned programming, but they are a poor
default for everyday shuffle. **The largest possible setting does not produce the
largest possible variety.**

## Repeating an artist and repeating a song are different

Two artists can still provide plenty of different songs. With five songs by each,
the music can alternate like this:

**A: song 1 → B: song 1 → A: song 2 → B: song 2 → A: song 3 → B: song 3**

The artists return frequently because there are only two. The songs do not need to
repeat yet. That is why the number of tracks alone cannot tell you how much artist
separation is possible.

For more space between appearances by the same artist, add more artists. For fewer
repeats of an individual song, add more songs by the artists already in the playlist.

## How our automatic balancing helps

During regular shuffle playback, AutoDJ considers the available music and its
recent artist and track history each time it chooses a song.

It gives preference to artists who have had a break, taking into account how much
music each artist contributes to the playlist. Once it chooses an artist, it uses
that artist's recent track history to help avoid replaying the same song too soon.
Randomness keeps the choices from becoming a fixed running order.

This gives you a useful result without a repeat-limit setting to tune:

- Artists are kept apart where the available choices allow it.
- Recent songs are avoided where possible within the chosen artist's tracks.
- Selection adapts to the music available, without requiring you to calculate a
  suitable gap yourself.

**Artist separation comes first.** Suppose a playlist contains nine songs by Artist A
and only one by Artist B. Alternating the artists means B's one song returns every
other track. Avoiding that song would mean playing Artist A again instead.

There is no arrangement that gives this playlist both wide artist separation and
infrequent repeats of B's song. Adding more songs by B, and music by other artists,
improves both. Automatic balancing makes that tradeoff consistently; it cannot add
variety that is missing from the playlist.

## When the whole playlist needs a turn

Some programmes have a different goal: play the whole playlist once. For random
radioshows and sequential rotation blocks set to play an entire random playlist,
AutoDJ arranges one shuffled pass through the playlist, spreading artists out where
possible.

Here, every playlist entry gets a turn during that pass. With nine songs by A and
one by B, A will necessarily appear several times close together. This approach
suits a complete programme; regular balanced shuffle suits continuous playback
where keeping artists apart is the main priority.

You can read more about arranging programmes in our [rotations guide]({{< relref "rotations.md" >}}).

## Can a song play only once an hour or once a day?

A time limit also depends on how much suitable music is available. Ten four-minute
songs provide about forty minutes of music. If they are the only content playing,
some songs must repeat before an hour has passed, regardless of the shuffle system.
A day requires much more music again.

Regular shuffle therefore aims to reduce repeats automatically, rather than promise
a fixed hourly or daily exclusion. A large library helps only when that music is
actually available to the playlist or programme currently on air.

For a more varied station, build playlists with **more distinct artists and a good
selection of songs by each**. AutoDJ can then use that variety to keep artists apart
and reduce song repeats, without making you guess a repeat-limit number.
