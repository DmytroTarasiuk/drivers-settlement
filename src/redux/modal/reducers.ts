import { HIDE_MODAL, SHOW_MODAL } from "./actions";

const initialState = {
  showModal: false,
  modalType: "",
  params: null,
  maxWidth: "sm",
  fullWidth: true,
};

export function modalReducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        modalType: action.payload.modalType,
        params: action.payload.params,
        maxWidth: action.payload.maxWidth,
        fullWidth: action.payload.fullWidth,
      };
    case HIDE_MODAL:
      return { showModal: action.payload, modalType: "", params: null };
  }
  return state;
}
