/**
 * Sections of the table needed to insert cell data.
 */
export interface TableSections {
  headRow: HTMLTableRowElement;
  tbody: HTMLTableSectionElement;
  bodyRow?: HTMLTableRowElement;
}

const insertTableEl = (container: Node): HTMLTableElement => {
  const table = document.createElement('table');
  container.appendChild(table);
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

/**
 * Initializes an empty table in the DOM, clearing out any existing elements.
 * @param container the element to create the table in
 * @returns the sections of the newly created table
 */
export const resetTable = (container: Element): TableSections => {
  container.innerHTML = '';
  const table = insertTableEl(container);
  const headRow = insertTheadTrEl(table);
  const tbody = insertTbodyEl(table);
  return { headRow, tbody };
};

const insertColHeaderEl =
  (n: number) =>
  (sections: TableSections): TableSections => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = `${n}`;
    sections.headRow.appendChild(th);
    return sections;
  };

const insertRowHeaderEl =
  (n: number) =>
  (sections: TableSections): TableSections => {
    const bodyRow = document.createElement('tr');
    sections.tbody.appendChild(bodyRow);
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = `${n}`;
    bodyRow.appendChild(th);
    return { ...sections, bodyRow };
  };

const insertTdEl =
  (n: number, m: number) =>
  (sections: TableSections): TableSections => {
    const cell = document.createElement('td');
    cell.textContent = `${n * m}`;
    sections.bodyRow?.appendChild(cell);
    return sections;
  };

const getDomOperations = (
  vals: number[]
): Array<(s: TableSections) => TableSections> => {
  return vals.flatMap((n) =>
    [insertColHeaderEl(n), insertRowHeaderEl(n)].concat(
      vals.map((m) => insertTdEl(n, m))
    )
  );
};

/**
 * Creates a multiplication table in the DOM for the specified `vals`.
 *
 * @param vals - the numbers to multiple. These will be the row and column headers
 * @param sections - the head row and body of the multiplication table
 */
export const insertMultiplicationTable = (
  vals: number[],
  sections: TableSections
): void => {
  const operations = getDomOperations(vals);
  let idx = 0;
  let prev = sections;
  const batchUpdates = (): void => {
    operations.slice(idx, idx + 100).forEach((op) => {
      prev = { ...prev, ...op(prev) };
    });
    idx += 100;
    if (idx < operations.length) {
      window.requestAnimationFrame(batchUpdates);
    }
  };
  window.requestAnimationFrame(batchUpdates);
};

const primeFormHander = async (
  e: SubmitEvent,
  container: Element
): Promise<void> => {
  e.preventDefault();

  if (e.target == null) return;

  const formData = new FormData(e.target as HTMLFormElement);
  const n = formData.get('n') as string | null;
  if (n == null || n.length === 0) return;

  const tableSections = resetTable(container);
  const res = await fetch(`/primes.json?max=${n}`);
  const data = (await res.json()) as number[];
  insertMultiplicationTable(data, tableSections);
};

/**
 * Adds a submit handler to the form with id "prime-form".
 */
export const addPrimeFormHandler = (): void => {
  const container = document.getElementById('multiplication-table');
  if (container == null) return;

  document.getElementById('prime-form')?.addEventListener('submit', (e) => {
    primeFormHander(e, container).catch(console.error);
  });
};
