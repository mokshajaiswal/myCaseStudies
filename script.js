document.documentElement.classList.add("js");

const caseStudy = {
  hero: {
    title: "Shaping a new family payments experience",
    summary:
      "Giving families a shared way to manage money, with clear roles and independent access.",
  },
  overview: {
    kicker: "TL;DR",
    paragraphs: [
      "One family. Different responsibilities around money.",
      "We designed a new prepaid payments proposition for PayZapp that allowed one person to manage shared funds and set spending boundaries, while other family members could access the money through their own payment experience.",
      "As a UX Designer at Zeta, I worked across the manager and member journeys, helping define how people would join, manage access, and make payments within the shared experience.",
    ],
  },
  media: [
    { id: "phone-overview", label: "Overview screen" },
    { id: "phone-manager", label: "Manager screen" },
    { id: "phone-member", label: "Member screen" },
  ],
  product: {
    title: "What exactly is Turbo Hub?",
    lead:
      "Turbo Hub was the internal codename for a prepaid payments proposition we were developing within PayZapp.",
    intro:
      "At its core was a simple idea: one person could manage money, while other family members could use it independently.",
    paragraphs: [
      "A Hub Manager could create a family Hub, fund it, and define how money could be used. Family members could then join the Hub and access that money through their own payment experience.",
      "What made Turbo Hub different from a regular wallet was the relationship between the people using it. It wasn’t just about moving money from one account to another. It was about creating a shared financial space where access, control, and responsibility could be distributed across a family.",
    ],
    meta: [
      ["Category", "B2C · Fintech · Family\nPayments · Prepaid"],
      ["My role", "End-to-End\nProduct Design"],
      ["Team", "2 Designers, 2 Developers, 1 Product Manager"],
    ],
  },
  timeline: {
    title: "Project Timeline",
    duration: "2 months",
    phases: [
      {
        period: "Weeks 1–2",
        title: "Research and alignment",
        description: "Understanding the family-payments opportunity and aligning on the proposition.",
      },
      {
        period: "Weeks 3–4",
        title: "Experience definition",
        description: "Defining manager and member roles, journeys, access, and spending boundaries.",
      },
      {
        period: "Weeks 5–6",
        title: "Design and prototyping",
        description: "Designing the connected payment journeys and building prototypes for review.",
      },
      {
        period: "Weeks 7–8",
        title: "Validation and handoff",
        description: "Refining the experience with the team and preparing the final implementation handoff.",
      },
    ],
  },
  opportunity: {
    title: "What was the business opportunity?",
    paragraphs: [
      "For HDFC Bank, the family payments proposition was more than a new feature within PayZapp. It was an opportunity to deepen relationships with existing customers while bringing more of their everyday financial activity into the product.",
      "The idea was simple: an existing customer could bring family members into PayZapp, creating more recurring payment activity and giving prepaid a larger role in how the household managed and spent money.",
      "In simple terms, the proposition had the potential to turn one customer relationship into several connected financial relationships.",
    ],
    goalsTitle: "The Business Goals",
    goals: [
      {
        number: "01",
        title: "Drive recurring payment activity",
        description:
          "Families have recurring financial needs from allowances and bills to everyday household expenses. A shared prepaid experience could make PayZapp part of more of these regular payment moments.",
      },
      {
        number: "02",
        title: "Create a new acquisition path",
        description:
          "Every manager could bring more family members into PayZapp, creating a natural acquisition loop within the household.",
      },
      {
        number: "03",
        title: "Expand how PayZapp gets used",
        description:
          "Shared family money could create more reasons to use PayZapp’s broader payment ecosystem—from transfers and bill payments to everyday spending.",
      },
    ],
  },
  technology: {
    title: "What Zeta’s technology could unlock for HDFC Bank",
    paragraphs: [
      "Zeta was already working with HDFC Bank on PayZapp, using its cloud-native payments stack to create fast, responsive experiences like swipe-to-pay and support features like tap and pay, payments limits and advanced account controls. That same foundation made it possible to think beyond individual payments and explore how PayZapp’s existing prepaid capabilities could extend to families.",
      "Family payments became a natural extension of what was already there - opening up more users, more recurring payment activity, and more ways for households to engage with PayZapp.",
    ],
    experienceTitle: "Turning the opportunity into a product experience",
    experienceIntro: "The proposition centered around two complementary experiences:",
    experiences: [
      {
        number: "1",
        tone: "blue",
        title: "Control for the manager",
        description: "Give one person a way to fund the shared account, bring family members in, and set boundaries around how money could be used.",
      },
      {
        number: "2",
        tone: "pink",
        title: "Independence for the member",
        description: "Give family members their own simple way to access and spend that money within the boundaries set for them.",
      },
    ],
  },
  artifacts: [
    {
      src: "assets/TB1.svg",
      alt: "Early sketch showing a family of four with the father managing shared finances.",
      caption: "Family structure",
    },
    {
      src: "assets/TB2.svg",
      alt: "Persona sketch showing the hub manager inviting family members into the shared hub.",
      caption: "Manager and member roles",
    },
  ],
  outcomes: {
    title: "What we wanted the proposition to achieve",
    intro: "We focused on three core outcomes with Turbo Hub:",
    items: [
      {
        number: "01.",
        title: "Bring more family members into PayZapp",
        description: "One existing customer could introduce other members of their household to PayZapp.",
      },
      {
        number: "02.",
        title: "Create reasons to come back regularly",
        description: "Allowances, household spending, and recurring family needs could create more frequent payment activity.",
      },
      {
        number: "03.",
        title: "Make prepaid part of everyday spending",
        description: "Move prepaid beyond occasional use by connecting it to regular family expenses.",
      },
    ],
    measuresTitle: "How we would measure success",
    measures: [
      {
        title: "Family member activation rate",
        description: "How many invited family members successfully joined PayZapp and became active users.",
      },
      {
        title: "Recurring payment activity",
        description: "Whether families returned to use the experience regularly, rather than treating prepaid as a one-off payment method.",
      },
      {
        title: "Family member activation rate",
        description: "How much payment activity each family relationship generated across everyday use cases.",
      },
    ],
  },
  research: {
    title: "Understanding who we were designing for",
    overview:
      "Existing PayZapp data gave us an initial picture of prepaid users. They were largely salaried adults between 20–40, with many already married and managing money within a family. Through interviews, we explored how money actually moved within these households from everyday spending and allowances to supporting children or parents.",
    insightLead: "Taken together, these conversations pointed to four recurring needs: ",
    insightEmphasis: "control, visibility, access, and independence",
    insightConclusion: "We turned those patterns into the core personas that shaped the proposition.",
    hubLabel: "Turbo Hub",
    personas: [
      {
        relation: "Father",
        tier: "manager",
        label: "Hub Manager",
        tags: ["35", "Salaried"],
        role: "Primary earner managing the family’s finances and responsibilities.",
        goal: "Give family members financial freedom while maintaining visibility and control.",
        painPoints: [
          "Worries about children misusing money",
          "Struggles to track family spending",
          "Lacks simple tools for teaching responsible money habits",
        ],
        needs: [
          "Real-time spending visibility",
          "Easy spending limits",
          "Instant authorisation",
          "Clear family dashboards",
        ],
        accent: "#536ee8",
      },
      {
        relation: "Mother",
        tier: "manager",
        label: "Hub Manager",
        tags: ["33", "Salaried"],
        role: "Joint manager of household money, sharing day-to-day financial decisions.",
        goal: "Split expenses, understand shared spending, and maintain financial transparency.",
        painPoints: [
          "Manually tracks who paid for what",
          "Awkward conversations around shared money",
          "No unified view of household spending",
        ],
        needs: [
          "Expense splitting",
          "A second manager role",
          "Shared dashboards",
          "Joint savings goals",
        ],
        accent: "#ba7a47",
      },
      {
        relation: "Daughter",
        tier: "member",
        label: "Hub Member",
        tags: ["16", "Student"],
        role: "Teenager looking for more independence in everyday spending.",
        goal: "Pay independently without repeatedly asking a parent for cash or a card.",
        painPoints: [
          "Feels awkward asking for money",
          "Wants to split bills with friends",
          "Doesn’t have her own card or bank account",
        ],
        needs: [
          "Personal digital wallet",
          "Easy top-up requests",
          "Simple payments",
          "Clear balance visibility",
        ],
        accent: "#7b6fd8",
      },
      {
        relation: "Son",
        tier: "member",
        label: "Hub Member",
        tags: ["22", "College Student"],
        role: "Young adult managing his own expenses while remaining connected to family support.",
        goal: "Stay financially independent while being able to request help for larger expenses.",
        painPoints: [
          "Wants better visibility into spending",
          "Needs support for specific expenses",
          "Wants to develop stronger financial habits",
        ],
        needs: [
          "Personal wallet",
          "Flexible top-up requests",
          "Spending insights",
          "Savings goals",
        ],
        accent: "#408da3",
      },
      {
        relation: "Grandmother",
        tier: "member",
        label: "Hub Member",
        tags: ["68", "Retired"],
        role: "Grandmother who wants digital payments to feel safe and approachable.",
        goal: "Pay for everyday essentials without relying on cash or frequent bank visits.",
        painPoints: [
          "Finds UPI confusing",
          "Worries about scams",
          "Relies on family for financial tasks",
          "Has limited confidence with digital banking",
        ],
        needs: [
          "Guided payment experience",
          "Family assistance",
          "Physical card option",
          "Simple top-ups",
        ],
        accent: "#7788ba",
      },
    ],
    learningsTitle: "What We Heard in the Interviews",
    learnings:
      "We spoke with PayZapp users across salaried households, from the parent managing the money to teenagers and older family members, and the same tensions came up in almost every conversation:",
    voices: [
      { type: "Adult", quote: "I want to give my children freedom, but I still need to know where their money is going.", accent: "#536ee8", background: "#f8f9ff" },
      { type: "Teen", quote: "I want to buy things myself without asking my mom for her card every time.", accent: "#7569c9", background: "#faf8ff" },
      { type: "Young Adult", quote: "I manage my own money now, but sometimes I still need family support for bigger expenses.", accent: "#438e98", background: "#f5fafa" },
      { type: "Elder", quote: "I wish digital payments felt simple enough that I didn’t need my daughter to do everything for me.", accent: "#7684aa", background: "#f7f8fc" },
      { type: "Adult", quote: "We need one place to see household spending instead of constantly figuring out who paid for what.", accent: "#b77a46", background: "#fcf8f3" },
    ],
  },
  designQuestion: {
    eyebrow: "The question that shaped the experience",
    question: "How could families share access to money while keeping clear boundaries around its use?",
  },
  relationship: {
    title: "Defining the relationship before designing the screens",
    introduction:
      "The interviews made one thing clear: families were not struggling to send money. The harder problem was deciding what happened after that money was shared.",
    questions: [
      "Who could use it?",
      "Who could set the boundaries?",
      "How much visibility was appropriate?",
      "And when should the person providing the money need to step in?",
    ],
    conclusion:
      "So before thinking about UI, we mapped the relationship around the money itself.",
    roles: [
      {
        number: "1",
        title: "Hub Manager",
        label: "Responsibility",
        description:
          "Funds the Hub, defines boundaries, manages access and steps in when a decision is required.",
      },
      {
        number: "2",
        title: "Hub Member",
        label: "Responsibility",
        description:
          "Joins the Hub, makes payments within the available permissions, and requests additional funds when needed.",
      },
      {
        number: "3",
        title: "The connection between them",
        label: "Responsibility",
        description:
          "A decision on one side needed to be understandable on the other. A spending limit needed to be visible to the member; a request needed to give the manager enough context to respond.",
        wide: true,
      },
    ],
  },
  closing: {
    media: { id: "phone-closing", label: "Closing media" },
    annotation: {
      src: "assets/side purple flower.svg",
      alt: "",
      text: "Here is the full product! You can get a glimpse before going deep in the data.",
    },
  },
  contact: {
    eyebrow: "Are you a recruiter or a designer?",
    message:
      "Hello, if you like what you have seen so far, please feel free to reach out. Also this is not the entire story, the end-to-end case study will give you a strong sense of my skills in multiple aspects.",
    action: {
      label: "Send Message",
      href: "https://www.linkedin.com/in/your-profile",
    },
  },
};

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
  const [firstWord, ...remainingWords] = title.split(" ");
  heading.append(
    createAssetPlaceholder(),
    createElement("span", "section-heading-lead", firstWord),
  );
  if (remainingWords.length) {
    heading.append(
      document.createTextNode(" "),
      createElement("span", "section-heading-rest", remainingWords.join(" ")),
    );
  }
  return heading;
}

