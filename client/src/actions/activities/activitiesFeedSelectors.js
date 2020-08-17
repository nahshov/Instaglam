import { createSelector } from 'reselect';

const activitiesFeed = state => state.activitiesFeed;

export const userActivitiesFeedSelector = createSelector(
  [activitiesFeed],
  activitiesFeed => activitiesFeed.userActivitiesFeed
);
