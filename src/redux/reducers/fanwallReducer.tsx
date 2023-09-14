import { SET_FANWALL, SET_FANWALLS } from "../actionTypes";

const initialState = {
  fanwall: null,
  fanwalls: []
};

export const fanwallReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_FANWALL:
      return {
        ...state,
        fanwall: payload
      }
    case SET_FANWALLS:
      return {
        ...state,
        fanwalls: payload
      }
    default:
      return state;
  }
};