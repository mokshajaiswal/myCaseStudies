(() => {
  const H = TurboUI;
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  document.getElementById('statusbar').append(H.statusbar());
  document.getElementById('nav').append(H.navigation({ title: 'Shared expenses', left: { label: 'Back to flow concepts', icon: 'navigation-back', href: '../../flow-reference/index.html' } }));
  document.getElementById('heading').append(H.pageHeader({ heading: 'The Sharma’s', subtext: '4 members · Separate accounts', members: ['Arun Sharma', 'Kavya Sharma', 'Neha Sharma', 'Rohan Sharma'] }));
  document.getElementById('breakdown').append(TurboExpenseBreakdown({ items: [{ name: 'Electricity', amount: 2400 }, { name: 'Groceries', amount: 1200 }] }));
  let selected = 'Expenses';
  function render() {
    document.getElementById('tabs').replaceChildren(H.tabs({ id: 'expenses', items: ['Expenses', 'Balances'], selected, onChange: value => { selected = value; render(); } }));
    const panel = document.getElementById('expenses-panel');
    panel.setAttribute('aria-labelledby', 'expenses-tab-' + (selected === 'Expenses' ? 0 : 1));
    const list = node('div', 'expenses-list');
    if (selected === 'Expenses') {
      list.append(
        H.row({ variant: 'compact', name: 'Electricity bill', detail: 'Paid by Arun', amount: 2400, graphic: 'payment' }),
        H.row({ variant: 'compact', name: 'Weekly groceries', detail: 'Paid by Arun', amount: 1200, graphic: 'payment' }),
      );
    } else {
      list.append(
        H.row({ variant: 'compact', name: 'Arun Sharma', detail: 'You owe Arun', amount: 900 }),
        H.row({ variant: 'compact', name: 'Kavya Sharma', detail: 'Owes Arun', amount: 900 }),
        H.row({ variant: 'compact', name: 'Rohan Sharma', detail: 'Owes Arun', amount: 900 }),
      );
    }
    panel.replaceChildren(list);
  }
  document.getElementById('settlement-action').append(H.button({ label: 'Settle up · ₹900', onClick: () => {
    const preview = document.getElementById('settlement-preview');
    preview.hidden = false;
    preview.textContent = 'Pay Arun ₹900 from your PayZapp account.';
    preview.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  } }));
  render();
})();
