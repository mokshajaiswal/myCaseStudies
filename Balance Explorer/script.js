/* Balance Explorer sections. Shared builders come from case-study-kit/kit.js; copy lives in content.js. */

function createCopySection(id, title, paragraphs) {
  const section = createElement("section", "case-section");
  section.id = id;
  const column = createElement("div", "reading-column");
  column.append(createSectionHeading(title));
  appendParagraphs(column, paragraphs);
  section.append(column);
  return { section, column };
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
  overview.append(overviewColumn, createScreenFrame(caseStudy.screens.overview));

  const product = createElement("section", "case-section");
  product.id = "product";
  const productColumn = createElement("div", "reading-column");
  productColumn.append(createSectionHeading(caseStudy.product.title));
  appendParagraphs(productColumn, [caseStudy.product.lead, ...caseStudy.product.paragraphs]);
  const meta = createElement("dl", "meta-strip detail-box");
  caseStudy.product.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  product.append(productColumn, meta);

  const timeline = createElement("section", "case-section");
  timeline.id = "timeline";
  timeline.setAttribute("aria-label", caseStudy.timeline.title);
  timeline.append(createTimeline());

  const problem = createCopySection("problem", caseStudy.problem.title, caseStudy.problem.paragraphs);
  problem.column.append(createInfoPanel(caseStudy.problem.goalsTitle, caseStudy.problem.goals));

  const metrics = createElement("section", "case-section");
  metrics.id = "metrics";
  const metricsColumn = createElement("div", "reading-column");
  metricsColumn.append(
    createSectionHeading(caseStudy.outcomes.measuresTitle),
    createOutcomeGrid(
      caseStudy.outcomes.measures.map((measure, index) => ({
        ...measure,
        number: String(index + 1).padStart(2, "0") + ".",
      })),
    ),
  );
  metrics.append(metricsColumn);

  const research = createElement("section", "case-section");
  research.id = "research";
  const researchColumn = createElement("div", "reading-column");
  researchColumn.append(
    createSectionHeading(caseStudy.research.title),
    createElement("p", "section-intro", caseStudy.research.intro),
    createExperienceGrid(caseStudy.research.needs),
  );
  research.append(researchColumn);

  const designQuestion = createElement("section", "case-section design-question");
  designQuestion.id = "design-question";
  designQuestion.setAttribute("aria-labelledby", "design-question-title");
  const designQuestionTitle = createElement("h2", "design-question-title");
  designQuestionTitle.id = "design-question-title";
  const questionBreak = caseStudy.designQuestion.question.indexOf(" while ");
  if (questionBreak !== -1) {
    designQuestionTitle.append(
      createElement("span", "design-question-line", caseStudy.designQuestion.question.slice(0, questionBreak)),
      createElement("span", "design-question-line", caseStudy.designQuestion.question.slice(questionBreak + 1)),
    );
  } else {
    designQuestionTitle.textContent = caseStudy.designQuestion.question;
  }
  designQuestion.append(
    createElement("p", "design-question-eyebrow", caseStudy.designQuestion.eyebrow),
    designQuestionTitle,
  );

  const design = createCopySection("design", caseStudy.design.title, caseStudy.design.paragraphs);
  design.section.append(createScreenFrame(caseStudy.screens.workbench));

  shell.append(
    overview,
    product,
    timeline,
    problem.section,
    metrics,
    research,
    designQuestion,
    design.section,
    createContactSection("contact-end"),
    createCaseStudyEnding(),
  );

  contentRoot.replaceChildren(shell);
}

startCaseStudy(renderCaseStudy);
