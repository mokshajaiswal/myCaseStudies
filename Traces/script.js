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
  const panel = createElement("div", "tr-philosophy__panel");
  panel.append(createElement("h3", "tr-philosophy__title", philosophy.title), createElement("p", "tr-philosophy__text", philosophy.text));
  card.append(panel);
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

// The pictures behind one track's cards. Each card's pictures keep their Framer arrangement, but every set is
// scaled on its own to fill as much of the stage as it can, so a small cluster isn't drawn at the size of the
// largest one. Pieces are placed in percentages of their own set (with a little room for their rotation).
function createRevealStage(track) {
  const bounds = (pieces, pad = 0.02) => {
    const left = Math.min(...pieces.map((p) => p.x - p.w / 2));
    const top = Math.min(...pieces.map((p) => p.y - p.h / 2));
    const width = Math.max(...pieces.map((p) => p.x + p.w / 2)) - left;
    const height = Math.max(...pieces.map((p) => p.y + p.h / 2)) - top;
    return { left: left - width * pad, top: top - height * pad, width: width * (1 + pad * 2), height: height * (1 + pad * 2) };
  };
  const all = bounds(track.cards.flatMap((card) => card.reveal || []));
  const stageRatio = all.width / all.height;

  const stage = createElement("div", `tr-reveal tr-reveal--${track.direction}`);
  stage.setAttribute("aria-hidden", "true");
  const frame = createElement("div", "tr-reveal__frame");
  frame.style.aspectRatio = `${all.width} / ${all.height}`;
  frame.style.setProperty("--ratio", stageRatio.toFixed(3));
  const sets = track.cards.map((card) => {
    const set = createElement("div", "tr-reveal__set");
    const pieces = card.reveal || [];
    if (pieces.length) {
      const box = bounds(pieces);
      const ratio = box.width / box.height;
      // Fit the set inside the stage ("contain") and centre it.
      const size = card.revealSize ?? 1;
      const width = (ratio > stageRatio ? 100 : (ratio / stageRatio) * 100) * size;
      const height = (ratio > stageRatio ? (stageRatio / ratio) * 100 : 100) * size;
      Object.assign(set.style, { width: `${width}%`, height: `${height}%`, left: `${(100 - width) / 2}%`, top: `${(100 - height) / 2}%` });
      pieces.forEach((piece, index) => {
        const image = document.createElement("img");
        image.className = "tr-reveal__piece";
        image.src = piece.src;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        image.draggable = false;
        image.style.left = `${((piece.x - piece.w / 2 - box.left) / box.width) * 100}%`;
        image.style.top = `${((piece.y - piece.h / 2 - box.top) / box.height) * 100}%`;
        image.style.width = `${(piece.w / box.width) * 100}%`;
        image.style.height = `${(piece.h / box.height) * 100}%`;
        image.style.setProperty("--rot", `${piece.rot}deg`);
        image.style.setProperty("--delay", `${index * 70}ms`);
        set.append(image);
      });
    }
    frame.append(set);
    return set;
  });
  stage.append(frame);
  return { stage, sets };
}

// The two tracks of the design process on lined paper: system thinking on the left, then real-world
// testing on the right, lower down, as in Framer. Hovering, focusing or tapping a card brings its pictures
// in beside the track (on the right for the first track, on the left for the second); they stay while the
// pointer is over the track, so moving between cards swaps them instead of flashing them out and in.
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

    const { stage, sets } = createRevealStage(track);
    const cards = [];
    const show = (index) => {
      cards.forEach((card, i) => card.classList.toggle("is-active", i === index));
      sets.forEach((set, i) => set.classList.toggle("is-shown", i === index));
    };

    track.cards.forEach((item, index) => {
      const card = markUnit(createElement("article", "tr-track__card"));
      card.tabIndex = 0;
      card.append(createElement("h4", "", item.title), createElement("p", "", item.text));
      card.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") show(index); });
      card.addEventListener("focus", () => show(index));
      card.addEventListener("click", () => show(index));
      cards.push(card);
      column.append(card);
    });
    column.addEventListener("pointerleave", (event) => { if (event.pointerType === "mouse" && !column.contains(document.activeElement)) show(-1); });
    column.addEventListener("focusout", (event) => { if (!column.contains(event.relatedTarget)) show(-1); });

    inner.append(column, stage);
  });
  band.append(inner);
  return band;
}

