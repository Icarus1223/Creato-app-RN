import { SET_USER, SET_LOADING } from "../actionTypes";

const initialState = {
  user: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: payload
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload
      }
    default:
      return state;
  }
};