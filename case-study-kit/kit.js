/* Case study kit: shared page chrome and section builders. Each case study loads
   its content.js first, then this file, then a script.js that defines renderCaseStudy(). */
document.documentElement.classList.add("js");

const contentRoot = document.querySelector("#dynamic-content");
const placeholderTemplate = document.querySelector("#media-placeholder-template");

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function appendParagraphs(parent, paragraphs) {
  const copy = createElement("div", "body-copy");
  paragraphs.forEach((paragraph) => copy.append(createElement("p", "", paragraph)));
  parent.append(copy);
  return copy;
}

function createAssetPlaceholder(variant = "icon") {
  const placeholder = createElement(
    "span",
    `asset-placeholder asset-placeholder--${variant}`,
  );
  placeholder.setAttribute("aria-hidden", "true");
  return placeholder;
}

function createLinkedInIcon() {
  const icon = createElement("span", "contact-icon");
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML =
    '<svg viewBox="0 0 16 16" focusable="false"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg>';
  return icon;
}

function createSectionHeading(title) {
  const heading = createElement("h2", "section-heading");
  heading.append(createAssetPlaceholder(), document.createTextNode(title));
  return heading;
}

function createInfoPanel(title, items) {
  const panel = createElement("section", "info-panel");
  const heading = createElement("div", "info-panel-heading");
  heading.append(createElement("h3", "", title));

  const grid = createElement("div", "info-panel-grid");
  items.forEach((item) => {
    const card = createElement("article", "info-card");
    card.append(
      createElement("span", "info-card-index", item.number),
      createElement("h4", "", item.title),
      createElement("p", "", item.description),
    );
    grid.append(card);
  });

  panel.append(heading, grid);
  return panel;
}

function createExperienceGrid(items) {
  const grid = createElement("div", "experience-grid");
  items.forEach((item) => {
    const card = createElement("article", "experience-card detail-box");
    card.append(
      createElement("span", "experience-number experience-number--" + item.tone, item.number),
      createElement("h4", "", item.title),
      createElement("p", "", item.description),
    );
    grid.append(card);
  });
  return grid;
}

function createArtifactGallery(items) {
  const stage = createElement("div", "artifact-stage");
  stage.setAttribute("aria-label", "Early product-thinking sketches");

  items.forEach((item, index) => {
    const figure = createElement("figure", `artifact-sheet artifact-sheet--${index + 1}`);
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";
    const imageLink = createElement("a", "artifact-image-link");
    imageLink.href = item.src;
    imageLink.target = "_blank";
    imageLink.rel = "noopener";
    imageLink.setAttribute("aria-label", `Open ${item.caption} full size in a new tab`);
    imageLink.append(image);
    figure.append(imageLink, createElement("figcaption", "", item.caption));
    stage.append(figure);
  });

  return stage;
}

function createOutcomeGrid(items) {
  const grid = createElement("div", "outcome-grid");
  items.forEach((item) => {
    const card = createElement("article", "outcome-card detail-box");
    card.append(
      createElement("span", "outcome-number", item.number),
      createElement("h3", "", item.title),
      createElement("p", "", item.description),
    );
    grid.append(card);
  });
  return grid;
}

