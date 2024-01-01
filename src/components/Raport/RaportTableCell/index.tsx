import { memo, useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import { useSnackbar } from "notistack";

import API_REPORTS from "../../../api/reports";
import { formatInputDate } from "../utils";

import styles from "./styles.module.css";

export interface IRaportTableCell {
  keyItem: string;
  row: any;
  refetch?: () => void;
}

const RaportTableCell = memo(({ keyItem, row, refetch }: IRaportTableCell) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = useCallback(() => {
    API_REPORTS.deleteReport(row["_id"])
      .then((response) => {
        if (response) {
          enqueueSnackbar("Report was deleted", {
            variant: "success",
          });
          refetch?.();
        }
      })
      .catch((error) => console.log(error));
  }, [enqueueSnackbar, row, refetch]);

  const renderContent = useMemo(() => {
    switch (keyItem) {
      case "symbol":
        return `${row[keyItem] + " " + formatInputDate(row["date"])}`;
      case "actions":
        return (
          <Button
            className={styles.button}
            variant="outlined"
            onClick={handleDelete}
            color="secondary"
          >
            Delete
          </Button>
        );
      default:
        return row[keyItem];
    }
  }, [keyItem, row, handleDelete]);

  return (
    <TableCell align="left" padding="normal">
      <div className={styles.cell}>{renderContent}</div>
    </TableCell>
  );
});

export default RaportTableCell;
