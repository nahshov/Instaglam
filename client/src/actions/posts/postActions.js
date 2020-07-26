import axios from 'axios';
import { loadUser } from 'actions/auth/authActions';
import {
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  GET_POSTS,
  POSTS_ERROR,
  UPLOAD_POST_LOADING,
  TOGGLE_POST_LIKE
} from './postTypes';
import { appJSONHeader } from '../../utils/httpHeaderConfig';
import { TOGGLE_LIKE_ID } from '../likes/likeTypes';

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
      type: POSTS_ERROR
    });
  }
};

export const submitAPost = (fd) => async dispatch => {
  try {
    dispatch({
      type: UPLOAD_POST_LOADING,
      payload: ''
    });

    await axios.post('/api/posts', fd, {
      onUploadProgress: event => {
        dispatch({
          type: UPLOAD_POST_LOADING,
          // eslint-disable-next-line no-mixed-operators
          payload: `${Math.round((event.loaded / event.total * 100))}%`
        });
      }
    });
    dispatch(loadUser());
    window.location.reload();
  } catch (e) {
    const { message } = e.response.data;
  }
};

export const toggleLike = (postId, isLike) => async dispatch => {
  try {
    let newLike = null;
    if (postId) {
      if (isLike) {
        await axios.delete(`/api/posts/${postId}/likes`);
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: !isLike, likes: -1 }
        });
      } else {
        const {
          data
        } = await axios.post(`/api/posts/${postId}/likes`, null, appJSONHeader);
        newLike = data;
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: !isLike, likes: 1 }
        });
      }

      dispatch({
        type: TOGGLE_LIKE_ID,
        payload: { newLike }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
