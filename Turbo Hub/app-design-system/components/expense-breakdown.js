(() => {
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const currency = value => '₹' + value.toLocaleString('en-IN');
  window.TurboExpenseBreakdown = ({ items = [], label = 'Shared this month' } = {}) => {
    const entries = items.filter(item => Number.isFinite(item.amount) && item.amount > 0);
    const total = entries.reduce((sum, item) => sum + item.amount, 0);
    const root = element('figure', 'th-expense-breakdown');
    const chart = element('div', 'th-expense-breakdown__chart');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 132 132');
    svg.setAttribute('aria-hidden', 'true');
    const circumference = 2 * Math.PI * 55;
    let offset = 0;
    entries.forEach((item, index) => {
      const arc = document.createElementNS(svg.namespaceURI, 'circle');
      arc.setAttribute('cx', '66'); arc.setAttribute('cy', '66'); arc.setAttribute('r', '55');
      arc.setAttribute('fill', 'none'); arc.setAttribute('stroke-width', '10');
      arc.setAttribute('stroke', index % 2 ? 'var(--color-text-secondary)' : 'var(--color-action)');
      const length = item.amount / total * circumference;
      arc.setAttribute('stroke-dasharray', `${Math.max(0, length - 3)} ${circumference}`);
      arc.setAttribute('stroke-dashoffset', String(-offset));
      arc.setAttribute('transform', 'rotate(-90 66 66)');
      svg.append(arc); offset += length;
    });
    const value = element('div', 'th-expense-breakdown__value');
    value.append(element('strong', '', currency(total)), element('span', '', 'December'));
    chart.append(svg, value);
    const legend = element('figcaption', 'th-expense-breakdown__legend');

    entries.forEach((item, index) => {
      const row = element('div', 'th-expense-breakdown__item');
      row.dataset.tone = index % 2 ? 'secondary' : 'primary';
      const dot = element('span', 'th-expense-breakdown__dot'); dot.setAttribute('aria-hidden', 'true');
      const copy = element('div', 'th-expense-breakdown__copy');
      copy.append(element('span', '', item.name), element('strong', '', currency(item.amount)));
      row.append(dot, copy); legend.append(row);
    });
    if (!entries.length) legend.append(element('p', 'th-expense-breakdown__label', 'No shared expenses yet'));
    root.setAttribute('aria-label', `${label}: ${currency(total)}. ${entries.map(item => `${item.name}: ${currency(item.amount)}`).join('. ')}`);
    root.append(element('p', 'th-expense-breakdown__heading', label), chart, legend);
    return root;
  };
})();
