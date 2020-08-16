import axios from 'axios';
import {
  SET_POST
} from './postTypes';

export const getPost = post => async dispatch => {
  dispatch({
    type: SET_POST,
    payload: post
  });

  try {
    if (post._id) {
      const [updatedPost, comments] = await Promise.all([
        axios.get(`/api/posts/singlePost/${post._id}`),
        axios.get(`/api/posts/${post._id}/comments`)
      ]);
      console.log('data is back');
      dispatch({
        type: SET_POST,
        payload: { ...updatedPost.data, comments: comments.data }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
