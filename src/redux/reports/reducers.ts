import {
  CLEAR_REPORT_DETAILS,
  CLEAR_REPORT_LIST,
  SET_REPORT_DETAILS,
  SET_REPORT_LIST,
} from "./actions";

const initialState = {
  reports: [],
  reportDetails: {},
};

export function reportReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_REPORT_LIST:
      return { ...state, reports: action.payload };
    case CLEAR_REPORT_LIST:
      return { ...state, reports: [] };
    case SET_REPORT_DETAILS:
      return { ...state, reportDetails: action.payload };
    case CLEAR_REPORT_DETAILS:
      return { ...state, reportDetails: action.payload };

    default:
      return state;
  }
}
