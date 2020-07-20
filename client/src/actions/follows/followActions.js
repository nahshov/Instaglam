import axios from 'axios';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  RESET_FOLLOWERS_LOADING,
  RESET_FOLLOWING_LOADING,
  FOLLOWERS_ERROR,
  FOLLOWING_ERROR
} from 'actions/follows/followTypes';

export const getFollowers = userId => async dispatch => {
  try {
    dispatch({
      type: RESET_FOLLOWERS_LOADING
    });

    const { data: followers } = await axios.get(`/api/users/${userId}/follows/followers`);

    dispatch({
      type: GET_FOLLOWERS,
      payload: followers
    });
  } catch (e) {
    dispatch({
      type: FOLLOWERS_ERROR
    });
  }
};

export const getFollowing = userId => async dispatch => {
  try {
    dispatch({
      type: RESET_FOLLOWING_LOADING
    });

    const { data: following } = await axios.get(`/api/users/${userId}/follows/following`);

    dispatch({
      type: GET_FOLLOWING,
      payload: following
    });
  } catch (e) {
    dispatch({
      type: FOLLOWING_ERROR
    });
  }
};
