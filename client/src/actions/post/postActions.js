import axios from 'axios';
import {
  SET_POST,
} from './postTypes';

export const getPost = postId => async dispatch => {
  try {
    if (postId) {
      // const { data: post } = await axios.get(`/api/posts/singlePost/${postId}`);
      // const { data: comments } = await axios.get(`/api/posts/${postId}/comments`);
      const [post, comments] = await Promise.all([
        axios.get(`/api/posts/singlePost/${postId}`),
        axios.get(`/api/posts/${postId}/comments`)
      ])
      dispatch({
        type: SET_POST,
        payload: { ...post.data, comments: comments.data }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
