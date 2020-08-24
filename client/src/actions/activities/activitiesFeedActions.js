import axios from 'axios';
import { SET_ACTIVITIES_FEED } from './activitiesFeedTypes';

export const getUserActivitiesFeed = (userId) => async dispatch => {
  try {
    const { data: activitiesFeed } = await axios.get(`/api/activities/${userId}`);
    dispatch({
      type: SET_ACTIVITIES_FEED,
      payload: activitiesFeed
    });
  } catch (error) {
    console.log(error);
  }
};
