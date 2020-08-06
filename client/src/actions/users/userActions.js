import axios from 'axios';
import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_SINGLE_USER_SUCCESS,
  SEARCH_SINGLE_USER_FAIL,
  RESET_LOADING_USERS_LOADING,
  RESET_LOADING_USER_LOADING,
  TOGGLE_FOLLOW
} from './userTypes';

// Search users by email/username
export const searchUsers = (searchParam) => async (dispatch) => {
  try {
    if (searchParam) {
      dispatch({
        type: RESET_LOADING_USERS_LOADING
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
};

// Search single user by email/username/userId
export const searchUser = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      dispatch({
        type: RESET_LOADING_USER_LOADING
      });

        const res = await axios.get(`/api/users/${userInfo}`);

        dispatch({
          type: SEARCH_SINGLE_USER_SUCCESS,
          payload: res.data
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_SINGLE_USER_FAIL,
        payload: error.message
      });
    }
  };
};

// Add a follow to a user
export const toggleFollow = (userId, isFollowing) => async dispatch => {
  try {
    if (!isFollowing) {
      await axios.post(`/api/users/${userId}/follows`);
      dispatch({
        type: TOGGLE_FOLLOW,
        payload: { numOfFollowers: 1, isFollowed: true }
      });
    } else {
      await axios.delete(`/api/users/${userId}/follows`);
      dispatch({
        type: TOGGLE_FOLLOW,
        payload: { numOfFollowers: -1, isFollowed: false }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
