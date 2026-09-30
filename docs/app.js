const mediaBase = "https://media.githubusercontent.com/media/mokshajaiswal/myCaseStudies/design-iteration-2/Research%20Masters%20work/";

const research = [
  {
    slug: "ample",
    title: "Ample",
    file: "Ample.pdf",
    type: "pdf",
    summary: "A digital service helping small independent restaurants prevent food waste through better inventory planning and coordinate donations when surplus is unavoidable.",
    methods: "Literature review, competitive analysis, survey with 15 food establishments, personas, MoSCoW prioritisation, conjecture mapping and journey mapping"
  },
  {
    slug: "hexa-1",
    title: "Hexa 1",
    file: "Hexa%201.pdf",
    type: "pdf",
    summary: "A cart-mounted scanner and companion app that helps shoppers with allergies or dietary restrictions identify suitable products quickly and confidently.",
    methods: "Online community and market research, interviews, surveys, focus groups, stakeholder consultation, user flows and eight prototype test scenarios"
  },
  {
    slug: "hexa-2",
    title: "Hexa 2",
    file: "Hexa%202.pdf",
    type: "pdf",
    summary: "A usability-led redesign of Hexa that explores simpler app-only and shelf-mounted experiences after testing exposed friction in the original two-device system.",
    methods: "Task-based usability evaluation, observation, feedback analysis, design-direction exploration, user flows and iterative prototyping"
  },
  {
    slug: "modular-interactive-2",
    title: "Word Cube - Interactive Sculpture",
    file: "Modular%20and%20Interative%20Structure%20%202.pdf",
    type: "pdf",
    summary: "A modular physical installation where people rearrange word cubes to create unexpected sentences that are translated into a responsive sound experience.",
    methods: "Collaborative brainstorming, conceptual research, physical prototyping, interaction mapping, Arduino electronics and Pure Data sound implementation"
  },
  {
    slug: "modular-interactive",
    title: "Word Cube - Technical Contribution",
    file: "Modular%20and%20Interative%20Structure%20.pdf",
    type: "pdf",
    summary: "A focused account of my contribution to the Word Cube system, connecting the sculpture’s physical configuration to reliable digital identification and sound.",
    methods: "Circuit design, resistor-network testing, voltage-divider calculations, Arduino programming and Pure Data integration"
  },
  {
    slug: "pd-tool",
    title: "Designing a Participatory Sleep Research Toolkit",
    file: "PD%20Tool.pdf",
    type: "pdf",
    summary: "A creative research toolkit designed to uncover how students and working professionals experience sleep quality, energy, dreams and daytime sleepiness.",
    methods: "State-of-the-art review, audience definition, physical and digital design probes, accessible instruction design and pilot testing"
  },
  {
    slug: "participatory-design-dozz",
    title: "From Sleep Research to Dozz",
    file: "Participatory%20design%20Results%20Dozz.pdf",
    type: "pdf",
    summary: "A participatory study that turns personal sleep routines, emotions and environmental influences into Dozz, a dedicated bedside concept for more supportive sleep.",
    methods: "Five participant probe kits, seven-day diary study, creative activities, follow-up conversations, thematic analysis, concept development and prototyping"
  },
  {
    slug: "traces",
    title: "Traces",
    file: "Traces.pdf",
    type: "pdf",
    summary: "A masters thesis and working AR application that lets people attach memories to real places, discover them in context and share meaningful experiences asynchronously.",
    methods: "Literature review, online survey, nine semi-structured interviews, thematic analysis, prototype testing and technical proof of concept"
  },
  {
    slug: "dozz-video",
    title: "Dozz Video Prototype",
    file: "Dozz%20Video%20Prototype.mp4",
    type: "video",
    summary: "A video prototype showing how the Dozz bedside concept could support sleep routines without adding another distracting phone-based experience.",
    methods: "Participatory-design findings, concept refinement, participant feedback, storyboarding and video prototyping"
  }
];

function renderLibrary() {
  const list = document.querySelector("#library-list");
  if (!list) return;
  research.forEach(function (item) {
    const row = document.createElement("li");
    row.className = "library-item";
    const link = document.createElement("a");
    link.className = "library-link";
    link.href = "viewer.html?work=" + encodeURIComponent(item.slug);
    const copy = document.createElement("div");
    copy.className = "library-copy";
    const name = document.createElement("span");
    name.className = "library-name";
    name.textContent = item.title;
    const summary = document.createElement("p");
    summary.className = "library-summary";
    summary.textContent = item.summary;
    const methods = document.createElement("p");
    methods.className = "library-methods";
    const methodsLabel = document.createElement("strong");
    methodsLabel.textContent = "Methods";
    methods.append(methodsLabel, document.createTextNode(" - " + item.methods));
    copy.append(name, summary, methods);
    const kind = document.createElement("span");
    kind.className = "library-type";
    kind.textContent = item.type === "video" ? "Video →" : "PDF →";
    link.append(copy, kind);
    row.append(link);
    list.append(row);
  });
}

function renderViewer() {
  const shell = document.querySelector("#viewer-shell");
  if (!shell) return;
  const slug = new URLSearchParams(window.location.search).get("work");
  const item = research.find(function (entry) { return entry.slug === slug; });
  if (!item) {
    shell.innerHTML = '<div class="viewer-error"><h2>Work not found</h2><p>Return to the research library and choose another document.</p></div>';
    return;
  }

  const mediaUrl = mediaBase + item.file;
  document.title = item.title + " · Moksha Jaiswal";
  document.querySelector("#viewer-name").textContent = item.title;
  document.querySelector("#viewer-kind").textContent = item.type === "video" ? "Video prototype" : "Research document";
  document.querySelector("#open-original").href = mediaUrl;

  if (item.type === "video") {
    const video = document.createElement("video");
    video.className = "video-frame";
    video.src = mediaUrl;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    shell.append(video);
    return;
  }

  const frame = document.createElement("iframe");
  frame.className = "document-frame";
  frame.title = item.title;
  frame.src = "https://mozilla.github.io/pdf.js/web/viewer.html?file=" + encodeURIComponent(mediaUrl);
  shell.append(frame);
}

renderLibrary();
renderViewer();
