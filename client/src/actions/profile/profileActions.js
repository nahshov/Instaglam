import axios from 'axios';
import { SET_PROFILE,
  SET_EMPTY_PROFILE,
  TOGGLE_FOLLOW,
  RESET_PROFILE_LOADING
} from './profileTypes';

export const getProfile = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      dispatch({
        type: RESET_PROFILE_LOADING
      });

      // const res = await axios.get(`/api/users/${userInfo}`);
      // const res = await axios.get(`/api/posts/${userInfo}`);
      const [profile, posts] = await Promise.all([
        axios.get(`/api/users/${userInfo}`),
        axios.get(`/api/posts/${userInfo}`)
      ]);

      dispatch({
        type: SET_PROFILE,
        payload: { ...profile.data, posts: posts.data }
      });
    }
  } catch (error) {
    dispatch({
      type: SET_EMPTY_PROFILE,
      payload: error.message
    });
  }
};

// Add a follow to a user
export const toggleFollow = (userId, isFollowing) => async dispatch => {
  try {
    if (!isFollowing) {
      await axios.post(`/api/users/${userId}/follows`);
      dispatch({
        type: TOGGLE_FOLLOW,
        payload: { numOfFollowers: 1, isFollowed: true }
      });
    } else {
      await axios.delete(`/api/users/${userId}/follows`);
      dispatch({
        type: TOGGLE_FOLLOW,
        payload: { numOfFollowers: -1, isFollowed: false }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
