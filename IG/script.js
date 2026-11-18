/* IG sections. Shared builders come from case-study-kit/kit.js (headings, copy, role strip, timeline,
   annotation band, design question, three-card row, screen grid, info panel, contact, ending) and
   Turbo Hub's impact-future.js; copy lives in content.js. The builders below are IG's own:
   hero stickers, the brief quote, number rows, the variant bar chart, the component fixes,
   the before/after viewer and the challenge tags. Each of these is marked data-case-reveal-unit, so the
   kit's scroll reveal brings it in as one group, like Turbo Hub's page-owned groups. */

function createCopySection(id, title, paragraphs = []) {
  const section = createElement("section", "case-section");
  section.id = id;
  const column = createElement("div", "reading-column");
  column.append(createSectionHeading(title));
  if (paragraphs.length) appendParagraphs(column, paragraphs);
  section.append(column);
  return { section, column };
}

// A quiet subheading inside a section, like Framer's "The Component System".
function createSubheading(text) {
  return createElement("h3", "subsection-heading ig-subheading", text);
}

// A full-width band of screens, as in Framer: each screen sits at its Framer position inside a
// 1440 × 541 stage ([x, y, width, height]), and anything taller is cropped at the band's bottom edge.
// The stage scales with the page and stops growing at 1440px. The kit's shot caption sits under it.
function createScreenBand(items, caption) {
  const figure = createElement("figure", "ig-band");
  figure.dataset.caseRevealUnit = "";
  const stage = createElement("div", "ig-band__stage");
  items.forEach((item) => {
    const image = document.createElement("img");
    image.className = "ig-band__screen";
    image.src = item.src;
    image.alt = item.alt;
    image.width = item.width;
    image.height = item.height;
    image.loading = "lazy";
    image.decoding = "async";
    image.style.left = `${(item.x / 1440) * 100}%`;
    image.style.top = `${(item.y / 541) * 100}%`;
    image.style.width = `${(item.width / 1440) * 100}%`;
    image.style.height = `${(item.height / 541) * 100}%`;
    stage.append(image);
  });
  figure.append(stage);
  if (caption) figure.append(createElement("figcaption", "shot-caption", caption));
  return figure;
}

// Token and component stickers that sit around the hero title (decorative).
function renderHeroStickers(stickers) {
  const host = document.querySelector(".hero-stickers");
  if (!host) return;
  stickers.forEach((sticker) => {
    const image = document.createElement("img");
    image.className = `hero-sticker hero-sticker--${sticker.position}`;
    image.src = sticker.src;
    image.width = sticker.width;
    image.height = sticker.height;
    image.alt = "";
    image.decoding = "async";
    host.append(image);
  });
}

// The Framer device card: the card and device frames as one picture, the phone's screen, the tablet's
// bezel (it sits over the phone), then the tablet's screen. Each screen is a strip of slides that moves
// one slide left every `interval`, looping back to the first; it waits while off screen and stays on the
// first slide with reduced motion. The side flower note sits on the card's right edge, turned as in Framer.
function createDeviceGlimpse(devices, annotation) {
  const figure = createElement("figure", "ig-devices");
  figure.dataset.caseRevealUnit = "";
  figure.setAttribute("role", "img");
  figure.setAttribute("aria-label", devices.label);

  const frame = document.createElement("img");
  frame.className = "ig-devices__frame";
  frame.src = devices.frame.src;
  frame.width = devices.frame.width;
  frame.height = devices.frame.height;
  frame.alt = "";
  frame.decoding = "async";

  const strips = [];
  const createScreen = (kind, slides) => {
    const screen = createElement("div", `ig-devices__screen ig-devices__screen--${kind}`);
    screen.setAttribute("aria-hidden", "true");
    const strip = createElement("div", "ig-devices__strip");
    // The first slide again at the end, so the loop can return to it without a jump.
    [...slides, slides[0]].forEach((src) => {
      const slide = document.createElement("img");
      slide.src = src;
      slide.alt = "";
      slide.loading = "lazy";
      slide.decoding = "async";
      strip.append(slide);
    });
    screen.append(strip);
    strips.push({ strip, count: slides.length });
    return screen;
  };

  const bezel = document.createElement("img");
  bezel.className = "ig-devices__bezel";
  bezel.src = devices.bezel;
  bezel.alt = "";

  figure.append(frame, createScreen("phone", devices.phone), bezel, createScreen("tablet", devices.tablet));

  const note = createElement("div", "annotation-figure ig-devices__note");
  note.setAttribute("aria-hidden", "true");
  const mark = document.createElement("img");
  mark.className = "annotation-mark";
  mark.src = annotation.src;
  mark.alt = annotation.alt || "";
  mark.loading = "lazy";
  note.append(mark, createElement("p", "annotation-copy", annotation.text));
  figure.append(note);

  if (prefersStill()) return figure;
  let step = 0;
  let timer = null;
  const advance = () => {
    step += 1;
    strips.forEach(({ strip, count }) => {
      strip.classList.remove("is-resetting");
      strip.style.transform = `translateX(${-step * 100}%)`;
      if (step === count) {
        // On the copy of the first slide: once it has slid in, return to the real first slide unseen.
        strip.addEventListener("transitionend", () => {
          strip.classList.add("is-resetting");
          strip.style.transform = "translateX(0)";
        }, { once: true });
      }
    });
    if (step === strips[0].count) step = 0;
  };
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) timer = setInterval(advance, devices.interval);
    if (!entry.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }, { threshold: 0.2 }).observe(figure);
  return figure;
}

