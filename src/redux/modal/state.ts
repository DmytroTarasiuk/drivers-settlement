export enum CustomModalTypes {
  ADD_REPORT = "ADD_PROJECT",
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
