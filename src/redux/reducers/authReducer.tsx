import { SET_USER } from "../actionTypes";

const initialState = {
  user: null
};

export const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: payload
      }
    default:
      return state;
  }
};