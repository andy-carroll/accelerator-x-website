// PostHog project API key (public browser key).
const POSTHOG_PROJECT_API_KEY = "phc_4v79jqLmPAIw1Se2KTeVIXe0gsf5xcKViZwv1N0F2LQ";
const POSTHOG_HOST = "https://eu.i.posthog.com";

!function (t, e) {
  let o;
  let n;
  let p;
  let r;
  if (e.__SV) {
    return;
  }
  window.posthog = e;
  e._i = [];
  e.init = function (i, s, a) {
    function g(t, e) {
      const o = e.split(".");
      if (o.length === 2) {
        t = t[o[0]];
        e = o[1];
      }
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    }

    p = t.createElement("script");
    p.type = "text/javascript";
    p.async = true;
    p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
    r = t.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(p, r);

    let u = e;
    if (a !== undefined) {
      u = e[a] = [];
    } else {
      a = "posthog";
    }

    u.people = u.people || [];
    u.toString = function (t) {
      let e = "posthog";
      if (a !== "posthog") {
        e += "." + a;
      }
      if (!t) {
        e += " (stub)";
      }
      return e;
    };
    u.people.toString = function () {
      return u.toString(1) + ".people (stub)";
    };

    o = "init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" ");
    for (n = 0; n < o.length; n++) {
      g(u, o[n]);
    }

    e._i.push([i, s, a]);
  };
  e.__SV = 1;
}(document, window.posthog || []);

const initPostHog = () => {
  posthog.init(POSTHOG_PROJECT_API_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2026-01-30",
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    // Cookieless: memory-only persistence means no cookies/localStorage, so no consent
    // banner is required (Andy, 2026-06-27). Trade-off: no cross-page/-session user
    // stitching — aggregate event counts and same-page funnels still work.
    persistence: "memory",
  });
};

let hasInitializedPostHog = false;
const initPostHogOnce = () => {
  if (hasInitializedPostHog) return;
  hasInitializedPostHog = true;
  initPostHog();
};

const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
interactionEvents.forEach((eventName) => {
  window.addEventListener(eventName, initPostHogOnce, { once: true, passive: true });
});

window.setTimeout(initPostHogOnce, 15000);

// ── cta_click ──────────────────────────────────────────────────────────────
// Delegated listener for primary CTAs (the shared .btn class) and any element
// explicitly tagged with data-cta. Captures { label, location } — no PII.
// A CTA click is itself an interaction, so PostHog will have initialised (and
// the snippet queues capture() either way).
const ctaLabel = (el) => {
  const tagged = el.closest("[data-cta]");
  if (tagged && tagged.getAttribute("data-cta")) return tagged.getAttribute("data-cta").trim();
  // Fall back to visible text, stripped of decorative arrows/whitespace.
  return (el.textContent || "").replace(/[→↗➔»]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
};

document.addEventListener("click", (e) => {
  const cta = e.target.closest("a.btn, button.btn, [data-cta]");
  if (!cta) return;
  try {
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture("cta_click", { label: ctaLabel(cta), location: window.location.pathname });
    }
  } catch (_) { /* analytics must never break a click */ }
}, { passive: true });
