import axios from 'axios';
import { SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from './types';

// Search by email/username
export const searchUser = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      const res = await axios.get(`/api/users/search/${userInfo}`);

      if (!res.data.length) {
        throw new Error('No results found.');
      }

      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.message
    });
  }
};
