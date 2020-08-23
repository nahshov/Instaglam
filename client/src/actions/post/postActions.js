import axios from 'axios';
import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW
} from './postTypes';

export const getPost = post => async dispatch => {
  try {
    if (post._id) {
      const [updatedPost, comments] = await Promise.all([
        axios.get(`/api/posts/singlePost/${post._id}`),
        axios.get(`/api/posts/${post._id}/comments`)
      ]);
      dispatch({
        type: SET_POST,
        payload: { ...updatedPost.data, comments: comments.data }
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

export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POST
  });
};
