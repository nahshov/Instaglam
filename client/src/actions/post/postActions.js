import axios from 'axios';
import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW,
  TOGGLE_POST_COMMENT_LIKE,
  TOGGLE_POST_LIKE,
  ADD_COMMENT_TO_POST
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

// toggle like of a post
export const togglePostLike = (postId, isLike) => {
  return async dispatch => {
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
};


export const togglePostCommentLike = (commentId, isLike) => {
  return async dispatch => {
    try {
      if (commentId) {
        if (isLike) {
          await axios.delete(`/api/comments/${commentId}/likes`);
          dispatch({
            type: TOGGLE_POST_COMMENT_LIKE,
            payload: { commentId, isCommentLiked: false, numOfLikes: -1 }
          });
        } else {
          await axios.post(`/api/comments/${commentId}/likes`);
          dispatch({
            type: TOGGLE_POST_COMMENT_LIKE,
            payload: { commentId, isCommentLiked: true, numOfLikes: 1 }
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const postAddAComment = (postId, comment) => {
  return async dispatch => {
    try {
      if (postId) {
        if (comment) {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          const res = await axios.post(`/api/posts/${postId}/comments`, { content: comment }, config);

          dispatch({
            type: ADD_COMMENT_TO_POST,
            payload: { postId, numOfComments: 1, comment: res.data }
          });
        }
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
      // console.log(e);
    }
  };
}

export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POST
  });
};