function createTimeline() {
  const card = createElement("section", "timeline-card detail-box");
  card.setAttribute("aria-labelledby", "timeline-card-title");

  const copy = createElement("div", "timeline-card-copy");
  const title = createElement("h3", "timeline-card-title", caseStudy.timeline.title);
  title.id = "timeline-card-title";
  copy.append(title, createElement("p", "timeline-card-duration", caseStudy.timeline.duration));

  const openButton = createElement("button", "timeline-open");
  openButton.type = "button";
  openButton.setAttribute("aria-haspopup", "dialog");
  openButton.setAttribute("aria-controls", "project-timeline-dialog");
  openButton.append(
    document.createTextNode("Open"),
    createElement("span", "timeline-open-arrow", "›"),
  );
  card.append(copy, openButton);

  document.querySelector("#project-timeline-dialog")?.remove();
  const dialog = document.createElement("dialog");
  dialog.id = "project-timeline-dialog";
  dialog.className = "timeline-dialog";
  dialog.setAttribute("aria-labelledby", "timeline-dialog-title");

  const dialogPanel = createElement("div", "timeline-dialog-panel");
  const dialogHeader = createElement("header", "timeline-dialog-header");
  const dialogHeadingGroup = createElement("div", "timeline-dialog-heading-group");
  const dialogTitle = createElement("h2", "", caseStudy.timeline.title);
  dialogTitle.id = "timeline-dialog-title";
  dialogHeadingGroup.append(
    dialogTitle,
    createElement("p", "", caseStudy.timeline.duration),
  );

  const closeButton = createElement("button", "timeline-close", "Close");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close project timeline");
  dialogHeader.append(dialogHeadingGroup, closeButton);

  const timelineList = createElement("ol", "timeline-list");
  caseStudy.timeline.phases.forEach((phase) => {
    const item = document.createElement("li");
    item.append(
      createElement("span", "timeline-period", phase.period),
      createElement("h3", "", phase.title),
      createElement("p", "", phase.description),
    );
    timelineList.append(item);
  });
  dialogPanel.append(dialogHeader, timelineList);
  dialog.append(dialogPanel);
  document.body.append(dialog);

  openButton.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("has-open-dialog");
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.classList.remove("has-open-dialog");
    openButton.focus();
  });
  dialog.addEventListener("click", (event) => {
    const bounds = dialogPanel.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left
      || event.clientX > bounds.right
      || event.clientY < bounds.top
      || event.clientY > bounds.bottom;
    if (isOutside) dialog.close();
  });

  return card;
}

function createPhone({ id, label }) {
  const phone = createElement("article", "phone");
  phone.setAttribute("aria-label", label);

  const screen = createElement("div", "phone-screen");
  const slot = createElement("div", "media-slot");
  slot.dataset.mediaId = id;
  slot.append(placeholderTemplate.content.cloneNode(true));
  screen.append(slot);

  const frame = document.createElement("img");
  frame.className = "phone-frame";
  frame.src = "assets/phone case clean.png";
  frame.alt = "";
  frame.decoding = "async";
  frame.draggable = false;

  phone.append(screen, frame);
  return phone;
}

// Desktop screenshot slot; starts as a placeholder until CaseStudy.setMedia fills it.
function createScreenFrame({ id, label }) {
  const frame = createElement("figure", "screen-frame");
  frame.setAttribute("aria-label", label);
  const slot = createElement("div", "media-slot");
  slot.dataset.mediaId = id;
  slot.append(placeholderTemplate.content.cloneNode(true));
  frame.append(slot);
  return frame;
}

