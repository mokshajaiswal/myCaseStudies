/* Turbo Hub sections. Shared builders come from case-study-kit/kit.js; copy lives in content.js. */

function createMeasureBullet() {
  const bullet = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  bullet.setAttribute("class", "measure-bullet");
  bullet.setAttribute("viewBox", "0 0 20 20");
  bullet.setAttribute("aria-hidden", "true");
  bullet.setAttribute("focusable", "false");
  bullet.innerHTML =
    '<circle cx="10" cy="10" r="9" class="measure-bullet-ring" />' +
    '<path d="M6 10.4 8.9 13.2 14.2 7.2" class="measure-bullet-check" />';
  return bullet;
}

function createMeasureList(items) {
  const list = createElement("dl", "measure-list");
  items.forEach((item) => {
    const group = createElement("div", "measure-item");
    group.append(
      createMeasureBullet(),
      createElement("dt", "", item.title),
      createElement("dd", "", item.description),
    );
    list.append(group);
  });
  return list;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function createPersonaAvatar(persona) {
  const portrait = document.createElement("img");
  portrait.className = "persona-avatar-art";
  portrait.src = persona.image;
  portrait.alt = "";
  portrait.decoding = "async";
  portrait.loading = "lazy";
  portrait.draggable = false;
  portrait.setAttribute("aria-hidden", "true");
  return portrait;
}

const PERSONA_DETAIL_FIELDS = [
  ["role", "Role"],
  ["goal", "Goal"],
  ["painPoints", "Pain Points"],
  ["needs", "Needs"],
];

function createPersonaConnector(nodeCount, direction) {
  const connector = createElement("div", "persona-connector persona-connector--" + direction);
  connector.style.setProperty("--nodes", String(nodeCount));
  connector.setAttribute("aria-hidden", "true");

  // the outer branches are single rounded elbows rather than a bar crossing a
  // stem, so each corner turns cleanly and stops on the outer node centres
  connector.append(
    createElement("span", "persona-connector-elbow persona-connector-elbow--start"),
    createElement("span", "persona-connector-elbow persona-connector-elbow--end"),
    createElement("span", "persona-connector-trunk"),
  );

  // an even row has no node under the trunk, so the trunk only spans the hub side
  if (nodeCount % 2 === 0) connector.classList.add("persona-connector--half-trunk");

  // any node that is neither outermost nor centred needs its own straight stem
  const centre = (nodeCount - 1) / 2;
  for (let index = 1; index < nodeCount - 1; index += 1) {
    if (index === centre) continue;
    const stem = createElement("span", "persona-connector-stem");
    stem.style.setProperty("--stem-position", String(index / (nodeCount - 1)));
    connector.append(stem);
  }

  return connector;
}

function createPersonaExplorer(config) {
  const explorer = createElement("div", "persona-explorer detail-box");

  const personas = config.personas;
  const managers = personas.filter((persona) => persona.tier === "manager");
  const members = personas.filter((persona) => persona.tier !== "manager");
  let activeIndex = 0;

  const card = createElement("article", "persona-card");
  card.id = "persona-detail-panel";
  card.setAttribute("role", "tabpanel");
  card.setAttribute("tabindex", "0");

  const map = createElement("div", "persona-map");
  map.setAttribute("role", "tablist");
  map.setAttribute("aria-label", "Family personas");

  const nodeButtons = [];

  const createPersonaRow = (group, tier) => {
    const row = createElement("div", "persona-row persona-row--" + tier);
    row.style.setProperty("--nodes", String(group.length));
    group.forEach((persona) => {
      const index = personas.indexOf(persona);
      const button = createElement("button", "persona-node");
      button.type = "button";
      button.id = "persona-node-" + (index + 1);
      button.style.setProperty("--persona-accent", persona.accent);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", card.id);
      button.setAttribute("aria-selected", String(index === activeIndex));
      button.tabIndex = index === activeIndex ? 0 : -1;
      const figure = createElement("span", "persona-node-figure");
      figure.append(createPersonaAvatar(persona));
      const copy = createElement("span", "persona-node-copy");
      copy.append(
        createElement("strong", "", persona.relation),
        createElement("span", "", persona.label),
      );
      button.append(figure, copy);
      nodeButtons[index] = button;
      row.append(button);
    });
    return row;
  };

  const hub = createElement("div", "persona-hub");
  hub.append(createElement("span", "persona-hub-label", config.hubLabel));
  map.append(
    createPersonaRow(managers, "manager"),
    createPersonaConnector(managers.length, "merge"),
    hub,
    createPersonaConnector(members.length, "split"),
    createPersonaRow(members, "member"),
  );

  const cardStack = createElement("div", "persona-card-stack");
  const cardPanels = personas.map((persona) => {
    const panel = createElement("div", "persona-card-panel");
    panel.style.setProperty("--persona-accent", persona.accent);

    const head = createElement("div", "persona-card-head");
    const person = createElement("div", "persona-card-person");
    const avatar = createElement("span", "persona-card-avatar");
    avatar.append(createPersonaAvatar(persona));
    person.append(avatar, createElement("h3", "", persona.relation));
    const tags = createElement("div", "persona-card-tags");
    tags.append(
      createElement("span", "persona-card-tag persona-card-tag--role", persona.label),
      ...persona.tags.map((tag) => createElement("span", "persona-card-tag", tag)),
    );
    head.append(person, tags);

    const body = createElement("div", "persona-card-body");
    PERSONA_DETAIL_FIELDS.forEach(([key, label]) => {
      const block = createElement("section", "persona-detail");
      const content = createElement("div", "persona-detail-content");
      const value = persona[key];
      if (Array.isArray(value)) {
        const list = createElement("ul", "persona-detail-list");
        value.forEach((item) => list.append(createElement("li", "", item)));
        content.append(list);
      } else {
        content.append(createElement("p", "", value));
      }
      block.append(createElement("span", "persona-detail-label", label), content);
      body.append(block);
    });

    panel.append(head, body);
    cardStack.append(panel);
    return panel;
  });
  card.append(cardStack);

  const renderActivePersona = () => {
    cardPanels.forEach((panel, index) => {
      panel.classList.toggle("is-active", index === activeIndex);
    });
    nodeButtons.forEach((button, index) => {
      const isSelected = index === activeIndex;
      button.setAttribute("aria-selected", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });
    card.setAttribute("aria-labelledby", nodeButtons[activeIndex].id);
  };

  const selectPersona = (index, moveFocus) => {
    activeIndex = (index + personas.length) % personas.length;
    renderActivePersona();
    if (moveFocus) nodeButtons[activeIndex].focus();
  };

  const CYCLE_INTERVAL = 5200;
  const allowsAutoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  let isVisible = false;
  let isPaused = false;
  let isManual = false;

  const stopCycling = () => {
    if (timer === null) return;
    window.clearInterval(timer);
    timer = null;
  };

  const startCycling = () => {
    if (timer !== null || isManual || isPaused || !isVisible || !allowsAutoplay) return;
    timer = window.setInterval(() => selectPersona(activeIndex + 1), CYCLE_INTERVAL);
  };

  const takeManualControl = () => {
    if (isManual) return;
    isManual = true;
    stopCycling();
    explorer.classList.add("is-manual");
  };

  const pauseCycling = () => {
    isPaused = true;
    stopCycling();
  };

  const resumeCycling = () => {
    isPaused = false;
    startCycling();
  };

  nodeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      takeManualControl();
      selectPersona(index);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      takeManualControl();
      selectPersona(index + (event.key === "ArrowRight" ? 1 : -1), true);
    });
  });

  explorer.addEventListener("pointerenter", pauseCycling);
  explorer.addEventListener("pointerleave", resumeCycling);
  explorer.addEventListener("focusin", pauseCycling);
  explorer.addEventListener("focusout", (event) => {
    if (explorer.contains(event.relatedTarget)) return;
    resumeCycling();
  });

  if (allowsAutoplay && typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startCycling();
        else stopCycling();
      });
    }, { threshold: 0.25 });
    observer.observe(explorer);
  } else if (allowsAutoplay) {
    isVisible = true;
    startCycling();
  }

  selectPersona(0);

  const layout = createElement("div", "persona-layout");
  layout.append(map, card);
  explorer.append(layout);
  return explorer;
}

