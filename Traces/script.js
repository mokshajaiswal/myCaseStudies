/* Traces sections. Shared builders come from case-study-kit/kit.js (headings, copy, role strip, timeline,
   annotation band, phone, pull statements, three-card row, number rows, tags, shot grid, contact, ending);
   copy lives in content.js. The builders below are Traces' own: rich paragraphs, the survey sum, the
   insight cards, the guiding philosophy, the design process on paper, the sketch board, the flow strips,
   the drifting design columns, the example and the impact board. Each of them is marked
   data-case-reveal-unit, so the kit's scroll reveal brings it in as one group. */

// Paragraphs with Framer's emphasis: ***bold italic***, **bold**, *italic*, and \n for a line break.
// Built with text nodes, never HTML.
function appendRichParagraphs(parent, paragraphs) {
  const copy = createElement("div", "body-copy");
  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    paragraph.split("\n").forEach((line, index) => {
      if (index) p.append(document.createElement("br"));
      line.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/).forEach((part) => {
        if (!part) return;
        if (part.startsWith("***")) {
          const strong = createElement("strong");
          strong.append(createElement("em", "", part.slice(3, -3)));
          p.append(strong);
        } else if (part.startsWith("**")) p.append(createElement("strong", "", part.slice(2, -2)));
        else if (part.startsWith("*")) p.append(createElement("em", "", part.slice(1, -1)));
        else p.append(document.createTextNode(part));
      });
    });
    copy.append(p);
  });
  parent.append(copy);
  return copy;
}

function createCopySection(id, title, paragraphs = []) {
  const section = createElement("section", "case-section");
  section.id = id;
  const column = createElement("div", "reading-column");
  column.append(createSectionHeading(title));
  if (paragraphs.length) appendRichParagraphs(column, paragraphs);
  section.append(column);
  return { section, column };
}

function createList(items, ordered = false) {
  const list = createElement(ordered ? "ol" : "ul", "tr-list");
  items.forEach((item) => list.append(createElement("li", "", item)));
  return list;
}

function markUnit(element) {
  element.dataset.caseRevealUnit = "";
  return element;
}

// A video that loops muted while on screen (the kit's loop video), with controls to pause or replay it.
function createVideo(video, className) {
  const element = createLoopVideo({ video: video.src, src: video.poster, width: video.width, height: video.height, alt: video.label }, className);
  element.controls = true;
  return element;
}

// The kit's phone with a video playing on its screen.
function createVideoPhone(id, video) {
  const phone = createPhone({ id, label: video.label });
  phone.querySelector(".media-slot").replaceChildren(createVideo(video, "tr-phone-video"));
  return phone;
}

// "Some data": three survey numbers added together into the confidence to pursue the idea.
function createSurveySum(survey) {
  const box = markUnit(createElement("figure", "tr-sum detail-box"));
  const heading = createElement("figcaption", "tr-sum__title");
  heading.append(createElement("strong", "", survey.title), document.createTextNode(" "), createElement("em", "", survey.aside));
  const sum = createElement("dl", "tr-sum__row");
  survey.stats.forEach((stat, index) => {
    if (index) sum.append(createElement("span", "tr-sum__operator", "+"));
    const item = createElement("div", "stat");
    item.append(createElement("dt", "stat__value", stat.value), createElement("dd", "stat__label", stat.label));
    sum.append(item);
  });
  sum.append(createElement("span", "tr-sum__operator", "="), createElement("p", "tr-sum__result", survey.result));
  sum.querySelectorAll(".tr-sum__operator").forEach((operator) => operator.setAttribute("aria-hidden", "true"));
  box.append(heading, sum);
  return box;
}

// The four insights, each with what it meant for the design.
function createInsightCards(insights) {
  const list = createElement("ol", "tr-insights");
  insights.items.forEach((item, index) => {
    const card = markUnit(createElement("li", "tr-insight"));
    card.append(
      createElement("span", "tr-insight__number", String(index + 1)),
      createElement("h3", "tr-insight__title", item.title),
      createElement("p", "tr-insight__label", insights.label),
      createElement("p", "tr-insight__text", item.implication),
    );
    list.append(card);
  });
  return list;
}

function createPhilosophy(philosophy) {
  const card = markUnit(createElement("aside", "tr-philosophy"));
  card.style.setProperty("--frame", `url("${philosophy.frame}")`);
  card.append(createElement("h3", "tr-philosophy__title", philosophy.title), createElement("p", "tr-philosophy__text", philosophy.text));
  return card;
}

