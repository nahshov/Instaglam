import axios from 'axios';
import {
  POSTS_OF_USER_LOADED,
  POSTS_OF_USER_LOADED_ERROR,
  POSTS_LOADED,
  POSTS_LOADED_ERROR
} from './postTypes';

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
