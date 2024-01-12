import { memo, useCallback, useEffect, useMemo, useState } from "react";
import TableCell from "@mui/material/TableCell";

import styles from "./styles.module.css";

export interface IDashboardTableCell {
  keyItem: string;
  row: any;
  adjustment?: number;
  rent?: number;
  onAdjustmentChange?: (value: number) => void;
  onRentChange?: (value: number) => void;
}

const DashboardTableCell = memo(
  ({
    keyItem,
    row,
    adjustment,
    onAdjustmentChange,
    rent,
    onRentChange,
  }: IDashboardTableCell) => {
    const [localAdjustment, setLocalAdjustment] = useState(adjustment || "");
    const [localRent, setLocalRent] = useState(rent || "");
    const [isInputLeave, setIsInputLeave] = useState<boolean>(false);

    const handleBlur = () => {
      setIsInputLeave(true);
    };

    const handleAdjustmentChange = useCallback((event) => {
      const value = Number(event.target.value);
      setLocalAdjustment(value);
    }, []);

    const handleRentChange = useCallback((event) => {
      const value = Number(event.target.value);
      setLocalRent(value);
    }, []);

    useEffect(() => {
      if (isInputLeave) {
        const adjustedValue = Number(localAdjustment);
        const adjustedRent = Number(localRent);
        onAdjustmentChange && onAdjustmentChange(adjustedValue);
        onRentChange && onRentChange(adjustedRent);
      }
    }, [
      isInputLeave,
      onAdjustmentChange,
      localAdjustment,
      localRent,
      onRentChange,
    ]);

    const calculatedSalary = useMemo(() => {
      switch (keyItem) {
        case "rent":
          return (
            <input
              key={`rent-input-${row.id}`}
              value={localRent}
              className={styles.input}
              onChange={handleRentChange}
              onBlur={handleBlur}
              type="number"
            />
          );
        case "adjustments":
          return (
            <input
              key={`adjustment-input-${row.id}`}
              value={localAdjustment}
              className={styles.input}
              onChange={handleAdjustmentChange}
              onBlur={handleBlur}
              type="number"
            />
          );
        // case "salary":
        //   return (row[keyItem] + (localAdjustment || 0))?.toFixed(2);
        default:
          return row[keyItem];
      }
    }, [
      keyItem,
      row,
      localAdjustment,
      handleAdjustmentChange,
      localRent,
      handleRentChange,
    ]);

    return (
      <TableCell align="left" padding="normal">
        <div className={styles.cell}>{calculatedSalary}</div>
      </TableCell>
    );
  },
);

export default DashboardTableCell;
