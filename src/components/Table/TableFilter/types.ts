export interface Column {
  id?: string;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
  filterType?: string;
}

export enum FilterTypes {
  SELECT = "SELECT",
}

export interface IFilterType {
  column?: Column;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    column: Column | any,
    dataField?: string,
  ) => void;
  filters: Object;
  data?: any[];
  columns?: Column[];
}
