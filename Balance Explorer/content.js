// Balance Explorer copy, navigation and ending artwork. Rendered by script.js with case-study-kit/kit.js.
// Each screen in `shots` shows as an empty slot until it has a `src` (see script.js and README.md).
const caseStudy = {
  hero: {
    title: "Designing self‑serve balance reporting for a bank", // non-breaking hyphen keeps "self-serve" on one line
    summary:
      "Defining how Zeta's Finance Center could let HDFC Bank's card teams build, save and share their own balance views.",
  },
  overview: {
    kicker: "TLDR",
    paragraphs: [
      "A new module, built from scratch. Shipped to HDFC Bank.",
      "Balance Explorer lets HDFC Bank's credit-card finance and operations teams explore their chart of accounts, shape the view they need, and save it for the next day, the next month and the next person.",
      "I was the only designer, working with product managers and engineers over four months. Daily balancing got about 80% faster, the month-end trend report went from about two days to under half a day, and custom report requests to Zeta fell by about 65%.",
    ],
  },
  // Kept plain and laid out like the TLDR. The flow follows one card payment from swipe to books.
  product: {
    title: "Context",
    paragraphs: [
      "Zeta runs HDFC Bank's credit cards on its Tachyon Credit platform. Every card payment is recorded as a posting, and postings add up to balances in the bank's chart of accounts, the tree of all its ledgers.",
      "Those balances go into the bank's books and reports, so they have to be right. Finance Center is where the bank manages this data. Balance Explorer is how its teams look inside it.",
    ],
    diagram: [
      { title: "Payment", note: "A customer pays ₹500 with an HDFC credit card." },
      { title: "Posting", note: "Tachyon Credit records the ₹500 against that card's account." },
      { title: "Balance", note: "The account's postings add up to its balance." },
      { title: "Books", note: "Balances roll up into the bank's books and reports." },
    ],
  },
  problem: {
    title: "Problem",
    paragraphs: [
      "The balances were all there, but nobody could really look at them. To check whether yesterday's numbers matched, someone on the ops team would export the data, paste it into Excel and build the same pivot they'd built the day before.",
    ],
    costs: [
      { number: "01", title: "It was slow", description: "Balancing took around three hours every morning, and the month-end trend report took about two days." },
      { number: "02", title: "It depended on us", description: "Anything outside the usual exports became a report request to us at Zeta, and the team waited for it." },
      { number: "03", title: "It was easy to get wrong", description: "Every export, paste and pivot was another chance for a number to slip before it reached the books." },
    ],
    meta: [
      ["Category", "B2B · Fintech · Banking"],
      ["My Role", "Sole designer, research to dev handoff"],
      ["Team", "Product managers, engineers"],
    ],
  },
  // The four personas from the stakeholder interviews, each with the question they kept asking.
  people: {
    title: "Who it's for",
    intro: "I ran stakeholder interviews with the people who would use Balance Explorer every day, and four personas came out of them clearly. They all worked from the same balances, but each came with a different question. The tool had to answer all four without turning into four different tools.",
    personas: [
      { role: "Operations", question: "Did yesterday's balances match?" },
      { role: "Finance controller", question: "How are balances trending month on month?" },
      { role: "Card product managers", question: "How did POS, e-commerce and cash move this quarter?" },
      { role: "Accounting and audit", question: "Does everything line up before it's reported?" },
    ],
  },
  designQuestion: {
    eyebrow: "Design question",
    lines: [
      "How might we give a bank's finance teams",
      "one place to explore, shape and keep their views,",
      "so the answer they need is always one click away?",
    ],
  },
  // Process: an earlier version of the explorer screen, before the decisions below.
  earlier: {
    title: "Where it started",
    paragraphs: [
      "This is an earlier version of the explorer screen. It showed one period at a time, the four top-level groups and a Configure View panel with Apply and Cancel. Everything below grew out of what people still couldn't do here.",
    ],
    shot: { id: "shot-earlier", kind: "Still", wide: true, bare: true, narrow: true, src: "assets/screens/earlier-version.webp", width: 2000, height: 1533, caption: "An earlier version of the explorer screen." },
  },
  // Each decision: the user's question, a short setup, beats (what I did, and why), what I tried first, then screens.
  // Each decision shows close-up loops only; the full window appears once, in the TLDR.
  decisions: [
    {
      id: "decision-ledger",
      label: "The table",
      title: "Where is this balance coming from?",
      paragraphs: [
        "The tree goes Assets, Revolving Credit, Credit Card, Platinum Credit Card, and every account has its own posting codes underneath. The ops team needed to reach one number quickly without losing track of where it came from.",
      ],
      beats: [
        { lead: "I gave each top-level group a colour.", aside: "Green for assets and income, orange for expense and liability, so you can tell where you are at a glance." },
        { lead: "Codes open from the eye icon on a row.", aside: "They're details of an account, so I didn't want them to look like more accounts." },
        { lead: "The account column stays fixed.", aside: "When you scroll across two periods, you don't lose the row." },
      ],
      triedTitle: "Other directions I tried",
      tried: [
        { number: "A", title: "Tags and guiding lines on every row.", description: "They made an already dense table harder to read." },
        { number: "B", title: "Numbering each level of the tree.", description: "It showed how deep you were, but not what you were looking at." },
        { number: "C", title: "Putting the codes in boxed panels.", description: "The codes started to look like extra rows." },
      ],
      shots: [
        { id: "shot-table-detail", kind: "Loop", wide: true, video: "assets/screens/shot-table-detail.mp4", src: "assets/screens/shot-table-detail.webp", width: 1920, height: 1200, caption: "Moving down the tree, hiding and showing an account’s codes, then opening Income." },
      ],
    },
    {
      id: "decision-shape",
      label: "The settings panel",
      title: "Can I see it my way, without asking Zeta?",
      paragraphs: [
        "Most report requests to Zeta came down to four choices: which accounts, which periods, what goes in the rows and what goes in the columns. I put those choices in a panel next to the table.",
      ],
      beats: [
        { lead: "Three tabs: Basic parameters, Rows, Columns.", aside: "Roughly the order people think in: when, then what to list, then what to measure." },
        { lead: "The panel stays beside the table.", aside: "So you can see what each change will affect." },
        { lead: "Nothing changes until you press Apply.", aside: "Recalculating on every click was slow and made the table jump around." },
      ],
      triedTitle: "Other directions I tried",
      tried: [
        { number: "A", title: "A step-by-step pop-up.", description: "It hid the table while you set it up, so you couldn't see what each choice did." },
        { number: "B", title: "A panel on the left.", description: "Finance Center's main menu already sits there, so the two clashed." },
        { number: "C", title: "A floating window.", description: "It covered the numbers you were changing." },
      ],
      shots: [
        { id: "shot-shape-detail", kind: "Loop", wide: true, video: "assets/screens/shot-shape-detail.mp4", src: "assets/screens/shot-shape-detail.webp?v=2", width: 1920, height: 1200, caption: "Changing the cycle, adding posting codes and a column, then applying." },
      ],
    },
    {
      id: "decision-views",
      label: "Saved views",
      title: "Do I have to build this again tomorrow?",
      paragraphs: [
        "The controller was rebuilding the same month-end report every month, which is a big part of why it took two days. Once a view was set up, it needed to stay set up.",
      ],
      beats: [
        { lead: "Every view has a name and a code.", aside: "You can find it again, and point someone else to it." },
        { lead: "An asterisk appears as soon as you change something.", aside: "So it's always clear whether you're looking at the saved version." },
        { lead: "Built-in views can't be overwritten.", aside: "You save a copy instead, and the default stays the same for everyone." },
      ],
      triedTitle: "Other directions I tried",
      tried: [
        { number: "A", title: "Opening on the All views page.", description: "Most people start from the default view, so it only added a click." },
      ],
      shots: [
        { id: "shot-save-detail", kind: "Loop", wide: true, video: "assets/screens/shot-save-detail.mp4", src: "assets/screens/shot-save-detail.webp", width: 1920, height: 1200, caption: "Opening a saved view, changing it, then saving it." },
        { id: "shot-views-detail", kind: "Loop", wide: true, video: "assets/screens/shot-views-detail.mp4", src: "assets/screens/shot-views-detail.webp?v=2", width: 1920, height: 1200, caption: "Switching views from the title, then browsing All views." },
      ],
    },
    {
      id: "decision-sharing",
      label: "Sharing",
      title: "Will my colleague be able to open this?",
      paragraphs: [
        "Sharing a view usually means \"can you check this for me?\". If the other person can't open the link, it turns into a back-and-forth.",
      ],
      beats: [
        { lead: "Share shows who can see the view before it gives you a link.", aside: "You know what the other person will get." },
        { lead: "Private views don't get a link.", aside: "You get a shortcut to change who can see it instead." },
        { lead: "If you have unsaved changes, Share tells you.", aside: "The link opens the last saved version, not what's on your screen." },
      ],
      triedTitle: "Other directions I tried",
      tried: [
        { number: "A", title: "Letting people copy a private link, with a warning.", description: "People skip warnings, and their colleague still couldn't open it." },
      ],
      shots: [
        { id: "shot-sharing-detail", kind: "Loop", wide: true, video: "assets/screens/shot-sharing-detail.mp4", src: "assets/screens/shot-sharing-detail.webp?v=2", width: 1920, height: 1200, caption: "Share on a view everyone can see, then on a private one." },
      ],
    },
  ],
  trust: {
    title: "Loading, errors and empty states",
    paragraphs: [
      "Finance teams stop trusting a tool the first time it surprises them, so I designed every loading, error and empty state as carefully as the main screens.",
      "Everything uses Zeta's Galaxy Design System. Where I needed to break from it, I worked it out with the GDS designer and engineers during the audit. Changes glide into place instead of jumping, and updated numbers flash briefly so you notice them.",
    ],
    shots: [
      { id: "shot-trust-states", kind: "Loop", wide: true, video: "assets/screens/shot-trust-states.mp4", src: "assets/screens/shot-trust-states-poster.webp", width: 1920, height: 1200, caption: "Loading, a failed load, a failed Apply and an empty library." },
    ],
  },
  // Same layout as Turbo Hub's "Impact & future" (its impact-future.js): selection frames around each number,
  // speech-bubble captions, one statement in the middle, then what to look at next.
  impactFuture: {
    title: "Impact",
    intro: "Balance Explorer shipped inside Finance Center, and HDFC Bank's card finance and operations teams now use it for daily balancing, month-end reporting and product analysis. Here is what changed after launch.",
    eyebrow: "After launch",
    statement: "Shipped to HDFC Bank's card finance teams.",
    notesLabel: "Results for daily balancing, the month-end report, report requests and weekly use",
    notes: [
      { value: "~80%", label: "Faster daily balancing: from about 3 hours to about 35 minutes.", kind: "Daily balancing", type: "metric" },
      { label: "The most-used saved views were reopened every working day.", type: "quote" },
      { value: "< ½ day", label: "For the month-end trend report, down from about two days.", kind: "Month-end report", type: "metric" },
      { value: "~65%", label: "Fewer custom report requests to Zeta after launch.", kind: "Report requests", type: "metric" },
      { label: "Saved views were shared across teams, not kept by the person who built them.", type: "quote" },
      { value: "~80%", label: "Of target users were using it every week after launch.", kind: "Weekly use", type: "metric" },
    ],
    futureTitle: "What I'd look at next",
    future: "People kept coming back, which was the point. Next, I'd want to know which saved views each team relies on, and where people still export to Excel.",
    // Kept empty: the Turbo Hub component draws a table from these, and this page reads better without one.
    diagnostics: [],
  },
  // Shots outside the decisions: the hero screen. The context flow is drawn from product.diagram.
  screens: {
    hero: { id: "shot-hero", kind: "Loop", frame: "browser", address: "Finance Center · Balance Explorer", video: "assets/screens/explorer-tour.mp4?v=2", src: "assets/screens/explorer.webp", width: 2880, height: 1800, caption: "A glimpse of Balance Explorer, built with Zeta's Galaxy Design System." },
  },
  // Same layout as Turbo Hub's Learning: one paragraph.
  learning: {
    title: "Learnings",
    paragraphs: [
      "This was my first time designing for accounting, and the weeks I spent learning charts of accounts and posting codes paid off more than any screen I drew. The biggest gains came from the second visit, not the first: once a view was saved, nobody had to rebuild that report again. Next, I'd push for scheduled reports, so the month-end view arrives on its own, and for flagging balance breaks automatically.",
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
      ["decision-ledger", "Decisions"],
      ["impact-future", "Impact"],
      ["learning", "Learnings"],
    ],
    dial: [
      ["top", "Back to top"],
      ["overview", "Overview"],
      ["product", "Context"],
      ["problem", "Problem"],
      ["people", "Who it's for"],
      ["design-question", "Design question"],
      ["earlier", "Where it started"],
      ["decision-ledger", "The table"],
      ["decision-shape", "The settings panel"],
      ["decision-views", "Saved views"],
      ["decision-sharing", "Sharing"],
      ["trust", "Loading, errors and empty states"],
      ["impact-future", "Impact"],
      ["learning", "Learnings"],
    ],
  },
  ending: {
    separatorFlower: "assets/heading_flower.svg?v=9",
    sideFlower: {
      src: "assets/side-flower.svg?v=2",
      note: "Some decisions took more back and forth than fits on a page. Happy to walk you through them.",
    },
    card: {
      variant: "variant-1",
      hoverFlower: "purple",
      href: "../Turbo Hub/index.html",
    },
    flowersStill: "assets/closing/flowers-still.svg?v=2",
  },
};
