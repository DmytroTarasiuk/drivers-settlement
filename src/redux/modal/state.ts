export enum CustomModalTypes {
  ADD_REPORT = "ADD_REPORT",
  EDIT_REPORT = "EDIT_REPORT",
  DELETE_CONFIRM = "DELETE_CONFIRM",
}

export default interface ModalState {
  modal: {
    showModal: boolean;
    modalType: string;
    params?: any;
    maxWidth?: "sm" | "xs" | "md" | "lg" | "xl";
    fullWidth: boolean;
  };
}
