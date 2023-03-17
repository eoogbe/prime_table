/**
 * Sections of the table needed to insert cell data.
 */
export interface TableSections {
  headRow: HTMLTableRowElement;
  tbody: HTMLTableSectionElement;
}

const insertTableEl = (container: Node): HTMLTableElement => {
  const table = document.createElement('table');
  table.className = 'table';
  container.appendChild(table);
  return table;
};

const insertTheadTrEl = (table: Node): HTMLTableRowElement => {
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const row = document.createElement('tr');
  row.className = 'table__row';
  thead.appendChild(row);
  const dummyCell = document.createElement('td');
  dummyCell.className = 'table__cell';
  row.appendChild(dummyCell);
  return row;
};

const insertTbodyEl = (table: Node): HTMLTableSectionElement => {
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

const insertColHeaderEl = (n: number, headRow: Node): void => {
  const th = document.createElement('th');
  th.className = 'table__cell table__cell--head';
  th.scope = 'col';
  th.textContent = `${n}`;
  headRow.appendChild(th);
};

const insertRowHeaderEl = (n: number, tbody: Node): HTMLTableRowElement => {
  const bodyRow = document.createElement('tr');
  bodyRow.className = 'table__row';
  tbody.appendChild(bodyRow);
  const th = document.createElement('th');
  th.className = 'table__cell table__cell--head';
  th.scope = 'row';
  th.textContent = `${n}`;
  bodyRow.appendChild(th);
  return bodyRow;
};

const insertTdEl = (n: number, m: number, bodyRow: Node): void => {
  const cell = document.createElement('td');
  cell.className = 'table__cell';
  cell.textContent = `${n * m}`;
  bodyRow?.appendChild(cell);
};

const BATCH_SIZE = 100;
const wait = new Promise((resolve) => window.requestAnimationFrame(resolve));

const addCellsToExistingRow = async ({
  i,
  start,
  vals,
  sections,
}: {
  i: number;
  start: number;
  vals: number[];
  sections: TableSections;
}): Promise<void> => {
  const n = vals[i] as number;
  const bodyRow = sections.tbody.querySelector(
    `tr:nth-child(${i + 1})`
  ) as HTMLTableRowElement;
  for (let j = start; j < vals.length; ++j) {
    const m = vals[j] as number;
    insertTdEl(n, m, bodyRow);
    if (j > 0 && j % BATCH_SIZE === 0) {
      await wait;
    }
  }
};

const addBodyRow = async ({
  i,
  vals,
  sections,
}: {
  i: number;
  vals: number[];
  sections: TableSections;
}): Promise<void> => {
  const n = vals[i] as number;
  insertColHeaderEl(n, sections.headRow);
  const bodyRow = insertRowHeaderEl(n, sections.tbody);
  for (let j = 0; j < vals.length; ++j) {
    const m = vals[j] as number;
    insertTdEl(n, m, bodyRow);
    await wait;
  }
};

/**
 * Creates a multiplication table in the DOM for the specified `vals`.
 *
 * @param vals - the numbers to multiple. These will be the row and column headers
 * @param sections - the head row and body of the multiplication table
 */
export const insertMultiplicationTable = async (
  vals: number[],
  min: number,
  sections: TableSections
): Promise<void> => {
  for (let i = 0; i < vals.length; ++i) {
    if (i < min) {
      await addCellsToExistingRow({ i, vals, sections, start: min });
    } else {
      await addBodyRow({ i, vals, sections });
    }
  }
};

const generateBatch = async ({
  vals,
  min,
  max,
  tableSections,
}: {
  vals: number[];
  min: number;
  max: number;
  tableSections: TableSections;
}): Promise<void> => {
  const res = await fetch(
    `http://localhost:3000/primes.json?min=${min}&max=${max}`
  );
  const data = (await res.json()) as number[];
  vals.push(...data);
  await insertMultiplicationTable(vals, min - 1, tableSections);
};

/**
 * Generates a multiplication table of prime numbers.
 * @param n - the number of prime numbers
 * @param container - the DOM element to insert the table into
 */
export const generatePrimeTable = async (
  n: number,
  container: Element
): Promise<void> => {
  const tableSections = resetTable(container);
  const vals: number[] = [];
  let min = 1;
  let max = Math.min(n, BATCH_SIZE);
  while (min <= n) {
    await generateBatch({ min, max, vals, tableSections });
    min = max + 1;
    max = Math.min(n, max + BATCH_SIZE);
  }
};

export const validatePrimeForm = (val: string | null): number | null => {
  if (val == null || val.length === 0) return null;
  return parseInt(val, 10);
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

  await generatePrimeTable(parseInt(n, 10), container);
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
