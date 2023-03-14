export default (vals: number[]): void => {
  const container = document.getElementById('prime-table');
  const table = document.createElement('table');
  container?.appendChild(table);
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const headRow = document.createElement('tr');
  thead.appendChild(headRow);
  const dummyCell = document.createElement('td');
  headRow.appendChild(dummyCell);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  vals.forEach((n) => {
    const colHeader = document.createElement('th');
    colHeader.scope = 'col';
    colHeader.textContent = `${n}`;
    headRow.appendChild(colHeader);
    const row = document.createElement('tr');
    tbody.appendChild(row);
    const rowHeader = document.createElement('th');
    rowHeader.scope = 'row';
    rowHeader.textContent = `${n}`;
    row.appendChild(rowHeader);
    vals.forEach((m) => {
      const cell = document.createElement('td');
      cell.textContent = `${n * m}`;
      row?.appendChild(cell);
    });
  });
};
