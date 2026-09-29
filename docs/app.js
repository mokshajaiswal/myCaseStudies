const mediaBase = "https://media.githubusercontent.com/media/mokshajaiswal/myCaseStudies/design-iteration-2/Research%20Masters%20work/";

const research = [
  { slug: "ample", title: "Ample", file: "Ample.pdf", type: "pdf" },
  { slug: "hexa-1", title: "Hexa 1", file: "Hexa%201.pdf", type: "pdf" },
  { slug: "hexa-2", title: "Hexa 2", file: "Hexa%202.pdf", type: "pdf" },
  { slug: "modular-interactive-2", title: "Modular and Interative Structure 2", file: "Modular%20and%20Interative%20Structure%20%202.pdf", type: "pdf" },
  { slug: "modular-interactive", title: "Modular and Interative Structure", file: "Modular%20and%20Interative%20Structure%20.pdf", type: "pdf" },
  { slug: "pd-tool", title: "PD Tool", file: "PD%20Tool.pdf", type: "pdf" },
  { slug: "participatory-design-dozz", title: "Participatory Design Results Dozz", file: "Participatory%20design%20Results%20Dozz.pdf", type: "pdf" },
  { slug: "traces", title: "Traces", file: "Traces.pdf", type: "pdf" },
  { slug: "dozz-video", title: "Dozz Video Prototype", file: "Dozz%20Video%20Prototype.mp4", type: "video" }
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
    const name = document.createElement("span");
    name.className = "library-name";
    name.textContent = item.title;
    const kind = document.createElement("span");
    kind.className = "library-type";
    kind.innerHTML = (item.type === "video" ? "Video" : "PDF") + '<span class="library-arrow">→</span>';
    link.append(name, kind);
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
