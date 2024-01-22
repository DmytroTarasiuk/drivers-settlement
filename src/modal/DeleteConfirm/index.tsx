import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";

import API_REPORTS from "../../api/reports";
import { hideModal } from "../../redux/modal/actions";
import { getModalParams } from "../../redux/modal/selectors";

import styles from "./style.module.css";

const DeleteConfirm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const modalParams = useSelector(getModalParams);
  const { id, refetch } = modalParams;

  const handleDelete = useCallback(() => {
    API_REPORTS.deleteReport(id)
      .then((response) => {
        if (response) {
          enqueueSnackbar("Report was deleted", {
            variant: "success",
          });
          refetch?.();
          dispatch(hideModal());
        }
      })
      .catch((error) => console.log(error));
  }, [id, refetch, enqueueSnackbar, dispatch]);

  const onCancel = useCallback(() => dispatch(hideModal()), [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Are you sure you want to delete a report?</h2>
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