// The brief, quoted as it was given.
function createBrief(title, text) {
  const block = createElement("figure", "ig-brief");
  block.dataset.caseRevealUnit = "";
  block.append(createElement("figcaption", "ig-brief__title", title));
  const quote = createElement("blockquote", "ig-brief__quote");
  quote.append(createElement("p", "", text));
  block.append(quote);
  return block;
}

// A labelled step inside a section: small eyebrow, a title, then a lighter line.
function createStepHeader({ eyebrow, title, text }) {
  const header = createElement("header", "ig-step");
  header.dataset.caseRevealUnit = "";
  header.append(
    createElement("p", "ig-step__eyebrow", eyebrow),
    createElement("h3", "ig-step__title", title),
    createElement("p", "ig-step__text", text),
  );
  return header;
}

// How many versions of each component the audit found, as bars, with the worst case called out.
function createVariantBars({ bars, unit, callout }) {
  const figure = createElement("figure", "ig-bars");
  figure.dataset.caseRevealUnit = "";
  const max = Math.max(...bars.map((bar) => bar.value));
  const list = createElement("ul", "ig-bars__list");
  list.setAttribute("aria-label", "Variants found per component in the audit");
  bars.forEach((bar, index) => {
    const row = createElement("li", "ig-bars__row");
    row.style.setProperty("--bar-size", (bar.value / max).toFixed(3));
    row.style.setProperty("--bar-step", String(index));
    const track = createElement("span", "ig-bars__track");
    track.append(createElement("span", "ig-bars__fill"));
    track.setAttribute("aria-hidden", "true");
    row.append(
      createElement("span", "ig-bars__label", bar.label),
      track,
      createElement("strong", "ig-bars__value", `${bar.value} ${unit}`),
    );
    list.append(row);
  });
  const note = createElement("figcaption", "ig-bars__callout");
  note.append(createElement("strong", "", callout.value), createElement("span", "", callout.label));
  figure.append(list, note);
  return figure;
}

// Each component group: its problem and what I did, side by side, with a tag for the group.
function createComponentFixes(fixes) {
  const list = createElement("ul", "ig-fixes");
  fixes.forEach((fix) => {
    const item = createElement("li", "ig-fix");
    item.dataset.caseRevealUnit = "";
    const head = createElement("div", "ig-fix__head");
    head.append(
      createElement("h4", "ig-fix__title", fix.title),
      createElement("span", `ig-fix__tag ig-fix__tag--${fix.tone}`, fix.tag),
    );
    const body = createElement("dl", "ig-fix__body");
    const problem = createElement("div", "ig-fix__column");
    problem.append(createElement("dt", "", "Problem"), createElement("dd", "", fix.problem));
    if (fix.aside) problem.append(createElement("dd", "ig-fix__aside", fix.aside));
    if (fix.chips) {
      const chips = createElement("dd", "ig-fix__chips");
      fix.chips.forEach((chip) => chips.append(createElement("span", "", chip)));
      problem.append(chips);
    }
    const did = createElement("div", "ig-fix__column");
    did.append(createElement("dt", "", "What I did"), createElement("dd", "", fix.did));
    body.append(problem, did);
    item.append(head, body);
    list.append(item);
  });
  return list;
}

