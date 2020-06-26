import { SET_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log(type, payload);
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    default:
      return state;
  }
}
