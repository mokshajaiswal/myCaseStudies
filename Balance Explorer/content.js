// Balance Explorer copy, navigation and ending artwork. Rendered by script.js with case-study-kit/kit.js.
// Draft content: facts come from the prototype's PRODUCT.md; anything marked "Placeholder" needs your copy.
const caseStudy = {
  hero: {
    title: "Making balance exploration readable for finance teams",
    summary:
      "Redesigning Balance Explorer so finance, operations and product teams can read an account hierarchy and shape their view in one place.",
  },
  overview: {
    kicker: "TLDR",
    paragraphs: [
      "One screen. Thousands of account lines. Many ways to slice them.",
      "Balance Explorer is a Finance Center tool for analysing balances across a chart of accounts, periods and related posting attributes.",
      "Placeholder: summarise your role and the outcome in one or two sentences.",
    ],
  },
  screens: {
    overview: { id: "overview-screen", label: "Balance Explorer workbench with the account hierarchy and settings panel" },
    workbench: { id: "workbench-screen", label: "Balance Explorer settings for rows, columns and periods" },
  },
  product: {
    title: "What is Balance Explorer?",
    lead:
      "Balance Explorer helps bank finance, operations and product teams explore balance data across a chart of accounts.",
    paragraphs: [
      "Users read a node hierarchy with opening and closing balances, filter it, and configure the view through Basic Parameters, Rows and Columns. Exploring balances and configuring the view are equally important tasks.",
    ],
    meta: [
      ["Category", "B2B · Fintech · Banking\nFinance operations"],
      ["My Role", "Placeholder"],
      ["Team", "Placeholder"],
    ],
  },
  timeline: {
    title: "Project timeline",
    duration: "Placeholder duration",
    phases: [
      { period: "Phase 1", title: "Placeholder: understand", description: "Placeholder: what you learned about the existing screen and its users." },
      { period: "Phase 2", title: "Placeholder: explore", description: "Placeholder: the directions you explored for hierarchy and configuration." },
      { period: "Phase 3", title: "Placeholder: refine", description: "Placeholder: how the design was tested, refined and handed over." },
    ],
  },
  problem: {
    title: "Where the old screen fell short",
    paragraphs: [
      "Placeholder: describe the problems with the original Default Balances View, its hierarchy and its settings panel.",
    ],
    goalsTitle: "What the redesign had to do",
    goals: [
      { number: "01", title: "One working context", description: "Keep balances and configuration visible together, so users inspect and configure without losing their place." },
      { number: "02", title: "Scannable hierarchy", description: "Make the account hierarchy and period comparisons easy to scan." },
      { number: "03", title: "Predictable actions", description: "Give every action a clear label and a predictable state." },
    ],
  },
  outcomes: {
    measuresTitle: "How we measured success",
    measures: [
      { title: "Placeholder measure", description: "Placeholder: what changed and how you know." },
      { title: "Placeholder measure", description: "Placeholder: what changed and how you know." },
      { title: "Placeholder measure", description: "Placeholder: what changed and how you know." },
    ],
  },
  research: {
    title: "Understanding how teams read balances",
    intro: "Placeholder: who you spoke to, what you reviewed and what stood out.",
    needs: [
      { number: "1", tone: "blue", title: "Placeholder need", description: "Placeholder: a need you found in research." },
      { number: "2", tone: "pink", title: "Placeholder need", description: "Placeholder: a second need you found in research." },
    ],
  },
  designQuestion: {
    eyebrow: "Design question",
    question: "How might we keep a deep account hierarchy readable while users reshape the view around it?",
  },
  design: {
    title: "Designing the workbench",
    paragraphs: [
      "The table and settings share one surface. Row disclosure reveals child account lines, filters narrow the top-level groups, and settings are applied explicitly.",
      "Placeholder: explain the key design decisions and the trade-offs behind them.",
    ],
  },
  learning: {
    title: "Learning",
    paragraphs: [
      "Placeholder: what this project taught you and what you would do next.",
    ],
  },
  contact: {
    eyebrow: "Are you a recruiter or a designer?",
    message:
      "Thanks for reading. If you’d like to talk about this project, exchange ideas, or explore working together, I’d love to hear from you.",
    action: {
      label: "Send Message",
      href: "https://www.linkedin.com/in/mokshajaiswal/",
    },
  },
  navigation: {
    sections: [
      ["overview", "Overview"],
      ["problem", "Problem"],
      ["metrics", "Metrics"],
      ["research", "Research"],
      ["learning", "Learning"],
    ],
    dial: [
      ["top", "Back to top"],
      ["overview", "Overview"],
      ["product", "Product"],
      ["timeline", "Timeline"],
      ["problem", "Problem"],
      ["metrics", "Success measures"],
      ["research", "Research"],
      ["design-question", "Design question"],
      ["design", "Design"],
      ["learning", "Learning"],
    ],
  },
  ending: {
    separatorFlower: "assets/heading_flower.svg",
    sideFlower: {
      src: "assets/side-flower.svg",
      note: "Placeholder: a short note beside the flower.",
    },
    card: {
      variant: "variant-1",
      hoverFlower: "blue",
      href: "../Turbo Hub/index.html",
    },
    flowersStill: "assets/closing/flowers-still.svg",
  },
};