function createUserVoiceStack(voices) {
  if (typeof window.TurboInterviewStack === "function") return window.TurboInterviewStack(voices);
  // Keep the full narrative available if an optional interaction asset fails to load.
  const fallback = createElement("div", "user-voice-stack");
  voices.forEach(voice => {
    const quote = createElement("blockquote", "", `“${voice.quote}”`);
    quote.append(createElement("cite", "", voice.type));
    fallback.append(quote);
  });
  return fallback;
}

function createRelationshipRoleArt(kind) {
  const art = document.createElementNS(SVG_NS, "svg");
  art.setAttribute("class", `relationship-role-art relationship-role-art--${kind}`);
  art.setAttribute("viewBox", "0 0 120 120");
  art.setAttribute("aria-hidden", "true");
  art.setAttribute("focusable", "false");

  if (kind === "manager") {
    art.innerHTML =
      '<circle class="relationship-art-field" cx="60" cy="60" r="51" />'
      + '<circle class="relationship-art-orbit" cx="60" cy="60" r="33" />'
      + '<path class="relationship-art-line" d="M60 27v19M31 76l16-9M89 76l-16-9" />'
      + '<circle class="relationship-art-node" cx="60" cy="22" r="6" />'
      + '<circle class="relationship-art-node" cx="27" cy="79" r="6" />'
      + '<circle class="relationship-art-node" cx="93" cy="79" r="6" />'
      + '<circle class="relationship-art-core" cx="60" cy="60" r="14" />'
      + '<path class="relationship-art-core-mark" d="M54 60l4 4 9-10" />';
  } else {
    art.innerHTML =
      '<circle class="relationship-art-field" cx="60" cy="60" r="51" />'
      + '<rect class="relationship-art-card" x="28" y="36" width="64" height="48" rx="11" />'
      + '<path class="relationship-art-line" d="M35 49h50" />'
      + '<circle class="relationship-art-core" cx="72" cy="69" r="7" />'
      + '<path class="relationship-art-access" d="M45 95c8 6 22 6 30 0M75 95l-5-5M75 95l-6 3" />';
  }

  return art;
}

