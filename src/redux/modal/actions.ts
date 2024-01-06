import { CustomModalTypes } from "./state";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

interface IModalWithParams {
  modalType: CustomModalTypes;
  params: any;
  maxWidth?: string;
  fullWidth?: boolean;
}

export const showModal = (payload: any) => ({
  type: SHOW_MODAL,
  payload: { showModal: true, modalType: payload, params: {} },
});

export const showModalWithParams = (payload: IModalWithParams) => ({
  type: SHOW_MODAL,
  payload: {
    showModal: true,
    modalType: payload.modalType,
    params: payload.params,
    maxWidth: payload.maxWidth,
    fullWidth: payload.fullWidth,
  },
});

export const hideModal = () => ({
  type: HIDE_MODAL,
  payload: false,
});
