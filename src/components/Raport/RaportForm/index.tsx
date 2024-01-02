import { useCallback, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import REPORT_API from "../../../api/reports";

import DatePickerComponent from "./DatePicker";
import { formatDate, symbols } from "./utils";

import styles from "./styles.module.css";

interface IRaportForm {
  callback?: () => void;
}

const RaportForm = ({ callback }: IRaportForm) => {
  const [date, setDate] = useState<Dayjs | null>();
  const { enqueueSnackbar } = useSnackbar();

  const initialState = {
    date: date && formatDate(date),
    symbol: "",
    description: "",
    income: 0,
    cost: 0,
  };

  // const validate = (values) => {
  //   if (values.description === "") {
  //     errors.description = "Please enter description";
  //   }
  //   // if (!values.symbol) {
  //   //   errors.symbol = "Please select symbol";
  //   // }
  // };

  const { getFieldProps, handleSubmit, errors, values, resetForm, submitForm } =
    useFormik({
      initialValues: initialState,
      //validate,
      enableReinitialize: true,
      onSubmit: (values, { setSubmitting }) => {
        onHandleSubmit(values);
        setSubmitting(false);
        resetForm();
      },
    });

  const onHandleSubmit = useCallback(
    (values) => {
      REPORT_API.createReport(values)
        .then((res) => {
          if (res) {
            enqueueSnackbar("Raport was created", {
              variant: "success",
            });
            callback?.();
          }
        })
        .catch((error) => console.log(error));
    },
    [callback, enqueueSnackbar],
  );

  //const disableButton = !!errors.description;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <DatePickerComponent value={date} setValue={setDate} />
        <TextField
          id="outlined-select-symbol"
          select
          label="Symbol"
          helperText={!!errors.symbol}
          className={`${styles.textfield} ${styles.symbol}`}
          value={values.symbol}
          {...getFieldProps("symbol")}
        >
          {symbols.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        required
        id="outlined-required"
        className={`${styles.textfield} ${styles.description}`}
        label="Treść"
        multiline
        rows={2}
        //helperText={errors.description}
        value={values.description}
        {...getFieldProps("description")}
      />
      <div className={styles.section}>
        <TextField
          id="outlined-number-income"
          label="Przychod"
          type="number"
          className={styles.textfield}
          value={values.income}
          InputLabelProps={{
            shrink: true,
          }}
          {...getFieldProps("income")}
        />
        <TextField
          id="outlined-number-cost"
          label="Rozchod"
          type="number"
          value={values.cost}
          className={styles.textfield}
          InputLabelProps={{
            shrink: true,
          }}
          {...getFieldProps("cost")}
        />
      </div>
      <Button
        className={styles.button}
        color="primary"
        variant="contained"
        //disabled={disableButton}
        onClick={submitForm}
      >
        Add
      </Button>
    </form>
  );
};

export default RaportForm;
