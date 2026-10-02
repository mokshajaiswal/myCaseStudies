"use strict";

// Keep the public token names here, not their values. Measurements stay live.
const tokenNames = [
  "--space-unit",
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
  "--space-20",
  "--space-24",
  "--space-28",
  "--space-32",
  "--space-40",
  "--layout-gutter",
  "--section-space",
  "--section-pause-space",
  "--content-width",
  "--wide-content-width",
  "--type-hero",
  "--type-subtext",
  "--type-heading",
  "--type-body",
  "--type-small-heading",
  "--type-small-body",
  "--type-utility",
  "--type-media-status",
  "--heading-line-height",
  "--body-line-height",
  "--small-body-line-height",
  "--heading-weight",
  "--label-weight",
  "--card-heading-weight",
  "--font-hero",
  "--font-hero-subheading",
  "--font-heading",
  "--font-body-copy",
  "--font-small-heading",
  "--font-small-body",
  "--font-utility",
  "--font-media-status",
  "--tracking-heading",
  "--tracking-body",
  "--tracking-label",
  "--paragraph-gap",
  "--heading-copy-gap",
  "--component-copy-gap",
  "--component-gap",
  "--component-padding",
  "--compact-padding",
  "--compact-copy-gap",
  "--narrative-media-gap",
  "--subgroup-gap",
  "--quote-stack-clearance",
  "--progress-bar-width",
  "--progress-label-size",
  "--progress-label-tracking",
  "--radius-small",
  "--radius-medium",
  "--radius-large",
  "--hero-radius",
  "--page",
  "--surface",
  "--surface-raised",
  "--ink",
  "--ink-soft",
  "--heading-ink",
  "--line",
  "--accent",
  "--accent-strong",
  "--accent-soft",
  "--detail-surface",
  "--detail-border",
  "--detail-raised",
  "--detail-shadow",
  "--hero-a",
  "--hero-b",
  "--hero-ink",
  "--phone-aspect",
  "--phone-screen-inset-block",
  "--phone-screen-inset-inline",
  "--phone-screen-radius",
  "--phone-shadow",
  "--font-body",
  "--font-display"
];
const root = document.documentElement;
const measurement = document.createElement("span");
measurement.className = "measurement";
measurement.setAttribute("aria-hidden", "true");
document.body.append(measurement);

