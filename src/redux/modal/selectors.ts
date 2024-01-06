import ModalState from "./state";

export function getModal(state: ModalState) {
  return state.modal;
}

export function getModalParams(state: ModalState) {
  return state.modal.params || {};
}
