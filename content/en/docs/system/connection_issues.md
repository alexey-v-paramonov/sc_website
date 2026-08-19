---
title: "Why Live Broadcasts Drop"
date: 2026-08-19
weight: 13
keywords:
  - "live broadcast connection issues"
  - "internet radio stream drops"
  - "packet loss"
  - "network jitter"
  - "MTR"
  - "WinMTR"
  - "radio encoder reconnecting"
summary: "Learn why a live Internet radio broadcast can drop even on a fast fibre connection, how buffering and reconnection help, and how to diagnose packet loss, jitter, and network outages."
seo_title: "Why Internet Radio Drops: Packet Loss, Jitter & MTR"
description: "Troubleshoot dropped live Internet radio broadcasts. Learn how buffering helps and use MTR or WinMTR to identify packet loss, jitter, congestion, and network outages."
---

# Why a live broadcast drops — and what we can and can't fix

If your live show has been cutting out, this page explains what is actually
happening between your studio and the radio server running our software, what the
software already does to protect you, and where the limits genuinely are.

It is written for broadcasters, not engineers. No prior networking knowledge
needed.

---

## First — what the radio server running Streaming.Center software already does for you

Before anything else, it's worth saying that a dropped connection is not treated
as your problem to solve alone. Our streaming engine already works hard to keep
you on air:

- **It holds a reserve of your audio.** Your stream isn't played to listeners the
  instant it arrives — a few seconds are held back in a buffer. If your
  connection stumbles briefly, listeners hear nothing unusual, because the server
  is playing from that reserve while it waits for the next audio to arrive.
- **It never stops listening for you.** Your broadcast port stays open
  permanently. The moment your encoder tries to reconnect, the server is there.
- **It hands over cleanly when you reconnect.** If your encoder opens a fresh
  connection while the old one is still winding down, the server switches to the
  new one immediately, carrying your buffered audio across so you go back on air
  without waiting.
- **It waits before giving up.** A silent connection is given a generous grace
  period before the server concludes you've really gone.
- **It records exactly what happened.** Every connection, stall, and reconnection
  is logged in detail, so we can tell you precisely what the server saw.

Those settings are tunable. If your line is known to be a bit unreliable, we can
increase the reserve so that longer wobbles pass unnoticed. **That is a real fix
and we are glad to make it.**

But there is a point beyond which no amount of software helps, and it's worth
understanding where that point is.

---

## "But my internet is fine" — how that can be true, and the stream still drops

This is the most common and most reasonable objection, and it usually comes in
one of two forms.

### "I have a fibre connection"

Almost certainly true — and it only describes the **first few metres of the
journey**.

Fibre describes the link between your building and your provider's nearest
equipment. That's one step. Your audio then has to cross the rest of the internet
to reach the radio server, and the internet is not a single cable. It's a chain of
separate networks handing your data to one another.

Each handover point is called a **hop**. A typical broadcast from a studio to a
streaming server passes through somewhere between **eight and twenty hops**: your
provider's local exchange, their national network, one or more wholesale carriers
who move traffic between countries, then the data centre network hosting the
radio server.

> **A useful way to picture it:** having a wide, smooth driveway says nothing
> about the motorway you join at the end of the road. Your fibre is the
> driveway. The motorway is everyone else's.

Any one of those hops can be congested, misconfigured, or having a bad hour — and
your fibre connection will still test perfectly, because the problem isn't in the
part you own.

### "My connection is 1 Gb/s"

Also probably true. But speed and quality are **two different things**, and only
one of them matters for live audio.

- **Bandwidth** (the "1 Gb/s") is *how much* data can move at once. Think of it
  as how many lanes the road has.
- **Quality** is *whether every piece arrives, on time, in order*. Think of it as
  whether the traffic is actually moving.

A ten-lane motorway is no use if it's gridlocked. A 1 Gb/s connection that loses
one piece of data in five is a broken connection for live audio, no matter what
the number on the bill says.

And a speed test doesn't measure the thing that matters here. A speed test sends
a **short burst** to a **deliberately nearby** server and reports the peak. Your
broadcast is the opposite: a **small, continuous, unbroken** flow to **one
specific server**, sustained for hours. A line can ace the first and fail the
second.

---