// "Glimpse of my research work": Framer's board of photos, documents and tape. Every piece can be picked up
// and dragged (with a mouse, a finger moved sideways first, or the arrow keys); the one you pick up comes to
// the top. "Tidy up" puts everything back. Offsets are kept in board widths, so they survive a resize.
function createResearchCanvas(canvas) {
  const figure = markUnit(createElement("figure", "tr-canvas"));
  figure.setAttribute("aria-label", canvas.label);
  const board = createElement("div", "tr-canvas__board");
  board.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
  let top = canvas.pieces.length;
  const moved = new Set();

  const reset = createElement("button", "tr-canvas__reset", "Tidy up");
  reset.type = "button";
  reset.hidden = true;

  const place = (piece, dx, dy) => {
    piece.dataset.dx = dx;
    piece.dataset.dy = dy;
    piece.style.setProperty("--dx", dx);
    piece.style.setProperty("--dy", dy);
    if (dx || dy) moved.add(piece);
    else moved.delete(piece);
    reset.hidden = moved.size === 0;
  };

  canvas.pieces.forEach((item, index) => {
    const piece = document.createElement("img");
    piece.className = `tr-canvas__piece tr-canvas__piece--${item.kind}`;
    piece.src = item.src;
    piece.alt = item.alt;
    piece.loading = "lazy";
    piece.decoding = "async";
    piece.draggable = false;
    piece.style.left = `${((item.x - item.w / 2) / canvas.width) * 100}%`;
    piece.style.top = `${((item.y - item.h / 2) / canvas.height) * 100}%`;
    piece.style.width = `${(item.w / canvas.width) * 100}%`;
    piece.style.height = `${(item.h / canvas.height) * 100}%`;
    piece.style.setProperty("--rot", `${item.rot}deg`);
    piece.style.zIndex = index + 1;
    // Photos and documents can be reached with the keyboard; tape and the highlighter are decoration.
    if (item.alt) {
      piece.tabIndex = 0;
      piece.setAttribute("role", "img");
      piece.setAttribute("aria-roledescription", "movable picture");
    } else piece.setAttribute("aria-hidden", "true");
    place(piece, 0, 0);

    let start = null;
    piece.addEventListener("pointerdown", (event) => {
      if (event.button) return;
      start = { x: event.clientX, y: event.clientY, dx: +piece.dataset.dx, dy: +piece.dataset.dy, width: board.clientWidth };
      piece.setPointerCapture(event.pointerId);
      piece.style.zIndex = ++top;
      piece.classList.add("is-dragging");
      board.classList.add("is-busy");
    });
    piece.addEventListener("pointermove", (event) => {
      if (!start) return;
      place(piece, start.dx + (event.clientX - start.x) / start.width, start.dy + (event.clientY - start.y) / start.width);
    });
    const drop = () => {
      start = null;
      piece.classList.remove("is-dragging");
      board.classList.remove("is-busy");
    };
    piece.addEventListener("pointerup", drop);
    piece.addEventListener("pointercancel", drop);
    piece.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 0.05 : 0.01;
      const keys = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (!keys[event.key]) return;
      event.preventDefault();
      piece.style.zIndex = ++top;
      place(piece, +piece.dataset.dx + keys[event.key][0], +piece.dataset.dy + keys[event.key][1]);
    });
    board.append(piece);
  });

  const title = createElement("p", "tr-canvas__title");
  title.setAttribute("aria-hidden", "true");
  canvas.title.forEach((line) => title.append(createElement("span", "", line)));
  board.append(title);

  reset.addEventListener("click", () => {
    board.classList.add("is-tidying");
    [...moved].forEach((piece) => place(piece, 0, 0));
    setTimeout(() => board.classList.remove("is-tidying"), 600);
  });
  figure.append(board, reset);
  return figure;
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
    if (screen.scale) image.style.setProperty("--scale", screen.scale);
    row.append(image);
  });
  strip.append(row);
  return strip;
}

