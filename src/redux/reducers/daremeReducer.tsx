import { SET_DAREME, SET_DAREME_INITIAL } from "../actionTypes";

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
    default:
      return state;
  }
};