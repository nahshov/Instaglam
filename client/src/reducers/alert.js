import { SET_ALERT, SET_PROFILEPIC_ALERT, SET_POSTPIC_ALERT } from 'actions/alerts/alertTypes';

const initialState = {
  message: '',
  alertType: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType
      };
    case SET_PROFILEPIC_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType
      };
    case SET_POSTPIC_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType
      };
    default:
      return state;
  }
}
