import { createSelector } from 'reselect';

const activitiesFeed = state => state.activitiesFeed;

export const getUserActivitiesFeedSelector = createSelector(
  [activitiesFeed],
  activitiesFeed => activitiesFeed.userActivitiesFeed
);
