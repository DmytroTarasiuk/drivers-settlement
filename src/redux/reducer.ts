import { combineReducers, Reducer } from "redux";

import { modalReducer } from "./modal/reducers";
import { reportReducer } from "./reports/reducers";

const reducers: Reducer = combineReducers({
  modal: modalReducer,
  report: reportReducer,
});

export default reducers;
