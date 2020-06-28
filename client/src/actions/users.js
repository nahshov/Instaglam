import axios from 'axios';
import { SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from './types';

// Search by email/username
export const searchUser = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      const res = await axios.get(`/api/users/${userInfo}`);
      console.log(res);
      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: res.data
      });
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SEARCH_USER_FAIL
    });
  }
};
