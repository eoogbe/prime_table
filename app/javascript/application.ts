import insertMultiplicationTable from './multiplicationTable';

declare global {
  interface Window {
    insertMultiplicationTable: () => void;
  }
}

window.insertMultiplicationTable = insertMultiplicationTable;