// A flow's title and copy scroll past as usual; then its screens, at nearly full screen height (about four
// phones across), are pinned to the viewport and the vertical scroll moves them sideways. Once the last screen
// is in view, the page scrolls on. On narrow screens, or with reduced motion, the strip simply scrolls sideways by itself.
function pinFlow(block) {
  const strip = block.querySelector(".tr-strip");
  const row = block.querySelector(".tr-strip__row");
  // The pin sits in its own track, so the copy above it scrolls away first.
  const pin = block.querySelector(".tr-flow__pin");
  const track = createElement("div", "tr-flow__track");
  pin.before(track);
  track.append(pin);
  const wide = matchMedia("(min-width: 48.01rem) and (prefers-reduced-motion: no-preference)");
  let distance = 0;
  let frame = null;

  const paint = () => {
    frame = null;
    if (!distance) return;
    const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance));
    row.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
  };
  const measure = () => {
    block.classList.toggle("is-pinned", wide.matches);
    row.style.transform = "";
    track.style.height = "";
    distance = 0;
    if (!wide.matches) return;
    distance = Math.max(0, Math.ceil(row.scrollWidth - strip.clientWidth));
    if (!distance) {
      block.classList.remove("is-pinned");
      return;
    }
    track.style.height = `${pin.offsetHeight + distance}px`;
    paint();
  };
  const schedule = () => { if (frame === null) frame = requestAnimationFrame(paint); };

  // The arrow keys move through the screens while the strip has focus.
  strip.addEventListener("keydown", (event) => {
    if (!distance || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    scrollBy({ top: (event.key === "ArrowRight" ? 1 : -1) * strip.clientWidth * 0.4, behavior: "smooth" });
  });
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", measure, { passive: true });
  wide.addEventListener("change", measure);
  block.querySelectorAll("img").forEach((image) => { if (!image.complete) image.addEventListener("load", measure, { once: true }); });
  requestAnimationFrame(measure);
  addEventListener("load", measure, { once: true });
  document.fonts?.ready.then(measure);
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
  // Laid out like Turbo Hub's and Balance Explorer's impact: one composition at content width that fits in a
  // single screen, the statement in the middle, and the notes gliding in from different directions as you
  // scroll to them (they reset once they have left the screen, so they arrive again next time).
  const board = createElement("div", "tr-impact");
  const stage = createElement("div", "tr-impact__stage");
  const directions = [[-64, -24], [0, -48], [64, -24], [-48, 56], [0, 48], [48, 56]];
  const notes = impact.notes.map((note, index) => {
    const image = document.createElement("img");
    image.className = "tr-impact__note";
    image.src = note.src;
    image.alt = note.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.style.left = `${(note.x / 1440) * 100}%`;
    image.style.top = `${(note.y / 1250) * 100}%`;
    image.style.width = `${(note.width / 1440) * 100}%`;
    const [dx, dy] = directions[index % directions.length];
    image.style.setProperty("--from-x", `${dx}px`);
    image.style.setProperty("--from-y", `${dy}px`);
    image.style.setProperty("--delay", `${(index % 3) * 90}ms`);
    stage.append(image);
    return image;
  });
  const statement = createElement("div", "tr-impact__center");
  statement.style.top = `${(impact.statementTop / 1250) * 100}%`;
  statement.append(createElement("span", "tr-impact__eyebrow", impact.eyebrow), createElement("h3", "tr-impact__statement", impact.statement));
  stage.append(statement);
  board.append(stage);

  // As in Turbo Hub's impact: a note glides in once it is well inside the screen, and resets only after it has
  // left the screen entirely. Checked on scroll, resize and as each image loads.
  if (!prefersStill()) {
    board.classList.add("is-animated");
    let frame = null;
    const check = () => {
      frame = null;
      notes.forEach((note) => {
        const rect = note.getBoundingClientRect();
        if (!rect.height) return;
        if (rect.bottom <= 0 || rect.top >= innerHeight) note.classList.remove("is-in");
        else if (rect.top <= innerHeight * 0.85) note.classList.add("is-in");
      });
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(check); };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    notes.forEach((note) => note.addEventListener("load", schedule));
    requestAnimationFrame(check);
  }
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

  // Validating the idea: the questions, the numbers, the research canvas, then the three phases.
  const { validate } = caseStudy;
  const { section: validateSection, column: validateColumn } = createCopySection("validate", validate.title, validate.paragraphs);
  validateColumn.querySelector(".body-copy").append(createList(validate.questions, true), createElement("p", "", validate.after));
  validateColumn.append(createStatRow(validate.stats));
  validateSection.append(createResearchCanvas(validate.canvas));
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
  processSection.append(createProcessTracks(process));

  // Challenges, then the initial idea.
  const { challenges } = caseStudy;
  const { section: challengesSection, column: challengesColumn } = createCopySection("challenges", challenges.title, challenges.paragraphs);
  challengesColumn.append(createTagList(challenges.tags));
  const idea = createElement("div", "tr-idea");
  const ideaColumn = createElement("div", "reading-column");
  ideaColumn.append(createElement("h3", "subsection-heading tr-subheading", challenges.idea.title));
  appendRichParagraphs(ideaColumn, [challenges.idea.text]);
  idea.append(ideaColumn, createSketchBoard(challenges.idea));
  challengesSection.append(idea);

  // The three flows, each with its screens in a sideways strip.
  const { section: flows } = createCopySection("flows", caseStudy.flows.title, [caseStudy.flows.intro]);
  caseStudy.flows.items.forEach((flow) => {
    const block = createElement("div", "tr-flow");
    block.id = flow.id;
    const column = createElement("div", "reading-column");
    column.append(createElement("h3", "subsection-heading tr-subheading", flow.title));
    appendRichParagraphs(column, [flow.text]);
    column.append(createTagList(flow.tags));
    const pin = createElement("div", "tr-flow__pin");
    pin.append(createFlowStrip(flow.screens));
    block.append(column, pin);
    flows.append(block);
    pinFlow(block);
  });

  // The finished designs.
  const { section: designs } = createCopySection("designs", caseStudy.designs.title);
  designs.append(createDesignColumns(caseStudy.designs));

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
  future.append(createElement("h3", "subsection-heading tr-subheading", impact.future.title));
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
