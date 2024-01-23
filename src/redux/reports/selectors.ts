import AppState from "../state";

export function getReportList(state: AppState) {
  return state.report.reports;
}

export function getReportDetails(state: AppState) {
  return state.report?.reportDetails;
}
