import insertMultiplicationTable from './multiplicationTable';

declare global {
  interface Window {
    insertMultiplicationTable: (vals: number[]) => void;
  }
}

window.insertMultiplicationTable = insertMultiplicationTable;
