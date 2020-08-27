import axios from 'axios';
import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW,
  TOGGLE_POST_COMMENT_LIKE
} from './postTypes';

export const getPost = post => async dispatch => {
  try {
    if (post._id) {
      const updatedPost = await axios.get(`/api/posts/singlePost/${post._id}`);
      dispatch({
        type: SET_POST,
        payload: updatedPost.data
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const togglePostOwnerFollow = (userId, isFollowed) => async dispatch => {
  try {
    if (userId) {
      if (isFollowed) {
        await axios.delete(`/api/users/${userId}/follows`);
        dispatch({
          type: TOGGLE_POST_OWNER_FOLLOW,
          payload: false
        });
        return Promise.resolve();
      }
      await axios.post(`/api/users/${userId}/follows`);
      dispatch({
        type: TOGGLE_POST_OWNER_FOLLOW,
        payload: true
      });
      return Promise.resolve();
    }
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
};

export const toggleCommentLike = (commentId, isLike, postId) => {
  return async dispatch => {
    try {
      if (commentId) {
        if (isLike) {
          const res = await axios.delete(`/api/comments/${commentId}/likes`);
          dispatch({
            type: TOGGLE_POST_COMMENT_LIKE,
            payload: { commentId, isCommentLiked: false, numOfLikes: -1, postId }
          });
          console.log(res)
        } else {
          const res = await axios.post(`/api/comments/${commentId}/likes`);
          dispatch({
            type: TOGGLE_POST_COMMENT_LIKE,
            payload: { commentId, isCommentLiked: true, numOfLikes: 1, postId }
          });
          console.log(res)
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POST
  });
};
