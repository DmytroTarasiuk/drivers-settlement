import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "./styles.module.css";

interface IDatePicker {
  value?: any;
  setValue?: (date: any) => void;
}

export default function DatePickerComponent({ value, setValue }: IDatePicker) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          className={styles.datepicker}
          label="Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onError={() => console.log("error")}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
