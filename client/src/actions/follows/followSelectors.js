import { createSelector } from 'reselect';

const followSelector = state => state.follow;

export const followingSelector = createSelector(
  [followSelector],
  follow => follow.following
);

export const followersSelector = createSelector(
  [followSelector],
  follow => follow.followers
);
