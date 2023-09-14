import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { daremeReducer } from "./daremeReducer";
import { fanwallReducer } from "./fanwallReducer";

export const rootReducer = combineReducers({
  auth: authReducer, 
  dareme: daremeReducer,
  fanwall: fanwallReducer
});