// System thinking to real-world testing, and the loop between them.
function createProcessDiagram(process) {
  const figure = markUnit(createElement("figure", "tr-diagram"));
  const ends = createElement("div", "tr-diagram__ends");
  [process.from, process.to].forEach((end, index) => {
    if (index) {
      const arrow = createElement("span", "tr-diagram__arrow", "→");
      arrow.setAttribute("aria-hidden", "true");
      ends.append(arrow);
    }
    const item = createElement("div", "tr-diagram__end");
    item.append(createElement("strong", "", end.title), createElement("span", "", end.note));
    ends.append(item);
  });
  const loop = createElement("ol", "tr-diagram__loop");
  process.loop.forEach((step, index) => {
    if (index) {
      const arrow = createElement("li", "tr-diagram__step-arrow", "→");
      arrow.setAttribute("aria-hidden", "true");
      loop.append(arrow);
    }
    loop.append(createElement("li", "tr-diagram__step", step));
  });
  figure.append(ends, loop);
  return figure;
}

// The two tracks of the design process on lined paper: system thinking on the left, then real-world
// testing on the right, lower down, as in Framer.
function createProcessTracks(process) {
  const band = createElement("div", "tr-paper");
  band.style.setProperty("--paper", `url("${process.paper}")`);
  const inner = createElement("div", "tr-paper__inner");
  process.tracks.forEach((track) => {
    const column = createElement("div", `tr-track tr-track--${track.direction}`);
    const head = markUnit(createElement("header", "tr-track__head"));
    const title = createElement("h3", "tr-track__title");
    title.append(document.createTextNode(track.title), document.createElement("br"), createElement("em", "", track.aside));
    const arrow = createElement("span", "tr-track__arrow", track.direction === "forward" ? "→" : "←");
    arrow.setAttribute("aria-hidden", "true");
    head.append(title, arrow);
    column.append(head);
    track.cards.forEach((item) => {
      const card = markUnit(createElement("article", "tr-track__card"));
      card.append(createElement("h4", "", item.title), createElement("p", "", item.text));
      column.append(card);
    });
    inner.append(column);
  });
  band.append(inner);
  return band;
}

// The first WebXR trial in a phone beside the lo-fi sketches and their sticky notes.
function createSketchBoard(idea) {
  const figure = markUnit(createElement("figure", "tr-sketches"));
  figure.setAttribute("aria-label", idea.sketches.alt);
  const image = document.createElement("img");
  image.className = "tr-sketches__board";
  image.src = idea.sketches.src;
  image.width = idea.sketches.width;
  image.height = idea.sketches.height;
  image.alt = idea.sketches.alt;
  image.loading = "lazy";
  image.decoding = "async";
  const phone = createVideoPhone("first-webxr-trial", idea.video);
  phone.classList.add("tr-sketches__phone");
  figure.append(image, phone);
  return figure;
}

// A flow's screens in a row that scrolls sideways, starting on the reading column's left edge.
function createFlowStrip(screens) {
  const strip = markUnit(createElement("div", "tr-strip"));
  strip.tabIndex = 0;
  strip.setAttribute("role", "region");
  strip.setAttribute("aria-label", "Flow screens, scroll sideways to see more");
  const row = createElement("div", "tr-strip__row");
  screens.forEach((screen) => {
    const image = document.createElement("img");
    image.src = screen.src;
    image.alt = screen.alt;
    image.width = screen.width;
    image.height = screen.height;
    image.loading = "lazy";
    image.decoding = "async";
    if (screen.fit) image.style.objectFit = screen.fit;
    row.append(image);
  });
  strip.append(row);
  return strip;
}

// Four columns of finished screens that drift upwards on a loop, fading at the top and bottom.
// With reduced motion they stay still.
function createDesignColumns(designs) {
  const figure = markUnit(createElement("figure", "tr-designs"));
  figure.setAttribute("role", "img");
  figure.setAttribute("aria-label", designs.alt);
  designs.columns.forEach((column) => {
    const track = createElement("div", "tr-designs__column");
    track.style.setProperty("--offset", column.offset);
    const reel = createElement("div", "tr-designs__reel");
    [0, 1].forEach(() => {
      const image = document.createElement("img");
      image.src = column.src;
      image.width = column.width;
      image.height = column.height;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      reel.append(image);
    });
    track.append(reel);
    figure.append(track);
  });
  return figure;
}

