import { createSelector } from 'reselect';

const followSelector = state => state.follow;

export const followsSelector = createSelector(
  [followSelector],
  follow => follow.follows
);

export const followingSelector = createSelector(
  [followSelector],
  follow => { return follow.following; }
);

export const followersSelector = createSelector(
  [followSelector],
  follow => { return follow.followers; }
);
