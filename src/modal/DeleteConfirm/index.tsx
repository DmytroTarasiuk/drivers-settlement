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
  const { reportId, refetch, selectedIds } = modalParams;

  const handleDelete = useCallback(
    async (id) => {
      try {
        await API_REPORTS.deleteReport(id);
        enqueueSnackbar("Report was deleted", {
          variant: "success",
        });
        refetch?.();
        dispatch(hideModal());
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, enqueueSnackbar, refetch],
  );

  const deleteReport = useCallback(async () => {
    try {
      if (selectedIds) {
        await Promise.all(
          selectedIds.map(async (item) => {
            await handleDelete(item);
          }),
        );
      } else {
        await handleDelete(reportId);
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleDelete, reportId, selectedIds]);

  const onCancel = useCallback(() => dispatch(hideModal()), [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Are you sure you want to delete a report?</h2>
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={deleteReport} variant="contained" color="primary">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
