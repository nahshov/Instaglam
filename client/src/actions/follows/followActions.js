import axios from 'axios';
import {
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_LIKERS,
  RESET_FOLLOWERS_LOADING,
  RESET_FOLLOWING_LOADING,
  FOLLOWERS_ERROR,
  FOLLOWING_ERROR,
  RESET_FOLLOWS,
  TOGGLE_FOLLOWERS,
  TOGGLE_FOLLOWING,
  TOGGLE_LIKERS_FOLLOW
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
    console.log(e);
    dispatch({
      type: FOLLOWING_ERROR
    });
  }
};

export const getLikers = postId => async dispatch => {
  try {
    dispatch({
      type: RESET_FOLLOWING_LOADING
    });

    const { data: likers } = await axios.get(`/api/posts/${postId}/likes/users`);

    dispatch({
      type: SET_LIKERS,
      payload: likers
    });
  } catch (e) {
    console.log(e);
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

export const toggleFollowing = (userId, isFollowing) => async dispatch => {
  try {
    if (!isFollowing) {
      await axios.post(`/api/users/${userId}/follows`);

      dispatch({
        type: TOGGLE_FOLLOWING,
        payload: { isFollowed: true, userId }
      });
      return Promise.resolve();
    }
    await axios.delete(`/api/users/${userId}/follows`);

    dispatch({
      type: TOGGLE_FOLLOWING,
      payload: { isFollowed: false, userId }
    });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
};

export const toggleFollowers = (userId, isFollowing) => async dispatch => {
  try {
    if (!isFollowing) {
      await axios.post(`/api/users/${userId}/follows`);

      dispatch({
        type: TOGGLE_FOLLOWERS,
        payload: { isFollowed: true, userId }
      });

      return Promise.resolve();
    }
    await axios.delete(`/api/users/${userId}/follows`);

    dispatch({
      type: TOGGLE_FOLLOWERS,
      payload: { isFollowed: false, userId }
    });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
};

export const toggleLikersFollow = (userId, isFollowing) => async dispatch => {
  try {
    if (!isFollowing) {
      await axios.post(`/api/users/${userId}/follows`);

      dispatch({
        type: TOGGLE_LIKERS_FOLLOW,
        payload: { isFollowed: true, userId }
      });

      return Promise.resolve();
    }
    await axios.delete(`/api/users/${userId}/follows`);

    dispatch({
      type: TOGGLE_LIKERS_FOLLOW,
      payload: { isFollowed: false, userId }
    });
    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
};
