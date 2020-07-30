import { SET_FORM_ALERT, SET_PROFILEPIC_ALERT, SET_POSTPIC_ALERT } from 'actions/alerts/alertTypes';

const initialState = {
  message: '',
  alertType: '',
  alertLocation: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FORM_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType,
        alertLocation: payload.alertLocation
      };
    case SET_PROFILEPIC_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType,
        alertLocation: payload.alertLocation
      };
    case SET_POSTPIC_ALERT:
      return {
        message: payload.message,
        alertType: payload.alertType,
        alertLocation: payload.alertLocation
      };
    default:
      return state;
  }
}
