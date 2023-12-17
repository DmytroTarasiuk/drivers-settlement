import { FilterTypes } from "../Table/TableFilter/types";

export const dashboardTableCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Kierowca",
    filterType: FilterTypes.SELECT,
  },
  {
    id: "profitBolt",
    numeric: false,
    disablePadding: false,
    label: "Obrot Bolt",
  },
  {
    id: "cashBolt",
    numeric: false,
    disablePadding: false,
    label: "Gotowka Bolt",
  },
  {
    id: "bonusBolt",
    numeric: false,
    disablePadding: true,
    label: "Bonus Bolt",
  },
  {
    id: "profitUber",
    numeric: false,
    disablePadding: false,
    label: "Obrot Uber",
  },
  {
    id: "cashUber",
    numeric: false,
    disablePadding: false,
    label: "Gotowka Uber",
  },
  {
    id: "bonusUber",
    numeric: false,
    disablePadding: true,
    label: "Bonus Uber",
  },
  {
    id: "profitFn",
    numeric: false,
    disablePadding: false,
    label: "Obrot Freenow",
  },
  {
    id: "cashFn",
    numeric: false,
    disablePadding: false,
    label: "Gotowka Freenow",
  },
  {
    id: "bonusFn",
    numeric: false,
    disablePadding: false,
    label: "Bonus Freenow",
  },
  {
    id: "vat",
    numeric: false,
    disablePadding: false,
    label: "VAT",
  },
  {
    id: "vatBonus",
    numeric: false,
    disablePadding: true,
    label: "VAT(BONUSY)",
  },
  {
    id: "comission",
    numeric: false,
    disablePadding: true,
    label: "Prowizja Kartell",
  },
  {
    id: "rent",
    numeric: false,
    disablePadding: true,
    label: "Wynajem",
  },
  {
    id: "adjustments",
    numeric: false,
    disablePadding: true,
    label: "Regulacja",
  },
  {
    id: "salary",
    numeric: false,
    disablePadding: false,
    label: "Wyplata kierowcy",
  },
  {
    id: "paymentType",
    numeric: false,
    disablePadding: false,
    label: "Sposob wyplaty",
  },
];
