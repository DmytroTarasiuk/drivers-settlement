import { IReport } from "../../api/reports";

export const SET_REPORT_LIST = "SET_REPORT_LIST";
export const CLEAR_REPORT_LIST = "CLEAR_REPORT_LIST";
export const SET_REPORT_DETAILS = "SET_REPORT_DETAILS";
export const CLEAR_REPORT_DETAILS = "CLEAR_REPORT_DETAILS";

export const setReportList = (payload: IReport[]) => ({
  type: SET_REPORT_LIST,
  payload,
});

export const clearReportList = () => ({
  type: CLEAR_REPORT_LIST,
  payload: [],
});

export const setReportDetails = (payload) => ({
  type: SET_REPORT_DETAILS,
  payload,
});

export const clearReportDetails = () => ({
  type: CLEAR_REPORT_DETAILS,
  payload: {},
});