function createRelationshipRole(item, kind) {
  const role = createElement("article", `relationship-role relationship-role--${kind}`);
  const figure = createElement("div", "relationship-role-figure");
  figure.classList.add("relationship-role-figure--portraits");
  item.portraits.forEach((portrait) => {
    const image = document.createElement("img");
    image.src = portrait.src;
    image.alt = portrait.alt;
    image.loading = "lazy";
    if (kind === "member") {
      const frame = createElement("div", "relationship-portrait");
      frame.append(image);
      figure.append(frame);
    } else {
      image.className = "relationship-portrait";
      figure.append(image);
    }
  });

  const copy = createElement("div", "relationship-role-copy");
  copy.append(
    createElement("span", "relationship-label", item.label),
    createElement("p", "", item.description),
  );

  role.append(
    figure,
    createElement("h3", "", item.title),
    copy,
  );
  return role;
}

function createRelationshipExchange() {
  const exchange = createElement("div", "relationship-exchange");
  exchange.setAttribute(
    "aria-label",
    "The manager sets boundaries and access through Turbo Hub. The member spends independently and sends requests when those boundaries need to change.",
  );
  exchange.setAttribute("role", "img");

  const forward = createElement("div", "relationship-route relationship-route--forward");
  forward.append(createElement("span", "", "Boundaries + access"));

  const hub = createElement("div", "relationship-hub-mark");
  hub.append(
    createElement("span", "", "Turbo"),
    createElement("strong", "", "Hub"),
  );

  const returning = createElement("div", "relationship-route relationship-route--return");
  returning.append(createElement("span", "", "Spending + requests"));

  exchange.append(forward, hub, returning);
  return exchange;
}

function createRelationshipGrid(items) {
  const manager = items[0];
  const member = items[1];
  const map = createElement("div", "relationship-map");

  const roles = createElement("div", "relationship-map-roles");
  roles.append(
    createRelationshipRole(manager, "manager"),
    createRelationshipExchange(),
    createRelationshipRole(member, "member"),
  );

  map.append(roles);
  return map;
}

