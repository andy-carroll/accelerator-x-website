---
title: "Before You Build Anything, Get the Plan Torn Apart"
published: "2026-09-06"
author: "Andy Carroll"
format: "article"
tags: ["Frameworks", "Operations"]
excerpt: "Most effort goes into building. Almost none goes into checking whether the plan behind it is actually right. We tore apart the plan for this very article before writing a word of it, and here's the seven-step habit that came out of what it caught."
slug: "before-you-build-anything-get-the-plan-torn-apart"
bluf: "Reviewing a plan before you build anything is one of the highest-leverage habits available: a bad plan is cheap to fix, a bad build is expensive to fix. Here's the seven-step habit, the exact prompt that runs it, and how to do it with nothing but a fresh AI chat."
lead_magnet_cta: "Want a straight answer on where your organisation actually stands with AI? Our free readiness scorecard takes five minutes and gives you a personalised result, not a sales pitch."
next_article_url: "/insights/articles/how-do-you-know-a-cheaper-ai-model-is-still-good-enough.html"
next_article_title: "How do you know a cheaper AI model is still good enough?"
---

## The plan for this article failed its own review

I sat down to write the plan for this article. Not the article itself: the argument, the structure, the point I wanted to make. First pass took about five minutes.

Then I opened a brand-new chat, no shared history with the one that wrote the plan, and pasted in only the plan itself. I asked for an independent, adversarial review: find every way this fails, don't soften it.

It found a real problem. The plan was leaning on a score comparison from a finished project as its hook, the kind of stat that sounds impressive and proves nothing about what actually mattered. The real mechanism worth teaching had happened earlier: the plan itself had just been reviewed, before anything was built. The hook was measuring the wrong thing.

I revised. Whole cycle, plan to review to fix: about thirty minutes, against five for the first pass.

That is why this article does not open with a stat. It opens with what just happened to it.

The stakes here are small. It's a blog post. But the same five minutes and thirty minutes apply whether what you're reviewing is a blog post, a hiring plan, a pricing change, a system migration, or a client proposal. The mechanism doesn't care what you're building. It only cares whether you checked the plan before you built it.

---

## Most effort goes into building. Almost none goes into deciding what's worth building.

Most people, most of the time, skip straight to building. You want to get something done, so you start doing it: writing the email, building the feature, drafting the proposal. Checking whether the underlying plan is actually right feels like a delay, so it gets skipped.

AI has made this instinct more dangerous, not less. It's now trivial to produce something that looks finished fast: a competent-sounding draft, a plausible-looking build, a slide deck that reads well. The speed doesn't tell you whether the thing being produced is the right thing. It only tells you how quickly you can produce the wrong thing too.

This is what "fix the system, not the output" actually means in practice. Patching a mediocre draft by hand, the way I just did with this article's own first plan, only fixes that one draft. Reviewing the plan before you build fixes every draft that follows from it.

---

## The cheapest place to catch a mistake is the one everyone skips

Change is cheap before anything is built on top of it, and it gets more expensive the more depends on it. This isn't a new idea. Catching a flaw in a plan costs you a rewrite of a paragraph. Catching the same flaw after it has shipped costs you the rebuild, and everything that happened in between.

Here's what the expensive version would have looked like for this article. If the flawed plan had gone straight to a full draft, it would have published with a hook that proved nothing. Readers would have reacted to the wrong argument. Fixing it afterward would have meant a public correction, a rewritten piece, and whatever it cost the people who had already read and shared the wrong version.

Instead, catching it cost about twenty-five extra minutes, once, before any of that happened. That's the whole trade: twenty-five minutes now, or a larger, harder-to-measure cost later, paid by more people, in public.

---

## A seven-step habit, for anything you build

The same habit applies to anything you build, not just an article. It has seven steps.

1. **Outcome.** One sentence: what does success actually look like, and for whom. For this article, the outcome was a CFO or CEO reader believing that plan-review is worth twenty-five minutes.

2. **Strategy.** The big picture only, no task list yet: given what you're actually trying to do and what you can realistically do about it, what's the play.

3. **Plan.** The strategy made concrete: what will actually get done, in what order, and who owns each part.

4. **Independent, adversarial review.** Before you build anything from the plan, someone with no stake in it being good tries to find every way it fails.

5. **Revise.** Fix what the review found. Only send it back for another review if the plan changed in a real way, not for every small edit.

6. **Execute.** Build the thing.

