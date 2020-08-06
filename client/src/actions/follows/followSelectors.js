import { createSelector } from 'reselect';

const followSelector = state => { return state.follow; };

export const followingSelector = createSelector(
  [followSelector],
  follow => { return follow.following; }
);

export const followersSelector = createSelector(
  [followSelector],
  follow => { return follow.followers; }
);
