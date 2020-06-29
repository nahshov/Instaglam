import axios from 'axios';
import { SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from './types';

// Search by email/username
export const searchUser = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      const res = await axios.get(`/api/users/search/${userInfo}`);

      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: res.data
      });
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.response.data.message
    });
  }
};
