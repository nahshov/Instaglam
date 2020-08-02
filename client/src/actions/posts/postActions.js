import axios from 'axios';
import { loadUser } from 'actions/auth/authActions';
import {
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  GET_POSTS,
  POSTS_ERROR,
  TOGGLE_POST_LIKE,
  RESET_POSTS_OF_USER_LOADING
} from './postTypes';

// load all posts of a user
export const loadPostsOfUser = (userInfo) => async dispatch => {
  try {
    if (userInfo) {
      dispatch({
        type: RESET_POSTS_OF_USER_LOADING
      });
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
      type: POSTS_ERROR
    });
  }
};

export const submitAPost = (fd) => async dispatch => {
  try {
    await axios.post('/api/posts', fd);
    dispatch(loadUser());
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
};

export const toggleLike = (postId, isLike) => async dispatch => {
  try {
    if (postId) {
      if (isLike) {
        await axios.delete(`/api/posts/${postId}/likes`);
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: false, likes: -1 }
        });
      } else {
        await axios.post(`/api/posts/${postId}/likes`);
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: true, likes: 1 }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
