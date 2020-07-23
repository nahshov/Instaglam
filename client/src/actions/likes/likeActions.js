import axios from 'axios';
import { appJSONHeader } from 'utils/httpHeaderConfig';
import {
  GET_LIKES_OF_POST,
  // GET_LIKES_OF_COMMENT,
  TOGGLE_LIKE
} from './likeTypes';

export const loadLikesOfPost = (postId) => async dispatch => {
  try {
    if (postId) {
      const res = await axios.get(`/api/posts/${postId}/likes`);
      console.log(res.data);
      dispatch({
        type: GET_LIKES_OF_POST,
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const toggleLike = (postId, likeId, isLike) => async dispatch => {
  try {
    
    if (postId) {
      if (isLike){
        await axios.delete(`/api/posts/${postId}/likes/${likeId}`)
      } else{
      await axios.post(`/api/posts/${postId}/likes`, null, appJSONHeader);
      }
      dispatch({
        type: TOGGLE_LIKE
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// export const loadLikeOfComment =
