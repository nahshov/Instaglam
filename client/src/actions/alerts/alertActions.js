import { SET_ALERT, SET_PROFILEPIC_ALERT, SET_POSTPIC_ALERT } from './alertTypes';

export const setAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      alertType
    }
  });
};

export const setProfilePicAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_PROFILEPIC_ALERT,
    payload: {
      message,
      alertType
    }
  });
};

export const setPostPicAlert = (message, alertType) => (dispatch) => {
  dispatch({
    type: SET_POSTPIC_ALERT,
    payload: {
      message,
      alertType
    }
  });
};
