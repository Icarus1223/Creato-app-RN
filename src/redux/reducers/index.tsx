import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { daremeReducer } from "./daremeReducer";

export const rootReducer = combineReducers({
  auth: authReducer, 
  dareme: daremeReducer,
});