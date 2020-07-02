import axios from 'axios';
import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  POSTS_OF_USER_LOADED,
  POSTS_OF_USER_LOADED_ERROR,
  POSTS_LOADED,
  POSTS_LOADED_ERROR
} from './types';

// Search users by email/username
export const searchUsers = (searchParam) => async (dispatch) => {
  try {
    if (searchParam) {
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

// Search single user by email/username
export const searchUser = (searchParam) => async (dispatch) => {
  try {
    if (searchParam) {
      const res = await axios.get(`/api/users/${searchParam}`);

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

export const loadPostsOfUser = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const res = await axios.get(`/api/posts/${userId}`);

      dispatch({
        type: POSTS_OF_USER_LOADED,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: POSTS_OF_USER_LOADED_ERROR
    });
  }
};
