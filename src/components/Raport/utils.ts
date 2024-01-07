import { FilterTypes } from "../Table/TableFilter/types";

export const mockData = [
  {
    id: 1,
    date: "test",
    symbol: "KW(1/10/2023)",
    description: "Zaplate za fakture Zaplate za fakture Zaplate za fakture",
    income: 1000,
    cost: 0,
    actions: null,
  },
  {
    id: 2,
    date: "Dwdqw",
    symbol: "KW(12/10/2023)",
    description: "Zaplate za fakture",
    income: 1000,
    cost: 0,
    actions: null,
  },
];

export const raportTableCells = [
  {
    id: "idx",
    numeric: false,
    disablePadding: false,
    label: "Lp.",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Data",
    filterType: FilterTypes.DATE,
  },
  {
    id: "symbol",
    numeric: false,
    disablePadding: false,
    label: "Dowod",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Tresc",
  },
  {
    id: "income",
    numeric: false,
    disablePadding: false,
    label: "Przychod",
  },
  {
    id: "cost",
    numeric: false,
    disablePadding: false,
    label: "Rozchod",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export function formatInputDate(inputDate) {
  const parts = inputDate.split(".");
  const formattedDate = `${parts[0]}/${parts[1]}/${parts[2].slice(-2)}`;
  return formattedDate;
}