// Before, Analysis and After of one page, in a scrollable frame with zoom.
function createBeforeAfter(item, hint) {
  const block = createElement("article", "ig-compare");
  block.id = item.id;
  const intro = createElement("header", "ig-compare__intro");
  intro.dataset.caseRevealUnit = "";
  intro.append(createElement("h3", "ig-compare__title", item.title), createElement("p", "ig-compare__text", item.text));
  block.append(intro);

  const viewer = createElement("div", "ig-viewer");
  viewer.dataset.caseRevealUnit = "";
  const tabs = createElement("div", "ig-viewer__tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", `${item.title}: before, analysis and after`);

  const frame = createElement("div", "ig-viewer__frame");
  frame.tabIndex = 0;
  frame.setAttribute("role", "tabpanel");
  const image = document.createElement("img");
  image.className = "ig-viewer__image";
  image.loading = "lazy";
  image.decoding = "async";
  frame.append(image);

  const zoom = createElement("div", "ig-viewer__zoom");
  const zoomOut = createElement("button", "ig-viewer__zoom-step", "−");
  const zoomValue = createElement("output", "ig-viewer__zoom-value", "100%");
  const zoomIn = createElement("button", "ig-viewer__zoom-step ig-viewer__zoom-in", "+");
  const fit = createElement("button", "ig-viewer__fit", "Fit");
  [zoomOut, zoomIn, fit].forEach((button) => (button.type = "button"));
  zoomOut.setAttribute("aria-label", "Zoom out");
  zoomIn.setAttribute("aria-label", "Zoom in");
  fit.setAttribute("aria-label", "Fit the whole screen in the frame");
  zoom.append(zoomOut, zoomValue, zoomIn, fit);

  const hintNote = createElement("p", "ig-viewer__hint", hint);
  hintNote.setAttribute("aria-hidden", "true");

  let scale = 1;
  let fitted = false;
  const applyScale = () => {
    frame.classList.toggle("is-fitted", fitted);
    image.style.width = fitted ? "" : `${scale * 100}%`;
    zoomValue.textContent = fitted ? "Fit" : `${Math.round(scale * 100)}%`;
    zoomOut.disabled = !fitted && scale <= 0.5;
    zoomIn.disabled = !fitted && scale >= 2;
  };
  zoomOut.addEventListener("click", () => { fitted = false; scale = Math.max(0.5, scale - 0.25); applyScale(); });
  zoomIn.addEventListener("click", () => { fitted = false; scale = Math.min(2, scale + 0.25); applyScale(); });
  fit.addEventListener("click", () => { fitted = !fitted; applyScale(); });

  const buttons = item.views.map((view, index) => {
    const tab = createElement("button", "ig-viewer__tab", view.label);
    tab.type = "button";
    tab.id = `${item.id}-tab-${index}`;
    tab.setAttribute("role", "tab");
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", (event) => {
      const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      const next = (index + step + item.views.length) % item.views.length;
      select(next);
      buttons[next].focus();
    });
    tabs.append(tab);
    return tab;
  });

  function select(index) {
    const view = item.views[index];
    buttons.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    frame.setAttribute("aria-labelledby", buttons[index].id);
    image.src = view.src;
    image.alt = view.alt;
    image.width = view.width;
    image.height = view.height;
    frame.scrollTo({ top: 0, left: 0 });
  }

  select(0);
  applyScale();
  const stage = createElement("div", "ig-viewer__stage");
  stage.append(frame, zoom, hintNote);
  viewer.append(tabs, stage);
  block.append(viewer);
  return block;
}

