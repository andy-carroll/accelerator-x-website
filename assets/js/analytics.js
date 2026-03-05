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
