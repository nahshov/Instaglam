import axios from 'axios';
import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW,
  TOGGLE_POST_COMMENT_LIKE,
  TOGGLE_POST_LIKE,
  ADD_COMMENT_TO_POST
} from './postTypes';

export const getPost = (postId, isPostPage = false) => async dispatch => {
  try {
    if (postId) {
      if (isPostPage) {
        const singlePost = (await axios.get(`/api/posts/singlePost/${postId}`)).data;
        const postsOfUser = (await axios.get(`/api/posts/${singlePost.user._id}`, { params: { limit: 7 } })).data;
        dispatch({
          type: SET_POST,
          payload: { postsOfUser, singlePost }
        });
        return;
      }

      const updatedPost = await axios.get(`/api/posts/singlePost/${postId}`);

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

export const postAddAComment = (postId, commentContent, parentCommentId) => {
  return async dispatch => {
    try {
      if (postId) {
        if (commentContent) {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          let res;

          if (parentCommentId) {
            res = await axios.post(`/api/posts/${postId}/comments/${parentCommentId}/replies`, { content: commentContent }, config);
          } else {
            res = await axios.post(`/api/posts/${postId}/comments`, { content: commentContent }, config);
          }

          dispatch({
            type: ADD_COMMENT_TO_POST,
            payload: { postId, numOfComments: 1, comment: res.data }
          });
        }
      }
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  };
};

export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POST
  });
};
