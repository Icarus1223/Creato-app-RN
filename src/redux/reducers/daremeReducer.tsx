import { SET_DAREME, SET_DAREMES, SET_DAREME_INITIAL, SET_OPTION } from "../actionTypes";

const initialState = {
  dareme: {
    photos: [],
    title: null,
    deadline: null,
    options: [
      {
        title: null
      },
      {
        title: null
      }
    ]
  },
  option: null,
  daremes: []
};

export const daremeReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_DAREME:
      return {
        ...state,
        dareme: payload
      }
    case SET_DAREMES:
      return {
        ...state,
        daremes: payload
      }
    case SET_DAREME_INITIAL:
      return {
        ...state,
        dareme: {
          photos: [],
          title: null,
          deadline: null,
          options: [
            {
              title: null
            },
            {
              title: null
            }
          ]
        }
      }
    case SET_OPTION:
      return {
        ...state,
        option: payload
      }
    default:
      return state;
  }
};