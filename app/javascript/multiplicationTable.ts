export default (vals: number[]): void => {
  vals.forEach((n, i) => {
    const row = document.querySelector(`tbody tr:nth-child(${i + 1})`);
    vals.forEach((m) => {
      const cell = document.createElement('td');
      cell.textContent = `${n * m}`;
      row?.appendChild(cell);
    });
  });
};
