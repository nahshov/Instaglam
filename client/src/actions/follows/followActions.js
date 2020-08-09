import axios from 'axios';
import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  RESET_FOLLOWERS_LOADING,
  RESET_FOLLOWING_LOADING,
  FOLLOWERS_ERROR,
  FOLLOWING_ERROR,
  RESET_FOLLOWS
} from 'actions/follows/followTypes';

export const getFollowers = userId => async dispatch => {
  try {
    dispatch({
      type: RESET_FOLLOWERS_LOADING
    });

    const { data: followers } = await axios.get(`/api/users/${userId}/follows/followers`);

    dispatch({
      type: SET_FOLLOWERS,
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
      type: SET_FOLLOWING,
      payload: following
    });
  } catch (e) {
    dispatch({
      type: FOLLOWING_ERROR
    });
  }
};

export const resetFollows = (dispatch) => {
  dispatch({
    type: RESET_FOLLOWS
  });
};
