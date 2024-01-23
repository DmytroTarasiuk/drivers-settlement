import ModalState from "./modal/state";
import ReportState from "./reports/state";

export default interface AppState {
  modal: ModalState;
  report: ReportState;
}