function createCaseStudyEnding() {
  const settings = caseStudy.ending;
  const ending = createElement("section", "case-section case-ending");
  ending.id = "learning";
  const heading = createSectionHeading(caseStudy.learning.title);
  heading.id = "learning-heading";
  ending.setAttribute("aria-labelledby", heading.id);
  const column = createElement("div", "reading-column");
  column.append(heading);
  appendParagraphs(column, caseStudy.learning.paragraphs);
  if (caseStudy.learning.source) {
    const source = createElement("p", "case-ending__source");
    const sourceLink = createElement("a", "", caseStudy.learning.source.label);
    sourceLink.href = caseStudy.learning.source.href;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    source.append(sourceLink);
    column.append(source);
  }
  if (caseStudy.learning.screens?.length) {
    const learningScreens = createElement("figure", "case-ending__screens");
    const screenImages = createElement("div", "case-ending__screen-images");
    caseStudy.learning.screens.forEach((screen, index) => {
      const phone = createPhone({ id: `upi-circle-${index + 1}`, label: screen.alt });
      const image = document.createElement("img");
      image.className = "case-ending__screen-image";
      image.src = screen.src;
      image.alt = screen.alt;
      image.width = screen.width;
      image.height = screen.height;
      image.loading = "lazy";
      image.decoding = "async";
      phone.querySelector(".media-slot").replaceChildren(image);
      screenImages.append(phone);
    });
    learningScreens.append(screenImages, createElement("figcaption", "", caseStudy.learning.screensCaption));
    column.append(learningScreens);
  }
  const separator = createElement("div", "case-ending__separator");
  separator.setAttribute("aria-hidden", "true");
  const flower = createElement("img", "");
  flower.src = settings.separatorFlower;
  flower.alt = "";
  separator.append(flower);
  const composition = createElement("div", "case-ending__composition");
  const sideFlower = createElement("div", "case-ending__flower");
  const flowerArt = createElement("img", "case-ending__flower-art");
  flowerArt.src = settings.sideFlower.src;
  flowerArt.alt = "";
  flowerArt.loading = "lazy";
  sideFlower.append(flowerArt, createElement("p", "case-ending__flower-text", settings.sideFlower.note));
  composition.append(sideFlower);
  // The recap card is a Turbo Hub design-system component, loaded through prototypes/shared/ds.js.
  if (settings.card && window.TurboCaseStudyCard) composition.append(window.TurboCaseStudyCard(settings.card));
  const illustration = createElement("div", "case-ending__illustration");
  illustration.id = "closing-illustration";
  illustration.dataset.lottieSlot = "closing-garden";
  illustration.setAttribute("aria-hidden", "true");
  const still = createElement("img", "case-ending__flowers-still");
  still.src = settings.flowersStill;
  still.alt = "";
  illustration.append(still);
  const wave = createElement("div", "case-ending__wave");
  wave.setAttribute("aria-hidden", "true");
  wave.innerHTML = '<svg viewBox="0 0 1440 22" preserveAspectRatio="none" focusable="false"><path d="M0 9 Q45 15 90 9 T180 9 T270 9 T360 9 T450 9 T540 9 T630 9 T720 9 T810 9 T900 9 T990 9 T1080 9 T1170 9 T1260 9 T1350 9 T1440 9 V22 H0Z" fill="currentColor"/></svg>';
  const footer = createElement("footer", "case-ending__footer");
  footer.append(illustration, wave);
  ending.append(column, separator, composition, footer);
  return ending;
}

function createContactSection(id) {
  const contact = createElement("section", "case-section");
  contact.id = id;
  contact.setAttribute("aria-label", "Contact");
  const contactCard = createElement("div", "contact-card");
  contactCard.append(
    createElement("h3", "contact-heading", caseStudy.contact.eyebrow),
    createElement("p", "contact-message", caseStudy.contact.message),
  );
  const contactAction = createElement("a", "contact-button");
  contactAction.href = caseStudy.contact.action.href;
  contactAction.target = "_blank";
  contactAction.rel = "noreferrer";
  contactAction.append(
    createLinkedInIcon(),
    createElement("span", "", caseStudy.contact.action.label),
  );
  contactCard.append(contactAction);
  contact.append(contactCard);
  return contact;
}

function createAnnotationBand(content, annotation) {
  const band = createElement("div", "annotation-band");
  band.append(content);
  if (annotation) {
    const figure = createElement("div", "annotation-figure");
    const mark = document.createElement("img");
    mark.className = "annotation-mark";
    mark.src = annotation.src;
    mark.alt = annotation.alt || "";
    mark.loading = "lazy";
    figure.append(mark);
    if (annotation.text) {
      figure.append(createElement("p", "annotation-copy", annotation.text));
    }
    band.append(figure);
  }
  return band;
}

function renderPlaceholder(slot) {
  slot.replaceChildren(placeholderTemplate.content.cloneNode(true));
}

function renderMediaStatus(slot, state, title, description) {
  const status = createElement("div", "media-status");
  status.dataset.state = state;
  status.append(
    createElement("span", "media-status-icon"),
    createElement("strong", "", title),
    createElement("small", "", description),
  );
  slot.replaceChildren(status);
}

