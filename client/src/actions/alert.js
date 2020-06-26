import { SET_ALERT } from './types';

export const setAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      alertType
    }
  });
};