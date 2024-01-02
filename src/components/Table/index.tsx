import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
//import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { exportToCSV } from "../../utils";

import { useDataParsing } from "./hooks/useDataParsing";
import { filterData } from "./TableFilter/utils";
import TableFilter from "./TableFilter";
import EnhancedTableHead from "./TableHead";
import EnhancedTableToolbar from "./TableToolbar";

interface ITable {
  rows?: any[];
  headCells?: any[];
  orderByField?: string;
  orderType?: Order;
  tableHeaderText?: string;
  tabelCellComponent?: any;
  renderFilterFields?: string[];
  hideFieldsOnList?: string[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
  rows = [],
  headCells = [],
  orderByField,
  renderFilterFields,
  tabelCellComponent = null,
  hideFieldsOnList,
  orderType = "desc",
  tableHeaderText,
}: ITable) {
  const [order, setOrder] = useState<Order>(orderType);
  const [orderBy, setOrderBy] = useState<string>(orderByField);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [filters, setFilters] = useState<Object>({});
  const [isFilterButtonClicked, setIsFilterButtonClicked] =
    useState<boolean>(false);

  const parsedArrayToRequestedFilterFields = useDataParsing(
    rows,
    renderFilterFields,
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const TabelCellComponent = useMemo(
    () => tabelCellComponent,
    [tabelCellComponent],
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const findNumericFields = useMemo(() => {
    return headCells
      .filter((item) => item.numeric)
      .map((item) => {
        return item.id;
      });
  }, [headCells]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(
        isFilterButtonClicked ? filterData(rows, filters, "") : rows,
        getComparator(order, orderBy),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows, filters, isFilterButtonClicked],
  );

  const handleCsvDownload = useCallback(
    () => exportToCSV(rows, "sales"),
    [rows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableHeaderText={tableHeaderText}
          onDownloadCsv={handleCsvDownload}
          tableFilterComponent={
            <TableFilter
              columns={headCells}
              data={parsedArrayToRequestedFilterFields}
              filters={filters}
              setFilters={setFilters}
              showFilter={isFilterButtonClicked}
              setShowFilter={setIsFilterButtonClicked}
            />
          }
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row.id as number);
                const labelId = `enhanced-table-checkbox-${index}`;
                const rowValues = Object.keys(row);

                return (
                  <TableRow
                    hover
                    //onClick={(event) => handleClick(event, row.id as number)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell> */}
                    {rowValues.map((keyItem, i) => {
                      return (
                        !hideFieldsOnList.includes(keyItem) && (
                          <TabelCellComponent
                            key={labelId + i}
                            row={row}
                            labelId={labelId}
                            keyItem={keyItem}
                            numericFields={findNumericFields}
                          />
                        )
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