## Why live broadcasting is harsher than anything else you do online

This is the part that surprises most people, and it explains why your stream
drops while everything else on your connection seems fine.

**Almost everything else you do online is allowed to wait.**

When you download a file and a piece goes missing, your computer quietly asks for
it again. You never notice — the download just takes a moment longer. When you
watch a video, your player has often stored up thirty seconds or more in advance,
so it can absorb a long interruption without you seeing anything.

**A live broadcast cannot wait.** Your encoder produces audio at a fixed rate —
say 320 kilobits every second — and that audio must reach the server at that
same rate, second after second, indefinitely. There is no "later". If a second's
worth of audio is delayed, the next second is already being created behind it.

So when pieces go missing, two things happen at once:

1. Your encoder resends them, which takes time it doesn't have.
2. Because the internet interprets loss as a warning sign, it **deliberately
   slows your connection down** to avoid making things worse.

That second point catches everyone out. When a broadcast link starts losing data,
it doesn't just lose a little — the speed collapses. In a case we investigated
recently, a studio's stream was arriving at a steady, perfect rate for nearly an
hour, then in the space of a few seconds fell to about **a fifth of the required
rate** and stayed there for a couple of minutes. The connection never
"disconnected". It simply couldn't carry the audio any more, and the encoder
eventually gave up and reconnected.

That is what a listener hears as a drop-out.

---

## The three things that actually break a broadcast

- **Packet loss** — pieces of your audio that don't arrive at all. Even a small
  amount is serious for live audio, for the reasons above. Healthy is *zero*.
  During the incident above, roughly **one piece in five** was going missing.
- **Jitter** — pieces arriving unevenly, bunched up and then not at all. Your
  audio arrives, but not at the steady rate the broadcast needs. Our buffer
  absorbs small amounts of this. That's exactly what it's for.
- **Brief outages** — a few seconds where nothing gets through: a wifi hiccup, a
  router restarting, your provider re-routing traffic. Short ones are invisible.
  Longer ones exhaust the buffer, and then there's nothing left to play.

Note that **none of these show up on a speed test**, and none of them are
affected by how fast your connection is.

---

## How to find out what's really happening

If you'd like to know rather than guess, these are genuinely useful and take a
few minutes.

**Use a cable, not wifi, if you possibly can.** Wifi is by far the most common
source of packet loss in a studio, and it's the easiest thing to rule out. A
single cable between your broadcast computer and your router removes an enormous
amount of uncertainty.

**Measure the whole path, not just your line.** A tool called **MTR** (on
Windows, *WinMTR*) tests every hop between you and the radio server and shows which one
is losing data. This is the single most useful thing you can send us. Run it
**while the problem is happening** — a clean test at a quiet hour proves very
little.

**Test at the times it actually fails.** If drop-outs happen every evening,
that's a strong clue: shared connections get busy when everyone comes home. It
points at congestion somewhere on the path, not at your equipment.

**Check what else is using the line.** Backups, cloud sync, software updates and
video calls all compete with your broadcast. A large upload starting
automatically at 8pm is a classic cause of evening drop-outs.

**Try a lower bitrate temporarily.** If dropping from 320 kbps to 128 kbps makes
the problem disappear, that confirms the path can't reliably sustain the higher
rate — useful to know, and something we can help you configure.

---

## What we can do, and what we can't

**We can:**

- increase the audio reserve so longer interruptions pass unnoticed by listeners
- adjust how patiently the server waits before treating you as disconnected
- make reconnection as fast and seamless as possible
- help you review the radio server logs showing exactly what arrived and when
- help you pick a bitrate your connection can comfortably sustain
- confirm from the radio server logs whether the audio was arriving at all

**We can't:**

- change how your data is routed across networks nobody involved here owns
- recover audio that never reached the server — if it didn't arrive, it doesn't
  exist for us to broadcast
- make a congested link between two other companies less congested

This isn't reluctance. When audio doesn't arrive, the radio server has nothing to
work with. The fix in those cases lies with whoever operates the affected part of
the path — usually your provider, who can act on it if you give them specifics.

That's exactly why the MTR test is worth running: **it turns "my stream keeps
dropping" into "hop seven is losing 20% of my packets"**, which is something a
provider can actually investigate.

---
