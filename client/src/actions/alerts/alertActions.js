import { SET_FORM_ALERT, SET_PROFILEPIC_ALERT, SET_POSTPIC_ALERT } from './alertTypes';

export const setFormAlert = (message, alertType, alertLocation) => (dispatch) => {
  dispatch({
    type: SET_FORM_ALERT,
    payload: {
      message,
      alertType,
      alertLocation
    }
  });
};

export const setProfilePicAlert = (message, alertType, alertLocation) => (dispatch) => {
  dispatch({
    type: SET_PROFILEPIC_ALERT,
    payload: {
      message,
      alertType,
      alertLocation
    }
  });
};

export const setPostPicAlert = (message, alertType, alertLocation) => (dispatch) => {
  dispatch({
    type: SET_POSTPIC_ALERT,
    payload: {
      message,
      alertType,
      alertLocation
    }
  });
};
