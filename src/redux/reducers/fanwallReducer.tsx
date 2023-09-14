import { SET_FANWALL } from "../actionTypes";

const initialState = {
  fanwall: null,
  daremes: []
};

export const fanwallReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_FANWALL:
      return {
        ...state,
        fanwall: payload
      }
    default:
      return state;
  }
};