function createInfoPanel(title, items) {
  const panel = createElement("section", "info-panel detail-box");
  panel.dataset.revealContainer = "";
  const heading = createElement("div", "info-panel-heading");
  heading.append(createAssetPlaceholder(), createElement("h3", "", title));

  const grid = createElement("div", "info-panel-grid");
  items.forEach((item) => {
    const card = createElement("article", "info-card");
    card.dataset.revealContainer = "";
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
    card.dataset.revealContainer = "";
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
  stage.dataset.revealContainer = "";
  stage.setAttribute("aria-label", "Early product-thinking sketches");

  items.forEach((item, index) => {
    const figure = createElement("figure", `artifact-sheet artifact-sheet--${index + 1}`);
    figure.dataset.revealContainer = "";
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";
    figure.append(image, createElement("figcaption", "", item.caption));
    stage.append(figure);
  });

  return stage;
}

function createOutcomeGrid(items) {
  const grid = createElement("div", "outcome-grid");
  items.forEach((item) => {
    const card = createElement("article", "outcome-card detail-box");
    card.dataset.revealContainer = "";
    card.append(
      createElement("span", "outcome-number", item.number),
      createElement("h3", "", item.title),
      createElement("p", "", item.description),
    );
    grid.append(card);
  });
  return grid;
}

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

function createPersonaAvatar() {
  const art = document.createElementNS(SVG_NS, "svg");
  art.setAttribute("class", "persona-avatar-art");
  art.setAttribute("viewBox", "0 0 48 48");
  art.setAttribute("aria-hidden", "true");
  art.setAttribute("focusable", "false");
  art.innerHTML =
    '<circle class="persona-avatar-field" cx="24" cy="24" r="23" />'
    + '<circle class="persona-avatar-figure" cx="24" cy="19.5" r="7.2" />'
    + '<path class="persona-avatar-figure" d="M11.4 41.8a13 13 0 0 1 25.2 0 22.6 22.6 0 0 1-25.2 0Z" />';
  return art;
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
  explorer.dataset.revealContainer = "";

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
      figure.append(createPersonaAvatar());
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
    avatar.append(createPersonaAvatar());
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
  const stack = createElement("div", "user-voice-stack");
  stack.dataset.revealContainer = "";
  stack.setAttribute("aria-label", "User interview quotes");
  let order = voices.map((_, index) => index);
  const transforms = [[0, 0, 0, 1, 1], [-8, 12, -2.2, 0.985, 1], [10, 21, 2.6, 0.968, 0.96], [-4, 29, -3.4, 0.95, 0.9]];

  const render = () => {
    stack.replaceChildren();
    const visibleOrder = order.slice(0, 4);
    visibleOrder.slice().reverse().forEach((voiceIndex, reverseIndex) => {
      const stackPosition = visibleOrder.length - 1 - reverseIndex;
      const voice = voices[voiceIndex];
      const isTop = stackPosition === 0;
      const [x, y, rotation, scale, opacity] = transforms[stackPosition];
      const card = createElement("button", "user-voice-card");
      card.type = "button";
      card.disabled = !isTop;
      card.style.cssText = `--voice-accent:${voice.accent};--voice-background:${voice.background};--voice-x:${x}px;--voice-y:${y}px;--voice-rotation:${rotation}deg;--voice-scale:${scale};--voice-opacity:${opacity};z-index:${20 - stackPosition}`;
      card.setAttribute("aria-label", isTop ? "Show next user quote" : `${voice.type} user quote`);
      card.append(
        createElement("span", "user-voice-quote", `“${voice.quote}”`),
        createElement("span", "user-voice-source", `User · ${voice.type}`),
        createElement("span", "user-voice-accent"),
      );
      if (isTop) card.addEventListener("click", () => {
        advance();
        stack.querySelector(".user-voice-card:not(:disabled)")?.focus();
      });
      stack.append(card);
    });
  };

  const advance = () => {
    order = [...order.slice(1), order[0]];
    render();
    restartCycling();
  };

  const CYCLE_INTERVAL = 6000;
  const allowsAutoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  let isVisible = false;
  let isPaused = false;

  const stopCycling = () => {
    if (timer === null) return;
    window.clearInterval(timer);
    timer = null;
  };

  const startCycling = () => {
    if (timer !== null || isPaused || !isVisible || !allowsAutoplay) return;
    timer = window.setInterval(() => {
      order = [...order.slice(1), order[0]];
      render();
    }, CYCLE_INTERVAL);
  };

  const restartCycling = () => {
    stopCycling();
    startCycling();
  };

  stack.addEventListener("pointerenter", () => {
    isPaused = true;
    stopCycling();
  });
  stack.addEventListener("pointerleave", () => {
    isPaused = false;
    startCycling();
  });
  stack.addEventListener("focusin", () => {
    isPaused = true;
    stopCycling();
  });
  stack.addEventListener("focusout", (event) => {
    if (stack.contains(event.relatedTarget)) return;
    isPaused = false;
    startCycling();
  });

  if (allowsAutoplay && typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startCycling();
        else stopCycling();
      });
    }, { threshold: 0.3 });
    observer.observe(stack);
  } else if (allowsAutoplay) {
    isVisible = true;
    startCycling();
  }

  render();
  return stack;
}

