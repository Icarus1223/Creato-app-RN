import { combineReducers } from "redux";
import { daremeReducer } from "./daremeReducer";

export const rootReducer = combineReducers({
  dareme: daremeReducer,
});