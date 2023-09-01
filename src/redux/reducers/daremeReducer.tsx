import { SET_DAREME } from "../actionTypes";

const initialState = {
  dareme: {
    title: null,
    deadline: null,
    options: {
      option1: {
        title: null
      },
      option2: {
        title: null
      }
    }
  }
};

export const daremeReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_DAREME:
      return {
        ...state,
        dareme: payload
      }
    default:
      return state;
  }
};