function createRelationshipGrid(items) {
  const grid = createElement("div", "relationship-grid");
  items.forEach((item) => {
    const card = createElement(
      "article",
      `relationship-card${item.wide ? " relationship-card--wide" : ""}`,
    );
    card.dataset.revealContainer = "";
    const copy = createElement("div", "relationship-card-copy");
    copy.append(
      createElement("span", "relationship-label", item.label),
      createElement("p", "", item.description),
    );
    card.append(
      createElement("span", "relationship-number", item.number),
      createElement("h3", "", item.title),
      copy,
    );
    grid.append(card);
  });
  return grid;
}

function createTimeline() {
  const card = createElement("section", "timeline-card detail-box");
  card.dataset.revealContainer = "";
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
  phone.dataset.revealContainer = "";

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

function renderCaseStudy() {
  document.querySelector("#hero-title").textContent = caseStudy.hero.title;
  document.querySelector("#hero-summary").textContent = caseStudy.hero.summary;

  const shell = createElement("div", "content-shell");

  const overview = createElement("section", "case-section reveal");
  overview.id = "overview";
  const overviewColumn = createElement("div", "reading-column");
  overviewColumn.append(createElement("h2", "section-kicker", caseStudy.overview.kicker));
  const overviewCopy = createElement("div", "body-copy");
  caseStudy.overview.paragraphs.forEach((paragraph, index) => {
    const item = createElement("p", index === 0 ? "overview-lead" : "", paragraph);
    overviewCopy.append(item);
  });
  overviewColumn.append(overviewCopy);
  overview.append(overviewColumn);

  const phoneStage = createElement("div", "phone-stage");
  phoneStage.setAttribute("aria-label", "Replaceable mobile product media");
  caseStudy.media.forEach((item) => phoneStage.append(createPhone(item)));
  overview.append(phoneStage);
  shell.append(overview);

  const product = createElement("section", "case-section reveal");
  product.id = "product";
  const productColumn = createElement("div", "reading-column");
  productColumn.append(createSectionHeading(caseStudy.product.title));
  const productCopy = createElement("div", "body-copy product-copy");
  const productIntro = createElement("p", "product-intro");
  productIntro.append(
    createElement("strong", "", caseStudy.product.lead),
    document.createTextNode(` ${caseStudy.product.intro}`),
  );
  productCopy.append(productIntro);
  caseStudy.product.paragraphs.forEach((paragraph) => {
    productCopy.append(createElement("p", "", paragraph));
  });
  productColumn.append(productCopy);

  const meta = createElement("dl", "meta-strip detail-box");
  meta.dataset.revealContainer = "";
  caseStudy.product.meta.forEach(([term, description]) => {
    const item = createElement("div", "meta-item");
    item.append(createElement("dt", "", term), createElement("dd", "", description));
    meta.append(item);
  });
  product.append(productColumn, meta);
  shell.append(product);

  const opportunity = createElement("section", "case-section reveal");
  opportunity.id = "opportunity";
  const opportunityColumn = createElement("div", "reading-column");
  opportunityColumn.append(createSectionHeading(caseStudy.opportunity.title));
  const opportunityCopy = createElement("div", "body-copy opportunity-copy");
  caseStudy.opportunity.paragraphs.forEach((paragraph, index, paragraphs) => {
    opportunityCopy.append(
      createElement(
        "p",
        index === paragraphs.length - 1 ? "opportunity-conclusion" : "",
        paragraph,
      ),
    );
  });
  opportunityColumn.append(
    opportunityCopy,
    createInfoPanel(caseStudy.opportunity.goalsTitle, caseStudy.opportunity.goals),
  );
  opportunity.append(opportunityColumn);
  shell.append(opportunity);

  const technology = createElement("section", "case-section reveal");
  technology.id = "technology";
  const technologyColumn = createElement("div", "reading-column");
  technologyColumn.append(createSectionHeading(caseStudy.technology.title));

  const technologyCopy = createElement("div", "body-copy technology-copy");
  caseStudy.technology.paragraphs.forEach((paragraph, index) => {
    technologyCopy.append(
      createElement("p", index === 1 ? "technology-takeaway" : "", paragraph),
    );
  });

  const experienceBlock = createElement("div", "experience-block");
  experienceBlock.append(
    createElement(
      "h3",
      "subsection-heading experience-heading",
      caseStudy.technology.experienceTitle,
    ),
    createElement(
      "p",
      "subsection-intro experience-intro",
      caseStudy.technology.experienceIntro,
    ),
    createExperienceGrid(caseStudy.technology.experiences),
  );
  technologyColumn.append(technologyCopy, experienceBlock);
  technology.append(technologyColumn);
  shell.append(technology);

  const artifacts = createElement("section", "case-section reveal artifact-section");
  artifacts.id = "artifacts";
  artifacts.append(createArtifactGallery(caseStudy.artifacts));
  shell.append(artifacts);

  const outcomes = createElement("section", "case-section reveal");
  outcomes.id = "outcomes";
  const outcomesColumn = createElement("div", "reading-column");
  outcomesColumn.append(
    createElement(
      "h2",
      "subsection-heading outcomes-heading",
      caseStudy.outcomes.title,
    ),
    createElement(
      "p",
      "subsection-intro outcomes-intro",
      caseStudy.outcomes.intro,
    ),
    createOutcomeGrid(caseStudy.outcomes.items),
  );

  const measures = createElement("div", "measures-block");
  measures.append(
    createElement(
      "h3",
      "subsection-heading measures-heading",
      caseStudy.outcomes.measuresTitle,
    ),
    createMeasureList(caseStudy.outcomes.measures),
  );
  outcomesColumn.append(measures);
  outcomes.append(outcomesColumn);
  shell.append(outcomes);

  const research = createElement("section", "case-section reveal");
  research.id = "research";
  const researchColumn = createElement("div", "reading-column");
  researchColumn.append(createSectionHeading(caseStudy.research.title));

  const researchCopy = createElement("div", "body-copy research-copy");
  researchCopy.append(createElement("p", "", caseStudy.research.overview));
  researchColumn.append(researchCopy);

  const learningRow = createElement("div", "learning-row");
  const learningCopy = createElement("div", "learning-copy");
  learningCopy.append(
    createElement("h3", "subsection-heading learning-heading", caseStudy.research.learningsTitle),
    createElement("p", "", caseStudy.research.learnings),
  );
  learningRow.append(learningCopy, createUserVoiceStack(caseStudy.research.voices));
  researchColumn.append(learningRow);

  const researchBridge = createElement("div", "body-copy research-copy research-bridge");
  const insight = document.createElement("p");
  insight.append(
    document.createTextNode(caseStudy.research.insightLead),
    createElement("strong", "", caseStudy.research.insightEmphasis),
    document.createTextNode(". "),
    createElement("strong", "", caseStudy.research.insightConclusion),
  );
  researchBridge.append(insight);
  researchColumn.append(
    researchBridge,
    createPersonaExplorer(caseStudy.research),
  );
  research.append(researchColumn);
  shell.append(research);

  const designQuestion = createElement("section", "case-section reveal design-question");
  designQuestion.id = "design-question";
  designQuestion.setAttribute("aria-labelledby", "design-question-title");
  designQuestion.dataset.revealContainer = "";
  const designQuestionTitle = createElement(
    "h2",
    "design-question-title",
    caseStudy.designQuestion.question,
  );
  designQuestionTitle.id = "design-question-title";
  designQuestion.append(
    createElement("p", "design-question-eyebrow", caseStudy.designQuestion.eyebrow),
    designQuestionTitle,
  );
  shell.append(designQuestion);

  const relationship = createElement("section", "case-section reveal relationship-section");
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

  const closing = createElement("section", "case-section reveal");
  closing.id = "closing";
  const closingStage = createElement("div", "closing-stage");
  closingStage.setAttribute("aria-label", "Closing media");
  closingStage.append(createPhone(caseStudy.closing.media));
  closing.append(createAnnotationBand(closingStage, caseStudy.closing.annotation));
  shell.append(closing);

  const contact = createElement("section", "case-section reveal");
  contact.id = "contact";
  contact.setAttribute("aria-label", "Contact");
  const contactCard = createElement("div", "contact-card");
  contactCard.dataset.revealContainer = "";
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
  shell.append(contact);

  const timeline = createElement("section", "case-section reveal");
  timeline.id = "timeline";
  timeline.setAttribute("aria-label", caseStudy.timeline.title);
  timeline.append(createTimeline());

  // Move the deeper project-detail sections into the approved narrative order.
  shell.append(
    timeline,
    technology,
    artifacts,
    outcomes,
    research,
    designQuestion,
    relationship,
  );

  contentRoot.replaceChildren(shell);
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

function splitParagraphIntoWords(paragraph) {
  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
  }

  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    textNode.nodeValue.split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(token));
        return;
      }

      const word = createElement("span", "reveal-word", token);
      fragment.append(word);
    });
    textNode.replaceWith(fragment);
  });

  paragraph.classList.add("line-reveal");
}

