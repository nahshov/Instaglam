import axios from 'axios';
import {
  POSTS_OF_USER_LOADED,
  POSTS_OF_USER_LOADED_ERROR,
  POST_LOADED,
  POST_LOADED_ERROR,
  POSTS_LOADED,
  POSTS_LOADED_ERROR
} from './postTypes';

// load all posts of a user
export const loadPostsOfUser = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      const res = await axios.get(`/api/posts/${userInfo}`);

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

// search post by postId
export const searchPostById = (postId) => async (dispatch) => {
  try {
    if (postId) {
      const res = await axios.get(`/api/posts/singlePost/${postId}`);

      dispatch({
        type: POST_LOADED,
        payload: res.data
      });
    }
  } catch (error) {
    dispatch({
      type: POST_LOADED_ERROR
    });
  }
};
