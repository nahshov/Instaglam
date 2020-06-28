import { SET_ALERT } from '../actions/types';

const initialState = {
  message: '',
  alertType: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      console.log(type, payload.message, payload.alertType);
      return {
        message: payload.message,
        alertType: payload.alertType
      };
    default:
      return state;
  }
}