function collectParagraphLineGroups(paragraphs) {
  const lineGroups = [];

  paragraphs.forEach((paragraph) => {
    const words = Array.from(paragraph.querySelectorAll(".reveal-word"));
    let currentTop = null;
    let currentLine = null;

    words.forEach((word) => {
      const wordTop = Math.round(word.offsetTop);
      if (currentTop === null || Math.abs(wordTop - currentTop) > 2) {
        currentTop = wordTop;
        currentLine = [];
        lineGroups.push(currentLine);
      }
      currentLine.push(word);
    });
  });

  return lineGroups;
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const paragraphs = Array.from(document.querySelectorAll(".reveal p:not(.annotation-copy)"));
  paragraphs.forEach(splitParagraphIntoWords);

  const pieces = Array.from(
    document.querySelectorAll(
      [
        ".hero-copy > .asset-placeholder",
        ".hero-copy > h1",
        ".section-kicker",
        ".section-heading",
        ".phone .media-slot",
        ".meta-strip > .meta-item",
        ".info-panel-heading",
        ".info-card > .info-card-index",
        ".info-card > h4",
        ".timeline-card-title",
        ".experience-heading",
        ".experience-card > .experience-number",
        ".experience-card > h4",
        ".outcomes-heading",
        ".outcome-card > .outcome-number",
        ".outcome-card > h3",
        ".measures-heading",
        ".measure-item > .measure-bullet",
        ".measure-item > dt",
        ".measure-item > dd",
        ".persona-node",
        ".learning-heading",
        ".user-voice-quote",
        ".relationship-card > .relationship-number",
        ".relationship-card > h3",
        ".relationship-label",
        ".timeline-open",
        ".contact-heading",
        ".contact-button",
      ].join(","),
    ),
  );

  const containers = Array.from(document.querySelectorAll("[data-reveal-container]"));
  pieces.forEach((piece) => piece.classList.add("reveal-piece"));
  containers.forEach((container) => container.classList.add("reveal-surface"));

  const pendingReveals = new Set();
  const revealStep = 55;
  const containerLead = 150;
  const verticalBandTolerance = 12;
  let records = [];
  let recordByTarget = new Map();
  let nextRevealAt = 0;

  const revealRecord = (record) => {
    if (record.words) {
      record.words.forEach((word) => word.classList.add("is-revealed"));
      return;
    }
    record.target.classList.add("is-revealed");
  };

  const getParentContainer = (target, isContainer) => {
    if (isContainer) return target.parentElement?.closest("[data-reveal-container]") || null;
    return target.closest("[data-reveal-container]");
  };

  const scheduleEligibleRecords = () => {
    const now = performance.now();
    const visualTops = new Map();
    const getVisualTop = (record) => {
      if (!visualTops.has(record)) {
        visualTops.set(record, Math.round(record.target.getBoundingClientRect().top));
      }
      return visualTops.get(record);
    };

    while (true) {
      const eligible = records
        .filter((record) => {
          if (!record.isVisible || record.isScheduled) return false;
          const parentRecord = record.parentTarget
            ? recordByTarget.get(record.parentTarget)
            : null;
          return !record.parentTarget
            || record.parentTarget.classList.contains("is-revealed")
            || parentRecord?.isScheduled;
        })
        .sort((a, b) => {
          const verticalDifference = getVisualTop(a) - getVisualTop(b);
          if (verticalDifference !== 0) return verticalDifference;
          return a.target.getBoundingClientRect().left - b.target.getBoundingClientRect().left;
        });

      if (!eligible.length) break;

      const bandTop = getVisualTop(eligible[0]);
      const band = eligible.filter(
        (record) => Math.abs(getVisualTop(record) - bandTop) <= verticalBandTolerance,
      );
      let scheduledAt = Math.max(now, nextRevealAt);

      band.forEach((record) => {
        const parentRecord = record.parentTarget
          ? recordByTarget.get(record.parentTarget)
          : null;
        if (parentRecord?.isScheduled) {
          scheduledAt = Math.max(scheduledAt, parentRecord.scheduledAt + containerLead);
        }
      });

      band.forEach((record) => {
        record.isScheduled = true;
        record.scheduledAt = scheduledAt;

        const timeoutId = window.setTimeout(() => {
          revealRecord(record);
          pendingReveals.delete(timeoutId);
        }, Math.max(0, scheduledAt - now));
        pendingReveals.add(timeoutId);
      });

      nextRevealAt = scheduledAt + revealStep;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const record = recordByTarget.get(entry.target);
        if (!record) return;
        record.isVisible = true;
        observer.unobserve(entry.target);
      });
      scheduleEligibleRecords();
    },
    { threshold: 0.01, rootMargin: "0px 0px -12% 0px" },
  );

  const observeCurrentLayout = () => {
    observer.disconnect();
    pendingReveals.forEach((timeoutId) => window.clearTimeout(timeoutId));
    pendingReveals.clear();
    records = [];
    recordByTarget = new Map();
    nextRevealAt = performance.now();

    collectParagraphLineGroups(paragraphs).forEach((words) => {
      const hasRevealedWord = words.some((word) => word.classList.contains("is-revealed"));
      if (hasRevealedWord) {
        words.forEach((word) => word.classList.add("is-revealed"));
        return;
      }

      const trigger = words[0];
      if (!trigger) return;
      records.push({
        target: trigger,
        words,
        parentTarget: getParentContainer(trigger, false),
        isVisible: false,
        isScheduled: false,
        scheduledAt: 0,
      });
    });

    pieces
      .filter((piece) => !piece.classList.contains("is-revealed"))
      .forEach((piece) => {
        records.push({
          target: piece,
          words: null,
          parentTarget: getParentContainer(piece, false),
          isVisible: false,
          isScheduled: false,
          scheduledAt: 0,
        });
      });

    containers
      .filter((container) => !container.classList.contains("is-revealed"))
      .forEach((container) => {
        records.push({
          target: container,
          words: null,
          parentTarget: getParentContainer(container, true),
          isVisible: false,
          isScheduled: false,
          scheduledAt: 0,
        });
      });

    records.sort((a, b) => {
      if (a.target === b.target) return 0;
      const position = a.target.compareDocumentPosition(b.target);
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    records.forEach((record) => recordByTarget.set(record.target, record));
    records.forEach((record) => observer.observe(record.target));
  };

  observeCurrentLayout();

  let resizeFrame = null;
  const refreshLineObservers = () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(observeCurrentLayout);
  };

  window.addEventListener("resize", refreshLineObservers);
  document.fonts?.ready.then(refreshLineObservers);
}

