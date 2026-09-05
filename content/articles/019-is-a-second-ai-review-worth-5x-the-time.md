---
title: "Is a Second AI Review Worth 5x the Time? We Ran the Experiment."
published: "2026-09-05"
author: "Andy Carroll"
format: "article"
tags: ["Tooling", "Operations"]
excerpt: "Skipping independent review looks like the obvious saving, until you count what a confidently wrong build costs once it ships. We measured the real trade-off: 4.9x the time, a 90%-vs-73% score gap, and what shipping that gap would have cost."
slug: "is-a-second-ai-review-worth-5x-the-time"
bluf: "We measured the real cost of independent AI review against skipping it: a 4.9x time cost, a 90%-vs-73% score gap, and what shipping that gap actually costs."
lead_magnet_cta: "Want a straight answer on where your organisation actually stands with AI? Our free readiness scorecard takes five minutes and gives you a personalised result, not a sales pitch."
next_article_url: "/insights/articles/how-do-you-know-a-cheaper-ai-model-is-still-good-enough.html"
next_article_title: "How do you know a cheaper AI model is still good enough?"
---

## The number that ends the conversation

Ask that question out loud in most planning meetings, and the number alone ends the conversation: five times longer, no further questions asked.

We tested it properly, on a real piece of work: running an independent review took 4.9 times longer than building it solo. That's the real number, and the reaction to it is always the same: that sounds expensive.

It's the wrong comparison. It's worth working out why, because the same mistake is easy to make anywhere you're deciding whether a second pair of eyes earns its keep.

---

## The number everyone reacts to

We ran a real internal build two ways. One AI agent built it solo: wrote the plan, built the thing, done. The other added one step before any of that: a separate reviewer, with no part in the build, pressure-tested the plan first, then a revision, then the build itself.

The solo build took 3.5 minutes of agent time. The reviewed build took 17.2. That's the 4.9x. On its own, all it says is that being careful takes longer.

---

## What the extra time actually bought

Here's where it stops being straightforward. We scored both outputs against the same bar every piece of work in our library has to clear before it ships: 24 out of 30, an 80% pass mark. A reviewer blind to which version had the extra step scored both.

The solo build marked itself 90%. The independent reviewer put it at 73%: a fail, against the exact gate that decides whether anything we build reaches a client, and not a rounding difference.

It had quietly excluded the exact case the tool most needed to handle, and it had no fallback for a piece of information arriving incomplete, in a document meant to go in front of a client. The reviewed version scored 97%, from both sides.

---

## The dangerous score isn't the one that failed

A 73% you know about is a manageable problem. The expensive version is the 90% that should have been a 73%: confident, plausible, and wrong in a way nobody had any reason to go looking for.

That's exactly what happened here. Seventeen points of daylight opened up between what the solo build believed about itself and what was actually true, and nothing in its process was built to close that gap before it shipped.

