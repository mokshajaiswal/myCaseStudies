const main = document.getElementById('preview');
document.body.dataset.gallery = new URLSearchParams(location.search).get('gallery') === '1';
for (const [variant, name] of [['variant-1', 'Variant 1'], ['variant-2', 'Variant 2']]) {
  const example = document.createElement('section'); example.className = 'example'; example.id = variant;
  const label = document.createElement('p'); label.className = 'label'; label.textContent = name;
  // No IG destination has been supplied: variant 2 is a non-link article for now.
  example.append(label, TurboCaseStudyCard({variant, ...(variant === 'variant-1' ? {href: '../../index.html#top'} : {})}));
  main.append(example);
}
