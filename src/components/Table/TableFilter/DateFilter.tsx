import { useState } from "react";
import { FormLabel } from "@mui/material";

import DatePicker from "../../DatePicker";

import styles from "./styles.module.css";

const DateFilter = ({ column, filters, handleFilterChange }) => {
  const [startDate, seStartDate] = useState(
    filters[column.id]?.start_date || "",
  );
  const [endDate, seEndDate] = useState(filters[column.id]?.end_date || "");

  return (
    <>
      <FormLabel className={styles.label}>{column.label}</FormLabel>
      <div className={styles.dateRangeContainer}>
        <div>
          <FormLabel className={styles.dateLabel}>From</FormLabel>
          <DatePicker
            onChangeCallback={(date, event) => {
              seStartDate(date);
              handleFilterChange(event, column, "start_date", date);
            }}
            dateValue={startDate && new Date(startDate)}
            dateName={"start-date"}
            customClass={styles.textfield}
            dateFormat={"yyyy-MM-dd"}
            maxDate={endDate ? new Date(endDate) : null}
            placeholderText="dd.mm.yyyy"
          />
        </div>
        <div>
          <FormLabel className={styles.dateLabel}>To</FormLabel>
          <DatePicker
            onChangeCallback={(date, event) => {
              seEndDate(date);
              handleFilterChange(event, column, "end_date", date);
            }}
            dateValue={endDate && new Date(endDate)}
            dateName={"end-date"}
            dateFormat={"dd-MM-yyyy"}
            customClass={styles.textfield}
            minDate={startDate ? new Date(startDate) : null}
            placeholderText="dd.mm.yyyy"
          />
        </div>
      </div>
    </>
  );
};

export default DateFilter;
