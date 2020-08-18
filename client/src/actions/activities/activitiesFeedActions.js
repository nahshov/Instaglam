import axios from 'axios';
import { SET_ACTIVITIES_FEED, SET_ACTIVITIES_FEED_FOLLOWS, TOGGLE_ACTIVITIES_FEED_FOLLOWS } from './activitiesFeedTypes';

export const getUserActivitiesFeed = (userId) => async dispatch => {
  try {
    const { data: activitiesFeed } = await axios.get(`/api/activities/${userId}`);
    const activitiesFeedUsers = activitiesFeed.map(activity => activity.activities.map(activityUser => activityUser.user));
    dispatch({
      type: SET_ACTIVITIES_FEED,
      payload: activitiesFeed
    });
    dispatch({
      type: SET_ACTIVITIES_FEED_FOLLOWS,
      payload: activitiesFeedUsers
    });
  } catch (error) {
    console.log(error);
  }
};

export const toggleActivitiesFeedFollows = (userId, isFollowing) => async dispatch => {
  console.log(userId);
  if (!isFollowing) {
    await axios.post(`/api/users/${userId}/follows`);

    dispatch({
      type: TOGGLE_ACTIVITIES_FEED_FOLLOWS,
      payload: { isFollowed: true, userId }
    });

    return Promise.resolve();
  }

  await axios.delete(`/api/users/${userId}/follows`);

  dispatch({
    type: TOGGLE_ACTIVITIES_FEED_FOLLOWS,
    payload: { isFollowed: false, userId }
  });
  return Promise.resolve();
};
