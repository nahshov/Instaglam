import axios from 'axios';
import {
  SET_PROFILE,
  SET_EMPTY_PROFILE,
  TOGGLE_PROFILE_FOLLOWERS_COUNT,
  RESET_PROFILE_LOADING,
  SET_PROFILE_FOLLOWING_COUNT
} from './profileTypes';

export const getProfile = (userInfo) => async (dispatch) => {
  try {
    if (userInfo) {
      dispatch({
        type: RESET_PROFILE_LOADING
      });

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

export const setNumOfFollowers = (numOfFollowers) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_PROFILE_FOLLOWERS_COUNT,
      payload: { numOfFollowers }
    });
  } catch (e) {
    console.log(e);
  }
};

export const setNumOfFollowing = (numOfFollowing) => dispatch => {
  dispatch({
    type: SET_PROFILE_FOLLOWING_COUNT,
    payload: { numOfFollowing }
  });
};
