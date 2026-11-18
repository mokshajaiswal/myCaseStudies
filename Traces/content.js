// Traces copy, screens, videos, navigation and ending artwork. Rendered by script.js with case-study-kit/kit.js.
// The copy is carried over from the Framer version of this case study, with spelling slips corrected.
// In paragraphs, *text* is set in italics and **text** in bold, as in Framer.
const caseStudy = {
  hero: {
    title: "Traces",
    summary: "Bringing our digital memories back to the places where they belong",
  },
  overview: {
    kicker: "TL;DR",
    paragraphs: [
      "It’s an AR app that lets you \"anchor\" digital memories, like photos or voice notes, to the exact physical spots where they happened. It turns the city into a living gallery of stories that you can only unlock by being physically present and experiencing it yourself.",
    ],
    shot: { src: "assets/overview/phones.webp", width: 1780, height: 1087, bare: true, wide: true, alt: "Three Traces screens: the home map with traces near you, the full map, and the list of recent traces." },
  },
  product: {
    title: "What exactly is Traces?",
    paragraphs: [
      "Traces is an AR product concept that enables users to leave digital memories anchored to specific physical coordinates.",
      "We take photos to capture moments, but over time, those memories become static files detached from the environments that gave them life. While most digital tools help us move faster, very few help us feel deeper.",
      "By utilizing Situated Visualizations, Traces transforms everyday locations into interactive Memory Touchpoints. It is a fusion of Product Strategy and Experimental Prototyping designed to strengthen our emotional connection to place Asynchronously and Intentionally.",
    ],
    meta: [
      ["Category", "Thesis Project\n& AR Product\nConcept"],
      ["My Role", "End to End Product Designer and implementor"],
      ["Team", "Me and my Thesis Mentor"],
      ["Tools", "Figma, WebXR, React, Miro, Notion and a little AI"],
    ],
  },
  skills: {
    title: "What all I did",
    tags: ["Product Strategy", "UI System Development", "User Research (Quantitative +Qualitative)", "Interaction & Flow Design", "AR Prototype Development (WebXR)"],
    // The product walkthrough in a phone, with the side flower note, like Turbo Hub's closing walkthrough.
    video: { src: "assets/videos/product-walkthrough.mp4", poster: "assets/videos/product-walkthrough-poster.webp", label: "Traces product walkthrough" },
    annotation: { src: "assets/side-flower.svg", alt: "", text: "Here is the full product! You can get a glimpse before going deep in the data." },
  },
  timeline: {
    title: "Project Timeline",
    duration: "3 months",
    phases: [
      { period: "Week 1-2", title: "Problem space", description: "Mapped the problem space, memory behaviours, and early assumptions." },
      { period: "Week 3-4", title: "Research", description: "Surveyed users, studied place-based memory, and found core patterns." },
      { period: "Week 5-6", title: "Model and flows", description: "Defined the memory-drop model, privacy rules, and core flows." },
      { period: "Week 7-8", title: "Testing", description: "Tested comprehension, adjusted trust cues, and simplified decisions." },
      { period: "Week 9-10", title: "Design", description: "Built interaction flows, microcopy, and high-fidelity mobile screens." },
      { period: "Week 11-12", title: "Story", description: "Packaged the story: problem, evidence, decisions, visuals, and learnings." },
    ],
  },
  problem: {
    title: "The Problem",
    paragraphs: [
      "We document our lives constantly, birthdays, late-night conversations, spontaneous trips, the café we always sit at, in the form of photos, videos and voice notes. But over time, those moments become files in a camera roll.",
      "*Detached. Searchable. Scrollable.*\nRarely revisited with intention.",
      "Most digital products are optimised for efficiency:",
    ],
    efficiency: ["Faster navigation", "Instant sharing", "Infinite storage"],
    after: [
      "Very few are designed to ***preserve emotional context***.",
      "Through early exploration, three recurring gaps emerged:",
    ],
    // Rendered with the kit's three-card row, boxed.
    gaps: [
      { title: "SPATIAL DISCONNECT", description: "Digital memories are stored independently of the places/location that shaped them. The emotional layer fades as context is removed." },
      { title: "ROUTINE BEHAVIOUR LOOPS", description: "People repeatedly visit meaningful spaces yet experience them passively. Discovery becomes predictable, not intentional." },
      { title: "ASYNCHRONOUS DISCONNECTION", description: "Shared experiences are often limited by time and availability. When we can’t be there together, the moment is lost." },
    ],
    survey: {
      title: "SOME DATA",
      aside: "(Survey findings reinforced)",
      stats: [
        { value: "88%", label: "expressed interest in leaving digital memories at specific locations." },
        { value: "64%", label: "reported missing shared experiences due to scheduling conflicts." },
        { value: "66%", label: "Most Participants described existing memory tools as \"practical but emotionally flat\"." },
      ],
      result: "Confidence to pursue the grand idea of traces",
    },
    closing: [
      "Navigation tools help us **reach a destination.**\nSocial platforms help us **broadcast a moment.**",
      "Neither helps us **preserve the meaning of place.**",
    ],
  },
  opportunity: {
    id: "opportunity",
    eyebrow: "And that’s how I found my opportunity",
    lines: ["What if technology didn’t just help us move", "through spaces but helped us experience them more deeply?"],
  },
  validate: {
    title: "How I validated the idea of Traces",
    paragraphs: [
      "Before defining the solution, I needed to validate whether this gap was behavioral, emotional, or simply conceptual. I conducted a mixed-methods research study combining quantitative and qualitative methods to understand:",
    ],
    questions: ["How people currently store memories", "How they relate to meaningful places", "How they share experiences", "How they perceive AR"],
    after: "The objective was not to prove AR works. It was to understand whether people already behave in a way that supports it.",
    stats: [
      { value: "50", label: "Survey Participants" },
      { value: "9", label: "Interviews" },
      { value: "6", label: "Behavioral Themes" },
    ],
    // The research canvas, as in Framer: every photo, document and piece of tape can be picked up and moved.
    // Positions are piece centres on Framer's 1440 × 900 board; rot is in degrees.
    canvas: {
      label: "Glimpse of my research work: a board of survey charts, interview notes, coded transcripts, storyboards, a brainstorm of themes and a photo of AR testing outdoors. Drag any piece to move it.",
      title: ["Glimpse of", "my research work"],
      width: 1440,
      height: 900,
      pieces: [
      { src: "assets/research/canvas/01-photo.webp", kind: "photo", x: 412, y: 625, w: 265, h: 403, rot: 2, alt: "Photo of AR testing outdoors: holding up a phone to find a trace" },
      { src: "assets/research/canvas/02-tape.webp", kind: "tape", x: 412, y: 480, w: 88, h: 54, rot: 2, alt: "" },
      { src: "assets/research/canvas/03-doc.webp", kind: "doc", x: 870, y: 181, w: 350, h: 293, rot: -17, alt: "Coded interview transcripts, highlighted by theme" },
      { src: "assets/research/canvas/04-doc.webp", kind: "doc", x: 169, y: 264, w: 451, h: 457, rot: -28, alt: "Survey charts: how people document memorable experiences and what helps them remember places" },
      { src: "assets/research/canvas/05-doc.webp", kind: "doc", x: 1173, y: 704, w: 521, h: 524, rot: 22, alt: "Survey charts: demographics, tech comfort and interest in AR" },
      { src: "assets/research/canvas/06-photo.webp", kind: "photo", x: 1270, y: 286, w: 432, h: 533, rot: -5, alt: "Hand-drawn storyboard: discovering the app, starting Explore mode and finding a trace" },
      { src: "assets/research/canvas/07-tape.webp", kind: "tape", x: 1266, y: 510, w: 110, h: 94, rot: 29, alt: "" },
      { src: "assets/research/canvas/08-doc.webp", kind: "doc", x: 523, y: 220, w: 342, h: 346, rot: 24, alt: "Interview notes, step 1: general understanding of each participant" },
      { src: "assets/research/canvas/09-tape.webp", kind: "tape", x: 660, y: 130, w: 67, h: 70, rot: 24, alt: "" },
      { src: "assets/research/canvas/10-photo.webp", kind: "photo", x: 121, y: 661, w: 328, h: 400, rot: 9, alt: "Hand-drawn storyboard sketches of the trace screens" },
      { src: "assets/research/canvas/11-photo.webp", kind: "photo", x: 750, y: 706, w: 325, h: 414, rot: -9, alt: "Brainstorming ideas on themes" },
      { src: "assets/research/canvas/12-photo.webp", kind: "photo", x: 1012, y: 390, w: 251, h: 293, rot: 22, alt: "Notebook of themes on sticky notes" },
      { src: "assets/research/canvas/13-highlight.webp", kind: "highlight", x: 780, y: 480, w: 290, h: 127, rot: -6, alt: "" },
      ],
    },
  },
  phases: [
    {
      id: "phase-survey",
      lead: "Phase 1 -",
      title: "Quantitative Survey",
      paragraphs: ["Through a survey, I explored how people document memories and interact with physical spaces.\nWhat became clear was this:"],
      bullets: ["People capture a lot but revisit very little.", "Memories are stored efficiently, but rarely experienced again in context. Places that once felt meaningful slowly become just locations."],
      after: ["Interestingly, most participants were open to the idea of leaving or discovering memories tied to a place, especially if they had control over who could see them. This showed that the behaviour already exists. It just lacks the right interaction model."],
    },
    {
      id: "phase-interviews",
      lead: "Phase 2 -",
      title: "Qualitative Survey",
      paragraphs: ["To go deeper, I conducted interviews focused on how people remember places.", "A few consistent themes emerged:"],
      bullets: ["Memories feel stronger when triggered by space or atmosphere.", "Meaningful places are often shaped by shared experiences.", "Unexpected discovery makes moments more powerful.", "Existing digital tools feel practical — but emotionally flat.", "Privacy determines whether users feel safe engaging."],
      after: ["This shifted the direction of Traces. The value wasn’t in adding AR to a space. It was in designing for emotional reconnection."],
      tags: ["Shared Moments", "Sensory Triggers", "Privacy", "Discovery", "Emotional Depth"],
    },
    {
      id: "phase-feasibility",
      lead: "Phase 3 -",
      title: "Exploring Feasibility",
      paragraphs: ["Alongside research, I explored how AR could realistically anchor content to physical environments. This helped define boundaries early, ensuring the concept remained grounded and buildable. Because a meaningful idea still needs practical execution."],
    },
  ],
  insightStatement: {
    id: "one-insight",
    eyebrow: "After synthesising everything, one insight became clear",
    lines: ["People don't need more ways to document life.", "They need better ways to revisit it."],
  },
  insights: {
    title: "What key insights I got that gave direction to Traces",
    intro: "After synthesizing everything, FOUR insights became clear:",
    label: "Design implications",
    items: [
      { title: "Memory is Stronger When It’s Spatial.", implication: "Memories should be anchored to real-world environments, not just stored in feeds." },
      { title: "We love sharing places with others, but our schedules don't always align.", implication: "The product must support asynchronous sharing, allowing people to leave experiences for others to discover later." },
      { title: "Unexpected Discovery Amplifies Emotion.", implication: "The experience should encourage intentional exploration rather than notifications or feeds." },
      { title: "Trust Determines Adoption.", implication: "Privacy settings and visibility control must be built into the core interaction, not added later." },
    ],
    philosophy: {
      title: "Guiding Philosophy",
      text: "I believe technology should deepen our connection to the physical world, not distract us from it. With Traces, I focused on designing for presence, intention, and emotional context rather than constant engagement. Every decision was guided by one idea: create meaningful moments, not more noise.",
      frame: "assets/process/philosophy-frame.webp",
    },
  },
  process: {
    title: "How I made it real & my Design Process",
    paragraphs: ["Traces was not a linear process. It evolved through cycles of research, reframing, prototyping, and spatial validation. Because the product exists in the physical world, each phase required both conceptual thinking and real-world testing."],
    annotation: { src: "assets/side-flower.svg", alt: "", text: "There is a lot more to it, but I am gonna keep it short here." },
    from: { title: "System Thinking", note: "Experience & Interaction Design" },
    to: { title: "Real-world testing", note: "Prototype & Spatial Validation" },
    loop: ["Concept", "System", "Reality", "Iteration"],
    paper: "assets/process/paper.webp",
    // revealSize (0–1) shrinks a card's pictures where filling the whole space makes them too big.
    // Hovering a card brings in its pictures beside the track, at Framer's positions on the 1440px-wide paper (piece centres).
    tracks: [
      {
        title: "Experience & Interaction Design",
        aside: "(System Thinking)",
        direction: "forward",
        cards: [
          { title: "Core Experience Model", revealSize: 0.8, text: "After exploring a wide range of ideas and testing early concepts, finalized feature set for the traces app was shaped around three corners.", reveal: [
            { src: "assets/process/hover/1-1.webp", x: 1171, y: 371, w: 268, h: 139, rot: 1 },
            { src: "assets/process/hover/1-2.webp", x: 870, y: 783, w: 336, h: 336, rot: 7 },
            { src: "assets/process/hover/1-3.webp", x: 1064, y: 619, w: 330, h: 330, rot: 16 },
            { src: "assets/process/hover/1-4.webp", x: 883, y: 391, w: 330, h: 330, rot: -6 },
            { src: "assets/process/hover/1-5.webp", x: 1140, y: 846, w: 208, h: 78, rot: 13 },
          ] },
          { title: "System Structure & Information Architecture", revealSize: 0.78, text: "The experience activates when a user enters a location and scans the space through AR. Memory points appear only within proximity, reinforcing context and discovery through movement.", reveal: [
            { src: "assets/process/hover/2-1.webp", x: 999, y: 676, w: 562, h: 434, rot: 0 },
            { src: "assets/process/hover/2-2.webp", x: 835, y: 357, w: 196, h: 216, rot: 0 },
            { src: "assets/process/hover/2-3.webp", x: 1016, y: 331, w: 197, h: 217, rot: 14 },
            { src: "assets/process/hover/2-4.webp", x: 1190, y: 362, w: 188, h: 207, rot: 24 },
          ] },
          { title: "Branding & Logo", text: "After multiple iterations, I finalised traces as it implies, leaving and creating various traces of your memories of that location.", reveal: [
            { src: "assets/process/hover/3-1.webp", x: 1164, y: 906, w: 325, h: 163, rot: -16 },
            { src: "assets/process/hover/3-2.webp", x: 1160, y: 535, w: 468, h: 380, rot: 0 },
            { src: "assets/process/hover/3-3.webp", x: 956, y: 762, w: 628, h: 447, rot: 5 },
            { src: "assets/process/hover/3-4.webp", x: 941, y: 454, w: 571, h: 488, rot: -10 },
          ] },
          { title: "Storyboarding & Persona", text: "I synthesized interview data into personas to bridge behavior and goals. Mapping key moments identified interaction gaps, allowing me to refine AR cues and feedback for intuitive real-world use.", reveal: [
            { src: "assets/process/hover/4-1.webp", x: 1081, y: 454, w: 368, h: 445, rot: 0 },
            { src: "assets/process/hover/4-2.webp", x: 900, y: 705, w: 416, h: 441, rot: 0 },
            { src: "assets/process/hover/4-3.webp", x: 948, y: 360, w: 384, h: 464, rot: 0 },
            { src: "assets/process/hover/4-4.webp", x: 1082, y: 795, w: 449, h: 462, rot: 0 },
          ] },
        ],
      },
      {
        title: "Prototype & Spatial Validation",
        aside: "(real-world testing)",
        direction: "back",
        cards: [
          { title: "Functional AR Build", revealSize: 0.86, text: "I developed a working AR prototype to test how memories could be anchored in real space. This moved the project beyond static UI and into spatial behavior validation.", reveal: [
            { src: "assets/process/hover/5-1.webp", x: 383, y: 1531, w: 484, h: 688, rot: -10 },
            { src: "assets/process/hover/5-2.webp", x: 582, y: 1534, w: 453, h: 644, rot: 11 },
            { src: "assets/process/hover/5-3.webp", x: 589, y: 1750, w: 275, h: 142, rot: 0 },
          ] },
          { title: "Anchor Accuracy & Stability", text: "Testing revealed minor anchor drift and placement inconsistencies. I refined calibration logic and spatial positioning to ensure memories felt fixed and permanent within the environment.", reveal: [
            { src: "assets/process/hover/6-1.webp", x: 611, y: 1779, w: 542, h: 769, rot: 6 },
            { src: "assets/process/hover/6-2.webp", x: 484, y: 1392, w: 313, h: 139, rot: 0 },
            { src: "assets/process/hover/6-3.webp", x: 395, y: 1752, w: 578, h: 791, rot: -19 },
          ] },
          { title: "Scale & Distance", revealSize: 0.76, text: "Objects behaved differently depending on proximity and user movement. I adjusted distance-based scaling and visibility rules to maintain clarity without overwhelming the space.", reveal: [
            { src: "assets/process/hover/7-1.webp", x: 361, y: 1879, w: 245, h: 159, rot: 0 },
            { src: "assets/process/hover/7-2.webp", x: 578, y: 1847, w: 272, h: 156, rot: 0 },
            { src: "assets/process/hover/7-3.webp", x: 575, y: 1558, w: 177, h: 337, rot: 10 },
            { src: "assets/process/hover/7-4.webp", x: 373, y: 1550, w: 184, h: 358, rot: -6 },
          ] },
          { title: "Environmental Constraints & Interaction Feedback", text: "Outdoor testing revealed light and motion challenges, prompting me to simplify UI overlays and increase contrast for daylight readability. I also refined tap zones and feedback timing to reduce friction for users on the move.", reveal: [
            { src: "assets/process/hover/8-1.webp", x: 416, y: 1867, w: 474, h: 532, rot: -18 },
            { src: "assets/process/hover/8-2.webp", x: 599, y: 1866, w: 438, h: 523, rot: 10 },
            { src: "assets/process/hover/8-3.webp", x: 504, y: 1533, w: 704, h: 604, rot: 0 },
          ] },
        ],
      },
    ],
  },
  challenges: {
    title: "Challenges",
    paragraphs: ["Designing Traces came with both technical and design challenges. Spatial interactions behaved differently in real environments, and decisions that worked in mockups often needed refinement once tested in motion especially around anchor stability, scale, and outdoor visibility. From a design perspective, it was challenging to create an AR interface that felt minimal yet clear, without overwhelming the physical space with floating UI. Developing a functional prototype was essential but demanding, as spatial products require real-world testing to evaluate usability properly. Balancing technical feasibility with a focused, meaningful experience required continuous iteration and careful scope control."],
    tags: ["Integration with real environment", "Avoiding Feature Overload", "Anchor Stability"],
    idea: {
      title: "Initial idea",
      text: "To illustrate the initial idea in practice, I made sketches and tried if a simple AR model can be placed and recognised through my phone with WebXR. I made lo-fi sketches to see if the initial idea is feasible or not, here are a few examples of the lo-fi exploration:",
      sketches: { src: "assets/idea/sketches.webp", width: 1600, height: 1465, alt: "Two lo-fi sketch screens, a trace called Perfect Sunset and a chat with Isak, with sticky notes. The notes read: This is the initial trial of the idea, to see if web XR is working well with the idea. Through the initial rough sketches, I started identifying what not to build. Some early ideas included features like messaging systems and gallery pages, but these quickly made the product feel closer to a social media platform, which was never the goal of Traces. This helped me refocus the experience on simple and meaningful flows that directly supported the core idea of discovering and revisiting memories in real-world places. Keeping the interactions minimal ensured the concept stayed clear for users while also remaining realistic from a development perspective." },
      video: { src: "assets/videos/first-webxr-trial.mp4", poster: "assets/videos/first-webxr-trial-poster.webp", label: "The first WebXR trial: a simple AR model placed through the phone." },
    },
  },
  flows: {
    title: "Flows",
    intro: "To define how Traces behaves as a product, I mapped three primary flows centered around location-based interaction and asynchronous sharing.",
    // `scale` draws a screen shorter than the strip: leaving-3 has no sticky notes under its phones, so at full
    // height its phones would be bigger than everyone else's.
    items: [
      {
        id: "flow-discovery",
        title: "Discovery",
        text: "When a user enters a location, nearby spatial anchors are detected and surfaced through AR. Memories appear only within contextual range, and the UI provides distance and directional hints.",
        tags: ["Proximity-based visibility", "Different kinds of trace cards", "Traces near you"],
        screens: [
          { src: "assets/flows/discovery-1.webp", width: 1141, height: 757, fit: "contain", alt: "Discovery flow: the first impression after loading, a map with traces near the user, and the different kinds of traces, with sticky notes explaining each screen." },
          { src: "assets/flows/discovery-2.webp", width: 990, height: 756, alt: "Discovery flow: a trace's details and a sneak peek before exploring it." },
          { src: "assets/flows/discovery-3.webp", width: 988, height: 774, alt: "Discovery flow: more trace screens with notes." },
          { src: "assets/flows/discovery-4.webp", width: 661, height: 766, alt: "Discovery flow: the last screens of the flow." },
        ],
      },
      {
        id: "flow-leaving",
        title: "Leaving a Trace",
        text: "As the user moves within range, the interface shifts from the 2D \"Radar\" to a live AR Viewport. This transition is designed to create a sense of discovery making the digital content feel like a hidden layer of the physical street.",
        tags: ["digital assets rendered as if they are part of the physical environment", "users don’t just view they engage", "this allows the user to meet the emotions of anyone."],
        screens: [
          { src: "assets/flows/leaving-1.webp", width: 990, height: 775, alt: "Leaving a trace: from the home map into the AR view and the create screen, with sticky notes." },
          { src: "assets/flows/leaving-2.webp", width: 991, height: 775, alt: "Leaving a trace: creating a trace, choosing its title, hashtags and type of content." },
          { src: "assets/flows/leaving-3.webp", width: 984, height: 607, scale: 0.76, alt: "Leaving a trace: the last steps of creating a trace." },
        ],
      },
      {
        id: "flow-sharing",
        title: "Sharing for future discovery",
        text: "Users choose what kind of memory to leave—a photo, a voice note, or text. This is designed for Multimodal Expression, allowing the user to capture the \"feeling\" of the space.",
        tags: ["The app uses the phone’s GPS to lock the memory to the user’s exact coordinates", "Unlike a social media post made from a couch, this flow requires Physical Presence."],
        screens: [
          { src: "assets/flows/sharing-1.webp", width: 944, height: 706, alt: "Sharing a trace: choosing who can see it, public or private, with a sticky note." },
        ],
      },
    ],
  },
  // Four columns of finished screens that drift upwards, as in Framer.
  designs: {
    title: "Designs",
    columns: [
      { src: "assets/designs/column-1.webp", width: 283, height: 2569, offset: -0.09 },
      { src: "assets/designs/column-2.webp", width: 279, height: 2572, offset: -0.4 },
      { src: "assets/designs/column-3.webp", width: 279, height: 2572, offset: 0.01 },
      { src: "assets/designs/column-4.webp", width: 279, height: 2572, offset: -0.1 },
    ],
    alt: "Finished Traces screens: the splash screen, the home map, the AR view of a nearby trace, a trace's details, notifications and the create flow.",
  },
  present: {
    title: "How I Presented It",
    paragraphs: ["I developed this concept into a functional prototype using Unity and ARFoundation, leveraging ARKit/ARCore for precise World Tracking and spatial anchoring. I took help from AI to learn and implement the tech which I didn’t know earlier. To ensure the experience felt seamless, I integrated Mapbox for geospatial accuracy and Supabase to handle real-time data storage for the \"Traces.\" The final result was presented as a high-fidelity interactive walkthrough, demonstrating the full user journey from discovery to immersive AR reveal."],
    tags: ["Integration with real environment", "Avoiding Feature Overload", "Anchor Stability"],
    video: { src: "assets/videos/thesis-presentation.mp4", poster: "assets/videos/thesis-presentation-poster.webp", width: 1600, height: 1200, label: "The Traces walkthrough as presented on thesis presentation day." },
    annotation: { src: "assets/side-flower.svg", alt: "", text: "This is how I presented my work to the audience on the main thesis presentation day" },
    example: {
      title: "Example",
      paragraphs: [
        "I asked a few friends to try Traces by placing a memory for someone else to discover. What started as a simple activity quickly became a meaningful experience, and their feedback helped me refine the product further.",
        "Here are a few scenarios that show how Traces can be used in everyday life:",
      ],
      video: { src: "assets/videos/friends-trying-traces.mp4", poster: "assets/videos/friends-trying-traces-poster.webp", label: "Friends trying Traces by placing a memory for someone else to discover." },
      scenarios: [
        "A person leaves a Trace at a beautiful waterfall, sharing a poem it reminded them of. Other travellers who visit the same spot can discover it and experience that moment through their eyes.",
        "A boyfriend leaves a Trace at a place that reminds him of his girlfriend. He keeps it private and shares it with her, so one day when she visits that city, she can go there and discover it herself.",
        "A person leaves a Trace at a place that meant something to them during a certain phase of life. When they come back later, they can reconnect with that exact feeling.",
        "Someone leaves a private Trace for a person instead of sending a message. It waits for them in a place that already holds meaning between them.",
      ],
    },
  },
  impact: {
    title: "Impact & future",
    paragraphs: [
      "The project aimed to encourage people to slow down, wander, and form deeper connections with their surroundings. Testing showed that this idea was both appealing and novel participants described it as “something worth going out for.” However, enthusiasm alone did not translate into a frictionless experience.",
      "Traces succeeded in delivering a functional WebXR-based proof-of-concept with spatial anchoring logic, tested by a diverse group of users.",
    ],
    tags: ["Integration with real environment", "Avoiding Feature Overload", "Anchor Stability"],
    // Photos and quotes from testing around one statement, at their Framer positions in a 1440 × 1250 stage.
    eyebrow: "Tested by a diverse group of users",
    statement: "It showed AR can be more than a novelty: a way to preserve and uncover personal and collective stories of place.",
    statementTop: 535,
    notes: [
      { src: "assets/impact/note-1.webp", x: 62, y: 107, width: 455, height: 416, alt: "Photo from testing: Unlocking the Trace." },
      { src: "assets/impact/note-2.webp", x: 522, y: 0, width: 368, height: 187, alt: "Quote from testing: The entire experience of using traces was very unique and new to me, I loved the fact that it makes you work to unlock a memories, which just makes the whole journey gamified." },
      { src: "assets/impact/note-3.webp", x: 942, y: 57, width: 460, height: 485, alt: "Photo from testing: Using Google Maps to locate a Trace." },
      { src: "assets/impact/note-4.webp", x: 77, y: 847, width: 419, height: 402, alt: "Photo from testing: Finding a Trace." },
      { src: "assets/impact/note-5.webp", x: 500, y: 947, width: 411, height: 171, alt: "Quote from testing: I loved the idea of leaving behind your memories which could be relived by your loved ones." },
      { src: "assets/impact/note-6.webp", x: 936, y: 776, width: 482, height: 450, alt: "Photo from testing: Entering AR Mode to scan environment." },
    ],
    future: {
      title: "Future",
      paragraphs: [
        "Today, richer AR experiences are mostly limited to specialised hardware like the Apple Vision Pro or emerging smart glasses from companies like Meta. These devices show what’s possible when digital information blends naturally with the physical world.",
        "However, as smartphone hardware continues to improve, many of these spatial experiences will likely become accessible on everyday handheld devices. This shift could allow ideas like Traces to reach a much wider audience, enabling people to interact with memories and moments in more immersive and meaningful ways.",
        "Experiences that once required dedicated AR hardware could eventually become part of the devices people already carry with them every day.",
        "The possibility of making something like this more accessible is incredibly exciting. I would love to see an idea like Traces come to life, or even better, be part of building it.",
      ],
      tags: ["Allowing friends to build digital stories together in one spot.", "Improving spatial anchoring so digital marks stay perfectly in place.", "Studying how situated memories can help people look up at the world more and look down at their phones less."],
    },
  },
  learning: {
    title: "Learning",
    paragraphs: [
      "Designing for AR requires validating interactions in motion not just on screens. Even minor decisions around scale, contrast, and feedback timing significantly impact usability in real environments.",
      "I learned to prioritize system clarity over feature expansion, and to protect the core spatial experience while working within technical constraints.",
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
    // Five short labels for the tray, like the other case studies; the dial (?nav=3) lists every section.
    sections: [
      ["overview", "Overview"],
      ["problem", "Problem"],
      ["validate", "Research"],
      ["flows", "Flows"],
      ["impact", "Impact"],
    ],
    dial: [
      ["top", "Back to top"],
      ["overview", "TL;DR"],
      ["product", "What is Traces"],
      ["skills", "What I did"],
      ["problem", "The problem"],
      ["validate", "Validating the idea"],
      ["insights", "Key insights"],
      ["process", "Design process"],
      ["challenges", "Challenges"],
      ["flows", "Flows"],
      ["designs", "Designs"],
      ["present", "How I presented it"],
      ["impact", "Impact and future"],
      ["learning", "Learning"],
    ],
  },
  ending: {
    separatorFlower: "assets/heading_flower.svg",
    sideFlower: {
      src: "assets/side-flower.svg",
      note: "If you enjoyed the \"why\" behind Traces, take a look at the \"how\" of scaling a brand.",
    },
    // The next case study: IG, in the tablet card. Its picture comes from the card's defaults.
    card: {
      variant: "variant-2",
      hoverFlower: "orange",
      href: "../IG/index.html",
    },
    flowersStill: "assets/closing/flowers-still.svg",
  },
};
