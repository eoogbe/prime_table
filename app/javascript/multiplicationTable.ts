export const getPrimes = (): number[] =>
  Array.from(document.querySelectorAll('thead th'))
    .map((node) => node.textContent != null && parseInt(node.textContent, 10))
    .filter((n): n is number => typeof n === 'number');

export const insertMultiples = (vals: number[]): void => {
  vals.forEach((n, i) => {
    const row = document.querySelector(`tbody tr:nth-child(${i + 1})`);
    vals.forEach((m) => {
      const cell = document.createElement('td');
      cell.textContent = `${n * m}`;
      row?.appendChild(cell);
    });
  });
};
