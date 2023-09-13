import { SET_USER, SET_LOADING, SET_OPEN_MENUBAR } from "../actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  isOpenedMenuBar: false,
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
    case SET_OPEN_MENUBAR:
      return {
        ...state,
        isOpenedMenuBar: payload
      }
    default:
      return state;
  }
};