const insertTableEl = (): HTMLTableElement => {
  const container = document.getElementById('multiplication-table');
  const table = document.createElement('table');
  container?.appendChild(table);
  return table;
};

const insertTheadTrEl = (table: HTMLTableElement): HTMLTableRowElement => {
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const row = document.createElement('tr');
  thead.appendChild(row);
  const dummyCell = document.createElement('td');
  row.appendChild(dummyCell);
  return row;
};

const insertTbodyEl = (table: HTMLTableElement): HTMLTableSectionElement => {
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  return tbody;
};

const insertColHeaderEl = (row: HTMLTableRowElement, n: number): void => {
  const th = document.createElement('th');
  th.scope = 'col';
  th.textContent = `${n}`;
  row.appendChild(th);
};

const insertRowHeaderEl = (
  tbody: HTMLTableSectionElement,
  n: number
): HTMLTableRowElement => {
  const row = document.createElement('tr');
  tbody.appendChild(row);
  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = `${n}`;
  row.appendChild(th);
  return row;
};

/**
 * Creates a multiplication table in the DOM for the specified `vals`.
 *
 * @param vals - the numbers to multiple. These will be the row and column headers
 */
export const insertMultiplicationTable = (vals: number[]): void => {
  const table = insertTableEl();
  const headRow = insertTheadTrEl(table);
  const tbody = insertTbodyEl(table);
  vals.forEach((n) => {
    insertColHeaderEl(headRow, n);
    const row = insertRowHeaderEl(tbody, n);
    vals.forEach((m) => {
      const cell = document.createElement('td');
      cell.textContent = `${n * m}`;
      row?.appendChild(cell);
    });
  });
};
