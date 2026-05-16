// app.jsx — Wires everything into the design canvas.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "b",
  "showFoundations": false,
  "hideOfferingsOverview": false,
  "hideMethodology": false,
  "hideInsights": false,
  "hideCaseStudies": false,
  "hideAbout": false,
  "hideContact": false,
  "showPricing": true,
  "heroTone": "confident"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const show = (d) => t.direction === 'all' || t.direction === d;

  return (
    <DesignCanvas>
      {t.showFoundations && (
        <DCSection
          id="foundations"
          title="Foundations"
          subtitle="Project context, four design directions, palette & type. Read this first."
        >
          <DCArtboard id="intro" label="Round 01 · Brief" width={1100} height={720}>
            <FoundationsIntro />
          </DCArtboard>
          <DCArtboard id="palette" label="Palette" width={760} height={720}>
            <PaletteBoard />
          </DCArtboard>
          <DCArtboard id="type" label="Type · per direction" width={920} height={720}>
            <TypographyBoard />
          </DCArtboard>
        </DCSection>
      )}

      <DCSection
        id="nav"
        title="Navigation system"
        subtitle="Top bar + mega menu (rebuilt around 3 categories) + mobile menu."
      >
        {show('b') && <DCArtboard id="nav-b-v2" label="B · New mega menu" width={1280} height={780}><NavBv2 /></DCArtboard>}
        {show('a') && <DCArtboard id="nav-a" label="A · Desktop + mega menu" width={1280} height={780}><NavA /></DCArtboard>}
        {show('a') && <DCArtboard id="nav-a-m" label="A · Mobile open" width={390} height={780}><MobileNavA /></DCArtboard>}
        {show('b') && <DCArtboard id="nav-b" label="B · v1 mega menu (archive)" width={1280} height={780}><NavB /></DCArtboard>}
        {show('b') && <DCArtboard id="nav-b-m" label="B · Mobile open" width={390} height={780}><MobileNavB /></DCArtboard>}
        {show('c') && <DCArtboard id="nav-c" label="C · Desktop + mega menu" width={1280} height={780}><NavC /></DCArtboard>}
        {show('c') && <DCArtboard id="nav-c-m" label="C · Mobile open" width={390} height={780}><MobileNavC /></DCArtboard>}
        {show('d') && <DCArtboard id="nav-d" label="D · Desktop + mega menu" width={1280} height={780}><NavD /></DCArtboard>}
        {show('d') && <DCArtboard id="nav-d-m" label="D · Mobile open" width={390} height={780}><MobileNavD /></DCArtboard>}
      </DCSection>

      <DCSection
        id="home"
        title="Homepage"
        subtitle="Full page wireframe — hero through final CTA + footer. Each tells a different story with the same content."
      >
        {show('a') && <DCArtboard id="home-a" label="A · Quiet Authority" width={1280} height={6400}><HomeA /></DCArtboard>}
        {show('b') && <DCArtboard id="home-b-v2" label="B · Homepage (NEW)" width={1280} height={5400}><HomeBv2 /></DCArtboard>}
        {show('b') && <DCArtboard id="home-b" label="B · v1 (archive)" width={1280} height={5500}><HomeB /></DCArtboard>}
        {show('c') && <DCArtboard id="home-c" label="C · Living Manuscript" width={1280} height={7100}><HomeC /></DCArtboard>}
        {show('d') && <DCArtboard id="home-d" label="D · Index" width={1280} height={5100}><HomeD /></DCArtboard>}
      </DCSection>

      {!t.hideOfferingsOverview && (
        <DCSection
          id="offerings"
          title="Offerings — overview & detail (NEW STRUCTURE)"
          subtitle="Three categories: Coaching & Cohorts · Company Enablement (Phase 0 → Phase 1+) · Ongoing. Plus Talks & Events (top-level page)."
        >
          {show('b') && <DCArtboard id="off-b-v2" label="B · New overview" width={1280} height={3700}><OfferingsBv2 /></DCArtboard>}
          {show('b') && <DCArtboard id="phase0-b" label="B · Phase 0 detail" width={1280} height={4000}><Phase0DetailB /></DCArtboard>}
          {show('b') && <DCArtboard id="off-det-b" label="B · Phase 1+ detail (8-week)" width={1280} height={3700}><OfferingDetailB /></DCArtboard>}
          {show('b') && <DCArtboard id="events-b" label="B · Talks & Events page" width={1280} height={3600}><EventsB /></DCArtboard>}
          {show('b') && <DCArtboard id="off-b-archive" label="B · v1 overview (archive)" width={1280} height={3600}><OfferingsB /></DCArtboard>}
          {show('a') && <DCArtboard id="off-a" label="A · Overview" width={1280} height={520}><OfferingsA /></DCArtboard>}
          {show('c') && <DCArtboard id="off-c" label="C · Overview" width={1280} height={520}><OfferingsC /></DCArtboard>}
          {show('d') && <DCArtboard id="off-d" label="D · Overview" width={1280} height={520}><OfferingsD /></DCArtboard>}
        </DCSection>
      )}

      {!t.hideMethodology && (
        <DCSection id="methodology" title="How we work" subtitle="Methodology page + standalone DOTS method page (linked under ‘How we work’).">
          {show('b') && <DCArtboard id="meth-b" label="B · Methodology" width={1280} height={3850}><MethodologyB /></DCArtboard>}
          {show('b') && <DCArtboard id="dots-b" label="B · Method · DOTS" width={1280} height={4200}><DotsMethodB /></DCArtboard>}
          {show('a') && <DCArtboard id="meth-a" label="A" width={1280} height={520}><MethodologyA /></DCArtboard>}
          {show('c') && <DCArtboard id="meth-c" label="C" width={1280} height={520}><MethodologyC /></DCArtboard>}
          {show('d') && <DCArtboard id="meth-d" label="D" width={1280} height={520}><MethodologyD /></DCArtboard>}
        </DCSection>
      )}

      {!t.hideInsights && (
        <DCSection id="insights" title="Insights hub & article detail" subtitle="Direction B · the magazine-style hub + a representative long-form article layout.">
          {show('a') && <DCArtboard id="ins-a" label="A · Hub" width={1280} height={520}><InsightsHubA /></DCArtboard>}
          {show('b') && <DCArtboard id="ins-b" label="B · Hub" width={1280} height={2550}><InsightsHubB /></DCArtboard>}
          {show('c') && <DCArtboard id="ins-c" label="C · Hub" width={1280} height={520}><InsightsHubC /></DCArtboard>}
          {show('d') && <DCArtboard id="ins-d" label="D · Hub" width={1280} height={520}><InsightsHubD /></DCArtboard>}
          {show('a') && <DCArtboard id="art-a" label="A · Article" width={900} height={520}><ArticleA /></DCArtboard>}
          {show('b') && <DCArtboard id="art-b" label="B · Article" width={1280} height={3000}><ArticleB /></DCArtboard>}
          {show('c') && <DCArtboard id="art-c" label="C · Article" width={900} height={520}><ArticleC /></DCArtboard>}
          {show('d') && <DCArtboard id="art-d" label="D · Article" width={900} height={520}><ArticleD /></DCArtboard>}
        </DCSection>
      )}

      {!t.hideCaseStudies && (
        <DCSection id="cases" title="Case studies — index & detail" subtitle="Direction B · sectoral grid with NDA disclaimer + a representative long-form case study.">
          {show('a') && <DCArtboard id="cs-a" label="A · Index" width={1280} height={520}><CasesA /></DCArtboard>}
          {show('b') && <DCArtboard id="cs-b" label="B · Index" width={1280} height={3000}><CasesB /></DCArtboard>}
          {show('c') && <DCArtboard id="cs-c" label="C · Index" width={1280} height={520}><CasesC /></DCArtboard>}
          {show('d') && <DCArtboard id="cs-d" label="D · Index" width={1280} height={520}><CasesD /></DCArtboard>}
          {show('a') && <DCArtboard id="cd-a" label="A · Detail" width={1280} height={520}><CaseDetailA /></DCArtboard>}
          {show('b') && <DCArtboard id="cd-b" label="B · Detail" width={1280} height={3200}><CaseDetailB /></DCArtboard>}
          {show('c') && <DCArtboard id="cd-c" label="C · Detail" width={1280} height={520}><CaseDetailC /></DCArtboard>}
          {show('d') && <DCArtboard id="cd-d" label="D · Detail" width={1280} height={520}><CaseDetailD /></DCArtboard>}
        </DCSection>
      )}

      {!t.hideAbout && (
        <DCSection id="about" title="About / Founders" subtitle="Direction B · founders, origin story, beliefs, press.">
          {show('a') && <DCArtboard id="ab-a" label="A" width={1280} height={520}><AboutA /></DCArtboard>}
          {show('b') && <DCArtboard id="ab-b" label="B" width={1280} height={3450}><AboutB /></DCArtboard>}
          {show('c') && <DCArtboard id="ab-c" label="C" width={1280} height={520}><AboutC /></DCArtboard>}
          {show('d') && <DCArtboard id="ab-d" label="D" width={1280} height={520}><AboutD /></DCArtboard>}
        </DCSection>
      )}

      {!t.hideContact && (
        <DCSection id="contact" title="Contact / Apply" subtitle="Direction B · application form, direct contact, decision aids.">
          {show('a') && <DCArtboard id="ct-a" label="A" width={1280} height={520}><ContactA /></DCArtboard>}
          {show('b') && <DCArtboard id="ct-b" label="B" width={1280} height={2080}><ContactB /></DCArtboard>}
          {show('c') && <DCArtboard id="ct-c" label="C" width={1280} height={520}><ContactC /></DCArtboard>}
          {show('d') && <DCArtboard id="ct-d" label="D" width={1280} height={520}><ContactD /></DCArtboard>}
        </DCSection>
      )}

      <TweaksPanel title="Direction controls">
        <TweakSection label="Focus" />
        <TweakRadio
          label="Show direction"
          value={t.direction}
          options={['all', 'a', 'b', 'c', 'd']}
          onChange={(v) => setTweak('direction', v)}
        />
        <TweakSection label="Sections" />
        <TweakToggle label="Foundations" value={t.showFoundations} onChange={(v) => setTweak('showFoundations', v)} />
        <TweakToggle label="Offerings" value={!t.hideOfferingsOverview} onChange={(v) => setTweak('hideOfferingsOverview', !v)} />
        <TweakToggle label="How we work" value={!t.hideMethodology} onChange={(v) => setTweak('hideMethodology', !v)} />
        <TweakToggle label="Insights & articles" value={!t.hideInsights} onChange={(v) => setTweak('hideInsights', !v)} />
        <TweakToggle label="Case studies" value={!t.hideCaseStudies} onChange={(v) => setTweak('hideCaseStudies', !v)} />
        <TweakToggle label="About / Founders" value={!t.hideAbout} onChange={(v) => setTweak('hideAbout', !v)} />
        <TweakToggle label="Contact / Apply" value={!t.hideContact} onChange={(v) => setTweak('hideContact', !v)} />
      </TweaksPanel>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
