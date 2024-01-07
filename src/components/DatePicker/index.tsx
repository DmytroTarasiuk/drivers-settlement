import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

interface IDatePicker {
  onChangeCallback: (
    date,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  dateValue: Date | string;
  dateName: string;
  dateFormat: string;
  error?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  errorText?: string;
  customClass?: string;
}

function DatePickerComponent({
  onChangeCallback,
  dateValue,
  dateName,
  dateFormat,
  error,
  minDate = null,
  maxDate = null,
  placeholderText = "",
  errorText = "",
  customClass,
}: IDatePicker) {
  return (
    <div className={styles.datePickerInputWithIcon}>
      <DatePicker
        name={dateName}
        selected={dateValue}
        dateFormat={dateFormat}
        onChange={(date, event) => onChangeCallback(date, event)}
        className={
          customClass
            ? customClass
            : `${styles.datePicker} ${error && styles.datePickerError}`
        }
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
      />
      <div className={styles.datePickerIcon}>
        <CalendarMonthIcon />
      </div>
      {error && errorText ? (
        <span className={styles.error}>{errorText}</span>
      ) : null}
    </div>
  );
}

export default DatePickerComponent;