function renderCaseStudy() {
  document.querySelector("#hero-title").textContent = caseStudy.hero.title;
  document.querySelector("#hero-summary").textContent = caseStudy.hero.summary;
  renderHeroStickers(caseStudy.hero.stickers);

  const shell = createElement("div", "content-shell");

  // TL;DR, then two glimpses of the work beside the side flower.
  const overview = createElement("section", "case-section");
  overview.id = "overview";
  const overviewColumn = createElement("div", "reading-column");
  overviewColumn.append(createElement("h2", "section-kicker", caseStudy.overview.kicker));
  appendParagraphs(overviewColumn, caseStudy.overview.paragraphs);
  const glimpse = createElement("div", "ig-glimpse");
  glimpse.append(
    createDeviceGlimpse(caseStudy.glimpse.devices, caseStudy.glimpse.annotation),
    createShotGrid(caseStudy.glimpse.shots),
  );
  overview.append(overviewColumn, glimpse);

  // The problem: context, the brief as given, then role, team and tools, then the timeline.
  const problem = createElement("section", "case-section");
  problem.id = "problem";
  const problemColumn = createElement("div", "reading-column");
  problemColumn.append(createSectionHeading(caseStudy.problem.title));
  appendParagraphs(problemColumn, caseStudy.problem.paragraphs);
  problemColumn.append(createBrief(caseStudy.problem.givenTitle, caseStudy.problem.brief));
  appendParagraphs(problemColumn, caseStudy.problem.after);
  const meta = createElement("dl", "meta-strip meta-strip--four detail-box");
  caseStudy.problem.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  const timeline = createElement("div", "ig-timeline");
  timeline.id = "timeline";
  timeline.append(createTimeline());
  problem.append(problemColumn, meta, timeline);

  // What the audit found on the ground.
  const { section: discovery } = createCopySection("discovery", caseStudy.discovery.title, caseStudy.discovery.paragraphs);
  const problemGrid = createShotGrid(caseStudy.discovery.problems);
  problemGrid.classList.add("ig-problem-grid");
  const discoveryEnd = createElement("div", "reading-column");
  appendParagraphs(discoveryEnd, [caseStudy.discovery.conclusion]);
  discoveryEnd.classList.add("ig-after-media");
  discovery.append(problemGrid, discoveryEnd);

  // How we approached it: the scale, the audit and the framework.
  const { section: approach, column: approachColumn } = createCopySection("approach", caseStudy.approach.title);
  const { scale, audit, framework } = caseStudy.approach;
  approachColumn.append(
    createStepHeader(scale),
    createStatRow(scale.stats, true),
    createStepHeader(audit),
    createVariantBars(audit),
    createStepHeader(framework),
    createTrio(framework.types, "boxed"),
  );
  approach.classList.add("ig-approach");

  // The component system.
  const { section: system, column: systemColumn } = createCopySection("system", caseStudy.system.title);
  systemColumn.append(createSubheading(caseStudy.system.subtitle));
  const systemCopy = appendParagraphs(systemColumn, caseStudy.system.paragraphs);
  const focus = createElement("ul", "ig-list");
  caseStudy.system.focus.forEach((line) => focus.append(createElement("li", "", line)));
  systemCopy.append(focus, createElement("p", "", caseStudy.system.totalsIntro));
  systemColumn.append(createStatRow(caseStudy.system.totals));
  appendParagraphs(systemColumn, [caseStudy.system.after]);
  const collage = createShotGrid([caseStudy.system.collage]);
  collage.classList.add("ig-collage");
  system.append(collage, createComponentFixes(caseStudy.system.fixes));

  // Design tokens: each group's copy, then its screens and one caption.
  const tokens = createElement("section", "case-section ig-tokens");
  tokens.id = "tokens";
  const tokensIntro = createElement("div", "reading-column");
  tokensIntro.append(createSubheading(caseStudy.tokens.subtitle));
  appendParagraphs(tokensIntro, [caseStudy.tokens.intro]);
  tokens.append(tokensIntro);
  caseStudy.tokens.groups.forEach((group) => {
    const column = createElement("div", "reading-column ig-token-copy");
    const copy = appendParagraphs(column, group.paragraphs);
    const first = copy.querySelector("p");
    first.prepend(createElement("strong", "ig-lead", group.lead), document.createTextNode(" "));
    tokens.append(column, createScreenBand(group.band, group.caption));
  });
  const tokensEnd = createElement("div", "reading-column ig-after-media");
  appendParagraphs(tokensEnd, [caseStudy.tokens.closing]);
  tokens.append(tokensEnd);

  // Page redesign: the four page types, each with its screens.
  const { section: pages } = createCopySection("pages", caseStudy.pages.title, [caseStudy.pages.intro]);
  caseStudy.pages.types.forEach((type) => {
    const block = createElement("div", "ig-page-type");
    block.id = type.id;
    const column = createElement("div", "reading-column");
    column.append(createSubheading(type.title));
    appendParagraphs(column, type.paragraphs);
    block.append(column, createScreenBand(type.band, type.caption));
    pages.append(block);
  });

  // Before and after.
  const { section: beforeAfter } = createCopySection("before-after", caseStudy.beforeAfter.title, caseStudy.beforeAfter.paragraphs);
  caseStudy.beforeAfter.items.forEach((item) => beforeAfter.append(createBeforeAfter(item, caseStudy.beforeAfter.hint)));

  // Design challenges, in the kit's numbered info panel (its own heading is not needed here).
  const { section: designChallenges, column: designChallengesColumn } = createCopySection("design-challenges", caseStudy.designChallenges.title, [caseStudy.designChallenges.intro]);
  const panel = createInfoPanel("", caseStudy.designChallenges.items);
  panel.querySelector(".info-panel-heading").remove();
  designChallengesColumn.append(panel);

  const { section: challenges, column: challengesColumn } = createCopySection("challenges", caseStudy.challenges.title, caseStudy.challenges.paragraphs);
  challengesColumn.append(createTagList(caseStudy.challenges.tags));

  // Results use Turbo Hub's impact-future component, so all three case studies end the same way.
  const impact = TurboImpactFuture.create(caseStudy.impactFuture);
  const { section: numbers } = createCopySection("numbers", caseStudy.numbers.title, caseStudy.numbers.paragraphs);

  shell.append(
    overview,
    createContactSection("contact"),
    problem,
    discovery,
    approach,
    createPullStatement(caseStudy.approachStatement),
    system,
    tokens,
    pages,
    createPullStatement(caseStudy.realisation),
    beforeAfter,
    designChallenges,
    challenges,
    impact,
    numbers,
    createContactSection("contact-end"),
    createCaseStudyEnding(),
  );

  contentRoot.replaceChildren(shell);
}

startCaseStudy(renderCaseStudy);
