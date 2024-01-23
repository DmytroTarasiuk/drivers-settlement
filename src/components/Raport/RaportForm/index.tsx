import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, MenuItem, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import REPORT_API from "../../../api/reports";
import { hideModal } from "../../../redux/modal/actions";
import { getModalParams } from "../../../redux/modal/selectors";
import {
  clearReportDetails,
  setReportDetails,
} from "../../../redux/reports/actions";
import { getReportDetails } from "../../../redux/reports/selectors";

import DatePickerComponent from "./DatePicker";
import { formatDate, symbols } from "./utils";

import styles from "./styles.module.css";

interface IRaportForm {
  isEdit?: boolean;
}

const RaportForm = ({ isEdit }: IRaportForm) => {
  const [reportDate, setReportDate] = useState<Dayjs | null>();
  const { enqueueSnackbar } = useSnackbar();
  const reportDetails = useSelector(getReportDetails);
  const modalParams = useSelector(getModalParams);
  const dispatch = useDispatch();

  const { refetch, reportId } = modalParams;

  useEffect(() => {
    if (reportId) {
      REPORT_API.getReport(reportId)
        .then((response) => {
          if (response) dispatch(setReportDetails(response.data));
        })
        .catch((error) => console.log(error));
    }

    return () => {
      dispatch(clearReportDetails());
    };
  }, [dispatch, reportId]);

  const {
    date = reportDate && formatDate(reportDate),
    symbol = "",
    description = "",
    income = 0,
    cost = 0,
  } = reportDetails || {};

  const initialState = useMemo(() => {
    return {
      date: date ?? null,
      symbol: symbol ?? "",
      description: description ?? "",
      income: income ?? 0,
      cost: cost ?? 0,
    };
  }, [cost, date, description, income, symbol]);

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
      if (isEdit) {
        REPORT_API.editReport(reportId, values)
          .then((res) => {
            enqueueSnackbar("Raport was edited", {
              variant: "success",
            });
            refetch?.();
            dispatch(hideModal());
          })
          .catch((error) => console.log(error));
      } else {
        REPORT_API.createReport(values)
          .then((res) => {
            if (res) {
              enqueueSnackbar("Raport was created", {
                variant: "success",
              });
              refetch?.();
              dispatch(hideModal());
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [enqueueSnackbar, dispatch, refetch, isEdit, reportId],
  );

  //const disableButton = !!errors.description;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <DatePickerComponent value={reportDate} setValue={setReportDate} />
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
        {isEdit ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default RaportForm;