// The example: a phone with friends trying Traces, beside the scenarios.
function createExample(example) {
  const block = createElement("div", "tr-example");
  const column = createElement("div", "reading-column");
  column.append(createElement("h3", "subsection-heading tr-subheading", example.title));
  appendRichParagraphs(column, example.paragraphs);
  const split = markUnit(createElement("div", "tr-example__split"));
  const list = createElement("ul", "tr-example__scenarios");
  example.scenarios.forEach((scenario) => list.append(createElement("li", "", scenario)));
  split.append(createVideoPhone("friends-trying-traces", example.video), list);
  block.append(column, split);
  return block;
}

// Photos and quotes from testing around one statement, at their Framer positions in a 1440 × 1250 stage.
function createImpactBoard(impact) {
  const board = createElement("div", "tr-impact");
  const stage = createElement("div", "tr-impact__stage");
  impact.notes.forEach((note) => {
    const image = markUnit(document.createElement("img"));
    image.className = "tr-impact__note";
    image.src = note.src;
    image.alt = note.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.style.left = `${(note.x / 1440) * 100}%`;
    image.style.top = `${(note.y / 1250) * 100}%`;
    image.style.width = `${(note.width / 1440) * 100}%`;
    stage.append(image);
  });
  const statement = createElement("div", "tr-impact__statement");
  statement.style.top = `${(impact.statementTop / 1250) * 100}%`;
  const title = createElement("p", "design-question-title");
  title.append(createElement("span", "design-question-line", impact.statement));
  statement.append(createElement("p", "design-question-eyebrow", impact.eyebrow), title);
  stage.append(statement);
  board.append(stage);
  return board;
}

