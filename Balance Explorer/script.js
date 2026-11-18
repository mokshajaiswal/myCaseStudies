/* Balance Explorer sections. Shared builders come from case-study-kit/kit.js; copy lives in content.js.
   Text sits in one reading column; screens sit straight on the page at the wide width, with no stages or cards. */

function createCopySection(id, title, paragraphs) {
  const section = createElement("section", "case-section");
  section.id = id;
  const column = createElement("div", "reading-column");
  column.append(createSectionHeading(title));
  appendParagraphs(column, paragraphs);
  section.append(column);
  return { section, column };
}

// Story beats: a line, then a quieter line that answers it.
function createBeats(beats, modifier = "") {
  const list = createElement("dl", `story-beats ${modifier}`.trim());
  beats.forEach(({ lead, aside }) => {
    const beat = createElement("div", "story-beat");
    beat.append(createElement("dt", "", lead), createElement("dd", "", aside));
    list.append(beat);
  });
  return list;
}

// The context flow: one card payment followed from swipe to books, drawn in the page rather than as a picture.
function createFlowDiagram(steps) {
  const figure = createElement("figure", "flow-diagram");
  figure.setAttribute("aria-label", steps.map((step) => step.title).join(", then "));
  const list = createElement("ol", "flow-steps");
  steps.forEach((step, index) => {
    const item = createElement("li", "flow-step");
    const head = createElement("div", "flow-step__head");
    head.append(createElement("strong", "flow-step__title", step.title));
    // The arrow fills the space after the title, up to the next step, and sits in its middle.
    if (index < steps.length - 1) {
      const arrow = createElement("span", "flow-arrow");
      arrow.setAttribute("aria-hidden", "true");
      head.append(arrow);
    }
    item.append(head, createElement("span", "flow-step__note", step.note));
    list.append(item);
  });
  figure.append(list);
  return figure;
}

// Each team and its question, nothing else.
function createPersonaQuotes(personas) {
  const list = createElement("ul", "persona-grid");
  personas.forEach((persona) => {
    const item = createElement("li", "persona");
    item.append(createElement("p", "persona-role", persona.role), createElement("p", "persona-question", persona.question));
    list.append(item);
  });
  return list;
}

// Other directions I tried, one sentence each: the idea, then why it didn't stay.
function createTried(title, items) {
  const block = createElement("section", "tried");
  block.append(createElement("h3", "tried-title", title));
  const list = createElement("ul", "tried-list");
  items.forEach((item) => {
    const row = createElement("li", "tried-item");
    row.append(createElement("strong", "", item.title), document.createTextNode(" "), createElement("span", "tried-why", item.description));
    list.append(row);
  });
  block.append(list);
  return block;
}

// The TLDR screen: a still or loop inside a browser window on a soft stage.
function createBrowserShot(shot) {
  const wrap = createElement("div", "screen-shot");
  wrap.append(createBrowserMockup(shot), createElement("p", "screen-caption", shot.caption));
  return wrap;
}

function createBrowserMockup(shot) {
  // The TLDR runs the prototype on a desktop monitor instead (product-demo.js).
  if (shot.demo) return createProductDemo(shot);
  const stage = createElement("figure", "mockup-stage");
  stage.setAttribute("aria-label", shot.caption);
  const browser = createElement("div", "browser-mock");
  const bar = createElement("div", "browser-mock__bar");
  bar.setAttribute("aria-hidden", "true");
  const dots = createElement("span", "browser-mock__dots");
  dots.append(createElement("span"), createElement("span"), createElement("span"));
  bar.append(dots, createElement("span", "browser-mock__address", shot.address));
  browser.append(bar, shot.video ? createLoopVideo(shot, "browser-mock__screen") : createStillImage(shot, "browser-mock__screen"));
  stage.append(browser);
  return stage;
}

// A decision, in one calm rhythm: the question, a short setup, three beats in a row,
// the main loop at full width, the other screens, then what I tried first.
function createDecision(decision) {
  const { section, column } = createCopySection(decision.id, decision.title, decision.paragraphs);
  section.classList.add("decision");
  column.append(createBeats(decision.beats, "story-beats--row"));
  section.append(createShotGrid(decision.shots), createTried(decision.triedTitle, decision.tried));
  return section;
}

function renderCaseStudy() {
  document.querySelector("#hero-title").textContent = caseStudy.hero.title;
  document.querySelector("#hero-summary").textContent = caseStudy.hero.summary;

  const shell = createElement("div", "content-shell");

  const overview = createElement("section", "case-section");
  overview.id = "overview";
  const overviewColumn = createElement("div", "reading-column");
  overviewColumn.append(createElement("h2", "section-kicker", caseStudy.overview.kicker));
  appendParagraphs(overviewColumn, caseStudy.overview.paragraphs);
  overview.append(overviewColumn, createBrowserShot(caseStudy.screens.hero));

  const { section: product } = createCopySection("product", caseStudy.product.title, caseStudy.product.paragraphs);
  product.append(createFlowDiagram(caseStudy.product.diagram));

  // Problem, kept minimal: a short paragraph, the three costs as plain columns, then the role and team strip.
  const problem = createElement("section", "case-section problem");
  problem.id = "problem";
  const problemColumn = createElement("div", "reading-column");
  problemColumn.append(createSectionHeading(caseStudy.problem.title));
  appendParagraphs(problemColumn, caseStudy.problem.paragraphs);
  const meta = createElement("dl", "meta-strip detail-box");
  caseStudy.problem.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  problem.append(problemColumn, createTrio(caseStudy.problem.costs), meta);

  // Who it's for: kept minimal, each team and its question.
  const people = createElement("section", "case-section people");
  people.id = "people";
  const peoplePanel = createElement("div", "people-panel");
  peoplePanel.append(
    createSectionHeading(caseStudy.people.title),
    createElement("p", "section-intro", caseStudy.people.intro),
    createPersonaQuotes(caseStudy.people.personas),
  );
  people.append(peoplePanel);

  const designQuestion = createElement("section", "case-section design-question");
  designQuestion.id = "design-question";
  designQuestion.setAttribute("aria-labelledby", "design-question-title");
  const designQuestionTitle = createElement("h2", "design-question-title");
  designQuestionTitle.id = "design-question-title";
  caseStudy.designQuestion.lines.forEach((line) => {
    designQuestionTitle.append(createElement("span", "design-question-line", line));
  });
  designQuestion.append(
    createElement("p", "design-question-eyebrow", caseStudy.designQuestion.eyebrow),
    designQuestionTitle,
  );

  // Where it started: one paragraph and the earlier screen, before the decisions.
  const { section: earlier } = createCopySection("earlier", caseStudy.earlier.title, caseStudy.earlier.paragraphs);
  earlier.append(createShotGrid([caseStudy.earlier.shot]));

  // Loading, errors and empty states follow the same rhythm: copy, then its screens.
  const { section: trust } = createCopySection("trust", caseStudy.trust.title, caseStudy.trust.paragraphs);
  trust.append(createShotGrid(caseStudy.trust.shots));

  // Impact uses Turbo Hub's impact-future component, so the two case studies end the same way.
  const impact = TurboImpactFuture.create(caseStudy.impactFuture);

  // The kit builds the learnings and the ending.
  const ending = createCaseStudyEnding();

  shell.append(
    overview,
    product,
    problem,
    people,
    designQuestion,
    earlier,
    ...caseStudy.decisions.map(createDecision),
    trust,
    impact,
    createContactSection("contact-end"),
    ending,
  );

  contentRoot.replaceChildren(shell);
}

startCaseStudy(renderCaseStudy);