function lengthOf(name) {
  measurement.style.width = "var(" + name + ")";
  return getComputedStyle(measurement).width;
}
function formatPx(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? Number(number.toFixed(2)) + "px" : value;
}
function make(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

const scaleRows = tokenNames.filter(name => /^--space-(?:unit|\d+)$/.test(name)).map(name => {
  const row = make("div", "", "scale-row");
  const size = make("span");
  const bar = make("span", "", "scale-bar");
  bar.style.setProperty("--token-length", "var(" + name + ")");
  bar.setAttribute("aria-hidden", "true");
  row.append(make("code", name), size, bar);
  document.querySelector("#spacing-scale").append(row);
  return { name, size };
});

const rhythmTokens = [
  ["--heading-copy-gap", "Heading → body", "Section heading", "Supporting narrative begins here."],
  ["--paragraph-gap", "Paragraph → paragraph", "One paragraph explains the idea.", "The next paragraph develops it."],
  ["--component-copy-gap", "Small heading → small body", "A focused component title", "A short description beneath it."],
  ["--component-gap", "Between components", "First component", "Next component"],
  ["--narrative-media-gap", "Narrative → media", "The story introduces the example.", "Media or supporting diagram"],
  ["--subgroup-gap", "Between related subgroups", "One group within a section", "The next related group"],
  ["--section-space", "Between distinct sections", "End of one section", "Start of the next section"],
  ["--section-pause-space", "Editorial pause", "Before the central design question", "The next chapter"],
  ["--component-padding", "Inside a content component", "", "Content sits within the shared padding."],
  ["--compact-padding", "Inside a compact summary", "", "Project Timeline · 2 months"],
  ["--compact-copy-gap", "Compact title → detail", "Project Timeline", "2 months"]
];
const rhythmRows = rhythmTokens.map(([name, label, before, after]) => {
  const row = make("div", "", "rhythm-row");
  const meta = make("div", "", "rhythm-label");
  const value = make("span");
  meta.append(make("strong", label), make("code", name), make("br"), value);
  const demo = make("div", "", "rhythm-demo");
  if (name.endsWith("-padding")) {
    demo.classList.add("padding-demo");
    demo.style.padding = "var(" + name + ")";
    demo.append(make("p", after));
  } else {
    const band = make("div", "", "rhythm-gap");
    band.style.setProperty("--token-length", "var(" + name + ")");
    band.setAttribute("aria-hidden", "true");
    const first = make("p", before);
    if (name === "--heading-copy-gap") first.dataset.rolePreview = "heading";
    if (name === "--component-copy-gap") first.dataset.rolePreview = "small-heading";
    demo.append(first, band, make("p", after));
  }
  row.append(meta, demo);
  document.querySelector("#spacing-rhythm").append(row);
  return { name, value };
});

const inventoryRows = tokenNames.map(name => {
  const row = make("tr");
  const heading = make("th");
  heading.scope = "row";
  heading.append(make("code", name));
  const value = make("td");
  row.append(heading, value);
  document.querySelector("#token-inventory").append(row);
  return { name, row, value };
});
const dimensional = /^(--space-|--type-|--layout-gutter$|--section-space$|--section-pause-space$|--subgroup-gap$|--quote-stack-clearance$|--content-width$|--wide-content-width$|--paragraph-gap$|--heading-copy-gap$|--component-(?:copy-gap|gap|padding)$|--compact-(?:padding|copy-gap)$|--narrative-media-gap$|--radius-|--hero-radius$|--progress-(?:bar-width|label-size)$)/;

function refreshMeasurements() {
  const styles = getComputedStyle(root);
  document.querySelector("#current-mode").textContent =
    (matchMedia("(max-width: 48rem)").matches ? "Mobile" : "Desktop") +
    " tokens · " + window.innerWidth + "px viewport";
  document.querySelectorAll("[data-role]").forEach(sample => {
    const style = getComputedStyle(sample);
    const family = style.fontFamily.split(",")[0].replaceAll('"', "");
    const leading = Number.parseFloat(style.lineHeight) / Number.parseFloat(style.fontSize);
    document.querySelector('[data-spec="' + sample.dataset.role + '"]').textContent =
      family + " · " + style.fontSize + " · weight " + style.fontWeight +
      " · line height " + Number(leading.toFixed(2)) + " (" + formatPx(style.lineHeight) + ")" +
      " · tracking " + style.letterSpacing;
  });
  scaleRows.forEach(({ name, size }) => { size.textContent = formatPx(lengthOf(name)); });
  rhythmRows.forEach(({ name, value }) => { value.textContent = formatPx(lengthOf(name)); });
  inventoryRows.forEach(({ name, value }) => {
    const raw = styles.getPropertyValue(name).trim();
    value.replaceChildren();
    if (/^#|^rgb|^hsl/.test(raw)) {
      const swatch = make("span", "", "swatch");
      swatch.style.background = raw;
      swatch.setAttribute("aria-hidden", "true");
      value.append(swatch);
    }
    value.append(document.createTextNode(dimensional.test(name) ? formatPx(lengthOf(name)) : raw));
  });
}
function filterTokens() {
  const query = document.querySelector("#token-search").value.trim().toLowerCase();
  let count = 0;
  inventoryRows.forEach(({ name, row, value }) => {
    row.hidden = !(name + " " + value.textContent).toLowerCase().includes(query);
    if (!row.hidden) count++;
  });
  document.querySelector("#inventory-count").textContent = count + " of " + tokenNames.length + " tokens";
}
let resizeFrame;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => { refreshMeasurements(); filterTokens(); });
});
document.querySelector("#token-search").addEventListener("input", filterTokens);
refreshMeasurements();
filterTokens();
document.fonts.ready.then(refreshMeasurements);
