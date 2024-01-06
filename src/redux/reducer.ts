import { combineReducers, Reducer } from "redux";

import { modalReducer } from "./modal/reducers";

const reducers: Reducer = combineReducers({
  modal: modalReducer,
});

export default reducers;
