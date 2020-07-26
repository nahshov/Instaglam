import axios from 'axios';
import {
  GET_LIKES_OF_POST
} from './likeTypes';

export const loadLikesOfPost = (postId) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}/likes`);
    dispatch({
      type: GET_LIKES_OF_POST,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
};