function setMedia(id, media = {}) {
  const slot = document.querySelector(`[data-media-id="${CSS.escape(id)}"]`);
  if (!slot) throw new Error(`Unknown media slot: ${id}`);

  if (!media.type || media.type === "placeholder") {
    renderPlaceholder(slot);
    return;
  }

  let node;
  let loadEvent;
  if (media.type === "image") {
    node = document.createElement("img");
    node.src = media.src;
    node.alt = media.alt || "Product screen";
    loadEvent = "load";
  } else if (media.type === "video") {
    node = document.createElement("video");
    node.src = media.src;
    node.controls = media.controls !== false;
    node.muted = media.muted !== false;
    node.loop = Boolean(media.loop);
    node.autoplay = Boolean(media.autoplay);
    node.playsInline = true;
    if (media.poster) node.poster = media.poster;
    loadEvent = "loadeddata";
  } else if (media.type === "iframe") {
    node = document.createElement("iframe");
    node.src = media.src;
    node.title = media.title || "Interactive product prototype";
    node.loading = "lazy";
    node.setAttribute("allow", media.allow || "fullscreen");
    loadEvent = "load";
  } else if (media.type === "html") {
    node = createElement("div", "embedded-html");
    node.innerHTML = media.html || "";
  } else {
    throw new Error(`Unsupported media type: ${media.type}`);
  }

  if (media.type === "html") {
    slot.replaceChildren(node);
    return;
  }

  renderMediaStatus(slot, "loading", "Loading media", "Preparing the product preview");
  node.classList.add("media-pending");
  node.addEventListener(
    loadEvent,
    () => {
      node.classList.remove("media-pending");
      slot.replaceChildren(node);
    },
    { once: true },
  );
  node.addEventListener(
    "error",
    () => {
      node.remove();
      renderMediaStatus(
        slot,
        "error",
        "Media unavailable",
        "Check the file path and try again",
      );
    },
    { once: true },
  );
  slot.append(node);
}

function setupHeroScroll() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const stage = hero.closest(".hero-scroll-stage");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;

  const update = () => {
    frame = 0;
    if (reducedMotion.matches) {
      hero.style.removeProperty("--hero-parallax-offset");
      hero.style.removeProperty("--hero-depth-lift");
      hero.style.removeProperty("--hero-depth-tilt");
      hero.style.removeProperty("--hero-depth-scale");
      return;
    }
    const bounds = stage.getBoundingClientRect();
    const travel = Math.max(1, hero.offsetHeight * 0.5);
    const progress = Math.min(1, Math.max(0, -bounds.top / travel));
    const eased = progress * progress * (3 - 2 * progress);
    hero.style.setProperty("--hero-depth-lift", "0px");
    hero.style.setProperty("--hero-depth-tilt", `${eased * -4}deg`);
    hero.style.setProperty("--hero-depth-scale", String(1 - eased * 0.05));
    hero.style.setProperty("--hero-parallax-offset", `${eased * 16}px`);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reducedMotion.addEventListener("change", schedule);
  update();
}

function setupScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress");
  const progressValue = progressBar?.querySelector(".scroll-progress-value");
  if (!progressBar || !progressValue) return;

  const updateProgress = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollRange = Math.max(0, documentHeight - window.innerHeight);
    const progress = scrollRange === 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / scrollRange));
    const percentage = Math.round(progress * 100);
    const labelTop = Math.min(
      Math.max(0, window.innerHeight - progressValue.offsetHeight),
      Math.max(0, progress * window.innerHeight - progressValue.offsetHeight / 2),
    );

    progressBar.style.setProperty("--scroll-progress", progress);
    progressBar.style.setProperty("--scroll-label-offset", `${labelTop}px`);
    progressBar.setAttribute("aria-valuenow", String(percentage));
    progressValue.textContent = `${percentage}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  if ("ResizeObserver" in window) {
    const contentObserver = new ResizeObserver(updateProgress);
    contentObserver.observe(document.body);
  }
  updateProgress();
}

setupHeroScroll();
setupScrollProgress();

/*
  Public media API examples:

  CaseStudy.setMedia("phone-overview", {
    type: "image",
    src: "./assets/overview.png",
    alt: "Product overview",
  });

  CaseStudy.setMedia("phone-manager", {
    type: "video",
    src: "./assets/manager-flow.mp4",
    poster: "./assets/manager-poster.jpg",
  });

  CaseStudy.setMedia("phone-member", {
    type: "iframe",
    src: "./prototype/index.html",
    title: "Member flow prototype",
  });
*/
// Each case study's script defines its own renderCaseStudy() and then calls this.
function startCaseStudy(render) {
  render();
  setupHeroScroll();
  setupScrollProgress();

  window.CaseStudy = Object.freeze({
    data: caseStudy,
    setMedia,
    resetMedia: (id) => setMedia(id, { type: "placeholder" }),
  });
}
