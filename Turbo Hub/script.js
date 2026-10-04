document.documentElement.classList.add("js");

const caseStudy = {
  hero: {
    title: "Shaping a new family payments experience",
    summary:
      "Defining how PayZapp could extend from individual payments into shared family money.",
  },
  overview: {
    kicker: "TLDR",
    paragraphs: [
      "One family. Different responsibilities around money.",
      "Turbo Hub was a new prepaid proposition for PayZapp that let one person manage shared family money while giving members their own way to spend it.",
      "I worked across the manager and member experience, defining how people joined, accessed money, understood their limits and handled exceptions.",
    ],
  },
  media: [
    { id: "phone-overview", label: "Overview screen" },
    { id: "phone-manager", label: "Manager screen" },
    { id: "phone-member", label: "Member screen" },
  ],
  product: {
    title: "What exactly was Turbo Hub?",
    lead:
      "Turbo Hub was the internal codename for a prepaid family-payments proposition being developed within PayZapp.",
    paragraphs: [
      "A Hub Manager could create and fund a family Hub, invite members and define how the money could be used. Hub Members could then access those funds through their own payment experience.",
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
      "PayZapp primarily served the individual customer. A family proposition created an opportunity to extend that relationship across the household.",
      "An existing customer could introduce family members to PayZapp, while everyday needs such as allowances, household spending and recurring expenses could create more frequent reasons to use the product.",
    ],
    goalsTitle: "The Business Goals",
    goals: [
      {
        number: "01",
        title: "Bring more members into PayZapp",
        description:
          "Use an existing customer relationship as an entry point into the wider household.",
      },
      {
        number: "02",
        title: "Create recurring payment activity",
        description:
          "Connect PayZapp to repeated family needs rather than occasional transactions.",
      },
      {
        number: "03",
        title: "Expand everyday prepaid usage",
        description:
          "Make prepaid useful across more routine spending moments.",
      },
    ],
  },
  technology: {
    title: "What Zeta’s technology could unlock for HDFC Bank",
    paragraphs: [
      "Zeta was already working with HDFC Bank on PayZapp, using its cloud-native payments stack to create fast, responsive experiences like swipe-to-pay and support features like tap and pay, payments limits and advanced account controls. That same foundation made it possible to think beyond individual payments and explore how PayZapp’s existing prepaid capabilities could extend to families.",
      "Family payments became a natural extension of what was already there - opening up more users, more recurring payment activity, and more ways for households to engage with PayZapp.",
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
    {
      src: "assets/TB3.svg",
      alt: "Turbo Hub early product-thinking sketch, TB3.",
      caption: "Early product thinking",
    },
    {
      src: "assets/TB4.svg",
      alt: "Turbo Hub early product-thinking sketch, TB4.",
      caption: "Early product thinking",
    },
  ],
  outcomes: {
    title: "We focused on three core outcomes with Turbo Hub:",
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
        title: "Member activation",
        description: "How many invited family members successfully joined and became active PayZapp users.",
      },
      {
        title: "Repeat family usage",
        description: "Whether households returned to use the Hub for ongoing needs rather than treating it as a one-off payment method.",
      },
      {
        title: "Household payment activity",
        description: "How much everyday payment activity the Hub generated across its members.",
      },
    ],
  },
  research: {
    title: "Understanding who we were designing for",
    interviewsIntro: "We interviewed PayZapp users across these personas(mostly adults) and heard consistent pain points:",
    intro:
      "Existing PayZapp data gave us an initial picture of prepaid users. They were largely salaried adults between 20–55, with many already married and managing money within a family. Through interviews, we explored how money actually moved within these households from everyday spending and allowances to supporting children or parents.",
    personaIntro: "The interviews gave us a view into how people currently managed money within the family, while the personas helped us think through the needs of the wider household.",
    personaConclusion: "Using the interview findings and the family roles the proposition needed to support, we developed a set of personas to help us think through different levels of responsibility, confidence and independence.",
    needs: [
      { number: "1", tone: "blue", title: "Control", description: "Managers needed to define how shared money could be used, including who had access and where limits should apply." },
      { number: "2", tone: "pink", title: "Visibility", description: "They needed enough awareness of spending to feel responsible for the money, without having to supervise every transaction." },
      { number: "3", tone: "blue", title: "Access", description: "Members needed a simple way to reach and use the money available to them, regardless of their confidence with digital payments." },
      { number: "4", tone: "pink", title: "Independence", description: "Members should be able to handle everyday spending themselves within the boundaries already set for them." },
    ],
    hubLabel: "Turbo Hub",
    personas: [
      {
        relation: "Father",
        image: "assets/Father.png",
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
        image: "assets/Mother.png",
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
        image: "assets/Daughter.png",
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
        image: "assets/Son.png",
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
        relation: "Elderly member",
        image: "assets/grandmother.png",
        tier: "member",
        label: "Hub Member",
        tags: ["68", "Retired"],
        role: "Elderly family member who wants digital payments to feel safe and approachable.",
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
    voices: [
      { type: "user1", quote: "I want to give my children freedom, but I still need to know where their money is going.", accent: "#536ee8", background: "#f8f9ff" },
      { type: "user2", quote: "I want to buy things myself without asking my mom for her card every time.", accent: "#7569c9", background: "#faf8ff" },
      { type: "user3", quote: "I manage my own money now, but sometimes I still need family support for bigger expenses.", accent: "#438e98", background: "#f5fafa" },
      { type: "user4", quote: "I wish digital payments felt simple enough that I didn’t need my daughter to do everything for me.", accent: "#7684aa", background: "#f7f8fc" },
    ],
  },
  designQuestion: {
    eyebrow: "The question that shaped the experience",
    question: "How could families share access to money while keeping clear boundaries around its use?",
  },
  relationship: {
    title: "Defining the roles before designing the screens",
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
        portraits: [{ src: "assets/Father.png", alt: "Father" }],
        label: "Responsibility",
        description:
          "Funds the Hub, defines boundaries, manages access and steps in when a decision is required.",
      },
      {
        number: "2",
        title: "Hub Member",
        portraits: [
          { src: "assets/Mother.png", alt: "Mother" },
          { src: "assets/Daughter.png", alt: "Daughter" },
          { src: "assets/Son.png", alt: "Son" },
          { src: "assets/grandmother.png", alt: "Elderly member" },
        ],
        label: "Responsibility",
        description:
          "Joins the Hub, makes payments within the available permissions, and requests additional funds when needed.",
      },
    ],
  },
  competitiveResearch: {
    title: "What we learned from other products",
    intro:
      "We compared Revolut, Greenlight, Monzo, and many others to understand how they handle the split between the person managing the money and the person spending it.",
    collageTitle: "Glimpse of some competitive research",
    images: [
      {
        src: "assets/TB1.svg",
        alt: "Early competitive research notes",
        x: 5,
        y: 8,
        width: 29,
        rotation: -5,
      },
      {
        src: "assets/TB2.svg",
        alt: "Research notes exploring family money relationships",
        x: 67,
        y: 7,
        width: 25,
        rotation: 4,
      },
      {
        src: "pen files/designs-assets/image-2.png",
        alt: "Early Turbo Hub product screen",
        x: 39,
        y: 51,
        width: 22,
        rotation: -2,
      },
    ],
    insights: [
      {
            "product": "Revolut",
            "logo": "assets/company-logos/revolut.svg",
            "title": "Separate the member experience from the parent account",
            "description": "Revolut gives the younger user their own card, balance and spending experience instead of making them operate entirely through the parent’s account.",
            "takeaway": "Turbo Hub members needed their own clear experience: what money is available, what they can do with it, and what happens when they reach a limit. The manager should not be the interface for every action."
      },
      {
            "product": "Greenlight",
            "logo": "assets/company-logos/greenlight.svg",
            "title": "Make the rules specific to spending",
            "description": "Greenlight lets parents control where and how money can be spent, rather than relying only on a single overall balance.",
            "takeaway": "For Turbo Hub, a boundary needed to explain more than “you have ₹X left.” Members should be able to understand the rule attached to their spending – for example, the available amount, relevant permissions, and whether they could request a change."
      },
      {
            "product": "Monzo",
            "logo": "assets/company-logos/monzo.svg",
            "title": "Keep everyday actions with the member, account controls with the adult",
            "description": "Monzo separates everyday account use from higher-level controls. The child can view and use their money, while the adult retains control over limits and certain payment permissions.",
            "takeaway": "We separated actions by responsibility. Members should be able to check their balance, make payments and understand their own activity. Funding, changing limits and managing permissions should remain with the Hub Manager."
      }
],
  },
  productRules: {
    title: "Turning decisions into product rules",
    intro: "The research resolved into one simple operating model for the first release.",
    rules: [
      {
        number: "01",
        title: "Set the boundary",
        description: "The manager decides how much money is available.",
      },
      {
        number: "02",
        title: "Spend independently",
        description: "The member pays within that boundary without asking each time.",
      },
      {
        number: "03",
        title: "Step in by exception",
        description: "Requests appear only when the boundary needs to change.",
      },
    ],
    summary: "This became the backbone of the flows.",
  },
  flows: {
    title: "Designing the core flows",
    intro:
      "I started with low-fidelity wireframes to work through the structure of the manager and member journeys before moving into high-fidelity design.",
    continuation:
      "As the flows became clearer, I translated them into PayZapp’s existing design language, reusing familiar patterns and components so Turbo Hub felt like a natural extension of the product rather than a separate experience.",
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
  const stack = createElement("div", "user-voice-stack");
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
        createElement("span", "user-voice-source", voice.type),
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
      item.style.left = `${Math.min(maxLeft, Math.max(minLeft, item.offsetLeft + deltaX))}px`;
      item.style.top = `${Math.min(maxTop, Math.max(minTop, item.offsetTop + deltaY))}px`;
      item.style.zIndex = String(++topLayer);
    };

    item.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
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

    item.addEventListener("keydown", (event) => {
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
    const tape = createElement("span", "competitive-image-tape");
    tape.setAttribute("aria-hidden", "true");
    image.src = imageConfig.src;
    image.alt = imageConfig.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;
    item.style.left = `${imageConfig.x}%`;
    item.style.top = `${imageConfig.y}%`;
    item.style.width = `${imageConfig.width}%`;
    item.style.setProperty("--collage-rotation", `${imageConfig.rotation}deg`);
    item.style.zIndex = String(++topLayer);
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Move research image ${index + 1}. Use arrow keys for precise movement.`);
    item.setAttribute("aria-grabbed", "false");
    item.append(tape, image);
    board.append(item);
    makeDraggable(item);
  });

  const boardTitle = createElement("p", "competitive-board-title", config.collageTitle);
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
  phoneStage.setAttribute("aria-label", "Replaceable mobile product media");
  caseStudy.media.forEach((item) => phoneStage.append(createPhone(item)));
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
  closingStage.append(createPhone(caseStudy.closing.media));
  closing.append(createAnnotationBand(closingStage, caseStudy.closing.annotation));
  shell.append(closing);

  const contact = createElement("section", "case-section");
  contact.id = "contact";
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
  shell.append(contact);

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

renderCaseStudy();
setupHeroScroll();
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
