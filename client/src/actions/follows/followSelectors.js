import { createSelector } from 'reselect';

const followSelector = state => state.follow;

export const followsSelector = createSelector(
  [followSelector],
  follow => follow.follows
);