7. **Independent, adversarial review, again.** The same discipline, this time on the finished thing: does it actually do what the plan said it would, and if not, why. If the answer is no, you fix it before it reaches anyone, the same as any other finding. That's the whole point of doing this before it ships, not after.

<figure>
<svg viewBox="0 0 1010 430" width="100%" role="img" aria-label="Diagram of a seven-step sequence for building anything: Outcome, Strategy, Plan, an independent adversarial review, Revise, Execute, and a second independent adversarial review, ending in a labelled Ship box. A dashed arrow loops back from Revise to Plan, labelled only if materially changed. The background is split into two equal zones: cheap to change on the left, covering the early steps, and expensive to change on the right, covering Execute and the final review, showing that the same mistake costs more the later it is caught.">
<rect x="0" y="0" width="1010" height="430" fill="#FFFFFF"/>
<rect x="0" y="60" width="505" height="330" fill="#EFFAFC"/>
<rect x="505" y="60" width="505" height="330" fill="#FDF1F7"/>
<g font-family="'DM Sans','Inter',system-ui,sans-serif">
<text x="40" y="30" font-size="13" font-weight="700" letter-spacing="1.2" fill="#475569">A SEVEN-STEP SEQUENCE, FOR ANYTHING YOU BUILD</text>
<text x="970" y="30" text-anchor="end" font-size="13" fill="#64748B">stylised, not measured data</text>
<text x="252" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="#088ABF">CHEAP TO CHANGE</text>
<text x="757" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="#E93F8E">EXPENSIVE TO CHANGE</text>
<line x1="70" y1="230" x2="855" y2="230" stroke="#CBD5E1" stroke-width="2"/>
<path d="M 530 195 C 530 118, 300 118, 300 195" fill="none" stroke="#088ABF" stroke-width="2" stroke-dasharray="4 5"/>
<polygon points="300,195 293,181 309,183" fill="#088ABF"/>
<circle cx="530" cy="195" r="3.5" fill="#088ABF"/>
<text x="415" y="132" text-anchor="middle" font-size="11" font-style="italic" fill="#475569">only if materially changed</text>
<rect x="25" y="195" width="90" height="70" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
<text x="70" y="228" text-anchor="middle" font-size="12" font-weight="700" fill="#1B2A4A">OUTCOME</text>
<text x="70" y="245" text-anchor="middle" font-size="10" fill="#64748B">what success</text>
<text x="70" y="257" text-anchor="middle" font-size="10" fill="#64748B">looks like</text>
<polygon points="138,230 128,225 128,235" fill="#64748B"/>
<rect x="140" y="195" width="90" height="70" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
<text x="185" y="228" text-anchor="middle" font-size="12" font-weight="700" fill="#1B2A4A">STRATEGY</text>
<text x="185" y="245" text-anchor="middle" font-size="10" fill="#64748B">the big</text>
<text x="185" y="257" text-anchor="middle" font-size="10" fill="#64748B">picture</text>
<polygon points="253,230 243,225 243,235" fill="#64748B"/>
<rect x="255" y="195" width="90" height="70" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
<text x="300" y="233" text-anchor="middle" font-size="12" font-weight="700" fill="#1B2A4A">PLAN</text>
<text x="300" y="251" text-anchor="middle" font-size="10" fill="#64748B">made concrete</text>
<polygon points="368,230 358,225 358,235" fill="#64748B"/>
<rect x="370" y="190" width="95" height="80" rx="10" fill="#FCE3F1" stroke="#E93F8E" stroke-width="2.5"/>
<text x="417" y="217" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">INDEPENDENT,</text>
<text x="417" y="232" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">ADVERSARIAL</text>
<text x="417" y="247" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">REVIEW</text>
<polygon points="483,230 473,225 473,235" fill="#64748B"/>
<rect x="485" y="195" width="90" height="70" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
<text x="530" y="233" text-anchor="middle" font-size="12" font-weight="700" fill="#1B2A4A">REVISE</text>
<text x="530" y="251" text-anchor="middle" font-size="10" fill="#64748B">fix what it found</text>
<polygon points="598,230 588,225 588,235" fill="#64748B"/>
<rect x="600" y="195" width="90" height="70" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
<text x="645" y="233" text-anchor="middle" font-size="12" font-weight="700" fill="#1B2A4A">EXECUTE</text>
<text x="645" y="251" text-anchor="middle" font-size="10" fill="#64748B">build the thing</text>
<polygon points="713,230 703,225 703,235" fill="#64748B"/>
<rect x="715" y="190" width="95" height="80" rx="10" fill="#FCE3F1" stroke="#E93F8E" stroke-width="2.5"/>
<text x="762" y="217" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">INDEPENDENT,</text>
<text x="762" y="232" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">ADVERSARIAL</text>
<text x="762" y="247" text-anchor="middle" font-size="11.5" font-weight="700" fill="#9D174D">REVIEW</text>
<polygon points="855,230 845,225 845,235" fill="#64748B"/>
<rect x="870" y="195" width="90" height="70" rx="10" fill="#1B2A4A"/>
<text x="915" y="238" text-anchor="middle" font-size="14" font-weight="700" fill="#FFFFFF">SHIP</text>
</g>
</svg>
<figcaption>The habit has one conditional loop, from Revise back to Plan, and ends at two review gates: one before anything is built, one after. Everything before the first review is cheap to change. Everything from Execute onward is expensive. The whole point of the habit is to do the reviewing while you're still on the cheap side.</figcaption>
</figure>

