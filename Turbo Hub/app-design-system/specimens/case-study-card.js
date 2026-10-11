const main = document.getElementById('preview');
document.body.dataset.gallery = new URLSearchParams(location.search).get('gallery') === '1';
for (const [id, variant, hoverFlower, name] of [
  ['variant-1', 'variant-1', 'blue', 'Variant 1'],
  ['variant-2', 'variant-2', 'blue', 'Variant 2 · Blue flower'],
  ['variant-2-purple', 'variant-2', 'purple', 'Variant 2 · Purple flower'],
  ['variant-2-pink', 'variant-2', 'pink', 'Variant 2 · Pink flower'],
  ['variant-2-orange', 'variant-2', 'orange', 'Variant 2 · Orange flower'],
]) {
  const example = document.createElement('section'); example.className = 'example'; example.id = id;
  const label = document.createElement('p'); label.className = 'label'; label.textContent = name;
  // No IG destination has been supplied: variant 2 is a non-link article for now.
  example.append(label, TurboCaseStudyCard({variant, hoverFlower, ...(variant === 'variant-1' ? {href: '../../index.html#top'} : {})}));
  main.append(example);
}
