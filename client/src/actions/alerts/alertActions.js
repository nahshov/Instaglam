import { SET_ALERT } from './alertTypes';

export const setAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      alertType
    }
  });
};
