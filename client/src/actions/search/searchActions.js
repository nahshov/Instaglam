import axios from 'axios';
import { RESET_USERS_LOADING, SEARCH_USERS_FAIL, SEARCH_USERS_SUCCESS } from './searchTypes';

export const searchUsers = (searchParam) => async (dispatch) => {
  try {
    if (searchParam) {
      dispatch({
        type: RESET_USERS_LOADING
      });
      const res = await axios.get(`/api/users/search/${searchParam}`);

      if (!res.data.length) {
        throw new Error('No results found.');
      }

      dispatch({
        type: SEARCH_USERS_SUCCESS,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: SEARCH_USERS_FAIL,
      payload: error.message
    });
  }
};
