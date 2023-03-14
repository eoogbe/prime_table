export const getPrimes = (): number[] =>
  Array.from(document.querySelectorAll('thead th'))
    .map((node) => node.textContent != null && parseInt(node.textContent, 10))
    .filter((n): n is number => typeof n === 'number');
