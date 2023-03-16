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

const insertColHeaderEl = (n: number, { headRow }: TableSections): void => {
  const th = document.createElement('th');
  th.scope = 'col';
  th.textContent = `${n}`;
  headRow.appendChild(th);
};

const insertRowHeaderEl = (
  n: number,
  { tbody }: TableSections
): HTMLTableRowElement => {
  const bodyRow = document.createElement('tr');
  tbody.appendChild(bodyRow);
  const th = document.createElement('th');
  th.scope = 'row';
  th.textContent = `${n}`;
  bodyRow.appendChild(th);
  return bodyRow;
};

const insertTdEl = (
  n: number,
  m: number,
  bodyRow: HTMLTableRowElement
): void => {
  const cell = document.createElement('td');
  cell.textContent = `${n * m}`;
  bodyRow?.appendChild(cell);
};

const wait = new Promise((resolve) => window.requestAnimationFrame(resolve));

/**
 * Creates a multiplication table in the DOM for the specified `vals`.
 *
 * @param vals - the numbers to multiple. These will be the row and column headers
 * @param sections - the head row and body of the multiplication table
 */
export const insertMultiplicationTable = async (
  vals: number[],
  sections: TableSections
): Promise<void> => {
  for (let i = 0; i < vals.length; ++i) {
    const n = vals[i] as number;
    insertColHeaderEl(n, sections);
    const bodyRow = insertRowHeaderEl(n, sections);
    for (let j = 0; j < vals.length; ++j) {
      const m = vals[j] as number;
      insertTdEl(n, m, bodyRow);
      if (j > 0 && j % 100 === 0) {
        await wait;
      }
    }
  }
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
  const res = await fetch(`http://localhost:3000/primes.json?max=${n}`);
  const data = (await res.json()) as number[];
  await insertMultiplicationTable(data, tableSections);
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