function setupScrollProgress() {
  const progressBar = document.querySelector(".scroll-progress");
  const progressValue = progressBar?.querySelector(".scroll-progress-value");
  if (!progressBar || !progressValue) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smoothingStrength = 0.12;
  let displayedProgress = 0;
  let targetProgress = 0;
  let animationFrame = null;
  let previousFrameTime = null;
  let labelHeight = progressValue.offsetHeight;

  const readProgress = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollRange = Math.max(0, documentHeight - window.innerHeight);
    const progress = scrollRange === 0 ? 1 : window.scrollY / scrollRange;
    return Math.min(1, Math.max(0, progress));
  };

  const renderProgress = (progress) => {
    displayedProgress = progress;
    const percentage = Math.round(progress * 100);
    const labelTop = Math.min(
      Math.max(0, window.innerHeight - labelHeight),
      Math.max(0, progress * window.innerHeight - labelHeight / 2),
    );

    progressBar.style.setProperty("--scroll-progress", progress);
    progressBar.style.setProperty("--scroll-label-offset", `${labelTop}px`);
    progressBar.setAttribute("aria-valuenow", String(percentage));
    progressValue.textContent = `${percentage}%`;
  };

  const followTarget = (currentTime) => {
    const frameDuration = previousFrameTime === null
      ? 1000 / 60
      : Math.min(64, currentTime - previousFrameTime);
    previousFrameTime = currentTime;
    const frameAdjustedStrength = 1 - (1 - smoothingStrength) ** (frameDuration / (1000 / 60));
    const difference = targetProgress - displayedProgress;

    if (Math.abs(difference) < 0.0004) {
      renderProgress(targetProgress);
      animationFrame = null;
      previousFrameTime = null;
      return;
    }

    renderProgress(displayedProgress + difference * frameAdjustedStrength);
    animationFrame = window.requestAnimationFrame(followTarget);
  };

  const updateTarget = () => {
    targetProgress = readProgress();
    if (reducedMotion) {
      renderProgress(targetProgress);
      return;
    }
    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(followTarget);
    }
  };

  const handleResize = () => {
    labelHeight = progressValue.offsetHeight;
    updateTarget();
  };

  window.addEventListener("scroll", updateTarget, { passive: true });
  window.addEventListener("resize", handleResize);
  if ("ResizeObserver" in window) {
    const contentObserver = new ResizeObserver(updateTarget);
    contentObserver.observe(document.body);
  }
  targetProgress = readProgress();
  renderProgress(targetProgress);
}

renderCaseStudy();
setupReveal();
setupScrollProgress();

/*
  Public media API examples:

  CaseStudy.setMedia("phone-overview", {
    type: "image",
    src: "./assets/overview.png",
    alt: "Turbo Hub overview",
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
window.CaseStudy = Object.freeze({
  data: caseStudy,
  setMedia,
  resetMedia: (id) => setMedia(id, { type: "placeholder" }),
});
