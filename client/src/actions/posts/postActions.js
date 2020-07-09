import axios from 'axios';
import {
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  GET_POSTS,
  POSTS_ERROR
} from './postTypes';

// load all posts of a user
export const loadPostsOfUser = (userInfo) => async dispatch => {
  try {
    if (userInfo) {
      const res = await axios.get(`/api/posts/${userInfo}`);

      dispatch({
        type: GET_USER_POSTS,
        payload: res.data
      });
    }
  } catch (e) {
    dispatch({
      type: USER_POSTS_ERROR
    });
  }
};

// search post by postId
export const searchPostById = (postId) => async dispatch => {
  try {
    if (postId) {
      const res = await axios.get(`/api/posts/singlePost/${postId}`);

      dispatch({
        type: GET_POST,
        payload: res.data
      });
    }
  } catch (e) {
    dispatch({
      type: POST_ERROR
    });
  }
};

// getAll posts
export const getAllPosts = () => async dispatch => {
  try {
    const { data: posts } = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR
    });
  }
};
