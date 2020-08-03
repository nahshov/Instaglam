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
  RESET_POSTS_OF_USER_LOADING,
  GET_ALL_LIKES_OF_A_POST,
  GET_ALL_COMMENTS_OF_A_POST
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
    const { data: posts } = await axios.get('/api/posts', { params: { includeComments: 2 } });

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

// submit a post
export const submitAPost = (fd) => async dispatch => {
  try {
    await axios.post('/api/posts', fd);
    dispatch(loadUser());
    window.location.reload();
  } catch (e) {
    const { message } = e.response.data;
  }
};

// toggle like of a post
export const toggleLike = (postId, isLike) => async dispatch => {
  try {
    if (postId) {
      if (isLike) {
        await axios.delete(`/api/posts/${postId}/likes`);
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: false, numOfLikes: -1 }
        });
      } else {
        await axios.post(`/api/posts/${postId}/likes`);
        dispatch({
          type: TOGGLE_POST_LIKE,
          payload: { postId, isLike: true, numOfLikes: 1 }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
// get all likes of a post for like modal
export const getAllLikesOfAPost = (postId) => async dispatch => {
  try {
    if (postId) {
      const LikesOfPost = await axios.get(`/api/posts/${postId}/likes`);
      dispatch({
        type: GET_ALL_LIKES_OF_A_POST,
        payload: LikesOfPost.data
      });
    }
  } catch (e) {
    console.log(e);
  }
};
// get all comments of a post
export const getAllCommentsOfAPost = (postId) => async dispatch => {
  try {
    if (postId) {
      const commentsOfPost = await axios.get(`/api/posts/${postId}/Comments`);
      dispatch({
        type: GET_ALL_COMMENTS_OF_A_POST,
        payload: commentsOfPost.data
      });
      console.log(commentsOfPost.data)
    }
  } catch (e) {
    console.log(e);
  }
}
