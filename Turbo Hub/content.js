// Turbo Hub copy, navigation and ending artwork. Rendered by script.js with case-study-kit/kit.js.
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
    { id: "phone-overview", label: "PayZapp · Accounts & Cards", sceneId: "accounts-cards" },
    { id: "phone-manager", label: "Turbo Hub home · family spending", sceneId: "hub-dashboard" },
    { id: "phone-member", label: "Turbo Hub Members · family spending limits", sceneId: "members-family" },
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
    measuresTitle: "How we would measure success and find gaps",
    measures: [
      {
        title: "Member activation",
        description: "Whether invitees joined and made a first payment, where they dropped off, and how long activation took.",
      },
      {
        title: "Repeat family usage",
        description: "Whether families paid again in later months, how many members participated, and why inactive households stopped.",
      },
      {
        title: "Household payment activity",
        description: "Successful everyday payments, alongside failure reasons, approval delays and blocks caused by limits or available funds.",
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
      { type: "Priya", quote: "I want to give my children freedom, but I still need to know where their money is going.", accent: "#536ee8", background: "#f8f9ff" },
      { type: "Ananya", quote: "I want to buy things myself without asking my mom for her card every time.", accent: "#7569c9", background: "#faf8ff" },
      { type: "Aditya", quote: "I manage my own money now, but sometimes I still need family support for bigger expenses.", accent: "#438e98", background: "#f5fafa" },
      { type: "Meera", quote: "I wish digital payments felt simple enough that I didn’t need my daughter to do everything for me.", accent: "#7684aa", background: "#f7f8fc" },
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
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 1.17 1.png", "tapeTop": 7.54, "alt": "Parent wallet, autofunding, and family account shortcuts", "x": 2, "y": 4, "width": 20, "rotation": -9, "mobile": {"x": 2, "y": 4, "width": 30}},
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 1.18 1.png", "tape": false, "tapeTop": 7.33, "alt": "Family payments competitor screen: account management", "x": 21, "y": 2, "width": 15, "rotation": 6, "mobile": {"x": 36, "y": 6, "width": 29}},
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 1.18 2.png", "tape": false, "tapeTop": 7.37, "alt": "Family payments competitor screen: spending settings", "x": 35, "y": 5, "width": 14, "rotation": -4, "mobile": {"x": 68, "y": 3, "width": 31}},
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 2.27 1.png", "tapeTop": 6.44, "alt": "Revolut under 18: balance, goals, and allowance", "x": 64, "y": 4, "width": 14, "rotation": -7, "mobile": {"x": 3, "y": 46, "width": 26}},
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 2.27 2.png", "tape": false, "tapeTop": 89, "alt": "Revolut under 18 competitive research screen", "x": 80, "y": 4, "width": 19, "rotation": 8, "mobile": {"x": 36, "y": 48, "width": 29}},
      {"src": "assets/competitive_research/Screenshot 2023-12-02 at 2.30 1.png", "tape": false, "tapeTop": 6.07, "alt": "Family payments competitive research: account controls", "x": 3, "y": 49, "width": 18, "rotation": 7, "mobile": {"x": 68, "y": 42, "width": 30}},
      {"src": "assets/competitive_research/[11FS Pulse] GoHenry - Topping up - Screenshot 2.png", "tapeTop": 6.89, "alt": "GoHenry top-up flow: first funding screen", "x": 23, "y": 49, "width": 20, "rotation": -8, "mobile": {"x": 1, "y": 68, "width": 34}},
      {"src": "assets/competitive_research/[11FS Pulse] GoHenry - Topping up - Screenshot 3.png", "tape": false, "tapeTop": 6.89, "alt": "GoHenry top-up flow: subsequent funding screen", "x": 51, "y": 52, "width": 17, "rotation": 5, "mobile": {"x": 36, "y": 72, "width": 29}},
      {"src": "assets/competitive_research/[11FS Pulse] GoHenry - Exploring Allowance and Tasks - Screenshot 12.png", "tapeTop": 6.89, "alt": "GoHenry: weekly allowance and allowance day", "x": 76, "y": 49, "width": 18, "rotation": -6, "mobile": {"x": 69, "y": 69, "width": 30}},
      {"src": "assets/competitive_research/Frame.png", "tapeTop": 0.0, "alt": "Form design approach: one question at a time, condensed answers, interaction notes and analysis", "x": 49, "y": 3, "width": 13, "rotation": 3, "mobile": {"x": 67, "y": 26, "width": 24}},
      {"src": "assets/competitive_research/1/Frame.png", "tape": false, "tapeTop": 22.22, "alt": "Family Hub banner for sharing household expenses with family members", "x": 12, "y": 36, "width": 24, "rotation": -6, "mobile": {"x": 3, "y": 29, "width": 39}},
      {"src": "assets/competitive_research/1/Frame-1.png", "tape": false, "tapeTop": 16.38, "alt": "Arun Sharma manager card showing spending against his monthly limit", "x": 66, "y": 43, "width": 22, "rotation": 7, "mobile": {"x": 35, "y": 36, "width": 38}},
      {"src": "assets/competitive_research/1/Nudge.png", "tapeTop": 28.48, "alt": "Kavya Sharma top-up request for ₹5,000 with an accept request action", "x": 40, "y": 80, "width": 30, "rotation": -5, "mobile": {"x": 15, "y": 66, "width": 55}}
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
  tradeoffs: {
    title: "Directions I explored and set aside",
    intro: "To roll out an MVP and validate the idea early, we left a few initial directions out of scope. The priority was to test whether manager-funded payments worked for families before expanding the experience.",
    screens: [
      {
        heading: "NFC Pixel Tags",
        route: "pixel-tag?theme=alternative-plum",
        label: "Pixel Tag · Link or buy",
        alt: "Pixel Tag screen with options to link an existing tag or buy a new tag.",
        description: "The idea was to give members a physical NFC Pixel Tag linked to the Hub’s funds, so they could tap to pay without relying on their phone for every payment. It added convenience to the core experience. We left it out of the MVP to validate shared access to funds, spending limits and everyday payments before introducing an additional instrument.",
      },
      {
        heading: "Shared expenses",
        route: "shared-expenses?theme=alternative-teal",
        label: "Shared expenses · Concept",
        alt: "Alternative family finance concept showing shared bills, individual shares and outstanding balances.",
        description: "We also explored a single panel for payments, shared bills and splitting expenses, similar to Splitwise. Members could track their share and settle balances in one place. We set this aside to first validate access to manager-provided funds, before adding shared-expense management.",
      },
    ],
  },
  impactFuture: {
    title: "Impact & future",
    intro: "We introduced Turbo Hub to existing PayZapp users whose payment patterns suggested a household-manager role. The segmented rollout was designed to test adoption and uncover friction in joining, funding and payment approvals before expanding the experience.",
    eyebrow: "Segmented Rollout across three months",
    notesLabel: "Pilot results for member activation, repeat family usage, household payments and new-user acquisition",
    statement: "Approximately 10,000 selected PayZapp users.",
    notes: [
      { value: "64%", label: "Around 3,800 of roughly 6,000 invitees joined and paid within 30 days.", kind: "Member activation", type: "metric" },
      { label: "Around 3,000 managers created Hubs, inviting roughly 6,000 family members.", type: "quote" },
      { value: "58%", label: "Around 1,200 of roughly 2,000 eligible families paid again the next month.", kind: "Repeat family usage", type: "metric" },
      { value: "80%", label: "Around 2,400 of roughly 3,000 created Hubs paid within 30 days.", kind: "Household payment activity", type: "metric" },
      { label: "Around 4,800 invitees joined; about 3,800 went on to pay. The largest drop-off was before joining.", type: "quote" },
      { value: "48%", label: "Nearly 1,900 activated invitees were new to PayZapp.", kind: "New-user acquisition", type: "metric" },
    ],
    definitions: "Rollout: approximately 10,000 selected existing PayZapp users; 3,000 created Hubs and invited 6,000 unique family members. Member activation: 3,840 of 6,000 invitees (64%) joined and made a first successful Hub payment within 30 days of invitation. Repeat usage: 1,160 of 2,000 activated Hubs with 60 days of follow-up (58%) paid again in days 31–60 after their first successful payment. Household payment activity: 2,400 of 3,000 created Hubs with 30 days of follow-up (80%) made at least one successful Hub payment within 30 days of enrollment. New-user acquisition: 1,860 of 3,840 activated invitees (48%, rounded) were new to PayZapp at invitation. Enrollment spans three months; only complete observation windows are counted. Percentages describe participation and composition, not uplift against a baseline.",
    futureTitle: "What the rollout needed to uncover",
    future: "Pair journey data with short user follow-ups to understand why people stopped. Compare new and existing users, member roles and approval needs, using cohorts with enough follow-up.",
    diagnostics: [
      { area: "Joining and activation", evidence: "Step conversion, drop-offs and time to first payment", question: "Where did setup or the invitation lose people?" },
      { area: "Returning and participating", evidence: "Month-two/three payments and paying members per Hub", question: "What kept families coming back, or made them stop?" },
      { area: "Paying with control", evidence: "Failure reasons, approval waits, expiry and limit blocks", question: "Were funds, spending rules or approvals getting in the way?" },
    ],
  },
  learning: {
    title: "Learning",
    paragraphs: [
      "Turbo Hub explored delegated family payments before NPCI launched UPI Circle in 2024. UPI Circle lets a primary user authorise trusted secondary users to pay from their UPI account. Our learnings on invitations, spending limits and payment approvals carried forward into PayZapp’s UPI Circle, built on NPCI’s framework. The lesson was to transfer the underlying needs while using rollout evidence to challenge where the experience fell short.",
    ],
    source: { label: "NPCI · UPI Circle", href: "https://www.npci.org.in/product/upi-circle" },
    screens: [
      { src: "assets/upi-circle/home-invitation.png", alt: "PayZapp home screen inviting Nirmal to join Anoop’s UPI Circle.", width: 360, height: 800 },
      { src: "assets/upi-circle/accept-invitation.png", alt: "PayZapp UPI Circle acceptance modal over the home screen, with inviter details, terms and Accept Invite action.", width: 360, height: 800 },
    ],
    screensCaption: "PayZapp’s UPI Circle: the home-screen invitation and acceptance modal.",
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
      "Thanks for reading. If you’d like to talk about this project, exchange ideas, or explore working together, I’d love to hear from you.",
    action: {
      label: "Send Message",
      href: "https://www.linkedin.com/in/mokshajaiswal/",
    },
  },
  navigation: {
    sections: [
      ["overview", "Overview"],
      ["metrics", "Metrics"],
      ["research", "Research"],
      ["flows", "Flow"],
      ["impact-future", "Impact"],
    ],
    dial: [
      ["top", "Back to top"],
      ["overview", "Overview"],
      ["product", "Product"],
      ["opportunity", "Opportunity"],
      ["timeline", "Timeline"],
      ["technology", "Success measures"],
      ["research", "Research"],
      ["design-question", "Design question"],
      ["competitive-research", "Learnings"],
      ["relationship", "Roles"],
      ["artifacts", "Exploration"],
      ["flows", "Flows"],
      ["design-tradeoffs", "Directions set aside"],
      ["impact-future", "Impact & future"],
      ["learning", "Learning"],
    ],
  },
  ending: {
    separatorFlower: "assets/heading_flower.svg",
    sideFlower: {
      src: "assets/side purple flower.svg",
      note: "A little reflection on designing shared money for families. Your note will go here.",
    },
    card: {
      variant: "variant-2",
      hoverFlower: "purple",
      href: "https://mokshadesigns.framer.website/casestudy3",
    },
    flowersStill: "assets/closing/flowers-still.svg",
  },
};