<figure>
<svg viewBox="0 0 760 400" width="100%" role="img" aria-label="Stylised line chart showing two costs against how many times a piece of AI-built work runs. The cost of independent review is a single flat step near the start and stays low and constant. The cost of an unreviewed defect starts lower but climbs steadily with every run, then jumps sharply at the point the defect is finally discovered and the work has to be rebuilt.">
<rect x="0" y="0" width="760" height="400" fill="#FFFFFF"/>
<g font-family="'DM Sans','Inter',system-ui,sans-serif">
<text x="70" y="24" font-size="13" font-weight="700" letter-spacing="1.2" fill="#475569">COST AGAINST HOW MANY TIMES THIS RUNS</text>
<text x="620" y="24" text-anchor="end" font-size="13" fill="#64748B">stylised, not measured data</text>
<line x1="70" y1="110" x2="620" y2="110" stroke="#E2E8F0" stroke-width="1"/>
<line x1="70" y1="190" x2="620" y2="190" stroke="#E2E8F0" stroke-width="1"/>
<line x1="70" y1="270" x2="620" y2="270" stroke="#E2E8F0" stroke-width="1"/>
<line x1="70" y1="50" x2="70" y2="340" stroke="#E2E8F0" stroke-width="2"/>
<line x1="70" y1="340" x2="620" y2="340" stroke="#E2E8F0" stroke-width="2"/>
<path d="M 70 300 L 130 246 L 620 246" fill="none" stroke="#088ABF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="620" cy="246" r="4.5" fill="#088ABF"/>
<text x="632" y="250" font-size="13" font-weight="600" fill="#475569">cost of review</text>
<text x="632" y="266" font-size="12" fill="#64748B">(paid once, up front)</text>
<path d="M 70 320 C 220 300, 340 260, 420 210 C 440 197, 455 187, 468 178" fill="none" stroke="#E93F8E" stroke-width="3" stroke-linecap="round"/>
<line x1="468" y1="178" x2="468" y2="70" stroke="#E93F8E" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>
<path d="M 468 70 L 620 46" fill="none" stroke="#E93F8E" stroke-width="3" stroke-linecap="round"/>
<circle cx="468" cy="178" r="4" fill="#E93F8E"/>
<circle cx="620" cy="46" r="4.5" fill="#E93F8E"/>
<text x="632" y="50" font-size="13" font-weight="600" fill="#475569">cost of an unreviewed defect</text>
<text x="474" y="120" font-size="12" font-weight="600" fill="#E93F8E">defect found &#8594; rebuild</text>
<text x="70" y="364" font-size="13" fill="#64748B">1st run</text>
<text x="345" y="364" text-anchor="middle" font-size="13" fill="#64748B">10th run</text>
<text x="620" y="364" text-anchor="end" font-size="13" fill="#64748B">50th run</text>
<text x="-210" y="26" transform="rotate(-90)" text-anchor="middle" font-size="13" fill="#64748B">cumulative cost</text>
</g>
</svg>
<figcaption>Review is a flat, one-off cost paid before the first run. An unreviewed defect's cost rises with every run it goes unnoticed, then jumps hard the day it's finally found and the work has to be rebuilt. The crossover point, not the sticker price, is the number that matters.</figcaption>
</figure>

---

## You're paying one bill twice, not once

The 4.9x is a build-time cost, paid once. Whatever you built with it then runs: once, ten times, or every day your team touches it.

Run it twice and the review barely registers against the difference. Run it fifty times a week for a team that actually relies on it, and the comparison stops making sense in the review's favour. The review cost stayed fixed. Every unreviewed run past the first was exposure nobody checked for.

We only ran the build once, not fifty times, so this part is reasoning rather than a measured result, but the direction is clear enough without measuring it.

The more a team depends on something, the more a hidden defect in it costs, and the review's price doesn't move to reflect that at all.

---

## The bill that actually adds up

Catching a 73%-quality build at review costs you the review. Catching it after it's been running for a month costs you the review you skipped, every output it already produced under a false 90%, whatever that cost the people who trusted those outputs, and the rebuild itself.

The rebuild is never actually cheaper for having been deferred, only later.

This is what getting more capable with the same people actually looks like day to day: catching the confidently wrong version before it reaches anyone, rather than finding out about it the expensive way.

---

## Start with one question

You don't need a policy for when to add a second reviewer. You need one question, asked honestly before you skip it: how many times will this run, and what does a wrong answer cost the people who see the output?

If either answer is "more than a handful" or "more than I'd be comfortable explaining," the review has already paid for itself, before the second run.

---

## Does every AI-built thing need independent review?

No, and we don't apply it uniformly ourselves. A thin, low-risk build doesn't need the premium this cost us. The review's value scales with how much rides on the output, not a blanket rule.

---

## How do you stop the second reviewer just agreeing with the first?

Independence has to be structural, not a request. Ours was blind to which version it was scoring, and used the same rubric throughout. The comparison only means something if the reviewer has no reason to be generous to either side.

---

## Why 24 out of 30, not just a percentage?

Because the total isn't the whole test. The score is built from six categories, each marked out of 5, and every one has to clear a minimum on its own: no category below 3, whatever the total adds up to. A high overall percentage can still fail if a single category is weak enough. 24/30 is shorthand for both conditions at once: high enough overall, and nowhere quietly weak.