function renderCaseStudy() {
  document.querySelector("#hero-title").textContent = caseStudy.hero.title;
  document.querySelector("#hero-summary").textContent = caseStudy.hero.summary;

  const shell = createElement("div", "content-shell");

  // TL;DR and the three home screens.
  const overview = createElement("section", "case-section");
  overview.id = "overview";
  const overviewColumn = createElement("div", "reading-column");
  overviewColumn.append(createElement("h2", "section-kicker", caseStudy.overview.kicker));
  appendRichParagraphs(overviewColumn, caseStudy.overview.paragraphs);
  overview.append(overviewColumn, createShotGrid([caseStudy.overview.shot]));

  // What Traces is, then category, role, team and tools.
  const { section: product } = createCopySection("product", caseStudy.product.title, caseStudy.product.paragraphs);
  const meta = createElement("dl", "meta-strip meta-strip--four detail-box");
  caseStudy.product.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  product.append(meta);

  // What I did, and the product walkthrough in a phone beside the side flower.
  const { section: skills, column: skillsColumn } = createCopySection("skills", caseStudy.skills.title);
  skillsColumn.append(createTagList(caseStudy.skills.tags));
  const walkthrough = createElement("div", "tr-walkthrough");
  walkthrough.append(createVideoPhone("product-walkthrough", caseStudy.skills.video));
  skills.append(createAnnotationBand(walkthrough, caseStudy.skills.annotation));

  const timeline = createElement("section", "case-section");
  timeline.id = "timeline";
  timeline.setAttribute("aria-label", caseStudy.timeline.title);
  timeline.append(createTimeline());

  // The problem: the copy, three gaps, the survey sum, then what neither tool does.
  const { problem } = caseStudy;
  const { section: problemSection, column: problemColumn } = createCopySection("problem", problem.title, problem.paragraphs);
  problemColumn.querySelector(".body-copy").append(createList(problem.efficiency));
  appendRichParagraphs(problemColumn, problem.after).classList.add("tr-copy-follow");
  const problemEnd = createElement("div", "reading-column tr-after-media");
  appendRichParagraphs(problemEnd, problem.closing);
  problemSection.append(createTrio(problem.gaps, "boxed"), createSurveySum(problem.survey), problemEnd);
  problemSection.classList.add("tr-problem");

  // Validating the idea: the questions, the numbers, the research collage, then the three phases.
  const { validate } = caseStudy;
  const { section: validateSection, column: validateColumn } = createCopySection("validate", validate.title, validate.paragraphs);
  validateColumn.querySelector(".body-copy").append(createList(validate.questions, true), createElement("p", "", validate.after));
  validateColumn.append(createStatRow(validate.stats));
  const collage = createShotGrid([validate.collage]);
  collage.classList.add("tr-collage");
  validateSection.append(collage);
  caseStudy.phases.forEach((phase) => {
    const block = createElement("div", "reading-column tr-phase");
    block.id = phase.id;
    const heading = createElement("h3", "tr-phase__title");
    heading.append(createElement("strong", "", phase.lead), document.createTextNode(" " + phase.title));
    block.append(heading);
    const copy = appendRichParagraphs(block, phase.paragraphs);
    if (phase.bullets) copy.append(createList(phase.bullets));
    if (phase.after) phase.after.forEach((line) => copy.append(createElement("p", "", line)));
    if (phase.tags) block.append(createTagList(phase.tags));
    validateSection.append(block);
  });

  // Four insights and the guiding philosophy.
  const { section: insights, column: insightsColumn } = createCopySection("insights", caseStudy.insights.title, [caseStudy.insights.intro]);
  insightsColumn.append(createInsightCards(caseStudy.insights), createPhilosophy(caseStudy.insights.philosophy));

  // The design process: the copy and flower note, the diagram, then the two tracks on paper.
  const { process } = caseStudy;
  const { section: processSection, column: processColumn } = createCopySection("process", process.title, process.paragraphs);
  processColumn.append(createAnnotationBand(createProcessDiagram(process), { ...process.annotation, left: true }));
  processColumn.querySelector(".annotation-figure")?.classList.add("annotation-figure--left");
  processSection.append(createProcessTracks(process));

  // Challenges, then the initial idea.
  const { challenges } = caseStudy;
  const { section: challengesSection, column: challengesColumn } = createCopySection("challenges", challenges.title, challenges.paragraphs);
  challengesColumn.append(createTagList(challenges.tags));
  const idea = createElement("div", "tr-idea");
  const ideaColumn = createElement("div", "reading-column");
  ideaColumn.append(createElement("h3", "subsection-heading tr-subheading tr-caps", challenges.idea.title));
  appendRichParagraphs(ideaColumn, [challenges.idea.text]);
  idea.append(ideaColumn, createSketchBoard(challenges.idea));
  challengesSection.append(idea);

  // The three flows, each with its screens in a sideways strip.
  const { section: flows } = createCopySection("flows", caseStudy.flows.title, [caseStudy.flows.intro]);
  caseStudy.flows.items.forEach((flow) => {
    const block = createElement("div", "tr-flow");
    block.id = flow.id;
    const column = createElement("div", "reading-column");
    column.append(createElement("h3", "subsection-heading tr-subheading tr-caps", flow.title));
    appendRichParagraphs(column, [flow.text]);
    column.append(createTagList(flow.tags));
    block.append(column, createFlowStrip(flow.screens));
    flows.append(block);
  });

  // The finished designs.
  const designs = createElement("section", "case-section tr-designs-section");
  designs.id = "designs";
  const designsTitle = createElement("h2", "tr-designs__title", caseStudy.designs.title);
  designs.append(designsTitle, createDesignColumns(caseStudy.designs));

  // How it was presented, and an example with friends.
  const { present } = caseStudy;
  const { section: presentSection, column: presentColumn } = createCopySection("present", present.title, present.paragraphs);
  presentColumn.append(createTagList(present.tags));
  const presentation = createElement("div", "tr-presentation");
  presentation.append(createVideo(present.video, "tr-presentation__video"));
  presentSection.append(createAnnotationBand(presentation, present.annotation), createExample(present.example));

  // Impact and future: the copy, the board from testing, then what comes next.
  const { impact } = caseStudy;
  const { section: impactSection, column: impactColumn } = createCopySection("impact", impact.title, impact.paragraphs);
  impactColumn.append(createTagList(impact.tags));
  const future = createElement("div", "reading-column tr-future");
  future.append(createElement("h3", "subsection-heading tr-subheading tr-caps", impact.future.title));
  appendRichParagraphs(future, impact.future.paragraphs);
  const futureTags = createTagList(impact.future.tags);
  futureTags.classList.add("tag-list--stacked");
  future.append(futureTags);
  impactSection.append(createImpactBoard(impact), future);

  shell.append(
    overview,
    product,
    skills,
    createContactSection("contact"),
    timeline,
    problemSection,
    createPullStatement(caseStudy.opportunity),
    validateSection,
    createPullStatement(caseStudy.insightStatement),
    insights,
    processSection,
    challengesSection,
    flows,
    designs,
    presentSection,
    impactSection,
    createContactSection("contact-end"),
    createCaseStudyEnding(),
  );

  contentRoot.replaceChildren(shell);
}

startCaseStudy(renderCaseStudy);
