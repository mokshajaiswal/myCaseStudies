// Provider definitions stay app-owned; gallery tooling is shared with DS starter.
StudioIconGallery.mount({
  names: [...new Set([...dsIcon.builtins(), ...Object.keys(TurboIcons.mapping)])].sort(),
  render: (name, options) => TurboIcons.render(name, options),
  code: name => "TurboIcons.render('" + name + "', { size: 24 })",
  weights: dsIcon.weights(),
  currentWeight: dsIcon.weight(),
  setWeight: value => dsIcon.setWeight(value),
  searchText: name => name + ' ' + (TurboIcons.mapping[name] || name)
});
