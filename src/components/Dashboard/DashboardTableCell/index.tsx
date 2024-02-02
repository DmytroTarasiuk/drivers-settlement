import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import { useSnackbar } from "notistack";

import MAIL_API from "../../../api/mails";

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
    const { enqueueSnackbar } = useSnackbar();

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

    const handleSendEMail = useCallback(() => {
      const body = {
        to: row["email"],
        subject: "Rozliczenie",
        data: row,
      };
      MAIL_API.sendEmail(body)
        .then((response) => {
          if (response.data) {
            enqueueSnackbar("Email was send", {
              variant: "success",
            });
          }
        })
        .catch((error) => console.log(error));
    }, [enqueueSnackbar, row]);

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

    const renderContent = useMemo(() => {
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
        case "actions":
          return (
            row["email"] && (
              <div className={styles.buttons}>
                <Button
                  variant="outlined"
                  onClick={handleSendEMail}
                  color="info"
                >
                  Send email
                </Button>
              </div>
            )
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
      handleSendEMail,
    ]);

    const renderBackground = (key) => {
      switch (key) {
        case "profitBolt":
        case "cashBolt":
        case "bonusBolt":
          return "#126aae";
        case "profitUber":
        case "cashUber":
        case "bonusUber":
          return "#71b24e";
        case "profitFn":
        case "cashFn":
        case "bonusFn":
          return "#fd0300";
        case "rent":
        case "adjustments":
          return "#fbff02";
        case "salary":
          return "#212121";
        default:
          return "#fff";
      }
    };

    return (
      <TableCell
        style={{
          background: renderBackground(keyItem),
        }}
        align="left"
        padding="normal"
      >
        <div
          style={{ color: keyItem === "salary" && "#fff" }}
          className={styles.cell}
        >
          {renderContent}
        </div>
      </TableCell>
    );
  },
);

export default DashboardTableCell;
