import { FunctionComponent, lazy, ReactNode, Suspense, useMemo } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { hideModal } from "../redux/modal/actions";
import { getModal } from "../redux/modal/selectors";
import { CustomModalTypes } from "../redux/modal/state";

import styles from "./styles.module.css";

let portalRoot = document.getElementById("portal");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal");
  document.body.appendChild(portalRoot);
}

const AddReportForm = lazy(
  () => import("../components/Raport/RaportForm/index"),
);

interface IPortal {
  children: ReactNode;
}

const Portal: FunctionComponent<IPortal> = ({ children }) => {
  return ReactDOM.createPortal(children, portalRoot as any);
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#01889F",
    },
    secondary: {
      main: "#01889F",
    },
  },
});

const renderContent = (modalType: string, hideModal?: () => void) => {
  switch (modalType) {
    case CustomModalTypes.ADD_REPORT:
      return (
        <Suspense fallback={"loading"}>
          <AddReportForm />
        </Suspense>
      );
  }
};

const CustomModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(getModal);
  const { showModal, modalType, maxWidth, fullWidth } = modal;
  const onHideModal = () => {
    dispatch(hideModal?.());
  };

  const renderContentMemo = useMemo(
    () => renderContent(modalType, hideModal),
    [modalType],
  );

  return (
    <Portal>
      <Dialog
        className={styles.dialogContainer}
        open={showModal}
        onClose={onHideModal}
        fullWidth={fullWidth ?? true}
        maxWidth={maxWidth ?? "sm"}
      >
        <div className={styles.modalContainer}>
          <IconButton
            aria-label="close"
            className={styles.closeButton}
            onClick={onHideModal}
          >
            <CloseIcon />
          </IconButton>
          <div className={styles.contentContainer}>
            {!renderContentMemo ? (
              <div className={styles.emptyContent}>
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  size={30}
                  thickness={8}
                />
              </div>
            ) : (
              <ThemeProvider theme={theme}>{renderContentMemo}</ThemeProvider>
            )}
          </div>
        </div>
      </Dialog>
    </Portal>
  );
};

export default CustomModal;
