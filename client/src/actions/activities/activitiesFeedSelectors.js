import { createSelector } from 'reselect';

const activitiesFeed = state => state.activitiesFeed;

export const userActivitiesFeedSelector = createSelector(
  [activitiesFeed],
  activitiesFeed => activitiesFeed.userActivitiesFeed
);

export const activitiesFeedFollowsSelector = createSelector(
  [activitiesFeed],
  activitiesFeed => activitiesFeed.activitiesFeedFollows
);
