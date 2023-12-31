import { memo, useCallback, useEffect, useMemo, useState } from "react";
import TableCell from "@mui/material/TableCell";

import styles from "./styles.module.css";

export interface IDashboardTableCell {
  keyItem: string;
  row: any;
  adjustment?: number;
  onAdjustmentChange?: (value: number) => void;
}

const DashboardTableCell = memo(
  ({ keyItem, row, adjustment, onAdjustmentChange }: IDashboardTableCell) => {
    const [localAdjustment, setLocalAdjustment] = useState(adjustment || "");
    const [isInputLeave, setIsInputLeave] = useState<boolean>(false);

    const handleBlur = () => {
      setIsInputLeave(true);
    };

    const handleAdjustmentChange = useCallback((event) => {
      const value = Number(event.target.value);
      setLocalAdjustment(value);
    }, []);

    useEffect(() => {
      if (isInputLeave) {
        const adjustedValue = Number(localAdjustment);
        onAdjustmentChange && onAdjustmentChange(adjustedValue);
      }
    }, [isInputLeave, onAdjustmentChange, localAdjustment]);

    const calculatedSalary = useMemo(() => {
      switch (keyItem) {
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
    }, [keyItem, row, localAdjustment, handleAdjustmentChange]);

    return (
      <TableCell align="left" padding="normal">
        <div className={styles.cell}>{calculatedSalary}</div>
      </TableCell>
    );
  },
);

export default DashboardTableCell;