function createCompetitiveResearchBoard(config) {
  const component = createElement("div", "competitive-board-component");
  const board = createElement("div", "competitive-board");
  board.setAttribute("aria-label", "Interactive competitive research board");
  // A light edge correction improves small screenshot text without changing assets.
  const svgNamespace = "http://www.w3.org/2000/svg";
  const imageEffects = document.createElementNS(svgNamespace, "svg");
  imageEffects.setAttribute("width", "0");
  imageEffects.setAttribute("height", "0");
  imageEffects.setAttribute("aria-hidden", "true");
  imageEffects.style.position = "absolute";
  const definitions = document.createElementNS(svgNamespace, "defs");
  const clarityFilter = document.createElementNS(svgNamespace, "filter");
  clarityFilter.id = "competitive-image-clarity";
  clarityFilter.setAttribute("color-interpolation-filters", "sRGB");
  const sharpen = document.createElementNS(svgNamespace, "feConvolveMatrix");
  sharpen.setAttribute("order", "3");
  sharpen.setAttribute("kernelMatrix", "0 -0.15 0 -0.15 1.6 -0.15 0 -0.15 0");
  sharpen.setAttribute("divisor", "1");
  sharpen.setAttribute("edgeMode", "duplicate");
  sharpen.setAttribute("preserveAlpha", "true");
  clarityFilter.append(sharpen);
  definitions.append(clarityFilter);
  imageEffects.append(definitions);
  board.append(imageEffects);
  const imageLayer = createElement("div", "competitive-board-images");
  board.append(imageLayer);
  const tapeLayer = createElement("div", "competitive-board-tapes");
  board.append(tapeLayer);
  let topLayer = 10;

  const boardOverhang = 0.6;

  const makeDraggable = (item) => {
    const getBounds = () => {
      const overhangX = item.offsetWidth * boardOverhang;
      const overhangY = item.offsetHeight * boardOverhang;
      return {
        minLeft: -overhangX,
        maxLeft: board.clientWidth - item.offsetWidth + overhangX,
        minTop: -overhangY,
        maxTop: board.clientHeight - item.offsetHeight + overhangY,
      };
    };

    const moveBy = (deltaX, deltaY) => {
      const { minLeft, maxLeft, minTop, maxTop } = getBounds();
      item.dataset.userMoved = "true";
      item.style.left = `${Math.min(maxLeft, Math.max(minLeft, item.offsetLeft + deltaX))}px`;
      item.style.top = `${Math.min(maxTop, Math.max(minTop, item.offsetTop + deltaY))}px`;
      item.style.zIndex = String(++topLayer);
    };

    item.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      item.classList.add("is-pointer-focused");
      item.focus({ preventScroll: true });
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = item.offsetLeft;
      const startTop = item.offsetTop;
      item.setPointerCapture(event.pointerId);
      item.classList.add("is-dragging");
      item.style.zIndex = String(++topLayer);
      item.setAttribute("aria-grabbed", "true");

      const onMove = (moveEvent) => {
        item.dataset.userMoved = "true";
        const { minLeft, maxLeft, minTop, maxTop } = getBounds();
        item.style.left = `${Math.min(maxLeft, Math.max(minLeft, startLeft + moveEvent.clientX - startX))}px`;
        item.style.top = `${Math.min(maxTop, Math.max(minTop, startTop + moveEvent.clientY - startY))}px`;
      };

      const onEnd = (endEvent) => {
        item.releasePointerCapture(endEvent.pointerId);
        item.classList.remove("is-dragging");
        item.setAttribute("aria-grabbed", "false");
        item.removeEventListener("pointermove", onMove);
        item.removeEventListener("pointerup", onEnd);
        item.removeEventListener("pointercancel", onEnd);
      };

      item.addEventListener("pointermove", onMove);
      item.addEventListener("pointerup", onEnd);
      item.addEventListener("pointercancel", onEnd);
    });

    item.addEventListener("blur", () => item.classList.remove("is-pointer-focused"));

    item.addEventListener("keydown", (event) => {
      item.classList.remove("is-pointer-focused");
      const moves = {
        ArrowLeft: [-8, 0],
        ArrowRight: [8, 0],
        ArrowUp: [0, -8],
        ArrowDown: [0, 8],
      };
      if (!moves[event.key]) return;
      event.preventDefault();
      moveBy(...moves[event.key]);
    });
  };

  config.images.forEach((imageConfig, index) => {
    const item = createElement("figure", "competitive-board-item competitive-image");
    const image = document.createElement("img");
    const tape = createElement("span", "competitive-board-item competitive-image-tape");
    tape.style.setProperty("--research-tape-top", `${imageConfig.tapeTop ?? 0}%`);
    const tapeVariations = [
      { file: "Tape1.svg", ratio: "86 / 53", rotation: -7 },
      { file: "Tape2.svg", ratio: "97 / 43", rotation: 4 },
      { file: "Tape3.svg", ratio: "64 / 67", rotation: -3 },
      { file: "Tape4.svg", ratio: "71 / 61", rotation: 6 },
    ];
    const tapeAsset = tapeVariations[index % tapeVariations.length];
    tape.style.backgroundImage = `url("assets/Tape_variations/${tapeAsset.file}")`;
    tape.style.setProperty("--research-tape-ratio", tapeAsset.ratio);
    tape.style.setProperty("--research-tape-rotation", `${tapeAsset.rotation}deg`);
    image.src = imageConfig.src;
    image.alt = imageConfig.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;
    item.style.setProperty('--research-x', `${imageConfig.x}%`);
    item.style.setProperty('--research-y', `${imageConfig.y}%`);
    item.style.setProperty('--research-width', `${imageConfig.width}%`);
    item.style.setProperty('--research-mobile-x', `${imageConfig.mobile.x}%`);
    item.style.setProperty('--research-mobile-y', `${imageConfig.mobile.y}%`);
    item.style.setProperty('--research-mobile-width', `${imageConfig.mobile.width}%`);
    item.style.setProperty("--collage-rotation", `${imageConfig.rotation}deg`);
    item.style.zIndex = String(++topLayer);
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Move research image ${index + 1}. Use arrow keys for precise movement.`);
    item.setAttribute("aria-grabbed", "false");
    item.append(image);
    imageLayer.append(item);
    makeDraggable(item);
    if (imageConfig.tape !== false) {
      tape.tabIndex = 0;
      tape.setAttribute("role", "button");
      tape.setAttribute("aria-label", `Move tape ${index + 1}. Use arrow keys for precise movement.`);
      tape.setAttribute("aria-grabbed", "false");
      tape.style.setProperty("--collage-rotation", `${imageConfig.rotation + tapeAsset.rotation}deg`);
      tapeLayer.append(tape);
      makeDraggable(tape);
      const positionTape = () => {
        if (tape.dataset.userMoved === "true") return;
        const mobile = window.matchMedia("(max-width: 48rem)").matches;
        const layout = mobile ? imageConfig.mobile : imageConfig;
        const width = board.clientWidth * layout.width / 100;
        const height = item.offsetHeight;
        const rotation = imageConfig.rotation * Math.PI / 180;
        const edgeOffset = height * ((imageConfig.tapeTop ?? 0) / 100 - 0.5);
        const centerX = board.clientWidth * layout.x / 100 + width / 2 - Math.sin(rotation) * edgeOffset;
        const centerY = board.clientHeight * layout.y / 100 + height / 2 + Math.cos(rotation) * edgeOffset;
        const tapeWidth = Math.max(44, Math.min(76, width * 0.36));
        const [ratioWidth, ratioHeight] = tapeAsset.ratio.split(" / ").map(Number);
        tape.style.width = `${tapeWidth}px`;
        tape.style.left = `${centerX - tapeWidth / 2}px`;
        tape.style.top = `${centerY - tapeWidth * ratioHeight / ratioWidth * 0.35}px`;
      };
      const tapeObserver = new ResizeObserver(positionTape);
      tapeObserver.observe(board);
      tapeObserver.observe(item);
      image.addEventListener("load", positionTape, { once: true });
    }
  });

  const boardTitle = createElement("p", "competitive-board-title");
  boardTitle.append(
    createElement("span", "", "Glimpse of some"),
    createElement("span", "competitive-board-highlight", "competitive research"),
  );
  board.append(boardTitle);

  const insights = createElement("div", "competitive-insights");
  config.insights.forEach((insight, index) => {
    const item = document.createElement("details");
    item.className = "competitive-lesson-disclosure";
    item.name = "competitive-lessons";
    item.open = index === 0;
    const summary = createElement("summary", "competitive-lesson-summary");
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (item.open) return;
      insights.querySelectorAll("details").forEach((other) => {
        other.open = other === item;
      });
    });
    const product = createElement("span", "competitive-product");
    const logo = document.createElement("img");
    logo.className = "competitive-product-logo";
    logo.src = insight.logo;
    logo.alt = "";
    logo.width = 28;
    logo.height = 28;
    logo.decoding = "async";
    product.append(logo, createElement("span", "", insight.product));
    summary.append(
      product,
      createElement("span", "competitive-lesson-title", insight.title),
    );
    const observation = createElement("div", "competitive-observation");
    observation.append(
      createElement("p", "", insight.description),
    );
    const takeaway = createElement("div", "competitive-takeaway");
    takeaway.append(
      createElement("h4", "competitive-takeaway-label", "What I took from this"),
      createElement("p", "", insight.takeaway),
    );
    const content = createElement("div", "competitive-lesson");
    content.append(observation, takeaway);
    item.append(summary, content);
    insights.append(item);
  });

  component.append(board, insights);
  return component;
}

function createProductRulePath(config) {
  const component = createElement("div", "product-rule-component");
  const path = createElement("ol", "product-rule-path");

  config.rules.forEach((rule) => {
    const step = document.createElement("li");
    step.className = "product-rule-step";
    const node = createElement("span", "product-rule-node", rule.number);
    node.setAttribute("aria-hidden", "true");
    const copy = createElement("div", "product-rule-copy");
    copy.append(
      createElement("h3", "", rule.title),
      createElement("p", "", rule.description),
    );
    step.append(node, copy);
    path.append(step);
  });

  component.append(path, createElement("p", "product-rule-summary", config.summary));
  return component;
}

// Prototype scenes own their screen and device shell; other phones use the kit renderer.
function createScenePhone({ id, label, sceneId, route }) {
  if (!sceneId && !route) return createPhone({ id, label });
  const phone = createElement("article", "phone");
  phone.setAttribute("aria-label", label);
  const scene = route ? { id, route } : window.TurboFamilyStory.scenes.find((item) => item.id === sceneId);
  const frame = document.createElement("iframe");
  frame.className = "overview-prototype";
  frame.src = window.TurboFlowStory.sceneURL({ ...scene, interactive: false }).href;
  frame.title = label;
  frame.loading = "lazy";
  frame.referrerPolicy = "same-origin";
  frame.tabIndex = -1;
  // The existing prototype owns its screen and device shell.
  phone.append(frame);
  return phone;
}

function renderCaseStudy() {
  document.querySelector("#hero-title").textContent = caseStudy.hero.title;
  document.querySelector("#hero-summary").textContent = caseStudy.hero.summary;

  const shell = createElement("div", "content-shell");

  const overview = createElement("section", "case-section");
  overview.id = "overview";
  const overviewColumn = createElement("div", "reading-column");
  overviewColumn.append(createElement("h2", "section-kicker", caseStudy.overview.kicker));
  const overviewCopy = createElement("div", "body-copy");
  caseStudy.overview.paragraphs.forEach((paragraph) => {
    overviewCopy.append(createElement("p", "", paragraph));
  });
  overviewColumn.append(overviewCopy);
  overview.append(overviewColumn);

  const phoneStage = createElement("div", "phone-stage");
  phoneStage.setAttribute("aria-label", "PayZapp Accounts & Cards, Turbo Hub home, and family members");
  caseStudy.media.forEach((item) => phoneStage.append(createScenePhone(item)));
  overview.append(phoneStage);
  shell.append(overview);

  const product = createElement("section", "case-section");
  product.id = "product";
  const productColumn = createElement("div", "reading-column");
  productColumn.append(createSectionHeading(caseStudy.product.title));
  const productCopy = createElement("div", "body-copy product-copy");
  productCopy.append(
    createElement("p", "", caseStudy.product.lead),
  );
  caseStudy.product.paragraphs.forEach((paragraph) => {
    productCopy.append(createElement("p", "", paragraph));
  });
  productColumn.append(productCopy);

  const meta = createElement("dl", "meta-strip detail-box");
  caseStudy.product.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  product.append(productColumn, meta);
  shell.append(product);

  const opportunity = createElement("section", "case-section");
  opportunity.id = "opportunity";
  const opportunityColumn = createElement("div", "reading-column");
  opportunityColumn.append(createSectionHeading(caseStudy.opportunity.title));
  const opportunityCopy = createElement("div", "body-copy opportunity-copy");
  caseStudy.opportunity.paragraphs.forEach((paragraph) => {
    opportunityCopy.append(createElement("p", "", paragraph));
  });
  opportunityColumn.append(
    opportunityCopy,
    createInfoPanel(caseStudy.opportunity.goalsTitle, caseStudy.opportunity.goals),
  );
  opportunity.append(opportunityColumn);
  shell.append(opportunity);

  const technology = createElement("section", "case-section");
  technology.id = "technology";
  const technologyColumn = createElement("div", "reading-column");
  technologyColumn.append(createSectionHeading(caseStudy.technology.title));

  const technologyCopy = createElement("div", "body-copy technology-copy");
  caseStudy.technology.paragraphs.forEach((paragraph) => {
    technologyCopy.append(createElement("p", "", paragraph));
  });

  const successMeasures = createElement("div", "measures-block");
  successMeasures.id = "metrics";
  successMeasures.append(
    createElement("h3", "subsection-heading measures-heading", caseStudy.outcomes.measuresTitle),
    createOutcomeGrid(
      caseStudy.outcomes.measures.map((measure, index) => ({
        ...measure,
        number: String(index + 1).padStart(2, "0") + ".",
      })),
    ),
  );
  technologyColumn.append(
    technologyCopy,
    successMeasures,
  );
  technology.append(technologyColumn);
  shell.append(technology);

  const artifacts = createElement("section", "case-section artifact-section");
  artifacts.id = "artifacts";
  artifacts.append(createArtifactGallery(caseStudy.artifacts));
  shell.append(artifacts);

  const flows = createElement("section", "case-section");
  flows.id = "flows";
  const flowsColumn = createElement("div", "reading-column");
  const flowsCopy = createElement("div", "body-copy");
  flowsCopy.append(
    createElement("p", "", caseStudy.flows.intro),
    createElement("p", "", caseStudy.flows.continuation),
  );
  flowsColumn.append(createSectionHeading(caseStudy.flows.title), flowsCopy);
  flows.append(flowsColumn, TurboFlowStory.render());

  const research = createElement("section", "case-section");
  research.id = "research";
  const researchColumn = createElement("div", "reading-column");
  const researchHeading = createSectionHeading(caseStudy.research.title);
  const researchInterviews = createElement("div", "research-interviews");
  researchInterviews.append(
    createElement("p", "research-interviews-intro", caseStudy.research.interviewsIntro),
    createUserVoiceStack(caseStudy.research.voices),
  );
  researchColumn.append(
    researchHeading,
    createElement("p", "section-intro", caseStudy.research.intro),
    researchInterviews,
  );

  const researchBridge = createElement("div", "body-copy research-copy research-bridge");
  const insight = document.createElement("p");
  insight.textContent = caseStudy.research.personaIntro;
  researchBridge.append(insight);
  researchColumn.append(
    researchBridge,
    createPersonaExplorer(caseStudy.research),
  );
  const personaConclusion = createElement("div", "body-copy research-copy research-bridge");
  personaConclusion.append(createElement("p", "", caseStudy.research.personaConclusion));
  researchColumn.append(personaConclusion, createExperienceGrid(caseStudy.research.needs));
  research.append(researchColumn);
  shell.append(research);

  const designQuestion = createElement("section", "case-section design-question");
  designQuestion.id = "design-question";
  designQuestion.setAttribute("aria-labelledby", "design-question-title");
  const designQuestionTitle = createElement(
    "h2",
    "design-question-title",
  );
  const questionBreak = caseStudy.designQuestion.question.indexOf(" while ");
  if (questionBreak !== -1) {
    designQuestionTitle.append(
      createElement("span", "design-question-line", caseStudy.designQuestion.question.slice(0, questionBreak)),
      createElement("span", "design-question-line", caseStudy.designQuestion.question.slice(questionBreak + 1)),
    );
  } else {
    designQuestionTitle.textContent = caseStudy.designQuestion.question;
  }
  designQuestionTitle.id = "design-question-title";
  designQuestion.append(
    createElement("p", "design-question-eyebrow", caseStudy.designQuestion.eyebrow),
    designQuestionTitle,
  );
  shell.append(designQuestion);

  const relationship = createElement("section", "case-section relationship-section");
  relationship.id = "relationship";
  const relationshipColumn = createElement("div", "reading-column");
  relationshipColumn.append(createSectionHeading(caseStudy.relationship.title));
  const relationshipCopy = createElement("div", "body-copy relationship-copy");
  relationshipCopy.append(createElement("p", "", caseStudy.relationship.introduction));
  const relationshipQuestions = createElement("p", "relationship-questions");
  caseStudy.relationship.questions.forEach((question, index) => {
    relationshipQuestions.append(document.createTextNode(question));
    if (index < caseStudy.relationship.questions.length - 1) {
      relationshipQuestions.append(document.createElement("br"));
    }
  });
  relationshipCopy.append(
    relationshipQuestions,
    createElement("p", "", caseStudy.relationship.conclusion),
  );
  relationshipColumn.append(
    relationshipCopy,
    createRelationshipGrid(caseStudy.relationship.roles),
  );
  relationship.append(relationshipColumn);
  shell.append(relationship);

  const competitiveResearch = createElement(
    "section",
    "case-section competitive-research-section",
  );
  competitiveResearch.id = "competitive-research";
  const competitiveResearchColumn = createElement("div", "reading-column");
  competitiveResearchColumn.append(
    createSectionHeading(caseStudy.competitiveResearch.title),
    createElement("p", "section-intro competitive-research-intro", caseStudy.competitiveResearch.intro),
    createCompetitiveResearchBoard(caseStudy.competitiveResearch),
  );
  competitiveResearch.append(competitiveResearchColumn);
  shell.append(competitiveResearch);

  // Flow data and renderers are retained while this section is temporarily omitted.

  const closing = createElement("section", "case-section");
  closing.id = "closing";
  const closingStage = createElement("div", "closing-stage");
  closingStage.setAttribute("aria-label", "Closing media");
  const walkthrough = createElement("iframe", "prototype-walkthrough");
  walkthrough.src = "prototypes/walkthrough/index.html?v=video-overlay-3";
  walkthrough.title = "Full Turbo Hub prototype with play, pause, and draggable timeline";
  walkthrough.loading = "lazy";
  window.addEventListener("message", (event) => {
    if (event.origin !== location.origin || event.source !== walkthrough.contentWindow || event.data?.type !== "turbo-walkthrough-size") return;
    const height = Number(event.data.height);
    if (Number.isFinite(height) && height >= 300 && height <= 1400) walkthrough.style.height = `${height}px`;
  });
  closingStage.append(walkthrough);
  closing.append(createAnnotationBand(closingStage, caseStudy.closing.annotation));
  shell.append(closing);

  shell.append(createContactSection("contact"));

  const timeline = createElement("section", "case-section");
  timeline.id = "timeline";
  timeline.setAttribute("aria-label", caseStudy.timeline.title);
  timeline.append(createTimeline());

  // Move the deeper project-detail sections into the approved narrative order.
  shell.append(
    timeline,
    technology,
    research,
    designQuestion,
    competitiveResearch,
    relationship,
    artifacts,
    flows,
    createDesignTradeoffs(),
    TurboImpactFuture.create(caseStudy.impactFuture),
    createContactSection("contact-end"),
    createCaseStudyEnding(),
  );

  contentRoot.replaceChildren(shell);
}

function createDesignTradeoffs() {
  const section = createElement("section", "case-section design-tradeoffs");
  section.id = "design-tradeoffs";
  const column = createElement("div", "reading-column");
  const heading = createSectionHeading(caseStudy.tradeoffs.title);
  heading.id = "design-tradeoffs-heading";
  section.setAttribute("aria-labelledby", heading.id);
  const screens = createElement("div", "design-tradeoffs__screens");
  caseStudy.tradeoffs.screens.forEach(screen => {
    const direction = createElement("article", "design-tradeoffs__direction");
    const directionHeading = createElement("h3", "design-tradeoffs__direction-heading", screen.heading);
    directionHeading.id = `tradeoff-${screen.route ? screen.route.split("?")[0] : screens.children.length + 1}-heading`;
    direction.setAttribute("aria-labelledby", directionHeading.id);
    const figure = createElement("figure", "design-tradeoffs__screen");
    if (screen.route) {
      figure.append(
        createScenePhone({ id: `tradeoff-${screen.route.split("?")[0]}`, label: screen.alt, route: screen.route }),
      );
    } else {
      const image = document.createElement("img");
      image.src = screen.src;
      image.alt = screen.alt;
      image.width = 280;
      image.height = 520;
      image.loading = "lazy";
      image.decoding = "async";
      const phone = createPhone({ id: `tradeoff-${screens.children.length + 1}`, label: screen.label });
      image.className = "design-tradeoffs__screen-image";
      phone.querySelector(".media-slot").replaceChildren(image);
      figure.append(phone);
    }
    direction.append(
      directionHeading,
      createElement("p", "design-tradeoffs__description", screen.description),
      figure,
    );
    screens.append(direction);
  });
  column.append(heading, createElement("p", "section-intro", caseStudy.tradeoffs.intro), screens);
  section.append(column);
  return section;
}

startCaseStudy(renderCaseStudy);