---

## Independent and adversarial, defined.

Independent means the reviewer has no stake in the plan being good, no part in writing it, and no context on how or why any choice was made. Adversarial means the reviewer is actively trying to find a way the plan fails, not confirming that it looks fine.

Here's the exact instruction that does both, worth copying as-is:

<div class="bg-surface-2 border-l-4 border-primary rounded-r-xl p-6 lg:p-8 my-8">
<p class="ax-kicker ax-kicker--accent">Copy this prompt</p>
<p class="font-mono text-navy leading-relaxed m-0">Perform an independent, adversarial review of this plan. You have no stake in it being good. Find every way it fails, every gap, everything that would only surface once we're already building it. Don't soften it. Only pass it if it earns one.</p>
</div>

Worth being honest about the limit here. A fresh chat with no shared history is still the same underlying model that might have written the plan in the first place, not a genuine stranger. Removing the shared context and the prior confidence removes most of the bias that would otherwise make a reviewer agreeable toward its own earlier work. It doesn't remove all of it. That's still worth doing, and it's still better than asking the same conversation that wrote the plan whether the plan is good.

A colleague can do this too, if they're genuinely uninvolved and have the time. The advantage of an AI reviewer is that it's always available, free to ask, and comes back in seconds rather than whenever your colleague gets to it.

Two things are worth watching either way. A clean review, one that finds nothing, is a real result, not a reason to keep asking until it finds something.

And a review that raises a concern deserves the same scrutiny the plan itself just got: check the finding against what the plan actually needs to achieve, not against how confident the reviewer sounds. The habit is the same discipline in both directions.

Below is exactly how to run this without any special tooling.

---

## Do I need special software to run one?

No special software. Open a brand-new chat in Claude, not a reply in an existing conversation and not inside a shared project that carries context. Paste in only the plan and what success looks like, nothing about how it was made or who made it. Ask it neutrally, "here's a plan for X," not "here's my plan," so it has no reason to be generous toward it.

---

## Is it safe to paste a real plan into an AI chat?

Not if it's genuinely sensitive. Don't paste unreleased financials, personal data, or live contract terms into a general-purpose chat without checking your own data-handling policy first. Most plans worth reviewing this way, a project structure, a campaign shape, a process redesign, don't contain anything sensitive to begin with. If yours does, that's a reason to check your policy, not a reason to skip the review.

---

## Isn't this just extra, slower process?

It costs roughly twenty to thirty minutes, once. That's the whole price, and it's cheaper than the rebuild it's protecting against. It isn't a new layer of ongoing process sitting on top of everything else. It's one bounded step, done before the expensive part starts, not a habit of checking and re-checking forever.

---

## Do I need AI expertise to do this?

No. The reviewer only needs the plan and the success criteria, never the underlying tooling or the domain expertise behind it. That's exactly why a fresh, uninformed chat works: it isn't judging whether you know what you're doing, only whether the plan itself holds up against what it's supposed to achieve.

---

## Higher-leverage people, not just faster output

None of this makes anyone faster at typing or building. What it does is stop the wrong thing from being built quickly, which is a different kind of leverage.

This is what it actually means to make people higher-leverage with AI: not that they produce more, but that what they produce is more often the right thing, checked before it costs anything to be wrong. That's a habit, not a tool, and it costs nothing to start using today.

If you want a straight read on where your organisation actually stands with AI beyond this one habit, our free readiness scorecard takes five minutes and gives you a personalised result, not a sales pitch.
