import { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";

import { showModalWithParams } from "../../../redux/modal/actions";
import { CustomModalTypes } from "../../../redux/modal/state";
import { formatInputDate } from "../utils";

import styles from "./styles.module.css";

export interface IRaportTableCell {
  keyItem: string;
  row: any;
  refetch?: () => void;
}

const RaportTableCell = memo(({ keyItem, row, refetch }: IRaportTableCell) => {
  const dispatch = useDispatch();

  const onDeleteConfirmation = useCallback(() => {
    dispatch(
      showModalWithParams({
        modalType: CustomModalTypes.DELETE_CONFIRM,
        params: {
          refreshOnCLose: true,
          reportId: row["_id"],
          refetch,
        },
      }),
    );
  }, [dispatch, refetch, row]);

  const onEditReport = useCallback(() => {
    dispatch(
      showModalWithParams({
        modalType: CustomModalTypes.EDIT_REPORT,
        params: {
          reportId: row["_id"],
          refetch,
        },
      }),
    );
  }, [dispatch, refetch, row]);

  const renderContent = useMemo(() => {
    switch (keyItem) {
      case "symbol":
        const symbolToShow =
          row[keyItem] === "KW" ? row["kwCounter"] : row["kpCounter"];
        return `${
          row[keyItem] +
          " " +
          "(" +
          symbolToShow +
          "/" +
          formatInputDate(row["date"]).slice(3) +
          ")"
        }`;
      case "actions":
        return (
          <div className={styles.buttons}>
            <Button variant="outlined" onClick={onEditReport} color="info">
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={onDeleteConfirmation}
              color="error"
            >
              Delete
            </Button>
          </div>
        );
      default:
        return row[keyItem];
    }
  }, [keyItem, row, onDeleteConfirmation, onEditReport]);

  return (
    <TableCell align="left" padding="normal">
      <div className={styles.cell}>{renderContent}</div>
    </TableCell>
  );
});

export default RaportTableCell;
