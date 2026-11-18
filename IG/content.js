// IG copy, screens, navigation and ending artwork. Rendered by script.js with case-study-kit/kit.js.
// The copy is carried over word for word from the Framer version of this case study.
const caseStudy = {
  hero: {
    title: "Rebuilding IG’s Global Design Foundation",
    summary:
      "How I created a scalable design system to unify brand, reduce fragmentation, and support delivery across seven markets",
    // Token and component stickers around the title, as in the Framer hero.
    stickers: [
      { src: "assets/hero/sticker-commodities.webp", width: 620, height: 288, position: "top-left" },
      { src: "assets/hero/sticker-type.webp", width: 402, height: 478, position: "mid-left" },
      { src: "assets/hero/sticker-candlesticks.webp", width: 504, height: 482, position: "top-right" },
      { src: "assets/hero/sticker-covers.webp", width: 834, height: 246, position: "mid-right" },
      { src: "assets/hero/sticker-palette.webp", width: 1040, height: 188, position: "bottom" },
    ],
  },
  overview: {
    kicker: "TL;DR",
    paragraphs: [
      "IG operated across seven global markets, but each region had evolved its digital experience independently over time. The result was an ecosystem of inconsistent page structures, visual patterns, and duplicated solutions that made the brand harder to scale and digital delivery harder to maintain.",
      "Over six months, I led the design of a new system foundation: shared components, a unified type scale, color and token structure, and reusable templates for high-traffic journeys. Rather than redesigning 500+ pages individually, we shifted the organization toward modular building blocks that could be reused across markets.",
      "As lead designer, I owned the design system architecture, component library, token model, and redesign direction for the highest-traffic pages, partnering with 15 developers and coordinating with regional teams across seven markets. The outcome was a scalable system that supported global consistency, faster implementation, and a more maintainable brand experience.",
    ],
  },
  // Two glimpses of the work. The first is the Framer device card: a tablet and a phone whose screens
  // slide through IG's redesigned pages, with the side flower note beside it. The second is the tokens board.
  glimpse: {
    annotation: {
      src: "assets/side-flower.svg",
      alt: "",
      text: "This was a huge project but here are some glimpses before going deep in the data.",
    },
    devices: {
      label: "IG's redesigned pages playing on a tablet and a phone.",
      frame: { src: "assets/overview/glimpse-devices.webp", width: 1800, height: 1045 },
      bezel: "assets/overview/tablet-bezel.svg",
      // Both screens move one slide to the left every two seconds, as in Framer.
      interval: 2000,
      tablet: Array.from({ length: 14 }, (_, index) => `assets/overview/tablet/slide-${String(index + 1).padStart(2, "0")}.webp`),
      phone: Array.from({ length: 14 }, (_, index) => `assets/overview/phone/slide-${String(index + 1).padStart(2, "0")}.webp`),
    },
    shots: [
      { src: "assets/overview/glimpse-tokens.webp", width: 1794, height: 1042, bare: true, wide: true, alt: "A board of IG design tokens: icons, spacing, typography, logo lockups, illustration covers and the red colour scale." },
    ],
  },
  problem: {
    title: "What was the Problem?",
    paragraphs: [
      "IG is a global trading platform operating across seven regulated markets, with over 300,000 active clients and access to roughly 19,000 tradable instruments.",
    ],
    givenTitle: "What We Were Given",
    brief:
      "IG’s global websites were attracting strong traffic, but users were not consistently converting into key trading actions. Important journeys such as opening an account, exploring markets, and starting a trade were often difficult to find or lacked a clear path forward. This led to lower engagement, higher drop-off across critical journeys, and missed business opportunities across multiple regions.",
    after: [
      "That was the brief. The root cause was not just weak CTAs or copy. It was a broken experience structure that created friction for users and inefficiency for the business.",
    ],
    meta: [
      ["Category", "Rebranding,\nDesign system,\nFinance"],
      ["My Role", "End to End Product Designer"],
      ["Team", "Me, 15 devs, manager, 1 PM"],
      ["Tools", "Figma, Google Analytics, Miro, Confluence"],
    ],
  },
  timeline: {
    title: "Project Timeline",
    duration: "6 months",
    phases: [
      { period: "Month 01", title: "Finding the real problem", description: "I looked past individual page issues and identified the bigger problem: IG’s experience had evolved in fragments across regions." },
      { period: "Month 02", title: "Platform audit", description: "I mapped repeated patterns, regional variations, and the components that had become inconsistent over time." },
      { period: "Month 03", title: "Defining the system foundation", description: "I defined the foundation: typography, colour, spacing, shadows, borders, radius, and responsive rules." },
      { period: "Month 04", title: "Building reusable components", description: "I built reusable navigation, headers, market cards, editorial layouts, and CTA patterns for regional teams." },
      { period: "Month 05", title: "Applying the system to key pages", description: "I applied the system to market analysis, brochure, cluster, and article pages to test if it worked in context." },
      { period: "Month 06", title: "Documentation and handoff", description: "I documented tokens, components, rules, and examples so designers and developers could keep using the system." },
    ],
  },
  discovery: {
    title: "How we discovered the real problem",
    paragraphs: [
      "IG is a globally established trading platform regulated across the UK, EU, Australia, Singapore, South Africa, the US, and the Middle East. Their core trading product is world-class. But the outer-facing websites the ones responsible for acquiring, educating, and converting new users had been quietly deprioritised for years while the trading infrastructure got all the attention.",
      "The branding was roughly 10 years old. More critically, different regional teams had been managing their own versions of the website. Over time, each team adapted pages based on local regulations, campaigns, and content needs. No one did anything wrong they were just solving problems in front of them. But the cumulative effect was a platform that had fractured into seven loosely related regional experiences that happened to share a logo.",
      "Across the audit, we found that roughly 30–50% of recurring patterns had been reinterpreted across regions, with clear inconsistencies in hierarchy, navigation, and responsive behaviour.",
      "When we reviewed the sites properly, here’s what we found on the ground:",
    ],
    problems: [
      { src: "assets/audit/problem-01.webp", width: 1200, height: 640, bare: true, alt: "Problem 01, no shared visual language: the same CTA existed in 3 different colours, labels, and sizes across regions." },
      { src: "assets/audit/problem-02.webp", width: 1200, height: 640, bare: true, alt: "Problem 02, navigation buried the key journeys: opening an account was 3 levels deep in the nav, next to 40+ other links." },
      { src: "assets/audit/problem-03.webp", width: 1200, height: 640, bare: true, alt: "Problem 03, no hierarchy on landing pages: every CTA had equal visual weight." },
      { src: "assets/audit/problem-04.webp", width: 1200, height: 640, bare: true, alt: "Problem 04, inconsistent typography eroded trust: heading sizes and weights shifted within the same page." },
      { src: "assets/audit/problem-05.webp", width: 1200, height: 640, bare: true, alt: "Problem 05, duplicate patterns built in isolation: the same market card existed in 5+ different forms across regions." },
      { src: "assets/audit/problem-06.webp", width: 1200, height: 640, bare: true, alt: "Problem 06, no responsive consistency: on mobile the primary CTA regularly fell below the fold." },
    ],
    conclusion:
      "Taken together, these weren’t isolated UX issues. They were signs of a missing system. Without shared foundations, each team was solving the same problems differently, making the product harder to use and much harder to scale.",
  },
  approach: {
    title: "How we approached it",
    scale: {
      eyebrow: "The scale of the problem",
      title: "Why page-by-page redesign was never an option",
      text: "7 regions. Each evolving independently. The maths made a traditional redesign impossible from day one.",
      stats: [
        { value: "7", label: "Global markets", note: "UK, EU, AU, SG, ZA, US, Middle East" },
        { value: "200+", label: "Pages per region", note: "Each managed by a separate team" },
        { value: "800+", label: "Total pages to support", note: "Across the entire platform" },
      ],
    },
    audit: {
      eyebrow: "What the audit revealed",
      title: "Same components — 30 different broken versions",
      text: "Despite the visual chaos, the platform was built from a small set of repeating patterns. They just existed in as many as 30 slightly different forms.",
      bars: [
        { label: "Navigation", value: 30 },
        { label: "Hero sections", value: 26 },
        { label: "Market cards", value: 23 },
        { label: "CTA blocks", value: 21 },
        { label: "Article layouts", value: 17 },
        { label: "Product modules", value: 13 },
      ],
      unit: "variants",
      callout: { value: "30", label: "broken versions of the same UI" },
    },
    framework: {
      eyebrow: "The framework",
      title: "3 page types. 3 different definitions of success.",
      text: "Categorising the platform gave us a way to define what each page needed to do and design patterns that served that specific goal.",
      // Rendered with the kit's three-card row (createTrio).
      types: [
        { label: "Cluster pages", title: "Educational hubs", description: "High-level topic introductions CFDs, forex, shares. Entry points into the ecosystem.", note: "Success when: user finds their next step" },
        { label: "MA pages", title: "Market analysis", description: "Content-heavy articles and insights needing readable, scannable editorial layouts.", note: "Success when: user reads and understands" },
        { label: "Landing pages", title: "Conversion drivers", description: "Product and campaign pages with one job get a user to take a single action.", note: "Success when: user converts" },
      ],
    },
  },
  // Pull statements, in the kit's design-question layout.
  approachStatement: {
    id: "our-approach",
    eyebrow: "And that's how we found our approach",
    lines: ["We didn't redesign 800+ pages. We built the foundations", "that made good pages repeatable at scale."],
  },
  realisation: {
    id: "realisation",
    eyebrow: "And that's when I realised that",
    lines: ["Global products don't scale through pages,", "They scale through systems."],
  },
  system: {
    title: "What I built with the team",
    subtitle: "The Component System",
    paragraphs: [
      "Once the platform was mapped, we rebuilt it around a shared component system. Every component had to solve a real problem, support regional flexibility, and work consistently across seven markets.",
      "We focused on the patterns that were breaking most often:",
    ],
    focus: [
      "Navigation and global header systems",
      "Hero sections and promotional banners",
      "Market cards and product modules",
      "Article and educational content layouts",
      "Conversion-focused CTA blocks",
    ],
    totalsIntro: "In total, we created:",
    totals: [
      { value: "150+", label: "Components built" },
      { value: "5", label: "Core Component Types" },
      { value: "7", label: "Global Markets served" },
    ],
    after: "These components were designed to be dynamic, allowing regional teams to modify content, layouts, and compliance messaging without breaking the system.",
    collage: { src: "assets/system/components-collage.webp", width: 2880, height: 1800, bare: true, wide: true, alt: "Glimpse of some components I built: course cards, a forex CTA banner, news cards, an investing hero, a portfolio chart, an app promo, a Smart Portfolio card and a component settings panel." },
    // Problem and what I did, per component group.
    fixes: [
      { title: "Navigation & global header", tag: "Navigation", tone: "blue", problem: "Collapsed hamburger on mobile. No structured slot for FCA compliance copy, a regulatory risk.", did: "Built a 3-tier system risk warning, utility bar, main nav. Compliance slots built into the structure." },
      { title: "Market cards & product modules", tag: "Data", tone: "amber", problem: "The same card existed in 5 broken variants across 5 regions. No consistency. No trust.", aside: "Same card. Every region. Every device.", did: "Standardised the hierarchy, market name, movement, pricing, entry point, and locked it." },
      { title: "Article & editorial layouts", tag: "Content", tone: "violet", problem: "Users finished reading and hit a dead end. No onward path. Long guides had no orientation.", chips: ["AI key takeaways banner", "Floating chapter sidebar"], did: "Floating chapter sidebar for in-guide navigation. AI key takeaways banner for time-pressed readers. Related content modules replaced dead ends with clear next steps." },
      { title: "Conversion CTA blocks", tag: "Conversion", tone: "green", problem: "Years of campaigns left every page with competing CTAs. When everything shouts, nothing lands.", did: "One dominant action per block. Everything else removed. Removing was as much of the design work as building." },
    ],
  },
  tokens: {
    subtitle: "Design Tokens - the foundation of the system",
    intro: "I structured the entire system into two files, a Tokens file and a Components file. So the foundations were always separate from, and upstream of, everything built on top of them.",
    // Each group's screens sit in a full-width band, as in Framer: positions are [x, y, width, height]
    // inside a 1440 × 541 band, and anything taller is cropped at the band's bottom edge.
    groups: [
      {
        lead: "Typography.",
        paragraphs: [
          "The typeface across the platform is Matter IGTF. I defined separate desktop and mobile scales for every heading level, not just scaling numbers down, but making deliberate decisions about what hierarchy needed to communicate at each viewport.",
          "Every level from heading-xl down to heading-sm, had its font family, weight, size, line height, letter spacing, and text decoration explicitly defined. Nothing was left to interpretation.",
        ],
        caption: "Example of Typography tokens",
        band: [{ src: "assets/tokens/typography.webp", alt: "Typography tokens for desktop and mobile, each with its font family, weight, size, line height, letter spacing, case and decoration.", x: 0, y: 0, width: 1440, height: 541 }],
      },
      {
        lead: "Colour.",
        paragraphs: [
          "I built a full colour token system for both light and dark themes. The primary palette is IG’s red with a complete black neutral scale. Secondary colours, teal, violet, and saffron — gave the system range without noise. A functional palette covered the full spectrum of UI states: yellow, green, blue, orange, red, and grey, each with multiple tonal stops.",
        ],
        caption: "Example of Colour tokens",
        band: [
          { src: "assets/tokens/colour-1.webp", alt: "IG colour tokens: primary, neutral, secondary and functional palettes.", x: 49, y: 30, width: 644, height: 718 },
          { src: "assets/tokens/colour-2.webp", alt: "IG colour tokens for the second theme.", x: 704, y: 30, width: 686, height: 802 },
        ],
      },
      {
        lead: "Spacing.",
        paragraphs: [
          "I defined named spacing tokens from spacing-xxs (4px) through spacing-xxxl (200px+), all derived from a consistent scale. Alongside the token definitions I built a spacing application page, so the team could see how the scale behaved in actual layouts, not just as abstract values.",
        ],
        caption: "Example of Spacing tokens",
        band: [
          { src: "assets/tokens/spacing-scale.webp", alt: "The spacing scale, from spacing-xxs to spacing-xxxl.", x: 52, y: 38, width: 409, height: 959 },
          { src: "assets/tokens/spacing-layout.webp", alt: "The spacing application page, showing the scale in a real page layout.", x: 470, y: 38, width: 918, height: 959 },
        ],
      },
      {
        lead: "Shadows and borders.",
        paragraphs: [
          "Shadow tokens at two levels — shadow-md and shadow-lg, with border radius tokens from radius-none (0px) through radius-round (50%), covering every surface type in the platform. Border widths at 1px and 2px.",
        ],
        caption: "Example of Shadows and Border tokens",
        band: [
          { src: "assets/tokens/shadows.webp", alt: "Shadow tokens shadow-md and shadow-lg.", x: 51, y: 63, width: 663, height: 372 },
          { src: "assets/tokens/borders.webp", alt: "Border radius tokens from radius-none to radius-round, and border widths.", x: 726, y: 63, width: 663, height: 586 },
        ],
      },
      {
        lead: "Illustration and Icon System.",
        paragraphs: [
          "Beyond the core tokens, I designed a configurable cover system for IG’s course and guide content — geometric illustrations across six topics (Trading strategy, Investing, Trading psychology, Asset classes, Placing a trade, Risk management), each available at Beginner, Intermediate, and Advanced levels in three colour variants.",
        ],
        caption: "Example of icons and illustrations tokens",
        band: [
          { src: "assets/tokens/icons.webp", alt: "IG's icon set.", x: 137, y: 46, width: 330, height: 673 },
          { src: "assets/tokens/illustrations.webp", alt: "Geometric cover illustrations for six topics, at three levels and in three colour variants.", x: 490, y: 46, width: 813, height: 618 },
        ],
      },
    ],
    closing: "All tokens were documented with descriptions and handed to the development team so what was built matched what I designed exactly.",
  },
  pages: {
    title: "Page Redesign",
    intro: "With 1,400+ pages across 7 regions, I couldn’t touch everything so I didn’t try. I mapped the platform to understand where users were entering, where they were dropping off, and where the highest-value decisions were being made. That gave me four page types to focus on.",
    types: [
      {
        id: "pages-market-analysis",
        title: "Market Analysis pages",
        paragraphs: [
          "Users landing on these pages were already in evaluation mode they had a specific market in mind and were deciding whether to trade it. That’s a high-intent moment. But the page wasn’t designed for it. Information that mattered to that decision live pricing, movement data, sentiment was buried under editorial content aimed at users who were still in discovery mode. The page was serving two different users at once and serving neither well.",
          "The redesign started by separating those two jobs. Users ready to trade needed immediate access to pricing data and a clear path to action. Users still learning needed context and education. Designing for both meant giving each a defined space in the page hierarchy rather than mixing them together and hoping users would find what they needed.",
        ],
        caption: "Example of Market Analysis Pages",
        band: [
          { src: "assets/pages/market-analysis-1.webp", alt: "A redesigned market analysis page, full length.", x: 58, y: 42, width: 434, height: 1855 },
          { src: "assets/pages/market-analysis-2.webp", alt: "A second redesigned market analysis page.", x: 518, y: 41, width: 433, height: 1265 },
          { src: "assets/pages/market-analysis-3.webp", alt: "A market analysis module with live pricing.", x: 977, y: 107, width: 409, height: 326 },
        ],
      },
      {
        id: "pages-cluster",
        title: "Cluster pages",
        paragraphs: [
          "These were the pages users landed on when they were trying to understand what IG actually offered what spread betting is, how CFDs work, whether IG was right for them. The user need here was orientation and confidence, not conversion. But the pages were structured as if every user had already decided to sign up, front-loading CTAs before they’d had a chance to understand the product.",
          "The redesign put comprehension before conversion. Users needed to understand the product clearly enough to want it and that required a different content hierarchy, clearer explanation of the difference between product types, and a journey that built confidence before asking for commitment.",
        ],
        caption: "Example of Cluster Pages",
        band: [
          { src: "assets/pages/cluster-1.webp", alt: "A redesigned cluster page.", x: 145, y: 26, width: 363, height: 574 },
          { src: "assets/pages/cluster-2.webp", alt: "A second redesigned cluster page.", x: 539, y: 26, width: 363, height: 574 },
          { src: "assets/pages/cluster-3.webp", alt: "A third redesigned cluster page.", x: 932, y: 26, width: 363, height: 574 },
        ],
      },
      {
        id: "pages-article",
        title: "Article pages",
        paragraphs: [
          "IG’s editorial content was genuinely valuable expert analysis, market breakdowns, trading guides written by experienced strategists. But it was being wasted. Users who read through an article had no clear path forward. There was no sense of what they should read next, no connection back to the product, and no way to navigate within longer pieces. The content was doing the hard work of building trust and then abandoning users at the moment they were most receptive.",
          "The redesign treated each article as a step in a journey, not a destination. The question for every piece of content became: what does a user who has just finished reading this need next, and how do we get them there?",
        ],
        caption: "Example of Article Pages",
        band: [
          { src: "assets/pages/article-1.webp", alt: "A redesigned article page.", x: 55, y: 43, width: 433, height: 455 },
          { src: "assets/pages/article-2.webp", alt: "A second redesigned article page.", x: 504, y: 43, width: 433, height: 455 },
          { src: "assets/pages/article-3.webp", alt: "A third redesigned article page.", x: 953, y: 43, width: 433, height: 455 },
        ],
      },
      {
        id: "pages-brochure",
        title: "Brochure pages",
        paragraphs: [
          "These pages sat at the bottom of the funnel users arriving here had already done their research and were close to a decision. The user need was simple: confirm this is the right choice, and make it easy to act. But the pages were structured more like informational hubs than decision-support pages. Too much content, too many options, no clear signal about what to do.",
          "The redesign stripped these pages back to what actually served a user at that decision point clear product differentiation, trust signals, and an unambiguous path to action at every scroll depth.",
        ],
        caption: "Example of Brochure Pages",
        band: [
          { src: "assets/pages/brochure-1.webp", alt: "A redesigned brochure page.", x: 76, y: 55, width: 464, height: 602 },
          { src: "assets/pages/brochure-2.webp", alt: "A second redesigned brochure page.", x: 546, y: 55, width: 419, height: 601 },
          { src: "assets/pages/brochure-3.webp", alt: "A third redesigned brochure page.", x: 977, y: 55, width: 387, height: 601 },
        ],
      },
    ],
  },
  beforeAfter: {
    title: "Before VS After Transforming the IG Experience",
    paragraphs: [
      "I can’t put all the screens and transformation, but what I can do is show some examples to give an idea of the type of work I did.",
      "Once the platform was mapped, the build had a clear principle behind it: every component needed to solve a real problem, not just exist. We weren’t building a library for its own sake. We were building the specific pieces that were broken, in the specific ways they were broken. Here’s where the real decisions lived.",
    ],
    hint: "Scroll inside this image to view the full screen",
    // Each comparison has three views; the viewer opens on Before.
    items: [
      {
        id: "compare-market-analysis",
        title: "Market analysis page",
        text: "The original page had too much competing information and no clear flow. We simplified the structure, improved hierarchy, and made it easier for users to understand the market, explore insights, and take action.",
        views: [
          { label: "Before", src: "assets/before-after/market-analysis-before.webp", width: 2100, height: 6761, alt: "The market analysis page before the redesign." },
          { label: "Analysis", src: "assets/before-after/market-analysis-analysis.webp", width: 2100, height: 3767, alt: "Annotated analysis of the old market analysis page." },
          { label: "After", src: "assets/before-after/market-analysis-after.webp", width: 2100, height: 8984, alt: "The redesigned market analysis page." },
        ],
      },
      {
        id: "compare-navigation",
        title: "Navigation",
        text: "The existing navigation used multiple layers, repeated links, and unclear active states, which made it difficult for users to understand where they were. We simplified the structure, clarified the role of each navigation level, and created more predictable paths between related pages.",
        views: [
          { label: "Before", src: "assets/before-after/navigation-before.webp", width: 2100, height: 1751, alt: "The navigation before the redesign." },
          { label: "Analysis", src: "assets/before-after/navigation-analysis.webp", width: 2100, height: 1772, alt: "Annotated analysis of the old navigation." },
          { label: "After", src: "assets/before-after/navigation-after.webp", width: 2100, height: 5198, alt: "The redesigned navigation." },
        ],
      },
      {
        id: "compare-news-article",
        title: "News Article Experience",
        text: "The existing article prioritised trading tools, promotions, and supporting content alongside the editorial experience, making it difficult for readers to focus on the story. I restructured the page to improve content hierarchy, readability, and information flow, creating a clearer path from headline to insight.",
        views: [
          { label: "Before", src: "assets/before-after/news-article-before.webp", width: 2100, height: 7848, alt: "The news article page before the redesign." },
          { label: "Analysis", src: "assets/before-after/news-article-analysis.webp", width: 2100, height: 4801, alt: "Annotated analysis of the old news article page." },
          { label: "After", src: "assets/before-after/news-article-after.webp", width: 2100, height: 10303, alt: "The redesigned news article page." },
        ],
      },
    ],
  },
  designChallenges: {
    title: "Design Challenges",
    intro: "Every system looks clean in a component library. The real challenge was making it work across complex content, different markets, and users with different levels of confidence.",
    // Rendered with the kit's numbered info panel.
    items: [
      { number: "01", title: "Reducing an unnecessary navigation level", description: "IG’s navigation had four levels, making deeper pages difficult to understand and content harder to find. I worked with stakeholders to move lower-priority content into relevant pages, reducing complexity without removing access." },
      { number: "02", title: "Designing for real content", description: "Components that worked well with sample content often broke with long market names, translated copy, and compliance text. We tested each pattern against real edge cases before sign-off, reducing later rework with developers." },
      { number: "03", title: "Fixing token naming early", description: "Early colour tokens were named by appearance, such as red-500, rather than purpose. This quickly became difficult to maintain. We renamed tokens around their role, creating a more flexible and understandable system." },
      { number: "04", title: "Supporting different user needs", description: "Each page had to support both experienced traders and users still learning. We balanced immediate access to key actions with enough explanation and guidance for less confident users." },
    ],
  },
  challenges: {
    title: "Challenges",
    paragraphs: [
      "None of this was straightforward.",
      "Getting aligned across regional teams was the hardest part. Each region had its own team, its own way of working, and its own opinions about what their users needed. Introducing a global system inevitably felt like a constraint to teams that had been operating autonomously. We spent a lot of time in conversations that were really about trust - showing teams that the system would give them flexibility, not take it away. That it would make their jobs faster, not harder. A lot of back-and-forth happened before we found the balance between global consistency and local adaptability.",
      "Compliance was a constant constraint. IG operates in heavily regulated markets, and different regions required different disclosures, warnings, and product variations. Components had to be flexible enough to carry compliance messaging without breaking visually. We designed configuration options into most components specially for this, defined slots for regulatory copy that sat outside the core layout logic.",
      "Scope had to be managed ruthlessly. With 1,400+ pages to consider, it was easy to get pulled into trying to solve everything at once. We had to stay disciplined, redesign the high impact pages, build the components, document the system, and let the rest migrate gradually. Trying to do it all at once meant shipping nothing.",
      "Developer collaboration was non-negotiable. The system only works if it can be built. Working closely with 15 developers, we made deliberate choices about component structure, naming conventions, configuration options, responsive behaviour, so that what we built in Figma translated cleanly into production. We held regular syncs to catch mismatches early, and the token system gave both sides a common vocabulary.",
    ],
    tags: ["Shipping less to deliver more", "Designing for the build", "Building trust, not just systems"],
  },
  // Same layout as Turbo Hub's and Balance Explorer's "Impact" (Turbo Hub/impact-future.js).
  impactFuture: {
    title: "The Results",
    intro: "The redesign created lasting improvements for users, teams, and the platform as a whole. and here are the numbers.",
    eyebrow: "The results",
    statement: "Unified 7 Markets",
    notesLabel: "Results for platform foundations, navigation, page drop-off, shared patterns, regional consistency and CTA engagement",
    notes: [
      { value: "800+", label: "Established scalable foundations that could be adopted across the platform instead of redesigning pages individually.", kind: "Pages supported", type: "metric" },
      { label: "4 → 3 navigation levels. Simplifying the information architecture reduced unnecessary complexity and made deeper content easier to discover.", type: "quote" },
      { value: "14%", label: "Reduction in page drop off", kind: "Page drop-off", type: "metric" },
      { value: "30 → 8", label: "Shared patterns. Consolidated repeated UI patterns into reusable components, reducing complexity and improving consistency.", kind: "Shared patterns", type: "metric" },
      { label: "Created a shared design system that delivered a consistent experience across regional websites while supporting local requirements.", type: "quote" },
      { value: "18%", label: "Increase in CTA engagement. Clearer information hierarchy and better placement of conversion points encouraged more users to take the next step.", kind: "CTA engagement", type: "metric" },
    ],
    futureTitle: "Beyond the numbers",
    future: "The other part is less quantifiable, regional teams went from building in isolation to building a shared foundation. Designers stopped reinventing the same components. Developers stopped interpreting inconsistent specs. The platform started to feel, for the first time like one product.",
    // Kept empty, as in Balance Explorer: the component draws a table from these.
    diagnostics: [],
  },
  numbers: {
    title: "How we Arrived at These numbers",
    paragraphs: [
      "It’s worth being transparent about where these metrics came from, because the methodology matters as much as the numbers themselves.",
      "The operational metrics, 4x faster page creation and 60% reduction in design duplication, came directly from the work itself, not from an analytics tool. At the start of the audit, we counted how many unique versions of the same component existed across the platform. That gave us the duplication baseline. At the end, we counted again. The delta is the 60%. It’s a count, not a calculation, which is why I am confident in it.",
      "The page creation speed came from conversations with the development team. Before the component system existed, building a new landing page required writing layouts from scratch, aligning with design specs, and handling edge cases that hadn’t been considered. After the system shipped, developers were assembling pages from documented, production-ready components. The team estimated the time difference themselves. We didn’t pull that from a dashboard, we asked the people doing the work.",
      "What I deliberately haven’t claimed are conversion numbers or sign up uplifts. Those exist in IG’s analytics, and the data likely shows improvement, but design systems are infrastructure, not a single shipped feature so cleanly attributing a conversion change to the system versus a campaign, a pricing change or a market moment is genuinely hard. Any number I put here would be an approximation dressed up as precision.",
      "We fixed the structural conditions that were preventing conversion, like navigation, CTAs, no clear steps, no consistency. What I can say is this: the platform was structurally incapable of performing well before. After, it was structurally equipped to. That’s the claim I’ll stand behind.",
    ],
  },
  learning: {
    title: "Learning",
    paragraphs: [
      "The temptation at the start of any large redesign is to start redesigning pages. Pages are tangible. You can point to them, present them, get feedback on them. Systems are harder to communicate and slower to show value. But they are the only thing that lasts.",
      "The other thing I’d carry forward is that the hardest design problems at enterprise scale are rarely design problems. They are alignment problems. Getting regional teams on board, building trust with developers, framing the system as enabling rather than restricting, that work happened in conversations, not Figma. The design was the easier part.",
    ],
  },
  contact: {
    eyebrow: "Are you a recruiter or a designer?",
    message:
      "Hello, if you like what you have seen so far, please feel free to reach out. Also this is not the entire story, the end-to-end case study will give you a strong sense of my skills in multiple aspects.",
    action: {
      label: "Send Message",
      href: "https://www.linkedin.com/in/mokshajaiswal/",
    },
  },
  navigation: {
    // The tray holds five short labels, like Turbo Hub and Balance Explorer; the dial (?nav=3) lists every section.
    sections: [
      ["overview", "Overview"],
      ["problem", "Problem"],
      ["system", "System"],
      ["impact-future", "Results"],
      ["learning", "Learning"],
    ],
    dial: [
      ["top", "Back to top"],
      ["overview", "TL;DR"],
      ["problem", "The problem"],
      ["discovery", "The real problem"],
      ["approach", "How we approached it"],
      ["system", "The component system"],
      ["tokens", "Design tokens"],
      ["pages", "Page redesign"],
      ["before-after", "Before vs after"],
      ["design-challenges", "Design challenges"],
      ["challenges", "Challenges"],
      ["impact-future", "Results"],
      ["numbers", "How we arrived at these numbers"],
      ["learning", "Learning"],
    ],
  },
  ending: {
    separatorFlower: "assets/heading_flower.svg",
    sideFlower: {
      src: "assets/side-flower.svg",
      note: "This project focused on scaling what already existed. Turbo Hub explores how I approached building something entirely new.",
    },
    // The next case study: Turbo Hub, as its card on the portfolio. Its picture, hover video and copy come from the card's defaults.
    card: {
      variant: "variant-1",
      hoverFlower: "purple",
      href: "../Turbo Hub/index.html",
    },
    flowersStill: "assets/closing/flowers-still.svg",
  },
};
