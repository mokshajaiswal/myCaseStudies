const main = document.getElementById('preview');
document.body.dataset.gallery = new URLSearchParams(location.search).get('gallery') === '1';
for (const [title, items] of [
  ['Shared expenses', [{ name: 'Electricity', amount: 2400 }, { name: 'Groceries', amount: 1200 }]],
  ['No expenses', []],
]) {
  const example = document.createElement('section'); example.className = 'example';
  const label = document.createElement('p'); label.className = 'label'; label.textContent = title;
  example.append(label, TurboExpenseBreakdown({ items })); main.append(example);
}
